"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Gift, Copy, Check, Heart } from "lucide-react";
import { SectionLabel, ScrollCue } from "@/components/ui/Animations";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: ((i * 7.3 + 5) % 92).toFixed(1),
  size: (0.8 + (i % 3) * 0.45).toFixed(1),
  dur: 2.5 + (i % 4) * 0.7,
  delay: (i * 0.55) % 4.5,
}));

const accounts = [
  {
    bank: "BSI",
    logo: "/Logo/bsi-logo.png",
    logoAlt: "Bank BSI",
    accountNumber: "7172983175",
    accountName: "Haris Akbar",
    bgColor: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(248,252,252,0.95) 100%)",
    borderColor: "rgba(32, 178, 170, 0.3)",
    accentColor: "#20b2aa",
    logoWidth: 70,
    logoHeight: 40,
  },
  {
    bank: "BCA",
    logo: "/Logo/bca-logo.png",
    logoAlt: "Bank BCA",
    accountNumber: "7275399736",
    accountName: "Cut Chairunnisa",
    bgColor: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(240,247,255,0.95) 100%)",
    borderColor: "rgba(0, 119, 190, 0.3)",
    accentColor: "#0077be",
    logoWidth: 90,
    logoHeight: 38,
  },
];

function AccountCard({ account, index, isInView }: {
  account: typeof accounts[0];
  index: number;
  isInView: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.25 + index * 0.18, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      style={{
        background: account.bgColor,
        border: `1.5px solid ${account.borderColor}`,
        borderRadius: "18px",
        padding: "1.1rem 1.2rem",
        boxShadow: `0 4px 24px rgba(204,155,63,0.08), 0 1px 6px rgba(0,0,0,0.06)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle shimmer overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
          borderRadius: "18px",
          pointerEvents: "none",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: index * 1.2 + 0.8, ease: "easeInOut" }}
      />

      {/* Top row: logo + bank name */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "5px 8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={account.logo}
              alt={account.logoAlt}
              width={account.logoWidth}
              height={account.logoHeight}
              className="h-[28px] w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: account.accentColor,
              textTransform: "uppercase",
            }}
          >
            {account.bank}
          </span>
        </div>

        {/* Small gold gift badge */}
        <div
          style={{
            background: "rgba(204,155,63,0.12)",
            borderRadius: "50px",
            padding: "3px 9px",
            border: "1px solid rgba(204,155,63,0.25)",
          }}
        >
          <Gift size={11} color="#CC9B3F" />
        </div>
      </div>

      {/* Account number */}
      <div className="mb-1.5">
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.62rem",
            color: "rgba(90,62,40,0.55)",
            letterSpacing: "0.08em",
            marginBottom: "2px",
          }}
        >
          Nomor Rekening
        </p>
        <div className="flex items-center justify-between gap-2">
          <motion.p
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#2a1a0a",
              lineHeight: 1.2,
            }}
          >
            {account.accountNumber}
          </motion.p>

          {/* Copy button */}
          <motion.button
            type="button"
            onClick={handleCopy}
            whileTap={{ scale: 0.9 }}
            style={{
              background: copied ? "rgba(72,187,120,0.15)" : "rgba(204,155,63,0.12)",
              border: `1px solid ${copied ? "rgba(72,187,120,0.4)" : "rgba(204,155,63,0.3)"}`,
              borderRadius: "8px",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            {copied ? (
              <Check size={12} color="#48bb78" />
            ) : (
              <Copy size={12} color="#CC9B3F" />
            )}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.62rem",
                fontWeight: 600,
                color: copied ? "#48bb78" : "#CC9B3F",
                letterSpacing: "0.04em",
              }}
            >
              {copied ? "Tersalin!" : "Salin"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: `linear-gradient(90deg, ${account.borderColor}, transparent)`,
          margin: "8px 0",
        }}
      />

      {/* Account name */}
      <div className="flex items-center gap-1.5">
        <Heart size={9} style={{ color: "#CC9B3F", fill: "#CC9B3F", opacity: 0.7 }} />
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.72rem",
            color: "#5a3e28",
            fontStyle: "italic",
          }}
        >
          a.n{" "}
          <span style={{ fontWeight: 600, fontStyle: "normal", color: "#4a2e18" }}>
            {account.accountName}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default function GiftSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      id="gift"
      className="section-snap section-px py-10 relative overflow-hidden flex flex-col justify-center"
      style={{
        background: "linear-gradient(180deg, #fdf5ec 0%, #fcf0e0 45%, #fdf5ec 100%)",
      }}
    >
      {/* Corner floral ornaments */}
      <div
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14, transform: "rotate(180deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14 }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: "-20px",
              background: "#CC9B3F",
            }}
            animate={{
              y: ["0px", "-105dvh"],
              opacity: [0, 0.35, 0.35, 0],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-y-4">
        {/* Header */}
        <div className="text-center">
          <SectionLabel text="Wedding Gift" />

          <motion.div
            className="flex justify-center mb-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(135deg, rgba(204,155,63,0.12), rgba(181,131,42,0.08))",
                border: "1px solid rgba(204,155,63,0.3)",
                borderRadius: "50%",
                padding: "14px",
              }}
            >
              <Gift size={28} color="#CC9B3F" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#5a3e28",
              fontStyle: "italic",
              marginBottom: "0.3rem",
            }}
          >
            Hadiah Pernikahan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "0.72rem",
              color: "#8a6a4a",
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: "0.25rem",
            }}
          >
            Bagi yang ingin memberikan tanda kasih,
            <br />
            Anda dapat mengirimkan melalui rekening berikut:
          </motion.p>

          {/* Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-2 mb-1"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          >
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.45))" }} />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(204,155,63,0.5)",
                boxShadow: "0 0 8px rgba(204,155,63,0.4)",
              }}
            />
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, rgba(204,155,63,0.45), transparent)" }} />
          </motion.div>
        </div>

        {/* Account Cards */}
        <div className="flex flex-col gap-3">
          {accounts.map((account, index) => (
            <AccountCard
              key={account.bank}
              account={account}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-center"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.65rem",
            color: "rgba(138,106,74,0.6)",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          Kehadiran & doa restu Anda adalah hadiah
          <br />
          yang paling berarti bagi kami. 🤍
        </motion.p>
      </div>
      <ScrollCue />
    </section>
  );
}
