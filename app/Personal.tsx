import JournalSpreadCarousel, { type JournalSpread } from '../components/ui/journal-spread-carousel';

const spreads: JournalSpread[] = [
  { label: 'Cricket', paper: '#e9eadf', notes: [{ x: 9, y: 20, w: 36, title: 'Cricket', body: 'Always welcome in a conversation.' }, { x: 58, y: 30, w: 30, title: '01', body: 'Outside work' }] },
  { label: 'Books', paper: '#eee8dc', notes: [{ x: 9, y: 20, w: 36, title: 'Books', body: 'Beyond technical documentation.' }, { x: 58, y: 30, w: 30, title: '02', body: 'Outside work' }] },
  { label: 'Music', paper: '#e6e9dc', notes: [{ x: 9, y: 20, w: 36, title: 'Music', body: 'A little time away from software.' }, { x: 58, y: 30, w: 30, title: '03', body: 'Outside work' }] },
  { label: 'Research', paper: '#eee8dc', notes: [{ x: 9, y: 20, w: 36, title: 'Research', body: 'Questions without an answer yet.' }, { x: 58, y: 30, w: 30, title: '04', body: 'Outside work' }] },
];

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
        <JournalSpreadCarousel spreads={spreads} title="A small journal" meta="Four things I enjoy" height="clamp(350px, 45vw, 520px)" />
        <p>Drag the pages or use the arrows to explore.</p>
      </div>
    </section>
  );
}
