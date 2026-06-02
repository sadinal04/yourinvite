"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  speed: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: "circle" | "diamond" | "star";
}

const GOLD_COLORS = [
  "rgba(204, 155, 63, ",
  "rgba(224, 185, 106, ",
  "rgba(181, 131, 42, ",
  "rgba(245, 230, 200, ",
  "rgba(255, 215, 100, ",
];

function createParticle(width: number): Particle {
  const colors = GOLD_COLORS;
  return {
    x: Math.random() * width,
    y: Math.random() * window.innerHeight + window.innerHeight,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(Math.random() * 0.8 + 0.3),
    radius: Math.random() * 3 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    speed: Math.random() * 0.5 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
    type: (["circle", "diamond", "star"] as const)[
      Math.floor(Math.random() * 3)
    ],
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = `${p.color}${p.opacity})`;

  if (p.type === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    ctx.fill();
    // Glow
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 3);
    grad.addColorStop(0, `${p.color}0.3)`);
    grad.addColorStop(1, `${p.color}0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius * 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.type === "diamond") {
    const s = p.radius * 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.6, 0);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.6, 0);
    ctx.closePath();
    ctx.fill();
  } else if (p.type === "star") {
    const outer = p.radius * 1.5;
    const inner = p.radius * 0.6;
    const spikes = 4;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const angle = (i * Math.PI) / spikes;
      if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const count = 28;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width)
    );
    // Spread initial y positions
    particlesRef.current.forEach((p, i) => {
      p.y = (i / count) * window.innerHeight * 2;
    });

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));

        // Gently waver horizontally
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx));

        // Reset when off top
        if (p.y < -20) {
          const reset = createParticle(canvas.width);
          reset.y = canvas.height + 20;
          Object.assign(p, reset);
        }
        // Wrap horizontally
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        drawParticle(ctx, p);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "multiply" }}
      aria-hidden="true"
    />
  );
}
