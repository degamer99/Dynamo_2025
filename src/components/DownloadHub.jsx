import React from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function DownloadHub() {
  return (
    <section id="download" className="py-16 md:py-24 bg-cream-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-copper-400/40 relative overflow-hidden">
          {/* Subtle Decorative Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-copper-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Magazine Specifications & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-copper-500/20 text-copper-300 border border-copper-400/30">
                <Sparkles className="w-3.5 h-3.5 text-copper-400" />
                Official Publication Archive
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight">
                DOWNLOAD THE <span className="copper-gradient-text italic">COMPLETE MAGAZINE</span>
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                Save the complete, high-resolution commemorative publication to your device. Includes full-page profiles of all 154 graduands, official speeches, faculty directory, student articles, and celebration albums.
              </p>

              {/* Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
                  <div className="text-[10px] text-copper-300 font-mono uppercase tracking-wider">File Size</div>
                  <div className="text-sm font-bold text-white font-sans mt-0.5">22.6 MB</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
                  <div className="text-[10px] text-copper-300 font-mono uppercase tracking-wider">Format</div>
                  <div className="text-sm font-bold text-white font-sans mt-0.5">Print-Ready PDF</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-copper-300 font-mono uppercase tracking-wider">Edition</div>
                  <div className="text-sm font-bold text-white font-sans mt-0.5">1st Edition (2025)</div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="/Final_Magazine_2025.pdf"
                  download="The_Dynamos_Magazine_2025.pdf"
                  className="px-8 py-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-sm shadow-copper hover:shadow-copper-lg transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full PDF (22.6 MB)</span>
                </a>

                <a
                  href="/Final_Magazine_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-copper-300" />
                  <span>Open in Browser</span>
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified digital release • Abubakar Tafawa Balewa University, Bauchi</span>
              </div>
            </div>

            {/* Right Column: 3D Cover Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-stone-900 transform transition-transform duration-500 hover:scale-105">
                <img
                  src="/images/cover/page_001_cover.jpg"
                  alt="Magazine Cover Preview"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = '/images/department_identity/cover_page.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-copper-300 border border-copper-400 text-xs font-serif font-bold tracking-wide backdrop-blur-sm">
                    Final Edition • Official Release
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
