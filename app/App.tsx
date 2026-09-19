import { useEffect, useState } from 'react';
import { Work, EngineeringNotes } from './Work';
import { ArrowUpRight, Download, Moon, Sun, Copy, Check } from 'lucide-react';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const email = 'nithinpolavarapu@gmail.com';
const decisions = [
  { label: 'Retain', title: 'Keep what will matter again.', example: '“I am learning machine learning.”', explanation: 'A lasting goal can help with the next task. Keep it while it remains relevant.' },
  { label: 'Retrieve', title: 'Bring back what this task needs.', example: '“Which topic should I study next?”', explanation: 'Recall the topics already covered and the learning goal, instead of loading every earlier conversation.' },
  { label: 'Let go', title: 'Make room by releasing stale context.', example: '“The deadline I saved has changed.”', explanation: 'An outdated date should be replaced or flagged, rather than quietly influencing a new decision.' },
];

function Appearance() {
  const [night, setNight] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-appearance');
      const next = saved === 'night';
      setNight(next);
      document.documentElement.dataset.appearance = next ? 'night' : 'day';
    } catch { /* The default remains readable when storage is unavailable. */ }
  }, []);
  function toggle() {
    const next = !night;
    setNight(next);
    document.documentElement.dataset.appearance = next ? 'night' : 'day';
    try { localStorage.setItem('portfolio-appearance', next ? 'night' : 'day'); } catch { /* Optional preference. */ }
  }
  return <button className="appearance" onClick={toggle} type="button" aria-label={night ? 'Switch to daylight' : 'Switch to lamplight'} aria-pressed={night}>{night ? <Sun size={17} /> : <Moon size={17} />}<span>{night ? 'Daylight' : 'Lamplight'}</span></button>;
}

function Research() {
  const [decision, setDecision] = useState(0);
  return <section id="research" className="chapter research" aria-labelledby="research-title"><div className="chapter-heading"><span className="eyebrow">An open question</span><h2 id="research-title">What should an AI forget?</h2><p>I’m exploring selective memory: deciding what an agent should keep, recall, or release as its work changes.</p></div><div className="experiment"><p className="pencil-note">A concept to play with, not a trained model.</p><div className="decision-controls" role="group" aria-label="Explore memory decisions">{decisions.map((item, index) => <button type="button" key={item.label} aria-pressed={index === decision} onClick={() => setDecision(index)}>{item.label}</button>)}</div><div className="decision" aria-live="polite" aria-atomic="true"><h3>{decisions[decision].title}</h3><blockquote>{decisions[decision].example}</blockquote><p>{decisions[decision].explanation}</p></div></div><p className="research-footnote">The next step is an evaluation: compare selective memory with keeping everything, and measure both useful recall and stale information.</p><EngineeringNotes /></section>;
}

function Contact() {
  const [status, setStatus] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus('Email address copied.'); }
    catch { setStatus('Copy is unavailable. You can select the email address above.'); }
  }
  return <section id="contact" className="chapter contact" aria-labelledby="contact-title"><span className="eyebrow">Leave a little hello</span><h2 id="contact-title">Good conversations are welcome.</h2><p>A role, a collaboration, or a question about something here. I’d be glad to hear from you.</p><div className="contact-actions"><a className="email" href={`mailto:${email}`}>{email}</a><button type="button" className="copy-button" onClick={copy} aria-label="Copy email address">{status === 'Email address copied.' ? <Check size={17} /> : <Copy size={17} />}</button></div><p className="contact-help">The email link opens your email app. No form, no account.</p><p className="copy-status" role="status">{status}</p><div className="social-links"><a href="https://github.com/nithin-git7" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a><a href="https://in.linkedin.com/in/nithin-polavarapu-2291832a2" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div></section>;
}

export function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="page"><header className="header" id="home"><a className="wordmark" href="#home" aria-label="Nithin, home">nithin<span>.</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#research">Curiosity</a><a href="#about">About</a><a href="#contact">Say hello</a></nav><Appearance /></header><main id="main-content">
    <section className="welcome" aria-labelledby="welcome-title"><div className="welcome-copy"><p className="eyebrow">Nithin Polavarapu’s personal corner</p><h1 id="welcome-title">A little away<br />from the noise.</h1><p className="welcome-text">I’m Nithin. I build software, explore machine learning, and try to make complicated things a little easier.</p><a className="welcome-link" href="#work">Come see what I’m making <ArrowUpRight size={17} /></a></div><figure className="portrait"><div className="portrait-paper"><img src={asset('profile.webp')} alt="Nithin Polavarapu" width="950" height="1024" fetchPriority="high" /></div><figcaption>Hello, I’m Nithin.</figcaption></figure></section>
    <aside className="welcome-note"><p>I’m interested in entry-level machine learning and AI application development roles.</p><a href={asset('Nithin_Polavarapu_JobResume.pdf')} download>Here for my resume? <Download size={15} /></a></aside>
    <Work /><Research />
    <section className="chapter about" id="about" aria-labelledby="about-title"><div className="chapter-heading"><h2 id="about-title">A little about me.</h2></div><div className="about-grid"><div className="about-copy"><p>I’m based in Vijayawada, India, working at the intersection of machine learning and product development.</p><p>I studied Computer Science with a focus on AI and ML at Parul University. My work ranges from model evaluation to the interface someone actually uses.</p><p>My college projects gave me room to explore predictive models, language, and computer vision. Selective memory is a question I’m continuing to explore.</p><p className="languages">English, Telugu, and beginner German.</p><details><summary>Tools I work with</summary><p>Python, PyTorch, TensorFlow, scikit-learn, Next.js, FastAPI, Git, MongoDB, and MySQL concepts.</p></details></div><div className="background"><h3>The path so far</h3><ol><li><time>Jan - Apr 2026</time><strong>Machine Learning Intern</strong><span>CodTech IT Solutions</span></li><li><time>May - Jun 2025</time><strong>Machine Learning Intern</strong><span>Micro Information Technology Services</span></li><li><time>2022 - 2026</time><strong>B.Tech, Computer Science (AI & ML)</strong><span>Parul University / 7.76 CGPA</span></li></ol><details><summary>Courses & certificates</summary><p>Machine Learning Specialization, Andrew Ng / Coursera (2025)</p><p>Google Prompting Essentials / Coursera (2025)</p></details></div></div></section>
    <section className="chapter personal" aria-labelledby="personal-title"><h2 id="personal-title">Away from the keyboard.</h2><p>There is more to me than the things I build.</p><div className="personal-interests"><article><h3>Cricket</h3><p>One of my interests beyond software.</p></article><article><h3>Books & music</h3><p>I enjoy books and music alongside my technical work.</p></article><article><h3>Research</h3><p>Following a question a little further.</p></article></div></section><Contact /></main><footer><a className="wordmark" href="#home">nithin<span>.</span></a><p>Thanks for spending a little time here.</p><small>© 2026 Nithin Polavarapu</small></footer></div></>;
}
