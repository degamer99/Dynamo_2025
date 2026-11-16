import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import records from '../data/records.json';

export default function CommitteesPage() {
  const [selectedTab, setSelectedTab] = useState('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { people, committee_summary } = records;

  // Map every person ID to their exact specific subcommittee name from committee_summary
  const personToSpecificCommittee = {};
  committee_summary.forEach((comm) => {
    (comm.member_record_ids || []).forEach((id) => {
      personToSpecificCommittee[id] = comm.name_as_printed;
    });
  });

  // Enrich each person with their resolved specific committee label
  const enrichedPeople = people.map((p) => ({
    ...p,
    resolvedCommittee: personToSpecificCommittee[p.id] || p.committee_as_printed
  }));

  // Clean, focused filter tabs as requested by user:
  // 1. All Members (28)
  // 2. Central Working Committee (9)
  // 3. Dinner & Award Night Committee
  // 4. Other Subcommittees & Editorial Crew
  const filterTabs = [
    { id: 'ALL', label: `All Members (${enrichedPeople.length})` },
    { id: 'CENTRAL WORKING COMMITTEE', label: 'Central Working Committee (9)' },
    { id: 'DINNER & AWARD NIGHT', label: 'Dinner & Award Night Committee' },
    { id: 'OTHER', label: 'Editorial & Subcommittees' },
  ];

  const filteredPeople = enrichedPeople.filter((p) => {
    if (selectedTab === 'ALL') return true;
    if (selectedTab === 'CENTRAL WORKING COMMITTEE') {
      return p.resolvedCommittee === 'CENTRAL WORKING COMMITTEE';
    }
    if (selectedTab === 'DINNER & AWARD NIGHT') {
      return p.resolvedCommittee === 'DINNER & AWARD NIGHT';
    }
    if (selectedTab === 'OTHER') {
      return (
        p.resolvedCommittee !== 'CENTRAL WORKING COMMITTEE' &&
        p.resolvedCommittee !== 'DINNER & AWARD NIGHT'
      );
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 pb-6 border-b border-stone-200">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper-700 hover:text-emerald-950 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            ORGANIZING <span className="copper-gradient-text">COMMITTEES</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans mt-1 max-w-2xl">
            Honoring the Central Working Committee, the Dinner & Award Night Committee, the Editorial Crew, and specialized subcommittees of the Class of 2025.
          </p>
        </div>

        {/* Clean 4-Tab Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedTab === tab.id
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredPeople.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md hover:border-copper-400 transition-all flex flex-col justify-between group"
            >
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

              <div className="p-3.5 bg-white space-y-1">
                <span className="text-[10px] font-bold text-copper-600 uppercase tracking-wider block truncate">
                  {person.role_as_printed}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-emerald-950 leading-tight truncate">
                  {person.name_as_printed}
                </h4>
                <div className="text-[10px] font-semibold text-emerald-900/80 truncate uppercase pt-1.5 border-t border-stone-100">
                  {person.resolvedCommittee}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
