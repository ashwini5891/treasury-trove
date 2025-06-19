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

variable "app_version" {
  type        = string
  description = "Version of the application"
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

variable "webapp_environment_variables" {
  description = "Environment variables for the webapp container."
  type        = map(string)
  default     = {}
}

variable "webapp_container_image_name" {
  description = "Name of the container image for the webapp (without registry prefix)"
  type        = string
  default     = "fastapi-app"
}

variable "webapp_min_instances" {
  description = "Minimum number of webapp instances (0 for scale-to-zero)"
  type        = number
  default     = 0
}

variable "webapp_max_instances" {
  description = "Maximum number of webapp instances"
  type        = number
  default     = 5
}

variable "webapp_default_instances" {
  description = "Default number of webapp instances"
  type        = number
  default     = 1
}

variable "webapp_scale_out_threshold" {
  description = "Number of requests per minute to trigger scale out"
  type        = number
  default     = 80
}

variable "webapp_scale_in_threshold" {
  description = "Number of requests per minute to trigger scale in"
  type        = number
  default     = 20
}

variable "webapp_health_check_path" {
  description = "Health check endpoint path for the webapp"
  type        = string
  default     = "/health"
}

variable "webapp_notification_emails" {
  description = "Email addresses to notify on webapp scaling events"
  type        = list(string)
  default     = []
}

# Blob Storage Variables
variable "storage_account_name" {
  description = "Name of the storage account for static web content (must be globally unique)"
  type        = string
  default     = null
}

variable "enable_cdn" {
  description = "Enable CDN for static content delivery"
  type        = bool
  default     = true
}

variable "cdn_sku" {
  description = "CDN SKU for static content delivery"
  type        = string
  default     = "Standard_Microsoft"
}

variable "static_website_custom_domain" {
  description = "Custom domain for static website CDN"
  type        = string
  default     = null
}
