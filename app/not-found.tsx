import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="invitation-wrapper flex flex-col items-center justify-center min-h-dvh text-center px-8"
      style={{
        background: "linear-gradient(160deg, #fff9f0 0%, #fbecd9 50%, #fff9f0 100%)",
      }}
    >
      {/* Decorative sunflower */}
      <div className="mb-6 opacity-60">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 360) / 12;
            return (
              <ellipse
                key={i}
                cx={50 + 30 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 30 * Math.sin((angle * Math.PI) / 180)}
                rx={5}
                ry={12}
                fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${50 + 30 * Math.cos((angle * Math.PI) / 180)}, ${50 + 30 * Math.sin((angle * Math.PI) / 180)})`}
                opacity={0.7}
              />
            );
          })}
          <circle cx="50" cy="50" r="13" fill="#B5832A" opacity={0.8} />
        </svg>
      </div>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "5rem",
          fontWeight: 700,
          color: "#CC9B3F",
          lineHeight: 1,
        }}
      >
        404
      </p>

      <p
        className="mt-3 mb-2"
        style={{
          fontFamily: "'Italianno', cursive",
          fontSize: "2.5rem",
          color: "#5a3e28",
        }}
      >
        Halaman Tidak Ditemukan
      </p>

      <p
        className="text-sm mb-8 max-w-xs"
        style={{
          fontFamily: "'Lora', serif",
          color: "#8a6a4a",
          fontStyle: "italic",
          lineHeight: 1.7,
        }}
      >
        Undangan yang Anda cari tidak tersedia. Pastikan link yang Anda gunakan sudah benar.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.9rem",
          color: "#B5832A",
          textDecoration: "none",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(181,131,42,0.4)",
          paddingBottom: "2px",
        }}
      >
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
