output "webapp_name" {
  description = "Name of the Linux Web App"
  value       = azurerm_linux_web_app.webapp.name
}

output "webapp_fqdn" {
  description = "Fully qualified domain name of the Linux Web App"
  value       = azurerm_linux_web_app.webapp.default_hostname
}

output "webapp_url" {
  description = "HTTPS URL of the Linux Web App"
  value       = "https://${azurerm_linux_web_app.webapp.default_hostname}"
}

output "webapp_id" {
  description = "ID of the Linux Web App"
  value       = azurerm_linux_web_app.webapp.id
}

output "webapp_identity_principal_id" {
  description = "Principal ID of the system-assigned managed identity"
  value       = azurerm_linux_web_app.webapp.identity[0].principal_id
}

output "webapp_identity_tenant_id" {
  description = "Tenant ID of the system-assigned managed identity"
  value       = azurerm_linux_web_app.webapp.identity[0].tenant_id
}

output "autoscale_setting_id" {
  description = "ID of the autoscale setting"
  value       = azurerm_monitor_autoscale_setting.webapp.id
}
