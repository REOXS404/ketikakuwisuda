"use client";

import React, { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";

const DRIVE_IDS = [
  "10rdjnpiBcSr8Qo-DrQyd2QHZYwuFVE_E",
  "1ZcBPHb7Jn1GooL2zBhc7ANgeYEJxMSqC",
  "1dgBxq1k8DmgketBlM91WvejaMsffqXYP",
  "1pvyyTUKPymFmh0lkjShOZWcNirk0KuZo",
  "1fXOLTdEpbsGohg64JvNiSzJQ58w8Vwc1",
  "1jSrbTEzvjQxT_chI5FlROlEboTZKjCX8",
  "119uPra5MsLKo7IN4UoycTFln03MhZKro",
  "1-FhPs545NKJ1A0A8CLE6nTmAze1eD-AC",
  "1ZuQ3REFkzhfLOrQ9l4BZA7GIWUI0y01W",
  "1dH9EpZ6aqGyUdTFG7lVaQN01ssM2Xkhk",
  "1HF0QuoLGirF0tlkY5NFfHKEL81KG9Nz-",
  "1tOXN-JdJtn7mm2slsmKL9Y7qRQ4l2S1U",
  "1CRYDUftNF-c1CzfyenYImAipkcSEeKbw",
  "1trp88QgePmU5BqdjiM3WfinS6HD-IeKk",
  "1wMtsICjKk-YlkbHmRNSh-v7oG_Hd3lSB",
  "1nyWVGIe519itB0L7j_5OoX5jZVxzcz3_",
  "18hUmtx58isZv8J8PAKzgNZ-6cwd0B_-i",
  "1ITDk0RfCbqHuP4VScUFFBBl1Dd4KXAod",
  "1FE8jy0YJ8ItLpM9HzIM9THwd2dP6NShR",

  
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
 
const IMAGE_URLS = DRIVE_IDS.map((id) => `https://lh3.googleusercontent.com/d/${id}=w800`);
 
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 4;
 
const INITIAL_COLUMN_ITEMS = Array.from({ length: DESKTOP_COLUMNS }, () => [
  ...IMAGE_URLS,
  ...IMAGE_URLS,
  ...IMAGE_URLS,
]);
 
const poppinsThin = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});
 
// Durasi per kolom (ms) — dipakai untuk JS animation juga
const DURATIONS = [60, 60, 60, 60];
 
export default function Hero() {
  // Ref ke tiap track kolom untuk JS-driven animation (iOS fallback)
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRefs   = useRef<number[]>(DURATIONS.map(() => 0));
  const rafRef    = useRef<number>(0);
  const isIOS     = useRef(false);
  const [columnItems, setColumnItems] = useState<string[][]>(() => INITIAL_COLUMN_ITEMS);
 
  useEffect(() => {
    setColumnItems(
      Array.from({ length: DESKTOP_COLUMNS }, () => {
        const s = shuffle(IMAGE_URLS);
        return [...s, ...s, ...s];
      })
    );
    // Deteksi iOS Safari
    isIOS.current =
      /iP(hone|ad|od)/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
 
    if (!isIOS.current) return; // desktop/Android → biarkan CSS animation berjalan
 
    // iOS → matikan CSS animation, ganti dengan JS requestAnimationFrame
    trackRefs.current.forEach((el) => {
      if (el) el.style.animation = "none";
    });
 
    let lastTime = performance.now();
 
    function tick(now: number) {
      const dt = now - lastTime; // delta ms
      lastTime = now;
 
      trackRefs.current.forEach((el, i) => {
        if (!el) return;
        const isUp = i % 2 === 0;
        // kecepatan px/ms: total tinggi 1 set / durasi
        // kita geser posisi, lalu wrap saat lewat -33.333%
        const speed = 100 / (DURATIONS[i] * 1000); // % per ms
        const delta = speed * dt;
 
        if (isUp) {
          posRefs.current[i] -= delta;
          if (posRefs.current[i] <= -33.333) posRefs.current[i] += 33.333;
        } else {
          posRefs.current[i] += delta;
          if (posRefs.current[i] >= 0) posRefs.current[i] -= 33.333;
        }
 
        // Gunakan matrix3d agar iOS hardware-accelerate dengan benar
        el.style.transform = `translate3d(0, ${posRefs.current[i]}%, 0)`;
      });
 
      rafRef.current = requestAnimationFrame(tick);
    }
 
    // Init posisi awal untuk marqueeDown kolom
    posRefs.current = DURATIONS.map((_, i) => (i % 2 === 0 ? 0 : -33.333));
 
    rafRef.current = requestAnimationFrame(tick);
 
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
 
  return (
    <>
      <style>{`
        @keyframes marqueeUp {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -33.333%, 0); }
        }
        @keyframes marqueeDown {
          0%   { transform: translate3d(0, -33.333%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.35) 0%,
            rgba(255,255,255,0.05) 40%,
            rgba(255,255,255,0.15) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
 
      {/* ── Background Marquee ── */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        /*
          iOS Safari pause animasi saat parent di-scroll.
          translate3d(0,0,0) pada wrapper paksa GPU layer tersendiri
          sehingga animasi anak tidak ter-interrupt.
        */
        style={{ transform: "translate3d(0,0,0)", WebkitTransform: "translate3d(0,0,0)" }}
      >
        <div
          className="absolute inset-0 flex items-start"
          style={{ gap: "clamp(6px, 1.5vw, 14px)" }}
        >
          {Array.from({ length: DESKTOP_COLUMNS }).map((_, colIndex) => {
            const duration = DURATIONS[colIndex];
            const isUp     = colIndex % 2 === 0;
            const hideClass = colIndex >= MOBILE_COLUMNS ? "hidden md:flex" : "flex";
            const items     = columnItems[colIndex];
 
            return (
              <div
                key={colIndex}
                className={`${hideClass} flex-col overflow-hidden`}
                style={{ flex: "1 1 0", minWidth: 0 }}
              >
                <div
                  ref={(el) => { trackRefs.current[colIndex] = el; }}
                  style={{
                    // CSS animation (non-iOS)
                    animation: isUp
                      ? `marqueeUp ${duration}s linear infinite`
                      : `marqueeDown ${duration}s linear infinite`,
                    // Paksa GPU compositing — TIDAK pakai will-change (bikin iOS pause)
                    transform: "translate3d(0,0,0)",
                    WebkitTransform: "translate3d(0,0,0)",
                    // iOS perlu -webkit-
                    WebkitAnimationName: isUp ? "marqueeUp" : "marqueeDown",
                    WebkitAnimationDuration: `${duration}s`,
                    WebkitAnimationTimingFunction: "linear",
                    WebkitAnimationIterationCount: "infinite",
                    WebkitAnimationPlayState: "running",
                  }}
                >
                  {items.map((src, i) => (
                    <div
                      key={`${colIndex}-${i}`}
                      className="w-full rounded-xl overflow-hidden"
                      style={{
                        aspectRatio: "4 / 5",
                        marginBottom: "clamp(6px, 1.5vw, 14px)",
                        // GPU layer per card agar lazy-load tidak interrupt animasi parent
                        transform: "translate3d(0,0,0)",
                        WebkitTransform: "translate3d(0,0,0)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        /*
                          JANGAN lazy di dalam animasi — iOS pause animasi
                          saat IntersectionObserver fire untuk lazy load.
                          Pakai eager untuk semua gambar marquee.
                        */
                        loading="eager"
                        decoding="async"
                        fetchPriority="low"
                        referrerPolicy="no-referrer"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://picsum.photos/seed/${colIndex}-${i}/400/500`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* ── Konten Utama ── */}
      <section
        className={`${poppinsThin.className} relative z-10 min-h-screen overflow-hidden bg-transparent flex items-center justify-center px-4 py-20`}
      >
        <div
          className="glass-card relative flex flex-col items-center gap-5 rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center w-full max-w-sm sm:max-w-xl"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px) saturate(160%) brightness(1.1)",
            WebkitBackdropFilter: "blur(24px) saturate(160%) brightness(1.1)",
            borderRadius: "24px",
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.12),
              0 8px 32px rgba(0,0,0,0.35),
              0 1px 0 rgba(255,255,255,0.18) inset,
              0 -1px 0 rgba(0,0,0,0.15) inset
            `,
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px",
            }}
          />
 
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] sm:text-xs font-medium tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            Abadikan Momenmu
          </span>
 
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-none"
            style={{
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}
          >
            Ketikakuwisuda.
          </h1>
        </div>
 
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] sm:text-[10px] tracking-widest text-white uppercase">Scroll</span>
          <div className="h-6 sm:h-8 w-px bg-white/70" />
        </div>
      </section>
    </>
  );
}