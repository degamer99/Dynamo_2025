import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Copy, Check, X, User, ArrowRight, Users, Award } from 'lucide-react';
import graduands from '../data/graduands.json';

export default function GraduandsWall() {
  const [activeGraduand, setActiveGraduand] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  // Curated 11 specific graduands requested by user (+ 12th Explore card = complete 12-item grid)
  const curatedIds = [
    'graduand_001', // ABDULLIADI ABDULBAKI (Best Graduating Student)
    'graduand_083', // AFOLABI WASIU OPEYEMI (Abdul Wasiu Afolabi)
    'graduand_097', // ABDULGAFAR SALIU (Abdul Gafar)
    'graduand_108', // YUSUF HIKMAT OYINDAMOLA (Hikma)
    'graduand_104', // ABDULRAZAQ HAFSAH (Abdul Razak Hafsa)
    'graduand_010', // MARYAM YAKUBU IDRIS (Mariam)
    'graduand_150', // ABDULRAZAQ ABDULHAFEEZ (Abdul Razak Abdul Hafiz)
    'graduand_011', // ABDULSALAM HABIB (Habib)
    'graduand_133', // ABDULHAFIZ MUHIDEEN
    'graduand_075', // MUHAMMAD SHAFIU SAMINU
    'graduand_067', // FARUK ABDULKADIR WAZIRI
  ];

  const spotlightGraduands = curatedIds
    .map((id) => graduands.find((g) => g.id === id))
    .filter(Boolean);

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section id="graduands" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-600 mb-2">
              Class of 2025 Roll of Honor
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              THE BALEWITE <span className="copper-gradient-text">GRADUANDS</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1 max-w-xl">
              Meet the graduating engineers of the 43rd Dynamo set. Click any portrait to inspect contact details, or explore all 154 graduates.
            </p>
          </div>

          <Link
            to="/graduands"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Users className="w-4 h-4 text-copper-400" />
            <span>View All 154 Graduands</span>
            <ArrowRight className="w-4 h-4 text-copper-400" />
          </Link>
        </div>

        {/* Complete 12-Slot Grid (2x6 on mobile, 3x4 on tablet, 4x3 on desktop — zero incomplete rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {spotlightGraduands.map((g, idx) => {
            const isValedictorian = g.id === 'graduand_001';
            return (
              <div
                key={g.id}
                onClick={() => setActiveGraduand(g)}
                className={`group cursor-pointer bg-cream-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 ${
                  isValedictorian
                    ? 'border-copper-500 ring-1 ring-copper-400/50'
                    : 'border-stone-200/90 hover:border-copper-400'
                }`}
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
                  {isValedictorian && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-emerald-950/90 text-copper-300 border border-copper-400/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm">
                      <Award className="w-3 h-3 text-copper-400" />
                      <span>Best Graduating</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] text-white font-semibold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-copper-400" />
                      Inspect Contact Card
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white border-t border-stone-100">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-950 truncate uppercase group-hover:text-copper-700 transition-colors">
                    {g.name}
                  </h4>
                  <div className="text-[10px] text-copper-600 font-mono mt-0.5">
                    {isValedictorian ? 'Valedictorian • EEE ’25' : `EEE ’25 • p.${g.source_page || 1}`}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 12th Slot: Interactive Call-to-Action Card */}
          <Link
            to="/graduands"
            className="group rounded-xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 flex flex-col justify-between border border-copper-400/50 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-copper-500/20 border border-copper-400/40 flex items-center justify-center text-copper-300">
              <Users className="w-5 h-5" />
            </div>

            <div className="my-4 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-serif font-black text-copper-300">
                +143
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                Explore All 154 Graduating Engineers
              </h4>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                Search by name, phone, or email in the complete Class of 2025 photo wall.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-300 group-hover:text-copper-200">
              <span>Open Full Roster</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Lightbox Modal */}
        {activeGraduand && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveGraduand(null)}
          >
            <div
              className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGraduand(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[4/4] w-full bg-stone-900 relative">
                <img
                  src={activeGraduand.image}
                  alt={activeGraduand.name}
                  className="w-full h-full object-contain bg-stone-950"
                  onError={(e) => {
                    e.target.src = '/atbu_crest.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-400 font-bold">
                    ATBU EEE CLASS OF 2025
                  </span>
                  <h3 className="text-xl font-serif font-bold leading-tight mt-0.5">
                    {activeGraduand.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3 font-sans bg-cream-50">
                <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-800" />
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Phone</div>
                      <div className="text-xs font-semibold text-stone-800">
                        {activeGraduand.phone || 'Not listed'}
                      </div>
                    </div>
                  </div>
                  {activeGraduand.phone && (
                    <button
                      onClick={() => handleCopy(activeGraduand.phone, 'phone')}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-copper-700 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Email</div>
                      <div className="text-xs font-semibold text-stone-800 truncate">
                        {activeGraduand.email || 'Not listed'}
                      </div>
                    </div>
                  </div>
                  {activeGraduand.email && (
                    <button
                      onClick={() => handleCopy(activeGraduand.email, 'email')}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 shrink-0"
                    >
                      {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
