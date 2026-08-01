import { useState, useEffect, useRef } from "react";
import "./App.css";

const getMailHref = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "mailto:shubhangirupnawar5@gmail.com"
    : "https://mail.google.com/mail/?view=cm&to=shubhangirupnawar5@gmail.com";

const NAV_LINKS = ["About", "Projects", "AI & ML", "Skills", "Experience", "Contact"];

const PROJECTS = [
  {
    id: 1,
    icon: "👁️",
    title: "Vision AI Analyzer",
    tag: ["React", "FastAPI", "Google Gemini AI"],
    desc: "A full-stack web app powered by Google Gemini AI that analyzes uploaded images, extracts detailed content, and generates human-readable AI summaries.",
    bullets: [
      "Designed a FastAPI backend to integrate with Gemini AI API for real-time image inference.",
      "Built a clean, responsive React interface for image upload, live analysis feedback, and summary display.",
      "Implemented error handling and response formatting across varied image types.",
    ],
    github: "https://github.com/shubhangirupnawar/vision-ai-analyzer",
    demo: "https://github.com/shubhangirupnawar/vision-ai-analyzer",
    accent: "#06b6d4",
  },
  {
    id: 2,
    icon: "📡",
    title: "Eccho-Tracker",
    tag: ["FastAPI", "React", "Supabase"],
    desc: "A full-stack mention-tracking platform with a FastAPI backend, REST APIs, Supabase database, and a responsive React UI for real-time tracking.",
    bullets: [
      "Implemented database schemas and API endpoints in Supabase to store and query tracked mentions.",
      "Built dashboard views to visualize tracked data trends for end users in real time.",
      "Optimized API response times and structured data models for scalable operations.",
    ],
    github: "https://github.com/shubhangirupnawar/eccho-tracker",
    demo: "https://github.com/shubhangirupnawar/eccho-tracker",
    accent: "#8b5cf6",
  },
  {
    id: 3,
    icon: "💊",
    title: "AI-Based Medicine Recommendation",
    tag: ["Python", "Flask", "Machine Learning"],
    desc: "A machine learning system that predicts likely diseases from user-input symptoms and recommends appropriate medicines.",
    bullets: [
      "Trained an ML classification model to predict diseases from user-input symptoms.",
      "Deployed through a Flask web application, enabling real-time predictions via a simple web interface.",
      "Handled data preprocessing, feature engineering, and model evaluation to improve accuracy.",
    ],
    github: "https://github.com/shubhangirupnawar",
    demo: "https://github.com/shubhangirupnawar",
    accent: "#10b981",
  },
  {
    id: 4,
    icon: "⛏️",
    title: "Ecom Review Miner",
    tag: ["Python", "Selenium", "NLP"],
    desc: "Automated mining and sentiment extraction system designed for e-commerce reviews with structured data pipelines.",
    bullets: [
      "Scrapes dynamic, paginated customer reviews using Python & Selenium.",
      "Performs NLP-based sentiment analysis and key phrase extraction.",
      "Structures raw review data into databases (MongoDB/JSON).",
    ],
    github: "https://github.com/shubhangirupnawar/bb-fk-scraper",
    demo: "https://github.com/shubhangirupnawar/bb-fk-scraper",
    accent: "#f59e0b",
  },
];

const SKILLS_GROUPS = [
  {
    title: "Languages",
    icon: "💻",
    items: ["Python", "Java", "C (Basic)", "HTML", "JavaScript"],
  },
  {
    title: "Frameworks & Tools",
    icon: "⚙️",
    items: ["React.js", "FastAPI", "Flask", "Selenium", "Supabase"],
  },
  {
    title: "AI & Data",
    icon: "🤖",
    items: ["Google Gemini AI", "Machine Learning Basics", "NLP", "Data Pipelines", "Pandas / NumPy"],
  },
  {
    title: "Developer Tools",
    icon: "🛠️",
    items: ["Git / GitHub", "VS Code", "PyCharm", "Google Sheets API", "REST APIs"],
  },
];

const AI_ML = [
  {
    id: 1,
    icon: "🤖",
    title: "Natural Language Processing",
    desc: "Building NLP pipelines for text classification, sentiment analysis, and key phrase extraction from real-world datasets.",
    tools: ["NLTK", "spaCy", "HuggingFace", "TextBlob", "REST APIs"],
    color: "#06b6d4",
  },
  {
    id: 2,
    icon: "👁️",
    title: "Computer Vision",
    desc: "Developing image analysis tools using deep learning models for object detection, OCR, and visual metadata extraction.",
    tools: ["OpenCV", "Google Gemini AI", "PIL", "TensorFlow"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    icon: "🧠",
    title: "Large Language Models & Gen AI",
    desc: "Integrating LLMs like Google Gemini AI into production applications for summarization and interactive tools.",
    tools: ["Google Gemini AI", "Whisper API", "LangChain", "FastAPI", "Python"],
    color: "#10b981",
  },
  {
    id: 4,
    icon: "📊",
    title: "Data Automation & Scraping",
    desc: "Designing end-to-end data pipelines that scrape, clean, analyze, and visualize structured and unstructured datasets.",
    tools: ["Pandas", "NumPy", "MongoDB", "Selenium", "Google Sheets API"],
    color: "#f59e0b",
  },
];

/* ── Typed Text ── */
function TypedText({ words }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const w = words[idx];
    let t;
    if (!del && char <= w.length) { setDisplay(w.slice(0, char)); t = setTimeout(() => setChar(c => c + 1), 70); }
    else if (!del) { t = setTimeout(() => setDel(true), 1800); }
    else if (del && char >= 0) { setDisplay(w.slice(0, char)); t = setTimeout(() => setChar(c => c - 1), 40); }
    else { setDel(false); setIdx(i => (i + 1) % words.length); setChar(0); }
    return () => clearTimeout(t);
  }, [char, del, idx, words]);
  return <span className="typed-word">{display}<span className="typed-cursor">|</span></span>;
}

/* ── useReveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
      obs.observe(el);
      return () => obs.disconnect();
    }
    setVis(true);
  }, []);
  return [ref, vis];
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const sectionsRef = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.dataset.section); }),
      { threshold: 0.25 }
    );
    Object.values(sectionsRef.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = resumeOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [resumeOpen]);

  const scrollTo = section => {
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("shubhangirupnawar5@gmail.com");
    setToastMsg("Email copied!");
    setTimeout(() => setToastMsg(""), 2000);
  };

  const [heroRef, heroVis] = useReveal(0.05);

  return (
    <div className="app">
      {/* Background */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* NAV */}
      <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo">
            <span className="logo-gradient">SR</span>
          </div>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <button
                  className={activeSection === l ? "active" : ""}
                  onClick={() => scrollTo(l)}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="section hero-section" ref={heroRef}>
        <div className={`hero-inner${heroVis ? " visible" : ""}`}>
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for Opportunities
            </div>
            <h1 className="hero-title">
              Hi, I'm<br />
              <span className="gradient-text">Shubhangi</span>
            </h1>
            <div className="hero-subtitle">
              <TypedText words={["SOFTWARE DEVELOPER", "AI & AUTOMATION ENGINEER", "FULL STACK DEVELOPER", "DATA AUTOMATION SPECIALIST"]} />
            </div>
            <p className="hero-desc">
              Final-year Computer Science Engineering student with hands-on internship experience in automated data extraction, web scraping, and AI-integrated applications.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="btn-outline" onClick={() => setResumeOpen(true)}>View Resume</button>
              <a className="btn-outline" href={getMailHref()} target="_blank" rel="noreferrer">Contact Me</a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-number gradient-text">4+</div>
                <div className="stat-label">Live Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🤖</div>
                <div className="stat-number gradient-text">2+</div>
                <div className="stat-label">AI Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-number gradient-text">3</div>
                <div className="stat-label">Months Internship</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛠️</div>
                <div className="stat-number gradient-text">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection sectionsRef={sectionsRef} />

      {/* PROJECTS */}
      <ProjectsSection sectionsRef={sectionsRef} />

      {/* AI & ML */}
      <AiMlSection sectionsRef={sectionsRef} />

      {/* SKILLS */}
      <SkillsSection sectionsRef={sectionsRef} />

      {/* EXPERIENCE */}
      <ExperienceSection sectionsRef={sectionsRef} />

      {/* CONTACT */}
      <ContactSection sectionsRef={sectionsRef} getMailHref={getMailHref} copyEmail={copyEmail} />

      {/* FOOTER */}
      <footer className="footer">
        <span>© Shubhangi Rupnawar &nbsp;·&nbsp; SOFTWARE DEVELOPER | AI & AUTOMATION</span>
      </footer>

      {/* RESUME MODAL */}
      {resumeOpen && (
        <div className="modal-overlay" onClick={() => setResumeOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Resume</h3>
              <div className="modal-head-actions">
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="btn-primary">Download PDF</a>
                <button className="modal-close" onClick={() => setResumeOpen(false)}>✕</button>
              </div>
            </div>
            <iframe
              src={`${import.meta.env.BASE_URL}resume.pdf#toolbar=0&navpanes=0`}
              title="Resume"
              className="resume-frame"
            />
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}

function SectionHeader({ label, title, desc }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`section-header${vis ? " visible" : ""}`}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}

function AboutSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section
      className="section"
      data-section="About"
      ref={el => { sectionsRef.current["About"] = el; }}
    >
      <div className="section-inner">
        <SectionHeader label="WHO I AM" title="About Me" />
        <div ref={ref} className={`about-grid${vis ? " visible" : ""}`}>
          <div className="about-text">
            <p>I'm a <strong>Software Developer specializing in AI & Automation</strong> based in Maharashtra, India. I focus on automated data extraction, web scraping, and AI-integrated full-stack applications.</p>
            <p>I build robust applications that automate data extraction pipelines, design FastAPI/Flask backends, and integrate generative AI APIs like <strong>Google Gemini AI</strong> to solve real business needs.</p>
            <p>My expertise spans React.js for modern web interfaces, Python for backend development and automation, database integration with Supabase and MongoDB, and custom web scraping scripts.</p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="hi-icon">🎯</span>
                <span>Full-Stack Development</span>
              </div>
              <div className="highlight-item">
                <span className="hi-icon">🤖</span>
                <span>AI & Automation</span>
              </div>
              <div className="highlight-item">
                <span className="hi-icon">🕸️</span>
                <span>Web Scraping Expert</span>
              </div>
              <div className="highlight-item">
                <span className="hi-icon">📊</span>
                <span>Data Pipelines</span>
              </div>
            </div>
          </div>
          <div className="about-info-card card">
            <div className="info-row"><span className="info-label">📧 Email</span><span>shubhangirupnawar5@gmail.com</span></div>
            <div className="info-row"><span className="info-label">📍 Location</span><span>Maharashtra, India</span></div>
            <div className="info-row"><span className="info-label">🎓 Education</span><span>B.Tech CSE (2026)</span></div>
            <div className="info-row"><span className="info-label">💼 Status</span><span className="status-available">Available for Opportunities</span></div>
            <div className="info-row"><span className="info-label">🔗 LinkedIn</span><a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer">shubhangi-rupnawar</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ sectionsRef }) {
  return (
    <section className="section" data-section="Projects" ref={el => { sectionsRef.current["Projects"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHAT I'VE BUILT" title="Projects" desc="Real-world applications built with modern technologies and AI integrations." />
        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`card project-card${vis ? " visible" : ""}`} style={{ "--card-accent": p.accent }}>
      <div className="project-card-top">
        <span className="project-icon">{p.icon}</span>
        <div className="project-tags">
          {p.tag.map((t, i) => <span key={i} className="tag">{t}</span>)}
        </div>
      </div>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.desc}</p>
      <ul className="project-bullets">
        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="project-links">
        <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
          Code
        </a>
        <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          Live
        </a>
      </div>
    </div>
  );
}

function AiMlSection({ sectionsRef }) {
  return (
    <section className="section section-dark" data-section="AI & ML" ref={el => { sectionsRef.current["AI & ML"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="MY EXPERTISE" title="AI & ML Capabilities" desc="Core competencies in artificial intelligence, machine learning, and data automation." />
        <div className="aiml-grid">
          {AI_ML.map(item => <AiMlCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}

function AiMlCard({ item }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`card aiml-card${vis ? " visible" : ""}`} style={{ "--card-accent": item.color }}>
      <div className="aiml-icon">{item.icon}</div>
      <h3 className="aiml-title">{item.title}</h3>
      <p className="aiml-desc">{item.desc}</p>
      <div className="aiml-tools">
        {item.tools.map((t, i) => <span key={i} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function SkillsSection({ sectionsRef }) {
  return (
    <section className="section" data-section="Skills" ref={el => { sectionsRef.current["Skills"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="TECH STACK" title="Skills & Technologies" desc="Technologies and tools I use to build and ship products." />
        <div className="skills-grid">
          {SKILLS_GROUPS.map((g, i) => <SkillGroup key={i} group={g} />)}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`card skill-group${vis ? " visible" : ""}`}>
      <div className="skill-group-header">
        <span className="skill-group-icon">{group.icon}</span>
        <h3 className="skill-group-title">{group.title}</h3>
      </div>
      <ul className="skill-list">
        {group.items.map((s, i) => (
          <li key={i} className="skill-item">
            <span className="skill-dot" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section section-dark" data-section="Experience" ref={el => { sectionsRef.current["Experience"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHERE I'VE WORKED" title="Work Experience" />
        <div ref={ref} className={`exp-container${vis ? " visible" : ""}`}>
          <div className="card exp-card">
            <div className="exp-header">
              <div>
                <h3 className="exp-role">Data Automation & Software Development Intern</h3>
                <div className="exp-company">3C Customerization Technologies Pvt. Ltd.</div>
              </div>
              <span className="exp-badge">Apr 2026 – Jul 2026</span>
            </div>
            <ul className="exp-bullets">
              <li>Developed automated data extraction (web scraping) solutions to collect structured data from multiple websites, designing reusable scripts to handle varying site structures.</li>
              <li>Contributed to building a centralized data platform for storing, retrieving, and visualizing extracted data efficiently, supporting reliable downstream analysis and reporting.</li>
              <li>Collaborated remotely with the mentor and team through regular progress catch-ups, following professional software delivery practices, version control workflows, and strict data-security guidelines.</li>
              <li>Worked independently on end-to-end pipelines — from writing extraction logic to validating and structuring data — while managing timelines under real production constraints.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ sectionsRef, getMailHref, copyEmail }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section" data-section="Contact" ref={el => { sectionsRef.current["Contact"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="GET IN TOUCH" title="Let's Connect" desc="Feel free to reach out for opportunities, collaborations, or just to chat about tech!" />
        <div ref={ref} className={`contact-grid${vis ? " visible" : ""}`}>
          <div className="card contact-card">
            <h3 className="contact-card-title">📧 Email Me</h3>
            <p className="contact-card-email">shubhangirupnawar5@gmail.com</p>
            <div className="contact-btns">
              <a href={getMailHref()} target="_blank" rel="noreferrer" className="btn-primary">Send Message</a>
              <button className="btn-outline" onClick={copyEmail}>Copy Email</button>
            </div>
          </div>
          <div className="card contact-card">
            <h3 className="contact-card-title">🔗 Social Links</h3>
            <div className="contact-socials">
              <a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer" className="contact-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                GitHub — shubhangirupnawar
              </a>
              <a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer" className="contact-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn — Shubhangi Rupnawar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
