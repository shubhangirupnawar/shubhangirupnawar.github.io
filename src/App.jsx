import { useState, useEffect, useRef } from "react";
import "./App.css";

const getMailHref = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "mailto:shubhangirupnawar5@gmail.com"
    : "https://mail.google.com/mail/?view=cm&to=shubhangirupnawar5@gmail.com";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    icon: "📡",
    title: "ECCHO Social Follower Tracker",
    tag: ["FastAPI", "React", "Supabase", "Gemini AI"],
    desc: "Automated social media follower tracking platform with AI-powered extraction, brand URL validation, and interactive analytics reporting.",
    fragmentTitle: "Live Analytics Fragment",
    fragmentMetric: "14,250 Followers (+12.4%)",
    bullets: [
      "AI-Powered Scraping: Uses Google Gemini AI for high-accuracy numeric follower extraction from dynamic social media pages.",
      "Brand URL Validation: AI verifies whether social URLs belong to the target brand prior to scraping to ensure data accuracy.",
      "Reporting & Analytics: Generates monthly aggregate snapshots, 15th & End-of-month snapshots, comparison dashboards, and Excel exports.",
    ],
    github: "https://github.com/shubhangirupnawar/eccho-tracker",
    demo: "https://github.com/shubhangirupnawar/eccho-tracker",
  },
  {
    id: 2,
    icon: "💊",
    title: "AI-Based Medicine Recommendation",
    tag: ["Python", "Flask", "Machine Learning"],
    desc: "A machine learning system that predicts likely diseases from user-input symptoms and recommends appropriate medicines.",
    fragmentTitle: "ML Prediction Fragment",
    fragmentMetric: "Disease Risk: Low • Confidence: 98.4%",
    bullets: [
      "Trained an ML classification model to predict diseases from user-input symptoms.",
      "Deployed through a Flask web application, enabling real-time predictions via a simple web interface.",
      "Handled data preprocessing, feature engineering, and model evaluation to improve accuracy.",
    ],
    github: "https://github.com/shubhangirupnawar",
    demo: "https://github.com/shubhangirupnawar",
  },
  {
    id: 3,
    icon: "⛏️",
    title: "Ecom Review Miner",
    tag: ["Python", "Selenium", "NLP"],
    desc: "Automated mining and sentiment extraction system designed for e-commerce reviews with structured data pipelines.",
    fragmentTitle: "Scraper Status Fragment",
    fragmentMetric: "5,400 Reviews Mined • Sentiment: 91% Positive",
    bullets: [
      "Scrapes dynamic, paginated customer reviews using Python & Selenium.",
      "Performs NLP-based sentiment analysis and key phrase extraction.",
      "Structures raw review data into databases (MongoDB / JSON).",
    ],
    github: "https://github.com/shubhangirupnawar/bb-fk-scraper",
    demo: "https://github.com/shubhangirupnawar/bb-fk-scraper",
  },
];

const SKILLS_GROUPS = [
  {
    title: "Languages",
    icon: "💻",
    items: ["Python", "JavaScript (ES6+)", "HTML5 / CSS3", "SQL"],
  },
  {
    title: "Frameworks & Web",
    icon: "⚙️",
    items: ["React.js", "FastAPI", "Flask", "Selenium", "REST APIs"],
  },
  {
    title: "AI & Data Pipelines",
    icon: "🤖",
    items: ["Google Gemini AI", "Machine Learning", "NLP", "Supabase", "MongoDB"],
  },
  {
    title: "Developer Tools",
    icon: "🛠️",
    items: ["Git / GitHub", "VS Code", "PyCharm", "Google Sheets API", "OOP"],
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

/* ── Main App Component ── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [activeSegment, setActiveSegment] = useState("Overview");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
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
      {/* ── TOP NAV ── */}
      <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="nav-brand-logo">SR</div>
            <span>shubhangi.com</span>
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

          <div className="nav-actions">
            {/* Signature nav-pill-group */}
            <div className="nav-pill-group">
              {["Overview", "Developer"].map(seg => (
                <button
                  key={seg}
                  className={`nav-pill-btn${activeSegment === seg ? " active" : ""}`}
                  onClick={() => setActiveSegment(seg)}
                >
                  {seg}
                </button>
              ))}
            </div>

            <button className="button-primary" onClick={() => scrollTo("Contact")}>
              Get in Touch
            </button>

            <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO BAND ── */}
      <section className="hero-band" ref={heroRef}>
        <div className={`hero-inner${heroVis ? " visible" : ""}`}>
          {/* Left Column */}
          <div className="hero-left">
            <div className="badge-pill">
              <span className="badge-dot" /> Available for 2026 Opportunities
            </div>
            <h1 className="hero-display">
              The better way to schedule & build AI apps.
            </h1>
            <p className="hero-subhead">
              Hi, I'm <strong>Shubhangi Rupnawar</strong> —{" "}
              <TypedText words={["Software Developer", "AI & Automation Engineer", "Data Automation Specialist", "Python Developer"]} />
              <br />
              Final-year B.Tech CSE student (<strong>2026 Passout</strong>). Building robust web scraping pipelines, FastAPI backends, and AI integrations.
            </p>

            <div className="hero-cta-group">
              <button className="button-primary" onClick={() => scrollTo("Contact")}>
                Book a Meeting / Contact
              </button>
              <button className="button-secondary" onClick={() => scrollTo("Projects")}>
                View Projects
              </button>
              <button className="button-secondary" onClick={() => setResumeOpen(true)}>
                ⬇ Download CV
              </button>
            </div>
          </div>

          {/* Right Column (Hero App Mockup Card - Cal.com Product UI Fragment) */}
          <div className="hero-app-mockup-card">
            <div className="mockup-header">
              <div className="mockup-user">
                <div className="avatar-circle">SR</div>
                <div className="mockup-user-info">
                  <h4>Shubhangi Rupnawar</h4>
                  <p>Software Developer & AI Engineer (2026 Passout)</p>
                </div>
              </div>
              <span className="badge-pill" style={{ margin: 0 }}>15 min</span>
            </div>

            <div className="mockup-body">
              <div className="mockup-section-title">Select Available Time Slot</div>
              <div className="slots-grid">
                {["10:00 AM", "02:30 PM", "04:00 PM"].map(slot => (
                  <button
                    key={slot}
                    className={`slot-btn${selectedSlot === slot ? " selected" : ""}`}
                    onClick={() => { setSelectedSlot(slot); setBookingConfirmed(false); }}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="booking-confirm-box">
                <div className="confirm-text">
                  {bookingConfirmed ? "✅ Slot Reserved!" : `Confirm slot for ${selectedSlot}`}
                </div>
                <button
                  className="button-primary confirm-btn"
                  onClick={() => {
                    setBookingConfirmed(true);
                    setToastMsg(`Meeting slot reserved for ${selectedSlot}!`);
                    setTimeout(() => setToastMsg(""), 2500);
                  }}
                >
                  {bookingConfirmed ? "Confirmed" : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRIC BAND ── */}
      <div className="metric-band">
        <div className="metric-grid">
          <div className="metric-card">
            <div className="metric-value">1+</div>
            <div className="metric-label">Industry Internship</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">3+</div>
            <div className="metric-label">Featured Projects</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">10+</div>
            <div className="metric-label">Tech Stack Tools</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">2026</div>
            <div className="metric-label">Passout Batch</div>
          </div>
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <AboutSection sectionsRef={sectionsRef} />

      {/* ── WORK EXPERIENCE (FEATURED DARK CARD) ── */}
      <ExperienceSection sectionsRef={sectionsRef} />

      {/* ── PROJECTS SECTION ── */}
      <ProjectsSection sectionsRef={sectionsRef} />

      {/* ── SKILLS SECTION ── */}
      <SkillsSection sectionsRef={sectionsRef} />

      {/* ── CONTACT SECTION ── */}
      <ContactSection sectionsRef={sectionsRef} getMailHref={getMailHref} copyEmail={copyEmail} setResumeOpen={setResumeOpen} />

      {/* ── PRE-FOOTER CTA BAND ── */}
      <div className="cta-band-light">
        <h2>Smarter, simpler AI & data automation.</h2>
        <p>Looking to build high-accuracy scraping pipelines, REST APIs, or AI applications? Let me help you ship.</p>
        <button className="button-primary" onClick={() => scrollTo("Contact")}>
          Get in Touch
        </button>
      </div>

      {/* ── DARK NAVY FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>shubhangi.com</h3>
            <p>Software Developer specializing in AI & Automation. Final-year B.Tech CSE student (2026 Passout).</p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {NAV_LINKS.map(l => (
                <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Projects</h4>
            <ul>
              <li><a href="https://github.com/shubhangirupnawar/eccho-tracker" target="_blank" rel="noreferrer">ECCHO Tracker</a></li>
              <li><a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer">AI Medicine Rec</a></li>
              <li><a href="https://github.com/shubhangirupnawar/bb-fk-scraper" target="_blank" rel="noreferrer">Ecom Review Miner</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href={getMailHref()} target="_blank" rel="noreferrer">Email</a></li>
              <li><a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Shubhangi Rupnawar &nbsp;·&nbsp; SOFTWARE DEVELOPER | AI & AUTOMATION &nbsp;·&nbsp; 2026 PASSOUT</span>
          <span>Designed with Cal.com System Principles</span>
        </div>
      </footer>

      {/* ── RESUME MODAL ── */}
      {resumeOpen && (
        <div className="modal-overlay" onClick={() => setResumeOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Resume — Shubhangi Rupnawar (2026 Passout)</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="button-primary" style={{ height: "32px", fontSize: "13px" }}>⬇ Download</a>
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

/* ── Section Header Component ── */
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

/* ── About Section Component ── */
function AboutSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section" data-section="About" ref={el => { sectionsRef.current["About"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHO I AM" title="Engineered with precision, built for scale." />
        <div ref={ref} className="about-card-grid">
          <div className="feature-card">
            <h3 className="feature-title">Background & Education</h3>
            <p className="feature-body">
              I'm a <strong>Software Developer specializing in AI & Automation</strong> based in Maharashtra, India.
              Final-year B.Tech CSE student (<strong>2026 Passout</strong>) with hands-on internship experience in automated data extraction, web scraping, and AI-integrated applications.
            </p>
            <div className="tags-row">
              <span className="tag-pill">2026 Passout</span>
              <span className="tag-pill">B.Tech CSE</span>
              <span className="tag-pill">Maharashtra, India</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Technical Expertise</h3>
            <p className="feature-body">
              I build robust applications that automate data extraction pipelines, design FastAPI/Flask backends, and integrate generative AI APIs like <strong>Google Gemini AI</strong> to solve real business needs.
            </p>
            <div className="tags-row">
              <span className="tag-pill">Python</span>
              <span className="tag-pill">React.js</span>
              <span className="tag-pill">FastAPI</span>
              <span className="tag-pill">Google Gemini AI</span>
              <span className="tag-pill">Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience Section (Featured Dark Card) ── */
function ExperienceSection({ sectionsRef }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section section-alt" data-section="Experience" ref={el => { sectionsRef.current["Experience"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHERE I'VE WORKED" title="Work Experience" />
        <div ref={ref} className={`featured-dark-card${vis ? " visible" : ""}`}>
          <div className="dark-card-head">
            <div>
              <h3 className="dark-role">Data Automation & Software Development Intern</h3>
              <div className="dark-company">3C Customerization Technologies Pvt. Ltd.</div>
            </div>
            <span className="dark-badge">Apr 2026 – Jul 2026</span>
          </div>
          <ul className="dark-bullets">
            <li>Developed automated data extraction (web scraping) solutions to collect structured data from multiple websites, designing reusable scripts to handle varying site structures.</li>
            <li>Contributed to building a centralized data platform for storing, retrieving, and visualizing extracted data efficiently, supporting reliable downstream analysis and reporting.</li>
            <li>Collaborated remotely with the mentor and team through regular progress catch-ups, following professional software delivery practices, version control workflows, and strict data-security guidelines.</li>
            <li>Worked independently on end-to-end pipelines — from writing extraction logic to validating and structuring data — while managing timelines under real production constraints.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Projects Section ── */
function ProjectsSection({ sectionsRef }) {
  return (
    <section className="section" data-section="Projects" ref={el => { sectionsRef.current["Projects"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="WHAT I'VE BUILT" title="Featured Projects" desc="Real-world applications built with modern technologies and AI integrations." />
        <div className="projects-grid">
          {PROJECTS.map(p => <ProductMockupCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProductMockupCard({ p }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`product-mockup-card${vis ? " visible" : ""}`}>
      {/* Product UI Fragment embedded directly inside card */}
      <div className="card-product-fragment">
        <div className="fragment-header">
          <span className="fragment-title">{p.fragmentTitle}</span>
          <span className="fragment-badge">LIVE</span>
        </div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{p.fragmentMetric}</div>
      </div>

      <div>
        <div className="tags-row" style={{ marginTop: 0, marginBottom: "12px" }}>
          {p.tag.map((t, i) => <span key={i} className="tag-pill">{t}</span>)}
        </div>
        <h3 className="project-title-text">{p.title}</h3>
        <p className="project-desc-text">{p.desc}</p>
      </div>

      <div className="project-links">
        <a href={p.github} target="_blank" rel="noreferrer" className="project-link-btn">
          View Code →
        </a>
        <a href={p.demo} target="_blank" rel="noreferrer" className="project-link-btn">
          Live Demo ↗
        </a>
      </div>
    </div>
  );
}

/* ── Skills Section ── */
function SkillsSection({ sectionsRef }) {
  return (
    <section className="section section-alt" data-section="Skills" ref={el => { sectionsRef.current["Skills"] = el; }}>
      <div className="section-inner">
        <SectionHeader label="TECH STACK" title="Skills & Technologies" desc="Technologies and tools I use to build and ship products." />
        <div className="skills-grid">
          {SKILLS_GROUPS.map((g, i) => (
            <div key={i} className="skill-card">
              <div className="skill-card-head">
                <span>{g.icon}</span>
                <span>{g.title}</span>
              </div>
              <div className="skill-card-list">
                {g.items.map((item, idx) => (
                  <div key={idx} className="skill-card-item">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ── */
function ContactSection({ sectionsRef, getMailHref, copyEmail, setResumeOpen }) {
  const [ref, vis] = useReveal();
  return (
    <section className="section" data-section="Contact" ref={el => { sectionsRef.current["Contact"] = el; }}>
      <div className="section-inner">
        <SectionHeader
          label="GET IN TOUCH"
          title="Let's Connect"
          desc="Looking to build AI-powered tools or automate your data workflows? Let's discuss how I can help."
        />
        <div ref={ref} className={`contact-grid${vis ? " visible" : ""}`}>
          <a href={getMailHref()} target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon-box">✉️</div>
            <div>
              <div className="contact-info-label">EMAIL</div>
              <div className="contact-info-val">shubhangirupnawar5@gmail.com</div>
            </div>
          </a>

          <a href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon-box">💻</div>
            <div>
              <div className="contact-info-label">GITHUB</div>
              <div className="contact-info-val">github.com/shubhangirupnawar</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/shubhangi-rupnawar-17a5443a3" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon-box">🔗</div>
            <div>
              <div className="contact-info-label">LINKEDIN</div>
              <div className="contact-info-val">linkedin.com/in/shubhangi-rupnawar</div>
            </div>
          </a>

          <div className="contact-card">
            <div className="contact-icon-box">📍</div>
            <div>
              <div className="contact-info-label">LOCATION</div>
              <div className="contact-info-val">Maharashtra, India (2026 Passout)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
