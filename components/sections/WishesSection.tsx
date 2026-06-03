"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionLabel, GoldOrnamentDivider, fadeUp } from "@/components/ui/Animations";
import { MessageSquare, Send } from "lucide-react";

interface WishItem {
  _id: string;
  name: string;
  wish: string;
  createdAt: string;
}

interface WishesSectionProps {
  slug: string;
  guestName: string;
}

function formatRelativeTime(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function WishesSection({ slug, guestName }: WishesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" });

  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState(guestName || "");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishes
  useEffect(() => {
    async function fetchWishes() {
      try {
        const res = await fetch(`/api/wishes/${slug}`);
        const result = await res.json();
        if (result.success) {
          setWishes(result.data);
        } else {
          setError("Gagal memuat ucapan");
        }
      } catch (err) {
        setError("Koneksi gagal");
      } finally {
        setFetching(false);
      }
    }
    fetchWishes();
  }, [slug]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/wishes/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), wish: wish.trim() }),
      });
      const result = await res.json();

      if (result.success) {
        setWishes((prev) => [result.data, ...prev]);
        setWish("");
      } else {
        setError(result.error || "Gagal mengirim ucapan");
      }
    } catch (err) {
      setError("Gagal mengirim ucapan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="wishes"
      className="section-snap section-px py-4 relative flex flex-col justify-center gap-y-2 h-dvh overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #fcf0e0 40%, #fdf5ec 100%)" }}
    >
      {/* Header */}
      <div ref={ref} className="text-center mb-1">
        <SectionLabel text="Wishes" />
        <motion.h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "#5a3e28",
            fontStyle: "italic",
          }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Ucapan & Doa Restu
        </motion.h2>
        <GoldOrnamentDivider icon="star" delay={0.25} />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-3 relative z-10">
        
        {/* Wishes Form Card */}
        <motion.div
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            border: "1.5px solid rgba(204, 155, 63, 0.25)",
            boxShadow: "0 4px 15px rgba(204, 155, 63, 0.05)",
            borderRadius: "14px",
            padding: "0.85rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                required
                disabled={loading}
                className="w-full px-3 py-1.5 text-xs rounded-lg border bg-white/60 focus:bg-white focus:outline-none transition-all duration-300"
                style={{
                  fontFamily: "'Lora', serif",
                  borderColor: "rgba(204, 155, 63, 0.3)",
                  color: "#5a3e28",
                }}
              />
            </div>
            <div>
              <textarea
                placeholder="Tulis ucapan & doa restu Anda untuk kedua mempelai..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                maxLength={300}
                required
                rows={2}
                disabled={loading}
                className="w-full px-3 py-1.5 text-xs rounded-lg border bg-white/60 focus:bg-white focus:outline-none transition-all duration-300 resize-none"
                style={{
                  fontFamily: "'Lora', serif",
                  borderColor: "rgba(204, 155, 63, 0.3)",
                  color: "#5a3e28",
                }}
              />
            </div>
            
            {error && (
              <p className="text-[10px] text-red-600 font-medium" style={{ fontFamily: "'Lora', serif" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim() || !wish.trim()}
              className="btn-gold flex items-center justify-center gap-2 py-1.5 px-4 text-xs rounded-lg transition-all duration-300 disabled:opacity-50"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              <span>{loading ? "Mengirim..." : "Kirim Ucapan"}</span>
              {!loading && <Send size={11} />}
            </button>
          </form>
        </motion.div>

        {/* Wishes List Card */}
        <motion.div
          style={{
            background: "rgba(253, 245, 236, 0.65)",
            border: "1.5px solid rgba(204, 155, 63, 0.2)",
            boxShadow: "0 4px 15px rgba(204, 155, 63, 0.05)",
            borderRadius: "14px",
            padding: "0.85rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 border-b pb-1" style={{ borderColor: "rgba(204, 155, 63, 0.15)" }}>
            <MessageSquare size={13} style={{ color: "#CC9B3F" }} />
            <span className="text-xs font-semibold text-[#5a3e28] uppercase tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ucapan ({wishes.length})
            </span>
          </div>

          <div
            className="overflow-y-auto max-h-[160px] pr-1 flex flex-col gap-1.5 scrollbar-gold"
            style={{ minHeight: "80px" }}
          >
            {fetching ? (
              <div className="flex flex-col items-center justify-center py-6 gap-1">
                <div className="w-5 h-5 border-2 border-[#CC9B3F] border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] text-gray-500 italic" style={{ fontFamily: "'Lora', serif" }}>Memuat ucapan...</span>
              </div>
            ) : wishes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-[10px] text-gray-500 italic" style={{ fontFamily: "'Lora', serif" }}>
                  Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
                </span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {wishes.map((item) => (
                  <motion.div
                    key={item._id}
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(204, 155, 63, 0.15)",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-[#8c6239]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {item.name}
                      </span>
                      <span className="text-[9px] text-gray-400 italic" style={{ fontFamily: "'Lora', serif" }}>
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-[#5a3e28]" style={{ fontFamily: "'Lora', serif" }}>
                      {item.wish}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
