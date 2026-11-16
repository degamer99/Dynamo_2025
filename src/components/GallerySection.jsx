import React, { useState } from 'react';
import { Camera, Calendar, MapPin, ExternalLink, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import records from '../data/records.json';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('events');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const eventPhotos = records.event_photos.map((e) => ({
    ...e,
    src: `/${e.image}`,
    title: e.caption_as_printed,
    meta: e.date_or_location_as_printed || `Page ${e.source_page} Archive`
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
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-stone-700 hover:text-emerald-950'
              }`}
            >
              Milestone Events (11 Moments)
            </button>
            <button
              onClick={() => setActiveTab('dinner')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
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

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGalleryList.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="h-64 sm:h-72 w-full bg-stone-900 overflow-hidden relative">
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

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-300 font-bold block">
                    {item.meta}
                  </span>
                  <h4 className="text-base font-serif font-bold tracking-wide mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-copper-400"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next */}
              <button
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev - 1 + currentGalleryList.length) % currentGalleryList.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev + 1) % currentGalleryList.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <img
                src={currentGalleryList[lightboxIndex].src}
                alt={currentGalleryList[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />

              {/* Caption */}
              <div className="mt-4 text-center text-white space-y-1">
                <h4 className="text-lg font-serif font-bold">
                  {currentGalleryList[lightboxIndex].title}
                </h4>
                <p className="text-xs text-stone-300 font-sans">
                  {currentGalleryList[lightboxIndex].meta}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
