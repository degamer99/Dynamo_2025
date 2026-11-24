import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  Copy,
  Check,
  X,
  User,
  ArrowRight,
  Users,
  Award,
  Trophy,
  MapPin,
  Cpu,
  Briefcase,
  GraduationCap,
  Heart,
  Globe
} from 'lucide-react';
import graduands from '../data/graduands.json';
import awardsData from '../data/awards.json';

export default function GraduandsWall() {
  const [activeGraduand, setActiveGraduand] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  // Top 4 Academic Distinction Podium Honorees
  const topDistinctions = awardsData.academic_distinction.slice(0, 4);

  const totalAwardsCount = Object.values(awardsData).reduce(
    (sum, list) => sum + (Array.isArray(list) ? list.length : 0),
    0
  );

  // Curated 11 specific graduands (+ 12th Explore card = complete 12-item grid)
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
        
        {/* PART 1: Academic Distinction & Class Honors Podium Banner */}
        <div className="mb-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-copper-400/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/20 border border-copper-400/40 text-copper-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5 text-copper-400" />
                <span>Academic Distinction & Class Honours</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                ROLL OF <span className="copper-gradient-text">DISTINCTION</span>
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-sans mt-1 max-w-xl">
                Celebrating the top graduating scholars of the 43rd EEE Balewite Dynamo Class of 2025.
              </p>
            </div>

            <Link
              to="/awards"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs sm:text-sm font-bold shadow-copper transition-all whitespace-nowrap"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore All {totalAwardsCount} Class Awards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Academic Distinction Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {topDistinctions.map((honoree) => (
              <div
                key={honoree.id}
                className="bg-emerald-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-copper-400/30 hover:border-copper-400 transition-all flex flex-col justify-between group"
              >
                <div className="aspect-[4/5] bg-stone-900 overflow-hidden relative">
                  <img
                    src={honoree.image}
                    alt={honoree.recipient}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-emerald-950/90 text-copper-300 border border-copper-400/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm">
                    <Award className="w-3 h-3 text-copper-400 shrink-0" />
                    <span className="truncate">{honoree.rank}</span>
                  </div>
                </div>
                <div className="p-3.5 bg-emerald-950/80 border-t border-emerald-800/80">
                  <span className="text-[10px] font-bold text-copper-400 uppercase tracking-wider block truncate">
                    {honoree.title}
                  </span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white truncate mt-0.5">
                    {honoree.recipient}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: Section Header for the Graduands */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-600 mb-2">
              Class of 2025 Roll of Honor
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              THE BALEWITE <span className="copper-gradient-text">GRADUANDS</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1 max-w-xl">
              Meet the graduating engineers of the 43rd Dynamo set. Click any portrait to inspect their full profile, final-year project, and contact details, or explore all {graduands.length} graduates.
            </p>
          </div>

          <Link
            to="/graduands"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Users className="w-4 h-4 text-copper-400" />
            <span>View All {graduands.length} Graduands</span>
            <ArrowRight className="w-4 h-4 text-copper-400" />
          </Link>
        </div>

        {/* Complete 12-Slot Grid — Every card has the exact same aspect-[4/5] + footer structure */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {spotlightGraduands.map((g) => {
            const isValedictorian = g.id === 'graduand_001';
            return (
              <div
                key={g.id}
                onClick={() => setActiveGraduand(g)}
                className={`group cursor-pointer bg-cream-50 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col justify-between ${
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
                    decoding="async"
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
                      Inspect Full Profile
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white border-t border-stone-100">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-950 truncate uppercase group-hover:text-copper-700 transition-colors">
                    {g.name}
                  </h4>
                  <div className="text-[10px] text-copper-600 font-mono mt-0.5 truncate">
                    {isValedictorian
                      ? 'Valedictorian • EEE ’25'
                      : g.state_of_origin
                      ? `${g.state_of_origin} • EEE ’25`
                      : `EEE ’25 • p.${g.source_page || 1}`}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 12th Slot: Exact Same Card Structure (aspect-[4/5] top + identical p-3.5 footer) so height is 100% uniform */}
          <Link
            to="/graduands"
            className="group rounded-xl overflow-hidden border border-copper-400/60 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col justify-between bg-emerald-950"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-4 sm:p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-copper-500/20 border border-copper-400/40 flex items-center justify-center text-copper-300 mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-black text-copper-300">
                +{graduands.length - spotlightGraduands.length}
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-1.5 leading-snug">
                Explore All {graduands.length} Graduating Engineers
              </p>
            </div>

            <div className="p-3.5 bg-emerald-900/90 border-t border-emerald-800">
              <h4 className="text-xs sm:text-sm font-bold text-copper-300 truncate uppercase flex items-center justify-between">
                <span>Open Full Roster</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 transform transition-transform group-hover:translate-x-1" />
              </h4>
              <div className="text-[10px] text-stone-300 font-mono mt-0.5 truncate">
                Class of 2025 Directory
              </div>
            </div>
          </Link>
        </div>

        {/* Rich Profile Lightbox Modal */}
        {activeGraduand && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setActiveGraduand(null)}
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGraduand(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-60 sm:h-64 w-full bg-stone-900 relative shrink-0">
                <img
                  src={activeGraduand.image}
                  alt={activeGraduand.name}
                  className={`w-full h-full ${
                    activeGraduand.isCrest ? 'object-contain p-10 opacity-75 bg-stone-900' : 'object-contain bg-stone-950'
                  }`}
                  onError={(e) => {
                    e.target.src = '/atbu_crest.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-400 font-bold">
                    ATBU EEE CLASS OF 2025
                  </span>
                  <h3 className="text-xl font-serif font-bold leading-tight mt-0.5">
                    {activeGraduand.name}
                  </h3>
                  {activeGraduand.origin && (
                    <p className="text-xs text-stone-200 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-copper-400 shrink-0" />
                      <span>{activeGraduand.origin}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3 font-sans bg-cream-50 overflow-y-auto">
                {activeGraduand.project && (
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                    <div className="text-[10px] font-bold text-copper-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                      Final-Year Project
                    </div>
                    <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                      {activeGraduand.project}
                    </p>
                  </div>
                )}

                {activeGraduand.career_aspiration && (
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Career Aspiration
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {activeGraduand.career_aspiration}
                    </p>
                  </div>
                )}

                {(activeGraduand.favorite_lecturer || activeGraduand.best_friend) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeGraduand.favorite_lecturer && (
                      <div className="bg-white p-3 rounded-xl border border-stone-200">
                        <div className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1 mb-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-copper-600" />
                          Favorite Lecturer
                        </div>
                        <div className="text-xs font-semibold text-stone-800">
                          {activeGraduand.favorite_lecturer}
                        </div>
                      </div>
                    )}
                    {activeGraduand.best_friend && (
                      <div className="bg-white p-3 rounded-xl border border-stone-200">
                        <div className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1 mb-0.5">
                          <Users className="w-3.5 h-3.5 text-emerald-700" />
                          Best Friend
                        </div>
                        <div className="text-xs font-semibold text-stone-800">
                          {activeGraduand.best_friend}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeGraduand.will_miss && (
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                    <div className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1.5 mb-1">
                      <Heart className="w-3.5 h-3.5 text-copper-600" />
                      Will Miss Most About ATBU
                    </div>
                    <p className="text-xs text-stone-700 italic leading-relaxed">
                      “{activeGraduand.will_miss}”
                    </p>
                  </div>
                )}

                {activeGraduand.social_media && (
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-start gap-3">
                    <Globe className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Social Media</div>
                      <div className="text-xs font-medium text-stone-800 break-words">
                        {activeGraduand.social_media}
                      </div>
                    </div>
                  </div>
                )}

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
