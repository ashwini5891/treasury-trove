# Linux Web App for the FastAPI webapp
resource "azurerm_linux_web_app" "webapp" {
  name                = "app-${var.project}-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = var.app_service_plan_id
  tags                = var.tags

  site_config {
    always_on = false  # Allow scale to zero

    # Health check settings
    health_check_path = var.health_check_path
    health_check_eviction_time_in_min = var.health_check_eviction_time_in_min

    application_stack {
      docker_image_name   = var.container_image
      docker_registry_url = var.docker_registry_url
    }
  }

  app_settings = merge({
    # Required environment variables
    "POSTGRES_URL" = var.postgres_connection_string

    # Port configuration
    "WEBSITES_PORT" = "80"

    # Enable container logging
    "DOCKER_ENABLE_CI" = "true"
  }, var.additional_app_settings)

  # Connection strings (if needed for additional databases)
  dynamic "connection_string" {
    for_each = var.connection_strings
    content {
      name  = connection_string.value.name
      type  = connection_string.value.type
      value = connection_string.value.value
    }
  }

  identity {
    type = "SystemAssigned"
  }

  logs {
    detailed_error_messages = true
    failed_request_tracing  = true

    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 35
      }
    }
  }
}

# Auto-scaling settings based on HTTP requests
resource "azurerm_monitor_autoscale_setting" "webapp" {
  name                = "autoscale-${var.project}-${var.environment}"
  resource_group_name = var.resource_group_name
  location            = var.location
  target_resource_id  = var.app_service_plan_id
  tags                = var.tags

  profile {
    name = "default"

    capacity {
      default = var.default_instances
      minimum = var.min_instances
      maximum = var.max_instances
    }

    # Scale out rule - increase instances when HTTP requests are high
    rule {
      metric_trigger {
        metric_name        = "Requests"
        metric_resource_id = azurerm_linux_web_app.webapp.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT5M"
        time_aggregation   = "Average"
        operator           = "GreaterThan"
        threshold          = var.scale_out_requests_threshold
      }

      scale_action {
        direction = "Increase"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }

    # Scale in rule - decrease instances when HTTP requests are low
    rule {
      metric_trigger {
        metric_name        = "Requests"
        metric_resource_id = azurerm_linux_web_app.webapp.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT10M"
        time_aggregation   = "Average"
        operator           = "LessThan"
        threshold          = var.scale_in_requests_threshold
      }

      scale_action {
        direction = "Decrease"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT10M"
      }
    }
  }

  notification {
    email {
      send_to_subscription_administrator    = false
      send_to_subscription_co_administrator = false
      custom_emails                         = var.notification_emails
    }
  }
}
