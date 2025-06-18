variable "project" {
  type        = string
  description = "Project name"
}

variable "environment" {
  type        = string
  description = "Environment name (dev or prod)"
}

variable "location" {
  type        = string
  description = "Azure region to deploy resources"
}

variable "tenant_id" {
  type        = string
  description = "Azure AD tenant ID"
}

variable "admin_object_id" {
  type        = string
  description = "Object ID of the Azure AD user or group that will have admin access to Key Vault"
}

variable "db_administrator_login" {
  type        = string
  description = "PostgreSQL administrator login"
}

variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "client_id" {
  type        = string
  description = "Azure Service Principal client ID"
}

variable "client_secret" {
  type        = string
  description = "Azure Service Principal client secret"
  sensitive   = true
}
