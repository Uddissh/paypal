# 🤖 ReceiptGPT — AI-Powered Invoicing Agent

> **PayPal + AI Hackathon Submission** · _Build What's Next with PayPal and AI_

ReceiptGPT transforms natural language into PayPal invoices instantly. Just describe what you want to bill for — "Web design $500, hosting $25/month" — and ReceiptGPT creates a professional PayPal invoice, manages it through its lifecycle, and provides payment links. No forms, no friction.

---

## ✨ Features

### 🧠 AI-Powered Invoice Generation
- **Natural Language Parsing**: Speak or type what you want to bill — ReceiptGPT extracts items, amounts, quantities, and customer info using intelligent text parsing.
- **Smart Suggestions**: Click one-tap examples to see it work instantly.
- **Conversational Agent**: The AI chat interface guides you through invoice creation step by step.

### 💳 PayPal Integration (Sandbox)
- **Invoice API**: Create, send, cancel, and manage invoices through PayPal's REST API v2
- **Orders API**: Create and capture PayPal payment orders
- **QR Code Generation**: Generate scannable payment QR codes for any invoice
- **Payment Links**: Shareable payment links for quick checkout
- **Reporting**: Transaction history and invoice analytics

### 🎨 Beautiful Interface
- Dark theme, glass-morphism UI with animated backgrounds
- Real-time invoice preview that updates as you converse
- Dashboard with stats and quick actions
- Toast notifications for feedback

### 📊 Business Intelligence
- Invoice analytics and status breakdown
- Transaction summary
- Invoice listing with search

---

## 🏗 Architecture

```
receiptgpt/
├── src/
│   ├── server/
│   │   └── index.js          # Express server with all PayPal REST API routes
│   ├── agent/
│   │   └── invoice-agent.js   # AI Agent: NLP invoice parser & business logic
│   ├── lib/
│   │   └── paypal.js          # PayPal API client (auth, orders, invoices, reporting)
│   └── client/
│       └── index.html         # Single-page application frontend
├── .env                       # PayPal sandbox credentials (see .env.template)
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PayPal Developer Account (sandbox credentials)

### Setup

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd receiptgpt
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.template .env
   # Edit .env with your PayPal sandbox credentials
   ```

   Your `.env` file should contain:
   ```
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_client_secret
   PAYPAL_ENVIRONMENT=SANDBOX
   PORT=3000
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🎯 How It Works

### 1. AI Invoice Creation
Describe your invoice in natural language:
> "Create an invoice for John at john@email.com: Web Design $500, Hosting $25/month, SEO Audit $300"

ReceiptGPT parses this into a structured PayPal invoice with items, quantities, unit amounts, and totals.

### 2. Invoice Preview
See a real-time preview of the generated invoice card with itemized details.

### 3. PayPal Integration
- **Send** the invoice through PayPal's invoicing API
- **Generate a payment link** or QR code for the invoice
- **Record payments** against the invoice
- **Cancel or delete** as needed

### 4. Business Insights
View invoice analytics: total invoiced, status breakdown, transaction history.

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **PayPal REST API v2** | Invoice management, orders, payments |
| **PayPal Invoicing API** | Create, send, manage invoices |
| **PayPal Orders API** | Payment order creation & capture |
| **Express.js** | Backend server & REST API |
| **AI/ML (NLP)** | Natural language invoice parsing |
| **ES Modules** | Modern JavaScript architecture |
| **CSS3** | Dark theme UI with animations |

---

## 🧪 Testing in Sandbox

The app runs entirely against the **PayPal Sandbox environment**. You can:
1. Create invoices with mock data
2. See the complete invoice lifecycle
3. Generate payment links and QR codes
4. View the invoice in the PayPal Developer Dashboard

---

## 🏆 Why ReceiptGPT Wins

### Judges' Criteria Coverage:

| Criteria | How ReceiptGPT Delivers |
|---|---|
| **Technological Implementation** | Deep PayPal API integration (invoicing, orders, auth, reporting) + AI NLP engine. Multi-layered architecture. |
| **Design** | Complete product experience: dark theme, animations, real-time preview, responsive layout. Not a proof-of-concept — a polished app. |
| **Potential Impact** | Freelancers and SMBs waste hours on invoicing. ReceiptGPT reduces it to seconds. Real problem, real audience. |
| **Innovation/Idea** | Voice/chat-to-invoice is novel. No other tool lets you just `speak` an invoice into existence using PayPal's enterprise-grade infrastructure. |
| **Presentation** | Live demo with one-click examples, clear video-ready flow, documented API integration. |

### Key Differentiators:
- ✅ **Working sandbox integration** — judges can test end-to-end
- ✅ **Natural language as UI** — not a form builder, a conversation
- ✅ **PayPal-native** — uses PayPal REST APIs directly (not a generic wrapper)
- ✅ **Beautiful UX** — hackathon judges love polished demos
- ✅ **Extensible** — could add PayPal Payouts, Subscriptions, Disputes next

---

## 📝 License

MIT — Open source for the hackathon

---

Built with ❤️ for the [PayPal + AI Hackathon](https://paypal-ai-hackathon.devpost.com/)