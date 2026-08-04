import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_RIGHT

pdf_path = r"c:\Users\ABHIJEET RUPNAWAR\Downloads\shubhangi-portfolio-main\shubhangi-portfolio-main\public\resume.pdf"

# Page setup: Letter size (612 x 792 pt), 20pt margins for perfect 1-page fit
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=20,
    rightMargin=20,
    topMargin=18,
    bottomMargin=18
)

styles = getSampleStyleSheet()

# Colors
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
    fontSize=7.8,
    leading=9.8,
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
    spaceBefore=4,
    spaceAfter=2
)

style_body = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.8,
    leading=9.8,
    textColor=TEXT_DARK,
    alignment=TA_JUSTIFY
)

style_bullet = ParagraphStyle(
    'Bullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.6,
    leading=9.5,
    textColor=TEXT_DARK,
    leftIndent=9,
    firstLineIndent=-7,
    spaceAfter=0.5
)

style_job_title = ParagraphStyle(
    'JobTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.2,
    leading=10.5,
    textColor=TEXT_DARK
)

style_job_date = ParagraphStyle(
    'JobDate',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=8.0,
    leading=10.5,
    textColor=TEXT_MUTED,
    alignment=TA_RIGHT
)

story = []

# --- HEADER ---
story.append(Paragraph("SHUBHANGI RUPNAWAR", style_title))
story.append(Paragraph("SOFTWARE DEVELOPER &nbsp;|&nbsp; AI & AUTOMATION", style_subtitle))
story.append(Paragraph(
    "shubhangirupnawar5@gmail.com &nbsp;|&nbsp; linkedin.com/in/shubhangi-rupnawar-17a5443a3<br/>github.com/shubhangirupnawar &nbsp;|&nbsp; shubhangirupnawar.github.io",
    style_contact
))
story.append(Spacer(1, 2))
story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=3, spaceBefore=1))

# --- SUMMARY ---
story.append(Paragraph("PROFESSIONAL SUMMARY", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))
story.append(Paragraph(
    "Final-year Computer Science Engineering student with hands-on internship experience in automated data extraction, web scraping, and centralized data platform development, backed by a self-driven portfolio of full-stack and AI-integrated applications built independently. Proficient in Python, Java, and modern frameworks including Flask, FastAPI, and React, with practical exposure to machine learning, generative AI (Google Gemini), REST API design, and database-backed application development. Comfortable across the full development lifecycle — from data pipelines and backend APIs to responsive front-end interfaces — and quick to adopt new tools in fast-paced, remote-first environments. Seeking a full-time role as a Software Developer / AI Engineer building intelligent, production-grade applications.",
    style_body
))
story.append(Spacer(1, 2))

# --- HIGHLIGHTS BOX ---
highlight_data = [
    [
        Paragraph("<font size=10 color='#0284c7'><b>3+</b></font><br/><font size=6.8 color='#475569'>Full-Stack Projects Shipped</font>", ParagraphStyle('H1', alignment=TA_CENTER, leading=8.5)),
        Paragraph("<font size=10 color='#0284c7'><b>1</b></font><br/><font size=6.8 color='#475569'>Industry Internship</font>", ParagraphStyle('H2', alignment=TA_CENTER, leading=8.5)),
        Paragraph("<font size=10 color='#0284c7'><b>5+</b></font><br/><font size=6.8 color='#475569'>Frameworks & Platforms</font>", ParagraphStyle('H3', alignment=TA_CENTER, leading=8.5)),
    ]
]
t_highlight = Table(highlight_data, colWidths=[190, 192, 190])
t_highlight.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BG_HIGHLIGHT),
    ('BOX', (0,0), (-1,-1), 0.5, LINE_COLOR),
    ('INNERGRID', (0,0), (-1,-1), 0.5, LINE_COLOR),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 2),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
]))
story.append(t_highlight)
story.append(Spacer(1, 2))

# --- EXPERIENCE ---
story.append(Paragraph("EXPERIENCE", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))

exp_header = [
    [
        Paragraph("<b>Data Automation & Software Development Intern</b><br/>3C Customerization Technologies Pvt. Ltd.", style_job_title),
        Paragraph("Apr 2026 – Jul 2026", style_job_date)
    ]
]
t_exp = Table(exp_header, colWidths=[432, 140])
t_exp.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
]))
story.append(t_exp)

story.append(Paragraph("• <b>Web Scraping & Automation:</b> Developed automated data-extraction solutions to collect structured data from multiple websites, designing reusable scripts to handle varying site structures and formats.", style_bullet))
story.append(Paragraph("• <b>Centralized Data Platform:</b> Contributed to building a platform for storing, retrieving, and visualizing extracted data, supporting reliable downstream analysis and reporting.", style_bullet))
story.append(Paragraph("• <b>Remote Collaboration:</b> Worked with mentor and team through regular progress catch-ups, following professional delivery practices, version control workflows, and strict data-security and confidentiality guidelines.", style_bullet))
story.append(Paragraph("• <b>End-to-End Ownership:</b> Owned pipelines independently — from writing extraction logic to validating and structuring collected data — while managing timelines under real production constraints.", style_bullet))
story.append(Spacer(1, 2))

# --- PROJECTS ---
story.append(Paragraph("PROJECTS", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))

# Project 1: Eccho-Tracker
p1_head = [
    [
        Paragraph("<b>Eccho-Tracker</b> &nbsp;|&nbsp; <font color='#475569'><b>FastAPI · React · Supabase</b></font>", style_job_title)
    ]
]
t_p1 = Table(p1_head, colWidths=[572])
t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
story.append(t_p1)
story.append(Paragraph("A full-stack mention-tracking platform with a FastAPI backend, REST APIs, a Supabase database, and a responsive React UI for real-time tracking.", style_body))
story.append(Paragraph("• <b>Database:</b> Implemented database schemas and API endpoints in Supabase to store and query tracked mentions.", style_bullet))
story.append(Paragraph("• <b>Dashboards:</b> Built dashboard views to visualize tracked data trends for end users in real time.", style_bullet))
story.append(Paragraph("• <b>Performance:</b> Optimized API response times and structured data models for scalable operations.", style_bullet))
story.append(Spacer(1, 1.5))

# Project 2: AI-Based Medicine Recommendation System
p2_head = [
    [
        Paragraph("<b>AI-Based Medicine Recommendation System</b> &nbsp;|&nbsp; <font color='#475569'><b>Python · Flask · Machine Learning</b></font>", style_job_title)
    ]
]
t_p2 = Table(p2_head, colWidths=[572])
t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
story.append(t_p2)
story.append(Paragraph("• <b>Model:</b> Trained an ML model to predict likely diseases from user-input symptoms and recommend appropriate medicines.", style_bullet))
story.append(Paragraph("• <b>Deployment:</b> Deployed the trained model through a Flask web application, enabling real-time predictions via a simple web interface.", style_bullet))
story.append(Paragraph("• <b>Data Pipeline:</b> Handled data preprocessing, feature engineering, and model evaluation to improve prediction accuracy.", style_bullet))
story.append(Paragraph("• <b>UX:</b> Designed the interface to present predictions and recommendations in a clear, accessible format.", style_bullet))
story.append(Spacer(1, 1.5))

# Project 3: Ecom Review Miner
p3_head = [
    [
        Paragraph("<b>Ecom Review Miner</b> &nbsp;|&nbsp; <font color='#475569'><b>Python · Selenium · NLP</b></font>", style_job_title)
    ]
]
t_p3 = Table(p3_head, colWidths=[572])
t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
story.append(t_p3)
story.append(Paragraph("Automated mining and sentiment extraction system designed for e-commerce reviews with structured data pipelines.", style_body))
story.append(Paragraph("• Scrapes dynamic, paginated customer reviews using Python & Selenium.", style_bullet))
story.append(Paragraph("• Performs NLP-based sentiment analysis and key phrase extraction.", style_bullet))
story.append(Paragraph("• Structures raw review data into databases (MongoDB / JSON).", style_bullet))
story.append(Spacer(1, 2))

# --- SKILLS & TECH STACK ---
story.append(Paragraph("SKILLS & TECH STACK", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))

skills_data = [
    [Paragraph("<b>Languages</b>", style_bullet), Paragraph("Python", style_body)],
    [Paragraph("<b>Web & Frameworks</b>", style_bullet), Paragraph("HTML, React, Flask, FastAPI", style_body)],
    [Paragraph("<b>Automation & Data</b>", style_bullet), Paragraph("Web Scraping, Data Pipelines, Data Visualization, Google Sheets API", style_body)],
    [Paragraph("<b>AI / ML</b>", style_bullet), Paragraph("Machine Learning Basics, Google Gemini AI, REST APIs, OOP, Data Structures", style_body)],
    [Paragraph("<b>Tools</b>", style_bullet), Paragraph("VS Code, Google Antigravity, PyCharm, JDK, Git/GitHub, Supabase", style_body)],
]
t_skills = Table(skills_data, colWidths=[120, 452])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0.5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
]))
story.append(t_skills)
story.append(Spacer(1, 2))

# --- EDUCATION & LANGUAGES ---
story.append(Paragraph("EDUCATION", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))

edu_data = [
    [
        Paragraph("<b>B.Tech, Computer Science Engineering</b> (2022 – Expected 2026)<br/>12th Standard: 60% &nbsp;|&nbsp; 10th Standard: 80%", style_body),
    ]
]
t_edu = Table(edu_data, colWidths=[572])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)
story.append(Spacer(1, 2))

story.append(Paragraph("LANGUAGES", style_sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=2, spaceBefore=1))
story.append(Paragraph("English, Hindi, Marathi", style_body))

doc.build(story)
print("Updated exact PDF generated successfully at:", pdf_path)
