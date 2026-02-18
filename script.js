/**
 * CIRRUS AUTOMATIONS - STRATEGIC DIAGNOSTIC ENGINE
 * Version: 8.0 (Integrated High-Fidelity PDF & CRM Sync)
 * Features: Multi-page rendering, Base64 Webhook transfer, Business Name capture.
 */

// 1. DATA STRUCTURE: 33 STRATEGIC QUESTIONS
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

// 2. STATE MANAGEMENT
let currentStep = 0;
let totalScore = 0;
let auditLog = [];
let userSelections = {};
let userInfo = { name: "", email: "", business: "" };

// 3. NAVIGATION & UI LOGIC
function startQuiz() {
    userInfo.name = document.getElementById('name').value.trim();
    userInfo.email = document.getElementById('email').value.trim();
    userInfo.business = document.getElementById('business-name').value.trim();

    if (!userInfo.name || !userInfo.email || !userInfo.business) {
        alert("Please complete all identification fields.");
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
        btn.onclick = () => {
            totalScore += opt.score;
            userSelections[q.id] = opt.score;
            if (opt.val !== undefined) userSelections[q.id + "_val"] = opt.val;
            auditLog.push({ q: q.text, a: opt.text, category: q.category, score: opt.score, rec: opt.rec || "Maintain current standards." });
            currentStep++;
            renderQuestion();
        };
        container.appendChild(btn);
    });
    document.getElementById('progress').style.width = (currentStep / questions.length * 100) + '%';
}

// 4. ANALYSIS ENGINE
async function processResults() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    const maturityPct = Math.round((totalScore / (questions.length * 5)) * 100);
    const riskLevel = maturityPct < 50 ? "Critical" : (maturityPct < 75 ? "Medium" : "Low");
    const color = riskLevel === "Critical" ? "#ef4444" : (riskLevel === "Medium" ? "#f59e0b" : "#10b981");

    document.getElementById('risk-rating').innerText = riskLevel;
    document.getElementById('traffic-light').style.backgroundColor = color;

    // Prepare Template
    setupPdfTemplate(maturityPct, riskLevel, color);

    // Auto-Sync Webhook + PDF
    setTimeout(async () => {
        await generatePDF(true); // Triggers the webhook sync
    }, 1500);
}

// 5. TEMPLATE BUILDER (Captures Business Name)
function setupPdfTemplate(maturity, risk, color) {
    const element = document.getElementById('pdf-template');
    element.innerHTML = `
        <div style="padding: 40px; font-family: 'Helvetica', sans-serif; background: #fff;">
            <div style="border-bottom: 4px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="font-size: 32px; color: #0f172a; margin: 0;">Cirrus Automation Infrastructure Report</h1>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                <div>
                    <p style="margin: 0; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Prepared For</p>
                    <p style="font-size: 18px; font-weight: bold; color: #1e293b;">${userInfo.name}</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Company</p>
                    <p style="font-size: 18px; font-weight: bold; color: #1e293b;">${userInfo.business}</p>
                </div>
            </div>

            <div style="background: ${color}; color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
                <h2 style="margin: 0; font-size: 26px; font-weight: 800;">Infrastructure Maturity: ${maturity}%</h2>
                <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">Risk Profile: ${risk}</p>
            </div>

            <h3 style="color: #0f172a; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 20px;">Strategic Audit Log</h3>
            ${auditLog.map((item, idx) => `
                <div style="margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                    <p style="font-size: 11px; margin: 0; font-weight: bold; color: #334155;">#${idx + 1} ${item.q}</p>
                    <p style="font-size: 10px; margin: 4px 0 0; color: #64748b;">Response: ${item.a}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 6. HIGH-FIDELITY PDF GENERATOR (Supports multi-page & Webhook)
async function generatePDF(isAutoSend = false) {
    const btn = document.getElementById('pdf-btn');
    const element = document.getElementById('pdf-template');
    
    if (!isAutoSend) {
        btn.disabled = true;
        btn.innerText = 'Compiling High-Fidelity Report...';
    }

    const originalStyle = element.getAttribute('style') || '';
    
    // Force Visibility for Capture
    element.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: absolute !important;
        width: 800px !important;
        left: -10000px !important;
        background: white !important;
    `;

    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
        
        const pageWidth = 8.5, pageHeight = 11, margin = 0.4;
        const contentWidth = pageWidth - (margin * 2);
        const contentHeight = pageHeight - (margin * 2);
        const pxToInch = contentWidth / canvas.width;
        const maxCanvasHeight = contentHeight / pxToInch;
        const totalPages = Math.ceil(canvas.height / maxCanvasHeight);

        for (let page = 0; page < totalPages; page++) {
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = Math.min(maxCanvasHeight, canvas.height - page * maxCanvasHeight);
            
            const ctx = pageCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, page * maxCanvasHeight, canvas.width, pageCanvas.height, 0, 0, pageCanvas.width, pageCanvas.height);
            
            if (page > 0) pdf.addPage();
            pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.98), 'JPEG', margin, margin, contentWidth, pageCanvas.height * pxToInch);
        }

        if (!isAutoSend) {
            pdf.save(`Cirrus_Report_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
            btn.innerText = '📥 Export Professional PDF Report';
        } else {
            // CRM SYNC
            const pdfBlob = pdf.output('blob');
            await sendToWebhook(pdfBlob);
        }

    } catch (err) {
        console.error('Diagnostic PDF Error:', err);
        if (!isAutoSend) btn.innerText = 'Render Error: Try Again';
    } finally {
        element.setAttribute('style', originalStyle);
        if (!isAutoSend) btn.disabled = false;
    }
}

// 7. CRM WEBHOOK INTEGRATION
async function sendToWebhook(pdfBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
        const base64PDF = reader.result.split(',')[1];
        
        const payload = {
            fullName: userInfo.name,
            email: userInfo.email,
            businessName: userInfo.business,
            maturityScore: Math.round((totalScore / (questions.length * 5)) * 100),
            fileName: `${userInfo.name}_Cirrus_Diagnostic.pdf`,
            fileData: base64PDF,
            auditLog: JSON.stringify(auditLog)
        };

        const WEBHOOK_URL = "https://hook.us2.make.com/drsloaxbo9riybo89h865sygz29blebg";
        
        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("CRM: Record Synced Successfully.");
        } catch (e) {
            console.error("CRM: Webhook Delivery Failed", e);
        }
    };
}

// 8. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('pdf-btn');
    if (btn) btn.onclick = () => generatePDF(false);
});