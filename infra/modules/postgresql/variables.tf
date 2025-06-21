variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region to deploy resources"
}

variable "environment" {
  type        = string
  description = "Environment name (dev or prod)"
}

variable "project" {
  type        = string
  description = "Project name"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to all resources"
}

variable "administrator_login" {
  type        = string
  description = "PostgreSQL administrator login"
}

variable "generate_password" {
  type        = bool
  description = "Whether to generate a random password for PostgreSQL administrator"
  default     = false
}

variable "administrator_password" {
  type        = string
  description = "PostgreSQL administrator password. Not required if generate_password is true"
  default     = null
  sensitive   = true
}

variable "key_vault_id" {
  type        = string
  description = "ID of the Key Vault where PostgreSQL secrets will be stored"
}
