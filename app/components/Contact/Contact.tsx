"use client";
import React from "react";
import { SiWhatsapp, SiInstagram, SiTiktok, SiThreads } from "react-icons/si";

type Location = { lat: number; lng: number; name?: string; address?: string };
type Props = { location?: Location | null };


const WA_NUMBER = "6281586950264"; 
const WA_MESSAGE = encodeURIComponent("Hallo kak, boleh info pricelist wisuda?");
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const socials = [
  {
    name: "WhatsApp",
    Icon: SiWhatsapp,
    handle: "ADMIN (irfan)",
    href: WA_HREF,
  },
  {
    name: "Instagram",
    Icon: SiInstagram,
    handle: "ketikakuwisuda.",
    href: "https://www.instagram.com/ketikakuwisuda?utm_source=qr",
  },
  {
    name: "TikTok",
    Icon: SiTiktok,
    handle: "GRADUATION PHOTOGRAPHY.",
    href: "https://www.tiktok.com/@ketikakuwisuda",
  },
  {
    name: "Threads",
    Icon: SiThreads,
    handle: "ketikakuwisuda.",
    href: "https://www.threads.com/@ketikakuwisuda?igshid=NTc4MTIwNjQ2YQ==",
  },
];

export default function Contact({ location = null }: Props) {
  return (
    <section className="relative z-30 -mt-24 md:-mt-25 w-full overflow-hidden px-0 md:px-4">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />
      <div className="relative mx-auto max-w-6xl flex justify-center py-4 md:py-10">
        <div className="w-full md:max-w-md rounded-3xl px-4 py-6 md:p-8 backdrop-blur-lg bg-white/20 backdrop-saturate-150 border border-white/20 shadow-lg flex flex-col items-center">
          <h2 className="w-full text-left text-lg font-semibold mb-4 text-black">Contact</h2>
          <div className="w-full flex flex-col gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 hover:scale-105 transform transition-transform text-gray-900 shadow-sm"
                aria-label={s.name}
              >
                <s.Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}