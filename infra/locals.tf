locals {
  resource_group_name = "${var.project}-${var.environment}"
  key_vault_name      = "kv-${var.project}-${var.environment}"
  registry_name      = "acrtreasurytrove${var.environment}"
  service_plan_name = "sp-${var.project}-${var.environment}"
  storage_account_name = var.storage_account_name != null ? var.storage_account_name : "st${replace(var.project, "-", "")}${var.environment}"
  tags = {
    Environment = var.environment
    Project     = var.project
    ManagedBy   = "Terraform"
  }
}
