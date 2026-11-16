import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import departmentData from '../data/department_data.json';

export default function StaffDirectory() {
  const { staff } = departmentData;

  const allWithPhotos = staff.academic.filter(
    (s) => s.photograph && s.photograph.status === 'individual_photo'
  );

  const deanEntry = allWithPhotos.find((s) => s.name_as_printed.includes('HARUNA'));
  const hodEntry = allWithPhotos.find((s) => s.name_as_printed.includes('AMOO'));
  const others = allWithPhotos.filter(
    (s) => s !== deanEntry && s !== hodEntry
  );

  const featuredFaculty = [
    ...(deanEntry ? [deanEntry] : []),
    ...(hodEntry ? [hodEntry] : []),
    ...others,
  ].slice(0, 6);

  return (
    <section id="staff" className="py-16 md:py-24 bg-cream-200/80 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-emerald-900 mb-2">
              Academic Mentorship & Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              FACULTY <span className="copper-gradient-text">HIGHLIGHTS</span>
            </h2>
            <p className="text-stone-600 text-sm font-sans mt-1 max-w-xl">
              Led by the Dean and Head of Department, meet the professors and senior scholars of the Department of Electrical & Electronics Engineering.
            </p>
          </div>

          <Link
            to="/staff"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <GraduationCap className="w-4 h-4 text-copper-400" />
            <span>View All 41 Faculty & Staff</span>
            <ArrowRight className="w-4 h-4 text-copper-400" />
          </Link>
        </div>

        {/* Tight, Architectural Grid-Locked Roster (6 Senior Faculty) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300 border border-stone-300 rounded-2xl overflow-hidden shadow-sm">
          {featuredFaculty.map((person, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-cream-50/90 transition-colors flex items-center gap-4 p-4 sm:p-5 group"
            >
              {/* Crisp 4:5 Portrait Frame */}
              <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-lg bg-stone-100 overflow-hidden border border-stone-200">
                <img
                  src={`/${person.photograph.file}`}
                  alt={person.name_as_printed}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/atbu_crest.png';
                  }}
                />
              </div>

              {/* Structured Academic Details */}
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-copper-300 text-[10px] font-bold uppercase tracking-wider font-sans">
                  {person.role_or_title_as_printed}
                </span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-emerald-950 mt-1.5 leading-snug truncate">
                  {person.name_as_printed}
                </h3>
                <p className="text-[11px] text-stone-500 font-sans mt-1 truncate">
                  {person.affiliation_or_unit_as_printed || 'Electrical & Electronics Engineering'}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
