from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_RIGHT, TA_LEFT

pdf_path = r"c:\Users\ABHIJEET RUPNAWAR\Downloads\shubhangi-portfolio-main\shubhangi-portfolio-main\public\resume.pdf"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=20,
    rightMargin=20,
    topMargin=16,
    bottomMargin=16
)

NAVY  = colors.HexColor("#0f2942")
CYAN  = colors.HexColor("#0284c7")
DARK  = colors.HexColor("#1e293b")
MUTED = colors.HexColor("#475569")
LINE  = colors.HexColor("#cbd5e1")
BG    = colors.HexColor("#f8fafc")

s = getSampleStyleSheet()

def ps(name, **kw):
    base = kw.pop("parent", s["Normal"])
    p = ParagraphStyle(name, parent=base, **kw)
    return p

TITLE   = ps("T", fontName="Helvetica-Bold",   fontSize=16.5, leading=18.5, textColor=NAVY,  alignment=TA_CENTER)
SUB     = ps("S", fontName="Helvetica-Bold",   fontSize=8.8,  leading=10.5, textColor=CYAN,  alignment=TA_CENTER, spaceAfter=1)
CONTACT = ps("C", fontName="Helvetica",        fontSize=7.4,  leading=9.2,  textColor=MUTED, alignment=TA_CENTER)
SEC     = ps("H", fontName="Helvetica-Bold",   fontSize=8.8,  leading=10.5, textColor=NAVY,  spaceBefore=3, spaceAfter=1)
BODY    = ps("B", fontName="Helvetica",        fontSize=7.5,  leading=9.5,  textColor=DARK,  alignment=TA_JUSTIFY)
BUL     = ps("L", fontName="Helvetica",        fontSize=7.4,  leading=9.2,  textColor=DARK,  leftIndent=9, firstLineIndent=-7, spaceAfter=0.5)
JOB     = ps("J", fontName="Helvetica-Bold",   fontSize=8.0,  leading=10.0, textColor=DARK)
DATE    = ps("D", fontName="Helvetica-Oblique",fontSize=7.6,  leading=10.0, textColor=MUTED, alignment=TA_RIGHT)
SKILL_K = ps("SK",fontName="Helvetica-Bold",   fontSize=7.4,  leading=9.2,  textColor=DARK)
SKILL_V = ps("SV",fontName="Helvetica",        fontSize=7.4,  leading=9.2,  textColor=DARK)

def HR(thick=0.5, color=LINE):
    return HRFlowable(width="100%", thickness=thick, color=color, spaceAfter=1.5, spaceBefore=0.5)

def sec(txt):
    return [Paragraph(txt, SEC), HR()]

def bul(txt):
    return Paragraph(f"• {txt}", BUL)

def proj_head(title, tech):
    return Table(
        [[Paragraph(f"<b>{title}</b>  <font color='#0284c7'>|</font>  <font color='#475569'>{tech}</font>", JOB)]],
        colWidths=[572], style=[
            ("LEFTPADDING", (0,0),(-1,-1),0),
            ("RIGHTPADDING",(0,0),(-1,-1),0),
            ("BOTTOMPADDING",(0,0),(-1,-1),0.5),
        ]
    )

story = []

# ── HEADER ──────────────────────────────────────────────────
story.append(Paragraph("SHUBHANGI RUPNAWAR", TITLE))
story.append(Paragraph("SOFTWARE DEVELOPER &nbsp; | &nbsp; AI & AUTOMATION", SUB))
story.append(Paragraph(
    "shubhangirupnawar5@gmail.com &nbsp;|&nbsp; linkedin.com/in/shubhangi-rupnawar-17a5443a3"
    " &nbsp;|&nbsp; github.com/shubhangirupnawar &nbsp;|&nbsp; shubhangirupnawar.github.io",
    CONTACT
))
story.append(Spacer(1, 1.5))
story.append(HR(thick=1, color=CYAN))

# ── PROFESSIONAL SUMMARY ─────────────────────────────────────
story += sec("PROFESSIONAL SUMMARY")
story.append(Paragraph(
    "Final-year Computer Science Engineering student with hands-on internship experience in automated "
    "data extraction, web scraping, and centralized data platform development, backed by a self-driven "
    "portfolio of full-stack and AI-integrated applications built independently. Proficient in Python "
    "and modern frameworks including Flask, FastAPI, and React, with practical exposure to machine "
    "learning, NLP, REST API design, and database-backed application development. "
    "Comfortable across the full development lifecycle — from data pipelines and backend APIs to responsive "
    "front-end interfaces — and quick to adopt new tools in fast-paced, remote-first environments. Seeking "
    "a full-time role as a Software Developer / AI Engineer building intelligent, production-grade applications.",
    BODY
))
story.append(Spacer(1, 1.5))

# ── KEY HIGHLIGHTS ───────────────────────────────────────────
highlights = [[
    Paragraph("<font size=9.5 color='#0284c7'><b>3+</b></font><br/><font size=6.5 color='#475569'>Full-Stack Projects Shipped</font>",
              ps("h1", alignment=TA_CENTER, leading=8.0)),
    Paragraph("<font size=9.5 color='#0284c7'><b>1</b></font><br/><font size=6.5 color='#475569'>Industry Internship</font>",
              ps("h2", alignment=TA_CENTER, leading=8.0)),
    Paragraph("<font size=9.5 color='#0284c7'><b>5+</b></font><br/><font size=6.5 color='#475569'>Frameworks & Platforms</font>",
              ps("h3", alignment=TA_CENTER, leading=8.0)),
]]
ht = Table(highlights, colWidths=[190, 192, 190])
ht.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),BG),
    ("BOX",(0,0),(-1,-1),.5,LINE),
    ("INNERGRID",(0,0),(-1,-1),.5,LINE),
    ("ALIGN",(0,0),(-1,-1),"CENTER"),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("TOPPADDING",(0,0),(-1,-1),1.5),
    ("BOTTOMPADDING",(0,0),(-1,-1),1.5),
]))
story.append(ht)
story.append(Spacer(1, 1.5))

# ── EXPERIENCE ───────────────────────────────────────────────
story += sec("EXPERIENCE")
exp_row = [[
    Paragraph("<b>Data Automation & Software Development Intern</b><br/>3C Customerization Technologies Pvt. Ltd. &nbsp;•&nbsp; <font color='#475569'>Apr 2026 – Jul 2026</font>", JOB),
    Paragraph("", DATE)
]]
et = Table(exp_row, colWidths=[572, 0])
et.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),0),
    ("RIGHTPADDING",(0,0),(-1,-1),0),
    ("BOTTOMPADDING",(0,0),(-1,-1),0.5),
]))
story.append(et)
story.append(bul("<b>Web Scraping & Automation:</b> Developed automated data-extraction solutions to collect structured data from multiple websites, designing reusable scripts to handle varying site structures and formats."))
story.append(bul("<b>Centralized Data Platform:</b> Contributed to building a platform for storing, retrieving, and visualizing extracted data, supporting reliable downstream analysis and reporting."))
story.append(bul("<b>Remote Collaboration:</b> Worked with mentor and team through regular progress catch-ups, following professional delivery practices, version control workflows, and strict data-security and confidentiality guidelines."))
story.append(bul("<b>End-to-End Ownership:</b> Owned pipelines independently — from writing extraction logic to validating and structuring collected data — while managing timelines under real production constraints."))
story.append(Spacer(1, 1.5))

# ── PROJECTS ─────────────────────────────────────────────────
story += sec("PROJECTS")

# Eccho-Tracker
story.append(proj_head("Eccho-Tracker", "FastAPI · React · Supabase"))
story.append(Paragraph("A full-stack mention-tracking platform with a FastAPI backend, REST APIs, a Supabase database, and a responsive React UI for real-time tracking.", BODY))
story.append(bul("<b>Database:</b> Implemented database schemas and API endpoints in Supabase to store and query tracked mentions."))
story.append(bul("<b>Dashboards:</b> Built dashboard views to visualize tracked data trends for end users in real time."))
story.append(bul("<b>Performance:</b> Optimized API response times and structured data models for scalable operations."))
story.append(Spacer(1, 1.0))

# AI Medicine
story.append(proj_head("AI-Based Medicine Recommendation System", "Python · Flask · Machine Learning"))
story.append(bul("<b>Model:</b> Trained an ML model to predict likely diseases from user-input symptoms and recommend appropriate medicines."))
story.append(bul("<b>Deployment:</b> Deployed the trained model through a Flask web application, enabling real-time predictions via a simple web interface."))
story.append(bul("<b>Data Pipeline:</b> Handled data preprocessing, feature engineering, and model evaluation to improve prediction accuracy."))
story.append(bul("<b>UX:</b> Designed the interface to present predictions and recommendations in a clear, accessible format."))
story.append(Spacer(1, 1.0))

# Ecom Review Miner
story.append(proj_head("Ecom Review Miner", "Python · Selenium · NLP"))
story.append(Paragraph("Automated mining and sentiment extraction system designed for e-commerce reviews with structured data pipelines.", BODY))
story.append(bul("Scrapes dynamic, paginated customer reviews using Python & Selenium."))
story.append(bul("Performs NLP-based sentiment analysis and key phrase extraction."))
story.append(bul("Structures raw review data into databases (MongoDB / JSON)."))
story.append(Spacer(1, 1.5))

# ── SKILLS & TECH STACK ──────────────────────────────────────
story += sec("SKILLS & TECH STACK")
skills = [
    ("Languages",        "Python"),
    ("Web & Frameworks", "HTML, React, Flask, FastAPI"),
    ("Automation & Data","Web Scraping, Data Pipelines, Data Visualization, Google Sheets API"),
    ("AI / ML",          "Machine Learning Basics, REST APIs, OOP"),
    ("Tools",            "VS Code, PyCharm, JDK, Git/GitHub, Supabase"),
]
sk_rows = [[Paragraph(f"<b>{k}</b>", SKILL_K), Paragraph(v, SKILL_V)] for k, v in skills]
skt = Table(sk_rows, colWidths=[110, 462])
skt.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("LEFTPADDING",(0,0),(-1,-1),0),
    ("RIGHTPADDING",(0,0),(-1,-1),0),
    ("TOPPADDING",(0,0),(-1,-1),0.4),
    ("BOTTOMPADDING",(0,0),(-1,-1),0.4),
]))
story.append(skt)
story.append(Spacer(1, 1.5))

# ── EDUCATION ────────────────────────────────────────────────
story += sec("EDUCATION")
story.append(Paragraph(
    "<b>B.Tech, Computer Science Engineering</b> &nbsp;—&nbsp; First Class &nbsp;(2022 – Expected 2026)<br/>"
    "12th Standard: 60% &nbsp;|&nbsp; 10th Standard: 80%", BODY
))
story.append(Spacer(1, 1.5))

# ── LANGUAGES ────────────────────────────────────────────────
story += sec("LANGUAGES")
story.append(Paragraph("English, Hindi, Marathi", BODY))

doc.build(story)
print("Single-page resume PDF generated:", pdf_path)
