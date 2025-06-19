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
  resource_group_name = local.resource_group_name
  location            = var.location
  environment         = var.environment
  project             = var.project
  tags                = local.tags
  key_vault_id        = azurerm_key_vault.main.id
}
