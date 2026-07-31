import { useState, useEffect, useRef } from "react";
import "./App.css";

const isMobile = () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const getMailHref = () =>
  isMobile()
    ? "mailto:shubhangirupnawar5@gmail.com"
    : "https://mail.google.com/mail/?view=cm&to=shubhangirupnawar5@gmail.com";

const NAV_LINKS = ["Home", "About", "Experience", "Projects", "AI & ML", "Skills", "Contact"];

const THEMES = [
  { name: "Emerald", color: "#7fffb4" },
  { name: "Cyberpunk", color: "#c77dff" },
  { name: "Ocean", color: "#4f8cff" },
  { name: "Crimson", color: "#ff6b6b" }
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Data Automation & Software Development Intern",
    company: "3C Customerization Technologies Pvt. Ltd.",
    duration: "Apr 2026 – Jul 2026",
    bullets: [
      "Developed automated data extraction (web scraping) solutions to collect structured data from multiple websites, designing reusable scripts to handle varying site structures and formats.",
      "Contributed to building a centralized data platform for storing, retrieving, and visualizing extracted data efficiently, supporting reliable downstream analysis and reporting.",
      "Collaborated remotely with the mentor and team through regular progress catch-ups, following professional software delivery practices, version control workflows, and strict data-security and confidentiality guidelines.",
      "Worked independently on end-to-end pipelines — from writing extraction logic to validating and structuring the collected data — while managing timelines under real production constraints."
    ]
  }
];

const PROJECTS = [
  {
    id: 1,
    icon: "👁️",
    title: "Vision AI Analyzer",
    tag: "React · FastAPI · Google Gemini AI",
    desc: "A full-stack web app powered by Google Gemini AI that analyzes uploaded images, extracts detailed content, and generates human-readable AI summaries.",
    bullets: [
      "Designed a FastAPI backend to handle image processing requests and integrate with the Gemini AI API for real-time inference.",
      "Built a clean, responsive React interface for image upload, live analysis feedback, and summary display.",
      "Implemented error handling and response formatting to ensure reliable output across varied image types."
    ],
    github: "https://github.com/shubhangirupnawar/vision-ai-analyzer",
    demo: "https://github.com/shubhangirupnawar/vision-ai-analyzer"
  },
  {
    id: 2,
    icon: "📡",
    title: "Eccho-Tracker",
    tag: "FastAPI · React · Supabase",
    desc: "A full-stack mention-tracking platform with a FastAPI backend, REST APIs, Supabase database, and a responsive React UI for real-time tracking and visualization.",
    bullets: [
      "Implemented database schemas and API endpoints in Supabase to store and query tracked mentions efficiently.",
      "Built dashboard views to visualize tracked data trends for end users in real time.",
      "Optimized API response times and structured data models for scalable read/write operations."
    ],
    github: "https://github.com/shubhangirupnawar/eccho-tracker",
    demo: "https://github.com/shubhangirupnawar/eccho-tracker"
  },
  {
    id: 3,
    icon: "💊",
    title: "AI-Based Medicine Recommendation System",
    tag: "Python · Flask · Machine Learning",
    desc: "A machine learning system that predicts likely diseases from user-input symptoms and recommends appropriate medicines.",
    bullets: [
      "Trained an ML model to predict likely diseases from user-input symptoms and recommend appropriate medicines.",
      "Deployed the trained model through a Flask web application, enabling real-time predictions through a simple web interface.",
      "Handled data preprocessing, feature engineering, and model evaluation to improve prediction accuracy."
    ],
    github: "https://github.com/shubhangirupnawar",
    demo: "https://github.com/shubhangirupnawar"
  },
  {
    id: 4,
    icon: "⛏️",
    title: "Ecom Review Miner",
    tag: "Python · Selenium · NLP · Scraping",
    desc: "Automated mining and sentiment extraction system designed for e-commerce reviews.",
    bullets: [
      "Scrapes dynamic, paginated customer reviews using Python & Selenium",
      "Performs NLP-based sentiment analysis and key phrase extraction",
      "Structures raw review data into databases (MongoDB/JSON)",
    ],
    github: "https://github.com/shubhangirupnawar/bb-fk-scraper",
    demo: "https://github.com/shubhangirupnawar/bb-fk-scraper"
  }
];

const SKILLS = [
  "Java", "Python", "C (Basic)",
  "HTML", "React.js", "Flask", "FastAPI",
  "Web Scraping", "Selenium", "Data Pipelines", "Data Visualization", "Google Sheets API",
  "Machine Learning Basics", "Google Gemini AI", "REST APIs", "OOP", "Data Structures",
  "VS Code", "Google Antigravity", "PyCharm", "JDK", "Git/GitHub", "Supabase"
];

const AI_ML = [
  {
    id: 1,
    icon: "🤖",
    title: "Natural Language Processing",
    desc: "Building NLP pipelines for text classification, sentiment analysis, and key phrase extraction from real-world datasets.",
    tools: ["NLTK", "spaCy", "HuggingFace", "TextBlob", "REST APIs"]
  },
  {
    id: 2,
    icon: "👁️",
    title: "Computer Vision",
    desc: "Developing image analysis tools using deep learning models for object detection, OCR, and visual metadata extraction.",
    tools: ["OpenCV", "Google Gemini AI", "PIL", "TensorFlow"]
  },
  {
    id: 3,
    icon: "🧠",
    title: "Large Language Models & Gen AI",
    desc: "Integrating LLMs like Google Gemini AI and Whisper API into production applications for summarization, transcription, and interactive tools.",
    tools: ["Google Gemini AI", "Whisper API", "LangChain", "FastAPI", "Python"]
  },
  {
    id: 4,
    icon: "📊",
    title: "Data Automation & Scraping",
    desc: "Designing end-to-end data pipelines that scrape, clean, analyze, and visualize structured and unstructured datasets.",
    tools: ["Pandas", "NumPy", "MongoDB", "Selenium", "Google Sheets API"]
  },
];

/* ── Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x = (p.x + p.dx + W) % W;
        p.y = (p.y + p.dy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127,255,180,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(127,255,180,${0.06 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

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
  return <span className="typed-text">{display}<span className="typed-cursor">|</span></span>;
}

/* ── useReveal ── */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVis(true);

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show();
            obs.disconnect();
          }
        },
        { threshold: 0.12 }
      );

      obs.observe(el);
      return () => obs.disconnect();
    }

    show();
  }, []);
  return [ref, vis];
}

/* ── Magnetic wrapper ── */
function Mag({ tag: Tag = "button", children, ...props }) {
  const ref = useRef(null);
  const move = e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <Tag ref={ref} {...props} onMouseMove={move} onMouseLeave={leave}>{children}</Tag>;
}



/* ── AI & ML Card ── */
function AiMlCard({ item, index }) {
  const [ref, vis] = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      className={`project-card${hov ? " hovered" : ""}${vis ? " card-visible" : ""}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="card-spotlight" />
      <div className="project-icon" style={{ fontSize: "2rem" }}>{item.icon}</div>
      <div className="project-body">
        <h3 className="project-title">{item.title}</h3>
        <p className="project-desc">{item.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
          {item.tools.map((tool, i) => (
            <span key={i} style={{
              background: "rgba(127,255,180,0.1)",
              border: "1px solid rgba(127,255,180,0.25)",
              color: "var(--accent)",
              borderRadius: "999px",
              padding: "0.2rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.03em"
            }}>{tool}</span>
          ))}
        </div>
      </div>
      <div className="project-number">0{item.id}</div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ p }) {
  const [ref, vis] = useReveal();
  const [hov, setHov] = useState(false);
  const move = e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div
      ref={ref}
      className={`project-card${hov ? " hovered" : ""}${vis ? " card-visible" : ""}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onMouseMove={move}
      style={{ transitionDelay: `${p.id * 80}ms` }}
    >
      <div className="card-spotlight" />
      <div className="project-icon">{p.icon}</div>
      <div className="project-body">
        <div className="project-tag">{p.tag}</div>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-desc">{p.desc}</p>
        <ul className="project-bullets">{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        
        {/* Project Links */}
        <div className="project-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="project-link-btn" onClick={e => e.stopPropagation()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              <span>Code</span>
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="project-link-btn" onClick={e => e.stopPropagation()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
      <div className="project-number">0{p.id}</div>
    </div>
  );
}

/* ── Skill pill ── */
function SkillPill({ skill, index }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`skill-pill${vis ? " skill-visible" : ""}`} style={{ transitionDelay: `${index * 60}ms` }}>
      <span className="skill-dot" />{skill}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "#7fffb4";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", activeTheme);
    localStorage.setItem("portfolio-theme", activeTheme);
  }, [activeTheme]);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("shubhangirupnawar5@gmail.com");
    setToastMessage("Email copied to clipboard!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  useEffect(() => {
    if (resumeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [resumeOpen]);

  const sectionsRef = useRef({});
  const [heroRef, heroVis] = useReveal();
  const [aboutRef, aboutVis] = useReveal();
  const [experienceRef, experienceVis] = useReveal();
  const [contactRef, contactVis] = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.dataset.section); }), { threshold: 0.3 });
    Object.values(sectionsRef.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = section => { sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="app">
      <div className="grain" />
      <ParticleCanvas />
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />

      {/* Floating Theme Switcher */}
      <div className="floating-theme-bar">
        <span className="theme-bar-icon">🎨</span>
        <div className="theme-dots-container">
          {THEMES.map(t => (
            <button
              key={t.name}
              className={`theme-dot ${activeTheme === t.color ? "active" : ""}`}
              style={{ backgroundColor: t.color }}
              onClick={() => setActiveTheme(t.color)}
              title={`${t.name} Theme`}
            />
          ))}
        </div>
      </div>

      <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => scrollTo("Home")}>shubhangi<span className="accent">.</span></span>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <button className={activeSection === l ? "active" : ""} onClick={() => scrollTo(l)}>
                  {l}{activeSection === l && <span className="nav-active-bar" />}
                </button>
              </li>
            ))}
          </ul>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="section hero" data-section="Home"
        ref={el => { sectionsRef.current["Home"] = el; heroRef.current = el; }}>
        <div className={`hero-meta${heroVis ? " reveal-up" : " pre-reveal"}`} style={{ animationDelay: "0ms" }}>
          <div className="hero-badge"><span className="badge-pulse" />SOFTWARE DEVELOPER | AI & AUTOMATION</div>
        </div>
        <div className={`hero-content${heroVis ? " reveal-up" : " pre-reveal"}`} style={{ animationDelay: "120ms" }}>
          <h1 className="hero-title">Hi, I'm<br /><span className="name-gradient">Shubhangi</span></h1>
          <p className="hero-sub">
            I build <TypedText words={["full stack web apps.", "data automation tools.", "AI integration pipelines.", "web scraping solutions."]} /><br />
            Solving real-world data and business problems.
          </p>
          <div className="hero-cta">
            <Mag className="btn-primary" onClick={() => scrollTo("Projects")}>View AI Projects</Mag>
            <Mag className="btn-ghost" onClick={() => scrollTo("Contact")}>Get in Touch</Mag>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orbit-glow" />
          <div className="orbit-ring r1">
            {["React", "Scraping", "NLP"].map((t, i) => <span key={i} className="orbit-tag" style={{ "--i": i }}>{t}</span>)}
          </div>
          <div className="orbit-ring r2">
            {["Python", "Selenium", "MongoDB", "FastAPI"].map((t, i) => <span key={i} className="orbit-tag" style={{ "--i": i }}>{t}</span>)}
          </div>
          <div className="core-dot"><div className="core-ring" /><div className="core-ring core-ring-2" /></div>
        </div>
        <div className="scroll-hint">scroll ↓</div>
      </section>

      {/* About */}
      <section className="section about" data-section="About"
        ref={el => { sectionsRef.current["About"] = el; aboutRef.current = el; }}>
        <div className={`section-label${aboutVis ? " reveal-left" : " pre-reveal"}`}>01 — About</div>
        <div className="about-grid">
          <div className={`about-left${aboutVis ? " reveal-up" : " pre-reveal"}`} style={{ animationDelay: "80ms" }}>
            <h2 className="section-title">About Me</h2>
            <p className="about-text">I'm a Software Developer specializing in AI & Automation based in India. I focus on automated data extraction, web scraping, and AI-integrated applications.</p>
            <p className="about-text">I build robust applications that automate data extraction pipelines, design FastAPI/Flask backends, and integrate generative AI APIs (Google Gemini AI) to solve real business needs.</p>
            <p className="about-text">My expertise spans React.js for modern web interfaces, Python for backend development, database integration (Supabase, MongoDB), and custom automated scraping scripts.</p>
            <div style={{ marginTop: "1.5rem" }}>
              <Mag className="btn-primary" onClick={() => setResumeOpen(true)}>View Resume</Mag>
            </div>
          </div>
          <div className={`about-right${aboutVis ? " reveal-up" : " pre-reveal"}`} style={{ animationDelay: "180ms" }}>
            <div className="spec-card glass-card">
              <div className="spec-title">I specialize in</div>
              <ul className="spec-list">
                <li>Automating web data extraction and web scraping</li>
                <li>Developing responsive and interactive user interfaces</li>
                <li>Building efficient REST APIs with Python/FastAPI/Flask</li>
                <li>Integrating AI features (Gemini, Whisper) into web apps</li>
              </ul>
            </div>
            <div className="enjoy-card glass-card">
              <div className="enjoy-title">💡 What I Enjoy</div>
              <p>Building custom web scrapers, data pipelines, and exploring how AI tools like Google Gemini and Whisper can enrich applications. I love solving scaling challenges in data scraping and building sleek user experiences.</p>
              <p style={{ marginTop: "0.75rem" }}>Focused on engineering clean, scalable, and responsive code from backend to frontend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section experience" data-section="Experience"
        ref={el => { sectionsRef.current["Experience"] = el; experienceRef.current = el; }}>
        <div className={`section-label${experienceVis ? " reveal-left" : " pre-reveal"}`}>02 — Experience</div>
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-timeline">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.id}
              className={`experience-item glass-card${experienceVis ? " reveal-up" : " pre-reveal"}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>
                <span className="experience-duration">{exp.duration}</span>
              </div>
              <ul className="experience-bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section projects" data-section="Projects" ref={el => sectionsRef.current["Projects"] = el}>
        <div className="section-label">03 — Projects</div>
        <h2 className="section-title">Selected Work</h2>
        <div className="projects-grid">{PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}</div>
      </section>

      {/* AI & ML */}
      <section className="section projects" data-section="AI & ML" ref={el => sectionsRef.current["AI & ML"] = el}>
        <div className="section-label">04 — AI &amp; Machine Learning</div>
        <h2 className="section-title">AI &amp; ML Expertise</h2>
        <div className="projects-grid">{AI_ML.map((item, i) => <AiMlCard key={item.id} item={item} index={i} />)}</div>
      </section>

      {/* Skills */}
      <section className="section skills" data-section="Skills" ref={el => sectionsRef.current["Skills"] = el}>
        <div className="section-label">05 — Skills</div>
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-wrap">{SKILLS.map((s, i) => <SkillPill key={i} skill={s} index={i} />)}</div>
      </section>

      {/* Contact */}
      <section className="section contact" data-section="Contact"
        ref={el => { sectionsRef.current["Contact"] = el; contactRef.current = el; }}>
        <div className="section-label">06 — Contact</div>
        <div className={`contact-inner${contactVis ? " reveal-up" : " pre-reveal"}`}>
          <h2 className="section-title contact-title">Let's Connect</h2>
          <p className="contact-sub">Feel free to connect with me for opportunities, collaborations, or just to discuss AI and tech!</p>
          <div className="contact-action-wrapper">
            <Mag tag="a" className="btn-primary contact-btn" href={getMailHref()} target="_blank" rel="noreferrer">Say Hello →</Mag>
            <button className="btn-ghost contact-copy-btn" onClick={copyEmail}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy Email</span>
            </button>
          </div>
          <div className="connect-socials">
            <Mag tag="a" className="connect-social-btn" href="https://github.com/shubhangirupnawar" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              GitHub
            </Mag>
            <Mag tag="a" className="connect-social-btn" href="https://www.linkedin.com/in/shubhangi-rupnawar" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </Mag>
            <Mag tag="a" className="connect-social-btn" href={getMailHref()} target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
              Mail
            </Mag>
          </div>
        </div>
      </section>

      <footer className="footer"><span>© Shubhangi Rupnawar • SOFTWARE DEVELOPER | AI & AUTOMATION</span></footer>

      {/* Copy notification toast */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {resumeOpen && (
        <div className="modal-overlay" onClick={() => setResumeOpen(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Resume</h3>
              <div className="modal-actions">
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="btn-primary modal-download-btn">Download PDF</a>
                <button className="modal-close-btn" onClick={() => setResumeOpen(false)}>&times;</button>
              </div>
            </div>
            <div className="modal-body">
              <iframe src={`${import.meta.env.BASE_URL}resume.pdf#toolbar=0&navpanes=0&scrollbar=0`} title="Resume Preview" className="resume-iframe" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
