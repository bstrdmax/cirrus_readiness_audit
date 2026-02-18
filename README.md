<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aiB_PCXpV17JlTlVj-8n08aIY4gyJWuZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

   # Cirrus Automation Readiness Tool

A high-fidelity diagnostic dashboard designed to assess business infrastructure maturity, calculate operational risk, and provide strategic automation roadmaps.

## 🚀 Project Overview
The Cirrus tool is a 33-point diagnostic engine that evaluates businesses across six core categories:
1. **Marketing** (Lead triage & campaign automation)
2. **Sales** (Proposal generation & follow-ups)
3. **Customer Service** (Feedback loops & knowledge bases)
4. **Operations** (Integration & project management)
5. **Finance** (Invoicing & collections engines)
6. **People & Data** (Onboarding & BI reporting)

## 🧠 Logic & Scoring Engine
The tool uses a weighted scoring model to determine infrastructure maturity:
- **Maturity %**: A simple percentage based on the total achieved score vs. maximum possible score (165).
- **Risk Profile**: Determined by a "Structural IF-THEN Matrix." Critical risks (like lack of backups or manual lead handling) add significant weight to the risk profile, overriding basic scoring.
- **Financial Exposure**: Calculated by mapping transaction volume and average ticket value against the identified risk percentage.

## 📄 High-Fidelity PDF Engine (Zero-Truncation)
To solve common issues with text cutting off between pages, this app uses a **Page Chunking Model**:
- **Strategy**: Instead of capturing one long scrolling image, the code dynamically builds separate 8.5" x 11" HTML containers (pages) in memory.
- **Constraints**: 
  - 1 Executive Summary Page.
  - 3 Risk Matrix items per page.
  - 10 Audit Log questions per page.
- **Render**: Each container is rendered as an individual canvas and appended as a new page in the `jsPDF` instance, ensuring professional, perfectly aligned text every time.

---

## 🔗 Webhook & Airtable Integration Guide

Follow these steps to sync your assessment results directly to an Airtable database.

### 1. The Airtable Setup
Create an Airtable Base with a table named **"Assessments"** and the following fields:
- `Name` (Single line text)
- `Email` (Email)
- `Maturity Score` (Number/Percentage)
- `Risk Level` (Single Select: Low, Medium, Critical)
- `Revenue at Risk` (Currency)
- `Audit Log` (Long Text)

### 2. The Make.com (Bridge) Configuration
1. **Webhook Module**: Create a new scenario in [Make.com](https://make.com) and add a **Custom Webhook**.
2. **Copy the URL**: Paste the provided URL into the `WEBHOOK_URL` constant at the top of your `script.js`.
3. **Airtable Module**: Add an Airtable "Create a Record" module. Map the incoming JSON data from the webhook to your Airtable columns.

### 3. Implementation Code
Ensure your `script.js` contains the following logic to trigger the transfer upon assessment completion:

```javascript
async function sendToWebhook(data) {
    const WEBHOOK_URL = "YOUR_MAKE_URL_HERE";
    await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}
```

---

## 🛠 File Manifest
- `index.html`: Structural layout and PDF templates.
- `style.css`: Professional Navy/Slate design system.
- `script.js`: Core logic, scoring, and PDF chunking engine.
- `index.tsx`: Vanilla JS entry point (for platform compatibility).
- `metadata.json`: App permissions and description.

© 2026 Cirrus Automation | High Fidelity Business Optimization
