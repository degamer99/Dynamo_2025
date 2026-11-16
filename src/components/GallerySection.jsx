import React, { useState, useEffect, useRef } from 'react';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from 'lucide-react';
import records from '../data/records.json';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('events');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const eventPhotos = records.event_photos.map((e) => ({
    ...e,
    src: `/${e.image}`,
    title: e.caption_as_printed,
    meta: e.date_or_location_as_printed || `Milestone Event Archive`
  }));

  const dinnerHighlights = [
    {
      id: 'd1',
      src: '/images/dinner/dinner_01.jpg',
      title: 'Grand Dinner Arrival & Reception',
      meta: 'Dynamos Graduation Dinner 2025'
    },
    {
      id: 'd2',
      src: '/images/dinner/dinner_02.jpg',
      title: 'Classmates Celebrating & Toasting',
      meta: 'Dynamos Graduation Dinner 2025'
    },
    {
      id: 'd3',
      src: '/images/dinner/dinner_03.jpg',
      title: 'Department Award & Honor Ceremony',
      meta: 'Dynamos Graduation Dinner 2025'
    },
    {
      id: 'd4',
      src: '/images/dinner/dinner_04.jpg',
      title: 'Memorable Moments with Friends',
      meta: 'Dynamos Graduation Dinner 2025'
    },
    {
      id: 'd5',
      src: '/images/dinner/dinner_05.jpg',
      title: 'Dinner Gala Elegance & Glamour',
      meta: 'Dynamos Graduation Dinner 2025'
    },
    {
      id: 'd6',
      src: '/images/dinner/dinner_06.jpg',
      title: 'Balewite Dynamos Class Reunion Salute',
      meta: 'Dynamos Graduation Dinner 2025'
    }
  ];

  const currentGalleryList = activeTab === 'events' ? eventPhotos : dinnerHighlights;

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + currentGalleryList.length) % currentGalleryList.length);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % currentGalleryList.length);
  };

  // Keyboard navigation in Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentGalleryList.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const activePhoto = lightboxIndex !== null ? currentGalleryList[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-white">
            <Camera className="w-3.5 h-3.5 text-copper-400" />
            Visual Archives
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            EVENTS & CELEBRATION <span className="copper-gradient-text">GALLERY</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Reliving the milestones: Induction Ceremony, Sign-Out, Mega Rally, Cultural Week, and the Dynamos Dinner Gala.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-cream-200 p-1.5 border border-stone-300">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-stone-700 hover:text-emerald-950'
              }`}
            >
              Milestone Events (11 Moments)
            </button>
            <button
              onClick={() => setActiveTab('dinner')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'dinner'
                  ? 'bg-copper-500 text-white shadow-sm'
                  : 'text-stone-700 hover:text-emerald-950'
              }`}
            >
              Dynamos Dinner Gala
            </button>
          </div>
        </div>

        {/* Google Drive Album Callout Banner */}
        {activeTab === 'dinner' && (
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-lg border border-copper-400/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-copper-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-copper-400" />
                Complete High-Resolution Photo Vault
              </div>
              <h3 className="text-xl font-serif font-bold">
                Access the Full 208+ Dinner Photos Album on Google Drive
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Browse, download, and preserve raw, uncompressed 4K portraits, group captures, and candid moments from the official graduation dinner.
              </p>
            </div>
            <a
              href="https://drive.google.com/drive/folders/1L45SnLR-wTtN_2EYNQ15MfDXP5_DCxIC"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs sm:text-sm shadow-copper hover:shadow-copper-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Open 208-Photo Album</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGalleryList.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full bg-stone-900 overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/images/cover/page_001_cover.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-300 font-bold block">
                    {item.meta}
                  </span>
                  <h4 className="text-base font-serif font-bold tracking-wide mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Redesigned Exhibition Lightbox Viewer (Full-Bleed Card Frame, Swipeable, Thumbnail Strip) */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-emerald-950/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden border border-copper-400/40 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Viewer Top Header Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-copper-500/20 text-copper-300 border border-copper-400/30 text-[10px] font-mono font-bold uppercase">
                    {lightboxIndex + 1} / {currentGalleryList.length}
                  </span>
                  <span className="text-xs text-stone-400 font-sans truncate max-w-[180px] sm:max-w-sm">
                    {activePhoto.meta}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-copper-500 hover:text-white transition-colors"
                  aria-label="Close gallery viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Photo Stage — Edge-to-Edge Container */}
              <div className="relative w-full h-[54vh] sm:h-[62vh] bg-stone-950 flex items-center justify-center overflow-hidden select-none">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Viewer Bottom Caption & Controls Bar */}
              <div className="p-4 sm:px-6 sm:py-4 bg-stone-900 border-t border-stone-800 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-lg font-serif font-bold text-white truncate">
                      {activePhoto.title}
                    </h4>
                    <p className="text-[11px] text-copper-300 font-sans">
                      Swipe or tap arrows to browse moments
                    </p>
                  </div>

                  {/* Dedicated Prev / Next Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={goToPrev}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-copper-500 text-white border border-stone-700 transition-colors"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white shadow-sm transition-colors"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Filmstrip Thumbnail Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                  {currentGalleryList.map((thumb, tIdx) => (
                    <button
                      key={thumb.id || tIdx}
                      onClick={() => setLightboxIndex(tIdx)}
                      className={`w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        lightboxIndex === tIdx
                          ? 'border-copper-400 scale-105 opacity-100'
                          : 'border-transparent opacity-45 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={thumb.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
