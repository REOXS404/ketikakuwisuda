"use client";

import React, { useState, useRef, useCallback } from "react";

// ── ID langsung dari folder Drive (sama seperti Hero) ──
const DRIVE_IDS = [
  "10rdjnpiBcSr8Qo-DrQyd2QHZYwuFVE_E", // 1.jpg
  "1ZcBPHb7Jn1GooL2zBhc7ANgeYEJxMSqC", // 2.jpg
  "1dgBxq1k8DmgketBlM91WvejaMsffqXYP", // 3.jpg
  "1ZDn3ASBRp3hbQ4c_vDFq4nyWJFscTuWj", // 4.jpg
  "1fXOLTdEpbsGohg64JvNiSzJQ58w8Vwc1", // 5.jpg
  "1jSrbTEzvjQxT_chI5FlROlEboTZKjCX8", // Ketikakuwisuda - 3.jpg
  "1N4Tu-LrlJbNIIMS-lUDeBw0nLinAautf", // FAN01914.jpg
  "1-FhPs545NKJ1A0A8CLE6nTmAze1eD-AC", // FAN06436.jpg
  "1ZuQ3REFkzhfLOrQ9l4BZA7GIWUI0y01W", // IMG_3586.JPG
  "1dH9EpZ6aqGyUdTFG7lVaQN01ssM2Xkhk", // DSC02784.jpg
];

// lh3.googleusercontent.com — CDN Google, tidak butuh login, tidak redirect
const IMAGES = DRIVE_IDS.map(
  (id) => `https://lh3.googleusercontent.com/d/${id}=w800`
);

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  // ── Drag-to-scroll ──
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeft.current = scrollerRef.current.scrollLeft;
    scrollerRef.current.style.cursor = "grabbing";
    scrollerRef.current.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollerRef.current.scrollLeft = scrollLeft.current - walk;
    if (Math.abs(walk) > 4) hasDragged.current = true;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = "grab";
      scrollerRef.current.style.userSelect = "";
    }
  }, []);

  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollerRef.current) return;
    hasDragged.current = false;
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = scrollerRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollerRef.current) return;
    const walk = touchStartX.current - e.touches[0].pageX;
    scrollerRef.current.scrollLeft = touchScrollLeft.current + walk;
    if (Math.abs(walk) > 4) hasDragged.current = true;
  }, []);

  function scrollBy(dir: number) {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  // ── Modal dengan navigasi ──
  function openModal(index: number) {
    if (hasDragged.current) return;
    setModalIndex(index);
    setModalImage(IMAGES[index]);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalImage(null);
  }

  function modalPrev() {
    const i = (modalIndex - 1 + IMAGES.length) % IMAGES.length;
    setModalIndex(i);
    setModalImage(IMAGES[i]);
  }

  function modalNext() {
    const i = (modalIndex + 1) % IMAGES.length;
    setModalIndex(i);
    setModalImage(IMAGES[i]);
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      {/* ── Glassmorphism container ── */}
      <div
        className="relative rounded-2xl p-5 shadow-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.12),
            0 8px 32px rgba(0,0,0,0.30),
            0 1px 0 rgba(255,255,255,0.16) inset
          `,
        }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />

        <h3 className="text-base font-semibold text-white/80 mb-4 tracking-wide">Gallery</h3>

        <div className="relative">
          {/* Arrow kiri */}
          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg transition"
            style={{
              background: "rgba(0,0,0,0.50)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollerRef}
            className="flex gap-3 overflow-x-auto no-scrollbar px-10 py-1 select-none"
            style={{ cursor: "grab", scrollBehavior: "auto" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            {IMAGES.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 sm:w-60 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  aspectRatio: "4 / 3",
                  cursor: "grab",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onClick={() => openModal(i)}
              >
                <img
                  src={src}
                  alt={`foto-${i + 1}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://picsum.photos/seed/gal-${i}/800/600`;
                  }}
                />
              </div>
            ))}
          </div>

          {/* Arrow kanan */}
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg transition"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{
              background: "rgba(20,20,20,0.70)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 24px 64px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol tutup */}
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 z-20 w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white text-sm transition"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Navigasi modal kiri */}
            <button
              onClick={modalPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white text-xl transition"
              style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <img
              src={modalImage}
              alt="enlarged"
              className="w-full h-auto max-h-[80vh] object-contain"
              draggable={false}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://picsum.photos/seed/modal-${modalIndex}/800/600`;
              }}
            />

            {/* Navigasi modal kanan */}
            <button
              onClick={modalNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white text-xl transition"
              style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
              aria-label="Next photo"
            >
              ›
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs text-white/60"
              style={{ background: "rgba(0,0,0,0.40)" }}
            >
              {modalIndex + 1} / {IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}