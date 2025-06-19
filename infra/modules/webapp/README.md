# Webapp Module

This Terraform module creates an Azure App Service for hosting a containerized Python FastAPI application with auto-scaling capabilities.

## Features

- **Container-based deployment** - Runs Docker containers from Azure Container Registry
- **Auto-scaling** - Scales based on HTTP request metrics (can scale to 0)
- **Environment variables** - Includes POSTGRES_URL and supports additional variables
- **Health checks** - Configurable health check endpoint
- **Logging** - Comprehensive logging and monitoring
- **Managed Identity** - System-assigned managed identity for secure access to other Azure services

## Usage

```hcl
module "webapp" {
  source = "./modules/webapp"

  # Required variables
  resource_group_name          = local.resource_group_name
  project                     = var.project
  environment                 = var.environment
  app_service_plan_id         = azurerm_app_service_plan.main.id
  container_image             = "${local.registry_name}.azurecr.io/fastapi-app:latest"
  postgres_connection_string  = data.azurerm_key_vault_secret.postgres_connection.value
  docker_registry_url         = "https://${local.registry_name}.azurecr.io"
  docker_registry_username    = module.container_registry.container_registry_admin_username
  docker_registry_password    = module.container_registry.container_registry_admin_password
  tags                       = local.tags

  # Optional scaling configuration
  min_instances                    = 0
  max_instances                   = 5
  scale_out_requests_threshold    = 80
  scale_in_requests_threshold     = 20

  # Optional additional settings
  health_check_path = "/health"
  additional_app_settings = {
    "LOG_LEVEL" = "INFO"
    "DEBUG"     = "false"
  }
}
```

## Auto-scaling Behavior

- **Scale Out**: When average requests > threshold over 5 minutes
- **Scale In**: When average requests < threshold over 10 minutes
- **Scale to Zero**: Supported when `min_instances = 0`
- **Cooldown**: 5 minutes for scale out, 10 minutes for scale in

## FastAPI Requirements

Your FastAPI application should:

1. **Expose port 80** - The container must listen on port 80
2. **Health endpoint** - Implement a `/health` endpoint (or configure `health_check_path`)
3. **Environment variables** - Read `POSTGRES_URL` from environment

Example FastAPI code:
```python
from fastapi import FastAPI
import os

app = FastAPI()

# Get PostgreSQL connection from environment
postgres_url = os.getenv("POSTGRES_URL")

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
```

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| resource_group_name | Name of the resource group | `string` | n/a | yes |
| project | Project name | `string` | n/a | yes |
| environment | Environment name | `string` | n/a | yes |
| app_service_plan_id | ID of the App Service Plan | `string` | n/a | yes |
| container_image | Docker container image | `string` | n/a | yes |
| postgres_connection_string | PostgreSQL connection string | `string` | n/a | yes |
| docker_registry_url | Docker registry URL | `string` | n/a | yes |
| docker_registry_username | Docker registry username | `string` | n/a | yes |
| docker_registry_password | Docker registry password | `string` | n/a | yes |
| min_instances | Minimum number of instances | `number` | `0` | no |
| max_instances | Maximum number of instances | `number` | `10` | no |
| scale_out_requests_threshold | Requests/min to scale out | `number` | `100` | no |
| scale_in_requests_threshold | Requests/min to scale in | `number` | `50` | no |

## Outputs

| Name | Description |
|------|-------------|
| webapp_name | Name of the App Service |
| webapp_fqdn | Fully qualified domain name |
| webapp_url | HTTPS URL of the App Service |
| webapp_id | ID of the App Service |
| webapp_identity_principal_id | Principal ID of managed identity |

## Notes

- The App Service Plan must support Linux containers
- Container registry credentials are configured automatically
- System-assigned managed identity is enabled for secure access to other Azure services
- Logging is configured with 7-day retention
