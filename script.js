/**
 * CIRRUS AUTOMATIONS - LOGIC, SCORING, RISK & WEBHOOK ENGINE
 * COMPLETE INTEGRATED BUILD
 */

// --- CONFIGURATION: PASTE YOUR WEBHOOK URL HERE ---
const WEBHOOK_URL = "YOUR_MAKE_OR_AIRTABLE_WEBHOOK_URL_HERE";

const questions = [
    // ----- 1. MARKETING & CUSTOMER ACQUISITION -----
    {
        id: "leads",
        text: "How do you handle new inquiries from your website or social media?",
        options: [
            { text: "I manually reply to every message myself", score: 1,
              rec: "Build a Make.com scenario: Webhook (Typeform/Webflow) → Airtable ‘Leads’ → Email (Gmail) → Slack notification." },
            { text: "I have a basic auto-reply, then I take over", score: 3,
              rec: "Add lead scoring: Airtable formula (’engagement_score’) → Make router for hot/warm/cold → different sequences." },
            { text: "They flow into a CRM with automated follow-up sequences", score: 5 }
        ],
        insight: "Lead response within 5 minutes increases conversion by 391%.",
        category: "Marketing"
    },
    {
        id: "volume",
        text: "Avg monthly lead/customer volume?",
        options: [
            { text: "Over 50", score: 5, val: 50 },
            { text: "10 to 50", score: 3, val: 25 },
            { text: "Under 10", score: 1, val: 5 }
        ],
        category: "Marketing"
    },
    {
        id: "email_marketing",
        text: "How are your email marketing campaigns managed?",
        options: [
            { text: "I manually write and send each email", score: 1,
              rec: "Airtable ‘Subscribers’ table → Make ‘Email by Gmail’ module → track opens/clicks in Airtable." },
            { text: "I use templates but send manually or schedule individually", score: 3,
              rec: "Add behavior triggers: Airtable ‘Segment’ field → Make router for abandoned cart, welcome series." },
            { text: "Fully automated, segmented flows based on user behavior", score: 5 }
        ],
        insight: "Automated emails generate 320% more revenue than non‑automated.",
        category: "Marketing"
    },
    {
        id: "social_media",
        text: "How do you publish content on social media?",
        options: [
            { text: "Post manually on each platform", score: 1,
              rec: "Use Make’s ‘RSS to Social Media’ template: RSS feed → Twitter/Facebook/Linkedin modules." },
            { text: "Use a scheduler like Buffer or Later", score: 3,
              rec: "Connect Buffer to Make: Airtable ‘Content Calendar’ → Buffer → auto‑publish." },
            { text: "AI‑optimized scheduling + cross‑platform auto‑publishing", score: 5 }
        ],
        insight: "Marketers save 6+ hours/week with proper social automation.",
        category: "Marketing"
    },
    {
        id: "ad_optimization",
        text: "How are your paid ad campaigns optimized?",
        options: [
            { text: "I check and adjust bids manually", score: 1,
              rec: "Pull Facebook Ads cost per result into Airtable daily (Make ‘Facebook Ads’ module)." },
            { text: "Rules‑based adjustments (e.g., daily budget caps)", score: 3,
              rec: "Make scenario: if Airtable ‘ROAS’ < 2 → send Slack alert → manual bid adjustment." },
            { text: "AI‑powered bidding and creative testing", score: 5 }
        ],
        insight: "Automated bidding improves ROAS by 20‑30% on average.",
        category: "Marketing"
    },
    {
        id: "lead_scoring",
        text: "How do you identify which leads are ready to buy?",
        options: [
            { text: "Gut feel / all leads get the same follow‑up", score: 1,
              rec: "Airtable: add ‘email_opens’, ‘website_visits’ fields → Make sums → updates ‘score’ field." },
            { text: "Manual lead scoring in a spreadsheet", score: 3,
              rec: "Automate scoring: Make reads webhook data (page views, downloads) → adds points in Airtable." },
            { text: "Automated lead scoring based on engagement and firmographics", score: 5 }
        ],
        insight: "Automated lead scoring increases sales productivity by 30%.",
        category: "Marketing"
    },
    {
        id: "proposals",
        text: "How are quotes, proposals, or contracts created?",
        options: [
            { text: "Built from scratch in Word/PDF each time", score: 1,
              rec: "Use PandaDoc + Make: new Airtable ‘Deal’ record → generate proposal → store link back to Airtable." },
            { text: "Use templates with manual copy/paste", score: 3,
              rec: "Connect PandaDoc/Proposify to Airtable via Make – auto‑fill client fields." },
            { text: "Auto‑generated from CRM with e‑signature integrated", score: 5 }
        ],
        insight: "Automated proposals cut creation time by 80% and close 30% faster.",
        category: "Sales"
    },
    {
        id: "follow_up",
        text: "What happens after a prospect doesn't reply to your first email?",
        options: [
            { text: "I eventually follow up if I remember", score: 1,
              rec: "Make scenario: Airtable ‘Contacts’ → delay 3d → send Gmail → update ‘last_contacted’." },
            { text: "I have a sequence I manually trigger", score: 3,
              rec: "Add SMS via Twilio module + LinkedIn automation (PhantomBuster) orchestrated by Make." },
            { text: "Multi‑channel automated nurture sequence", score: 5 }
        ],
        insight: "80% of sales require 5 follow‑ups, yet most stop after 2.",
        category: "Sales"
    },
    {
        id: "contract_renewal",
        text: "How do you manage recurring contract renewals?",
        options: [
            { text: "Manually track dates and send renewal emails", score: 1,
              rec: "Airtable ‘Contracts’ table → Make daily check → 30d before expiry → send quote + email." },
            { text: "Calendar reminders + manual email", score: 3,
              rec: "Automate renewal quote generation: Airtable ‘Products’ + ‘Customer’ → PandaDoc → email." },
            { text: "Auto‑generated renewal quotes + automated reminders", score: 5 }
        ],
        insight: "Automated renewals can increase retention rates by 15‑20%.",
        category: "Sales"
    },
    {
        id: "reviews",
        text: "When a customer leaves a review, what is the process?",
        options: [
            { text: "No process / I see them when I have time", score: 1,
              rec: "Google Places / Yelp RSS → Make → Airtable ‘Reviews’ → Slack + auto‑tag sentiment." },
            { text: "I have a generic template I manually copy/paste", score: 3,
              rec: "Use OpenAI module in Make to generate personalized replies based on review text." },
            { text: "AI-enhanced response system based on customer sentiment", score: 5 }
        ],
        insight: "91% of consumers say reviews make them more likely to use a business.",
        category: "Customer Service"
    },
    {
        id: "onboarding",
        text: "What happens the moment a client pays their first invoice?",
        options: [
            { text: "I manually send an email and set up folders", score: 1,
              rec: "Make scenario: Stripe new invoice → create Airtable ‘Client’ record → Google Drive folder → send welcome email." },
            { text: "I have a semi-automated link but still check manually", score: 3,
              rec: "Add Airtable tasks: ‘Setup password’, ‘Share docs’ → assign to team member automatically." },
            { text: "Portals, folders, and tasks are triggered instantly", score: 5 }
        ],
        insight: "Automation reduces client churn by up to 25%.",
        category: "Customer Service"
    },
    {
        id: "support_tickets",
        text: "How are customer support requests tracked and answered?",
        options: [
            { text: "Email inbox only – no formal system", score: 1,
              rec: "Forward support@ to Airtable ‘Tickets’ via Make’s Email parser → auto‑reply with ticket ID." },
            { text: "Shared inbox or basic ticket tool", score: 3,
              rec: "Add Make router: if keywords ‘refund’ → high priority Slack; else → auto‑answer from Airtable FAQ." },
            { text: "AI‑powered chatbot + helpdesk with auto‑assignment", score: 5 }
        ],
        insight: "AI chatbots can resolve up to 70% of common queries instantly.",
        category: "Customer Service"
    },
    {
        id: "feedback",
        text: "How do you collect and act on customer feedback?",
        options: [
            { text: "No formal feedback collection", score: 1,
              rec: "Airtable ‘NPS’ table → Make weekly email campaign → update scores." },
            { text: "Send occasional surveys manually", score: 3,
              rec: "Typeform → Make → Airtable; if score < 7 → Slack to customer success." },
            { text: "Automated NPS/CSAT surveys with sentiment analysis", score: 5 }
        ],
        insight: "Businesses that act on feedback retain 55% more customers.",
        category: "Customer Service"
    },
    {
        id: "knowledge_base",
        text: "Do you provide self‑service support (FAQs, knowledge base)?",
        options: [
            { text: "No self‑service available", score: 1,
              rec: "Build Airtable ‘KB’ table → publish via Softr or Make’s ‘Website’ module." },
            { text: "Static FAQ page – rarely updated", score: 3,
              rec: "Connect Notion/Google Docs to Airtable via Make → auto‑sync changes → update website." },
            { text: "AI‑searchable knowledge base + auto‑suggested articles", score: 5 }
        ],
        insight: "Self‑service reduces support tickets by 30‑50%.",
        category: "Customer Service"
    },
    {
        id: "integration",
        text: "Are your core tools integrated (Stripe, Skool, CRM)?",
        options: [
            { text: "No, isolated islands", score: 1,
              rec: "Start with Make: connect Stripe → Airtable (new customers) → Mailchimp (tags)." },
            { text: "Basic Zaps or links", score: 3,
              rec: "Migrate Zaps to Make: use routers, aggregators, error handlers for robust workflows." },
            { text: "Deep Make.com ecosystem", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "admin",
        text: "Weekly hours spent on repetitive admin tasks?",
        options: [
            { text: "15+ hours", score: 1, val: 15,
              rec: "Audit top 3 tasks: data entry, report generation, email follow‑ups. Build Make scenarios for each." },
            { text: "5 to 10 hours", score: 3, val: 7,
              rec: "Identify one manual data sync – use Make’s ‘Schedule’ to automate it monthly." },
            { text: "Less than 2 hours", score: 5, val: 1 }
        ],
        insight: "15+ hours of owner admin signals a structural scale ceiling.",
        category: "Operations"
    },
    {
        id: "project_management",
        text: "How are internal tasks and projects assigned and tracked?",
        options: [
            { text: "Verbal / email / chat – no central tool", score: 1,
              rec: "Use Airtable as lightweight PM: ‘Projects’ table + ‘Tasks’ linked records. Make sends daily digest." },
            { text: "Task tool (Asana, Trello) but manually updated", score: 3,
              rec: "Make automation: new Airtable record → create Asana task; due date reminders." },
            { text: "Automated task creation from triggers, deadlines enforced", score: 5 }
        ],
        insight: "Automated workflows cut project delays by 40%.",
        category: "Operations"
    },
    {
        id: "document_management",
        text: "How are important documents and files organized?",
        options: [
            { text: "Local folders / scattered across email", score: 1,
              rec: "Create Airtable ‘Files’ table with attachment field; Make saves Gmail attachments automatically." },
            { text: "Cloud drive but no consistent naming/folders", score: 3,
              rec: "Make + Google Drive: rename files based on Airtable record, move to dated folders." },
            { text: "Auto‑filed, indexed, and backed up via workflow", score: 5 }
        ],
        insight: "Employees spend 20% of their week searching for internal info.",
        category: "Operations"
    },
    {
        id: "scheduling",
        text: "How do you schedule internal or client meetings?",
        options: [
            { text: "Back‑and‑forth emails to find a time", score: 1,
              rec: "Use Calendly + Make: new booking → Airtable ‘Appointments’ → Gmail confirmation." },
            { text: "Use a booking link (Calendly, etc.)", score: 3,
              rec: "Enhance: Make reads Calendly webhook, checks Airtable for previous meetings, sends tailored prep email." },
            { text: "AI‑assisted scheduling with buffer times, resync, reminders", score: 5 }
        ],
        insight: "Automated scheduling saves 8‑12 minutes per meeting.",
        category: "Operations"
    },
    {
        id: "inventory",
        text: "How do you manage inventory or digital product access?",
        options: [
            { text: "Manual tracking (spreadsheet / physical count)", score: 1,
              rec: "Airtable ‘Inventory’ table with min‑stock field; Make daily check → email alerts." },
            { text: "Basic alerts when stock is low", score: 3,
              rec: "Add Make HTTP module to reorder from supplier API when stock < threshold." },
            { text: "Real‑time automated replenishment or provisioning", score: 5 }
        ],
        insight: "Automated inventory reduces stockouts by 30% and carrying costs by 20%.",
        category: "Operations"
    },
    {
        id: "invoices",
        text: "What is the 'Life Cycle' of an unpaid invoice in your business?",
        options: [
            { text: "I check my bank balance to see who hasn't paid", score: 1,
              rec: "Stripe → Airtable (sync invoices). Make scenario: daily check for ‘past_due’ → send reminder via Gmail." },
            { text: "I send emails when I remember", score: 3,
              rec: "Add escalation: day 7 → Slack to owner; day 14 → generate late fee (Stripe)." },
            { text: "A multi-step 'Collections Engine' escalates reminders automatically", score: 5 }
        ],
        insight: "Automated reminders reduce DSO by an average of 14 days.",
        category: "Finance"
    },
    {
        id: "ticket",
        text: "Avg transaction or invoice value?",
        options: [
            { text: "Over $2,000", score: 5, val: 2000 },
            { text: "$500 - $2,000", score: 3, val: 1000 },
            { text: "Under $500", score: 1, val: 250 }
        ],
        category: "Finance"
    },
    {
        id: "expenses",
        text: "How are employee or business expenses tracked and approved?",
        options: [
            { text: "Paper receipts / email forwards", score: 1,
              rec: "Use Dext / Hubdoc → Make → Airtable ‘Expenses’ → approval request via Slack." },
            { text: "Spreadsheet tracking with manual approval", score: 3,
              rec: "Make automation: new receipt in Gmail → parse data → Airtable → notify approver." },
            { text: "Automated receipt scanning + approval workflows", score: 5 }
        ],
        insight: "Automated expense processing costs 70% less per report.",
        category: "Finance"
    },
    {
        id: "payroll",
        text: "How is payroll processed?",
        options: [
            { text: "Manual calculations and bank transfers", score: 1,
              rec: "Integrate Gusto with Make: new hire → Airtable → trigger payroll onboarding." },
            { text: "Payroll software but time tracking is manual", score: 3,
              rec: "Connect TSheets/Homebase → Make → Airtable → payroll summary." },
            { text: "Fully integrated time tracking, approval, and payroll", score: 5 }
        ],
        insight: "Payroll automation reduces errors by 80% and saves 3‑5 hours per cycle.",
        category: "Finance"
    },
    {
        id: "reporting",
        text: "How do you generate financial or operational reports?",
        options: [
            { text: "Manually pull data and build reports", score: 1,
              rec: "Make aggregates: Stripe + Airtable + Google Sheets → scheduled PDF to email." },
            { text: "Scheduled exports, but still use Excel", score: 3,
              rec: "Airtable ‘Dashboard’ base with linked tables; Make updates daily from source apps." },
            { text: "Live dashboards with automated data refresh", score: 5 }
        ],
        insight: "Automated reporting frees up 1 day per week for finance teams.",
        category: "Finance"
    },
    {
        id: "recruiting",
        text: "How do you screen job applicants?",
        options: [
            { text: "Manually review every resume", score: 1,
              rec: "Typeform → Airtable ‘Candidates’; Make sends Slack for review." },
            { text: "Use keyword filtering in job board", score: 3,
              rec: "Add OpenAI module in Make: summarize resume → calculate fit score → Airtable." },
            { text: "AI‑powered candidate matching and automated pre‑screening", score: 5 }
        ],
        insight: "AI screening reduces time‑to‑hire by 70%.",
        category: "People"
    },
    {
        id: "onboarding_employee",
        text: "What happens when a new employee joins?",
        options: [
            { text: "Manually send docs, set up accounts", score: 1,
              rec: "Airtable ‘Employees’ → Make: create Google Workspace user, Slack invite, add to payroll." },
            { text: "Checklist but requires manual chasing", score: 3,
              rec: "Automate account provisioning with Make’s ‘Okta’ / ‘Azure AD’ modules." },
            { text: "Automated account provisioning and training plan", score: 5 }
        ],
        insight: "Structured onboarding increases retention by 50%.",
        category: "People"
    },
    {
        id: "time_off",
        text: "How are time‑off requests handled?",
        options: [
            { text: "Email / chat, manager tracks manually", score: 1,
              rec: "Airtable ‘TimeOff’ form → Make → approval Slack button → calendar block." },
            { text: "Form submission but manual calendar update", score: 3,
              rec: "Make auto‑creates Google Calendar events and subtracts from allowance." },
            { text: "Automated request, approval, and calendar sync", score: 5 }
        ],
        insight: "Automated absence tracking reduces administrative work by 90%.",
        category: "People"
    },
    {
        id: "business_intelligence",
        text: "How do you measure key business metrics?",
        options: [
            { text: "I don't track consistently", score: 1,
              rec: "Define 5 KPIs; build Airtable ‘Metrics’ table; Make pulls from Stripe/GA weekly." },
            { text: "Monthly manual reports in spreadsheets", score: 3,
              rec: "Use Make to push data to Airtable → Softr dashboard or Google Looker." },
            { text: "Real‑time dashboard with AI anomaly detection", score: 5 }
        ],
        insight: "Data‑driven companies are 23x more likely to acquire customers.",
        category: "Data & AI"
    },
    {
        id: "forecasting",
        text: "How do you forecast sales or cash flow?",
        options: [
            { text: "Gut feeling / simple trend", score: 1,
              rec: "Start with Airtable ‘SalesPipeline’; Make sums weighted amounts → weekly email." },
            { text: "Historical averages in Excel", score: 3,
              rec: "Use Make’s ‘Data Store’ to store historicals → simple linear forecast." },
            { text: "AI‑assisted predictive forecasting", score: 5 }
        ],
        insight: "AI forecasting improves accuracy by 20‑30% vs. traditional methods.",
        category: "Data & AI"
    },
    {
        id: "data_integration",
        text: "Are your customer data sources unified?",
        options: [
            { text: "Data lives in separate silos", score: 1,
              rec: "Make central Airtable base; connect Stripe, Shopify, HubSpot via Make → sync daily." },
            { text: "Manual exports/imports between systems", score: 3,
              rec: "Use Make’s built‑in connectors; no code, schedule hourly syncs." },
            { text: "Unified customer view via CDP or middleware", score: 5 }
        ],
        insight: "Unified data increases marketing ROI by 15‑20%.",
        category: "Data & AI"
    },
    {
        id: "backup",
        text: "How is your critical business data backed up?",
        options: [
            { text: "No formal backup / rely on local copies", score: 1,
              rec: "Make scenario: daily export Airtable bases → Google Drive / Dropbox." },
            { text: "Manual periodic backups", score: 3,
              rec: "Automate: Make triggers backup every Monday, versioned folders." },
            { text: "Automated, versioned, off‑site backups", score: 5 }
        ],
        insight: "60% of small businesses close within 6 months of data loss.",
        category: "Compliance"
    },
    {
        id: "access_control",
        text: "How are user permissions and access managed?",
        options: [
            { text: "Everyone shares the same logins", score: 1,
              rec: "Implement SSO (Google Workspace); use Make to provision/de‑provision via SCIM." },
            { text: "Separate logins but manual onboarding/offboarding", score: 3,
              rec: "Automate with Make: HR Airtable → Okta/AD → Slack disable." },
            { text: "Automated role‑based provisioning and de‑provisioning", score: 5 }
        ],
        insight: "Automated access control reduces insider threat risk by 50%.",
        category: "Compliance"
    }
];

let currentStep = 0;
let totalScore = 0;
let auditLog = [];
let userSelections = {};
let userInfo = { name: "", email: "" };

function startQuiz() {
    userInfo.name = document.getElementById('name').value;
    userInfo.email = document.getElementById('email').value;

    if (!userInfo.name || !userInfo.email) {
        alert("Please enter both your name and operational email.");
        return;
    }

    document.getElementById('step0').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentStep];
    const qTextEl = document.getElementById('q-text');
    const optionsDiv = document.getElementById('options');

    qTextEl.innerText = q.text;
    optionsDiv.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(q.id, q.text, opt, q.insight, q.category);
        optionsDiv.appendChild(btn);
    });

    const progressPct = (currentStep / questions.length) * 100;
    const progressEl = document.getElementById('progress');
    if (progressEl) progressEl.style.width = progressPct + '%';
}

function selectOption(id, qText, opt, insight, category) {
    totalScore += opt.score;
    userSelections[id] = opt.score;
    if (opt.val) userSelections[id + "_val"] = opt.val;
    
    auditLog.push({ q: qText, a: opt.text, category: category, score: opt.score, insight: insight || "" });

    currentStep++;
    if (currentStep < questions.length) {
        renderQuestion();
    } else {
        processResults();
    }
}

// ----- MAKE.COM & AIRTABLE BLUEPRINTS LIBRARY -----
const blueprintLibrary = {
    "leads_airtable": `{"name": "Lead Management", "tables": [{"name": "Leads", "fields": [{"name": "Name", "type": "singleLineText"}, {"name": "Email", "type": "email"}, {"name": "Status", "type": "singleSelect", "options": {"choices": ["New", "Contacted", "Qualified", "Lost"]}}, {"name": "Score", "type": "number"}, {"name": "Last Contacted", "type": "date"}]}]}`,
    "leads_make": `{"scenario": "Webform → Airtable + Slack", "modules": [{"module": "Webhook", "trigger": "Receive form data"}, {"module": "Airtable", "operation": "Create Record", "base": "Lead Management", "table": "Leads"}, {"module": "Slack", "operation": "Send Message", "channel": "#leads"}]}`,
    "invoices_airtable": `{"name": "Invoicing", "tables": [{"name": "Invoices", "fields": [{"name": "Invoice ID", "type": "singleLineText"}, {"name": "Customer", "type": "singleLineText"}, {"name": "Amount", "type": "currency"}, {"name": "Due Date", "type": "date"}, {"name": "Status", "type": "singleSelect", "options": {"choices": ["Paid", "Unpaid", "Overdue"]}}, {"name": "Reminder Count", "type": "number"}]}]}`,
    "invoices_make": `{"scenario": "Daily unpaid invoice reminder", "modules": [{"module": "Schedule", "trigger": "Every day at 09:00"}, {"module": "Airtable", "operation": "Search Records", "base": "Invoicing", "table": "Invoices", "filter": "{Status} = 'Unpaid'"}, {"module": "Gmail", "operation": "Send Email", "to": "{{Customer Email}}", "subject": "Invoice overdue"}]}`,
    "onboarding_airtable": `{"name": "Client Onboarding", "tables": [{"name": "Clients", "fields": [{"name": "Company", "type": "singleLineText"}, {"name": "Primary Contact", "type": "singleLineText"}, {"name": "Email", "type": "email"}, {"name": "Start Date", "type": "date"}, {"name": "Onboarding Status", "type": "singleSelect", "options": {"choices": ["Welcome Sent", "Docs Signed", "Access Granted", "Complete"]}}]}]}`,
    "onboarding_make": `{"scenario": "Stripe invoice paid → onboarding flow", "modules": [{"module": "Stripe", "trigger": "New invoice paid"}, {"module": "Airtable", "operation": "Create Record", "base": "Client Onboarding", "table": "Clients"}, {"module": "Google Drive", "operation": "Create Folder", "name": "{{Company}} - {{Start Date}}"}, {"module": "Gmail", "operation": "Send Email", "subject": "Welcome!"}]}`,
    "support_airtable": `{"name": "Support Tickets", "tables": [{"name": "Tickets", "fields": [{"name": "Subject", "type": "singleLineText"}, {"name": "Requester", "type": "email"}, {"name": "Status", "type": "singleSelect", "options": {"choices": ["Open", "In Progress", "Resolved"]}}, {"name": "Priority", "type": "singleSelect", "options": {"choices": ["Low", "Medium", "High"]}}]}]}`,
    "support_make": `{"scenario": "Email to ticket", "modules": [{"module": "Email", "trigger": "Watch support@ mailbox"}, {"module": "Airtable", "operation": "Create Record", "base": "Support Tickets", "table": "Tickets"}, {"module": "Slack", "operation": "Send Message", "channel": "#support", "text": "New ticket from {{Requester}}"}]}`,
    "project_airtable": `{"name": "Project Hub", "tables": [{"name": "Projects", "fields": [{"name": "Project Name", "type": "singleLineText"}, {"name": "Deadline", "type": "date"}, {"name": "Status", "type": "singleSelect", "options": {"choices": ["On Track", "At Risk", "Completed"]}}]}, {"name": "Tasks", "fields": [{"name": "Task Name", "type": "singleLineText"}, {"name": "Assigned To", "type": "singleLineText"}, {"name": "Due Date", "type": "date"}, {"name": "Project", "type": "foreignKey", "foreignTable": "Projects"}]}]}`,
    "expenses_airtable": `{"name": "Expenses", "tables": [{"name": "Expenses", "fields": [{"name": "Date", "type": "date"}, {"name": "Merchant", "type": "singleLineText"}, {"name": "Amount", "type": "currency"}, {"name": "Category", "type": "singleSelect", "options": {"choices": ["Travel", "Software", "Office"]}}, {"name": "Receipt", "type": "multipleAttachments"}]}]}`,
    "feedback_airtable": `{"name": "Customer Feedback", "tables": [{"name": "NPS Responses", "fields": [{"name": "Customer Email", "type": "email"}, {"name": "Score", "type": "number"}, {"name": "Comment", "type": "multilineText"}, {"name": "Category", "type": "singleSelect", "options": {"choices": ["Promoter", "Passive", "Detractor"]}}]}]}`
};

const blueprintMap = {
    "leads": ["leads_airtable", "leads_make"],
    "invoices": ["invoices_airtable", "invoices_make"],
    "onboarding": ["onboarding_airtable", "onboarding_make"],
    "support_tickets": ["support_airtable", "support_make"],
    "project_management": ["project_airtable"],
    "expenses": ["expenses_airtable"],
    "feedback": ["feedback_airtable"]
};

function processResults() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    const progressEl = document.getElementById('progress');
    if (progressEl) progressEl.style.width = '100%';

    const weeklyAdmin = userSelections['admin_val'] || 1;
    const monthlyAdmin = weeklyAdmin * 4;
    const invoiceRiskFactor = userSelections['invoices'] === 1 ? 0.15 : (userSelections['invoices'] === 3 ? 0.07 : 0.02);
    const avgTicket = userSelections['ticket_val'] || 500;
    const monthlyVolume = userSelections['volume_val'] || 10;
    const annualRisk = Math.round(avgTicket * monthlyVolume * 12 * invoiceRiskFactor);

    // Scoring & Complexity
    const maxScore = questions.length * 5;
    const maturityPct = Math.round((totalScore / maxScore) * 100);

    const stdSum = (userSelections['invoices'] || 0) + (userSelections['integration'] || 0) + (userSelections['onboarding'] || 0);
    const stdComp = Math.round(((15 - stdSum) / 15) * 100);
    const aiSum = (userSelections['reviews'] || 0) + (userSelections['leads'] || 0) + (userSelections['admin'] || 0);
    const aiComp = Math.round(((15 - aiSum) / 15) * 100);
    const riskOffset = userSelections['integration'] === 1 ? 25 : 0;
    const finalComp = Math.min(99, Math.round((stdComp * 0.4) + (aiComp * 0.4) + riskOffset));

    // Category analysis
    const categoryScores = {};
    const categoriesList = ['Marketing', 'Sales', 'Customer Service', 'Operations', 'Finance', 'People', 'Data & AI', 'Compliance'];
    
    categoriesList.forEach(cat => {
        const catItems = auditLog.filter(item => item.category === cat);
        if (catItems.length > 0) {
            const avg = catItems.reduce((a, b) => a + b.score, 0) / catItems.length;
            categoryScores[cat] = Math.round((avg / 5) * 100);
        } else { categoryScores[cat] = 0; }
    });

    const sortedCategories = Object.keys(categoryScores).sort((a,b) => categoryScores[a] - categoryScores[b]);
    const topWeakCategories = sortedCategories.slice(0, 3);

    // Recommendations & Blueprints
    let recommendations = [];
    let blueprints = [];

    topWeakCategories.forEach(cat => {
        const lowItems = auditLog.filter(item => item.category === cat && item.score <= 3);
        lowItems.slice(0, 2).forEach(item => {
            const qObj = questions.find(q => q.text === item.q);
            const optObj = qObj.options.find(opt => opt.text === item.a);
            recommendations.push({
                category: cat,
                question: item.q,
                recommendation: optObj.rec || `Automate ${cat} data flows via Make.com.`,
                impact: item.insight || "Improves operational velocity."
            });
            if (blueprintMap[qObj.id]) {
                blueprintMap[qObj.id].forEach(key => {
                    if (blueprintLibrary[key]) blueprints.push({ category: cat, title: key.toUpperCase(), json: blueprintLibrary[key] });
                });
            }
        });
    });

    // Update UI
    document.getElementById('hours-lost').innerText = `${monthlyAdmin} hrs`;
    document.getElementById('revenue-risk').innerText = `$${annualRisk.toLocaleString()}`;
    document.getElementById('complexity-score').innerText = finalComp;
    document.getElementById('logic-std').innerText = stdComp + "%";
    document.getElementById('logic-ai').innerText = aiComp + "%";
    document.getElementById('logic-risk').innerText = riskOffset + "%";

    const light = document.getElementById('traffic-light');
    const badge = document.getElementById('status-badge');
    const riskRatingVal = document.getElementById('risk-rating');
    
    let statusText = "FRICTION";
    let color = "#f59e0b"; // Yellow-ish
    let riskLevel = "Medium";

    if (maturityPct >= 80) { color = "#10b981"; statusText = "OPTIMAL"; riskLevel = "Low"; }
    else if (maturityPct < 50) { color = "#ef4444"; statusText = "CRITICAL RISK"; riskLevel = "High"; }

    if (light) light.style.backgroundColor = color;
    if (badge) {
        badge.style.backgroundColor = color;
        badge.innerText = statusText;
    }
    if(riskRatingVal) riskRatingVal.innerText = riskLevel;

    document.getElementById('result-title').innerText = statusText + " - Diagnostic Complete";
    document.getElementById('diag-text').innerText = `Primary bottleneck: ${topWeakCategories[0]}. System maturity is at ${maturityPct}%.`;
    
    const nextStepsContainer = document.getElementById('next-steps-container');
    nextStepsContainer.innerHTML = recommendations.map(r => `<div class="action-item" style="border-left: 4px solid ${color};"><strong>🔧 ${r.category}:</strong> ${r.recommendation}</div>`).join('');

    // Update PDF placeholders inside the hidden template
    const pdfName = document.getElementById('pdf-name');
    const pdfDate = document.getElementById('pdf-date');
    if (pdfName) pdfName.innerText = userInfo.name;
    if (pdfDate) pdfDate.innerText = new Date().toLocaleDateString();
    
    // Automatic Webhook Trigger
    sendToWebhook(maturityPct, riskLevel, finalComp, annualRisk);
}

async function sendToWebhook(maturity, risk, complexity, revRisk) {
    if (!WEBHOOK_URL || WEBHOOK_URL.includes("YOUR_MAKE")) return;

    const payload = {
        name: userInfo.name,
        email: userInfo.email,
        maturity: maturity + "%",
        risk_level: risk,
        complexity_score: complexity,
        annual_revenue_risk: revRisk,
        timestamp: new Date().toISOString(),
        details: auditLog
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log("Diagnostic data synced.");
    } catch (e) {
        console.error("Webhook sync failed.", e);
    }
}

// --- FULLY INTEGRATED PDF GENERATION SECTION ---
async function generatePDF() {    
    const btn = document.getElementById('pdf-btn');    
    const element = document.getElementById('pdf-template');    
    btn.disabled = true;    
    btn.innerText = 'Preparing Report...';    
    
    // --- Save original styles ---    
    const originalStyle = element.getAttribute('style') || '';    
    
    // --- Apply the EXACT working layout (OPACITY = 1) ---    
    element.style.cssText = `        
        display: block !important;        
        visibility: visible !important;        
        opacity: 1 !important;          /* Fully opaque – browser MUST paint */        
        position: relative !important;        
        width: 800px !important;        
        margin: 20px auto !important;        
        background: white !important;        
        border: none !important;        
        z-index: 10000 !important;        
        pointer-events: none !important;        
        height: auto !important;    
    `;    
    
    // --- Force layout & fonts ---    
    element.offsetHeight;    
    await document.fonts.ready;    
    await new Promise(resolve => requestAnimationFrame(resolve)); // wait for paint    
    
    try {        
        // Capture canvas        
        const canvas = await html2canvas(element, {            
            scale: 2,            
            useCORS: true,            
            backgroundColor: '#ffffff',            
            logging: false,            
            allowTaint: false,        
        });        
        
        // Convert to JPEG        
        const imgData = canvas.toDataURL('image/jpeg', 0.98);        
        
        // Create PDF        
        const { jsPDF } = window.jspdf;        
        const pdf = new jsPDF({            
            unit: 'in',            
            format: 'letter',            
            orientation: 'portrait'        
        });        
        
        const pageWidth = pdf.internal.pageSize.getWidth();        
        const margin = 0.4;        
        const imgWidth = pageWidth - margin * 2;        
        const imgHeight = (canvas.height * imgWidth) / canvas.width;        
        
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);        
        pdf.save(`Diagnostic_Report_${(userInfo.name || 'client').replace(/\s+/g, '_')}.pdf`);        
        btn.innerText = '📥 Export Professional PDF Report';    
    } catch (err) {        
        console.error('PDF Generation Error:', err);        
        btn.innerText = 'Error: Try Again';    
    } finally {        
        // --- IMMEDIATELY restore original hidden styles ---        
        element.setAttribute('style', originalStyle);        
        btn.disabled = false;    
    }
}

// Attach Event Listener to PDF button once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }
});