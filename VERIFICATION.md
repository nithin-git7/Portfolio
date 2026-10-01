# Verification record

8 September 2026. Local production preview: http://127.0.0.1:4173/Portfolio/

- `npm run build`: passes TypeScript, client build, server rendering, and static synchronization.
- `npm run verify`: passes prerendered content, one h1, anchor targets, referenced local assets, actual PDF signature, and dist/root publication parity.
- Computer-use browser inspection: original UI, redesigned desktop at 1366px, default 624px panel, 390px mobile, and 320px narrow layout.
- Both daylight and lamplight visually inspected. Saved theme survives reload.
- The 320px check found body min-width overflow; fixed and rechecked: client width and scroll width both 305px (15px browser scrollbar).
- Project screenshot switching and native dialog tested. Escape closes, focus returns to the opening button, and body scroll unlocks. Mobile modal visually checked.
- Case-study disclosure expands. Memory controls update the displayed explanation.
- Copy-email action reports successful copy. No email was sent.
- JavaScript disabled and page reloaded: prerendered content and navigation remain in the accessibility tree. Interactive controls require JavaScript. Script execution was restored afterward.
- No console warnings or errors observed in the production preview.
- Main portrait and project images load. Download PDF and font/image/script/style files are checked by the artifact verifier.

Not verified: deployed website, third-party profile/link availability, email delivery, screen-reader announcements in an actual assistive technology, production Core Web Vitals, or current resume facts. No live backend, deployment, commit, or push is claimed.


## 9 September: project emphasis and deeper reading

The earlier ClearPath image controls were removed at the owner's request. Their earlier verification above is historical, not a description of the current interface.

The current revision builds and passes npm run verify. The local browser confirms the college-project stories expand, the model-evaluation note expands, and the role-interest statement renders. Expanded story typography was visually inspected. GitHub project links are intentionally absent because the owner has none. Individual contributions, real screenshots, and measured evaluations remain unverified and are not fabricated.

# October 1 UI refinement

Production build and artifact verification passed. Browser computer-use review covered desktop project rows in daylight, an expanded project story, the personal shelf and welcome in lamplight, and mobile widths of 390 and 320 pixels. Document scroll width matched client width at both mobile sizes (375 and 305 pixels with the browser scrollbar). No browser console errors were observed. The preview route returned HTTP 200. Screenshot: visual-review-october.png. These changes are local; no new push or deployment was performed.
