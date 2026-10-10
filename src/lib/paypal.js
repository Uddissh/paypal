// Uses native fetch (Node 18+) - no node-fetch needed

const SANDBOX_BASE = 'https://api-m.sandbox.paypal.com';
const LIVE_BASE = 'https://api-m.paypal.com';

let cachedToken = null;
let tokenExpiry = 0;

export function getConfig() {
  return {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    environment: process.env.PAYPAL_ENVIRONMENT || 'SANDBOX',
  };
}

export function getBaseUrl() {
  const { environment } = getConfig();
  return environment === 'LIVE' ? LIVE_BASE : SANDBOX_BASE;
}

export async function getAccessToken(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const { clientId, clientSecret } = getConfig();
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${getBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`PayPal auth failed: ${response.status} ${err}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // Refresh 5 minutes before expiry
  tokenExpiry = now + (data.expires_in - 300) * 1000;
  return cachedToken;
}

export async function apiRequest(method, path, body = null) {
  const token = await getAccessToken();
  const url = `${getBaseUrl()}${path}`;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';

  let data;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(`PayPal API error [${response.status}]: ${JSON.stringify(data)}`);
  }

  // Extract invoice ID from HAL response (href contains the ID)
  if (data && data.href && !data.id) {
    const parts = data.href.split('/');
    data.id = parts[parts.length - 1];
  }

  return data;
}

// Convenience methods
export const paypal = {
  async createOrder(amount, currency = 'USD', intent = 'CAPTURE') {
    return apiRequest('POST', '/v2/checkout/orders', {
      intent,
      purchase_units: [{
        amount: { currency_code: currency, value: amount.toFixed(2) },
      }],
    });
  },

  async captureOrder(orderId) {
    return apiRequest('POST', `/v2/checkout/orders/${orderId}/capture`);
  },

  async getOrder(orderId) {
    return apiRequest('GET', `/v2/checkout/orders/${orderId}`);
  },

  // Invoicing
  async createInvoice(invoiceData) {
    return apiRequest('POST', '/v2/invoicing/invoices', invoiceData);
  },

  async sendInvoice(invoiceId) {
    return apiRequest('POST', `/v2/invoicing/invoices/${invoiceId}/send`);
  },

  async listInvoices(page = 1, pageSize = 20) {
    return apiRequest('GET', `/v2/invoicing/invoices?page=${page}&page_size=${pageSize}`);
  },

  async getInvoice(invoiceId) {
    return apiRequest('GET', `/v2/invoicing/invoices/${invoiceId}`);
  },

  async recordPayment(invoiceId, paymentData) {
    return apiRequest('POST', `/v2/invoicing/invoices/${invoiceId}/payments`, paymentData);
  },

  async generateInvoiceNumber() {
    return apiRequest('POST', '/v2/invoicing/generate-next-invoice-number');
  },

  async generateQRCode(invoiceId) {
    return apiRequest('POST', `/v2/invoicing/invoices/${invoiceId}/generate-qr-code`);
  },

  async cancelInvoice(invoiceId, notification = {}) {
    return apiRequest('POST', `/v2/invoicing/invoices/${invoiceId}/cancel`, notification);
  },

  async deleteInvoice(invoiceId) {
    return apiRequest('DELETE', `/v2/invoicing/invoices/${invoiceId}`);
  },

  async createProduct(productData) {
    return apiRequest('POST', '/v1/catalogs/products', productData);
  },

  async listProducts() {
    return apiRequest('GET', '/v1/catalogs/products');
  },

  async listTransactions(startDate, endDate) {
    return apiRequest('GET', `/v1/reporting/transactions?start_date=${startDate}&end_date=${endDate}&fields=all&page_size=100&page=1`);
  },

  async createPayout(batchData) {
    return apiRequest('POST', '/v1/payments/payouts', payoutData);
  },
};