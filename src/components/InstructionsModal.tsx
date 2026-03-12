"use client";

import { useState, useEffect } from "react";
import { modalContent } from "@/data/modalContent";
import { ShieldCheck, AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setCountdown(2);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          onClick={canClose ? onClose : undefined}
        />

        {/* Modal */}
        <div className="relative bg-[#111113] border border-white/[0.08] rounded-xl shadow-2xl max-w-2xl w-full mx-4">
          {/* Close button (only when canClose) */}
          {canClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-mono text-zinc-600 tracking-widest mb-3">— INSTRUCTIONS —</p>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                {modalContent.header.title}
              </h2>
              <p className="text-zinc-600 text-xs font-mono">{modalContent.header.subtitle}</p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-bold text-emerald-400 text-xs tracking-wide">
                  {modalContent.privacyNotice.title.toUpperCase()}
                </span>
              </div>
              <p className="text-zinc-500 text-xs font-mono leading-relaxed pl-6">
                {modalContent.privacyNotice.description}
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-1 mb-6">
              <p className="text-xs font-mono text-zinc-600 tracking-widest mb-4">
                {modalContent.instructions.title.toUpperCase()}
              </p>

              <div className="space-y-3">
                {modalContent.instructions.steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 font-black text-xs">{step.id}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-zinc-300 text-xs tracking-wide mb-0.5">
                        {step.title.toUpperCase()}
                      </h4>
                      <p className="text-zinc-600 text-xs font-mono leading-relaxed">
                        {step.description}
                        {step.codeSnippets && (
                          <>
                            {" "}
                            {step.codeSnippets.map((snippet, index) => (
                              <span key={snippet}>
                                <code className="bg-white/[0.04] border border-white/[0.07] px-1.5 py-0.5 rounded text-cyan-400 font-mono">
                                  {snippet}
                                </code>
                                {index < step.codeSnippets!.length - 1 && " and "}
                              </span>
                            ))}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mb-7">
              <div className="flex items-center gap-2.5 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-bold text-amber-400 text-xs tracking-wide">
                  {modalContent.warning.title.toUpperCase()}
                </span>
              </div>
              <p className="text-zinc-500 text-xs font-mono leading-relaxed pl-6">
                {modalContent.warning.description}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={!canClose}
              className="w-full bg-cyan-400 text-black py-3 px-6 rounded-lg font-bold text-xs tracking-widest hover:bg-cyan-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {!canClose ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {modalContent.buttons.waiting} ({countdown}s)
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {modalContent.buttons.ready.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
