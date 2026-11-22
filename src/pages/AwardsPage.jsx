import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  Sparkles,
  GraduationCap,
  Users,
  ArrowLeft,
  Search,
  X
} from 'lucide-react';
import awardsData from '../data/awards.json';

export default function AwardsPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const {
    academic_distinction,
    faculty_and_partners,
    student_leadership_framed,
    paper_personality_awards
  } = awardsData;

  const totalCount =
    academic_distinction.length +
    faculty_and_partners.length +
    student_leadership_framed.length +
    paper_personality_awards.length;

  const filterBySearch = (list) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.recipient.toLowerCase().includes(q) ||
        (item.type && item.type.toLowerCase().includes(q))
    );
  };

  const tabs = [
    { id: 'ALL', label: `All Honors (${totalCount})`, icon: Trophy },
    { id: 'ACADEMIC', label: `Academic Distinction (${academic_distinction.length})`, icon: Award },
    { id: 'FACULTY', label: `Faculty & Partners (${faculty_and_partners.length})`, icon: GraduationCap },
    { id: 'LEADERSHIP', label: `Student Framed Awards (${student_leadership_framed.length})`, icon: Users },
    { id: 'PERSONALITY', label: `Paper & Superlatives (${paper_personality_awards.length})`, icon: Sparkles }
  ];

  const renderCard = (item, badgeColor = 'copper') => (
    <div
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md hover:border-copper-400 transition-all flex flex-col justify-between group"
    >
      <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative flex items-center justify-center">
        <img
          src={item.image}
          alt={item.recipient}
          loading="lazy"
          className={`w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105 ${
            item.isCrest ? 'p-10 object-contain opacity-75 bg-gradient-to-b from-cream-50 to-cream-200' : ''
          }`}
          onError={(e) => {
            e.target.src = '/atbu_crest.png';
            e.target.className = 'w-1/2 h-1/2 m-auto object-contain p-4 opacity-50';
          }}
        />
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
              badgeColor === 'emerald'
                ? 'bg-emerald-950/90 text-copper-300 border border-copper-400/40'
                : 'bg-copper-600/95 text-white border border-copper-300/40'
            }`}
          >
            {item.rank || item.type}
          </span>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-stone-100 flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <span className="text-[10px] font-bold text-copper-600 uppercase tracking-wider block font-sans">
            {item.title}
          </span>
          <h4 className="text-xs sm:text-sm font-serif font-bold text-emerald-950 mt-0.5 leading-snug">
            {item.recipient}
          </h4>
        </div>
        {item.subtitle && (
          <p className="text-[10px] text-stone-500 border-t border-stone-100 pt-1.5 font-sans truncate">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
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
              CLASS OF 2025 <span className="copper-gradient-text">HONORS & AWARDS</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1 max-w-2xl">
              Official archive of the 23 Framed Awards of Excellence and 17 Class Superlative & Personality Awards presented at the 43rd EEE Balewite Dynamo celebration.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search award or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-copper-500 shadow-sm font-sans"
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

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-copper-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-14">
          {/* 1. Academic Distinction */}
          {(activeTab === 'ALL' || activeTab === 'ACADEMIC') &&
            filterBySearch(academic_distinction).length > 0 && (
              <section>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-copper-600 block">
                    Framed Honors • Academic Podium
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                    Academic Distinction & Special Recognition
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                  {filterBySearch(academic_distinction).map((item) =>
                    renderCard(item, 'emerald')
                  )}
                </div>
              </section>
            )}

          {/* 2. Faculty & Institutional Framed Awards */}
          {(activeTab === 'ALL' || activeTab === 'FACULTY') &&
            filterBySearch(faculty_and_partners).length > 0 && (
              <section>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-copper-600 block">
                    Framed Honors • Mentorship & Partners
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                    Faculty & Institutional Framed Awards
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                  {filterBySearch(faculty_and_partners).map((item) =>
                    renderCard(item, 'emerald')
                  )}
                </div>
              </section>
            )}

          {/* 3. Student Leadership & Service Framed Awards */}
          {(activeTab === 'ALL' || activeTab === 'LEADERSHIP') &&
            filterBySearch(student_leadership_framed).length > 0 && (
              <section>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-copper-600 block">
                    Framed Honors • Service & Impact
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                    Student Leadership, Academic Support & Service Awards
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                  {filterBySearch(student_leadership_framed).map((item) =>
                    renderCard(item, 'emerald')
                  )}
                </div>
              </section>
            )}

          {/* 4. Paper & Personality Superlatives */}
          {(activeTab === 'ALL' || activeTab === 'PERSONALITY') &&
            filterBySearch(paper_personality_awards).length > 0 && (
              <section>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-copper-600 block">
                    Class Superlatives • Dinner & Awards Night
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
                    Paper & Personality Superlative Awards
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                  {filterBySearch(paper_personality_awards).map((item) =>
                    renderCard(item, 'copper')
                  )}
                </div>
              </section>
            )}
        </div>

      </div>
    </div>
  );
}
