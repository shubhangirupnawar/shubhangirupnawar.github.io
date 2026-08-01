import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_RIGHT

pdf_path = r"c:\Users\ABHIJEET RUPNAWAR\Downloads\shubhangi-portfolio-main\shubhangi-portfolio-main\public\resume.pdf"

# Page setup: Letter size (612 x 792 pt), tight margins (22pt) to fit cleanly on 1 page
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=24,
    rightMargin=24,
    topMargin=22,
    bottomMargin=22
)

styles = getSampleStyleSheet()

# Custom Colors
NAVY = colors.HexColor("#0f2942")
CYAN = colors.HexColor("#0284c7")
TEXT_DARK = colors.HexColor("#1e293b")
TEXT_MUTED = colors.HexColor("#475569")
LINE_COLOR = colors.HexColor("#cbd5e1")
BG_HIGHLIGHT = colors.HexColor("#f8fafc")

# Typography Styles
style_title = ParagraphStyle(
    'DocTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=20,
    textColor=NAVY,
    alignment=TA_CENTER
)

style_subtitle = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=11.5,
    textColor=CYAN,
    alignment=TA_CENTER,
    spaceAfter=2
)

style_contact = ParagraphStyle(
    'DocContact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.0,
    leading=10,
    textColor=TEXT_MUTED,
    alignment=TA_CENTER
)

style_sec_heading = ParagraphStyle(
    'SecHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=11.5,
    textColor=NAVY,
    spaceBefore=5,
    spaceAfter=2
)

style_body = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.0,
    leading=10.5,
    textColor=TEXT_DARK,
    alignment=TA_JUSTIFY
)

style_bullet = ParagraphStyle(
    'Bullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.0,
    leading=10.2,
    textColor=TEXT_DARK,
    leftIndent=10,
    firstLineIndent=-8,
    spaceAfter=1.5
)

style_job_title = ParagraphStyle(
    'JobTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11,
    textColor=TEXT_DARK
)

style_job_date = ParagraphStyle(
    'JobDate',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=8.2,
    leading=11,
    textColor=TEXT_MUTED,
    alignment=TA_RIGHT
)

story = []

# --- HEADER ---
story.append(Paragraph("SHUBHANGI RUPNAWAR", style_title))
story.append(Paragraph("SOFTWARE DEVELOPER &nbsp;|&nbsp; AI & AUTOMATION", style_subtitle))
story.append(Paragraph(
    "shubhangirupnawar5@gmail.com &nbsp;•&nbsp; linkedin.com/in/shubhangi-rupnawar-17a5443a3 &nbsp;•&nbsp; github.com/shubhangirupnawar &nbsp;•&nbsp; shubhangirupnawar.github.io",
    style_contact
))
story.append(Spacer(1, 2))
story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=4, spaceBefore=1))

# --- SUMMARY ---
story.append(Paragraph("PROFESSIONAL SUMMARY", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=1))
story.append(Paragraph(
    "Final-year Computer Science Engineering student with hands-on internship experience in automated data extraction, web scraping, and data platform development, backed by a self-driven portfolio of AI-integrated applications. Proficient in Python and modern frameworks including Flask, FastAPI, and React, with practical exposure to machine learning, generative AI (Google Gemini), REST API design, and database-backed application development. Comfortable across the full development lifecycle — from data pipelines and backend APIs to responsive front-end interfaces. Seeking a full-time role as a Software Developer / AI Engineer building intelligent, production-grade applications.",
    style_body
))
story.append(Spacer(1, 3))

# --- HIGHLIGHTS BOX ---
highlight_data = [
    [
        Paragraph("<font size=10.5 color='#0284c7'><b>3+</b></font><br/><font size=7 color='#475569'>Featured Projects Shipped</font>", ParagraphStyle('H1', alignment=TA_CENTER, leading=9)),
        Paragraph("<font size=10.5 color='#0284c7'><b>1</b></font><br/><font size=7 color='#475569'>Industry Internship</font>", ParagraphStyle('H2', alignment=TA_CENTER, leading=9)),
        Paragraph("<font size=10.5 color='#0284c7'><b>10+</b></font><br/><font size=7 color='#475569'>Technologies & Tools</font>", ParagraphStyle('H3', alignment=TA_CENTER, leading=9)),
    ]
]
t_highlight = Table(highlight_data, colWidths=[188, 188, 188])
t_highlight.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BG_HIGHLIGHT),
    ('BOX', (0,0), (-1,-1), 0.5, LINE_COLOR),
    ('INNERGRID', (0,0), (-1,-1), 0.5, LINE_COLOR),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story.append(t_highlight)
story.append(Spacer(1, 3))

# --- WORK EXPERIENCE (PLANTED RIGHT ON TOP OF PROJECTS!) ---
story.append(Paragraph("WORK EXPERIENCE", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=1))

exp_header = [
    [
        Paragraph("<b>Data Automation & Software Development Intern</b> &nbsp;|&nbsp; 3C Customerization Technologies Pvt. Ltd.", style_job_title),
        Paragraph("Apr 2026 – Jul 2026", style_job_date)
    ]
]
t_exp = Table(exp_header, colWidths=[426, 138])
t_exp.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
]))
story.append(t_exp)

story.append(Paragraph("• <b>Web Scraping & Automation:</b> Developed automated data-extraction solutions to collect structured data from websites, designing reusable scripts to handle dynamic site structures and formats.", style_bullet))
story.append(Paragraph("• <b>Centralized Data Platform:</b> Contributed to building a platform for storing, retrieving, and visualizing extracted data, supporting reliable downstream analysis and reporting.", style_bullet))
story.append(Paragraph("• <b>Remote Collaboration & Practices:</b> Worked with mentor and team through regular catch-ups, following professional software delivery practices, version control workflows, and strict data security guidelines.", style_bullet))
story.append(Paragraph("• <b>End-to-End Ownership:</b> Owned data pipelines independently — from writing extraction logic to validating and structuring collected data under production constraints.", style_bullet))
story.append(Spacer(1, 3))

# --- PROJECTS ---
story.append(Paragraph("PROJECTS", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=1))

def make_proj(title, tech, bullets):
    p_head = [
        [
            Paragraph(f"<b>{title}</b> &nbsp;<font color='#0284c7'>|</font>&nbsp; <font color='#475569'><b>{tech}</b></font>", style_job_title),
        ]
    ]
    t = Table(p_head, colWidths=[564])
    t.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    res = [t]
    for b in bullets:
        res.append(Paragraph(f"• {b}", style_bullet))
    return res

# Project 1: ECCHO Social Follower Tracker
for item in make_proj(
    "ECCHO Social Follower Tracker",
    "FastAPI · React · Supabase · Gemini AI",
    [
        "<b>AI-Powered Scraping:</b> Uses Google Gemini AI for high-accuracy numeric follower extraction from dynamic social media pages.",
        "<b>Brand Validation:</b> AI verifies if URLs belong to the selected brand before scraping to ensure high data integrity.",
        "<b>Reporting & Analytics:</b> Generates monthly aggregate snapshots, 15th & End-of-Month snapshots, Excel exports, and comparison dashboards."
    ]
):
    story.append(item)

# Project 2: AI-Based Medicine Recommendation System
for item in make_proj(
    "AI-Based Medicine Recommendation System",
    "Python · Flask · Machine Learning",
    [
        "<b>ML Model & Deployment:</b> Trained a machine learning classification model to predict likely diseases from user-input symptoms and recommend appropriate medicines.",
        "<b>Pipeline & Web Interface:</b> Deployed the trained model through a Flask web application, handling data preprocessing, feature engineering, and real-time prediction output."
    ]
):
    story.append(item)

# Project 3: Ecom Review Miner
for item in make_proj(
    "Ecom Review Miner",
    "Python · Selenium · NLP · Scraping",
    [
        "<b>Automated Scraping:</b> Scrapes dynamic, paginated customer reviews from e-commerce platforms using Python and Selenium.",
        "<b>NLP & Pipelines:</b> Performs NLP sentiment analysis and key phrase extraction, structuring raw review data into MongoDB/JSON pipelines."
    ]
):
    story.append(item)
story.append(Spacer(1, 3))

# --- SKILLS ---
story.append(Paragraph("SKILLS & TECH STACK", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=1))

skills_data = [
    [Paragraph("<b>Programming Language</b>", style_bullet), Paragraph("Python", style_body)],
    [Paragraph("<b>Frameworks & Web</b>", style_bullet), Paragraph("React.js, FastAPI, Flask, REST APIs, HTML, JavaScript", style_body)],
    [Paragraph("<b>Automation & Data</b>", style_bullet), Paragraph("Web Scraping, Selenium, Data Pipelines, Data Visualization, Google Sheets API, Supabase, MongoDB", style_body)],
    [Paragraph("<b>AI / ML & Tools</b>", style_bullet), Paragraph("Google Gemini AI, Machine Learning Basics, NLP, Git / GitHub, VS Code, PyCharm, OOP", style_body)],
]
t_skills = Table(skills_data, colWidths=[120, 444])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0.5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
]))
story.append(t_skills)
story.append(Spacer(1, 3))

# --- EDUCATION & LANGUAGES ---
story.append(Paragraph("EDUCATION & LANGUAGES", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=1))

edu_data = [
    [
        Paragraph("<b>B.Tech in Computer Science Engineering</b> (2022 – Expected 2026) &nbsp;|&nbsp; <font color='#475569'>12th: 60% &nbsp;•&nbsp; 10th: 80%</font>", style_body),
        Paragraph("<b>Languages:</b> English, Hindi, Marathi", ParagraphStyle('Lang', parent=style_body, alignment=TA_RIGHT))
    ]
]
t_edu = Table(edu_data, colWidths=[376, 188])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)

doc.build(story)
print("Updated single-page PDF generated successfully at:", pdf_path)
