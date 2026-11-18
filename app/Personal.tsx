import JournalSpreadCarousel, { type JournalSpread } from '../components/ui/journal-spread-carousel';

const spreads: JournalSpread[] = [
  { label: 'Cricket', paper: '#e1e8cc', description: 'Always welcome in a conversation.' },
  { label: 'Books', paper: '#f6dda0', description: 'Beyond technical documentation.' },
  { label: 'Music', paper: '#efc8bc', description: 'A little time away from software.' },
  { label: 'Research', paper: '#f4e6d1', description: 'Questions without an answer yet.' },
].map(({ label, paper, description }) => ({
  label,
  paper,
  notes: [
    { x: 9, y: 20, w: 40, title: label },
    { x: 57, y: 44, w: 35, body: description },
  ],
}));

export function Personal() {
  return (
    <section className="personal page-width" aria-labelledby="personal-title">
      <div className="personal-intro">
        <span className="eyebrow">Outside work</span>
        <h2 id="personal-title">Away from the screen.</h2>
        <p>Cricket, books, music, and research. A few things that belong here alongside the code.</p>
      </div>
      <dl className="personal-shelf">
        <div><dt>Cricket</dt><dd>Always welcome in a conversation.</dd></div>
        <div><dt>Books</dt><dd>Beyond technical documentation.</dd></div>
        <div><dt>Music</dt><dd>A little time away from software.</dd></div>
        <div><dt>Research</dt><dd>Questions without an answer yet.</dd></div>
      </dl>
      <div className="personal-journal">
        <JournalSpreadCarousel spreads={spreads} title="A small journal" height="clamp(350px, 42vw, 460px)" />
        <p>Drag the pages or use the arrows to explore.</p>
      </div>
    </section>
  );
}
