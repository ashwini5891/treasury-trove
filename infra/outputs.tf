output "resource_group_name" {
  value = local.resource_group_name
}

output "key_vault_name" {
  value = azurerm_key_vault.main.name
}

output "container_registry_login_server" {
  value = module.container_registry.container_registry_login_server
}

output "container_registry_admin_username" {
  value = module.container_registry.container_registry_admin_username
}

output "container_registry_admin_password" {
  value     = module.container_registry.container_registry_admin_password
  sensitive = true
}
