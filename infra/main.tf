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

  # access_policy {
  #   tenant_id = var.tenant_id
  #   object_id = var.admin_object_id

  #   secret_permissions = [
  #     "Get", "List", "Set", "Delete", "Purge"
  #   ]
  # }
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
