"use client";

import React from "react";
import Image from "next/image";
import { SiWhatsapp, SiInstagram, SiTiktok, SiThreads } from "react-icons/si";

type Location = { lat: number; lng: number; name?: string; address?: string };

type Props = { location?: Location | null };

const socials = [
  { name: "WhatsApp", Icon: SiWhatsapp, handle: "ADMIN (irfan)", href: "https://wa.me/+62 815-8695-0264" },
  { name: "Instagram", Icon: SiInstagram, handle: "ketikakuwisuda.", href: "https://www.instagram.com/ketikakuwisuda?utm_source=qr" },
  { name: "TikTok", Icon: SiTiktok, handle: "GRADUATION PHOTOGRAPHY.", href: "https://www.tiktok.com/@ketikakuwisuda?_r=1&_d=eml301j98hl5b1&sec_uid=MS4wLjABAAAA6bjqtLHkPDfYV-52W9fDJlzvTbXZqQHy3sJpA1rhfblSpryIC__NJR6rVUwwBjbS&share_author_id=7491655248696968210&sharer_language=id&source=h5_t&u_code=ejjg13l19j1md0&item_author_type=1&utm_source=copy&tt_from=copy&enable_checksum=1&utm_medium=ios&share_link_id=894F7A68-CFAD-490C-8637-45FC0A915B1F&user_id=7491655248696968210&sec_user_id=MS4wLjABAAAA6bjqtLHkPDfYV-52W9fDJlzvTbXZqQHy3sJpA1rhfblSpryIC__NJR6rVUwwBjbS&social_share_type=4&ug_btm=b8727,b0&utm_campaign=client_share&share_app_id=1180" },
  { name: "Threads", Icon: SiThreads, handle: "ketikakuwisuda.", href: "https://www.threads.net/" },
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