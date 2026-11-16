import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Download, ArrowRight, Award, BookOpen } from 'lucide-react';

export default function Hero() {
  const scrollToGraduands = (e) => {
    const el = document.querySelector('#graduands');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-0 overflow-hidden paper-pattern border-b border-stone-300/80"
    >
      {/* Soft ambient warm glow */}
      <div className="absolute top-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-copper-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 -left-24 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 sm:py-12 relative">
        <div className="relative min-h-[340px] sm:min-h-[420px] flex flex-col justify-between">
          
          {/* Interactive 3D Magazine Object on the Right */}
          <div className="absolute -right-2 sm:right-2 md:right-6 top-6 sm:top-1/2 sm:-translate-y-1/2 z-10 perspective-1500">
            <Link
              to="/magazine"
              className="group relative block cursor-pointer select-none transition-all duration-500 transform rotate-2 hover:rotate-0 hover:scale-[1.03]"
              title="Click to open interactive 3D Magazine"
            >
              {/* Soft Ground Shadow */}
              <div className="absolute -bottom-5 left-4 right-4 h-7 bg-black/30 rounded-full blur-xl transform transition-transform group-hover:scale-105" />

              {/* 3D Magazine Cover */}
              <div className="relative w-44 xs:w-48 sm:w-64 md:w-72 rounded-xl overflow-hidden shadow-book border-2 border-white/90 bg-stone-900">
                {/* Book Spine Crease */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/75 via-stone-700/40 to-transparent z-20 pointer-events-none" />

                <img
                  src="/images/cover/page_001_cover.jpg"
                  alt="The Dynamos Magazine Cover"
                  className="w-full h-auto object-cover block transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/images/department_identity/cover_page.png';
                  }}
                />

                {/* Glossy Paper Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 z-10 pointer-events-none" />

                {/* Interactive Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 bg-emerald-950/90 backdrop-blur-md text-white px-2.5 py-1.5 rounded-lg border border-copper-400/50 flex items-center justify-between shadow-md">
                  <span className="text-[9px] sm:text-xs font-serif font-bold text-copper-200 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-copper-400 shrink-0" />
                    <span>Open 3D Book</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-copper-400 shrink-0 transform transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Left-Aligned Typography & CTA Buttons */}
          <div className="relative z-20 flex flex-col text-left pointer-events-none">
            
            {/* Kicker & Headline */}
            <div className="space-y-1.5 max-w-[60%] sm:max-w-[58%]">
              <p className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.18em] uppercase text-copper-700">
                Class of 2025 • ATBU Bauchi
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-emerald-950 leading-[1.06]">
                BEYOND THE{' '}
                <span className="copper-gradient-text italic block sm:inline">
                  BLUE PRINT
                </span>
              </h1>
            </div>

            {/* Subtitle — No background, slimmer width & smaller font on mobile so it never touches the magazine */}
            <p className="mt-3 sm:mt-4 text-[11px] sm:text-base md:text-lg text-stone-700 font-serif italic leading-snug sm:leading-relaxed max-w-[175px] xs:max-w-[195px] sm:max-w-md">
              “Engineering Solutions to Nigeria’s Electrical, Energy, & Technological Challenges”
            </p>

            <p className="hidden sm:block mt-3 text-stone-600 text-sm leading-relaxed max-w-md font-sans">
              The commemorative platform and technical archive of the 43rd Electrical & Electronics Engineering Graduating Class.
            </p>

            {/* Primary & Secondary Action Buttons — Compact horizontal padding so buttons stay tight on the left */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2.5 sm:gap-3.5 pointer-events-auto">
              <a
                href="#graduands"
                onClick={scrollToGraduands}
                className="w-fit inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs sm:text-sm shadow-copper hover:shadow-copper-lg transition-all transform hover:-translate-y-0.5"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Meet the Graduands</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </a>

              <a
                href="/Final_Magazine_2025.pdf"
                download="The_Dynamos_Magazine_2025.pdf"
                className="w-fit inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-white hover:bg-cream-50 text-emerald-950 font-semibold text-xs sm:text-sm border border-stone-300 hover:border-copper-400 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-copper-600 shrink-0" />
                <span>Download PDF (22MB)</span>
              </a>
            </div>

            {/* Best Graduating Student Link — Pushed down below the buttons/magazine level, no background, arrow right next to text */}
            <div className="mt-8 sm:mt-7 pt-2 sm:pt-0 max-w-[230px] sm:max-w-md pointer-events-auto">
              <Link
                to="/magazine?article=best_graduating_student_abduliadi"
                className="inline-flex items-start gap-1.5 text-[11px] sm:text-xs font-sans font-semibold text-emerald-950 hover:text-copper-700 transition-colors group"
              >
                <Award className="w-3.5 h-3.5 text-copper-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <span className="underline decoration-copper-400/70 underline-offset-4">
                    Best Graduating Student: Abdulliadi Abdulbaki
                  </span>
                  <ArrowRight className="inline-block w-3 h-3 text-copper-600 ml-1 -mt-0.5 transform transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Slim Single-Line Editorial Quote Strip at Bottom of Hero */}
      <div className="w-full bg-[#F5F1E8]/90 backdrop-blur-sm border-t border-stone-200/90 py-3 px-4 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center">
          <p className="text-[11px] sm:text-sm font-serif italic text-emerald-950 leading-snug">
            “Engineering does not end at the blueprint; its true value lies in transforming ideas into practical solutions that improve lives.”
          </p>
          <span className="hidden sm:inline text-copper-500">•</span>
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-copper-700 whitespace-nowrap">
            — Faruk Abdulkadir Waziri, Editor-in-Chief
          </span>
        </div>
      </div>
    </section>
  );
}
