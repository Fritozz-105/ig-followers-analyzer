"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MoveRight, ShieldCheck } from "lucide-react";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
}

function createBeam(width: number, height: number, layer: number): Beam {
  const angle = -35 + Math.random() * 10;
  const baseSpeed = 0.2 + layer * 0.2;
  const baseOpacity = 0.08 + layer * 0.05;
  const baseWidth = 10 + layer * 5;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
  };
}

interface HeroProps {
  onGetStarted?: () => void;
}

export const PremiumHero = ({ onGetStarted }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [titleNumber, setTitleNumber] = useState(0);

  const LAYERS = 3;
  const BEAMS_PER_LAYER = 8;

  const titles = ["analyzed", "decoded", "visualized", "mapped", "revealed"];
  const titlesLength = titles.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseRef.current;
    if (!canvas || !noiseCanvas) return;
    const ctx = canvas.getContext("2d");
    const nCtx = noiseCanvas.getContext("2d");
    if (!ctx || !nCtx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      noiseCanvas.width = window.innerWidth * dpr;
      noiseCanvas.height = window.innerHeight * dpr;
      noiseCanvas.style.width = `${window.innerWidth}px`;
      noiseCanvas.style.height = `${window.innerHeight}px`;
      nCtx.setTransform(1, 0, 0, 1, 0, 0);
      nCtx.scale(dpr, dpr);

      beamsRef.current = [];
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(createBeam(window.innerWidth, window.innerHeight, layer));
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const generateNoise = () => {
      const imgData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.random() * 255;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 12;
      }
      nCtx.putImageData(imgData, 0, 0);
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4));
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `rgba(0,255,255,0)`);
      gradient.addColorStop(0.2, `rgba(0,255,255,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(0,255,255,${pulsingOpacity})`);
      gradient.addColorStop(0.8, `rgba(0,255,255,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(0,255,255,0)`);

      ctx.fillStyle = gradient;
      ctx.filter = `blur(${2 + beam.layer * 2}px)`;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const bgGradient = ctx.createLinearGradient(0, 0, 0, vh);
      bgGradient.addColorStop(0, "#050505");
      bgGradient.addColorStop(1, "#111111");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, vw, vh);

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5);
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -50) {
          beam.y = window.innerHeight + 50;
          beam.x = Math.random() * window.innerWidth;
        }
        drawBeam(beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    generateNoise();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % titlesLength);
    }, 2500);
    return () => clearInterval(interval);
  }, [titlesLength]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas ref={noiseRef} className="absolute inset-0 z-0 pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      <div className="relative z-20 flex h-screen w-full items-center justify-center px-6 text-center">
        <div className="container mx-auto flex flex-col items-center gap-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-mono tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            100% PRIVATE — ZERO DATA UPLOADED
          </div>

          <h1 className="text-6xl md:text-8xl max-w-3xl tracking-tighter font-black leading-none">
            <span className="text-white">Your Instagram,</span>
            <span className="relative flex w-full justify-center overflow-hidden pb-4 pt-2">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-black text-cyan-400"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-zinc-500 max-w-lg text-center font-mono">
            Discover who doesn&apos;t follow you back, find mutual connections, and understand your
            network. Everything runs locally — nothing is uploaded.
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 bg-cyan-400 text-black px-7 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Upload Instagram Data
            <MoveRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              No signup required
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Runs in your browser
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Free forever
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-zinc-600 font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"></div>
      </div>
    </div>
  );
};
