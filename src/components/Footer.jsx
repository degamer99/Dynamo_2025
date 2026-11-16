import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-stone-300 py-12 border-t border-emerald-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-emerald-900/60 text-center md:text-left">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-copper-400 p-0.5 bg-white flex items-center justify-center">
              <img src="/atbu_crest.png" alt="ATBU" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-base tracking-wide">
                THE DYNAMOS <span className="text-copper-400 font-sans text-xs">CLASS OF 2025</span>
              </div>
              <div className="text-[11px] text-stone-400">
                Department of Electrical & Electronics Engineering • ATBU Bauchi
              </div>
            </div>
          </Link>

          {/* Multi-Page Nav Links */}
          <div className="flex flex-wrap justify-center gap-5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            <Link to="/" className="hover:text-copper-300 transition-colors">Home</Link>
            <Link to="/magazine" className="hover:text-copper-300 transition-colors">Full Magazine</Link>
            <Link to="/graduands" className="hover:text-copper-300 transition-colors">154 Graduands</Link>
            <Link to="/staff" className="hover:text-copper-300 transition-colors">41 Faculty & Staff</Link>
            <Link to="/committees" className="hover:text-copper-300 transition-colors">Committees</Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-emerald-900 hover:bg-copper-600 text-white transition-all transform hover:-translate-y-0.5 shadow-md"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 text-center sm:text-left">
          <p>
            © 2025 The 43rd EEE Balewite Dynamos. Abubakar Tafawa Balewa University, Bauchi.
          </p>
          <p className="text-[11px] text-stone-400">
            Engineered with pride by the Class of 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
