import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Download, Menu, X, Smartphone } from 'lucide-react';

export default function Navbar({ deferredPrompt, onInstallPwa }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Magazine', path: '/magazine' },
    { name: 'Graduands (154)', path: '/graduands' },
    { name: 'Faculty', path: '/staff' },
    { name: 'Gallery', path: '/#gallery', isHash: true },
  ];

  const handleNavClick = (e, link) => {
    if (link.isHash) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector('#gallery');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector('#gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3'
          : 'bg-cream-50/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full border border-copper-500/70 p-0.5 bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/atbu_crest.png"
                alt="ATBU Crest"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-emerald-950 flex items-center gap-1.5">
                THE DYNAMOS
                <span className="text-[10px] font-sans font-bold tracking-widest text-copper-600">
                  ’25
                </span>
              </span>
              <span className="text-[10px] tracking-wide text-stone-500 uppercase -mt-0.5">
                ATBU Electrical & Electronics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean 5 items) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) =>
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-stone-600 hover:text-emerald-950 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-copper-700 bg-copper-50/80 font-bold'
                      : 'text-stone-600 hover:text-emerald-950 hover:bg-stone-100/60'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Streamlined Action Group */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Discreet PWA Install Icon (only when available) */}
            {deferredPrompt && (
              <button
                onClick={onInstallPwa}
                className="p-2 rounded-lg text-stone-500 hover:text-emerald-950 hover:bg-stone-200/60 transition-colors"
                title="Install App to Device"
                aria-label="Install App"
              >
                <Smartphone className="w-4 h-4 text-copper-600" />
              </button>
            )}

            {/* Discreet PDF Download Icon */}
            <a
              href="/Final_Magazine_2025.pdf"
              download="The_Dynamos_Magazine_2025.pdf"
              className="p-2 rounded-lg text-stone-600 hover:text-emerald-950 hover:bg-stone-200/60 transition-colors"
              title="Download Full Magazine PDF (22.6 MB)"
              aria-label="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Primary Copper CTA */}
            <Link
              to="/magazine"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-copper-500 text-white hover:bg-copper-600 shadow-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Magazine</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center space-x-1.5">
            {deferredPrompt && (
              <button
                onClick={onInstallPwa}
                className="p-2 rounded-lg text-copper-600 hover:bg-cream-200"
                title="Install App"
                aria-label="Install App"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}
            <Link
              to="/magazine"
              className="p-2 rounded-lg bg-copper-500 text-white shadow-sm"
              aria-label="Read Magazine"
            >
              <BookOpen className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-800 hover:bg-cream-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream-50 border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) =>
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-cream-200 rounded-lg"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg ${
                    isActive(link.path)
                      ? 'bg-copper-50 text-copper-800 font-bold'
                      : 'text-stone-700 hover:bg-cream-200'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              to="/committees"
              className="px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-cream-200 rounded-lg"
            >
              Organizing Committees
            </Link>

            <div className="pt-3 mt-2 border-t border-stone-200 flex flex-col gap-2">
              <a
                href="/Final_Magazine_2025.pdf"
                download="The_Dynamos_Magazine_2025.pdf"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-950 text-white text-xs font-semibold"
              >
                <Download className="w-4 h-4 text-copper-400" />
                Download PDF Magazine (22.6 MB)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
