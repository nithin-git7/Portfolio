export function Personal() {
  return (
    <section className="chapter personal" aria-labelledby="personal-title">
      <div className="personal-intro">
        <span className="eyebrow">Outside work</span>
        <h2 id="personal-title">Away from the keyboard.</h2>
        <p>Cricket, books, music, and research. A few things that belong here alongside the code.</p>
      </div>
      <dl className="personal-shelf">
        <div><dt>Cricket</dt><dd>Always welcome in a conversation.</dd></div>
        <div><dt>Books</dt><dd>Room for reading, beyond technical documentation.</dd></div>
        <div><dt>Music</dt><dd>Another part of life outside software.</dd></div>
        <div><dt>Research</dt><dd>Questions that don’t have an answer yet.</dd></div>
      </dl>
      <p className="personal-invitation">Have a book, a song, or a cricket story to share? <a href="#contact">Tell me about it.</a></p>
    </section>
  );
}
