import React from 'react';
import { Download, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function DownloadHub() {
  return (
    <section id="download" className="py-14 md:py-22 bg-cream-100 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 md:p-14 text-white shadow-2xl border border-copper-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-copper-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Clean Title, Download Buttons & Verification */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-copper-500/20 text-copper-300 border border-copper-400/30">
                <Sparkles className="w-3.5 h-3.5 text-copper-400" />
                Official Publication Archive
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight">
                DOWNLOAD THE <span className="copper-gradient-text italic">COMPLETE MAGAZINE</span>
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="/Final_Magazine_2025.pdf"
                  download="The_Dynamos_Magazine_2025.pdf"
                  className="px-7 py-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs sm:text-sm shadow-copper hover:shadow-copper-lg transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Full PDF (22.6 MB)</span>
                </a>

                <a
                  href="/Final_Magazine_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-copper-300 shrink-0" />
                  <span>Open in Browser</span>
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified digital release • Abubakar Tafawa Balewa University, Bauchi</span>
              </div>
            </div>

            {/* Right Column: 3D Cover Mockup with Single-Line "Official Release" Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-52 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-stone-900 transform transition-transform duration-500 hover:scale-105">
                <img
                  src="/images/cover/page_001_cover.jpg"
                  alt="Magazine Cover Preview"
                  className="w-full h-auto object-cover block"
                  onError={(e) => {
                    e.target.src = '/images/department_identity/cover_page.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-950/90 text-copper-300 border border-copper-400/60 text-[11px] font-serif font-bold tracking-wider whitespace-nowrap backdrop-blur-sm">
                    Official Release
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
