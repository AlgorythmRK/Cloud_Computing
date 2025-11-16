import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import FinMitraLogo from '../../../components/FinMitraLogo';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950/95" />
      </div>

      {/* Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-white/5 rounded-2xl rotate-45 blur-xl border border-white/10 backdrop-blur-md" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-xl rotate-12 blur-lg border border-white/10 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center text-white">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <FinMitraLogo variant="icon" size="xl" className="text-slate-50 drop-shadow-lg" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 tracking-tight">
            Track smarter.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-blue-200 bg-clip-text text-transparent">
              Spend better with FinMitra.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-slate-300/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Cloud-powered expense tracking tailored for India. Connect accounts, monitor EMIs, and
            get clear insights across UPI, cards, and cash — in one clean dashboard.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              asChild
              size="xl"
              className="px-10 py-4 text-base md:text-lg rounded-2xl font-semibold shadow-elevated btn-glow hover-lift
                         bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all duration-200"
            >
              <Link to="/signup">
                Get started free
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="xl"
              className="px-10 py-4 text-base md:text-lg rounded-2xl font-semibold smooth-transition
                         border border-slate-500/70 text-slate-100 hover:bg-slate-900/60 hover:border-slate-300/80
                         backdrop-blur-sm"
            >
              <Link to="/login">Sign in to your account</Link>
            </Button>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-5 bg-slate-900/60 border border-slate-700/70 rounded-2xl backdrop-blur-md">
              <div className="w-11 h-11 bg-emerald-400/15 rounded-xl flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Bank-level security</h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Encryption and privacy standards designed for Indian users.
              </p>
            </div>

            <div className="flex flex-col items-center p-5 bg-slate-900/60 border border-slate-700/70 rounded-2xl backdrop-blur-md">
              <div className="w-11 h-11 bg-sky-400/15 rounded-xl flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-sky-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Cloud sync</h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Your data stays available across devices, always in sync.
              </p>
            </div>

            <div className="flex flex-col items-center p-5 bg-slate-900/60 border border-slate-700/70 rounded-2xl backdrop-blur-md">
              <div className="w-11 h-11 bg-blue-400/15 rounded-xl flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Smart insights</h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Understand your spends with AI-driven patterns & alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
