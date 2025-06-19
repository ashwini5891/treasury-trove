# TODO: Soft delete and purge protection for Key Vault
# Create Key Vault
resource "azurerm_key_vault" "main" {
  name                = "kv-${var.project}-${var.environment}"
  location            = var.location
  resource_group_name = local.resource_group_name
  tenant_id          = var.tenant_id
  sku_name           = "standard"
  enable_rbac_authorization = true

  tags = local.tags
}

data "azurerm_key_vault_secret" "postgres_connection" {
  name         = "postgres-connection-string-${var.environment}"
  key_vault_id = azurerm_key_vault.main.id
}

module "postgresql" {
  source = "./modules/postgresql"

  resource_group_name = local.resource_group_name
  location           = var.location
  environment        = var.environment
  project           = var.project
  tags              = local.tags
  key_vault_id      = azurerm_key_vault.main.id

  administrator_login = var.db_administrator_login
  generate_password  = true   # Let PostgreSQL generate the password

  depends_on = [azurerm_key_vault.main]
}

module "container_registry" {
  source              = "./modules/container_registry"
  registry_name       = local.registry_name
  resource_group_name = local.resource_group_name
  location            = var.location
  environment         = var.environment
  project             = var.project
  tags                = local.tags
  key_vault_id        = azurerm_key_vault.main.id
}


resource "azurerm_service_plan" "main" {
  name                = local.service_plan_name
  location            = var.location
  resource_group_name = local.resource_group_name
  os_type             = "Linux" # Linux is required for Docker containers
  sku_name            = "B1"    # Basic tier, size B1

  # Available SKU options:
  # Basic: B1, B2, B3
  # Standard: S1, S2, S3
  # Premium: P1v2, P2v2, P3v2, P1v3, P2v3, P3v3
  # Choose based on your needs:
  # - B1 for development/test
  # - S1 for standard production workloads
  # - P1v2+ for high-performance applications

  tags = local.tags
}

# FastAPI Webapp Module
module "webapp" {
  source = "./modules/webapp"

  # Required variables
  resource_group_name          = local.resource_group_name
  location                    = var.location
  project                     = var.project
  environment                 = var.environment
  app_service_plan_id         = azurerm_service_plan.main.id
  container_image             = "${local.registry_name}.azurecr.io/${var.webapp_container_image_name}:${var.app_version}"
  postgres_connection_string  = data.azurerm_key_vault_secret.postgres_connection.value
  docker_registry_url         = "https://${local.registry_name}.azurecr.io"
  docker_registry_username    = module.container_registry.container_registry_admin_username
  docker_registry_password    = module.container_registry.container_registry_admin_password
  tags                       = local.tags

  # Auto-scaling configuration using variables
  min_instances                    = var.webapp_min_instances
  max_instances                   = var.webapp_max_instances
  default_instances               = var.webapp_default_instances
  scale_out_requests_threshold    = var.webapp_scale_out_threshold
  scale_in_requests_threshold     = var.webapp_scale_in_threshold

  # Health check and additional settings using variables
  health_check_path = var.webapp_health_check_path
  additional_app_settings = merge(var.webapp_environment_variables, {
    "LOG_LEVEL" = "INFO"
    "DEBUG"     = var.environment == "dev" ? "true" : "false"
  })

  # Notification emails using variable
  notification_emails = var.webapp_notification_emails

  depends_on = [
    azurerm_service_plan.main,
    module.container_registry,
    module.postgresql
  ]
}

# Blob Storage for Static Web Content
module "blob_storage" {
  source = "./modules/blob_storage"

  # Required variables
  storage_account_name = local.storage_account_name
  resource_group_name  = local.resource_group_name
  location            = var.location
  project             = var.project
  environment         = var.environment
  tags               = local.tags

  # Integration with webapp for managed identity access
  webapp_principal_id = module.webapp.webapp_identity_principal_id

  # Static website configuration
  index_document     = "index.html"
  error_404_document = "404.html"

  # Container configuration - separate containers for different content types
  additional_containers = {
    "assets" = {
      access_type = "blob"    # Public access for CSS, JS, images
    }
    "uploads" = {
      access_type = "private" # Private access for user uploads
    }
    "documents" = {
      access_type = "blob"    # Public access for documents
    }
  }

  depends_on = [
    module.webapp
  ]
}
