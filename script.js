/**
 * CIRRUS AUTOMATIONS - STRATEGIC DIAGNOSTIC ENGINE
 * Version: 10.0 (Unified Full Script - DOM-First Rendering)
 * Includes: 33 Strategic Questions, Multi-page PDF, and Make.com Webhook Sync
 */

// 1. DATA STRUCTURE: 33 STRATEGIC QUESTIONS
const questions = [
    { id: "leads", text: "How do you handle new inquiries from your website or social media?", options: [{ text: "I manually reply to every message myself", score: 1, rec: "Implement an automated Lead Triage system." }, { text: "I have a basic auto-reply, then I take over", score: 3, rec: "Upgrade auto-replies to AI responses." }, { text: "They flow into a CRM with automated follow-ups", score: 5 }], category: "Marketing" },
    { id: "volume", text: "Avg monthly lead/customer volume?", options: [{ text: "Over 50", score: 5, val: 50 }, { text: "10 to 50", score: 3, val: 25 }, { text: "Under 10", score: 1, val: 5 }], category: "Marketing" },
    { id: "email_marketing", text: "How are your email marketing campaigns managed?", options: [{ text: "I manually write and send each email", score: 1, rec: "Sync Airtable to Make Email modules." }, { text: "I use templates but send manually", score: 3, rec: "Add behavior triggers." }, { text: "Fully automated, segmented flows", score: 5 }], category: "Marketing" },
    { id: "social_media", text: "How do you publish content on social media?", options: [{ text: "Post manually on each platform", score: 1, rec: "Use Make’s RSS automation." }, { text: "Use a scheduler like Buffer or Later", score: 3, rec: "Connect calendar to API." }, { text: "AI‑optimized scheduling", score: 5 }], category: "Marketing" },
    { id: "ad_optimization", text: "How are your paid ad campaigns optimized?", options: [{ text: "I check and adjust bids manually", score: 1, rec: "Sync performance to Airtable." }, { text: "Rules‑based adjustments", score: 3, rec: "Set up automated alerts." }, { text: "AI‑powered bidding", score: 5 }], category: "Marketing" },
    { id: "lead_scoring", text: "How do you identify which leads are ready to buy?", options: [{ text: "Gut feel / generic follow-up", score: 1, rec: "Implement scoring on link clicks." }, { text: "Manual lead scoring in spreadsheet", score: 3, rec: "Automate scoring via page visits." }, { text: "Automated scoring based on engagement", score: 5 }], category: "Marketing" },
    { id: "proposals", text: "How are quotes or contracts created?", options: [{ text: "Built from scratch in Word each time", score: 1, rec: "Use PandaDoc + Make." }, { text: "Use templates with manual copy/paste", score: 3, rec: "Map CRM fields to templates." }, { text: "Auto‑generated from CRM", score: 5 }], category: "Sales" },
    { id: "follow_up", text: "What happens after a prospect doesn't reply?", options: [{ text: "I eventually follow up if I remember", score: 1, rec: "Create 3-step automated sequence." }, { text: "I have a sequence I manually trigger", score: 3, rec: "Trigger sequences from form submission." }, { text: "Multi‑channel automated nurture", score: 5 }], category: "Sales" },
    { id: "contract_renewal", text: "How do you manage recurring renewals?", options: [{ text: "Manually track and send emails", score: 1, rec: "Set 30-day expiry alerts." }, { text: "Calendar reminders + manual email", score: 3, rec: "Automate renewal quotes." }, { text: "Auto‑generated quotes + reminders", score: 5 }], category: "Sales" },
    { id: "reviews", text: "Process for customer reviews?", options: [{ text: "No process / see them occasionally", score: 1, rec: "Sync reviews to Slack." }, { text: "Manual copy/paste template", score: 3, rec: "Use AI for draft responses." }, { text: "AI-enhanced sentiment system", score: 5 }], category: "Customer Service" },
    { id: "onboarding", text: "What happens when a client pays?", options: [{ text: "I manually send email and set folders", score: 1, rec: "Automate folder creation." }, { text: "Semi-automated link / manual check", score: 3, rec: "Trigger automated task lists." }, { text: "Portals and tasks triggered instantly", score: 5 }], category: "Customer Service" },
    { id: "support_tickets", text: "How are support requests tracked?", options: [{ text: "Email inbox only", score: 1, rec: "Use Airtable ticketing." }, { text: "Shared inbox or basic tool", score: 3, rec: "Add keyword routing." }, { text: "AI‑powered chatbot + helpdesk", score: 5 }], category: "Customer Service" },
    { id: "feedback", text: "How do you collect feedback?", options: [{ text: "No formal collection", score: 1, rec: "Automate NPS surveys." }, { text: "Send occasional surveys manually", score: 3, rec: "Sync survey results to CRM." }, { text: "Automated surveys with sentiment analysis", score: 5 }], category: "Customer Service" },
    { id: "knowledge_base", text: "Self‑service support availability?", options: [{ text: "No self‑service", score: 1, rec: "Create FAQ via Softr." }, { text: "Static FAQ page", score: 3, rec: "Build AI-searchable hub." }, { text: "AI‑searchable + auto-suggestions", score: 5 }], category: "Customer Service" },
    { id: "integration", text: "Are tools integrated (Stripe, Skool, CRM)?", options: [{ text: "No, isolated islands", score: 1, rec: "Bridge apps via Make.com." }, { text: "Basic Zaps or links", score: 3, rec: "Centralize data flow." }, { text: "Deep Make.com ecosystem", score: 5 }], category: "Operations" },
    { id: "admin", text: "Weekly hours on repetitive admin?", options: [{ text: "15+ hours", score: 1, val: 15, rec: "Automation required immediately." }, { text: "5 to 10 hours", score: 3, val: 7, rec: "Automate daily data syncing." }, { text: "Less than 2 hours", score: 5, val: 1 }], category: "Operations" },
    { id: "project_management", text: "Internal task tracking method?", options: [{ text: "Verbal / chat – no central tool", score: 1, rec: "Use Airtable Project Hub." }, { text: "Task tool manually updated", score: 3, rec: "Sync milestones to Slack." }, { text: "Automated task creation", score: 5 }], category: "Operations" },
    { id: "document_management", text: "Document organization method?", options: [{ text: "Local folders / scattered", score: 1, rec: "Move to cloud structure." }, { text: "Cloud drive – no naming convention", score: 3, rec: "Automate file filing." }, { text: "Auto‑filed and indexed via workflow", score: 5 }], category: "Operations" },
    { id: "scheduling", text: "Meeting scheduling process?", options: [{ text: "Back‑and‑forth emails", score: 1, rec: "Implement Calendly." }, { text: "Use a booking link", score: 3, rec: "Automate pre-meeting prep." }, { text: "AI‑assisted scheduling", score: 5 }], category: "Operations" },
    { id: "inventory", text: "Inventory or product access management?", options: [{ text: "Manual tracking", score: 1, rec: "Track via Airtable." }, { text: "Basic alerts", score: 3, rec: "Automate replenishment via API." }, { text: "Real‑time auto-replenishment", score: 5 }], category: "Operations" },
    { id: "invoices", text: "Lifecycle of an unpaid invoice?", options: [{ text: "Manual bank check", score: 1, rec: "Implement collections engine." }, { text: "Email when I remember", score: 3, rec: "Set automated reminders." }, { text: "Auto-escalation collections engine", score: 5 }], category: "Finance" },
    { id: "ticket", text: "Avg transaction or invoice value?", options: [{ text: "Over $2,000", score: 5, val: 2000 }, { text: "$500 - $2,000", score: 3, val: 1000 }, { text: "Under $500", score: 1, val: 250 }], category: "Finance" },
    { id: "expenses", text: "Expense tracking method?", options: [{ text: "Paper receipts", score: 1, rec: "Use Hubdoc / Dext." }, { text: "Spreadsheet + manual approval", score: 3, rec: "Automate Slack approvals." }, { text: "Automated scanning + workflows", score: 5 }], category: "Finance" },
    { id: "payroll", text: "Payroll processing method?", options: [{ text: "Manual calculations", score: 1, rec: "Switch to API-supported payroll." }, { text: "Software + manual time tracking", score: 3, rec: "Sync time software to payroll." }, { text: "Fully integrated time and payroll", score: 5 }], category: "Finance" },
    { id: "reporting", text: "Report generation method?", options: [{ text: "Manual data pull", score: 1, rec: "Build Airtable dashboard." }, { text: "Scheduled Excel exports", score: 3, rec: "Automate aggregation." }, { text: "Live dashboards + auto-refresh", score: 5 }], category: "Finance" },
    { id: "recruiting", text: "Job applicant screening process?", options: [{ text: "Manual resume review", score: 1, rec: "Use AI pre-screening." }, { text: "Keyword filtering", score: 3, rec: "Automate video interviews." }, { text: "AI‑powered candidate matching", score: 5 }], category: "People" },
    { id: "onboarding_employee", text: "New employee onboarding process?", options: [{ text: "Manual account setup", score: 1, rec: "Automate account provisioning." }, { text: "Checklist with manual chasing", score: 3, rec: "Build onboarding portal." }, { text: "Automated provisioning + training", score: 5 }], category: "People" },
    { id: "time_off", text: "Time‑off request handling?", options: [{ text: "Manual chat / email", score: 1, rec: "Use form-based requests." }, { text: "Form + manual calendar update", score: 3, rec: "Sync leave to calendar." }, { text: "Auto request, approval, and sync", score: 5 }], category: "People" },
    { id: "business_intelligence", text: "Measurement of business metrics?", options: [{ text: "No consistent tracking", score: 1, rec: "Define core KPIs." }, { text: "Monthly manual reports", score: 3, rec: "Build automated KPI dashboard." }, { text: "Real‑time + AI anomaly detection", score: 5 }], category: "Data & AI" },
    { id: "forecasting", text: "Sales or cash flow forecasting?", options: [{ text: "Gut feel", score: 1, rec: "Implement linear forecasting." }, { text: "Historical Excel averages", score: 3, rec: "Automate projections." }, { text: "AI‑assisted predictive forecasting", score: 5 }], category: "Data & AI" },
    { id: "data_integration", text: "Customer data unification status?", options: [{ text: "Isolated silos", score: 1, rec: "Create Single Source of Truth." }, { text: "Manual exports/imports", score: 3, rec: "Sync via Make.com." }, { text: "Unified view via middleware", score: 5 }], category: "Data & AI" },
    { id: "backup", text: "Critical data backup method?", options: [{ text: "No formal backup", score: 1, rec: "Automate cloud-to-cloud backup." }, { text: "Manual periodic backups", score: 3, rec: "Schedule versioned backups." }, { text: "Automated, versioned, off‑site", score: 5 }], category: "Compliance" },
    { id: "access_control", text: "User permission management?", options: [{ text: "Shared logins", score: 1, rec: "Implement SSO." }, { text: "Separate logins / manual exit", score: 3, rec: "Automate offboarding." }, { text: "Automated role‑based provisioning", score: 5 }], category: "Compliance" }
];

// 2. STATE MANAGEMENT
let currentStep = 0;
let totalScore = 0;
let auditLog = [];
let userSelections = {};
let userInfo = { name: "", email: "", business: "" };

/** * INIT & NAVIGATION */
function startQuiz() {
    userInfo.name = document.getElementById('name').value.trim();
    userInfo.email = document.getElementById('email').value.trim();
    userInfo.business = document.getElementById('business-name').value.trim();

    if (!userInfo.name || !userInfo.email || !userInfo.business) {
        alert("Enter your name, email, and business name.");
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
            auditLog.push({ q: q.text, a: opt.text, category: q.category, score: opt.score, rec: opt.rec || "Maintain high standards." });
            currentStep++;
            renderQuestion();
        };
        container.appendChild(btn);
    });
    
    document.getElementById('progress').style.width = (currentStep / questions.length * 100) + '%';
}

/** * ANALYSIS & CRM DISPATCH */
async function processResults() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    document.getElementById('progress').style.width = '100%';

    const maturityPct = Math.round((totalScore / (questions.length * 5)) * 100);
    let riskPoints = 0;
    let matrixData = [];

    // IF-THEN Analysis
    if ((userSelections['admin_val'] || 0) >= 15) { riskPoints += 40; matrixData.push({ if: "Weekly admin load 15h+", then: "Scale ceiling reached.", root: "Manual handling.", control: "Automation orchestration." }); }
    if (userSelections['backup'] <= 1) { riskPoints += 40; matrixData.push({ if: "No automated cloud backup", then: "Proprietary data loss.", root: "Manual versioning.", control: "API-driven replication." }); }
    if (userSelections['leads'] <= 1) { riskPoints += 20; matrixData.push({ if: "Manual lead processing", then: "Lead leakage exceeds 40%.", root: "High latency cycles.", control: "Webhook triage." }); }

    let riskLevel = maturityPct < 45 ? "Critical" : (maturityPct < 75 ? "Medium" : "Low");
    const annualRisk = Math.round((userSelections['ticket_val'] || 0) * (userSelections['volume_val'] || 0) * 12 * (riskPoints / 200));

    // Dashboard UI Update
    document.getElementById('hours-lost').innerText = `${(userSelections['admin_val'] || 0) * 4} hrs`;
    document.getElementById('revenue-risk').innerText = `$${annualRisk.toLocaleString()}`;
    document.getElementById('risk-rating').innerText = riskLevel;
    document.getElementById('diag-text').innerText = `Your infrastructure maturity is ${maturityPct}%. Structural dependency on manual processing presents a ${riskLevel} risk. Direct exposure: $${annualRisk.toLocaleString()}.`;

    // 1. BUILD MULTI-PAGE TEMPLATE IN DOM
    setupPdfTemplate(maturityPct, riskLevel, annualRisk, matrixData);

    // 2. TRIGGER SYNC (Timeout ensures DOM paint is complete)
    setTimeout(async () => {
        try {
            const pdfBlob = await generatePDF(true); // Silent capture for CRM
            if (pdfBlob) {
                const formData = {
                    name: userInfo.name, email: userInfo.email, business: userInfo.business,
                    score: maturityPct, risk: riskLevel, revAtRisk: annualRisk, logs: auditLog
                };
                await sendToWebhook(formData, pdfBlob);
            }
        } catch (e) { console.error("Sync failure:", e); }
    }, 2000); 
}

/** * MULTI-PAGE PDF TEMPLATE BUILDER */
function setupPdfTemplate(maturity, risk, annualRisk, matrix) {
    const template = document.getElementById('pdf-template');
    template.innerHTML = ''; 

    // PAGE 1: EXECUTIVE SUMMARY
    const p1 = createPageDiv();
    p1.innerHTML = `
        <div style="border-bottom: 3px solid #0f172a; padding-bottom:20px; margin-bottom:40px;">
            <h1 style="font-size:32px; margin:0;">CIRRUS AUTOMATION DIAGNOSTIC</h1>
            <p style="color:#2563eb; font-weight:800; font-size:14px; margin-top:5px;">STRATEGIC INFRASTRUCTURE REPORT</p>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:40px; background:#f8fafc; padding:20px; border-radius:12px;">
            <div><small style="font-size:8px; color:#94a3b8; text-transform:uppercase;">Client</small><br><strong>${userInfo.name}</strong></div>
            <div><small style="font-size:8px; color:#94a3b8; text-transform:uppercase;">Business</small><br><strong>${userInfo.business}</strong></div>
            <div style="text-align:right;"><small style="font-size:8px; color:#94a3b8; text-transform:uppercase;">Date</small><br><strong>${new Date().toLocaleDateString()}</strong></div>
        </div>
        <div style="background:${risk === "Critical" ? "#ef4444" : "#2563eb"}; color:white; padding:30px; border-radius:12px; text-align:center; margin-bottom:40px;">
            <h2 style="margin:0; font-size:26px;">Infrastructure Maturity: ${maturity}%</h2>
            <p style="margin:10px 0 0; font-size:18px;">Risk Profile: ${risk}</p>
        </div>
        <h3>Operational Analytics</h3>
        <div style="display:flex; gap:15px; margin-bottom:40px;">
            <div style="flex:1; border:1px solid #e2e8f0; padding:20px; border-radius:10px; text-align:center;">
                <small style="font-size:9px; color:#64748b;">Maturity</small><br><span style="font-size:20px; font-weight:800;">${maturity}%</span>
            </div>
            <div style="flex:1; border:1px solid #e2e8f0; padding:20px; border-radius:10px; text-align:center;">
                <small style="font-size:9px; color:#64748b;">Annual Revenue Risk</small><br><span style="font-size:20px; font-weight:800; color:#ef4444;">$${annualRisk.toLocaleString()}</span>
            </div>
        </div>
        <div style="padding:20px; background:#f1f5f9; border-radius:12px;">
            <p style="margin:0; font-size:14px; line-height:1.6;">Full infrastructure audit reveals ${maturity}% readiness. Risk level categorized as ${risk} based on structural measurements.</p>
        </div>
    `;
    template.appendChild(p1);

    // PAGE 2: RISK MATRIX
    if(matrix.length > 0) {
        const p2 = createPageDiv();
        p2.innerHTML = `
            <h3 style="border-left:5px solid #2563eb; padding-left:12px; font-size:20px; margin-bottom:25px;">Strategic Risk Matrix</h3>
            ${matrix.map(m => `
                <div style="margin-bottom:20px; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
                    <div style="background:#f8fafc; padding:12px 20px; border-bottom:1px solid #e2e8f0; font-weight:800; font-size:14px;">IF: ${m.if}</div>
                    <div style="padding:15px 20px; font-size:12px; line-height:1.5;">
                        <p><strong>THEN:</strong> ${m.then}</p>
                        <p><strong>ROOT CAUSE:</strong> ${m.root}</p>
                        <p><strong>CONTROL:</strong> ${m.control}</p>
                    </div>
                </div>
            `).join('')}
        `;
        template.appendChild(p2);
    }

    // PAGES 3+: AUDIT LOG (11 per page)
    const chunks = chunkArray(auditLog, 11);
    chunks.forEach((chunk, i) => {
        const p = createPageDiv();
        p.innerHTML = `
            <h3 style="border-left:5px solid #2563eb; padding-left:12px; font-size:20px; margin-bottom:10px;">Diagnostic Audit Log (Pt ${i+1})</h3>
            <p style="font-size:11px; color:#64748b; margin-bottom:25px;">Audit results ${i*11+1} to ${Math.min((i+1)*11, auditLog.length)} of 33</p>
            <div style="display:flex; flex-direction:column; gap:10px;">
                ${chunk.map((item, idx) => `
                    <div style="border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
                        <div style="font-weight:800; font-size:10px; color:#334155;">#${i*11+idx+1}. ${item.q}</div>
                        <div style="font-size:9px; color:#64748b; margin-top:4px;">
                            Response: ${item.a} <span style="margin-left:10px; background:#f1f5f9; padding:2px 6px; border-radius:4px;">Score: ${item.score}/5</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        template.appendChild(p);
    });
}

/** * HIGH-FIDELITY RENDERER */
async function generatePDF(isAutoSend = false) {
    const btn = document.getElementById('pdf-btn');
    const template = document.getElementById('pdf-template');
    const pages = template.querySelectorAll('.pdf-page-chunk');
    
    if (!pages.length) return null;
    if (!isAutoSend) { btn.disabled = true; btn.innerText = 'Compiling High-Fidelity Report...'; }

    // RENDER OFF-SCREEN BUT VISIBLE TO ENGINE
    const originalStyle = template.getAttribute('style') || '';
    template.style.cssText = `display:block !important; visibility:visible !important; position:absolute !important; left:-9999px !important; width:800px !important; background:white !important;`;

    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(resolve));

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
        
        for (let i = 0; i < pages.length; i++) {
            const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            if (i > 0) pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0.4, 0.4, 7.7, (pages[i].offsetHeight / 800) * 7.7);
        }

        if (!isAutoSend) {
            pdf.save(`Cirrus_Infrastructure_Report_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
            btn.innerText = '📥 Export Professional PDF Report';
            return null;
        } else {
            return pdf.output('blob');
        }
    } catch (err) {
        console.error('Diagnostic PDF Error:', err);
        return null;
    } finally {
        template.setAttribute('style', originalStyle);
        if (!isAutoSend) btn.disabled = false;
    }
}

/** * CRM WEBHOOK SYNC */
async function sendToWebhook(formData, pdfBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
        const payload = {
            fullName: formData.name, email: formData.email, businessName: formData.business,
            maturityScore: formData.score, riskLevel: formData.risk, revenueAtRisk: formData.revAtRisk,
            fileData: reader.result.split(',')[1], fileName: `${formData.name}_Diagnostic.pdf`,
            auditLog: JSON.stringify(formData.logs)
        };

        const WEBHOOK_URL = "https://hook.us2.make.com/drsloaxbo9riybo89h865sygz29blebg";
        
        try {
            await fetch(WEBHOOK_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("CRM: Record Synced.");
        } catch (e) { console.error("CRM: delivery failed", e); }
    };
}

// HELPERS
function createPageDiv() {
    const div = document.createElement('div');
    div.className = 'pdf-page-chunk';
    div.style.width = "800px"; div.style.height = "1050px"; 
    div.style.padding = "60px"; div.style.background = "white"; div.style.boxSizing = "border-box";
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