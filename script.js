/**
 * CIRRUS AUTOMATIONS - STRATEGIC DIAGNOSTIC ENGINE
 * Version: 7.0 (Zero-Truncation Multipage Engine - FIXED)
 */

const questions = [
    {
        id: "leads",
        text: "How do you handle new inquiries from your website or social media?",
        options: [
            { text: "I manually reply to every message myself", score: 1, rec: "Implement an automated Lead Triage system via Make.com." },
            { text: "I have a basic auto-reply, then I take over", score: 3, rec: "Upgrade auto-replies to dynamic AI-assisted responses." },
            { text: "They flow into a CRM with automated follow-up sequences", score: 5 }
        ],
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
            { text: "I manually write and send each email", score: 1, rec: "Airtable Subscribers → Make ‘Email by Gmail’ module." },
            { text: "I use templates but send manually", score: 3, rec: "Add behavior triggers for abandoned carts or welcome series." },
            { text: "Fully automated, segmented flows based on behavior", score: 5 }
        ],
        category: "Marketing"
    },
    {
        id: "social_media",
        text: "How do you publish content on social media?",
        options: [
            { text: "Post manually on each platform", score: 1, rec: "Use Make’s RSS to Social Media automation." },
            { text: "Use a scheduler like Buffer or Later", score: 3, rec: "Connect your content calendar to your scheduler via API." },
            { text: "AI‑optimized scheduling + cross‑platform auto‑publishing", score: 5 }
        ],
        category: "Marketing"
    },
    {
        id: "ad_optimization",
        text: "How are your paid ad campaigns optimized?",
        options: [
            { text: "I check and adjust bids manually", score: 1, rec: "Sync ad performance to Airtable for real-time visualization." },
            { text: "Rules‑based adjustments", score: 3, rec: "Set up automated alerts for ROAS drops below threshold." },
            { text: "AI‑powered bidding and creative testing", score: 5 }
        ],
        category: "Marketing"
    },
    {
        id: "lead_scoring",
        text: "How do you identify which leads are ready to buy?",
        options: [
            { text: "Gut feel / all leads get the same follow‑up", score: 1, rec: "Implement engagement scoring based on link clicks." },
            { text: "Manual lead scoring in a spreadsheet", score: 3, rec: "Automate scoring based on website page visits." },
            { text: "Automated lead scoring based on engagement", score: 5 }
        ],
        category: "Marketing"
    },
    {
        id: "proposals",
        text: "How are quotes, proposals, or contracts created?",
        options: [
            { text: "Built from scratch in Word/PDF each time", score: 1, rec: "Use PandaDoc + Make for one-click generation." },
            { text: "Use templates with manual copy/paste", score: 3, rec: "Map CRM fields directly into your document templates." },
            { text: "Auto‑generated from CRM with e‑signature integrated", score: 5 }
        ],
        category: "Sales"
    },
    {
        id: "follow_up",
        text: "What happens after a prospect doesn't reply to your first email?",
        options: [
            { text: "I eventually follow up if I remember", score: 1, rec: "Create a 3-step automated follow-up sequence." },
            { text: "I have a sequence I manually trigger", score: 3, rec: "Set triggers so sequences start upon form submission." },
            { text: "Multi‑channel automated nurture sequence", score: 5 }
        ],
        category: "Sales"
    },
    {
        id: "contract_renewal",
        text: "How do you manage recurring contract renewals?",
        options: [
            { text: "Manually track dates and send renewal emails", score: 1, rec: "Set up 30-day automated expiry alerts." },
            { text: "Calendar reminders + manual email", score: 3, rec: "Automate renewal quote generation via PandaDoc." },
            { text: "Auto‑generated renewal quotes + automated reminders", score: 5 }
        ],
        category: "Sales"
    },
    {
        id: "reviews",
        text: "When a customer leaves a review, what is the process?",
        options: [
            { text: "No process / I see them when I have time", score: 1, rec: "Sync reviews to Slack for immediate awareness." },
            { text: "I have a generic template I manually copy/paste", score: 3, rec: "Use AI to draft personalized review responses." },
            { text: "AI-enhanced response system based on sentiment", score: 5 }
        ],
        category: "Customer Service"
    },
    {
        id: "onboarding",
        text: "What happens the moment a client pays their first invoice?",
        options: [
            { text: "I manually send an email and set up folders", score: 1, rec: "Automate folder creation in Google Drive upon payment." },
            { text: "I have a semi-automated link but still check manually", score: 3, rec: "Trigger task lists automatically for the operations team." },
            { text: "Portals, folders, and tasks are triggered instantly", score: 5 }
        ],
        category: "Customer Service"
    },
    {
        id: "support_tickets",
        text: "How are customer support requests tracked and answered?",
        options: [
            { text: "Email inbox only – no formal system", score: 1, rec: "Implement an Airtable-based ticketing system." },
            { text: "Shared inbox or basic ticket tool", score: 3, rec: "Add keyword-based routing for critical issues." },
            { text: "AI‑powered chatbot + helpdesk with auto‑assignment", score: 5 }
        ],
        category: "Customer Service"
    },
    {
        id: "feedback",
        text: "How do you collect and act on customer feedback?",
        options: [
            { text: "No formal feedback collection", score: 1, rec: "Automate NPS surveys 14 days after project completion." },
            { text: "Send occasional surveys manually", score: 3, rec: "Sync survey results directly to your CRM." },
            { text: "Automated NPS/CSAT surveys with sentiment analysis", score: 5 }
        ],
        category: "Customer Service"
    },
    {
        id: "knowledge_base",
        text: "Do you provide self‑service support (FAQs, knowledge base)?",
        options: [
            { text: "No self‑service available", score: 1, rec: "Create a public-facing FAQ using Airtable and Softr." },
            { text: "Static FAQ page – rarely updated", score: 3, rec: "Build an AI-searchable knowledge hub." },
            { text: "AI‑searchable knowledge base + auto‑suggested articles", score: 5 }
        ],
        category: "Customer Service"
    },
    {
        id: "integration",
        text: "Are your core tools integrated (Stripe, Skool, CRM)?",
        options: [
            { text: "No, isolated islands", score: 1, rec: "Bridge your apps using Make.com (formerly Integromat)." },
            { text: "Basic Zaps or links", score: 3, rec: "Centralize data flow into a primary single source of truth." },
            { text: "Deep Make.com ecosystem", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "admin",
        text: "Weekly hours spent on repetitive admin tasks?",
        options: [
            { text: "15+ hours", score: 1, val: 15, rec: "You are at a scale ceiling. Immediate automation required." },
            { text: "5 to 10 hours", score: 3, val: 7, rec: "Automate your daily data syncing to save 5 hours." },
            { text: "Less than 2 hours", score: 5, val: 1 }
        ],
        category: "Operations"
    },
    {
        id: "project_management",
        text: "How are internal tasks and projects assigned and tracked?",
        options: [
            { text: "Verbal / email / chat – no central tool", score: 1, rec: "Adopt Airtable as your central Project Hub." },
            { text: "Task tool (Asana, Trello) but manually updated", score: 3, rec: "Sync project milestones to your team Slack." },
            { text: "Automated task creation from triggers", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "document_management",
        text: "How are important documents and files organized?",
        options: [
            { text: "Local folders / scattered across email", score: 1, rec: "Move all documentation to a cloud structure with strict naming." },
            { text: "Cloud drive but no consistent naming", score: 3, rec: "Automate file filing from Gmail to specific folders." },
            { text: "Auto‑filed, indexed, and backed up via workflow", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "scheduling",
        text: "How do you schedule internal or client meetings?",
        options: [
            { text: "Back‑and‑forth emails to find a time", score: 1, rec: "Implement Calendly or TidyCal immediately." },
            { text: "Use a booking link (Calendly, etc.)", score: 3, rec: "Automate pre-meeting prep emails based on booking data." },
            { text: "AI‑assisted scheduling with buffer times", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "inventory",
        text: "How do you manage inventory or digital product access?",
        options: [
            { text: "Manual tracking", score: 1, rec: "Use Airtable to track digital provisioning." },
            { text: "Basic alerts when stock is low", score: 3, rec: "Automate replenishment orders via API." },
            { text: "Real‑time automated replenishment", score: 5 }
        ],
        category: "Operations"
    },
    {
        id: "invoices",
        text: "What is the 'Life Cycle' of an unpaid invoice in your business?",
        options: [
            { text: "I check my bank balance manually", score: 1, rec: "Implement an automated collections engine." },
            { text: "I send emails when I remember", score: 3, rec: "Set up 7-day and 14-day automated reminders." },
            { text: "A multi-step 'Collections Engine' escalates automatically", score: 5 }
        ],
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
        text: "How are employee or business expenses tracked?",
        options: [
            { text: "Paper receipts / email forwards", score: 1, rec: "Use Hubdoc or Dext to scan receipts automatically." },
            { text: "Spreadsheet tracking with manual approval", score: 3, rec: "Automate approval requests via Slack." },
            { text: "Automated receipt scanning + approval workflows", score: 5 }
        ],
        category: "Finance"
    },
    {
        id: "payroll",
        text: "How is payroll processed?",
        options: [
            { text: "Manual calculations and transfers", score: 1, rec: "Switch to Gusto or equivalent for API support." },
            { text: "Payroll software but time tracking is manual", score: 3, rec: "Sync time-tracking software directly to payroll." },
            { text: "Fully integrated time tracking and payroll", score: 5 }
        ],
        category: "Finance"
    },
    {
        id: "reporting",
        text: "How do you generate financial or operational reports?",
        options: [
            { text: "Manually pull data and build reports", score: 1, rec: "Build a real-time reporting dashboard in Airtable." },
            { text: "Scheduled exports, but still use Excel", score: 3, rec: "Automate data aggregation from Stripe and CRM." },
            { text: "Live dashboards with automated data refresh", score: 5 }
        ],
        category: "Finance"
    },
    {
        id: "recruiting",
        text: "How do you screen job applicants?",
        options: [
            { text: "Manually review every resume", score: 1, rec: "Use AI to pre-screen and score candidates in Airtable." },
            { text: "Use keyword filtering in job board", score: 3, rec: "Automate screening interviews via video tools." },
            { text: "AI‑powered candidate matching", score: 5 }
        ],
        category: "People"
    },
    {
        id: "onboarding_employee",
        text: "What happens when a new employee joins?",
        options: [
            { text: "Manually send docs, set up accounts", score: 1, rec: "Automate account provisioning (Slack/Email) via Make." },
            { text: "Checklist but requires manual chasing", score: 3, rec: "Build a structured employee onboarding portal." },
            { text: "Automated account provisioning and training plan", score: 5 }
        ],
        category: "People"
    },
    {
        id: "time_off",
        text: "How are time‑off requests handled?",
        options: [
            { text: "Email / chat tracked manually", score: 1, rec: "Move to a form-based request system with auto-approvals." },
            { text: "Form submission but manual calendar update", score: 3, rec: "Sync approved leave directly to the company calendar." },
            { text: "Automated request, approval, and calendar sync", score: 5 }
        ],
        category: "People"
    },
    {
        id: "business_intelligence",
        text: "How do you measure key business metrics?",
        options: [
            { text: "I don't track consistently", score: 1, rec: "Define 5 core KPIs and automate their tracking." },
            { text: "Monthly manual reports in spreadsheets", score: 3, rec: "Build an automated KPI dashboard in Softr." },
            { text: "Real‑time dashboard with AI anomaly detection", score: 5 }
        ],
        category: "Data & AI"
    },
    {
        id: "forecasting",
        text: "How do you forecast sales or cash flow?",
        options: [
            { text: "Gut feeling / simple trend", score: 1, rec: "Implement linear forecasting based on historical CRM data." },
            { text: "Historical averages in Excel", score: 3, rec: "Automate your revenue projection calculations." },
            { text: "AI‑assisted predictive forecasting", score: 5 }
        ],
        category: "Data & AI"
    },
    {
        id: "data_integration",
        text: "Are your customer data sources unified?",
        options: [
            { text: "Data lives in separate silos", score: 1, rec: "Create a Customer Single Source of Truth base." },
            { text: "Manual exports/imports", score: 3, rec: "Sync Stripe, CRM, and Marketing via Make.com." },
            { text: "Unified customer view via middleware", score: 5 }
        ],
        category: "Data & AI"
    },
    {
        id: "backup",
        text: "How is your critical business data backed up?",
        options: [
            { text: "No formal backup / local copies only", score: 1, rec: "URGENT: Automate daily cloud-to-cloud backups." },
            { text: "Manual periodic backups", score: 3, rec: "Schedule automated versioned backups." },
            { text: "Automated, versioned, off‑site backups", score: 5 }
        ],
        category: "Compliance"
    },
    {
        id: "access_control",
        text: "How are user permissions managed?",
        options: [
            { text: "Everyone shares the same logins", score: 1, rec: "Implement individual SSO logins for all staff." },
            { text: "Separate logins but manual offboarding", score: 3, rec: "Automate account disabling upon staff exit." },
            { text: "Automated role‑based provisioning", score: 5 }
        ],
        category: "Compliance"
    }
];

let currentStep = 0;
let totalScore = 0;
let auditLog = [];
let userSelections = {};
let userInfo = { name: "", email: "" };

/** * INIT & NAVIGATION
 */
function startQuiz() {
    userInfo.name = document.getElementById('name').value.trim();
    userInfo.email = document.getElementById('email').value.trim();
    if (!userInfo.name || !userInfo.email) {
        alert("Enter your name and email.");
        return;
    }
    document.getElementById('step0').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentStep];
    if (!q) { processResults(); return; }
    
    document.getElementById('q-counter').innerText = `QUESTION ${currentStep + 1} OF ${questions.length}`;
    document.getElementById('q-text').innerText = q.text;
    const container = document.getElementById('options');
    container.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(q.id, q.text, opt, q.category);
        container.appendChild(btn);
    });
    
    document.getElementById('progress').style.width = (currentStep / questions.length * 100) + '%';
}

function selectOption(id, qText, opt, cat) {
    totalScore += opt.score;
    userSelections[id] = opt.score;
    if (opt.val !== undefined) userSelections[id + "_val"] = opt.val;
    auditLog.push({ q: qText, a: opt.text, category: cat, score: opt.score, rec: opt.rec });
    currentStep++;
    renderQuestion();
}

/** * ANALYSIS & CRM DISPATCH 
 */
async function processResults() {
    // UI Update
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    document.getElementById('progress').style.width = '100%';

    const maxScore = questions.length * 5;
    const maturityPct = Math.round((totalScore / maxScore) * 100);
    
    let riskPoints = 0;
    let matrixData = [];

    // Calculated Risk Logic
    if ((userSelections['admin_val'] || 0) >= 15) { riskPoints += 40; matrixData.push({ if: "Weekly admin load 15+ hours", then: "Scale ceiling reached.", root: "Manual handling.", control: "Automate orchestration." }); }
    if (userSelections['backup'] <= 1) { riskPoints += 40; matrixData.push({ if: "No cloud backup", then: "Data loss imminent.", root: "Manual versioning.", control: "Automate replication." }); }
    
    let riskLevel = "Low";
    if (riskPoints >= 70 || maturityPct < 45) riskLevel = "Critical";
    else if (riskPoints >= 30 || maturityPct < 75) riskLevel = "Medium";

    const annualRisk = Math.round((userSelections['ticket_val'] || 0) * (userSelections['volume_val'] || 0) * 12 * (riskPoints / 200));

    // Update Dashboard UI
    document.getElementById('hours-lost').innerText = `${(userSelections['admin_val'] || 0) * 4} hrs`;
    document.getElementById('revenue-risk').innerText = `$${annualRisk.toLocaleString()}`;
    document.getElementById('risk-rating').innerText = riskLevel;

    // PREPARE CRM DATA
    const formData = {
        name: userInfo.name,
        email: userInfo.email,
        score: maturityPct,
        riskLevel: riskLevel,
        revenueAtRisk: annualRisk,
        all33Questions: auditLog,
        risksArray: matrixData.map(m => m.then)
    };

    // 1. Build the PDF pages in the hidden div
    setupPdfTemplate(maturityPct, (userSelections['admin_val'] || 0) * 4, annualRisk, riskLevel, "#2563eb", matrixData);

    // 2. Trigger PDF & Webhook (Timeout ensures DOM is painted)
    setTimeout(async () => {
        try {
            const pdfBlob = await generatePDF(true); // 'true' = don't download, just return blob
            if (pdfBlob) {
                await sendAssessmentToCRM(formData, pdfBlob);
            }
        } catch (err) {
            console.error("Critical Sync Error:", err);
        }
    }, 1500);
}

/** * PDF ENGINE (HTML2CANVAS + JSPDF)
 */
async function generatePDF(silent = false) {
    const btn = document.getElementById('pdf-btn');
    const template = document.getElementById('pdf-template');
    const pages = template.querySelectorAll('.pdf-page-chunk');
    
    if (!pages.length) return null;
    if (!silent) { btn.disabled = true; btn.innerText = 'Compiling...'; }
    template.style.display = 'block';

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'in', 'letter');
        
        for (let i = 0; i < pages.length; i++) {
            const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true });
            const pageData = canvas.toDataURL('image/jpeg', 0.95);
            if (i > 0) pdf.addPage();
            pdf.addImage(pageData, 'JPEG', 0, 0, 8.5, 11);
        }

        const blob = pdf.output('blob');
        if (!silent) {
            pdf.save(`Assessment_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
            btn.innerText = '📥 Export PDF';
        }
        return blob;
    } catch (err) {
        console.error("PDF Gen Failed:", err);
        return null;
    } finally {
        template.style.display = 'none';
        if (!silent) btn.disabled = false;
    }
}

/** * WEBHOOK DISPATCHER 
 */
async function sendAssessmentToCRM(formData, pdfBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob); 
    
    reader.onloadend = async () => {
        const base64PDF = reader.result.split(',')[1]; 
        const payload = {
            fileName: `${formData.name}_Assessment.pdf`,
            fileData: base64PDF,
            lead: { name: formData.name, email: formData.email },
            analysis: formData,
            questions: formData.all33Questions
        };

        const WEBHOOK_URL = "https://hook.us2.make.com/drsloaxbo9riybo89h865sygz29blebg";
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    };
}

// Support Functions (Template Builders & Listeners)
function createPageDiv() {
    const div = document.createElement('div');
    div.className = 'pdf-page-chunk';
    div.style.width = "850px"; div.style.height = "1100px";
    div.style.padding = "60px"; div.style.background = "white";
    return div;
}

function setupPdfTemplate(maturity, hours, risk, status, color, matrix) {
    const template = document.getElementById('pdf-template');
    template.innerHTML = ''; 
    const page1 = createPageDiv();
    page1.innerHTML = `<h1 style="color:${color}">Cirrus Infrastructure Report</h1><p>Client: ${userInfo.name}</p><p>Maturity: ${maturity}%</p>`;
    template.appendChild(page1);
}

document.addEventListener('DOMContentLoaded', () => {
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) pdfBtn.onclick = () => generatePDF(false);
});