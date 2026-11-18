import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, Download, Sparkles, X, Smartphone } from "lucide-react";

export default function OfflineIndicator({ onInstallApp, canInstall }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineBackToast, setShowOnlineBackToast] = useState(false);
  const [dismissInstallBanner, setDismissInstallBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineBackToast(true);
      setTimeout(() => setShowOnlineBackToast(false), 4500);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline Alert Strip (Visible when device disconnects from internet) */}
      {!isOnline && (
        <aside aria-label="Offline Mode Notice" className="sticky top-0 z-50 bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#7f1d1d] text-white px-4 py-2 text-xs shadow-xl flex items-center justify-between border-b border-[#ffd700]/50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-4 h-4 text-[#ffd700] animate-pulse shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-black text-[#ffd700]">OFFLINE MODE ACTIVE:</span>
              <span className="text-white/90">
                You can continue punching attendance, logging tasks, and viewing dashboards offline. Your data is stored securely and will synchronize automatically.
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Connection Restored Toast */}
      {showOnlineBackToast && (
        <div className="fixed top-16 right-4 z-50 bg-[#0c1a12] border-2 border-emerald-500/60 text-emerald-300 px-4 py-2.5 rounded-2xl shadow-2xl text-xs flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <Wifi className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Online Connection Restored — Data Synchronized</span>
        </div>
      )}

      {/* Floating Install App Banner for Mobile Users */}
      {canInstall && !dismissInstallBanner && (
        <aside aria-label="Install App Notice" className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-[#0d0d16]/95 backdrop-blur-xl border-2 border-[#ffd700]/50 rounded-3xl p-3.5 shadow-2xl flex items-center justify-between gap-3 glow-red-sm animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-[#dc2626] to-[#ffd700] shadow shrink-0">
              <img src="./sarlayash_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                <span>Install SarlaYash App</span>
                <span className="px-1.5 py-0.2 rounded bg-[#dc2626] text-white text-[9px] font-black uppercase">PWA</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Install on your phone for 1-tap offline punch & dashboard access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onInstallApp}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:brightness-110 text-white font-black text-xs shadow flex items-center gap-1 border border-red-400/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setDismissInstallBanner(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
