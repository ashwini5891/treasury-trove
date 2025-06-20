# Required variables
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

variable "app_service_plan_id" {
  description = "ID of the App Service Plan"
  type        = string
}

variable "container_image" {
  description = "Docker container image (e.g., myregistry.azurecr.io/fastapi-app:latest)"
  type        = string
}

variable "postgres_connection_string" {
  description = "PostgreSQL connection string"
  type        = string
  sensitive   = true
}

variable "docker_registry_url" {
  description = "Docker registry URL"
  type        = string
}

variable "docker_registry_username" {
  description = "Docker registry username"
  type        = string
}

variable "docker_registry_password" {
  description = "Docker registry password"
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

# Optional variables with defaults
variable "health_check_path" {
  description = "Health check endpoint path"
  type        = string
  default     = "/health"
}

variable "additional_app_settings" {
  description = "Additional app settings for the App Service"
  type        = map(string)
  default     = {}
}

variable "connection_strings" {
  description = "Additional connection strings for the App Service"
  type = list(object({
    name  = string
    type  = string
    value = string
  }))
  default = []
}

# Auto-scaling variables
variable "default_instances" {
  description = "Default number of instances"
  type        = number
  default     = 1
}

variable "min_instances" {
  description = "Minimum number of instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of instances"
  type        = number
  default     = 10
}

variable "scale_out_requests_threshold" {
  description = "Number of requests per minute to trigger scale out"
  type        = number
  default     = 100
}

variable "scale_in_requests_threshold" {
  description = "Number of requests per minute to trigger scale in"
  type        = number
  default     = 50
}

variable "notification_emails" {
  description = "Email addresses to notify on scaling events"
  type        = list(string)
  default     = []
}

variable "health_check_eviction_time_in_min" {
  description = "Time in minutes to evict unhealthy instances (health check)"
  type        = number
  default     = 2
}
