# Required variables
variable "storage_account_name" {
  description = "Name of the storage account (must be globally unique, 3-24 chars, lowercase letters and numbers only)"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]{3,24}$", var.storage_account_name))
    error_message = "Storage account name must be 3-24 characters long and contain only lowercase letters and numbers."
  }
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region location"
  type        = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

# Storage configuration
variable "account_tier" {
  description = "Storage account tier (Standard or Premium)"
  type        = string
  default     = "Standard"

  validation {
    condition     = contains(["Standard", "Premium"], var.account_tier)
    error_message = "Account tier must be either Standard or Premium."
  }
}

variable "replication_type" {
  description = "Storage account replication type"
  type        = string
  default     = "LRS"

  validation {
    condition     = contains(["LRS", "GRS", "RAGRS", "ZRS", "GZRS", "RAGZRS"], var.replication_type)
    error_message = "Replication type must be one of: LRS, GRS, RAGRS, ZRS, GZRS, RAGZRS."
  }
}

# Static website configuration
variable "index_document" {
  description = "Index document for static website"
  type        = string
  default     = "index.html"
}

variable "error_404_document" {
  description = "404 error document for static website"
  type        = string
  default     = "404.html"
}

# Container configuration
variable "web_container_name" {
  description = "Name of the main web content container"
  type        = string
  default     = "web"
}

variable "container_access_type" {
  description = "Access type for the web container (private, blob, container)"
  type        = string
  default     = "blob"

  validation {
    condition     = contains(["private", "blob", "container"], var.container_access_type)
    error_message = "Container access type must be one of: private, blob, container."
  }
}

variable "additional_containers" {
  description = "Additional containers to create"
  type = map(object({
    access_type = string
  }))
  default = {
    "assets" = {
      access_type = "blob"
    }
    "uploads" = {
      access_type = "private"
    }
  }
}

# Security and access configuration
variable "allow_public_access" {
  description = "Allow public access to blobs"
  type        = bool
  default     = true
}

variable "public_network_access_enabled" {
  description = "Enable public network access"
  type        = bool
  default     = true
}

# Data protection
variable "enable_versioning" {
  description = "Enable blob versioning"
  type        = bool
  default     = true
}

variable "blob_soft_delete_retention_days" {
  description = "Number of days to retain deleted blobs"
  type        = number
  default     = 7
}

variable "container_soft_delete_retention_days" {
  description = "Number of days to retain deleted containers"
  type        = number
  default     = 7
}


# Integration with webapp
variable "webapp_principal_id" {
  description = "Principal ID of the webapp's managed identity for storage access"
  type        = string
  default     = null
}
