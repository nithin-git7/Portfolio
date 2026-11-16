"use client"

import * as React from "react"

/** A photo pinned to a spread. x / y / w are percentages of the whole spread. */
export type JournalPrint = {
  src: string
  alt?: string
  x: number
  y: number
  w: number
  rotate?: number
  caption?: string
  /** A strip of washi tape across the top instead of a polaroid border. */
  tape?: boolean
}

/** A handwritten note on a spread. x / y / w are percentages of the whole spread. */
export type JournalNote = {
  x: number
  y: number
  w: number
  title?: string
  body?: string
  rotate?: number
  /** "card" sits on a torn paper slip; "ink" writes straight onto the photo. */
  style?: "card" | "ink"
}

/** One open double page. The image runs across both pages and folds at the spine. */
export type JournalSpread = {
  id?: string
  label?: string
  image?: string
  alt?: string
  imagePosition?: string
  /** Paper colour when there is no image, or under it while it loads. */
  paper?: string
  prints?: JournalPrint[]
  notes?: JournalNote[]
}

export type JournalAction = "more" | "share" | "delete" | "add"

export interface JournalSpreadCarouselProps {
  spreads: JournalSpread[]
  title?: string
  /** The line under the title. Defaults to the page count. */
  meta?: string
  height?: string
  initialIndex?: number
  /** Milliseconds between automatic page turns; false turns it off. Stops on the first touch. */
  autoPlay?: number | false
  onIndexChange?: (index: number) => void
  onAction?: (action: JournalAction, index: number) => void
  className?: string
}

// #region pose
const OPEN = 5 // the centre spread's slight V at the spine, degrees
const SIDE = 80 // how far a stacked page turns towards the middle
const FOLD = 174 // a page folding shut over its partner

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

/** Spread shape for a stage: 5:4 on wide stages, taller pages on a portrait phone. */
export function spreadAspect(stageW: number, stageH: number): number {
  return stageW < 640 && stageH > stageW ? 0.86 : 1.25
}

/** Spread width for a stage, keeping room for the side stacks. */
export function spreadWidth(stageW: number, stageH: number): number {
  if (stageW <= 0 || stageH <= 0) return 0
  const narrow = stageW < 640
  return Math.round(Math.min(stageW * (narrow ? 0.84 : 0.54), stageH * 0.9 * spreadAspect(stageW, stageH), 980))
}

/**
 * Where spread `p` steps from the centre sits. 0 is open in the middle; ±1 is the first
 * page of each stack, and further ones step outwards and back.
 */
export function poseFor(p: number, w: number) {
  const d = Math.abs(p)
  const a = d < 1 ? d : 1
  const s = p < 0 ? -1 : 1
  const out = d > 1 ? d - 1 : 0
  const x = s * (a * (w * 0.5 + w * 0.03) + out * w * 0.055)
  const z = -(a * w * 0.42 + out * w * 0.06)
  // Pages on the side they stack to turn edge-on; the other page folds shut over them.
  // The fold eases in (a * a) so the leaving and arriving spreads overlap mid-turn.
  const fold = a * a
  const left = p > 0 ? OPEN + (FOLD - OPEN) * fold : OPEN + (SIDE - OPEN) * a
  const right = p < 0 ? -(OPEN + (FOLD - OPEN) * fold) : -(OPEN + (SIDE - OPEN) * a)
  const shade = (deg: number) => clamp((Math.abs(deg) - OPEN) / 95, 0, 0.62)
  return {
    x,
    z,
    left,
    right,
    shadeLeft: shade(left),
    shadeRight: shade(right),
    opacity: clamp(7.2 - d, 0, 1),
    hidden: d > 7.2,
  }
}

/** Where a drag lets go: the nearest spread, nudged by the flick. */
export function settle(pos: number, velocity: number, n: number): number {
  return clamp(Math.round(pos + clamp(velocity * 0.18, -1.5, 1.5)), 0, Math.max(0, n - 1))
}

/** Tween length for a jump of `steps` spreads; longer jumps riffle faster per page. */
export function durationFor(steps: number): number {
  return steps <= 0 ? 0 : Math.round(560 * Math.sqrt(Math.min(steps, 12)))
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
// #endregion

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": true } as const

function Icon({ name }: { name: string }) {
  switch (name) {
    case "book":
      return (
        <svg {...ICON}>
          <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
      )
    case "grid":
      return (
        <svg {...ICON}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case "search":
      return (
        <svg {...ICON}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </svg>
      )
    case "menu":
      return (
        <svg {...ICON}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case "lock":
      return (
        <svg {...ICON}>
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case "more":
      return (
        <svg {...ICON} strokeWidth={3}>
          <path d="M5 12h.01M12 12h.01M19 12h.01" />
        </svg>
      )
    case "share":
      return (
        <svg {...ICON}>
          <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
        </svg>
      )
    case "delete":
      return (
        <svg {...ICON}>
          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
        </svg>
      )
    default:
      return (
        <svg {...ICON}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
  }
}

function Sheet({ spread }: { spread: JournalSpread }) {
  return (
    <div className="jsc-sheet" style={{ background: spread.paper }}>
      {spread.image ? (
        <img className="jsc-bg" src={spread.image} alt="" draggable={false} decoding="async" style={{ maxWidth: "none", objectPosition: spread.imagePosition }} />
      ) : null}
      {spread.prints?.map((p, k) => (
        <figure
          key={k}
          className="jsc-print"
          data-tape={p.tape ? "" : undefined}
          style={{ left: p.x + "%", top: p.y + "%", width: p.w + "%", transform: "rotate(" + (p.rotate ?? 0) + "deg)" }}
        >
          <img src={p.src} alt="" draggable={false} decoding="async" style={{ maxWidth: "none" }} />
          {p.caption ? <figcaption>{p.caption}</figcaption> : null}
        </figure>
      ))}
      {spread.notes?.map((t, k) => (
        <div
          key={k}
          className="jsc-note"
          data-style={t.style ?? "card"}
          style={{ left: t.x + "%", top: t.y + "%", width: t.w + "%", transform: "rotate(" + (t.rotate ?? 0) + "deg)" }}
        >
          {t.title ? <b>{t.title}</b> : null}
          {t.body ? <span>{t.body}</span> : null}
        </div>
      ))}
    </div>
  )
}

export default function JournalSpreadCarousel({
  spreads,
  title = "Journal",
  meta,
  height = "100svh",
  initialIndex = 0,
  autoPlay = false,
  onIndexChange,
  className,
}: JournalSpreadCarouselProps) {
  const n = spreads.length
  const start = clamp(Math.round(initialIndex), 0, Math.max(0, n - 1))
  const [index, setIndex] = React.useState(start)
  const [reduced, setReduced] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const stageRef = React.useRef(null as HTMLDivElement | null)
  const items = React.useRef([] as (HTMLDivElement | null)[])
  const pages = React.useRef([] as (HTMLDivElement | null)[])
  const width = React.useRef(0) // cached on resize; the frame loop never measures
  const pos = React.useRef(start)
  const target = React.useRef(start)
  const tween = React.useRef(null as null | { from: number; to: number; t0: number; dur: number; ease: (t: number) => number })
  const raf = React.useRef(0)
  const drag = React.useRef(null as null | { id: number; x: number; from: number; lastX: number; lastT: number; v: number; moved: boolean })
  const touched = React.useRef(false)
  const reducedRef = React.useRef(false)
  const onIndexRef = React.useRef(onIndexChange)
  onIndexRef.current = onIndexChange

  const paint = React.useCallback(() => {
    const w = width.current
    if (!w) return
    for (let i = 0; i < items.current.length; i++) {
      const el = items.current[i]
      if (!el) continue
      const q = poseFor(i - pos.current, w)
      if (q.hidden) {
        el.style.visibility = "hidden"
        continue
      }
      el.style.visibility = "visible"
      el.style.opacity = String(q.opacity)
      el.style.transform = "translate3d(" + q.x.toFixed(2) + "px,0," + q.z.toFixed(2) + "px)"
      const l = pages.current[i * 2]
      const r = pages.current[i * 2 + 1]
      if (l) {
        l.style.transform = "rotateY(" + q.left.toFixed(2) + "deg)"
        l.style.setProperty("--jsc-s", q.shadeLeft.toFixed(3))
      }
      if (r) {
        r.style.transform = "rotateY(" + q.right.toFixed(2) + "deg)"
        r.style.setProperty("--jsc-s", q.shadeRight.toFixed(3))
      }
    }
  }, [])

  const frame = React.useCallback(
    (t: number) => {
      raf.current = 0
      const tw = tween.current
      if (tw) {
        const k = tw.dur > 0 ? clamp((t - tw.t0) / tw.dur, 0, 1) : 1
        pos.current = tw.from + (tw.to - tw.from) * tw.ease(k)
        if (k >= 1) tween.current = null
      }
      paint()
      if (tween.current) raf.current = requestAnimationFrame(frame)
    },
    [paint],
  )

  const kick = React.useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(frame)
  }, [frame])

  const go = React.useCallback(
    (to: number, ease = easeInOut) => {
      const next = clamp(to, 0, Math.max(0, n - 1))
      if (next !== target.current) {
        target.current = next
        setIndex(next)
        onIndexRef.current?.(next)
      }
      const dur = reducedRef.current ? 0 : durationFor(Math.abs(next - pos.current))
      tween.current = { from: pos.current, to: next, t0: performance.now(), dur, ease }
      kick()
    },
    [n, kick],
  )

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => {
      reducedRef.current = mq.matches
      setReduced(mq.matches)
    }
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  // Measure once per resize and cache it; the per-frame paint reads only the cache.
  React.useEffect(() => {
    const stage = stageRef.current
    const root = rootRef.current
    if (!stage || !root) return
    const ro = new ResizeObserver(([entry]) => {
      const { width: sw, height: sh } = entry.contentRect
      const w = spreadWidth(sw, sh)
      width.current = w
      root.style.setProperty("--jsc-w", w + "px")
      root.style.setProperty("--jsc-h", Math.round(w / spreadAspect(sw, sh)) + "px")
      paint()
    })
    ro.observe(stage)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf.current)
      raf.current = 0
    }
  }, [paint])

  React.useEffect(() => {
    if (pos.current > n - 1) go(n - 1)
    else paint()
  }, [n, go, paint])

  // Turns pages on its own until someone touches it; pauses off-screen and in a hidden tab.
  React.useEffect(() => {
    const root = rootRef.current
    if (!autoPlay || reduced || n < 2 || !root) return
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(root)
    const id = window.setInterval(() => {
      if (touched.current || !visible || document.hidden || drag.current) return
      go(target.current >= n - 1 ? 0 : target.current + 1)
    }, autoPlay)
    return () => {
      window.clearInterval(id)
      io.disconnect()
    }
  }, [autoPlay, reduced, n, go])

  const stop = () => {
    touched.current = true
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || n < 1) return
    stop()
    tween.current = null
    drag.current = { id: e.pointerId, x: e.clientX, from: pos.current, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    const w = width.current
    if (!d || d.id !== e.pointerId || !w) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      setDragging(true)
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lastT)
    d.v = d.v * 0.6 + (-(e.clientX - d.lastX) / (w * 0.42) / (dt / 1000)) * 0.4
    d.lastX = e.clientX
    d.lastT = e.timeStamp
    pos.current = clamp(d.from - dx / (w * 0.42), -0.3, n - 0.7)
    kick()
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    setDragging(false)
    if (d.moved) {
      go(settle(pos.current, d.v, n), easeOut)
      return
    }
    const hit = (e.target as HTMLElement).closest("[data-i]")
    const i = hit ? Number(hit.getAttribute("data-i")) : target.current
    go(i)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, PageDown: 1, ArrowLeft: -1, ArrowUp: -1, PageUp: -1 }
    if (e.target !== e.currentTarget) return
    if (e.key in map) go(target.current + map[e.key])
    else if (e.key === "Home") go(0)
    else if (e.key === "End") go(n - 1)
    else return
    e.preventDefault()
    stop()
  }

  // Trackpads swipe sideways; a vertical wheel is left to scroll the page.
  const wheel = React.useRef({ acc: 0, at: 0 })
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      const w = wheel.current
      w.acc += e.deltaX
      if (Math.abs(w.acc) < 40 || e.timeStamp - w.at < 320) return
      touched.current = true
      w.at = e.timeStamp
      go(target.current + (w.acc > 0 ? 1 : -1))
      w.acc = 0
    }
    stage.addEventListener("wheel", onWheel, { passive: true })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [go])

  const current = spreads[index]
  const pagesLabel = meta ?? n * 2 + " Pages"

  return (
    <div
      ref={rootRef}
      className={"jsc-root" + (className ? " " + className : "")}
      style={{ height }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      onKeyDown={onKeyDown}
    >
      <div className="jsc-head"><span className="jsc-title">{title}</span><span className="jsc-meta">{pagesLabel}</span></div>

      <div
        ref={stageRef}
        className="jsc-stage"
        data-drag={dragging ? "" : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="jsc-floor" aria-hidden="true" />
        <div className="jsc-view">
          <div className="jsc-scene">
            {spreads.map((s, i) => (
              <div
                key={s.id ?? i}
                ref={(el) => {
                  items.current[i] = el
                }}
                className="jsc-item"
                data-i={i}
                role="group"
                aria-roledescription="spread"
                aria-label={(s.label ?? "Spread " + (i + 1)) + ", " + (i + 1) + " of " + n}
                aria-hidden={i !== index}
              >
                {s.alt ? <span className="jsc-sr">{s.alt}</span> : null}
                {(["l", "r"] as const).map((side, k) => (
                  <div
                    key={side}
                    ref={(el) => {
                      pages.current[i * 2 + k] = el
                    }}
                    className="jsc-page"
                    aria-hidden={side === "r" ? true : undefined}
                    data-side={side}
                  >
                    <Sheet spread={s} />
                    <div className="jsc-gutter" />
                    <div className="jsc-shade" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="jsc-bar">
        <button type="button" className="jsc-btn" aria-label="Previous spread" disabled={index === 0} onClick={() => { stop(); go(index - 1) }}>←</button>
        <span aria-hidden="true">{index + 1} / {n}</span>
        <button type="button" className="jsc-btn" aria-label="Next spread" disabled={index === n - 1} onClick={() => { stop(); go(index + 1) }}>→</button>
      </div>

      <p className="jsc-sr" aria-live="polite">
        {current ? (current.label ?? "Spread " + (index + 1)) + ", " + (index + 1) + " of " + n : ""}
      </p>
    </div>
  )
}

