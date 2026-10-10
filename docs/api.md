

PayPal APIs use REST, authenticate with OAuth 2.0 access tokens, and return HTTP response codes and responses encoded in JSON. You can test US integrations with a PayPal Developer account.

You can try our REST APIs in Postman without a PayPal Developer account.
Learn more in our [Postman guide](/api/rest/postman).

 

Explore our REST API descriptions, generate code for your API clients,
and import OpenAPI documents into compatible third-party tools.

 

> **Warning:** **Important:** You'll need a [PayPal Business
> account](https://www.paypal.com/business/open-business-account) to do the
> following: - Go live with integrations. - Test integrations outside the US.

## 1. Get client ID and client secret [#1-get-client-id-and-client-secret]

PayPal integrations use a client ID and client secret to authenticate API calls:

* A client ID identifies an app. You only need a client ID to get a PayPal payment button and standard credit and debit card fields.
* A client secret authenticates a client ID. To call PayPal APIs, you'll exchange your client ID and client secret for an access token. Keep this secret safe.

Here's how to get your client ID and client secret:

1. Select Log in to Dashboard and log in or sign up.
2. Select **Apps & Credentials**.
3. New accounts come with a **Default Application** in the **REST API apps** section. To create a new project, select **Create App**.
4. Copy the client ID and client secret for your app.

## 2. Get access token [#2-get-access-token]

Exchange your client ID and client secret for an access token. The access token authenticates your app when calling PayPal REST APIs. You can call the PayPal OAuth API in any language. The following examples show you how to get your access token using cURL or Postman:

#### cURL

### cURL [#curl]

```bash
curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token" \
 -u "CLIENT_ID:CLIENT_SECRET" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "grant_type=client_credentials"
```

#### Modify the code [#modify-the-code]

1. Change `CLIENT_ID` to your client ID.
2. Change `CLIENT_SECRET` to your client secret.

> **Info:** **Note:** Encode `CLIENT_ID:CLIENT_SECRET` in Base64 before sending it in the
> API call.

#### Postman

### Postman [#postman]

In the Postman app, complete the following:

1. Set the verb to **POST**.
2. Enter `https://api-m.sandbox.paypal.com/v1/oauth2/token` as the request URL.
3. Select the **Authorization** tab.
4. From the **TYPE** list, select **Basic Auth**.
5. In the **Username** field, enter your client ID.
6. In the **Password** field, enter your client secret.
7. Select the **Body** tab.
8. Select the **x-www-form-urlencoded** option.
9. In the KEY field, enter `grant_type`.
10. In the VALUE field, enter `client_credentials`.
11. Select **Send**.

### Sample response [#sample-response]

PayPal returns an access token and the number of seconds the access token is valid.

```json
{
  "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api-m.paypal.com/v1/vault/credit-card https://api-m.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api-m.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks",
  "access_token": "A21AAFEpH4PsADK7qSS7pSRsgzfENtu-Q1ysgEDVDESseMHBYXVJYE8ovjj68elIDy8nF26AwPhfXTIeWAZHSLIsQkSYz9ifg",
  "token_type": "Bearer",
  "app_id": "APP-80W284485P519543T",
  "expires_in": 31668,
  "nonce": "2020-04-03T15:35:36ZaYZlGvEkV4yVSz8g6bAKFoGSEzuy3CQcz3ljhibkOHg"
}
```

### Make API calls [#make-api-calls]

When you make API calls, replace `ACCESS-TOKEN` with your access token in the authorization header: `-H Authorization: Bearer ACCESS-TOKEN`. When your access token expires, call `/v1/oauth2/token` again to request a new access token.

## 3. Get sandbox account credentials [#3-get-sandbox-account-credentials]

The PayPal sandbox is a test environment that mirrors real-world transactions. By default, PayPal developer accounts have 2 sandbox accounts: a personal account for buying and a business account for selling. You'll get the login information for both accounts. Watch sandbox money move between accounts to test API calls.

Take the following steps to get sandbox login information for business and personal accounts:

1. Log into the Developer Dashboard.
2. Select **Testing Tools** > **Sandbox Accounts**. You can create more sandbox accounts by selecting **Create account**.
3. Locate the account you want to get credentials for and select &#x2A;*⋮**
4. Select **View/Edit Account** to see mock information such as the account email and system-generated password.
5. Go to sandbox.paypal.com/signin and sign in with the personal sandbox credentials. In a separate browser, sign in with the business sandbox credentials.
6. Make API calls with your app's access token to see sandbox money move between personal and business accounts.

## More information [#more-information]

* [Sandbox Accounts](/sandbox-testing/overview) — Simulate transactions to test your app.
* [PayPal Partner Program](/platforms/get-started) — Make calls on behalf of a third party.