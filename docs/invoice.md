---
title: Invoices v2
canonical: https://developer.paypal.com/api/invoicing/v2
openapi_schema:
  json: https://developer.paypal.com/api/invoicing/v2/schema.json
  yaml: https://developer.paypal.com/api/invoicing/v2/schema.yaml
---

# Invoices v2 (/api/invoicing/v2)

> This is an API reference page. The information below is a summary — the [JSON](https://developer.paypal.com/api/invoicing/v2/schema.json) and [YAML](https://developer.paypal.com/api/invoicing/v2/schema.yaml) schema are the preferred, authoritative source for exact parameters, request/response shapes, and validation rules.

## Base URL(s)

- https://api-m.sandbox.paypal.com

## Authentication

- Oauth2 (OAuth 2.0, clientCredentials)

## Operations

### invoices

- `GET` [List invoices](/api/invoicing/v2/invoices-list): Lists invoices.
- `POST` [Create draft invoice](/api/invoicing/v2/invoices-create): Creates a draft invoice.
- `POST` [Send invoice](/api/invoicing/v2/invoices-send): Sends or schedules an invoice, by ID, to be sent to a customer.
- `POST` [Send invoice reminder](/api/invoicing/v2/invoices-remind): Sends a reminder to the payer about an invoice, by ID.
- `POST` [Cancel sent invoice](/api/invoicing/v2/invoices-cancel): Cancels a sent invoice, by ID, and, optionally, sends a notification about the cancellation to the payer, merchant, and CC: emails.
- `POST` [Record payment for invoice](/api/invoicing/v2/invoices-payments): Records a payment for the invoice.
- `DELETE` [Delete external payment](/api/invoicing/v2/invoices-payments-delete): Deletes an external payment, by invoice ID and transaction ID.
- `POST` [Record refund for invoice](/api/invoicing/v2/invoices-refunds): Records a refund for the invoice.
- `DELETE` [Delete external refund](/api/invoicing/v2/invoices-refunds-delete): Deletes an external refund, by invoice ID and transaction ID.
- `POST` [Generate QR code](/api/invoicing/v2/invoices-generate-qr-code): Generates a QR code for an invoice, by ID.
- `POST` [Generate invoice number](/api/invoicing/v2/invoicing-generate-next-invoice-number): Generates the next invoice number that is available to the merchant.
- `GET` [Show invoice details](/api/invoicing/v2/invoices-get): Shows details for an invoice, by ID.
- `DELETE` [Delete invoice](/api/invoicing/v2/invoices-delete): Deletes a draft or scheduled invoice, by ID.
- `PUT` [Fully update invoice](/api/invoicing/v2/invoices-update): Fully updates an invoice, by ID.
- `POST` [Cancel auto reminders for an invoice.](/api/invoicing/v2/invoices-cancel-reminders): Cancels all scheduled automatic reminders for a specific invoice.

### search-invoices

- `POST` [Search for invoices](/api/invoicing/v2/invoices-search-invoices): Searches for and lists invoices that match search criteria.

### templates

- `GET` [List templates](/api/invoicing/v2/templates-list): Lists merchant-created templates with associated details.
- `POST` [Create template](/api/invoicing/v2/templates-create): Creates an invoice template.
- `GET` [Show template details](/api/invoicing/v2/templates-get): Shows details for a template, by ID.
- `DELETE` [Delete template](/api/invoicing/v2/templates-delete): Deletes a template, by ID.
- `PUT` [Fully update template](/api/invoicing/v2/templates-update): Fully updates a template, by ID.

### conditional-rules

- `GET` [Retrieve the conditional rule details for an Invoice](/api/invoicing/v2/get-invoice-conditional-rule-by-id): Retrieve the conditional rule details for an Invoice.
- `DELETE` [Delete the conditional rule details from the Invoice](/api/invoicing/v2/delete-invoice-conditional-rule): Delete the conditional rule associated with a given Invoice ID and conditional rule ID.
- `PUT` [Fully update conditional rule](/api/invoicing/v2/update-conditional-rule): Fully updates conditional rule for the invoice.
- `GET` [Retrieves all conditional rules for a given Invoice.](/api/invoicing/v2/get-invoice-conditional-rules): Retrieves all conditional rules details for an Invoice.
- `POST` [Create conditional rules](/api/invoicing/v2/create-conditional-rules): This will create the conditional rules for the invoice.

### recurring-invoices

- `POST` [Create a recurring invoice series](/api/invoicing/v2/recurring-invoices-create): Recurring invoices series that automatically generates and sends invoices to customers on a scheduled basis.
- `GET` [Get recurring invoice series details](/api/invoicing/v2/recurring-invoices-get): Get details for a recurring invoice series by ID.
- `DELETE` [Delete recurring invoice series](/api/invoicing/v2/recurring-invoices-delete): Delete recurring invoice series by ID.
- `PUT` [Update recurring invoice series details](/api/invoicing/v2/recurring-invoices-update): Update recurring invoice series details by ID.
- `POST` [Activate recurring invoice series](/api/invoicing/v2/recurring-invoices-activate): Activate recurring invoice series by ID, Once activated system will start sending invoices based on the schedule.
- `POST` [Cancel an active recurring invoice series](/api/invoicing/v2/recurring-invoices-cancel): Cancel recurring invoice series by ID.
- `POST` [Search recurring invoices series.](/api/invoicing/v2/recurring-invoices-search): Endpoint to search recurring invoice series based on search criteria.

### auto-reminder-configuration

- `POST` [Setup auto reminder configuration.](/api/invoicing/v2/auto-reminder-configuration-setup): Initializes the auto reminder configuration for a merchant account.
- `GET` [Get all invoice auto reminder configuration.](/api/invoicing/v2/auto-reminder-configuration-get-all): Retrieves all auto reminder configurations associated with the merchant account.
- `GET` [Retrieve an invoice auto reminder configuration](/api/invoicing/v2/auto-reminder-configuration-get): Retrieves the details of a specific auto reminder configuration by providing its unique configuration ID.
- `PUT` [Update invoice auto reminder configuration.](/api/invoicing/v2/auto-reminder-configuration-update): Updates an existing auto reminder configuration by providing the configuration ID and the updated settings in the request body.
- `POST` [Suspend invoice auto reminder configuration.](/api/invoicing/v2/auto-reminder-configuration-suspend): Temporarily deactivates an active auto reminder configuration by marking it as inactive.
- `POST` [Resume invoice auto reminder configuration.](/api/invoicing/v2/auto-reminder-configuration-resume): This operation activates the auto reminder configuration.

## Full schema

The list above is a summary. Full parameter, request, and response detail for every operation lives in the schema: [JSON](https://developer.paypal.com/api/invoicing/v2/schema.json) · [YAML](https://developer.paypal.com/api/invoicing/v2/schema.yaml)