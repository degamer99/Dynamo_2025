import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  User,
  ArrowRight,
  BookText
} from 'lucide-react';
import magazineArticles from '../data/magazineContent.json';

export default function MagazineReader() {
  // Hierarchy order: 1. Dean's Speech, 2. HOD's Speech, 3. Best Graduating Student Speech
  const featuredIndices = [1, 2, 3];
  const featuredArticles = featuredIndices
    .map((idx) => magazineArticles[idx])
    .filter(Boolean);

  const [currentSpread, setCurrentSpread] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flipAnim, setFlipAnim] = useState('');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const playPageSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.08;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.2;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch (e) {}
  };

  const totalSpreads = featuredArticles.length;

  const triggerSpreadChange = (targetIdx, direction) => {
    if (targetIdx === currentSpread || flipAnim) return;
    setFlipAnim(direction === 'next' ? 'animate-page-next' : 'animate-page-prev');
    playPageSound();
    setTimeout(() => {
      setCurrentSpread(targetIdx);
    }, 180);
    setTimeout(() => {
      setFlipAnim('');
    }, 420);
  };

  const goToNext = () => {
    if (currentSpread < totalSpreads - 1) {
      triggerSpreadChange(currentSpread + 1, 'next');
    }
  };

  const goToPrev = () => {
    if (currentSpread > 0) {
      triggerSpreadChange(currentSpread - 1, 'prev');
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const currentArticle = featuredArticles[currentSpread] || featuredArticles[0];

  const spreadLabels = [
    "1. Dean's Address",
    "2. HOD's Address",
    "3. Best Graduating Student"
  ];

  // Extract clean paragraphs for the clipped page preview
  const paragraphs = currentArticle.rawContent
    .split(/\r?\n\r?\n/)
    .filter((para) => !para.startsWith('#') && !para.startsWith('>') && !para.startsWith('![['))
    .map((para) => para.replace(/\*\*/g, ''));

  return (
    <section id="reader" className="py-14 md:py-24 bg-stone-950 text-white border-b border-stone-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-copper-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#c67145_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-400 mb-1.5">
              Featured Keynote Speeches • 3D Preview
            </p>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight">
              THE 3D <span className="copper-gradient-text">MAGAZINE SHOWCASE</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {spreadLabels.map((label, idx) => (
              <button
                key={label}
                onClick={() => triggerSpreadChange(idx, idx > currentSpread ? 'next' : 'prev')}
                className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                  currentSpread === idx
                    ? 'bg-copper-500 text-white shadow-copper'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              title={soundEnabled ? 'Mute page sound' : 'Unmute page sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-copper-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* The 3D Book Stage — Contained cleanly within the screen height with clipped text */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative py-2 flex items-center justify-center select-none perspective-1500"
        >
          <button
            onClick={goToPrev}
            disabled={currentSpread === 0}
            className="absolute left-0 sm:left-2 z-20 p-2.5 sm:p-3.5 rounded-full bg-stone-800/90 text-white hover:bg-copper-500 shadow-xl disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Previous Spread"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentSpread === totalSpreads - 1}
            className="absolute right-0 sm:right-2 z-20 p-2.5 sm:p-3.5 rounded-full bg-stone-800/90 text-white hover:bg-copper-500 shadow-xl disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Next Spread"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bounded Cream Book Object (#FAF7F0) — Never overflows screen height, no internal scrollbars */}
          <div
            className={`relative w-full max-w-4xl bg-[#FAF7F0] text-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[460px] sm:h-[480px] md:h-[490px] border-2 border-stone-300 transform-style-3d ${flipAnim}`}
          >
            {/* Center Spine Shadow (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 bg-gradient-to-r from-stone-400/25 via-stone-700/35 to-stone-400/25 pointer-events-none" />

            {/* Top Page / Left Page: Portrait + Header */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 bg-[#FAF7F0] border-b md:border-b-0 md:border-r border-stone-300/90 flex flex-row md:flex-col items-center md:items-stretch justify-between gap-4 shrink-0">
              {/* Portrait Image */}
              {currentArticle.image && (
                <div className="w-24 h-28 sm:w-28 sm:h-32 md:w-full md:h-52 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                  <img
                    src={currentArticle.image}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Title & Author Meta */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-200 text-[10px] uppercase tracking-wider text-stone-500 font-sans">
                    <span className="hidden sm:inline">THE DYNAMOS • 2025</span>
                    <span className="text-copper-700 font-bold">{currentArticle.category}</span>
                  </div>

                  <h3 className="mt-2 text-base sm:text-xl md:text-2xl font-serif font-black text-emerald-950 leading-tight line-clamp-2">
                    {currentArticle.title}
                  </h3>

                  {currentArticle.author && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-600 font-sans">
                      <User className="w-3.5 h-3.5 text-copper-600 shrink-0" />
                      <span className="font-semibold text-stone-800 truncate">{currentArticle.author}</span>
                    </div>
                  )}

                  {currentArticle.quote && (
                    <p className="hidden md:block mt-3 p-3 rounded-lg bg-copper-50/80 border-l-3 border-copper-500 text-stone-800 text-xs italic font-serif leading-relaxed line-clamp-2">
                      “{currentArticle.quote}”
                    </p>
                  )}
                </div>

                <div className="hidden md:block mt-2 text-[10px] text-stone-400 font-mono">
                  — Spread {currentSpread + 1} of {totalSpreads} —
                </div>
              </div>
            </div>

            {/* Bottom Page / Right Page: Clipped Book Excerpt with Fade & Read Full Link */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 bg-[#FAF7F0] flex-1 flex flex-col justify-between overflow-hidden relative">
              {/* Clipped Text Body (no scrolling inside the book) */}
              <div className="relative flex-1 overflow-hidden space-y-2.5 text-stone-800 text-xs sm:text-sm font-sans leading-relaxed">
                {paragraphs.slice(0, 4).map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? 'first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:text-copper-700 first-letter:mr-1'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}

                {/* Paper Clipping Fade at Bottom of Page */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent pointer-events-none" />
              </div>

              {/* Book Page Footer */}
              <div className="pt-3 mt-1 border-t border-stone-200/90 flex items-center justify-between text-xs font-sans shrink-0 relative z-10 bg-[#FAF7F0]">
                <Link
                  to={`/magazine?article=${currentArticle.id}`}
                  className="px-3 py-1.5 rounded-lg bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <BookText className="w-3.5 h-3.5" />
                  <span>Read Full Speech</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <span className="font-mono text-stone-400 text-[11px]">
                  Page {currentSpread * 2 + 2} • {currentArticle.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-serif font-bold text-white">
              Explore all 22 speeches, faculty interviews, and technical papers
            </h4>
            <p className="text-xs text-stone-400 font-sans">
              Open the dedicated Magazine Reader for the complete 22-spread flipbook and unabridged articles.
            </p>
          </div>

          <Link
            to="/magazine"
            className="px-5 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs sm:text-sm shadow-copper transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Complete 22-Article Edition</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
