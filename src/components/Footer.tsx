export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-2 text-gray-300 text-sm font-mono tracking-wide">
            Last updated: August 20, 2025
          </p>
          <p className="text-white font-semibold tracking-wider">
            Made by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-lg">
              Zooch
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
