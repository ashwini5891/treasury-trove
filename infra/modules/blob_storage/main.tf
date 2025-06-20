# Storage Account for static web content
resource "azurerm_storage_account" "static_web" {
  name                     = var.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = var.account_tier
  account_replication_type = var.replication_type
  account_kind             = "StorageV2"

  # Enable blob public access if required
  allow_nested_items_to_be_public = var.allow_public_access

  # Network access rules
  public_network_access_enabled = var.public_network_access_enabled

  # Enable versioning and soft delete for better data protection
  blob_properties {
    versioning_enabled = var.enable_versioning

    delete_retention_policy {
      days = var.blob_soft_delete_retention_days
    }

    container_delete_retention_policy {
      days = var.container_soft_delete_retention_days
    }
  }

  tags = var.tags
}

# Configure static website hosting using the dedicated resource
resource "azurerm_storage_account_static_website" "static_web" {
  storage_account_id   = azurerm_storage_account.static_web.id
  index_document       = var.index_document
  error_404_document   = var.error_404_document
}

# Container for static web content
resource "azurerm_storage_container" "web_content" {
  name                  = var.web_container_name
  storage_account_id    = azurerm_storage_account.static_web.id # Changed to .id
  container_access_type = var.container_access_type
}

# Additional containers for different content types
resource "azurerm_storage_container" "additional_containers" {
  for_each = var.additional_containers

  name                  = each.key
  storage_account_id    = azurerm_storage_account.static_web.id # Changed to .id
  container_access_type = each.value.access_type
}

resource "azurerm_key_vault_secret" "blob_storage_connection" {
  name         = "blob-storage-connection-string-${var.environment}"
  key_vault_id = var.key_vault_id
  value        = azurerm_storage_account.static_web.primary_connection_string
  depends_on   = [azurerm_storage_account.static_web]

  lifecycle {
    ignore_changes = [value]
  }
}
