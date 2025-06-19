resource "azurerm_container_registry" "main" {
  name                = "acrtreasurytrove${var.environment}"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = var.tags
}

resource "azurerm_key_vault_secret" "acr_admin_username" {
  name         = "acr-admin-username-${var.environment}"
  key_vault_id = var.key_vault_id
  value        = azurerm_container_registry.main.admin_username
  depends_on   = [azurerm_container_registry.main]
}

resource "azurerm_key_vault_secret" "acr_admin_password" {
  name         = "acr-admin-password-${var.environment}"
  key_vault_id = var.key_vault_id
  value        = azurerm_container_registry.main.admin_password
  depends_on   = [azurerm_container_registry.main]
}

output "container_registry_login_server" {
  value = azurerm_container_registry.main.login_server
}

output "container_registry_admin_username" {
  value = azurerm_container_registry.main.admin_username
}

output "container_registry_admin_password" {
  value     = azurerm_container_registry.main.admin_password
  sensitive = true
}
