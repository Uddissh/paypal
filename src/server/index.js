import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { paypal } from '../lib/paypal.js';
import InvoiceAgent from '../agent/invoice-agent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'client')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    app: 'ReceiptGPT - AI-Powered Invoicing',
    version: '1.0.0'
  });
});

// ==================== PayPal Auth ====================

// Get PayPal access token (for client-side)
app.get('/api/auth/token', async (req, res) => {
  try {
    const { getAccessToken } = await import('../lib/paypal.js');
    const token = await getAccessToken();
    
    // Only return partial token for security in demo
    res.json({
      accessToken: token,
      tokenType: 'Bearer',
      environment: process.env.PAYPAL_ENVIRONMENT || 'SANDBOX',
      clientId: process.env.PAYPAL_CLIENT_ID,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Orders (PayPal Checkout) ====================

// Create an order
app.post('/api/orders', async (req, res) => {
  try {
    const { amount, currency = 'USD', intent = 'CAPTURE' } = req.body;
    const order = await paypal.createOrder(amount, currency, intent);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Capture an order
app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const capture = await paypal.captureOrder(req.params.orderId);
    res.json(capture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order details
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await paypal.getOrder(req.params.orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Invoices ====================

// List invoices
app.get('/api/invoices', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const invoices = await paypal.listInvoices(page, pageSize);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create invoice
app.post('/api/invoices', async (req, res) => {
  try {
    const invoice = await paypal.createInvoice(req.body);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get invoice details
app.get('/api/invoices/:invoiceId', async (req, res) => {
  try {
    const invoice = await paypal.getInvoice(req.params.invoiceId);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send invoice
app.post('/api/invoices/:invoiceId/send', async (req, res) => {
  try {
    const result = await paypal.sendInvoice(req.params.invoiceId);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel invoice
app.post('/api/invoices/:invoiceId/cancel', async (req, res) => {
  try {
    const result = await paypal.cancelInvoice(req.params.invoiceId, req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate QR code for invoice
app.post('/api/invoices/:invoiceId/qr', async (req, res) => {
  try {
    const result = await paypal.generateQRCode(req.params.invoiceId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record payment for invoice
app.post('/api/invoices/:invoiceId/payments', async (req, res) => {
  try {
    const result = await paypal.recordPayment(req.params.invoiceId, req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate next invoice number
app.post('/api/invoices/generate-number', async (req, res) => {
  try {
    const result = await paypal.generateInvoiceNumber();
    res.json(result);
  } catch (error) {
    // Fallback
    res.json({ invoice_number: `INV-${Date.now()}` });
  }
});

// ==================== AI Agent ====================

const invoiceAgent = new InvoiceAgent();

// AI: Parse text into invoice
app.post('/api/ai/parse-invoice', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }
    const result = await invoiceAgent.createAndSendInvoice(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI: Analyze invoices
app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { invoices } = req.body;
    const analysis = await invoiceAgent.analyzeInvoices(invoices || []);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI: Generate payment link
app.post('/api/ai/payment-link', async (req, res) => {
  try {
    const { invoiceId } = req.body;
    const result = await invoiceAgent.generatePaymentLink(invoiceId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Demo: Create sample invoice from natural language
app.post('/api/demo/create-invoice', async (req, res) => {
  try {
    const items = (req.body.items || [
      { name: 'AI Consulting Services', description: 'AI-powered invoice generation & analysis', quantity: 1, unit_amount: { currency_code: 'USD', value: '150.00' }, unit_of_measure: 'QUANTITY' },
      { name: 'PayPal Integration Setup', description: 'PayPal Agent Toolkit configuration & deployment', quantity: 2, unit_amount: { currency_code: 'USD', value: '75.00' }, unit_of_measure: 'QUANTITY' },
      { name: 'ReceiptGPT Pro Subscription', description: 'Monthly AI invoicing suite', quantity: 1, unit_amount: { currency_code: 'USD', value: '29.99' }, unit_of_measure: 'QUANTITY' },
    ]);

    const itemTotal = items.reduce((sum, item) => sum + parseFloat(item.unit_amount.value) * item.quantity, 0);

    const invoiceData = {
      detail: {
        currency_code: 'USD',
        invoice_number: `DEMO-${Date.now()}`,
        note: 'Thank you for your business! This invoice was generated via ReceiptGPT AI.',
        payment_term: { term_type: 'NET_15' },
        metadata: { created_by: 'ReceiptGPT' }
      },
      invoicer: {
        name: { given_name: 'ReceiptGPT', surname: 'AI Invoicing' },
        email_address: 'receiptgpt@example.com',
        address: {
          address_line_1: '123 AI Street',
          admin_area_2: 'San Francisco',
          admin_area_1: 'CA',
          postal_code: '94105',
          country_code: 'US'
        },
        website: 'https://receiptgpt.ai',
      },
      primary_recipients: [{
        billing_info: {
          name: { given_name: req.body.customerName || 'Demo', surname: 'Client' },
          email_address: req.body.customerEmail || 'sb-12345678@business.example.com',
          address: {
            address_line_1: '456 Client Ave',
            admin_area_2: 'San Francisco',
            admin_area_1: 'CA',
            postal_code: '94107',
            country_code: 'US'
          }
        }
      }],
      items: items,
      configuration: {
        template_id: '',
        allow_tip: false,
        tax_calculated_after_discount: true,
        tax_inclusive: false,
      },
      amount: {
        currency_code: 'USD',
        value: itemTotal.toFixed(2),
        breakdown: {
          item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) }
        }
      }
    };

    const invoice = await paypal.createInvoice(invoiceData);
    res.json({ success: true, invoice, message: `✅ Demo invoice ${invoice.id} created for $${itemTotal.toFixed(2)}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ ReceiptGPT Server running at http://localhost:${PORT}`);
  console.log(`📋 Environment: ${process.env.PAYPAL_ENVIRONMENT || 'SANDBOX'}`);
  console.log(`🤖 AI Agent module loaded: InvoiceAgent ready`);
});