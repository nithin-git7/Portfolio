import { useEffect, useState } from 'react';
import { Work } from './Work';
import { Research } from './Research';
import { Personal } from './Personal';
import { ArrowDown, ArrowUpRight, Download, Moon, Sun, Copy, Check } from 'lucide-react';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const email = 'nithinpolavarapu@gmail.com';

function Appearance() {
  const [night, setNight] = useState(false);
  useEffect(() => {
    try {
      const next = localStorage.getItem('portfolio-appearance') === 'night';
      setNight(next);
      document.documentElement.dataset.appearance = next ? 'night' : 'day';
    } catch { /* Readable default when storage is unavailable. */ }
  }, []);

  function toggle() {
    const next = !night;
    setNight(next);
    document.documentElement.dataset.appearance = next ? 'night' : 'day';
    try {
      localStorage.setItem('portfolio-appearance', next ? 'night' : 'day');
    } catch { /* Appearance is an optional preference. */ }
  }

  return (
    <button className="appearance" onClick={toggle} type="button"
      aria-label={night ? 'Switch to daylight' : 'Switch to lamplight'} aria-pressed={night}>
      {night ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

function Contact() {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('Email address copied.');
    } catch {
      setStatus('Copy is unavailable. You can select the email address or use the email link.');
    }
  }

  return (
    <section id="contact" className="contact page-width" aria-labelledby="contact-title">
      <div className="contact-intro">
        <span className="eyebrow">Get in touch</span>
        <h2 id="contact-title">A good conversation<br />is a good start.</h2>
        <p>A role, a collaboration, or a question about something here.<br className="desktop-break" /> I’d be glad to hear from you.</p>
      </div>
      <div className="contact-details">
        <div className="contact-actions">
          <a className="email" href={`mailto:${email}`}>{email}<ArrowUpRight size={19} /></a>
          <button type="button" className="copy-button" onClick={copy} aria-label="Copy email address">
            {status === 'Email address copied.' ? <Check size={17} /> : <Copy size={17} />}
          </button>
        </div>
        <p className="copy-status" role="status">{status}</p>
        <div className="social-links">
          <a href="https://github.com/nithin-git7" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a>
          <a href="https://in.linkedin.com/in/nithin-polavarapu-2291832a2" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
          <a href={asset('Nithin_Polavarapu_JobResume.pdf')} download>Resume <Download size={14} /></a>
        </div>
      </div>
    </section>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="header page-width">
        <a className="wordmark" href="#home" aria-label="Nithin, home">nithin<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <Appearance />
      </header>
      <main id="main-content">
        <section className="welcome page-width" id="home" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <p className="hello">Hello, I’m</p>
            <h1 id="welcome-title">Nithin<br />Polavarapu<span>.</span></h1>
            <p className="welcome-role">Machine learning & AI application developer</p>
            <p className="welcome-text">I like taking models beyond a notebook and into software people can use. My work brings together predictive models, language, and computer vision.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">See selected work <ArrowDown size={16} /></a>
              <a className="resume-link" href={asset('Nithin_Polavarapu_JobResume.pdf')} download>Download resume <Download size={15} /></a>
            </div>
          </div>
          <figure className="portrait">
            <img src={asset('profile.webp')} alt="Nithin Polavarapu" width="950" height="1024" fetchPriority="high" />
            <figcaption>Vijayawada, India</figcaption>
          </figure>
          <aside className="welcome-note">
            <p>Open to entry-level roles in machine learning and AI application development.</p>
            <a href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
          </aside>
        </section>
        <Work />
        <section className="chapter about page-width" id="about" aria-labelledby="about-title">
          <div className="section-heading"><span className="eyebrow">A little background</span><h2 id="about-title">The person behind the work.</h2></div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="about-lead">I’m interested in how a model becomes<br className="desktop-break" /> something useful in the real world.</p>
              <p>I’m based in Vijayawada, India. I studied Computer Science with a focus on AI and ML at Parul University, where my projects gave me room to explore predictive models, language, and computer vision.</p>
              <p>I enjoy working across model evaluation and application development. Selective memory for AI agents is a question I’m continuing to explore.</p>
              <p className="languages">I speak English, Telugu, and beginner German.</p>
              <details className="toolbox"><summary>Tools I work with <span aria-hidden="true">+</span></summary><p>Python, PyTorch, TensorFlow, scikit-learn, Next.js, FastAPI, Git, MongoDB, and MySQL concepts.</p></details>
            </div>
            <div className="background">
              <h3 className="eyebrow">Experience & education</h3>
              <ol>
                <li><time>Jan – Apr 2026</time><h3>Machine Learning Intern</h3><p>CodTech IT Solutions</p></li>
                <li><time>May – Jun 2025</time><h3>Machine Learning Intern</h3><p>Micro Information Technology Services</p></li>
                <li><time>2022 – 2026</time><h3>B.Tech, Computer Science (AI & ML)</h3><p>Parul University · 7.76 CGPA</p></li>
              </ol>
              <details className="credentials"><summary>Courses & certificates <span aria-hidden="true">+</span></summary><p>Machine Learning Specialization<br /><span>Andrew Ng / Coursera, 2025</span></p><p>Google Prompting Essentials<br /><span>Coursera, 2025</span></p></details>
            </div>
          </div>
        </section>
        <Research />
        <Personal />
        <Contact />
      </main>
      <footer className="page-width"><a className="wordmark" href="#home">nithin<span>.</span></a><p>Thanks for spending a little time here.</p><small>© 2026 Nithin Polavarapu</small></footer>
    </>
  );
}
