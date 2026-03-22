# Cirrus Automations: Backend Architecture & Integration SOP

**Document Purpose:** Standard Operating Procedure (SOP) for routing Cirrus Readiness Scorecard leads through Make.com, storing them in Airtable, and automatically onboarding them into the WordPress (BuddyPress/PMPro) community.

**Architecture Philosophy:** "Aggressive Simplicity." 
1. **The Interface:** Vanilla JS Web App
2. **The Glue:** Make.com
3. **The Brain:** Airtable
4. **The Community:** WordPress (BuddyPress + PMPro)

---

## Phase 1: Airtable Setup (The Brain)
Create a new Base in Airtable named `Cirrus Core Operations`. This will serve as the Single Source of Truth for all inbound leads.

### Table: `Readiness Assessments`
Create the following fields exactly as named to match the webhook payload:
* **Name:** Single line text
* **Email:** Email (Set as primary identifier/unique field)
* **Track:** Single select (`Business Operations`, `Individual Infrastructure`)
* **Readiness Score:** Number (Integer)
* **Risk Level:** Single select (`OPTIMIZED`, `FRAGMENTED`, `ANALOG`)
* **Blueprint PDF:** Attachment
* **Community Status:** Single select (`Pending`, `Invited`, `Active`)
* **Date Assessed:** Created time

---

## Phase 2: Make.com Setup (The Catcher)
Create a new Scenario in Make.com named `Inbound: Readiness Scorecard`.

### Step 2.1: The Webhook Module
1. Add a **Webhooks -> Custom Webhook** module as the trigger.
2. Click `Add`, name it `Cirrus Front-End Webhook`, and click `Save`.
3. Copy the generated URL to your clipboard.
4. Paste this URL into the `webhookURL` variable at the top of your `app.js` file.
5. **Critical Step:** In Make.com, click "Redetermine data structure," then go to your live web app and submit a test lead. Make.com will "catch" the `FormData` (including the PDF file) and learn the structure.

---

## Phase 3: Airtable Integration (The Storage)

### Step 3.1: Create the Record
1. Add an **Airtable -> Create a Record** module directly after the Webhook.
2. Connect your Airtable account via OAuth or Personal Access Token.
3. Select the `Cirrus Core Operations` Base and the `Readiness Assessments` table.
4. **Map the fields:**
    * Name -> `fullName` (from webhook)
    * Email -> `email` (from webhook)
    * Track -> `track` (from webhook)
    * Readiness Score -> `readinessScore` (from webhook)
    * Risk Level -> `riskLevel` (from webhook)
    * Blueprint PDF -> Map the `file` object (File name and Data) directly from the webhook payload.

---

## Phase 4: WordPress Community Integration (The Freemium Gate)
*Note: This requires the WordPress REST API to be active on your site, and the "Make" plugin installed on your WordPress instance if using Make's native WP modules.*

### Step 4.1: Create the WordPress User (BuddyPress Profile)
1. Add a **WordPress -> Create a User** module.
2. **Map the fields:**
    * Username: Map to `email` (or a formatted version of `fullName`).
    * Email: Map to `email`.
    * First Name: Map to `fullName`.
    * Role: `Subscriber` (or your default BuddyPress member role).
    * Password: Use Make.com's built-in `generateUUID()` or `addPassword()` function to generate a secure temporary password, or allow WordPress to generate and email it natively.

### Step 4.2: Assign Paid Memberships Pro (PMPro) Tier
1. Add an **HTTP -> Make an API Key Auth Request** module (or use the PMPro REST API).
2. **Endpoint:** `POST https://yourdomain.com/wp-json/pmpro/v1/change_membership_level`
3. **Payload:**
    * `user_id`: Map the ID from the previous WordPress module.
    * `level_id`: The ID of your "Freemium Community" level in PMPro (e.g., `1`).
4. *Result:* The user is now officially a free-tier member of the community.

---

## Phase 5: The Handoff (Email Delivery)
If you aren't letting WordPress handle the welcome email natively, build a custom delivery engine in Make.com.

### Step 5.1: Send the Welcome Email
1. Add a **Gmail / Microsoft 365 -> Send an Email** module.
2. **To:** Map to `email` (from webhook).
3. **Subject:** Your Cirrus Integration Blueprint & Community Access
4. **Content (HTML):**
    ```html
    <p>Hi {{fullName}},</p>
    <p>Your Readiness Score is <strong>{{readinessScore}}%</strong>.</p>
    <p>Attached is your custom Integration Blueprint.</p>
    <p>As promised, we have also unlocked your free access to the Cirrus Automations Community. Inside, you'll find tactical breakdowns on risk, strategy, and AI implementation.</p>
    <p><strong>Your Community Login:</strong><br>
    URL: [https://cirrusautomations.com/login](https://cirrusautomations.com/login)<br>
    Username: {{email}}<br>
    Password: Check for a separate email from WordPress to reset your password.</p>
    <p>Aggressive Simplicity,<br>The Cirrus Team</p>
    ```
5. **Attachments:** Map the `file` array from the original Webhook module so the PDF is physically attached to the email.

---
**End of SOP.**