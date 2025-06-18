locals {
  resource_group_name = "${var.project}-${var.environment}"
  key_vault_name      = "kv-${var.project}-${var.environment}"
  tags = {
    Environment = var.environment
    Project     = var.project
    ManagedBy   = "Terraform"
  }
}
