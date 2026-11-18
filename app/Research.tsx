import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { BrainCircuit } from 'lucide-react';
import { EngineeringNotes } from './Work';
import './research.css';

const decisions = [
  {
    label: 'Retain',
    title: 'Keep what will matter again.',
    example: '“I am learning machine learning.”',
    explanation: 'A lasting goal can help with the next task. Keep it while it remains relevant.',
  },
  {
    label: 'Retrieve',
    title: 'Bring back what this task needs.',
    example: '“Which topic should I study next?”',
    explanation: 'Recall the learning goal and the topics already covered, instead of loading every earlier conversation.',
  },
  {
    label: 'Let go',
    title: 'Release what is no longer reliable.',
    example: '“The deadline I saved has changed.”',
    explanation: 'An outdated date should be replaced or flagged, rather than quietly influencing a new decision.',
  },
];

export function Research() {
  const [decision, setDecision] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  // Based on Edu Calvo’s Animated Tabs on 21st.dev.
  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    const last = decisions.length - 1;
    let next: number;

    switch (event.key) {
      case 'ArrowRight': next = (decision + 1) % decisions.length; break;
      case 'ArrowLeft': next = (decision + last) % decisions.length; break;
      case 'Home': next = 0; break;
      case 'End': next = last; break;
      default: return;
    }

    event.preventDefault();
    setDecision(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="research" className="chapter page-width research" aria-labelledby="research-title">
      <div className="research-heading">
        <span className="eyebrow">Exploration</span>
        <h2 id="research-title">From my notebook.</h2>
      </div>
      <div className="research-conversation">
        <div className="research-intro">
          <h3>What should an AI forget?</h3>
          <p>I’m exploring selective memory: deciding what an agent should keep, recall, or release as its work changes.</p>
          <p className="research-next">The next step is an evaluation: compare selective memory with full-history and no-memory baselines, measuring useful recall and stale-information errors.</p>
        </div>
        <div className="memory-concept">
          <div className="memory-header">
            <span className="memory-icon"><BrainCircuit size={21} aria-hidden="true" /></span>
            <div>
              <h4>Selective memory demo</h4>
              <p className="memory-caption">A small interactive concept, not a trained model.</p>
            </div>
          </div>
          <div className="memory-controls" role="tablist" aria-label="Explore memory decisions" onKeyDown={navigate}
            style={{ '--selected-tab': decision } as CSSProperties}>
            {decisions.map((item, index) => (
              <button
                type="button"
                key={item.label}
                id={`memory-tab-${index}`}
                ref={button => { tabs.current[index] = button; }}
                role="tab"
                aria-selected={decision === index}
                aria-controls={`memory-panel-${index}`}
                tabIndex={decision === index ? 0 : -1}
                onClick={() => setDecision(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {decisions.map((item, index) => (
            <div className="memory-explanation" key={item.label} id={`memory-panel-${index}`}
              role="tabpanel" aria-labelledby={`memory-tab-${index}`} tabIndex={0} hidden={decision !== index}>
              <h4>{item.title}</h4>
              <blockquote>{item.example}</blockquote>
              <p>{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
      <EngineeringNotes />
    </section>
  );
}
