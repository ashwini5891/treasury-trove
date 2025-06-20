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

output "webapp_fqdn" {
  value = module.webapp.webapp_fqdn
}

output "webapp_url" {
  value = module.webapp.webapp_url
}

# Blob Storage Outputs
output "static_website_url" {
  description = "URL of the static website"
  value       = module.blob_storage.static_website_url
}


output "storage_account_name" {
  description = "Name of the storage account"
  value       = module.blob_storage.storage_account_name
}

output "blob_base_url" {
  description = "Base URL for blob access"
  value       = module.blob_storage.blob_base_url
}
