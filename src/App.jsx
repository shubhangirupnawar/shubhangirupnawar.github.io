import { useState, useEffect, useRef } from "react";
import "./App.css";

const getMailHref = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "mailto:shubhangirupnawar5@gmail.com"
    : "https://mail.google.com/mail/?view=cm&to=shubhangirupnawar5@gmail.com";

/* Reference site nav: About | Skills | Certifications | Experience | Contact
   Shubhangi nav:      About | Projects | Skills | Experience | Contact        */
const NAV_LINKS = ["About", "Projects", "Skills", "Experience", "Contact"];

const PROJECTS = [
  {
    id: 1,
    icon: "👁️",
    title: "Vision AI Analyzer",
    tag: ["React", "FastAPI", "Google Gemini AI"],
    desc: "A full-stack web app powered by Google Gemini AI that analyzes uploaded images and generates human-readable AI summaries.",
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
      "Structures raw review data into databases (MongoDB / JSON).",
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
    items: ["Google Gemini AI", "Machine Learning", "NLP", "Data Pipelines", "Pandas / NumPy"],
  },
  {
    title: "Developer Tools",
    icon: "🛠️",
    items: ["Git / GitHub", "VS Code", "PyCharm", "Google Sheets API", "REST APIs"],
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
    if (!del && char <= w.length) { setDisplay(w.slice(0, char)); t = setTimeout(() => setChar(c => c + 1), 65); }
    else if (!del) { t = setTimeout(() => setDel(true), 2000); }
    else if (del && char >= 0) { setDisplay(w.slice(0, char)); t = setTimeout(() => setChar(c => c - 1), 35); }
    else { setDel(false); setIdx(i => (i + 1) % words.length); setChar(0); }
    return () => clearTimeout(t);
  }, [char, del, idx, words]);
  return <span className="typed-word">{display}<span className="typed-cursor">|</span></span>;
}

/* ── useReveal ── */
function useReveal(threshold = 0.1) {
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

/* ── Main App ── */
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
      { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" }
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

  const copyEmail = e => {
    e.preventDefault();
    navigator.clipboard.writeText("shubhangirupnawar5@gmail.com");
    setToastMsg("Email copied!");
    setTimeout(() => setToastMsg(""), 2000);
  };

  const [heroRef, heroVis] = useReveal(0.05);

  return (
    <div className="app">
      {/* Bg */}
      <div className="bg-noise" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            shubhangi<span className="logo-dot">.</span>
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

      {/* ── HERO ── */}
      <section className="hero-section" ref={heroRef}>
        <div className={`hero-inner${heroVis ? " visible" : ""}`}>
          {/* Left */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" /> Available for Opportunities
            </div>
            <h1 className="hero-title">
              Hi, I'm<br />
              <span className="gradient-text">Shubhangi Rupnawar</span>
            </h1>
            <p className="hero-role">
              <TypedText words={["Software Developer", "AI & Automation Engineer", "Full Stack Developer", "Data Automation Specialist"]} />
              {" "}— building tools that automate, analyze, and solve real-world problems.
            </p>
            {/* CTA buttons — matching reference layout */}
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .15h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" /></svg>
                Get in Touch
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("Projects")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /><path d="M12 8v4l3 3" /></svg>
                View Projects
              </button>
            </div>
            <div className="hero-cta-row2">
              <button className="btn-outline-sm" onClick={() => scrollTo("Experience")}>
                💼 View Experience
              </button>
              <button className="btn-outline-sm" onClick={() => setResumeOpen(true)}>
                ⬇ Download CV
              </button>
            </div>
          </div>

          {/* Right — stats grid exactly like reference */}
          <div className="hero-right">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number gradient-text">1+</div>
                <div className="stat-label">Industry Internship</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">4+</div>
                <div className="stat-label">Selected Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">10+</div>
                <div className="stat-label">Technologies Used</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">2+</div>
                <div className="stat-label">AI Integrations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <AboutSection sectionsRef={sectionsRef} />

      {/* ── PROJECTS ── */}
      <ProjectsSection sectionsRef={sectionsRef} />

      {/* ── SKILLS ── */}
      <SkillsSection sectionsRef={sectionsRef} />

      {/* ── EXPERIENCE ── */}
      <ExperienceSection sectionsRef={sectionsRef} />

      {/* ── CONTACT ── */}
      <ContactSection sectionsRef={sectionsRef} getMailHref={getMailHref} copyEmail={copyEmail} setResumeOpen={setResumeOpen} />

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>© 2025 Shubhangi Rupnawar &nbsp;·&nbsp; SOFTWARE DEVELOPER | AI & AUTOMATION</span>
      </footer>

      {/* ── RESUME MODAL ── */}
      {resumeOpen && (
        <div className="modal-overlay" onClick={() => setResumeOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Resume — Shubhangi Rupnawar</h3>
              <div className="modal-head-actions">
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="btn-primary">⬇ Download</a>
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

      {/* Toast */}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}

/* ── Section Header (matches reference style) ── */
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

/* ── About ── */
function AboutSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section" data-section="About" ref={el => { sectionsRef.current["About"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHO I AM" title="About Me" />
        <div ref={ref} className={`about-grid${vis ? " visible" : ""}`}>
          <div className="about-text">
            <p>I'm a <strong>Software Developer specializing in AI & Automation</strong> based in Maharashtra, India. Final-year B.Tech CSE student with hands-on internship experience in automated data extraction, web scraping, and AI-integrated applications.</p>
            <p>I build robust applications that automate data extraction pipelines, design FastAPI/Flask backends, and integrate generative AI APIs like <strong>Google Gemini AI</strong> to solve real business needs.</p>
            <p>My expertise spans React.js for modern web interfaces, Python for backend development and automation, database integration with Supabase and MongoDB, and custom web scraping pipelines.</p>
            <div className="about-tags">
              {["Full-Stack Development", "AI & Automation", "Web Scraping", "Data Pipelines", "REST APIs", "Machine Learning"].map(t => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="about-info card">
            <div className="info-row"><span className="info-key">📧 Email</span><span className="info-val">shubhangirupnawar5@gmail.com</span></div>
            <div className="info-row"><span className="info-key">📍 Location</span><span className="info-val">Maharashtra, India</span></div>
            <div className="info-row"><span className="info-key">🎓 Education</span><span className="info-val">B.Tech CSE (2026)</span></div>
            <div className="info-row"><span className="info-key">💼 Status</span><span className="status-chip">Available for Opportunities</span></div>
            <div className="info-row">
              <span className="info-key">🔗 LinkedIn</span>
              <a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer" className="info-link">shubhangi-rupnawar</a>
            </div>
            <div className="info-row">
              <span className="info-key">💻 GitHub</span>
              <a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer" className="info-link">shubhangirupnawar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function ProjectsSection({ sectionsRef }) {
  return (
    <section className="section section-alt" data-section="Projects" ref={el => { sectionsRef.current["Projects"] = el; }}>
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
    <div ref={ref} className={`card project-card${vis ? " visible" : ""}`} style={{ "--ca": p.accent }}>
      <div className="project-top">
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
        <a href={p.github} target="_blank" rel="noreferrer" className="plink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
          Code
        </a>
        <a href={p.demo} target="_blank" rel="noreferrer" className="plink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          Live Demo
        </a>
      </div>
    </div>
  );
}

/* ── Skills ── */
function SkillsSection({ sectionsRef }) {
  return (
    <section className="section" data-section="Skills" ref={el => { sectionsRef.current["Skills"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="TECH STACK" title="Skills & Technologies" desc="Technologies and tools I use to build and ship products." />
        <div className="skills-grid">
          {SKILLS_GROUPS.map((g, i) => <SkillGroup key={i} group={g} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group, idx }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`card skill-group${vis ? " visible" : ""}`} style={{ transitionDelay: `${idx * 80}ms` }}>
      <div className="sg-head">
        <span className="sg-icon">{group.icon}</span>
        <h3 className="sg-title">{group.title}</h3>
      </div>
      <ul className="skill-list">
        {group.items.map((s, i) => (
          <li key={i} className="skill-item">
            <span className="sdot" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Experience ── */
function ExperienceSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section section-alt" data-section="Experience" ref={el => { sectionsRef.current["Experience"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHERE I'VE WORKED" title="Work Experience" />
        <div ref={ref} className={`exp-wrap${vis ? " visible" : ""}`}>
          <div className="card exp-card">
            <div className="exp-head">
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

/* ── Contact ── */
function ContactSection({ sectionsRef, getMailHref, copyEmail, setResumeOpen }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section" data-section="Contact" ref={el => { sectionsRef.current["Contact"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="GET IN TOUCH" title="Let's Connect" desc="Feel free to reach out for opportunities, collaborations, or just to chat about tech!" />
        <div ref={ref} className={`contact-grid${vis ? " visible" : ""}`}>
          <div className="card contact-card">
            <h3 className="cc-title">📧 Email Me</h3>
            <p className="cc-email">shubhangirupnawar5@gmail.com</p>
            <div className="cc-btns">
              <a href={getMailHref()} target="_blank" rel="noreferrer" className="btn-primary">Send Message</a>
              <button className="btn-outline" onClick={copyEmail}>Copy Email</button>
            </div>
          </div>
          <div className="card contact-card">
            <h3 className="cc-title">🔗 Social & Resume</h3>
            <div className="cc-links">
              <a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer" className="cc-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                GitHub — shubhangirupnawar
              </a>
              <a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer" className="cc-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn — Shubhangi Rupnawar
              </a>
              <button className="cc-social" onClick={() => setResumeOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                Resume / CV — View or Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
