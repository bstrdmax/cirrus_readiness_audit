/**
 * CIRRUS AUTOMATIONS - STRATEGIC DIAGNOSTIC ENGINE
 * Dual Path: Business (33 Questions) vs Individual (10 Questions)
 */

const businessQuestions = [
    { id: "leads", text: "How do you handle new inquiries from your website or social media?", options: [
        { text: "I manually reply to every message myself", score: 1, rec: "Implement an automated Lead Triage system using Make.com to capture leads into Airtable and notify sales." },
        { text: "I have a basic auto-reply, then I take over", score: 3, rec: "Upgrade auto-replies to AI responses using Google Gemini for smart lead qualification, integrated via Make.com." },
        { text: "They flow into a CRM with automated follow-ups", score: 5 }
    ], category: "Marketing" },
    { id: "volume", text: "Avg monthly lead/customer volume?", options: [
        { text: "Over 50", score: 5, val: 50 },
        { text: "10 to 50", score: 3, val: 25 },
        { text: "Under 10", score: 1, val: 5 }
    ], category: "Marketing" },
    { id: "email_marketing", text: "How are your email marketing campaigns managed?", options: [
        { text: "I manually write and send each email", score: 1, rec: "Sync Airtable to Make.com to automate email campaigns with personalized content." },
        { text: "I use templates but send manually", score: 3, rec: "Add behavior triggers using Make.com to send emails based on user actions." },
        { text: "Fully automated, segmented flows", score: 5 }
    ], category: "Marketing" },
    { id: "social_media", text: "How do you publish content on social media?", options: [
        { text: "Post manually on each platform", score: 1, rec: "Use Make.com's RSS automation to syndicate content to social platforms from Airtable." },
        { text: "Use a scheduler like Buffer or Later", score: 3, rec: "Connect your content calendar to Airtable and use Make.com to schedule posts via API." },
        { text: "AI‑optimized scheduling", score: 5 }
    ], category: "Marketing" },
    { id: "ad_optimization", text: "How are your paid ad campaigns optimized?", options: [
        { text: "I check and adjust bids manually", score: 1, rec: "Sync ad performance data to Airtable using Make.com for real-time dashboards." },
        { text: "Rules‑based adjustments", score: 3, rec: "Set up automated alerts via Make.com when ad spend exceeds thresholds." },
        { text: "AI‑powered bidding", score: 5 }
    ], category: "Marketing" },
    { id: "lead_scoring", text: "How do you identify which leads are ready to buy?", options: [
        { text: "Gut feel / generic follow-up", score: 1, rec: "Implement scoring on link clicks by tracking in Airtable via Make.com webhooks." },
        { text: "Manual lead scoring in spreadsheet", score: 3, rec: "Automate scoring via page visits using Airtable and Make.com." },
        { text: "Automated scoring based on engagement", score: 5 }
    ], category: "Marketing" },
    { id: "proposals", text: "How are quotes or contracts created?", options: [
        { text: "Built from scratch in Word each time", score: 1, rec: "Use Google Docs templates with Make.com to generate proposals from Airtable." },
        { text: "Use templates with manual copy/paste", score: 3, rec: "Map Airtable fields to Google Docs templates via Make.com for dynamic creation." },
        { text: "Auto‑generated from CRM", score: 5 }
    ], category: "Sales" },
    { id: "follow_up", text: "What happens after a prospect doesn't reply?", options: [
        { text: "I eventually follow up if I remember", score: 1, rec: "Create a 3-step automated email sequence in Make.com, triggered from Airtable." },
        { text: "I have a sequence I manually trigger", score: 3, rec: "Trigger sequences from form submission using Make.com." },
        { text: "Multi‑channel automated nurture", score: 5 }
    ], category: "Sales" },
    { id: "contract_renewal", text: "How do you manage recurring renewals?", options: [
        { text: "Manually track and send emails", score: 1, rec: "Set 30-day expiry alerts using Airtable date fields and Make.com notifications." },
        { text: "Calendar reminders + manual email", score: 3, rec: "Automate renewal quotes by syncing Airtable to billing via Make.com." },
        { text: "Auto‑generated quotes + reminders", score: 5 }
    ], category: "Sales" },
    { id: "reviews", text: "Process for customer reviews?", options: [
        { text: "No process / see them occasionally", score: 1, rec: "Sync reviews to Slack using Make.com, with Gemini sentiment analysis in Airtable." },
        { text: "Manual copy/paste template", score: 3, rec: "Use Gemini to draft responses to reviews, logged in Airtable." },
        { text: "AI-enhanced sentiment system", score: 5 }
    ], category: "Customer Service" },
    { id: "onboarding", text: "What happens when a client pays?", options: [
        { text: "I manually send email and set folders", score: 1, rec: "Automate folder creation in Google Drive via Make.com from Airtable." },
        { text: "Semi-automated link / manual check", score: 3, rec: "Trigger automated task lists in Airtable and send welcome emails via Make.com." },
        { text: "Portals and tasks triggered instantly", score: 5 }
    ], category: "Customer Service" },
    { id: "support_tickets", text: "How are support requests tracked?", options: [
        { text: "Email inbox only", score: 1, rec: "Use Airtable as a ticketing system with Make.com to route emails." },
        { text: "Shared inbox or basic tool", score: 3, rec: "Add keyword routing using Make.com filters." },
        { text: "AI‑powered chatbot + helpdesk", score: 5 }
    ], category: "Customer Service" },
    { id: "feedback", text: "How do you collect feedback?", options: [
        { text: "No formal collection", score: 1, rec: "Automate NPS surveys via Make.com, storing responses in Airtable." },
        { text: "Send occasional surveys manually", score: 3, rec: "Sync survey results to CRM using Make.com." },
        { text: "Automated surveys with sentiment analysis", score: 5 }
    ], category: "Customer Service" },
    { id: "knowledge_base", text: "Self‑service support availability?", options: [
        { text: "No self‑service", score: 1, rec: "Create FAQ using Airtable and a public interface like Softr." },
        { text: "Static FAQ page", score: 3, rec: "Build an AI-searchable hub using Airtable and Gemini." },
        { text: "AI‑searchable + auto-suggestions", score: 5 }
    ], category: "Customer Service" },
    { id: "integration", text: "Are tools integrated (Stripe, CRM, etc.)?", options: [
        { text: "No, isolated islands", score: 1, rec: "Bridge apps via Make.com to connect Airtable and Stripe." },
        { text: "Basic Zaps or links", score: 3, rec: "Centralize data flow with Airtable as the source of truth." },
        { text: "Deep Make.com ecosystem", score: 5 }
    ], category: "Operations" },
    { id: "admin", text: "Weekly hours on repetitive admin?", options: [
        { text: "15+ hours", score: 1, val: 15, rec: "Automation required immediately: Use Make.com to sync data." },
        { text: "5 to 10 hours", score: 3, val: 7, rec: "Automate daily data syncing with Make.com." },
        { text: "Less than 2 hours", score: 5, val: 1 }
    ], category: "Operations" },
    { id: "project_management", text: "Internal task tracking method?", options: [
        { text: "Verbal / chat – no central tool", score: 1, rec: "Use Airtable as a project hub with automated task creation." },
        { text: "Task tool manually updated", score: 3, rec: "Sync milestones to Slack via Make.com." },
        { text: "Automated task creation", score: 5 }
    ], category: "Operations" },
    { id: "document_management", text: "Document organization method?", options: [
        { text: "Local folders / scattered", score: 1, rec: "Move to cloud structure and organize with Airtable links." },
        { text: "Cloud drive – no naming convention", score: 3, rec: "Automate file filing using Make.com." },
        { text: "Auto‑filed and indexed via workflow", score: 5 }
    ], category: "Operations" },
    { id: "scheduling", text: "Meeting scheduling process?", options: [
        { text: "Back‑and‑forth emails", score: 1, rec: "Implement Calendly and sync bookings to Airtable via Make.com." },
        { text: "Use a booking link", score: 3, rec: "Automate pre-meeting prep by triggering Airtable workflows." },
        { text: "AI‑assisted scheduling", score: 5 }
    ], category: "Operations" },
    { id: "inventory", text: "Inventory or access management?", options: [
        { text: "Manual tracking", score: 1, rec: "Track access via Airtable, with Make.com sending alerts." },
        { text: "Basic alerts", score: 3, rec: "Automate replenishment via API using Make.com." },
        { text: "Real‑time auto-replenishment", score: 5 }
    ], category: "Operations" },
    { id: "invoices", text: "Lifecycle of an unpaid invoice?", options: [
        { text: "Manual bank check", score: 1, rec: "Implement collections engine in Airtable." },
        { text: "Email when I remember", score: 3, rec: "Set automated reminders via Make.com." },
        { text: "Auto-escalation collections engine", score: 5 }
    ], category: "Finance" },
    { id: "ticket", text: "Avg transaction or invoice value?", options: [
        { text: "Over $2,000", score: 5, val: 2000 },
        { text: "$500 - $2,000", score: 3, val: 1000 },
        { text: "Under $500", score: 1, val: 250 }
    ], category: "Finance" },
    { id: "expenses", text: "Expense tracking method?", options: [
        { text: "Paper receipts", score: 1, rec: "Use Dext and integrate with Airtable via Make.com." },
        { text: "Spreadsheet + manual approval", score: 3, rec: "Automate Slack approvals for expenses." },
        { text: "Automated scanning + workflows", score: 5 }
    ], category: "Finance" },
    { id: "payroll", text: "Payroll processing method?", options: [
        { text: "Manual calculations", score: 1, rec: "Switch to API-supported payroll and sync with Airtable." },
        { text: "Software + manual tracking", score: 3, rec: "Sync time tracking data from Airtable to payroll." },
        { text: "Fully integrated time and payroll", score: 5 }
    ], category: "Finance" },
    { id: "reporting", text: "Report generation method?", options: [
        { text: "Manual data pull", score: 1, rec: "Build Airtable dashboards with real-time data." },
        { text: "Scheduled Excel exports", score: 3, rec: "Automate aggregation using Make.com." },
        { text: "Live dashboards + auto-refresh", score: 5 }
    ], category: "Finance" },
    { id: "recruiting", text: "Job applicant screening process?", options: [
        { text: "Manual resume review", score: 1, rec: "Use AI pre-screening with Gemini in Airtable." },
        { text: "Keyword filtering", score: 3, rec: "Automate video interviews scheduling via Make.com." },
        { text: "AI‑powered candidate matching", score: 5 }
    ], category: "People" },
    { id: "onboarding_employee", text: "Employee onboarding process?", options: [
        { text: "Manual account setup", score: 1, rec: "Automate account provisioning using Make.com." },
        { text: "Checklist with manual chasing", score: 3, rec: "Build onboarding portal with Airtable." },
        { text: "Automated provisioning + training", score: 5 }
    ], category: "People" },
    { id: "time_off", text: "Time‑off request handling?", options: [
        { text: "Manual chat / email", score: 1, rec: "Use form-based requests with Make.com notifications." },
        { text: "Form + manual calendar update", score: 3, rec: "Sync leave to calendar via Make.com." },
        { text: "Auto request, approval, and sync", score: 5 }
    ], category: "People" },
    { id: "bi", text: "Measurement of business metrics?", options: [
        { text: "No consistent tracking", score: 1, rec: "Define core KPIs and track them in Airtable dashboards." },
        { text: "Monthly manual reports", score: 3, rec: "Build automated KPI dashboard." },
        { text: "Real‑time + AI anomaly detection", score: 5 }
    ], category: "Data & AI" },
    { id: "forecasting", text: "Sales or cash flow forecasting?", options: [
        { text: "Gut feel", score: 1, rec: "Implement linear forecasting using Airtable." },
        { text: "Historical Excel averages", score: 3, rec: "Automate projections with Airtable formulas." },
        { text: "AI‑assisted predictive forecasting", score: 5 }
    ], category: "Data & AI" },
    { id: "data_integration", text: "Customer data unification?", options: [
        { text: "Isolated silos", score: 1, rec: "Create Single Source of Truth in Airtable." },
        { text: "Manual exports/imports", score: 3, rec: "Sync via Make.com to keep records updated." },
        { text: "Unified view via middleware", score: 5 }
    ], category: "Data & AI" },
    { id: "backup", text: "Critical data backup method?", options: [
        { text: "No formal backup", score: 1, rec: "Automate cloud-to-cloud backup using Make.com." },
        { text: "Manual periodic backups", score: 3, rec: "Schedule versioned backups using Make.com." },
        { text: "Automated, versioned, off‑site", score: 5 }
    ], category: "Compliance" },
    { id: "access_control", text: "User permission management?", options: [
        { text: "Shared logins", score: 1, rec: "Implement SSO and manage roles in Airtable." },
        { text: "Separate logins / manual exit", score: 3, rec: "Automate offboarding via Make.com." },
        { text: "Automated role‑based provisioning", score: 5 }
    ], category: "Compliance" }
];

const individualQuestions = [
    { id: "personal_tasks", text: "How do you manage your daily to-do list?", options: [
        { text: "In my head or scattered paper notes", score: 1, rec: "Move to a digital task manager like Todoist or Notion to unlock automation capabilities." },
        { text: "Standard digital list (manual)", score: 3, rec: "Connect your email and calendar to your task manager using Make.com for auto-task creation." },
        { text: "Automated triage system", score: 5 }
    ], category: "Productivity" },
    { id: "scheduling_personal", text: "Meeting scheduling process?", options: [
        { text: "Back-and-forth email/chat", score: 1, rec: "Deploy a personal booking link (Calendly) to save 15+ minutes per meeting." },
        { text: "Manual booking link usage", score: 3, rec: "Use AI scheduling assistants to scan your availability and auto-draft meeting invites." },
        { text: "AI Scheduling Assistant", score: 5 }
    ], category: "Productivity" },
    { id: "ai_adoption", text: "How often do you use AI tools in your work?", options: [
        { text: "Rarely or never", score: 1, rec: "Start with AI-assisted drafting in Google Docs or Gmail to save 20% drafting time." },
        { text: "Occasionally for brainstorming", score: 3, rec: "Embed AI prompts directly into your workflow using browser extensions or API shortcuts." },
        { text: "Daily integrated usage", score: 5 }
    ], category: "AI Maturity" },
    { id: "info_access", text: "How do you retrieve past notes or files?", options: [
        { text: "Manual search in folders/emails", score: 1, rec: "Index your personal data in a 'Second Brain' system like Notion with AI search enabled." },
        { text: "Standard search bars", score: 3, rec: "Use a centralized information hub and tag data for semantic AI retrieval." },
        { text: "AI Knowledge Retrieval System", score: 5 }
    ], category: "Knowledge" },
    { id: "personal_admin", text: "Time lost to 'low-value' digital management?", options: [
        { text: "2+ hours per day", score: 1, val: 2, rec: "Identify the top 3 manual 'copy-paste' tasks and automate them via Make.com." },
        { text: "30-60 mins per day", score: 3, val: 0.5, rec: "Create keyboard shortcuts and browser macros for common repetitive actions." },
        { text: "Minimal (under 10 mins)", score: 5, val: 0.1 }
    ], category: "Efficiency" }
];

let selectedPath = 'business', currentStep = 0, totalScore = 0, auditLog = [], userSelections = {}, userInfo = { name: "", email: "", business: "" };
let activeQuestions = [];

function selectPath(path) {
    selectedPath = path;
    activeQuestions = path === 'business' ? businessQuestions : individualQuestions;
    document.getElementById('step-path').classList.remove('active');
    document.getElementById('step0').classList.add('active');

    if (path === 'individual') {
        document.getElementById('biz-field').style.display = 'none';
        document.getElementById('onboarding-title').innerText = "Analyze Your Workflow";
        document.getElementById('onboarding-desc').innerText = "Enter your details to begin the personal diagnostic assessment.";
        document.getElementById('main-title').innerText = "Individual Readiness Tool";
    }
}

function startQuiz() {
    userInfo.name = document.getElementById('name').value.trim();
    userInfo.email = document.getElementById('email').value.trim();
    userInfo.business = document.getElementById('business-name').value.trim() || "Individual";
    if (!userInfo.name || !userInfo.email) { alert("Please fill all fields."); return; }
    document.getElementById('step0').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    renderQuestion();
}

function renderQuestion() {
    const q = activeQuestions[currentStep];
    if (!q) { processResults(); return; }
    document.getElementById('q-counter').innerText = `QUESTION ${currentStep + 1} OF ${activeQuestions.length}`;
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
            auditLog.push({ q: q.text, a: opt.text, category: q.category, score: opt.score, rec: opt.rec || "Maintain current standard." });
            currentStep++;
            renderQuestion();
        };
        container.appendChild(btn);
    });
    document.getElementById('progress').style.width = (currentStep / activeQuestions.length * 100) + '%';
}

async function processResults() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    const maturity = Math.round((totalScore / (activeQuestions.length * 5)) * 100);
    const risk = maturity < 45 ? "Critical" : (maturity < 75 ? "Medium" : "Low");
    
    document.getElementById('metric1-val').innerText = `${maturity}%`;
    document.getElementById('risk-rating').innerText = risk;
    document.getElementById('traffic-light').style.backgroundColor = maturity < 45 ? '#ef4444' : (maturity < 75 ? '#f59e0b' : '#10b981');

    let annualRisk = 0;
    let timeMetric = "";

    if (selectedPath === 'business') {
        annualRisk = Math.round((userSelections['ticket_val'] || 0) * (userSelections['volume_val'] || 0) * 12 * 0.15);
        document.getElementById('metric2-val').innerText = `$${annualRisk.toLocaleString()}`;
        document.getElementById('metric2-label').innerText = "Revenue Risk";
        timeMetric = `$${annualRisk.toLocaleString()}/yr Risk`;
    } else {
        const annualHours = Math.round((userSelections['personal_admin_val'] || 0) * 5 * 52);
        document.getElementById('metric2-val').innerText = `${annualHours} hrs`;
        document.getElementById('metric2-label').innerText = "Annual Time Potential";
        document.getElementById('metric1-label').innerText = "AI Readiness";
        timeMetric = `${annualHours} Hours Saved/yr`;
    }

    const catAverages = calculateCategoryAverages();
    const rootCause = getRootCause(catAverages);
    const recommendations = auditLog.filter(i => i.score <= 3).slice(0, 10);

    document.getElementById('diag-text').innerHTML = rootCause.detailedSummary;
    document.getElementById('next-steps-container').innerHTML = recommendations.map(r => `<div class="action-item">${r.rec}</div>`).join('');

    setupPdfTemplate(maturity, risk, timeMetric, recommendations, rootCause);

    try {
        const pdfBlob = await generatePDF(true);
        if (pdfBlob) await sendToWebhook(userInfo, maturity, risk, annualRisk, auditLog, pdfBlob);
    } catch (e) { console.error("Auto-sync failed", e); }
}

function calculateCategoryAverages() {
    const data = {};
    auditLog.forEach(i => {
        if (!data[i.category]) data[i.category] = { t: 0, c: 0 };
        data[i.category].t += i.score;
        data[i.category].c++;
    });
    const res = {};
    for (const k in data) res[k] = data[k].t / data[k].c;
    return res;
}

function getRootCause(avgs) {
    let lowCat = null, lowAvg = 6;
    for (const k in avgs) if (avgs[k] < lowAvg) { lowAvg = avgs[k]; lowCat = k; }
    const insight = selectedPath === 'business' 
        ? `Manual friction in your <strong>${lowCat}</strong> systems is causing revenue leakage and slowing scale.`
        : `Your <strong>${lowCat}</strong> workflow is the primary source of digital friction, preventing optimal productivity.`;
    return { detailedSummary: insight };
}

/** * PDF TEMPLATE GENERATOR */
function setupPdfTemplate(score, risk, moneyText, recs, root) {
    const template = document.getElementById('pdf-template');
    template.innerHTML = ''; // Clear old content

    // PAGE 1: EXECUTIVE SUMMARY
    const p1 = createPageDiv();
    p1.innerHTML = `
        <div style="border-bottom: 4px solid #0f172a; padding-bottom:20px; margin-bottom:40px;">
            <h1 style="font-size:32px; margin:0; color:#0f172a;">CIRRUS READINESS REPORT</h1>
            <p style="margin:5px 0 0; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Path: ${selectedPath.toUpperCase()}</p>
        </div>
        
        <div style="display:flex; justify-content:space-between; margin-bottom:40px; background:#f8fafc; padding:25px; border-radius:12px; border:1px solid #e2e8f0;">
            <div>
                <small style="color:#64748b; font-weight:800; text-transform:uppercase; font-size:10px;">Prepared For</small><br>
                <strong style="font-size:18px; color:#1e293b;">${userInfo.name}</strong>
            </div>
            <div style="text-align:right;">
                <small style="color:#64748b; font-weight:800; text-transform:uppercase; font-size:10px;">Organization</small><br>
                <strong style="font-size:18px; color:#1e293b;">${userInfo.business}</strong>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:40px;">
            <div style="background:#2563eb; color:white; padding:30px; border-radius:16px; text-align:center;">
                <h2 style="margin:0; font-size:48px;">${score}%</h2>
                <p style="margin:5px 0 0; font-weight:800; text-transform:uppercase; font-size:12px; opacity:0.9;">Readiness Score</p>
            </div>
            <div style="background:#0f172a; color:white; padding:30px; border-radius:16px; text-align:center;">
                <h2 style="margin:0; font-size:32px;">${risk}</h2>
                <p style="margin:5px 0 0; font-weight:800; text-transform:uppercase; font-size:12px; opacity:0.9;">Risk Profile</p>
            </div>
        </div>

        <div style="background:#f1f5f9; padding:30px; border-radius:16px; margin-bottom:30px; border-left:8px solid #2563eb;">
            <h3 style="margin:0 0 10px; font-size:14px; text-transform:uppercase; color:#2563eb;">Diagnostic Insight</h3>
            <p style="margin:0; font-size:16px; line-height:1.6; color:#1e293b;">${root.detailedSummary}</p>
        </div>

        <div style="text-align:center; padding:20px; background:#f8fafc; border-radius:12px; border:1px dashed #cbd5e1;">
            <strong style="font-size:14px; color:#64748b; text-transform:uppercase;">Impact Forecast:</strong>
            <span style="font-size:20px; font-weight:900; color:#0f172a; margin-left:10px;">${moneyText}</span>
        </div>
    `;
    template.appendChild(p1);

    // PAGE 2: PRIORITY ACTIONS
    const p2 = createPageDiv();
    p2.innerHTML = `
        <h2 style="border-bottom: 2px solid #0f172a; padding-bottom:10px; color:#0f172a;">Priority Action Items</h2>
        <p style="margin:15px 0 25px; color:#64748b;">Based on your assessment, these are the most critical steps to take immediately using your current stack (Airtable, Make.com, Gemini):</p>
        
        <div style="display:flex; flex-direction:column; gap:15px;">
            ${recs.map((r, i) => `
                <div style="padding:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; display:flex; gap:15px; align-items:center;">
                    <div style="width:30px; height:30px; background:#2563eb; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:14px; flex-shrink:0;">${i+1}</div>
                    <div style="font-size:14px; font-weight:600; color:#1e293b;">${r.rec}</div>
                </div>
            `).join('')}
        </div>
    `;
    template.appendChild(p2);

    // PAGE 3+: FULL AUDIT LOG (Question & Answer History)
    const auditChunks = chunkArray(auditLog, 10); // 10 questions per page for spacing
    auditChunks.forEach((chunk, pageIdx) => {
        const pAudit = createPageDiv();
        pAudit.innerHTML = `
            <h2 style="border-bottom: 2px solid #0f172a; padding-bottom:10px; color:#0f172a; margin-bottom:25px;">Detailed Assessment History (Page ${pageIdx + 1})</h2>
            <div style="display:flex; flex-direction:column; gap:20px;">
                ${chunk.map((item, i) => `
                    <div style="border-bottom:1px solid #f1f5f9; padding-bottom:15px;">
                        <div style="font-size:11px; font-weight:800; color:#2563eb; text-transform:uppercase; margin-bottom:4px;">${item.category} • Question ${pageIdx * 10 + i + 1}</div>
                        <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:8px;">${item.q}</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:10px 15px; border-radius:8px; border:1px solid #f1f5f9;">
                            <span style="font-size:13px; color:#475569;">Selected: <strong>${item.a}</strong></span>
                            <span style="font-size:12px; font-weight:800; color:${item.score >= 4 ? '#10b981' : (item.score >= 3 ? '#f59e0b' : '#ef4444')};">
                                SCORE: ${item.score}/5
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        template.appendChild(pAudit);
    });
}

/** * PDF RENDERER (Supports Multi-Page) */
async function generatePDF(auto = false) {
    const btn = document.getElementById('pdf-btn');
    if (!auto) { btn.innerText = "Compiling Report..."; btn.disabled = true; }
    
    const template = document.getElementById('pdf-template');
    template.style.display = 'block';
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
        const pages = template.querySelectorAll('.pdf-page-chunk');

        for (let i = 0; i < pages.length; i++) {
            if (i > 0) pdf.addPage();
            
            // Wait for any potential rendering frame
            await new Promise(resolve => requestAnimationFrame(resolve));
            
            const canvas = await html2canvas(pages[i], { 
                scale: 2, 
                useCORS: true, 
                backgroundColor: '#ffffff' 
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            // 8.5x11 inches. With 0.4 margin, effective width is 7.7 inches.
            // Maintain aspect ratio: (7.7 / canvasWidth) * canvasHeight
            const imgWidth = 7.7;
            const imgHeight = (imgWidth * canvas.height) / canvas.width;
            
            pdf.addImage(imgData, 'JPEG', 0.4, 0.4, imgWidth, imgHeight);
        }

        if (auto) return pdf.output('blob');
        pdf.save(`Cirrus_Report_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
        console.error("PDF Generation Error:", err);
        return null;
    } finally {
        template.style.display = 'none';
        if (!auto) { btn.innerText = "📥 Export Professional PDF Report"; btn.disabled = false; }
    }
}

async function sendToWebhook(info, score, risk, rev, logs, blob) {
    const fd = new FormData();
    fd.append('fullName', info.name);
    fd.append('email', info.email);
    fd.append('businessName', info.business);
    fd.append('path', selectedPath);
    fd.append('maturityScore', score);
    fd.append('riskLevel', risk);
    fd.append('file', blob, `Report_${info.name}.pdf`);
    
    try {
        await fetch("https://hook.us2.make.com/drsloaxbo9riybo89h865sygz29blebg", { 
            method: 'POST', 
            body: fd 
        });
    } catch (e) {
        console.error("Webhook error:", e);
    }
}

/** * HELPERS */
function createPageDiv() {
    const div = document.createElement('div');
    div.className = 'pdf-page-chunk';
    // standard Letter size proportions @ 96dpi approx
    div.style.cssText = "width:800px; height:1050px; padding:60px; background:white; box-sizing:border-box; position:relative; overflow:hidden;";
    return div;
}

function chunkArray(arr, size) {
    const res = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('pdf-btn');
    if (btn) btn.onclick = () => generatePDF(false);
});
