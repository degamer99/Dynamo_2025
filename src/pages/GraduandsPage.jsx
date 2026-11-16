import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Mail, Copy, Check, X, ChevronLeft, ChevronRight, User, ArrowLeft } from 'lucide-react';
import graduands from '../data/graduands.json';

export default function GraduandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [activeGraduand, setActiveGraduand] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredGraduands = graduands.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      g.name.toLowerCase().includes(q) ||
      (g.email && g.email.toLowerCase().includes(q)) ||
      (g.phone && g.phone.includes(q));
    const matchesLetter =
      selectedLetter === 'ALL' || g.name.trim().toUpperCase().startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const currentIndex = activeGraduand
    ? graduands.findIndex((g) => g.id === activeGraduand.id)
    : -1;

  const handleNextGraduand = () => {
    if (currentIndex < graduands.length - 1) {
      setActiveGraduand(graduands[currentIndex + 1]);
    }
  };

  const handlePrevGraduand = () => {
    if (currentIndex > 0) {
      setActiveGraduand(graduands[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeGraduand) return;
      if (e.key === 'Escape') setActiveGraduand(null);
      if (e.key === 'ArrowRight') handleNextGraduand();
      if (e.key === 'ArrowLeft') handlePrevGraduand();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGraduand]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200 gap-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper-700 hover:text-emerald-950 mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              THE 154 <span className="copper-gradient-text">BALEWITE GRADUANDS</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1">
              Complete directory of the Class of 2025 Electrical & Electronics Engineering Graduating Set.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm rounded-xl bg-cream-50 border border-stone-300 focus:outline-none focus:border-copper-500 shadow-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* A-Z Quick Filter */}
        <div className="flex flex-wrap items-center gap-1 mb-6 pb-4 border-b border-stone-100">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                selectedLetter === letter
                  ? 'bg-emerald-950 text-white'
                  : 'bg-cream-100 text-stone-600 hover:bg-cream-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Count Info */}
        <div className="mb-6 flex items-center justify-between text-xs text-stone-500 font-sans">
          <span>
            Showing <strong className="text-emerald-950 font-bold">{filteredGraduands.length}</strong> of{' '}
            {graduands.length} Graduating Engineers
          </span>
          <span className="text-[11px] text-copper-700 italic">
            Click any portrait to view full contact card
          </span>
        </div>

        {/* Full 154 Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredGraduands.map((g) => (
            <div
              key={g.id}
              onClick={() => setActiveGraduand(g)}
              className="group cursor-pointer bg-cream-50 rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md hover:border-copper-400 transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
                <img
                  src={g.image}
                  alt={g.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/atbu_crest.png';
                    e.target.className = 'w-1/2 h-1/2 m-auto object-contain p-4 opacity-50';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[10px] text-white font-semibold flex items-center gap-1">
                    <User className="w-3 h-3 text-copper-400" />
                    View Contact
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-white">
                <h4 className="text-[11px] font-bold text-emerald-950 truncate uppercase group-hover:text-copper-700 transition-colors">
                  {g.name}
                </h4>
                <div className="text-[9px] text-stone-400 font-mono">
                  p.{g.source_page || 1} • EEE ’25
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGraduands.length === 0 && (
          <div className="text-center py-16 bg-cream-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No graduand found matching your filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter('ALL');
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-copper-500 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeGraduand && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveGraduand(null)}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGraduand(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevGraduand}
                disabled={currentIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 text-stone-800 hover:bg-white shadow-md disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextGraduand}
                disabled={currentIndex === graduands.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 text-stone-800 hover:bg-white shadow-md disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="h-72 sm:h-80 w-full bg-stone-950 relative">
                <img
                  src={activeGraduand.image}
                  alt={activeGraduand.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-400 font-bold">
                    ATBU EEE CLASS OF 2025 • #{currentIndex + 1} OF 154
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight mt-0.5">
                    {activeGraduand.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 font-sans bg-cream-50">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Phone Number</div>
                      <div className="text-xs sm:text-sm font-semibold text-stone-800">
                        {activeGraduand.phone || 'Not listed'}
                      </div>
                    </div>
                  </div>
                  {activeGraduand.phone && (
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${activeGraduand.phone}`}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-900 text-white text-[11px] font-semibold"
                      >
                        Call
                      </a>
                      <button
                        onClick={() => handleCopy(activeGraduand.phone, 'phone')}
                        className="p-1.5 rounded-lg border border-stone-300 text-stone-600"
                      >
                        {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-copper-50 text-copper-700 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Email Address</div>
                      <div className="text-xs sm:text-sm font-semibold text-stone-800 truncate">
                        {activeGraduand.email || 'Not listed'}
                      </div>
                    </div>
                  </div>
                  {activeGraduand.email && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`mailto:${activeGraduand.email}`}
                        className="px-2.5 py-1.5 rounded-lg bg-copper-600 text-white text-[11px] font-semibold"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => handleCopy(activeGraduand.email, 'email')}
                        className="p-1.5 rounded-lg border border-stone-300 text-stone-600"
                      >
                        {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
