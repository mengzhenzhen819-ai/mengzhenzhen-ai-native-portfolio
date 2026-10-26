import { useEffect } from 'react';
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { const p = clamp(n); return p * p * (3 - 2 * p); };
const mix = (a, b, t) => a + (b - a) * t;

// One fixed scroll interval drives the real anchors back to their original slots.
export function useProjectPresentation(sectionRef, trackRef, activeSkill) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let cards = [...section.querySelectorAll('.project-card')];
    const sizes = new Map();
    const measure = () => {
      cards.forEach(card => {
        card.removeAttribute('data-presenting');
        card.parentElement.removeAttribute('data-slot-ready');
        card.parentElement.style.removeProperty('height');
      });
      cards.forEach(card => {
        sizes.set(card, {height: parseFloat(getComputedStyle(card).height), media: parseFloat(getComputedStyle(card.querySelector('.project-media')).height)});
      });
      cards.forEach(card => {
        card.parentElement.style.height = `${sizes.get(card).height}px`;
        card.parentElement.dataset.slotReady = 'true';
      });
      cards.sort((a,b) => a.parentElement.offsetTop - b.parentElement.offsetTop || a.parentElement.offsetLeft - b.parentElement.offsetLeft);
    };
    measure();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const reset = card => {
      card.style.setProperty('--presentation-x', '0px');
      card.style.setProperty('--presentation-y', '0px');
      card.style.setProperty('--presentation-rotation', '0deg');
      card.style.setProperty('--presentation-scale', '1');
      card.style.removeProperty('z-index');
      card.removeAttribute('data-presenting');
    };
    const pinTop = 24;
    const startPosition = () => track.getBoundingClientRect().top + scrollY - pinTop;
    const paint = () => {
      frame = 0;
      if (document.hidden) return;
      if (reduced.matches) {
        cards.forEach(reset);
        section.dataset.presentation = 'original-grid';
        section.dataset.presentationProgress = '1.000';
        return;
      }
      const progress = clamp((scrollY - startPosition()) / (innerHeight * .85));
      section.dataset.presentationProgress = progress.toFixed(3);
      section.dataset.presentation = progress <= .08 ? 'fan' : progress < 1 ? 'unfolding' : 'original-grid';
      if (progress === 1) { cards.forEach(reset); return; }
      const rect = section.getBoundingClientRect();
      const towardGrid = ease((progress - .08) / .92);
      const mobile = innerWidth < 700;
      cards.forEach((card, index) => {
        const slot = card.parentElement;
        const size = sizes.get(card);
        // Reverse the opening stack only; each card still returns to its original slot.
        const stackIndex = cards.length - 1 - index;
        const side = stackIndex - (cards.length - 1) / 2;
        const rank = stackIndex / Math.max(1, cards.length - 1);
        const originalX = slot.offsetLeft + slot.offsetWidth / 2;
        const originalY = slot.offsetTop + size.height / 2;
        // Normalize only the opening frame; final dimensions stay exactly original.
        const fanHeight = mobile ? 430 : 460;
        const renderHeight = mix(fanHeight, size.height, towardGrid);
        const fanScale = mix(mobile ? .54 : .58, mobile ? .72 : .79, rank);
        const fanRotation = mix(-7, 7, rank);
        const fanX = rect.width / 2 + side * rect.width * (mobile ? .036 : .050);
        // Shared horizontal centerline; size changes never lift the card centers.
        const fanY = mobile ? 205 : 220;
        const x = mix(fanX, originalX, towardGrid);
        const y = mix(fanY, originalY, towardGrid);
        card.style.setProperty('--presentation-height', `${renderHeight.toFixed(3)}px`);
        card.style.setProperty('--presentation-media-height', `${mix(fanHeight - 155, size.media, towardGrid).toFixed(3)}px`);
        card.style.setProperty('--presentation-x', `${(x-originalX).toFixed(3)}px`);
        card.style.setProperty('--presentation-y', `${(y-slot.offsetTop-renderHeight/2).toFixed(3)}px`);
        card.style.setProperty('--presentation-rotation', `${mix(fanRotation, 0, towardGrid).toFixed(3)}deg`);
        card.style.setProperty('--presentation-scale', mix(fanScale, 1, towardGrid).toFixed(5));
        card.dataset.presenting = 'true';
        card.style.zIndex = String(10+stackIndex);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', schedule, {passive:true});
    const resize = () => { measure(); schedule(); };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    schedule();
    // A genuine detail return should show the completed grid, not its intro.
    const returnCard = location.hash.startsWith("#project-")
      ? cards.find(card => `#${card.id}` === location.hash) : null;
    if (returnCard && !reduced.matches) {
      const end = startPosition() + innerHeight * .85;
      const target = end + pinTop + section.offsetTop + returnCard.parentElement.offsetTop
        + (sizes.get(returnCard).height - innerHeight) / 2;
      window.scrollTo({top: Math.ceil(Math.max(end, target)), behavior: "instant"});
      schedule();
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', schedule);
      reduced.removeEventListener('change', schedule);
      cards.forEach(card => {
        reset(card);
        card.parentElement.style.removeProperty("height");
        card.parentElement.removeAttribute("data-slot-ready");
      });
    };
  }, [sectionRef, trackRef, activeSkill]);
}
