import React from 'react';
import { Quote } from 'lucide-react';

export default function QuoteBreak() {
  return (
    <section className="py-14 md:py-20 bg-[#FDFCF9] border-b border-stone-200/80 relative overflow-hidden">
      {/* Subtle decorative marks */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-copper-50 text-copper-500 mb-6 border border-copper-200/60">
          <Quote className="w-4 h-4" />
        </div>

        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-emerald-950 leading-relaxed tracking-normal">
          “Engineering does not end at the blueprint; its true value lies in transforming ideas into practical solutions that improve lives and power our nation’s future.”
        </blockquote>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-copper-400" />
          <cite className="not-italic text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-copper-700">
            Faruk Abdulkadir Waziri • Editor-in-Chief, Class of 2025
          </cite>
          <span className="w-8 h-[1px] bg-copper-400" />
        </div>
      </div>
    </section>
  );
}
