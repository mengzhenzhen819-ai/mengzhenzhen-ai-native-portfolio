import { useEffect, useRef, useState } from "react";

const TOP = ["city-street", "photo-12", "hyrox", "balloon", "dog-park", "photo-13", "paragliding", "photo-15"];
const BOTTOM = ["snorkeling", "photo-11", "beach", "cafe", "temple", "photo-14", "deer"];
const PHOTO_POSITIONS = {balloon: "0% 50%", paragliding: "0% 50%", snorkeling: "20% 50%", deer: "50% 0%", "photo-11": "0% 50%"};
// Keep the source images intact; tighten only these two square gallery views.
const PHOTO_FRAMING = {
  "city-street": { transform: "scale(1.35)", transformOrigin: "50% 35%" },
  hyrox: { transform: "scale(1.65)", transformOrigin: "50% 48%" },
};
const ROWS = [TOP, BOTTOM];

export default function ContactPhotoWaves() {
  const containerRef = useRef(null);
  const distanceRef = useRef(75);
  const [rowCount, setRowCount] = useState(7);
  // Complete image cycles keep unequal rows seamless without padding with duplicates.
  const rowCounts = ROWS.map(row => Math.ceil(rowCount / row.length) * row.length);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = [...container.querySelectorAll(".community-photo")];
    const field = container.querySelector(".community-photo-field");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, cardSize = 112, gap = 24;
    let leftEdge = 0, rightEdge = 1;
    let scrollBoost = 0, targetBoost = 0, lastScrollY = window.scrollY, lastScrollTime = performance.now();
    let distance = distanceRef.current, frame = 0, last = 0, inView = false;
    let disposed = false;
    const draw = () => {
      const spacing = cardSize + gap;
      const pathHeight = Math.max(1, height - 32);
      cards.forEach((card, index) => {
        const row = index < rowCounts[0] ? 0 : 1;
        const item = row === 0 ? index : index - rowCounts[0];
        const circumference = rowCounts[row] * spacing;
        const direction = row === 0 ? -1 : 1;
        const x = ((item * spacing + direction * distance) % circumference + circumference) % circumference - circumference / 2 + spacing / 2;
        const onStage = Math.abs(x) < width / 2 + cardSize + 64;
        if (card.dataset.onStage !== String(onStage)) {
          card.dataset.onStage = String(onStage);
          card.style.visibility = onStage ? "visible" : "hidden";
          card.style.willChange = onStage && inView && !reducedMotion.matches ? "transform, opacity" : "auto";
        }
        if (!onStage) return;
        // Fade the entire photo before its outer edge reaches the clipping bound.
        const clearance = Math.min(x - leftEdge, rightEdge - x) - cardSize / 2 - 8;
        const fade = Math.max(0, Math.min(1, clearance / Math.min(cardSize * 1.2, width * .2)));
        const opacity = fade * fade * (3 - 2 * fade);
        card.style.opacity = opacity.toFixed(3);
        card.style.pointerEvents = opacity > .12 ? "auto" : "none";
        const wave = Math.sin(x / width * Math.PI * 3.6 + row * Math.PI * .72) * pathHeight * .052;
        const y = pathHeight * (row === 0 ? -.335 : .335) + wave;
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
    };
    const tick = now => {
      frame = 0;
      if (disposed || !inView || document.hidden || reducedMotion.matches) { last = 0; return; }
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      targetBoost *= Math.exp(-4.5 * dt);
      scrollBoost += (targetBoost - scrollBoost) * (1 - Math.exp(-7 * dt));
      distance += dt * (46.2 + scrollBoost);
      distanceRef.current = distance;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      cards.forEach(card => { delete card.dataset.onStage; });
      draw();
      if (!disposed && inView && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);
      const compact = matchMedia("(max-width: 720px)").matches;
      cardSize = compact ? 78 : 112;
      gap = compact ? 14 : 24;
      leftEdge = field.offsetLeft - width / 2;
      rightEdge = leftEdge + field.clientWidth;
      setRowCount(Math.max(1, Math.ceil((field.clientWidth + cardSize + 32) / (cardSize + gap))));
      container.style.setProperty("--community-photo-size", `${cardSize}px`);
      container.style.setProperty("--community-photo-radius", `${Math.round(cardSize * .14)}px`);
      draw();
    };
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max((now - lastScrollTime) / 1000, .016);
      if (inView && !reducedMotion.matches) {
        targetBoost = Math.max(targetBoost, Math.min(110, .16 * Math.abs(window.scrollY - lastScrollY) / dt));
      }
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      container.dataset.active = String(inView);
      sync();
    }, {threshold: .05});
    intersection.observe(container);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", sync);
    };
  }, [rowCount]);
  const enterPhoto = event => {
    if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    card.dataset.hovered = "true";
    const glare = card.querySelector(".community-glare");
    glare.style.transition = "none";
    glare.style.backgroundPosition = "-100% -100%";
    // Restart the reference-style diagonal sweep on each new pointer entry.
    void glare.offsetWidth;
    glare.style.transition = "background-position 720ms cubic-bezier(.16,1,.3,1)";
    glare.style.backgroundPosition = "100% 100%";
  };
  const leavePhoto = event => {
    const card = event.currentTarget;
    card.dataset.hovered = "false";
    const glare = card.querySelector(".community-glare");
    glare.style.transition = "background-position 720ms cubic-bezier(.16,1,.3,1)";
    glare.style.backgroundPosition = "-100% -100%";
  };
  return (
    <div className="contact-photo-waves" ref={containerRef}>
      <div className="community-copy">
        <p className="community-primary">Everything outside<br />design</p>
        <p className="community-secondary">shapes how I design.</p>
      </div>
      <div className="community-photo-field" aria-hidden="true">
        {ROWS.flatMap((row, rowIndex) => Array.from({length: rowCounts[rowIndex]}, (_, index) => (
          <div className="community-photo" key={`${rowIndex}-${index}`} onPointerEnter={enterPhoto} onPointerLeave={leavePhoto}>
            <img src={`/contact-personal/${row[index % row.length]}.webp`} style={{objectPosition: PHOTO_POSITIONS[row[index % row.length]] ?? "50% 50%", ...PHOTO_FRAMING[row[index % row.length]]}} alt="" loading="eager" decoding="async" draggable="false" width="128" height="128" />
            <span className="community-glare" />
          </div>
        )))}
      </div>
    </div>
  );
}
