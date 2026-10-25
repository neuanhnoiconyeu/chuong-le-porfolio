import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Braces,
  Code2,
  Cpu,
  Github,
  Globe2,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const projects = [
  {
    title: "V-Ask",
    category: "AI / ML",
    tags: ["Python", "Streamlit", "SQLite", "Nebius API", "Nemotron"],
    description:
      "A Vietnamese personal AI assistant using Nebius Token Factory and NVIDIA Nemotron, with conversations stored in SQLite.",
    repository: "",
    demo: "",
    icon: Sparkles,
    visual: "visual-vask",
    label: "PERSONAL AI",
    mark: "v.",
  },
  {
    title: "HokieRoam",
    category: "Web",
    tags: ["React", "Three.js", "AI", "WebGL", "60 FPS"],
    description:
      "An AI-powered 3D Virginia Tech campus map built for VTHacks 14, with smooth 60 FPS in-browser navigation.",
    repository: "",
    demo: "",
    icon: Globe2,
    visual: "visual-roam",
    label: "CAMPUS, REIMAGINED",
    mark: "VT",
  },
  {
    title: "Water Quality Monitor",
    category: "Hardware",
    tags: ["C/C++", "Arduino Uno R3", "DS18B20", "TDS sensor"],
    description:
      "An embedded monitoring system that brings real-time temperature and water quality readings together.",
    repository: "",
    demo: "",
    icon: Cpu,
    visual: "visual-water",
    label: "CONNECTED SENSING",
    mark: "H₂O",
  },
  {
    title: "MagmaJump",
    category: "Software",
    tags: ["Java", "Processing", "OOP", "Game Design"],
    description:
      "A fast-paced 2D platformer with responsive controls, vivid worlds, and a steady 60 FPS game loop.",
    repository: "",
    demo: "",
    icon: Code2,
    visual: "visual-magma",
    label: "A LITTLE MORE DANGER",
    mark: "MJ",
  },
];

const experience = [
  {
    type: "RESEARCH & DEVELOPMENT",
    date: "DBWORKOUT PROJECT",
    role: "Undergraduate Research Assistant / Developer",
    organization: "Virginia Tech · Department of Computer Science",
    details: [
      "Developed DBWorkout, a gamified SQL learning platform used by 200+ students.",
      "Improved load speed and interaction efficiency by 35%; resolved 20+ WCAG accessibility issues.",
    ],
  },
  {
    type: "TEACHING",
    date: "1:1 SUPPORT",
    role: "Academic Tutor",
    organization: "Knack Tutor · Virginia Tech",
    details: [
      "Provided one-on-one computer science tutoring to 15+ students.",
      "Helped 90% of students achieve a B+ or higher through tailored sessions.",
    ],
  },
  {
    type: "PUBLICATION",
    date: "JOURNAL PAPER",
    role: "Research Co-Author",
    organization: "International Journal of Advanced Research in Computer Science",
    details: [
      "Co-authored research on plant leaf and flower classification using a 10,000+ image dataset.",
      "Contributed to a classification model that achieved 92% accuracy.",
    ],
  },
];

const skillGroups = [
  {
    label: "LANGUAGES",
    icon: Braces,
    skills: ["Java", "C++", "Python", "MATLAB"],
  },
  {
    label: "CORE COMPUTER SCIENCE",
    icon: BookOpen,
    skills: ["Data structures", "Algorithms", "OOP", "Discrete math"],
  },
  {
    label: "AI & DATA",
    icon: Sparkles,
    skills: ["LLM integration", "RAG", "Image processing", "Facial recognition"],
  },
  {
    label: "TOOLS & FRAMEWORKS",
    icon: Cpu,
    skills: ["Streamlit", "SQLite", "Git", "GitHub", "Arduino", "Fusion 360"],
  },
];

const filters = ["All work", "AI / ML", "Web", "Hardware", "Software"];
const emailAddress = "chuongleemike@vt.edu";
const profileLinks = {
  github: "https://github.com/neuanhnoiconyeu",
  linkedin: "https://www.linkedin.com/in/chuong-le-990845442/",
};

function Reveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function SocialLinks({ className = "", includeEmail = false }) {
  return (
    <div className={`social-links ${className}`.trim()} aria-label="Social profiles">
      {includeEmail && (
        <a href={`mailto:${emailAddress}`} aria-label="Email Chuong">
          <Mail size={17} />
        </a>
      )}
      <a href={profileLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <Github size={17} />
      </a>
      <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <Linkedin size={17} />
      </a>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [activeFilter, setActiveFilter] = useState("All work");
  const [roleIndex, setRoleIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const roles = ["a CS student @ Virginia Tech", "an AI enthusiast", "a software developer"];
  const visibleProjects =
    activeFilter === "All work"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme remains usable when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));
  const downloadResume = () => window.print();

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Chuong Le home">
          <span className="wordmark-mark">c<span>.</span></span>
          <span className="wordmark-name">CHUONG LE</span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <button className="mobile-theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            <span>Switch to {theme === "dark" ? "light" : "dark"} mode</span>
          </button>
        </nav>
        <div className="header-actions">
          <SocialLinks className="header-social-links" />
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="header-cta" href="#contact">
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-glow" aria-hidden="true" />
        <Reveal className="hero-copy">
          <div className="availability"><span className="availability-dot" /> OPEN TO OPPORTUNITIES</div>
          <p className="hero-greeting">Hey, I&apos;m Chuong <span aria-hidden="true">✳</span></p>
          <h1>
            I build thoughtful
            <br />
            software for <span className="accent-text">what&apos;s next.</span>
          </h1>
          <div className="role-line">
            <span className="role-prefix">Currently</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="role-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="typing-caret" aria-hidden="true" />
          </div>
          <p className="hero-description">
            Computer science student at Virginia Tech, curious about the
            intersection of people, software, and AI.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore projects <ArrowDownRight size={17} />
            </a>
            <button className="button button-secondary" onClick={downloadResume}>
              <ArrowDown size={15} /> Download resume
            </button>
          </div>
          <SocialLinks className="hero-social-links" />
        </Reveal>
        <Reveal className="hero-aside" delay={0.16}>
          <div className="hero-aside-top">
            <span className="eyebrow">BASED IN</span>
            <span className="hero-location"><MapPin size={14} /> Blacksburg, VA</span>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-center"><span>c.</span></div>
            <div className="orbit-spark spark-one">✳</div>
            <div className="orbit-spark spark-two">✦</div>
            <div className="orbit-spark spark-three">·</div>
          </div>
          <div className="hero-aside-bottom">
            <span className="eyebrow">CURRENTLY</span>
            <span className="currently-line"><span className="tiny-status" /> Building &amp; learning</span>
          </div>
        </Reveal>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </section>

      <section className="intro-strip" aria-label="Introduction">
        <div className="strip-inner">
          <span>CURIOUS BY NATURE</span><i>✳</i><span>BUILT WITH INTENTION</span><i>✳</i>
          <span>ALWAYS IN PROGRESS</span><i>✳</i><span>CURIOUS BY NATURE</span>
        </div>
      </section>

      <section className="about-section section-wrap" id="about">
        <Reveal className="about-label">
          <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
          <div className="about-stamp"><span>VT</span><small>HOKIE<br />MADE</small></div>
        </Reveal>
        <Reveal className="about-content" delay={0.08}>
          <h2>
            Part engineer.
            <br />
            Part <span className="accent-text">curious human.</span>
          </h2>
          <p>
            I&apos;m a computer science student at Virginia Tech who loves turning
            interesting questions into useful things. From accessible learning
            tools to AI-powered experiences, I care about building software that
            feels as good to use as it is to make.
          </p>
          <div className="education-card">
            <div className="education-icon"><GraduationCap size={20} /></div>
            <div>
              <span className="eyebrow">THE LONG GAME</span>
              <h3>Virginia Tech</h3>
              <p>B.S. Computer Science <span>·</span> Expected May 2029</p>
              <p className="coursework">Data Structures &amp; Algorithms · OOP · Discrete Math · Linear Algebra</p>
            </div>
            <ArrowUpRight className="education-arrow" size={18} />
          </div>
        </Reveal>
      </section>

      <section className="work-section section-wrap" id="work">
        <Reveal>
          <SectionHeading
            eyebrow="02 / SELECTED WORK"
            title={<>A few things I&apos;ve <span className="accent-text">made.</span></>}
            note="Small experiments, big questions, and everything I learned along the way."
          />
        </Reveal>
        <Reveal className="project-filters" delay={0.05}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-pill ${activeFilter === filter ? "filter-active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </Reveal>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const ProjectIcon = project.icon;
              return (
                <motion.article
                  layout
                  key={project.title}
                  className="project-card"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: index * 0.035 }}
                >
                  <div className={`project-visual ${project.visual}`}>
                    <div className="visual-topline"><span>{project.label}</span><span>0{index + 1} / 04</span></div>
                    <div className="visual-art">
                      <span className="visual-mark">{project.mark}</span>
                      <div className="visual-orb"><ProjectIcon size={29} strokeWidth={1.3} /></div>
                      <div className="visual-detail" aria-hidden="true">
                        <span /><span /><span />
                      </div>
                    </div>
                    <span className="visual-caption">AN EXPLORATION IN {project.category.toUpperCase()}</span>
                  </div>
                  <div className="project-info">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <span className="project-category">{project.category}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-links">
                      {project.repository || project.demo ? (
                        <span className="project-link-options">
                          {project.repository && <a href={project.repository} target="_blank" rel="noreferrer"><Github size={14} /> Source</a>}
                          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ArrowUpRight size={14} /> Live demo</a>}
                        </span>
                      ) : (
                        <span><Github size={14} /> Add repository or demo links to project data</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="experience-section section-wrap" id="experience">
        <Reveal>
          <SectionHeading
            eyebrow="03 / THE JOURNEY SO FAR"
            title={<>Learning by <span className="accent-text">doing.</span></>}
            note="Good work happens with good people. Here are a few chapters."
          />
        </Reveal>
        <div className="timeline">
          {experience.map((item, index) => (
            <Reveal className="timeline-item" key={item.role} delay={index * 0.08}>
              <div className="timeline-date"><span>{item.date}</span></div>
              <div className="timeline-marker"><span /></div>
              <article className="timeline-card">
                <div className="timeline-top"><span className="eyebrow">{item.type}</span><ArrowUpRight size={16} /></div>
                <h3>{item.role}</h3>
                <p className="timeline-org">{item.organization}</p>
                <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="publication-note">
          <div className="publication-icon"><BookOpen size={19} /></div>
          <p><strong>Also in print:</strong> Plant leaf &amp; flower classification research, published in the International Journal of Advanced Research in Computer Science.</p>
          <span>10K+ IMAGES <i>·</i> 92% ACCURACY</span>
        </Reveal>
      </section>

      <section className="skills-section section-wrap" id="skills">
        <Reveal>
          <SectionHeading
            eyebrow="04 / MY TOOLKIT"
            title={<>Tools of the <span className="accent-text">trade.</span></>}
            note="The stack changes. The curiosity doesn't."
          />
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const GroupIcon = group.icon;
            return (
              <Reveal className="skill-group" key={group.label} delay={index * 0.06}>
                <div className="skill-group-heading"><GroupIcon size={16} /><span>{group.label}</span></div>
                <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="awards-section section-wrap">
        <Reveal>
          <div className="awards-card">
            <div className="awards-heading">
              <div className="awards-icon"><Award size={20} /></div>
              <div><p className="eyebrow">A COUPLE OF PROUD MOMENTS</p><h2>Early wins, <span className="accent-text">lasting fuel.</span></h2></div>
            </div>
            <div className="award-list">
              <div className="award-item"><span className="award-year">2023</span><span className="award-name">Honorable Mention <small>Young Informatics Competition · Creative Product</small></span><ArrowUpRight size={15} /></div>
              <div className="award-item"><span className="award-year">2022</span><span className="award-name">First Prize <small>Da Nang City Mathematics Competition</small></span><ArrowUpRight size={15} /></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <Reveal className="contact-copy">
          <p className="eyebrow">05 / YOUR TURN</p>
          <h2>Have a good one
            <br />in <span className="accent-text">mind?</span>
          </h2>
          <p className="contact-description">I&apos;m always up for good conversations, interesting projects, or a thoughtful hello.</p>
          <a className="email-link" href={`mailto:${emailAddress}`}>{emailAddress}<ArrowUpRight size={16} /></a>
          <SocialLinks className="contact-social-links" includeEmail />
          <div className="contact-details">
            <a href="tel:+15402007329"><Phone size={13} /> (540) 200-7329</a>
            <span><MapPin size={13} /> Blacksburg, VA 24061</span>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-heading"><span>DROP A NOTE</span><span className="form-spark">✳</span></div>
            <label htmlFor="name">YOUR NAME</label>
            <input id="name" name="name" autoComplete="name" placeholder="What should I call you?" required />
            <label htmlFor="email">YOUR EMAIL</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            <label htmlFor="message">WHAT&apos;S ON YOUR MIND?</label>
            <textarea id="message" name="message" rows="3" placeholder="A project, a question, or just hello..." required />
            <button className="button button-primary form-submit" type="submit">Send a little note <ArrowRight size={16} /></button>
            <p className="form-hint">This opens your email app with a pre-filled message.</p>
          </form>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">c<span>.</span></span><span className="wordmark-name">CHUONG LE</span></a>
        <p>Made with intention <Heart size={13} /> and a little caffeine.</p>
        <SocialLinks className="footer-social-links" />
        <a className="back-to-top" href="#home">BACK TO TOP <ArrowUpRight size={13} /></a>
        <span className="footer-copy">© {new Date().getFullYear()} CHUONG ANH LE</span>
      </footer>
    </main>
  );
}

export default App;
