# Infrastructure as Code (IaC) for Treasury Trove

This directory contains Terraform configurations for managing the infrastructure of Treasury Trove application.

## Structure

```
infra/
├── environments/
│   ├── dev/
│   │   └── terraform.tfvars
│   └── prod/
│       └── terraform.tfvars
├── modules/
│   └── postgresql/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── main.tf
├── variables.tf
├── outputs.tf
└── versions.tf
```

## Prerequisites

- Terraform >= 1.0
- Azure CLI
- Azure subscription

## Usage

1. Navigate to the environment directory you want to deploy:
   ```
   cd environments/dev
   ```

2. Initialize Terraform:
   ```
   terraform init
   ```

3. Plan the changes:
   ```
   terraform plan
   ```

4. Apply the changes:
   ```
   terraform apply
   ```

## Container Registry

This configuration provisions an Azure Container Registry (ACR) for storing Docker images. The following outputs are available for use in CI/CD pipelines:

- `container_registry_login_server`: The ACR login server URL
- `container_registry_admin_username`: The admin username for ACR
- `container_registry_admin_password`: The admin password for ACR

You can use these outputs in your GitHub Actions workflows to authenticate and push images to the registry.
