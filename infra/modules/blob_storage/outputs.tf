output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.static_web.name
}

output "storage_account_id" {
  description = "ID of the storage account"
  value       = azurerm_storage_account.static_web.id
}

output "storage_account_primary_access_key" {
  description = "Primary access key for the storage account"
  value       = azurerm_storage_account.static_web.primary_access_key
  sensitive   = true
}

output "storage_account_primary_connection_string" {
  description = "Primary connection string for the storage account"
  value       = azurerm_storage_account.static_web.primary_connection_string
  sensitive   = true
}

output "static_website_url" {
  description = "URL of the static website"
  value       = azurerm_storage_account.static_web.primary_web_endpoint
}

output "static_website_host" {
  description = "Hostname of the static website"
  value       = azurerm_storage_account.static_web.primary_web_host
}

output "blob_endpoint" {
  description = "Blob service endpoint"
  value       = azurerm_storage_account.static_web.primary_blob_endpoint
}

output "web_container_name" {
  description = "Name of the web content container"
  value       = azurerm_storage_container.web_content.name
}

output "additional_container_names" {
  description = "Names of additional containers"
  value       = { for k, v in azurerm_storage_container.additional_containers : k => v.name }
}

# URLs for different use cases
output "primary_web_url" {
  description = "Primary web URL (static website endpoint)"
  value       = azurerm_storage_account.static_web.primary_web_endpoint
}

output "blob_base_url" {
  description = "Base URL for blob access"
  value       = "${azurerm_storage_account.static_web.primary_blob_endpoint}${azurerm_storage_container.web_content.name}/"
}
