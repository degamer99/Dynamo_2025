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
      className="relative pt-28 sm:pt-32 md:pt-36 pb-0 overflow-hidden paper-pattern border-b border-stone-300/80"
    >
      {/* Soft ambient warm glow */}
      <div className="absolute top-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-copper-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 -left-24 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:py-16 relative z-10">
        
        {/* ROW 1: Clean 2-Column Grid — Headline & Subtitle on Left, 3D Magazine on Right */}
        <div className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Kicker, Title, Subtitle (+ Desktop Buttons) */}
          <div className="col-span-7 lg:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-4 text-left">
            <p className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.16em] uppercase text-copper-700">
              Class of 2025 • ATBU Bauchi
            </p>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-emerald-950 leading-[1.08]">
              BEYOND THE{' '}
              <span className="copper-gradient-text italic block sm:inline">
                BLUE PRINT
              </span>
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-stone-700 font-serif italic leading-relaxed max-w-lg">
              “Engineering Solutions to Nigeria’s Electrical, Energy, & Technological Challenges”
            </p>

            <p className="hidden sm:block text-stone-600 text-sm leading-relaxed max-w-md font-sans">
              The commemorative platform and technical archive of the 43rd Electrical & Electronics Engineering Graduating Class.
            </p>

            {/* Desktop Buttons & Valedictorian Link (Visible on sm+ screens inside left column) */}
            <div className="hidden sm:flex flex-col space-y-4 pt-2">
              <div className="flex flex-row items-center gap-3.5">
                <a
                  href="#graduands"
                  onClick={scrollToGraduands}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm shadow-copper hover:shadow-copper-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Meet the Graduands</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <a
                  href="/Final_Magazine_2025.pdf"
                  download="The_Dynamos_Magazine_2025.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-cream-50 text-emerald-950 font-semibold text-sm border border-stone-300 hover:border-copper-400 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4 text-copper-600 shrink-0" />
                  <span>Download PDF (22MB)</span>
                </a>
              </div>

              <div>
                <Link
                  to="/magazine?article=best_graduating_student_abduliadi"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-950 hover:text-copper-700 transition-colors group"
                >
                  <Award className="w-3.5 h-3.5 text-copper-600 shrink-0" />
                  <span className="underline decoration-copper-400/70 underline-offset-4">
                    Best Graduating Student: Abdulliadi Abdulbaki
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-copper-600 transform transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive 3D Magazine Object */}
          <div className="col-span-5 lg:col-span-5 flex justify-end sm:justify-center perspective-1500">
            <Link
              to="/magazine"
              className="group relative block cursor-pointer select-none transition-all duration-500 transform hover:scale-[1.03]"
              title="Click to open interactive 3D Magazine"
            >
              {/* Soft Ground Shadow */}
              <div className="absolute -bottom-4 left-3 right-3 h-6 bg-black/25 rounded-full blur-lg transform transition-transform group-hover:scale-105" />

              {/* 3D Magazine Cover */}
              <div className="relative w-full max-w-[155px] xs:max-w-[175px] sm:max-w-[240px] md:max-w-[280px] rounded-xl overflow-hidden shadow-book border-2 border-white/90 bg-stone-900">
                {/* Book Spine Crease */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-3 bg-gradient-to-r from-black/75 via-stone-700/40 to-transparent z-20 pointer-events-none" />

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
                <div className="absolute bottom-2 left-2 right-2 z-20 bg-emerald-950/90 backdrop-blur-md text-white px-2.5 py-1 sm:py-1.5 rounded-lg border border-copper-400/50 flex items-center justify-between shadow-md">
                  <span className="text-[9px] sm:text-xs font-serif font-bold text-copper-200 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-copper-400 shrink-0" />
                    <span className="truncate">Open 3D Book</span>
                  </span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-copper-400 shrink-0" />
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* ROW 2 (Mobile Only): Side-by-Side Buttons Below the Grid */}
        <div className="sm:hidden grid grid-cols-2 gap-2.5 mt-6">
          <a
            href="#graduands"
            onClick={scrollToGraduands}
            className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-copper-500 active:bg-copper-600 text-white font-semibold text-xs shadow-copper transition-all"
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Meet Graduands</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </a>

          <a
            href="/Final_Magazine_2025.pdf"
            download="The_Dynamos_Magazine_2025.pdf"
            className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-white active:bg-cream-100 text-emerald-950 font-semibold text-xs border border-stone-300 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-copper-600 shrink-0" />
            <span className="truncate">Download PDF</span>
          </a>
        </div>

        {/* ROW 3 (Mobile Only): Full-Line Best Graduating Student Link */}
        <div className="sm:hidden mt-4 pt-3 border-t border-stone-200/70">
          <Link
            to="/magazine?article=best_graduating_student_abduliadi"
            className="flex items-center justify-between text-[11px] font-sans font-semibold text-emerald-950 active:text-copper-700 py-0.5"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Award className="w-3.5 h-3.5 text-copper-600 shrink-0" />
              <span className="underline decoration-copper-400/70 underline-offset-4 truncate">
                Best Graduating Student: Abdulliadi Abdulbaki
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-copper-600 shrink-0 ml-1" />
          </Link>
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
