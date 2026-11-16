import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MagazinePage from './pages/MagazinePage';
import GraduandsPage from './pages/GraduandsPage';
import StaffPage from './pages/StaffPage';
import CommitteesPage from './pages/CommitteesPage';
import { WifiOff, Smartphone, X } from 'lucide-react';

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInstallToast, setShowInstallToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallToast(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Auto-dismiss PWA toast after 3.5 seconds so it is never intrusive
  useEffect(() => {
    if (!showInstallToast) return;
    const timer = setTimeout(() => {
      setShowInstallToast(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showInstallToast]);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallToast(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream-100 text-stone-800 flex flex-col font-sans selection:bg-copper-200 selection:text-emerald-950">
        
        {/* Offline Status Ribbon */}
        {isOffline && (
          <div className="bg-amber-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
            <WifiOff className="w-3.5 h-3.5" />
            <span>You are currently offline. Cached magazine pages and directories remain available.</span>
          </div>
        )}

        {/* Brief 3.5-Second Non-Intrusive PWA Toast */}
        {deferredPrompt && showInstallToast && (
          <div className="fixed bottom-4 right-4 z-50 bg-emerald-950/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-xl border border-copper-400/40 flex items-center gap-3 text-xs">
            <Smartphone className="w-4 h-4 text-copper-400 shrink-0" />
            <span>Install app for offline reading</span>
            <button
              onClick={handleInstallPwa}
              className="px-2.5 py-1 rounded-md bg-copper-500 hover:bg-copper-600 text-white font-bold"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallToast(false)}
              className="text-stone-400 hover:text-white"
              aria-label="Close toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Header */}
        <Navbar
          deferredPrompt={deferredPrompt}
          onInstallPwa={handleInstallPwa}
        />

        {/* Multi-Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/magazine" element={<MagazinePage />} />
            <Route path="/graduands" element={<GraduandsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/committees" element={<CommitteesPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
