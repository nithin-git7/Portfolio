import { useId } from 'react';

const projects = [
  {
    name: 'Intelligent Business Analytics & Automation Suite',
    summary: 'One Streamlit application for customer churn prediction, sentiment analysis, and image classification.',
    tools: 'Streamlit / Random Forest / DistilBERT / CLIP',
    question: 'How can different kinds of business data become useful outputs in one application?',
    approach: 'The project brings three model workflows together: Random Forest for churn prediction, DistilBERT for sentiment analysis, and CLIP for zero-shot image classification.',
    outcome: 'The documented deliverable is a unified dashboard combining predictive analytics, language, and vision.',
    evaluation: 'Each workflow needs its own evaluation. A classification score, sentiment result, and image-label match answer different questions and should not be combined into one headline accuracy.',
    limitation: 'A reproducible evaluation report and a breakdown of individual contributions are not published here yet.',
    features: ['Customer churn prediction', 'Text sentiment analysis', 'Zero-shot image classification'],
  },
  {
    name: 'MediAI',
    summary: 'A college project combining tabular-data models and medical-image classification across four diseases.',
    tools: 'TensorFlow / Keras / scikit-learn / Streamlit / MongoDB / SQL',
    question: 'How can several screening-model workflows share an interface while keeping their inputs and outputs distinct?',
    approach: 'Random Forest and Logistic Regression handle diabetes and kidney-disease datasets. Convolutional neural networks handle image classification, with Streamlit connecting the workflows.',
    outcome: 'The documented application includes authentication, database support, and PDF reporting alongside its model workflows.',
    evaluation: 'Tabular and image models need separate test sets and reports. The same patient or duplicate image should not appear in both training and evaluation data.',
    limitation: 'This is an academic prototype, not a clinical diagnostic tool. Its results are not presented as evidence of clinical readiness.',
    features: ['Tabular and image models', 'A shared Streamlit interface', 'Database support and PDF reports'],
  },
];

function ProjectDetails({ project }: { project: typeof projects[number] }) {
  const id = useId();
  return (
    <details className="project-reading">
      <summary aria-controls={id}>Read the project story</summary>
      <div id={id}>
        <h4>The question</h4><p>{project.question}</p>
        <h4>The approach</h4><p>{project.approach}</p>
        <h4>What was built</h4><p>{project.outcome}</p>
        <h4>What needs careful evaluation</h4><p>{project.evaluation}</p>
        <h4>Current limits</h4><p>{project.limitation}</p>
      </div>
    </details>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="chapter">
      <div className="chapter-heading">
        <span className="eyebrow">College projects</span>
        <h2 id="work-title">Things I learned by building.</h2>
        <p>Two projects exploring how models become applications people can use.</p>
      </div>
      <div className="college-projects">
        {projects.map(project => (
          <article className="college-project" key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <p className="project-tools">{project.tools}</p>
            {project.name === 'MediAI' && <p className="project-note">An academic prototype, not a clinical diagnostic tool.</p>}
            <ProjectDetails project={project} />
          </article>
        ))}
      </div>
      <p className="other-project">Also built: <a href="https://clearpath-gilt.vercel.app/" target="_blank" rel="noopener noreferrer">ClearPath Germany</a>, a study-application planning website.</p>
    </section>
  );
}

export function EngineeringNotes() {
  return (
    <div className="engineering-notes" aria-labelledby="notes-title">
      <h3 id="notes-title">Questions behind the work.</h3>
      <p>Two short notes on how to examine an ML project.</p>
      <details>
        <summary>A model score needs context</summary>
        <div className="note-body">
          <p>A score is useful only when the reader knows the task, the data, and how the test was set up. Churn prediction, sentiment analysis, and image classification need separate evaluation stories.</p>
          <p>A useful report starts with a simple baseline, describes the held-out data, and shows the mistakes as well as the overall result. It also records the code and model version needed to repeat the test.</p>
          <p>For these college projects, publishing that evidence is the next step. The portfolio does not repeat accuracy claims without the reports behind them.</p>
        </div>
      </details>
      <details>
        <summary>More memory is not always more useful</summary>
        <div className="note-body">
          <p>Old context can be relevant, redundant, or wrong. A useful memory system needs to distinguish a lasting goal from a detail that has changed.</p>
          <p>The selective-memory question here is whether a smaller, relevant memory can support a task without carrying forward stale facts. A fair experiment would give the same tasks to no-memory, full-history, and selective-memory baselines.</p>
          <p>Useful recall, stale-fact errors, task completion, latency, and token use would be measured separately. This is a proposed experiment; the interactive example above does not run a memory model.</p>
        </div>
      </details>
    </div>
  );
}
