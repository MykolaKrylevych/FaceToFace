import React, { useEffect, useState } from "react";
import Logo from "../LogoUa";

const LandingPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setPwaInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setPwaInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0d0b1a] text-white px-6 py-16 overflow-hidden">

      {/* 🌌 Subtle background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* ✨ Dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      {/* 🪶 Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        
        {/* Logo */}
        <div className="relative mb-12">
          <Logo className="w-36 h-36 sm:w-44 sm:h-44" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 mb-6">
          Card Swipe
        </h1>

        {/* Description */}
        <p className="text-gray-300/80 sm:text-lg leading-relaxed mb-12 px-2">
          Reflect. Connect. Swipe through conversations with yourself and others.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center px-2">
          {deferredPrompt && !pwaInstalled && (
            <button
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg shadow-sm hover:bg-white/20 hover:shadow-md transition-all duration-300"
            >
              Install App
            </button>
          )}

          <a
            href="/app"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
          >
            Open Web App
          </a>
        </div>

        {/* Low emphasis link */}
        <a
          href="/admin"
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300 mb-8"
        >
          Manage
        </a>

        {/* Footer */}
        <footer className="text-sm text-gray-400/70">
          © {new Date().getFullYear()} Card Swipe App.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
