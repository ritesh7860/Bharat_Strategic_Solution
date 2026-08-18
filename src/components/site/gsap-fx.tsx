import { useEffect } from "react";

/**
 * Global GSAP scroll layer (madewithgsap-style):
 * - SplitText character reveals on [data-split] headings
 * - Scrubbed parallax on [data-speed]
 * - Scroll-velocity skew on [data-skew]
 * - Magnetic cursor pull on [data-magnetic]
 * - Batched staggered entrances on [data-reveal]
 * - Clip-path image wipes on [data-wipe]
 */
export function GsapFx() {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-split]", { opacity: 1 });
        return;
      }

      ctx = gsap.context(() => {
        /* ---------- split heading reveals ---------- */
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          const split = new SplitText(el, { type: "lines,chars", linesClass: "overflow-hidden" });
          gsap.set(el, { opacity: 1 });
          gsap.from(split.chars, {
            yPercent: 120,
            opacity: 0,
            rotateX: -60,
            stagger: 0.018,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* ---------- parallax ---------- */
        document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset["speed"] || "0.2");
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        /* ---------- batched reveals ---------- */
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 60, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              },
            ),
        });

        /* ---------- clip wipes ---------- */
        document.querySelectorAll<HTMLElement>("[data-wipe]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        /* ---------- velocity skew ---------- */
        const skewTargets = gsap.utils.toArray<HTMLElement>("[data-skew]");
        if (skewTargets.length) {
          const setters = skewTargets.map((el) => gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power3" }));
          ScrollTrigger.create({
            onUpdate: (self) => {
              const skew = gsap.utils.clamp(-6, 6, (self.getVelocity() / -260) as number);
              setters.forEach((set) => set(skew));
            },
            onScrubComplete: () => setters.forEach((set) => set(0)),
          });
          let idle: ReturnType<typeof setTimeout>;
          const reset = () => {
            clearTimeout(idle);
            idle = setTimeout(() => setters.forEach((set) => set(0)), 140);
          };
          window.addEventListener("scroll", reset, { passive: true });
        }

        /* ---------- magnetic buttons ---------- */
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
        });

        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
