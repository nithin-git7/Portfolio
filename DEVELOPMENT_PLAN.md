# Personal website development plan

Updated: 9 September 2026

## Direction

A personal place that feels away from the internet: a small, welcoming notebook with time to read. Use Nithin's real work, portrait, cricket, books, music, and research. Keep the resume and contact easy to find. Avoid engagement counters, feeds, autoplay, tracking, attention-seeking animation, or invented personal stories.

Design settings: variance 5/10, motion 2/10, density 3/10. Native CSS with a manuscript-inspired Newsreader display face and Manrope body text; existing local fonts. Daylight and lamplight cover the whole page. Personalization is based on the owner's supplied interests, not guessed favorites.

## Review of the starting site

All authored application, style, component, hook, utility, build-script, and configuration files were inspected. Package metadata and generated entry points were inspected; third-party node_modules, binary assets, and generated bundle lines are not a source-code audit. Worktree was clean before changes. No repository AGENTS.md was found.

| Priority | Finding | Resolution |
| --- | --- | --- |
| High | Fonts, screenshots, portrait and resume were outside the Vite public directory, making standalone dist incomplete. | Added public asset source and complete dist/Pages output synchronization. |
| High | Motion components rendered important content with initial opacity zero, leaving prerendered content dependent on client animation. | Replaced entry/reveal animation with visible static content. |
| Medium | Dialog removed body scroll lock only in an effect branch that could be skipped when unmounted; aria-controls referenced a missing content id. | Replaced custom animation dialog with native dialog, Escape support, and explicit focus restoration. |
| Medium | Tab semantics lacked roving keyboard navigation and complete panel relationships. | Used ordinary, keyboard-accessible pressed buttons for simple view switching. |
| Medium | Generic product language, glow, grid decoration, and large repeated capability panels weakened personal identity. | Rebuilt the page as a personal introduction, case study, research experiment, background, interests, and contact. |
| Medium | Contact form depended on mailto and reported a prepared draft without knowing whether a mail client opened. | Direct email and copy-address fallback; no misleading delivery or draft confirmation. |
| Medium | There was no automated validation command or development documentation. | Added build-artifact validation and this roadmap. |
| Low | Many animation dependencies and primitives no longer served the requested direction. | Removed retired components and unnecessary dependencies. |

## Completed in this revision

- Complete new App and stylesheet; genuine portrait and original project screenshots retained.
- Personal introduction, cricket/books/music/research, experience and education retained from existing content.
- ClearPath is now only one linked mention; college projects lead the work section.
- Honest selective-memory concept with concrete examples and three accessible controls.
- Persistent optional appearance preference, readable fallback when storage is blocked.
- Static HTML, self-hosted assets, responsive layout, skip link, visible focus, reduced-motion and print styles.
- No contact database or server was present. The delivery/build layer was improved; no live API or email service is claimed.

## Projects that would strengthen the resume

These are proposed projects, not completed work or guarantees about recruiting outcomes. Finish one with evidence before starting another.

### 1. Cricket match notebook (highest personal fit)

Build an explorable account of how a match changed: wickets, run rate, phases, and uncertainty. Start with one competition and one season, then add comparisons. Use Python ingestion and validation, a small FastAPI read API, SQLite or PostgreSQL, and an accessible web interface. Cricsheet provides documented ball-by-ball formats: https://cricsheet.org/format/ . Check the selected dataset's license and attribution before publishing.

Definition of done: reproducible dataset import; duplicate and invalid-delivery checks; match detail and comparison views; query tests; API pagination and response validation; a documented deployment. If adding a prediction model, split by match and time, compare to a simple baseline, and report calibration and held-out results. Never randomly split deliveries from the same match across train and test.

Portfolio evidence: one readable case study, architecture diagram, real screenshots, dataset citation, failure cases, and measured performance. Only then write a resume bullet with actual dataset size and results.

### 2. Selective-memory evaluation bench (highest research fit)

Turn the current concept into a reproducible experiment comparing no memory, full history, recency-limited history, and selective retrieval. Use a fixed task set with corrections, changing requirements, stale facts, and adversarial content. Track useful recall, incorrect stale recall, task completion, latency, and token use. Keep prompts, model versions, seeds where supported, raw outputs, and evaluation rules in the repository.

Definition of done: runnable CLI, published synthetic dataset, baseline report, repeated trials, error analysis, deletion tests, and a small UI for examining individual failures. Do not describe a three-button illustration as a working memory engine. Treat retrieved text as untrusted; security design should account for indirect prompt injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ .

Portfolio evidence: an honest result including cases where selective memory performs worse. A reproducible negative finding is more useful than an unsupported claim.

### 3. Private reading notebook (books + backend depth)

Build a local-first reading log with handwritten-style notes, full-text search, tags, and JSON/Markdown export. Start with local storage using IndexedDB and explicit backup/export. Add optional authenticated sync only after the offline experience works. Store the user's own notes and permitted excerpts, not copyrighted books.

Definition of done: offline creation and editing, deterministic export/import round trip, conflict handling, deleted-note recovery, keyboard navigation, and tested access isolation if sync is added. Explain storage and data ownership in plain language.

### 4. Small music journal (personal website extension)

A manually curated shelf of albums or songs with Nithin's own short notes. Begin without an external account integration or autoplay. Link to lawful listening sources and use only permitted cover art. This is a personal writing feature first; add search and filtering only when the collection needs them.

Definition of done: five owner-written entries, accessible external links, no third-party requests before the user follows a link, and a simple content schema. This adds personality; it should not be inflated into an ML achievement.

## Portfolio emphasis (updated 9 September 2026)

Keep ClearPath Germany to one brief linked mention. The main work section features the two projects documented in the local resume: Intelligent Business Analytics & Automation Suite and MediAI. Do not restore the large ClearPath screenshots or case study without an explicit request.

Next, collect repository links, real screenshots, individual contributions, and reproducible evaluation results for the college projects. Their feature descriptions come from Nithin_Polavarapu_Resume.docx. Resume performance numbers are not repeated because their evaluation evidence has not been checked. MediAI is clearly identified as an academic prototype, not a clinical diagnostic tool.

## Next website iterations

1. Owner supplies one cricket memory, one book and reflection, and one music recommendation. Replace the general interest descriptions with these real details.
2. Publish a dated note about a real research question or implementation tradeoff. Review the drafted case-study prose for personal voice before release.
3. Add dedicated project pages when there is enough material, with stable URLs, metadata, and an explicit empty/404 page.
4. Measure production Lighthouse/Core Web Vitals after deployment; do not infer performance scores from bundle size. Check keyboard/screen reader and 200% zoom. Page structure reference: https://www.w3.org/WAI/tutorials/page-structure/ .
5. If a real contact backend becomes necessary, select a host that supports server functions. Require server-side validation and length limits, rate limiting, honeypot, request timeouts, provider failure states, server-only credentials, minimal retention, and delivery acknowledgement only after the provider accepts the request. GitHub Pages itself cannot run this endpoint.

## Local development and release

- npm ci
- npm run dev (development site under /Portfolio/)
- npm run build
- npm run verify
- npm run preview (standalone production output under /Portfolio/)

Author assets in public; app/index.html is the HTML template. Root index.html and root assets are generated GitHub Pages artifacts. Keep both output targets in sync by running build. Existing resume PDF is preserved; its facts were not revalidated in this website task.

No deployment, commit, or push is included in this revision. Verify the actual published target separately after release. The website deliberately needs no always-on application backend today.


## Portfolio highlighting implementation (9 September)

Completed: concise role-interest statement near the resume; expandable stories for both college projects covering the question, documented approach, deliverable, evaluation considerations, and limits; two short engineering notes inside the research section. The quiet page order and single ClearPath mention are preserved. Project content now lives in app/Work.tsx.

The owner confirmed that college-project GitHub links are unavailable. Repository buttons are therefore omitted; they are not a prerequisite for a useful portfolio. Do not invent repository URLs, individual contributions, screenshots, or results.

Remaining owner-supplied evidence:
- Actual project screenshots or access to a runnable copy.
- Individual contribution and any team context for each project.
- Dataset source, split method, baseline, evaluation outputs, and reproduction steps before publishing metrics.
- One specific cricket memory, book reflection, and music recommendation.

Engineering notes explain evaluation principles and a proposed memory experiment. They do not claim experiments were run or fabricate a personal retrospective. No deployment is included.
