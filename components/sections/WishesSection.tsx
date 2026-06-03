"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionLabel, GoldOrnamentDivider, fadeUp } from "@/components/ui/Animations";
import { MessageSquare, Send, Heart, X } from "lucide-react";

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

// Simple hash function to generate a slight rotation (-1 to 1 degree)
const getTiltRotation = (id: string) => {
  if (!id) return 0;
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const degrees = (sum % 3) - 1; // -1, 0, or 1
  return degrees * 0.75; // Subtle rotation
};

export default function WishesSection({ slug, guestName }: WishesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" });

  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState(guestName || "");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock/Unlock page snap scrolling when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

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

  const wishesListRef = useRef<HTMLDivElement>(null);

  // Mencegah scroll bubble ke parent agar tidak men-trigger snap scroll halaman
  // ketika sedang men-scroll daftar ucapan (wishes list)
  useEffect(() => {
    const el = wishesListRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (isScrollable) {
        const isScrollingDown = e.deltaY > 0;
        const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;
        const isAtTop = el.scrollTop === 0;

        // Hanya stop propagation jika belum mentok di scroll atas/bawah
        if ((isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop)) {
          e.stopPropagation();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      (el as any).touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (isScrollable) {
        const touchY = e.touches[0].clientY;
        const dy = (el as any).touchStartY - touchY;
        const isScrollingDown = dy > 0;
        const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;
        const isAtTop = el.scrollTop === 0;

        if ((isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop)) {
          e.stopPropagation();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (isScrollable) {
        const touchY = e.changedTouches[0].clientY;
        const dy = (el as any).touchStartY - touchY;
        if (Math.abs(dy) < 10) return; // Ignore tiny touch taps
        const isScrollingDown = dy > 0;
        const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;
        const isAtTop = el.scrollTop === 0;

        if ((isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop)) {
          e.stopPropagation();
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [wishes]);

  return (
    <section
      id="wishes"
      className="section-snap section-px py-4 relative flex flex-col justify-center gap-y-2 h-dvh overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #fcf0e0 40%, #fdf5ec 100%)" }}
    >
      {/* Corner Floral Ornaments (Matching Cover screen corner aesthetic) */}
      <div
        className="absolute top-0 left-0 pointer-events-none w-[120px] h-[120px] opacity-[0.16] select-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none w-[120px] h-[120px] opacity-[0.16] select-none"
        style={{ transform: "rotate(0deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Ambient floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#CC9B3F]"
            style={{
              width: i % 2 === 0 ? "3.5px" : "4.5px",
              height: i % 2 === 0 ? "3.5px" : "4.5px",
              left: `${(i * 13 + 7) % 90}%`,
              bottom: "-20px",
            }}
            animate={{
              y: ["0px", "-110dvh"],
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 7 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div ref={ref} className="text-center mb-1 relative z-10">
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
        
        {/* Wishes Form Card (Frosted Glassmorphism) */}
        <motion.div
          style={{
            background: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1.5px solid rgba(204, 155, 63, 0.28)",
            boxShadow: "0 6px 20px rgba(204, 155, 63, 0.06)",
            borderRadius: "16px",
            padding: "0.95rem",
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, delay: 0.1 }}
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
                className="w-full px-3.5 py-2 text-xs rounded-lg border bg-white/60 focus:bg-white transition-all duration-300 focus:border-[#CC9B3F] focus:ring-2 focus:ring-[#CC9B3F]/15 outline-none"
                style={{
                  fontFamily: "'Lora', serif",
                  borderColor: "rgba(204, 155, 63, 0.25)",
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
                className="w-full px-3.5 py-2 text-xs rounded-lg border bg-white/60 focus:bg-white transition-all duration-300 resize-none focus:border-[#CC9B3F] focus:ring-2 focus:ring-[#CC9B3F]/15 outline-none"
                style={{
                  fontFamily: "'Lora', serif",
                  borderColor: "rgba(204, 155, 63, 0.25)",
                  color: "#5a3e28",
                }}
              />
            </div>
            
            {error && (
              <p className="text-[10px] text-red-600 font-medium" style={{ fontFamily: "'Lora', serif" }}>
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading || !name.trim() || !wish.trim()}
              className="btn-gold flex items-center justify-center gap-2 py-2 px-4 text-xs rounded-lg transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{loading ? "Mengirim..." : "Kirim Ucapan"}</span>
              {!loading && <Send size={11} />}
            </motion.button>
          </form>
        </motion.div>

        {/* Wishes List Card (Frosted Glassmorphism) */}
        <motion.div
          style={{
            background: "rgba(253, 245, 236, 0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1.5px solid rgba(204, 155, 63, 0.24)",
            boxShadow: "0 6px 20px rgba(204, 155, 63, 0.06)",
            borderRadius: "16px",
            padding: "0.95rem",
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 mb-2.5 border-b pb-1.5" style={{ borderColor: "rgba(204, 155, 63, 0.18)" }}>
            <MessageSquare size={13} style={{ color: "#CC9B3F" }} />
            <span className="text-xs font-semibold text-[#5a3e28] uppercase tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ucapan ({wishes.length})
            </span>
          </div>

          <div
            ref={wishesListRef}
            className="overflow-y-auto max-h-[160px] pr-1 flex flex-col gap-2 scrollbar-gold"
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
                    className="p-2.5 rounded-lg shadow-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.88)",
                      border: "1px solid rgba(204, 155, 63, 0.18)",
                      transformOrigin: "center",
                      transform: `rotate(${getTiltRotation(item._id)}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: "spring", stiffness: 90, damping: 12 }}
                    whileHover={{
                      y: -2,
                      scale: 1.015,
                      borderColor: "rgba(204, 155, 63, 0.45)",
                      boxShadow: "0 6px 14px rgba(204, 155, 63, 0.08)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="flex items-center gap-1">
                        <Heart size={8} className="fill-[#CC9B3F] stroke-[#CC9B3F] opacity-75" />
                        <span className="text-xs font-bold text-[#8c6239]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-400 italic" style={{ fontFamily: "'Lora', serif" }}>
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-[10.5px] leading-relaxed text-[#5a3e28] pl-2" style={{ fontFamily: "'Lora', serif" }}>
                      {item.wish}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Trigger Button to show all wishes in modal */}
          {wishes.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-[#CC9B3F]/15 flex justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-[10px] font-bold text-[#CC9B3F] hover:text-[#b5832a] transition-colors duration-200 flex items-center gap-1 cursor-pointer font-heading uppercase tracking-widest"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Lihat Selengkapnya ({wishes.length})
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Lihat Selengkapnya Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-sm max-h-[75vh] flex flex-col relative overflow-hidden"
              style={{
                background: "rgba(253, 245, 236, 0.96)",
                border: "1.5px solid rgba(204, 155, 63, 0.35)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                borderRadius: "20px",
                padding: "1.15rem",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#CC9B3F]/20 mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} style={{ color: "#CC9B3F" }} />
                  <span className="text-xs font-bold text-[#5a3e28] uppercase tracking-wider font-heading" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Semua Ucapan & Doa ({wishes.length})
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#8c6239]"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Modal Body */}
              <div
                className="overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-gold flex-1"
                style={{ maxHeight: "calc(75vh - 110px)" }}
              >
                {wishes.map((item) => (
                  <div
                    key={item._id + "-modal"}
                    className="p-3 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.92)",
                      border: "1px solid rgba(204, 155, 63, 0.2)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="flex items-center gap-1">
                        <Heart size={8} className="fill-[#CC9B3F] stroke-[#CC9B3F] opacity-85" />
                        <span className="text-xs font-bold text-[#8c6239] font-heading" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-400 italic" style={{ fontFamily: "'Lora', serif" }}>
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#5a3e28] pl-2 whitespace-pre-line" style={{ fontFamily: "'Lora', serif" }}>
                      {item.wish}
                    </p>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#CC9B3F]/15 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-gold py-1.5 px-5 text-[10px] rounded-lg transition-all duration-300"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
