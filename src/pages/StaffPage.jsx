import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, Wrench, Building, Users, ArrowLeft } from 'lucide-react';
import departmentData from '../data/department_data.json';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { staff } = departmentData;

  const academicStaff = staff.academic.map((s) => ({ ...s, section: 'academic' }));
  const technicalStaff = staff.technical.map((s) => ({ ...s, section: 'technical' }));
  const adminStaff = staff.hod_office.map((s) => ({ ...s, section: 'admin' }));

  // Sort so individual photos appear before crest placeholders
  const allStaff = [...academicStaff, ...technicalStaff, ...adminStaff].sort((a, b) => {
    const aHasPhoto = a.photograph?.status === 'individual_photo' ? 0 : 1;
    const bHasPhoto = b.photograph?.status === 'individual_photo' ? 0 : 1;
    return aHasPhoto - bHasPhoto;
  });

  const filteredStaff = allStaff.filter((s) => {
    const matchesTab = activeTab === 'all' || s.section === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.name_as_printed.toLowerCase().includes(q) ||
      (s.role_or_title_as_printed && s.role_or_title_as_printed.toLowerCase().includes(q)) ||
      (s.affiliation_or_unit_as_printed && s.affiliation_or_unit_as_printed.toLowerCase().includes(q));
    return matchesTab && matchesQuery;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
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
              FACULTY & <span className="copper-gradient-text">STAFF DIRECTORY</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-sans mt-1">
              Complete roster of {allStaff.length} professors, lecturers, technologists, and administrative staff.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty or rank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-copper-500 shadow-sm font-sans"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Staff ({allStaff.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'academic'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-copper-500" />
            <span>Academic ({academicStaff.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'technical'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-copper-500" />
            <span>Technical ({technicalStaff.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-emerald-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-copper-500" />
            <span>HOD Office & Admin ({adminStaff.length})</span>
          </button>
        </div>

        {/* Staff Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredStaff.map((person, idx) => {
            const isPlaceholder = person.photograph?.status === 'atbu_logo_placeholder';
            const imgPath = person.photograph?.file ? `/${person.photograph.file}` : '/atbu_crest.png';

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md hover:border-copper-400 transition-all flex flex-col justify-between group"
              >
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={imgPath}
                    alt={person.name_as_printed}
                    loading="lazy"
                    className={`w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105 ${
                      isPlaceholder ? 'p-8 object-contain opacity-65' : ''
                    }`}
                    onError={(e) => {
                      e.target.src = '/atbu_crest.png';
                      e.target.className = 'w-1/2 h-1/2 m-auto object-contain p-4 opacity-50';
                    }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <div>
                    <span className="text-[10px] font-bold text-copper-600 uppercase tracking-wider block font-sans">
                      {person.role_or_title_as_printed || person.section}
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-emerald-950 mt-0.5 leading-snug">
                      {person.name_as_printed}
                    </h4>
                  </div>
                  {person.affiliation_or_unit_as_printed && (
                    <p className="text-[10px] text-stone-500 border-t border-stone-100 pt-1.5 font-sans truncate">
                      {person.affiliation_or_unit_as_printed}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
