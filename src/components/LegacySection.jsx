import React, { useState } from 'react';
import { Target, Compass, Music, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import departmentData from '../data/department_data.json';

export default function LegacySection() {
  const [activeAnthem, setActiveAnthem] = useState('national');
  const [copiedAnthem, setCopiedAnthem] = useState(false);
  const [anthemsExpanded, setAnthemsExpanded] = useState(false);

  const { department_overview, anthems } = departmentData;

  // Normalized Principal Officers with strict 1-line role titles and clean hierarchy
  const principalOfficers = [
    {
      role: 'VICE-CHANCELLOR',
      name: 'PROF. IBRAHIM HASSAN GARBA',
      institution: 'Abubakar Tafawa Balewa University',
      photo: '/images/leadership/vice_chancellor.jpg'
    },
    {
      role: 'DEAN OF ENGINEERING',
      name: 'PROF. YA’U S. HARUNA',
      institution: 'Faculty of Engineering & Engineering Technology',
      photo: '/images/leadership/dean.jpg'
    },
    {
      role: 'HEAD OF DEPARTMENT',
      name: 'PROF. ABDULLAHI L. AMOO',
      institution: 'Dept. of Electrical & Electronics Engineering',
      photo: '/images/leadership/hod.jpg'
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAnthem(true);
    setTimeout(() => setCopiedAnthem(false), 2000);
  };

  const currentAnthemText =
    activeAnthem === 'national'
      ? anthems.national_anthem.text_as_printed
      : anthems.university_anthem.text_as_printed;

  return (
    <section id="leadership" className="py-16 md:py-24 bg-emerald-950 text-white border-b border-emerald-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-copper-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-400">
            Institutional Heritage & Governance
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
            VISION, MISSION & <span className="copper-gradient-text">LEADERSHIP</span>
          </h2>
          <p className="text-stone-300 text-sm font-sans">
            Grounded in technology, academic rigor, and ethical engineering at Abubakar Tafawa Balewa University, Bauchi.
          </p>
        </div>

        {/* Tighter Vision & Mission Dual Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-emerald-900/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-emerald-800/80 hover:border-copper-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-copper-500/20 text-copper-300 border border-copper-400/30">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest block font-sans">
                  Departmental Horizon
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">Our Vision</h3>
              </div>
            </div>
            <p className="text-stone-200 leading-relaxed text-xs sm:text-sm font-sans">
              “{department_overview.vision.text_as_printed}”
            </p>
          </div>

          <div className="bg-emerald-900/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-emerald-800/80 hover:border-copper-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-copper-500/20 text-copper-300 border border-copper-400/30">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest block font-sans">
                  Core Mandate
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">Our Mission</h3>
              </div>
            </div>
            <p className="text-stone-200 leading-relaxed text-xs sm:text-sm font-sans">
              “{department_overview.mission.text_as_printed}”
            </p>
          </div>
        </div>

        {/* Compact Anthems Accordion */}
        <div className="bg-emerald-900/40 rounded-xl border border-emerald-800/80 mb-14 overflow-hidden">
          <div
            onClick={() => setAnthemsExpanded(!anthemsExpanded)}
            className="px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-emerald-900/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-copper-500/20 text-copper-300">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                  Anthems & Institutional Pledges
                </h3>
                <p className="text-[11px] text-stone-400 font-sans">
                  National Anthem of Nigeria & ATBU Anthem — Click to {anthemsExpanded ? 'collapse' : 'expand lyrics'}
                </p>
              </div>
            </div>
            <button className="p-1.5 rounded-lg bg-emerald-800/80 text-stone-200 hover:text-white">
              {anthemsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {anthemsExpanded && (
            <div className="border-t border-emerald-800/80 p-4 sm:p-6 bg-emerald-950/60">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex rounded-lg bg-emerald-900 p-1 border border-emerald-800">
                  <button
                    onClick={() => setActiveAnthem('national')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      activeAnthem === 'national'
                        ? 'bg-copper-500 text-white shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    National Anthem
                  </button>
                  <button
                    onClick={() => setActiveAnthem('university')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      activeAnthem === 'university'
                        ? 'bg-copper-500 text-white shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    ATBU Anthem
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(currentAnthemText)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-700 bg-emerald-900/60 text-xs font-semibold text-stone-200 hover:bg-emerald-800 transition-colors"
                >
                  {copiedAnthem ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-copper-400" />}
                  <span>{copiedAnthem ? 'Copied' : 'Copy Lyrics'}</span>
                </button>
              </div>

              <div className="bg-emerald-900/40 p-5 rounded-xl border border-emerald-800/60 font-serif whitespace-pre-line text-xs sm:text-sm leading-relaxed text-stone-100 max-w-xl mx-auto text-center italic">
                {currentAnthemText}
              </div>
            </div>
          )}
        </div>

        {/* Principal Officers — Uniform 4:5 Portrait Frame & Equal 1-Line Titles */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Principal Officers & Executive Leadership
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              University, Faculty, and Departmental Leadership
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {principalOfficers.map((officer, idx) => (
              <div
                key={idx}
                className="bg-white text-stone-800 rounded-2xl overflow-hidden border border-copper-400/40 shadow-lg flex flex-col group"
              >
                {/* Matched 4:5 Portrait Container: fills edge-to-edge on all 3 photos */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={officer.photo}
                    alt={officer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/atbu_crest.png';
                    }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <span className="text-[11px] font-bold text-copper-600 uppercase tracking-widest block font-sans truncate">
                      {officer.role}
                    </span>
                    <h4 className="text-base font-serif font-bold text-emerald-950 mt-1 leading-snug">
                      {officer.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500 border-t border-stone-100 pt-2.5 mt-3 font-sans truncate">
                    {officer.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
