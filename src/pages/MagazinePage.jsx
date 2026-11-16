import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Volume2,
  VolumeX,
  Search,
  BookText,
  Clock,
  User,
  FileDown,
  ArrowLeft
} from 'lucide-react';
import magazineArticles from '../data/magazineContent.json';

export default function MagazinePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const articleParam = searchParams.get('article');

  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState(articleParam ? 'article' : 'book'); // 'book' | 'directory' | 'article'
  const [activeArticle, setActiveArticle] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipAnim, setFlipAnim] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (articleParam) {
      const foundIdx = magazineArticles.findIndex((a) => a.id === articleParam);
      if (foundIdx !== -1) {
        setActiveArticle(magazineArticles[foundIdx]);
        setCurrentPage(foundIdx);
        setViewMode('article');
      }
    }
  }, [articleParam]);

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

  const totalPages = magazineArticles.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipAnim('animate-page-next');
      playPageSound();
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
      }, 180);
      setTimeout(() => {
        setFlipAnim('');
        setIsFlipping(false);
      }, 420);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipAnim('animate-page-prev');
      playPageSound();
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
      }, 180);
      setTimeout(() => {
        setFlipAnim('');
        setIsFlipping(false);
      }, 420);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode === 'book') {
        if (e.key === 'ArrowRight') goToNextPage();
        if (e.key === 'ArrowLeft') goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, viewMode, isFlipping]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextPage();
      else goToPrevPage();
    }
  };

  const currentSpreadArticle = magazineArticles[currentPage] || magazineArticles[0];

  const categories = [
    'All',
    'Editorial',
    "Dean's Address",
    "HOD's Address",
    'Valedictory Spotlight',
    'Technical Paper',
    'Faculty Interview',
    'Capstone Project',
    'Goodwill Message'
  ];

  const filteredArticles = magazineArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.rawContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const openFullArticle = (art) => {
    setActiveArticle(art);
    setViewMode('article');
    setSearchParams({ article: art.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Mode Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper-700 hover:text-emerald-950 mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              COMPLETE <span className="copper-gradient-text">MAGAZINE ARCHIVE</span>
            </h1>
            <p className="text-stone-600 text-sm font-sans mt-1">
              All 22 official speeches, research papers, faculty interviews, and capstone reports—unabridged.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex rounded-xl bg-cream-200 p-1 border border-stone-300">
              <button
                onClick={() => {
                  setViewMode('book');
                  setSearchParams({});
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'book'
                    ? 'bg-copper-500 text-white shadow-sm'
                    : 'text-stone-700 hover:text-emerald-950'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>3D Flipbook (22 Spreads)</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('directory');
                  setSearchParams({});
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'directory' || viewMode === 'article'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-stone-700 hover:text-emerald-950'
                }`}
              >
                <BookText className="w-3.5 h-3.5" />
                <span>Editorial Reader</span>
              </button>
            </div>

            {viewMode === 'book' && (
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-xl bg-cream-200 text-stone-700 hover:bg-cream-300 transition-colors"
                title={soundEnabled ? 'Mute page turns' : 'Enable page turn sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-copper-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
              </button>
            )}
          </div>
        </div>

        {/* MODE 1: Complete 22-Page 3D Flipbook */}
        {viewMode === 'book' && (
          <div className="relative">
            {/* Toolbar */}
            <div className="bg-white rounded-t-2xl border-t border-l border-r border-stone-300 p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-stone-800 font-semibold border border-stone-300 transition-colors"
                >
                  <List className="w-3.5 h-3.5 text-copper-600" />
                  <span>Table of Contents</span>
                </button>
                <span className="text-stone-400">|</span>
                <span className="font-semibold text-emerald-950">
                  Spread {currentPage + 1} of {totalPages}
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-copper-100 text-copper-800 text-[10px] font-bold uppercase">
                  {currentSpreadArticle.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openFullArticle(currentSpreadArticle)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 text-white font-semibold hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                >
                  <BookText className="w-3.5 h-3.5 text-copper-400" />
                  <span>Read as Full Page</span>
                </button>
                <a
                  href="/Final_Magazine_2025.pdf"
                  download="The_Dynamos_Magazine_2025.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
              </div>
            </div>

            {/* Table of Contents Dropdown */}
            {tocOpen && (
              <div className="absolute top-14 left-4 z-30 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-stone-300 p-3 space-y-1">
                <div className="text-xs font-bold font-serif text-emerald-950 uppercase tracking-wider pb-2 border-b border-stone-200">
                  Jump to Any Spread (1 – 22)
                </div>
                {magazineArticles.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setCurrentPage(idx);
                      setTocOpen(false);
                      playPageSound();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      currentPage === idx
                        ? 'bg-copper-50 text-copper-800 font-bold border border-copper-200'
                        : 'text-stone-700 hover:bg-cream-100'
                    }`}
                  >
                    <span className="truncate pr-2">{art.title}</span>
                    <span className="text-[10px] text-stone-400 font-mono">#{idx + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {/* 3D Book Stage */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative min-h-[560px] md:min-h-[640px] bg-stone-950 rounded-b-2xl p-4 sm:p-8 md:p-12 flex items-center justify-center overflow-hidden shadow-2xl border-b border-l border-r border-stone-300 select-none"
            >
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-cream-100/90 text-stone-800 hover:bg-white shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Spread"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-cream-100/90 text-stone-800 hover:bg-white shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next Spread"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className={`relative w-full max-w-4xl bg-[#FAF7F0] rounded-xl shadow-book overflow-hidden flex flex-col md:flex-row h-[460px] sm:h-[480px] md:h-[500px] border-2 border-stone-300 transform-style-3d ${flipAnim}`}>
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 bg-gradient-to-r from-stone-400/20 via-stone-500/30 to-stone-400/20 pointer-events-none" />

                {/* Left Page */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 bg-[#FAF7F0] border-b md:border-b-0 md:border-r border-stone-300 flex flex-row md:flex-col items-center md:items-stretch justify-between gap-4 shrink-0">
                  {currentSpreadArticle.image && (
                    <div className="w-24 h-28 sm:w-28 sm:h-32 md:w-full md:h-52 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                      <img
                        src={currentSpreadArticle.image}
                        alt={currentSpreadArticle.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-stone-200 text-[10px] uppercase tracking-wider text-stone-500 font-sans">
                        <span className="hidden sm:inline">THE DYNAMOS • 2025</span>
                        <span className="text-copper-700 font-bold">{currentSpreadArticle.category}</span>
                      </div>

                      <h3 className="mt-2 text-base sm:text-xl md:text-2xl font-serif font-black text-emerald-950 leading-tight line-clamp-2">
                        {currentSpreadArticle.title}
                      </h3>

                      {currentSpreadArticle.author && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-600 font-sans">
                          <User className="w-3.5 h-3.5 text-copper-600 shrink-0" />
                          <span className="font-semibold text-stone-800 truncate">{currentSpreadArticle.author}</span>
                        </div>
                      )}

                      {currentSpreadArticle.quote && (
                        <div className="hidden md:block mt-3 p-3 rounded-lg bg-copper-50/70 border-l-3 border-copper-500 text-stone-800 text-xs italic font-serif leading-relaxed line-clamp-2">
                          “{currentSpreadArticle.quote}”
                        </div>
                      )}
                    </div>

                    <div className="hidden md:block mt-2 text-[10px] text-stone-400 font-mono">
                      — Page {currentPage * 2 + 1} —
                    </div>
                  </div>
                </div>

                {/* Right Page (Clipped Book Page with Fade) */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 bg-[#FAF7F0] flex-1 flex flex-col justify-between overflow-hidden relative">
                  <div className="relative flex-1 overflow-hidden space-y-2.5 text-stone-800 text-xs sm:text-sm font-sans leading-relaxed">
                    {currentSpreadArticle.rawContent
                      .split(/\r?\n\r?\n/)
                      .filter((para) => !para.startsWith('#') && !para.startsWith('>') && !para.startsWith('![['))
                      .slice(0, 4)
                      .map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className={
                            pIdx === 0
                              ? 'first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:text-copper-700 first-letter:mr-1'
                              : ''
                          }
                        >
                          {para.replace(/\*\*/g, '')}
                        </p>
                      ))}

                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent pointer-events-none" />
                  </div>

                  <div className="pt-3 mt-1 border-t border-stone-200/90 flex items-center justify-between text-[11px] text-stone-500 font-sans shrink-0 relative z-10 bg-[#FAF7F0]">
                    <button
                      onClick={() => openFullArticle(currentSpreadArticle)}
                      className="px-3 py-1.5 rounded-lg bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <BookText className="w-3.5 h-3.5" />
                      <span>Read Full Article Page</span>
                    </button>
                    <div className="font-mono text-stone-400">— Page {currentPage * 2 + 2} —</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrub Bar */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-xs font-semibold text-stone-500">1</span>
              <input
                type="range"
                min="0"
                max={totalPages - 1}
                value={currentPage}
                onChange={(e) => {
                  setCurrentPage(parseInt(e.target.value));
                  playPageSound();
                }}
                className="w-48 sm:w-72 h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-copper-500"
              />
              <span className="text-xs font-semibold text-stone-500">{totalPages}</span>
            </div>
          </div>
        )}

        {/* MODE 2: Editorial Directory Grid */}
        {viewMode === 'directory' && (
          <div className="space-y-8">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-950 text-white shadow-sm'
                        : 'bg-cream-100 text-stone-700 hover:bg-cream-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles, speeches, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-cream-50 border border-stone-300 focus:outline-none focus:border-copper-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => openFullArticle(art)}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md hover:border-copper-400 transition-all flex flex-col justify-between group"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2 text-xs font-sans text-stone-500 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-copper-50 text-copper-800 border border-copper-200 font-bold uppercase text-[10px]">
                        {art.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {art.readingTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-emerald-950 group-hover:text-copper-600 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    {art.author && (
                      <p className="mt-2 text-xs font-semibold text-stone-700 font-sans">
                        By {art.author}
                      </p>
                    )}

                    {art.quote && (
                      <p className="mt-4 p-3 rounded-lg bg-cream-100 border-l-2 border-copper-500 text-xs italic text-stone-700">
                        “{art.quote}”
                      </p>
                    )}

                    <p className="mt-4 text-xs sm:text-sm text-stone-600 font-sans line-clamp-3 leading-relaxed">
                      {art.rawContent.replace(/[#*`>]/g, '').slice(0, 240)}...
                    </p>
                  </div>

                  <div className="px-6 py-4 bg-cream-50/70 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-copper-700 group-hover:text-copper-800 flex items-center gap-1.5">
                      <BookText className="w-3.5 h-3.5" />
                      Read Full Unabridged Article →
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {art.wordCount} words
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: Single Full-Page Un-Truncated Editorial Article View */}
        {viewMode === 'article' && activeArticle && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
            {/* Top Bar */}
            <div className="px-6 sm:px-10 py-4 bg-cream-50 border-b border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setViewMode('directory');
                  setSearchParams({});
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-copper-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All 22 Articles</span>
              </button>

              <button
                onClick={() => {
                  const idx = magazineArticles.findIndex((m) => m.id === activeArticle.id);
                  if (idx !== -1) setCurrentPage(idx);
                  setViewMode('book');
                  setSearchParams({});
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-700 hover:text-copper-800"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View in 3D Book</span>
              </button>
            </div>

            {/* Full Editorial Header */}
            <div className="p-6 sm:p-12">
              <div className="flex items-center gap-3 text-xs font-sans text-stone-500 mb-4">
                <span className="px-3 py-1 rounded-md bg-copper-100 text-copper-800 font-bold uppercase text-[11px]">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span>{activeArticle.readingTime}</span>
                <span>•</span>
                <span>{activeArticle.wordCount} words</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-emerald-950 leading-tight">
                {activeArticle.title}
              </h2>

              {activeArticle.author && (
                <div className="mt-4 flex items-center gap-2.5 text-sm font-sans text-stone-700 pb-6 border-b border-stone-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 text-copper-300 flex items-center justify-center font-serif font-bold text-xs">
                    {activeArticle.author.charAt(0)}
                  </div>
                  <span className="font-bold text-emerald-950">{activeArticle.author}</span>
                </div>
              )}

              {activeArticle.image && (
                <figure className="my-8 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-sm">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full max-h-[480px] object-contain mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </figure>
              )}

              {activeArticle.quote && (
                <blockquote className="my-8 p-6 rounded-2xl bg-cream-100 border-l-4 border-copper-500 font-serif italic text-base sm:text-lg text-emerald-950 leading-relaxed">
                  “{activeArticle.quote}”
                </blockquote>
              )}

              {/* Complete Un-truncated Body Text */}
              <div className="mt-6 space-y-5 text-stone-800 text-base sm:text-lg font-sans leading-relaxed">
                {activeArticle.rawContent
                  .split(/\r?\n\r?\n/)
                  .filter((para) => !para.startsWith('#') && !para.startsWith('>') && !para.startsWith('![['))
                  .map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-copper-700 first-letter:mr-1.5'
                          : ''
                      }
                    >
                      {para.replace(/\*\*/g, '')}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
