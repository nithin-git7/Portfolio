import { useState } from 'react';
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
  const selected = decisions[decision];

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
          <p className="memory-caption">A small interactive concept, not a trained model.</p>
          <div className="memory-controls" role="group" aria-label="Explore memory decisions">
            {decisions.map((item, index) => (
              <button
                type="button"
                key={item.label}
                aria-pressed={decision === index}
                aria-controls="memory-explanation"
                onClick={() => setDecision(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div id="memory-explanation" className="memory-explanation" aria-live="polite" aria-atomic="true">
            <h4>{selected.title}</h4>
            <blockquote>{selected.example}</blockquote>
            <p>{selected.explanation}</p>
          </div>
        </div>
      </div>
      <EngineeringNotes />
    </section>
  );
}
