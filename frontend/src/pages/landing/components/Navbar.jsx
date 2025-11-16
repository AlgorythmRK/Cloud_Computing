import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import FinMitraLogo from '../../../components/FinMitraLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 shadow-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="hover-lift">
            <FinMitraLogo
              variant="simple"
              size="lg"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-slate-100' : 'text-white'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${
                isScrolled
                  ? 'text-slate-200 hover:text-emerald-300'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`font-medium transition-colors duration-300 ${
                isScrolled
                  ? 'text-slate-200 hover:text-emerald-300'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Login
            </Link>
            <Button
              asChild
              className="btn-primary rounded-xl px-5 py-2 text-sm font-semibold"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors duration-300 ${
              isScrolled
                ? 'text-slate-100 hover:text-emerald-300 hover:bg-slate-900/70'
                : 'text-white hover:text-emerald-300 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-slate-100 hover:text-emerald-300 font-medium px-2 py-1 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-slate-100 hover:text-emerald-300 font-medium px-2 py-1 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Button asChild className="btn-primary w-fit">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
