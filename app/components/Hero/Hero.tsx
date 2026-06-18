"use client";

import React from "react";
import { Poppins } from "next/font/google";

const DRIVE_IDS = [
  "10rdjnpiBcSr8Qo-DrQyd2QHZYwuFVE_E",
  "1ZcBPHb7Jn1GooL2zBhc7ANgeYEJxMSqC",
  "1dgBxq1k8DmgketBlM91WvejaMsffqXYP",
  "1nsRpNrV70_E60PoNkLUTGoT5-cZLjXN2",
  "1fXOLTdEpbsGohg64JvNiSzJQ58w8Vwc1",
  "1jSrbTEzvjQxT_chI5FlROlEboTZKjCX8",
  "1N4Tu-LrlJbNIIMS-lUDeBw0nLinAautf",
  "1-FhPs545NKJ1A0A8CLE6nTmAze1eD-AC",
  "1ZuQ3REFkzhfLOrQ9l4BZA7GIWUI0y01W",
  "1dH9EpZ6aqGyUdTFG7lVaQN01ssM2Xkhk",
  "1HF0QuoLGirF0tlkY5NFfHKEL81KG9Nz-",
];

// ── Shuffle Fisher-Yates — dijalankan sekali saat module load ──
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const IMAGE_URLS = shuffle(
  DRIVE_IDS.map((id) => `https://lh3.googleusercontent.com/d/${id}=w800`)
);

const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 4;

// Tiap kolom punya urutan acak sendiri agar antar kolom tidak terlihat sama
const COLUMN_ITEMS = Array.from({ length: DESKTOP_COLUMNS }, () => {
  const shuffled = shuffle(IMAGE_URLS);
  // 3x duplikat untuk seamless infinite scroll
  return [...shuffled, ...shuffled, ...shuffled];
});

const marqueeUp = (duration: number): React.CSSProperties => ({
  animation: `marqueeUp ${duration}s linear infinite`,
  willChange: "transform",
});
const marqueeDown = (duration: number): React.CSSProperties => ({
  animation: `marqueeDown ${duration}s linear infinite`,
  willChange: "transform",
});

const poppinsThin = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes marqueeUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes marqueeDown {
          0%   { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
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
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 flex items-start"
          style={{ gap: "clamp(6px, 1.5vw, 14px)" }}
        >
          {Array.from({ length: DESKTOP_COLUMNS }).map((_, colIndex) => {
            const duration = 32 + colIndex * 4;
            const isUp = colIndex % 2 === 0;
            const hideClass = colIndex >= MOBILE_COLUMNS ? "hidden md:flex" : "flex";
            // Tiap kolom pakai urutan acaknya sendiri
            const items = COLUMN_ITEMS[colIndex];

            return (
              <div
                key={colIndex}
                className={`${hideClass} flex-col overflow-hidden`}
                style={{ flex: "1 1 0", minWidth: 0 }}
              >
                <div style={isUp ? marqueeUp(duration) : marqueeDown(duration)}>
                  {items.map((src, i) => (
                    <div
                      key={`${colIndex}-${i}`}
                      className="w-full rounded-xl overflow-hidden bg-transparent"
                      style={{
                        aspectRatio: "4 / 5",
                        marginBottom: "clamp(6px, 1.5vw, 14px)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        decoding="async"
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
      <section className={`${poppinsThin.className} relative z-10 min-h-screen overflow-hidden bg-transparent flex items-center justify-center px-4 py-20`}>
        <div
          className="glass-card relative flex flex-col items-center gap-5 rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center w-full max-w-sm sm:max-w-xl"
          style={{
            background: "rgba(255, 255, 255, 0.07)",
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