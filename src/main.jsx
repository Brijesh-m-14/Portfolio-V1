import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const profile = {
  name: "Brijesh M",
  location: "Coimbatore, Tamil Nadu",
  phone: "+91 93631 41857",
  phoneLink: "tel:+919363141857",
  email: "briju898@gmail.com",
  github: "https://github.com/Brijesh-M",
  linkedin: "https://www.linkedin.com/in/brijesh-m-4b428b226/",
  resume: "/assets/Brijesh_M_Clean_Resume.pdf",
};

const experience = [
  {
    period: "Nov 2025 - Present",
    role: "Python Developer",
    company: "Sirpi Products and Services",
    type: "AI Product Engineering",
    points: [
      "Developed an AI-driven OCR pipeline to automate and standardize text extraction from diverse document sources.",
      "Implemented vision-language models and LLMs to improve extraction accuracy and semantic understanding.",
      "Architected backend solutions to integrate AI models into production environments for document intelligence.",
      "Collaborated on architecture design and technical documentation for AI-based document products.",
    ],
  },
  {
    period: "Sep 2022 - Nov 2022",
    role: "Web Developer Intern",
    company: "Verzeo",
    type: "Backend Web Development",
    points: [
      "Built and managed server-side APIs using Node.js and MongoDB to support web application functionality.",
      "Optimized database schemas and performed CRUD operations to improve system response performance.",
      "Integrated RESTful APIs and collaborated in agile development sprints to enhance system features.",
    ],
  },
];

const projects = [
  {
    title: "Smart Policing System",
    subtitle: "Real-time suspect profiling and predictive crime monitoring.",
    description:
      "An intelligent crime monitoring platform using Python, TensorFlow, and OpenCV to support suspect profiling, data collection, and predictive analysis workflows.",
    impact: ["Real-time computer vision", "Predictive response workflows", "Structured suspect intelligence"],
    tech: ["Python", "TensorFlow", "OpenCV", "Predictive Analytics"],
    metric: "01",
  },
  {
    title: "Inventory and Supply Chain Management",
    subtitle: "Pharmaceutical stock visibility and shortage reduction.",
    description:
      "A Flask-based web platform for inventory tracking, real-time stock monitoring, and analytics-led distribution visibility across pharmaceutical operations.",
    impact: ["Live inventory tracking", "Distribution visibility", "Reduced shortage risk"],
    tech: ["Flask", "SQL", "Analytics", "Web Platform"],
    metric: "02",
  },
];

const coreSkills = [
  { name: "Python", category: "Programming", level: 96 },
  { name: "SQL", category: "Programming", level: 86 },
  { name: "OCR", category: "AI / ML", level: 92 },
  { name: "LLM Integration", category: "AI / ML", level: 88 },
  { name: "Vision-Language Models", category: "AI / ML", level: 86 },
  { name: "TensorFlow", category: "AI / ML", level: 82 },
  { name: "OpenCV", category: "AI / ML", level: 88 },
  { name: "Flask", category: "Backend & Tools", level: 88 },
  { name: "Django", category: "Backend & Tools", level: 82 },
  { name: "MongoDB", category: "Backend & Tools", level: 78 },
  { name: "AWS", category: "Backend & Tools", level: 76 },
  { name: "Git", category: "Backend & Tools", level: 86 },
];

const otherSkills = [
  { name: "JavaScript", category: "Web Development" },
  { name: "HTML", category: "Web Development" },
  { name: "CSS", category: "Web Development" },
  { name: "Node.js", category: "Backend Support" },
  { name: "Figma", category: "Design Support" },
  { name: "UiPath RPA", category: "Automation" },
];

const education = [
  {
    title: "B.Tech in Artificial Intelligence and Data Science",
    institution: "KGISL Institute of Technology",
    period: "2021 - 2025",
    score: "CGPA 8.31",
  },
  {
    title: "HSC / SSLC",
    institution: "BVM Global School",
    period: "2019 - 2021",
    score: "90%",
  },
];

const achievements = [
  "Architecting Solutions on AWS - AWS, Feb 2024",
  "Deep Learning and Reinforcement Learning - IBM, Oct 2023",
  "Shortlisted for Round 2 in Intel OneAPI Hackathon, Jan 2024",
  "Shortlisted for Round 3 in National Tomato Grand Challenge, Nov 2023",
];

const highlights = [
  { value: "18+", label: "Core technologies" },
  { value: "2", label: "Production roles" },
  { value: "4", label: "Certifications & awards" },
];

const navItems = ["Experience", "Projects", "Skills", "Education", "Contact"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-lock");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = ["home", ...navItems.map((item) => item.toLowerCase())];
    const observer = new IntersectionObserver(
      (entries) => {
        if (menuOpen) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [menuOpen]);

  return (
    <>
      <div
        className="cursor-glow"
        style={{ left: cursor.x, top: cursor.y, opacity: cursor.visible ? 1 : 0 }}
        aria-hidden="true"
      />

      <header className={`site-header ${menuOpen ? "is-open" : ""}`}>
        <a
          className="brand"
          href="#home"
          aria-label="Brijesh M home"
          onClick={() => {
            setActiveSection("home");
            setMenuOpen(false);
          }}
        >
          <span>BM</span>
          <strong>Brijesh M</strong>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              className={activeSection === item.toLowerCase() ? "is-active" : ""}
              key={item}
              href={`#${item.toLowerCase()}`}
              aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
              onClick={() => {
                setActiveSection(item.toLowerCase());
                setMenuOpen(false);
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      <main id="home">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

    </>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap">
      <div className="hero-media" aria-hidden="true">
        <div className="scanline" />
        <div className="document-stack">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="hero-copy reveal">
        <p className="kicker">AI Document Intelligence / Backend Architecture</p>
        <h1 className="hero-name">
          <span className="name-line">Brijesh M</span>
          <span className="role-line">Python Developer</span>
        </h1>
        <p className="hero-credential">
          AI and backend developer specializing in OCR, LLM workflows, and document automation.
        </p>
        <p className="hero-lead">
          I build OCR pipelines, vision-language workflows, and production-ready AI systems that convert messy
          documents and visual data into structured intelligence.
        </p>
        <div className="hero-proof" aria-label="Portfolio highlights">
          <span>Document AI</span>
          <span>OCR Pipelines</span>
          <span>LLM Extraction</span>
          <span>Backend APIs</span>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View Projects
          </a>
          <a className="btn btn-secondary" href={profile.resume} target="_blank" rel="noreferrer">
            Open Resume
          </a>
          <a className="btn btn-secondary" href="#contact">
            Contact Me
          </a>
        </div>
        <div className="hero-stats" aria-label="Portfolio metrics">
          {highlights.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="command-deck reveal">
        <div className="deck-header">
          <span className="pulse" />
          <span>AI Document Pipeline</span>
        </div>
        <div className="workflow-panel" aria-label="Document intelligence workflow">
          <div className="doc-preview">
            <div className="doc-toolbar">
              <span />
              <span />
              <span />
            </div>
            <div className="doc-body">
              <span className="doc-line wide" />
              <span className="doc-line" />
              <span className="doc-line short" />
              <div className="scan-box">
                <span>OCR Zone</span>
              </div>
              <span className="doc-line wide" />
              <span className="doc-line" />
            </div>
          </div>
          <div className="pipeline-steps">
            {[
              ["01", "Document Intake", "PDFs, scans, handwritten forms"],
              ["02", "OCR Extraction", "Text regions, tables, entities"],
              ["03", "LLM Reasoning", "Structured fields and confidence"],
              ["04", "API Delivery", "Validated JSON for products"],
            ].map(([number, title, copy]) => (
              <div className="pipeline-step" key={title}>
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="deck-grid">
          <InfoTile label="Role" value="Python Developer" />
          <InfoTile label="Focus" value="Document Intelligence" />
          <InfoTile label="Location" value={profile.location} />
          <InfoTile label="Stack" value="Python / AI / Backend" />
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="info-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function About() {
  return (
    <section className="section-wrap intro reveal">
      <div className="intro-heading">
        <p className="kicker">Professional Summary</p>
        <h2>AI-focused developer shipping intelligent, maintainable systems.</h2>
      </div>
      <div className="summary-panel">
        <p>
          I am a Python Developer focused on Artificial Intelligence and Data Science, with hands-on experience
          building AI-driven OCR pipelines, vision-language workflows, LLM integrations, backend architecture, and
          full-stack tools for data-heavy products.
        </p>
        <p>
          My strength is turning complex model workflows into usable software: structured extraction, reliable APIs,
          clear documentation, and product experiences that help teams move from messy real-world inputs to actionable
          intelligence.
        </p>
        <div className="summary-grid">
          <span>Document Intelligence</span>
          <span>Python Automation</span>
          <span>Model Integration</span>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section-wrap" id="experience">
      <SectionTitle kicker="Experience" title="A timeline built around production AI and backend systems." />
      <div className="experience-lane">
        {experience.map((item) => (
          <article className="experience-card reveal" key={item.company}>
            <div className="experience-date">{item.period}</div>
            <div className="experience-body">
              <div className="card-heading">
                <span>{item.type}</span>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-wrap" id="projects">
      <SectionTitle kicker="Projects" title="Project work shaped for real-world signal, speed, and visibility." />
      <div className="project-showcase">
        {projects.map((project) => (
          <article className="project-card reveal" key={project.title}>
            <div className="project-number">{project.metric}</div>
            <div className="project-content">
              <p className="project-subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="impact-grid">
                {project.impact.map((impact) => (
                  <span key={impact}>{impact}</span>
                ))}
              </div>
              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <a className="project-link" href="#contact">
                Discuss similar work
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-wrap" id="skills">
      <SectionTitle kicker="Skills" title="Focused skills for AI products, document intelligence, and backend work." />
      <div className="skill-board reveal">
        {coreSkills.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <div>
              <span>{skill.category}</span>
              <h3>{skill.name}</h3>
            </div>
            <div className="skill-meter" aria-hidden="true">
              <span style={{ width: `${skill.level}%` }} />
            </div>
          </article>
        ))}
      </div>
      <details className="other-skills reveal">
        <summary>Other supporting skills</summary>
        <div className="other-skill-list">
          {otherSkills.map((skill) => (
            <span key={skill.name}>
              <strong>{skill.name}</strong>
              {skill.category}
            </span>
          ))}
        </div>
      </details>
    </section>
  );
}

function Education() {
  return (
    <section className="section-wrap credential-section" id="education">
      <div className="credential-card reveal">
        <p className="kicker">Education</p>
        <h2>Academic Foundation</h2>
        {education.map((item) => (
          <article className="education-row" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
            </div>
            <div>
              <span>{item.period}</span>
              <strong>{item.score}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="credential-card reveal">
        <p className="kicker">Certifications & Awards</p>
        <h2>Recognition</h2>
        <div className="achievement-list">
          {achievements.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section-wrap contact-section" id="contact">
      <div className="contact-card reveal">
        <div className="contact-copy">
          <p className="kicker">Contact</p>
          <h2>Let's build useful AI systems from messy real-world data.</h2>
          <p>
            Open to Python development, AI engineering, OCR, document intelligence, backend systems, and full-stack
            product work.
          </p>
        </div>
        <div className="contact-details" aria-label="Contact details">
          <a href={`mailto:${profile.email}`}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a href={profile.phoneLink}>
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <strong>linkedin.com/in/Brijesh-M</strong>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>github.com/Brijesh-M</strong>
          </a>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            Email Me
          </a>
          <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn-secondary" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }) {
  return (
    <div className="section-title reveal">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
