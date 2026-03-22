/**
 * CIRRUS AUTOMATIONS | app.js
 * Aggressive Simplicity. Inspect. Integrate. Innovate.
 */

const webhookURL = "https://hook.us2.make.com/drsloaxbo9riybo89h865sygz29blebg"; 

const auditData = {
    business: [
        { q: "How much of your week is wasted typing the exact same client info into different software?", options: [{ text: "Hours. We constantly double-enter data.", score: 10 }, { text: "Some, but we use a few basic integrations.", score: 50 }, { text: "Zero. Data is entered once and flows everywhere.", score: 100 }] },
        { q: "When a new lead comes in or a client pays, how often does the next step get delayed or forgotten?", options: [{ text: "Constantly. Things fall through the cracks.", score: 10 }, { text: "Occasionally, unless I personally babysit it.", score: 50 }, { text: "Never. The system instantly triggers the next step.", score: 100 }] },
        { q: "How much of your day is interrupted by team questions like 'Where is that file?'", options: [{ text: "It's a constant barrage of Slack/Email questions.", score: 10 }, { text: "Moderate. We have boards, but they get ignored.", score: 50 }, { text: "Rarely. Workflows auto-assign tasks and assets.", score: 100 }] },
        { q: "If you (the owner) got sick for two weeks, what happens to the business?", options: [{ text: "Total collapse. Everything relies on my approval.", score: 10 }, { text: "Growth stops, but current clients might survive.", score: 50 }, { text: "Operations run smoothly. Systems manage the work.", score: 100 }] },
        { q: "How often do costly errors happen due to outdated information?", options: [{ text: "Too often. We have multiple 'versions' of truth.", score: 10 }, { text: "Sometimes, if someone forgets to update a sheet.", score: 50 }, { text: "Never. We use one centralized relational database.", score: 100 }] },
        { q: "How much time is burned manually creating quotes, contracts, or reports?", options: [{ text: "We build almost everything from scratch manually.", score: 10 }, { text: "We use templates, but still fill in the blanks.", score: 50 }, { text: "None. Documents auto-generate dynamically.", score: 100 }] },
        { q: "How many disjointed software subscriptions are you paying for?", options: [{ text: "7+ apps acting like expensive duct tape.", score: 10 }, { text: "3-6 apps with some overlap and clunky Zaps.", score: 50 }, { text: "A lean, intentional stack integrated via Make.com.", score: 100 }] },
        { q: "When a process breaks (failed payment, etc), how chaotic is the scramble?", options: [{ text: "It's a fire drill. We scramble to find what happened.", score: 10 }, { text: "Someone catches it during a manual review.", score: 50 }, { text: "Automated alerts instantly flag the exact error.", score: 100 }] },
        { q: "How long does it take to pull a 100% accurate profit/cash flow report?", options: [{ text: "Hours or days of compiling spreadsheets.", score: 10 }, { text: "A few minutes of checking 3 different tools.", score: 50 }, { text: "Zero seconds. I have a live, real-time dashboard.", score: 100 }] },
        { q: "If you had to double your client load tomorrow, what would happen?", options: [{ text: "We would drown. We are already at operational capacity.", score: 10 }, { text: "We'd survive, but service quality would drop.", score: 50 }, { text: "Bring it on. Our infrastructure scales infinitely.", score: 100 }] }
    ],
    individual: [
        { q: "How often do you lie awake remembering tasks that slipped through the cracks?", options: [{ text: "Constantly. My brain is my only manager.", score: 10 }, { text: "Occasionally, when things get really busy.", score: 50 }, { text: "Never. I trust my digital system completely.", score: 100 }] },
        { q: "How stressful is it to find a vital document (tax form, health record) right now?", options: [{ text: "High panic. It's buried in a pile or messy drive.", score: 10 }, { text: "Annoying. I have to click through many folders.", score: 50 }, { text: "Zero stress. Everything is tagged and searchable.", score: 100 }] },
        { q: "How much nagging happens at home because schedules or tasks aren't synced?", options: [{ text: "A lot. It's endless 'Did you remember to...'", score: 10 }, { text: "Some. We have a shared calendar but forget to check it.", score: 50 }, { text: "None. Automated syncs handle our household logistics.", score: 100 }] },
        { q: "How overwhelmed are you by digital clutter and inbox volume?", options: [{ text: "Drowning. My inbox is a chaotic to-do list.", score: 10 }, { text: "I keep up, but it takes hours of manual work.", score: 50 }, { text: "Inbox Zero. Automated routing filters the noise.", score: 100 }] },
        { q: "By 6:00 PM, how exhausted are you from making tiny logistical decisions?", options: [{ text: "Completely drained. Decision fatigue is real.", score: 10 }, { text: "Tired, but I push through the evening chores.", score: 50 }, { text: "I have energy left. My routines are systematized.", score: 100 }] },
        { q: "How much of your weekend is stolen by 'life admin' (bills, mail, errands)?", options: [{ text: "Half my Sunday is ruined by catching up.", score: 10 }, { text: "A couple of hours, but I resent doing it.", score: 50 }, { text: "Minutes. My infrastructure handles the basics.", score: 100 }] },
        { q: "How often do small personal tasks (canceling trials) fall off your radar?", options: [{ text: "All the time. I pay the 'ADHD tax' on late fees.", score: 10 }, { text: "Sometimes, if I forget to write it down.", score: 50 }, { text: "Never. They go into a triage capture system.", score: 100 }] },
        { q: "How annoying is it to dig for info like WiFi or Venmo to share?", options: [{ text: "I scroll through photos/texts every time.", score: 10 }, { text: "I copy-paste from a messy Apple Note.", score: 50 }, { text: "I have automated snippets and a secure vault.", score: 100 }] },
        { q: "How much anxiety do you have around hidden recurring subscriptions?", options: [{ text: "I just close my eyes and look at my statement.", score: 10 }, { text: "I have a spreadsheet I try (and fail) to keep updated.", score: 50 }, { text: "None. I have an automated dashboard tracking flow.", score: 100 }] },
        { q: "When you finally relax, is your brain actually able to turn off?", options: [{ text: "No. I am looping through what I forgot to do.", score: 10 }, { text: "Eventually, after I plan tomorrow's fires.", score: 50 }, { text: "Yes. My systems carry the load, not my brain.", score: 100 }] }
    ]
};

let currentTrack = null, currentStep = 0, scores = [], finalScore = 0;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${id}`).classList.add('active');
}

function startAudit(track) {
    currentTrack = track; currentStep = 0; scores = [];
    showScreen('quiz'); renderQuestion();
}

function renderQuestion() {
    const q = auditData[currentTrack][currentStep];
    const total = 10;
    document.getElementById('progress-bar').style.width = `${((currentStep + 1) / total) * 100}%`;
    document.getElementById('current-step').innerText = currentStep + 1;
    document.getElementById('question-content').innerHTML = `
        <div class="question-block">
            <h2 style="font-size:1.15rem; margin-bottom:1.5rem; line-height:1.4;">${q.q}</h2>
            ${q.options.map(opt => `<button class="option-btn" onclick="selectOption(${opt.score}, '${opt.text.replace(/'/g, "\\'")}')">${opt.text}</button>`).join('')}
        </div>`;
}

function selectOption(score, text) {
    scores[currentStep] = { score: score, a: text, q: auditData[currentTrack][currentStep].q }; 
    if (currentStep < 9) {
        currentStep++; renderQuestion();
    } else {
        calculateFinalScore();
    }
}

function prevQuestion() { if (currentStep > 0) { currentStep--; renderQuestion(); } }

function calculateFinalScore() {
    finalScore = Math.round(scores.reduce((acc, val) => acc + val.score, 0) / 10);
    document.getElementById('score-value').innerText = finalScore;
    
    let risk = finalScore >= 75 ? "OPTIMIZED" : (finalScore >= 40 ? "FRAGMENTED" : "ANALOG");
    let insight = "";

    if (risk === "OPTIMIZED") {
        insight = `<h3>THE DATA: Automation Primed</h3><p>Your data foundation is solid. The math shows you understand systems. The only reason you aren't scaling faster is that you are acting as the "glue" between tools.</p>`;
    } else if (risk === "FRAGMENTED") {
        insight = `<h3>THE DATA: Digital Silos</h3><p>You have the right software, but tools refuse to talk to each other. You have become a "Human API"—spending hours copying data from one screen to another.</p>`;
    } else {
        insight = `<h3>THE DATA: Critical Friction</h3><p>Your operations rely on human memory and willpower. If we automated right now, we would just speed up the chaos. We need to build your foundation first.</p>`;
    }

    document.getElementById('public-insights').innerHTML = insight + `<div class="roadmap-section"><h3>THE INSPIRATION: Your Finish Line</h3><p>Review your custom 90-Day Attack Plan on Page 2 of your Blueprint PDF.</p></div>`;
    document.getElementById('locked-teaser').innerHTML = `<div class="locked-teaser-box"><p>✓ Your custom Make.com/Airtable roadmap.<br>✓ Free access to the Cirrus Community.</p></div>`;
    showScreen('results');
}

async function submitLead(action) {
    const name = document.getElementById('lead-name').value;
    const email = document.getElementById('lead-email').value;
    if(!name || !email) { alert("Please provide your name and email to proceed."); return; }

    const btnGroup = document.querySelector('.btn-group');
    btnGroup.innerHTML = `<div style="padding:15px; color:var(--accent); font-weight:900;">Compiling Your Blueprint...</div>`;

    // 1. Generate PDF Content
    setupPdfTemplate(name, email, finalScore, currentTrack);
    const pdfBlob = await generatePDF(true); 

    // 2. Transmit to Webhook (Make.com)
    const fd = new FormData();
    fd.append('fullName', name); 
    fd.append('email', email);
    fd.append('track', currentTrack); 
    fd.append('score', finalScore);
    fd.append('risk', finalScore >= 75 ? "LOW" : (finalScore >= 40 ? "MODERATE" : "CRITICAL"));
    fd.append('file', pdfBlob, `Cirrus_Blueprint_${name.replace(/\s+/g, '_')}.pdf`);
    
    try {
        await fetch(webhookURL, { method: 'POST', body: fd });
    } catch (e) {
        console.error("Webhook Transmission Failed", e);
    }

    // 3. User Response
    if (action === 'download') {
        await generatePDF(false, name); 
        document.getElementById('lead-form').innerHTML = `<h3 style="color:var(--success);">Welcome to the Network! 🚀</h3><p>Blueprint downloading. Check your email for your Freemium Community invite.</p>`;
    } else {
        document.getElementById('lead-form').innerHTML = `<h3 style="color:var(--success);">Blueprint Dispatched! 📧</h3><p>Check your inbox for the PDF and your exclusive access link.</p>`;
    }
}

/**
 * PDF TEMPLATE GENERATOR
 */
function setupPdfTemplate(name, email, score, track) {
    const template = document.getElementById('pdf-template');
    template.innerHTML = ''; 

    let riskLabel = score >= 75 ? "OPTIMIZED" : (score >= 40 ? "FRAGMENTED" : "ANALOG");
    let insightText = score >= 75 ? "Foundation solid. Human glue is the operational bottleneck." : (score >= 40 ? "Digital silos detected. Human API effect is draining profit." : "Analog friction present. Heavy reliance on human memory.");
    
    let roadmap = score >= 75 ? 
        [{t:"AI Lead Triage", d:"Automate lead qualification via Gemini/Make.com to eliminate manual screening."}, {t:"Exception Handling", d:"Build auto-rescue workflows for failed payments and project delays."}] : 
        (score >= 40 ? 
            [{t:"Establish 'The Brain'", d:"Centralize core operational data into Airtable to kill double-entry."}, {t:"Connect the Stack", d:"Use Make.com webhooks to sync CRM, Billing, and Fulfillment modules."}] : 
            [{t:"Stop the Bleeding", d:"Move intake off paper into structured digital forms today."}, {t:"Centralize Chaos", d:"Document manual workflows to identify the first automation targets."}]
        );

    let ctaHead = score >= 75 ? "Ready for Infinite Scale?" : (score >= 40 ? "Stop the Double-Entry Drain." : "Ready to Build Your Foundation?");
    let ctaBody = score >= 75 ? "Book a Scale Strategy Call with Cirrus to map out your advanced AI integration." : (score >= 40 ? "Book an Architecture Call. Let us design your custom Airtable + Make.com stack." : "Book a Workflow Teardown. We will map your operations and identify profit leaks.");

    // PAGE 1: EXECUTIVE SUMMARY
    const p1 = createPageDiv();
    p1.innerHTML = `
        <div style="border-bottom:4px solid #1a365d; padding-bottom:20px; text-align:center;">
            <div style="font-weight:900; color:#1a365d; font-size:32px; letter-spacing:1px;">CIRRUS <span style="font-weight:300; color:#3182ce;">AUTOMATIONS</span></div>
            <p style="margin:5px 0 0; color:#718096; font-size:10px; text-transform:uppercase; letter-spacing:4px;">Path: ${track.toUpperCase()} • EXECUTIVE SUMMARY</p>
        </div>
        <div style="display:flex; justify-content:space-between; margin:40px 0; background:#f8fafc; padding:25px; border-radius:12px; border:1px solid #e2e8f0;">
            <div><small style="color:#718096; text-transform:uppercase; font-size:10px; font-weight:800;">Prepared For</small><br><strong>${name}</strong><br><span style="font-size:12px;">${email}</span></div>
            <div style="text-align:right;"><small style="color:#718096; text-transform:uppercase; font-size:10px; font-weight:800;">Date</small><br><strong>${new Date().toLocaleDateString()}</strong></div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:25px; margin-bottom:40px;">
            <div style="background:#3182ce; color:white; padding:40px 20px; border-radius:16px; text-align:center;"><h2 style="margin:0; font-size:54px;">${score}%</h2><p style="margin:10px 0 0; font-weight:800; font-size:12px; opacity:0.9;">Readiness Score</p></div>
            <div style="background:#1a365d; color:white; padding:40px 20px; border-radius:16px; text-align:center;"><h2 style="margin:0; font-size:36px;">${riskLabel}</h2><p style="margin:10px 0 0; font-weight:800; font-size:12px; opacity:0.9;">Architecture State</p></div>
        </div>
        <div style="background:#f1f5f9; padding:35px; border-radius:12px; border-left:8px solid #3182ce;">
            <h3 style="margin:0 0 10px; font-size:16px; text-transform:uppercase; color:#3182ce;">Diagnostic Insight</h3>
            <p style="margin:0; font-size:17px; line-height:1.7; color:#2d3748;">${insightText}</p>
        </div>
    `;
    template.appendChild(p1);

    // PAGE 2: ACTION PLAN & COMMUNITY
    const p2 = createPageDiv();
    p2.innerHTML = `
        <div style="border-bottom:4px solid #1a365d; padding-bottom:20px; text-align:center;">
            <div style="font-weight:900; color:#1a365d; font-size:28px;">CIRRUS <span style="font-weight:300; color:#3182ce;">AUTOMATIONS</span></div>
        </div>
        <h3 style="color:#1a365d; margin-top:30px; font-size: 22px;">The Inspiration: 90-Day Attack Plan</h3>
        <div style="margin-top:20px;">
            ${roadmap.map((r,i)=>`
                <div style="padding:25px; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; margin-bottom:20px; display:flex; gap:20px;">
                    <div style="width:36px; height:36px; background:#1a365d; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; flex-shrink:0;">${i+1}</div>
                    <div><strong style="font-size:18px; color:#1a365d;">${r.t}</strong><p style="margin:8px 0 0; color:#475569; font-size:15px; line-height:1.5;">${r.d}</p></div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top:30px; padding:25px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
            <h4 style="margin:0 0 10px; color:#1a365d; font-size:18px;"><span style="background:#38a169; color:white; padding:2px 8px; border-radius:4px; font-size:11px; vertical-align:middle;">JOINED</span> Cirrus Community</h4>
            <p style="margin:0; color:#475569; font-size:14px; line-height:1.6;">You have unlocked free access to our private community at <strong>cirrusautomations.com</strong>. Join us to discuss strategy, risk, and AI. Login details have been sent to your email.</p>
        </div>
        <div style="margin-top:30px; padding:35px; background:#ebf8ff; border:3px dashed #3182ce; border-radius:16px; text-align:center;">
            <h3 style="margin:0 0 10px; color:#1a365d; font-size:22px;">${ctaHead}</h3>
            <p style="margin:0; color:#2d3748; font-size:16px; line-height:1.6;">${ctaBody}</p>
        </div>
    `;
    template.appendChild(p2);

    // PAGES 3+: ASSESSMENT LOG
    const auditChunks = chunkArray(scores, 5);
    auditChunks.forEach((chunk, pageIdx) => {
        const pAudit = createPageDiv();
        pAudit.innerHTML = `
            <h2 style="color:#1a365d; font-size:20px; border-bottom:2px solid #1a365d; padding-bottom:10px; margin-bottom:30px;">Detailed Assessment History (Part ${pageIdx+1})</h2>
            ${chunk.map((item, i)=>`
                <div style="border-bottom:1px solid #f1f5f9; padding:20px 0;">
                    <div style="font-size:11px; font-weight:800; color:#3182ce; text-transform:uppercase; margin-bottom:6px;">Diagnostic Point ${ (pageIdx * 5) + i + 1 }</div>
                    <div style="font-size:15px; font-weight:700; color:#1a365d; margin-bottom:10px;">${item.q}</div>
                    <div style="display:flex; justify-content:space-between; background:#f8fafc; padding:12px 20px; border-radius:8px; border:1px solid #f1f5f9; font-size:13px;">
                        <span>Selected: <strong>${item.a}</strong></span>
                        <span style="font-weight:900; color:${item.score >= 100 ? '#38a169' : (item.score >= 50 ? '#d69e2e' : '#e53e3e')};">IMPACT: ${item.score}</span>
                    </div>
                </div>
            `).join('')}
            <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #a0aec0;"><p>Aggressive Simplicity by Cirrus Automations.</p></div>
        `;
        template.appendChild(pAudit);
    });
}

/**
 * RENDER HELPERS
 */
function createPageDiv() {
    const div = document.createElement('div');
    div.className = 'pdf-page-chunk';
    div.style.cssText = "width:800px; height:1050px; padding:60px; background:white; position:relative; overflow:hidden; box-sizing:border-box; font-family: 'Montserrat', sans-serif;";
    return div;
}

function chunkArray(arr, size) {
    const res = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
}

async function generatePDF(auto = false, name = "Client") {
    const template = document.getElementById('pdf-template');
    template.style.display = 'block';
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
    const pages = template.querySelectorAll('.pdf-page-chunk');

    for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage();
        await new Promise(r => requestAnimationFrame(r));
        const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0.4, 0.4, 7.7, (7.7 * canvas.height) / canvas.width);
    }
    
    template.style.display = 'none';
    return auto ? pdf.output('blob') : pdf.save(`Cirrus_Blueprint_${name.replace(/\s+/g, '_')}.pdf`);
}