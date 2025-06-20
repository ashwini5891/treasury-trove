# Blob Storage Module

This Terraform module creates Azure Blob Storage optimized for hosting static web content with optional CDN integration for better performance and global distribution.

## Features

- **Static Website Hosting** - Native Azure Storage static website hosting
- **Multiple Containers** - Separate containers for different content types
- **CDN Integration** - Optional Azure CDN for global performance
- **CORS Configuration** - Web-friendly CORS rules
- **Data Protection** - Versioning and soft delete
- **Security** - Configurable access levels and network restrictions
- **Custom Domains** - Support for custom domain names
- **Webapp Integration** - Role-based access for your FastAPI webapp

## Usage

```hcl
module "blob_storage" {
  source = "./modules/blob_storage"

  # Required variables
  storage_account_name = "statreasurytrove${var.environment}"  # Must be globally unique
  resource_group_name  = local.resource_group_name
  location            = var.location
  project             = var.project
  environment         = var.environment
  tags               = local.tags

  # Optional CDN configuration
  enable_cdn = true
  cdn_sku    = "Standard_Microsoft"

  # Optional custom domain
  custom_domain_name = "assets.yourdomain.com"

  # Integration with webapp
  webapp_principal_id = module.webapp.webapp_identity_principal_id

  # Static website configuration
  index_document     = "index.html"
  error_404_document = "404.html"

  # Container configuration
  additional_containers = {
    "assets" = {
      access_type = "blob"
    }
    "uploads" = {
      access_type = "private"
    }
    "images" = {
      access_type = "blob"
    }
  }
}
```

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Azure CDN      │◄───┤  Blob Storage    │◄───┤  FastAPI Webapp │
│  (Optional)     │    │  Static Website  │    │  (Upload/Manage)│
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Global Users   │    │  Direct Access   │    │  Content Mgmt   │
│  (Fast CDN)     │    │  (Storage URL)   │    │  (via API)      │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Container Structure

The module creates these containers by default:

- **`web`** - Main static website content (index.html, etc.)
- **`assets`** - Static assets (CSS, JS, images) - public access
- **`uploads`** - User uploads - private access

## CDN Features

When CDN is enabled, you get:

- **Global Edge Locations** - Faster content delivery worldwide
- **HTTPS Enforcement** - Automatic HTTP to HTTPS redirects
- **Static Asset Caching** - 30-day cache for CSS, JS, images
- **Custom Domains** - Support for your own domain names

## FastAPI Integration

Your FastAPI webapp can access the storage using the managed identity:

```python
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential

# Use managed identity authentication
credential = DefaultAzureCredential()
blob_service_client = BlobServiceClient(
    account_url=f"https://{storage_account_name}.blob.core.windows.net",
    credential=credential
)

# Upload a file
with open("local_file.jpg", "rb") as data:
    blob_service_client.get_blob_client(
        container="uploads",
        blob="user_photo.jpg"
    ).upload_blob(data, overwrite=True)
```

## Deployment Workflow

1. **Development**:
   ```bash
   # Upload via Azure CLI
   az storage blob upload-batch \
     --destination "web" \
     --source "./dist" \
     --account-name "statreasurytrovedev"
   ```

2. **CI/CD Pipeline**:
   ```yaml
   - name: Deploy Static Content
     uses: azure/CLI@v1
     with:
       inlineScript: |
         az storage blob upload-batch \
           --destination "web" \
           --source "./build" \
           --account-name "${{ secrets.STORAGE_ACCOUNT_NAME }}" \
           --auth-mode login
   ```

## Security Considerations

- **Public Access**: Set `allow_public_access = false` for private content
- **Network Access**: Use `public_network_access_enabled = false` for VNet-only access
- **CORS**: Customize `cors_rules` for specific origins
- **HTTPS**: CDN enforces HTTPS automatically

## Cost Optimization

- **Standard Tier**: Use `account_tier = "Standard"` for cost efficiency
- **LRS Replication**: Use `replication_type = "LRS"` for single-region apps
- **CDN Tier**: Use `cdn_sku = "Standard_Microsoft"` for balanced performance/cost

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| storage_account_name | Globally unique storage account name | `string` | n/a | yes |
| resource_group_name | Resource group name | `string` | n/a | yes |
| location | Azure region | `string` | n/a | yes |
| project | Project name | `string` | n/a | yes |
| environment | Environment name | `string` | n/a | yes |
| enable_cdn | Enable CDN for performance | `bool` | `true` | no |
| custom_domain_name | Custom domain for CDN | `string` | `null` | no |
| webapp_principal_id | Webapp managed identity ID | `string` | `null` | no |

## Outputs

| Name | Description |
|------|-------------|
| static_website_url | URL of the static website |
| cdn_endpoint_url | CDN endpoint URL (if enabled) |
| primary_web_url | Primary URL (CDN or storage) |
| storage_account_name | Storage account name |
| blob_base_url | Base URL for blob access |

## Examples

### Basic Static Website
```hcl
module "static_site" {
  source = "./modules/blob_storage"

  storage_account_name = "myappstatic${var.environment}"
  resource_group_name  = local.resource_group_name
  location            = var.location
  project             = var.project
  environment         = var.environment
  tags               = local.tags

  enable_cdn = false  # Direct storage access
}
```

### Full CDN with Custom Domain
```hcl
module "static_site" {
  source = "./modules/blob_storage"

  storage_account_name = "myappcdn${var.environment}"
  resource_group_name  = local.resource_group_name
  location            = var.location
  project             = var.project
  environment         = var.environment
  tags               = local.tags

  enable_cdn         = true
  cdn_sku           = "Standard_Microsoft"
  custom_domain_name = "cdn.myapp.com"
}
```
