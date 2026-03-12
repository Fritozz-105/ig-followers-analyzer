"use client";

import { useState, useEffect, useRef } from "react";
import FileUpload from "@/components/FileUpload";
import Results from "@/components/Results";
import InstructionsModal from "@/components/InstructionsModal";
import { PremiumHero } from "@/components/ui/hero";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { howItWorksSteps } from "@/data/howItWorks";
import { cn } from "@/lib/utils";

export default function Home() {
  const [data, setData] = useState<{ followers: string[]; following: string[] } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("ig-analyzer-visited");
    if (!hasVisited) {
      setShowModal(true);
    }
  }, []);

  const handleDataParsed = (parsedData: { followers: string[]; following: string[] }) => {
    setData(parsedData);
  };

  const handleReset = () => {
    setData(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    localStorage.setItem("ig-analyzer-visited", "true");
  };

  const handleGetStarted = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <InstructionsModal isOpen={showModal} onClose={handleModalClose} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-white text-sm tracking-widest font-mono">ZOOCH.IG</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors font-mono tracking-widest cursor-pointer"
          >
            HOW TO EXPORT
          </button>
        </div>
      </nav>

      {!data ? (
        <div className="bg-[#09090b] min-h-screen">
          {/* Hero */}
          <PremiumHero onGetStarted={handleGetStarted} />

          {/* Upload Section */}
          <div ref={uploadRef} className="relative py-28 px-4 overflow-hidden">
            <AnimatedGridPattern
              numSquares={40}
              maxOpacity={0.04}
              duration={4}
              className={cn(
                "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-0 h-full text-zinc-700"
              )}
            />
            <div className="relative z-10 max-w-md mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-mono text-zinc-600 tracking-widest mb-3">— STEP 01 —</p>
                <h2 className="text-3xl font-black text-white tracking-tight">Upload Your ZIP</h2>
                <p className="text-zinc-600 text-xs mt-3 font-mono leading-relaxed">
                  Drop in the export file from Instagram — we handle the rest.
                </p>
              </div>
              <FileUpload onDataParsed={handleDataParsed} />
            </div>
          </div>

          {/* How It Works */}
          <div className="relative py-28 px-4 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-xs font-mono text-zinc-600 tracking-widest mb-3">— PROCESS —</p>
                <h2 className="text-3xl font-black text-white tracking-tight">How It Works</h2>
                <p className="text-zinc-600 text-xs mt-3 font-mono">
                  Three steps. No account needed. Nothing uploaded.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05] rounded-xl overflow-hidden">
                {howItWorksSteps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-[#09090b] p-8 hover:bg-[#0d0d0f] transition-colors group"
                  >
                    <p className="text-xs font-mono text-cyan-400 tracking-widest mb-5 group-hover:text-cyan-300 transition-colors">
                      0{step.id}
                    </p>
                    <h4 className="font-bold text-white text-base mb-3 tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-zinc-600 text-xs leading-relaxed font-mono">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#09090b] min-h-screen pt-14">
          <Results followers={data.followers} following={data.following} onReset={handleReset} />
        </div>
      )}
    </>
  );
}
