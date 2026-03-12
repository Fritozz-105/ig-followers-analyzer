export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black text-white text-sm tracking-widest font-mono">ZOOCH.IG</span>
        <p className="text-xs text-zinc-700 font-mono">
          Last updated Aug 20, 2025 · Made by{" "}
          <span className="text-cyan-400 font-bold">Zooch</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <p className="text-xs text-zinc-700 font-mono tracking-wider">
            100% LOCAL · ZERO DATA UPLOADED
          </p>
        </div>
      </div>
    </footer>
  );
}
