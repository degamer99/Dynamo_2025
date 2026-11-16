import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import records from '../data/records.json';

export default function CommitteesSection() {
  const { people } = records;

  // Show ALL 9 Central Working Committee (CWC) executive members on the homepage
  const cwcMembers = people.filter(
    (p) => p.committee_as_printed === 'CENTRAL WORKING COMMITTEE'
  );

  return (
    <section id="committees" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-600 mb-2">
              Stewardship & Organization
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              CENTRAL WORKING <span className="copper-gradient-text">COMMITTEE</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1 max-w-xl">
              Honoring all {cwcMembers.length} Central Working Committee executives who spearheaded the Class of 2025 yearbook, dinner gala, and milestone celebrations.
            </p>
          </div>

          <Link
            to="/committees"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Users className="w-4 h-4 text-copper-400" />
            <span>See Remaining Committees ({people.length} Members)</span>
            <ArrowRight className="w-4 h-4 text-copper-400" />
          </Link>
        </div>

        {/* Full Portrait Cards matching the Graduands Card style (All 9 CWC Members) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {cwcMembers.map((person) => (
            <div
              key={person.id}
              className="group bg-cream-50 rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md hover:border-copper-400 transition-all transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Full 4:5 Portrait Photo Box */}
              <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
                <img
                  src={`/${person.image}`}
                  alt={person.name_as_printed}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/atbu_crest.png';
                    e.target.className = 'w-1/2 h-1/2 m-auto object-contain p-4 opacity-50';
                  }}
                />
              </div>

              {/* Member Name & Role Footer */}
              <div className="p-3.5 bg-white border-t border-stone-100">
                <span className="text-[10px] font-bold text-copper-600 uppercase tracking-wider block truncate font-sans">
                  {person.role_as_printed}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 truncate uppercase mt-0.5 group-hover:text-copper-700 transition-colors">
                  {person.name_as_printed}
                </h4>
              </div>
            </div>
          ))}

          {/* 10th Card to complete the 5-column / 2-column grid cleanly */}
          <Link
            to="/committees"
            className="group rounded-xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-5 flex flex-col justify-between border border-copper-400/50 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-copper-500/20 border border-copper-400/40 flex items-center justify-center text-copper-300">
              <Users className="w-5 h-5" />
            </div>

            <div className="my-3 space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-black text-copper-300">
                +19
              </div>
              <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                Dinner, Editorial & Subcommittees
              </h4>
              <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                Meet all 28 committee leaders across 8 teams.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-300 group-hover:text-copper-200">
              <span>View All Teams</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
