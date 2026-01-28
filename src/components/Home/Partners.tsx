"use client";
import Image from "next/image";

import acer from "../../../public/partner-acer.svg";
import everlast from "../../../public/partner-everlast.svg";
import boohoo from "../../../public/partner-booho.svg";
import tarocash from "../../../public/partner-tarocash.svg";

const partners = [
  { src: acer, bg: "#D9D9D9" },
  { src: everlast, bg: "#000" },
  { src: boohoo, bg: "#D9D9D9" },
  { src: tarocash, bg: "#000" },
  { src: acer, bg: "#D9D9D9" },
  { src: everlast, bg: "#000" },
  { src: boohoo, bg: "#D9D9D9" },
  { src: tarocash, bg: "#000" },
  { src: acer, bg: "#D9D9D9" },
  { src: everlast, bg: "#000" },
  { src: boohoo, bg: "#D9D9D9" },
  { src: tarocash, bg: "#000" },
];

export default function Partners() {
  return (
    <section className="partners">
      <h2 className="title">OUR PARTNERS & DISCOUNTS</h2>

      <div className="marquee">
        <div className="marquee__track">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="marquee__group" aria-hidden={ariaHidden}>
      {partners.map((item, i) => (
        <div key={i} className="partner" style={{ background: item.bg }}>
          <Image src={item.src} alt="partner logo" width={140} height={60} />
        </div>
      ))}
    </div>
  );
}
