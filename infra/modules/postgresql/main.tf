resource "random_password" "admin_password" {
  length  = 32
  special = true
  numeric = true
  upper   = true
  lower   = true
  # Exclude characters that might cause issues in connection strings or specific systems
  # You might want to adjust this based on your needs
  override_special = "!@#$%^&*()-_=+"
}

resource "azurerm_postgresql_flexible_server" "main" {
  name                = "psql-${var.project}-${var.environment}-${var.location}"
  resource_group_name = var.resource_group_name
  location            = var.location
  version            = "15"

  administrator_login    = var.administrator_login
  # Use the generated password here
  administrator_password = random_password.admin_password.result

  storage_mb = 32768

  sku_name = var.environment == "prod" ? "B_Standard_B2s" : "B_Standard_B1ms"

  backup_retention_days = var.environment == "prod" ? 30 : 7
  zone = "1"

  tags = var.tags
}

resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = "${var.project}_${var.environment}"
  server_id = azurerm_postgresql_flexible_server.main.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}


resource "azurerm_key_vault_secret" "postgres_connection" {
  name         = "postgres-connection-string-${var.environment}"
  key_vault_id = var.key_vault_id
  # Use the generated password here as well
  value        = "postgresql://${var.administrator_login}:${random_password.admin_password.result}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${azurerm_postgresql_flexible_server_database.main.name}"
  depends_on   = [azurerm_postgresql_flexible_server.main]

  lifecycle {
    ignore_changes = [value] # You might want to ignore changes to the value if it's managed externally after creation
  }
}
