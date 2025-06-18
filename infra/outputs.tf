output "resource_group_name" {
  value = local.resource_group_name
}

output "key_vault_name" {
  value = azurerm_key_vault.main.name
}
