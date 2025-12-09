"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PARTNERS = [
  "/images/partner-acer.png",
  "/images/partner-everlast.png",
  "/images/partner-boohoo.png",
  "/images/partner-tarocash.png",
];

// how many times to duplicate the set for a seamless loop
const DUP_COUNT = 2;

export default function PartnersContinuousFixed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const readyRef = useRef(false); // start animation only after ready
  const halfWidthRef = useRef<number>(0);

  // pixels per second - adjust for speed; can tune per breakpoint if wanted
  const speedPxPerSec = 40;

  // preload images to avoid layout shift mid-animation
  useEffect(() => {
    let canceled = false;
    const imgs = Array.from(new Set(PARTNERS)); // unique
    Promise.all(
      imgs.map(
        (src) =>
          new Promise<void>((res) => {
            const img = new window.Image();
            img.src = src;
            if (img.complete) return res();
            img.onload = () => res();
            img.onerror = () => res(); // resolve anyway on error
          })
      )
    ).then(() => {
      if (!canceled) {
        readyRef.current = true;
        // compute half width once images are loaded & layout settled
        const c = containerRef.current;
        if (c) halfWidthRef.current = c.scrollWidth / DUP_COUNT;
      }
    });

    return () => {
      canceled = true;
    };
  }, []);

  // observe resize/DOM changes so we can recompute halfWidth
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      halfWidthRef.current = container.scrollWidth / DUP_COUNT;
      // ensure scrollLeft within bounds after resize
      if (container.scrollLeft >= halfWidthRef.current) {
        container.scrollLeft = container.scrollLeft % halfWidthRef.current;
      }
    });

    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  // pause when tab hidden to save work and keep timing sane
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        pausedRef.current = true;
      } else {
        pausedRef.current = false;
        // reset last time so dt doesn't blow up
        lastTimeRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const step = (time: number) => {
      if (!readyRef.current) {
        // not ready yet (images/layout), keep scheduling but don't move
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        // move by speed * seconds
        const move = (speedPxPerSec * dt) / 1000;
        container.scrollLeft += move;

        // recompute halfWidth in case something changed
        const half = halfWidthRef.current || container.scrollWidth / DUP_COUNT;

        // robust wrap: if scrolled beyond half, subtract half (handle multiple wraps)
        if (half > 0) {
          // while loop in case move is larger than half (very large dt / very fast)
          while (container.scrollLeft >= half) {
            container.scrollLeft -= half;
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnter = () => {
    pausedRef.current = true;
  };
  const onLeave = () => {
    pausedRef.current = false;
  };

  // background style (your gradient)
  const bgStyle: React.CSSProperties = {
    backgroundImage: `radial-gradient(circle at 8% 20%, rgba(74,155,122,0.16) 0%, rgba(74,155,122,0.06) 8%, transparent 20%),
                            radial-gradient(circle at 92% 80%, rgba(20,40,40,0.18) 0%, transparent 25%),
                            linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "#ffffff",
  };

  return (
    <section className="py-8" style={bgStyle}>
      <div className="max-w-screen-2xl mx-auto px-6">
        <h4 className="text-lg font-semibold mb-4 text-center text-white">
          OUR PARTNERS AND DISCOUNTS
        </h4>

        <div
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
        >
          <div
            ref={containerRef}
            className="flex gap-6 items-center overflow-x-hidden whitespace-nowrap"
            style={{
              borderTop: "3px solid rgba(255,255,255,0.06)",
              borderBottom: "3px solid rgba(0,0,0,0.12)",
              padding: "18px 8px",
            }}
          >
            {Array.from({ length: DUP_COUNT }).map((_, dupIdx) =>
              PARTNERS.map((p, i) => (
                <div
                  key={`${dupIdx}-${i}`}
                  className="inline-flex flex-shrink-0 items-center justify-center w-40 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 rounded"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <Image
                    src={p}
                    alt={`partner-${i}`}
                    width={140}
                    height={60}
                    style={{ objectFit: "contain" }}
                    // priority on at least first set so they load fast
                    priority={dupIdx === 0}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


