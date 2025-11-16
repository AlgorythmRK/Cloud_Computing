import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import FinMitraLogo from '../../../components/FinMitraLogo';

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950/95" />
      </div>

      {/* Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-16 w-52 h-52 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-10 w-64 h-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rotate-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg" />
        <div className="absolute bottom-1/3 left-1/5 w-10 h-10 -rotate-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <FinMitraLogo
              variant="icon"
              size="lg"
              className="text-slate-100 drop-shadow-lg"
            />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-slate-50 mb-6">
            Ready to transform your{' '}
            <span className="block bg-gradient-to-r from-emerald-300 via-sky-300 to-blue-200 bg-clip-text text-transparent">
              financial future with FinMitra?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Indians using FinMitra to stay on top of expenses, EMIs and savings
            goals—securely, across bank accounts and UPI apps. No jargon, no clutter. Just clear
            insights that help you build wealth.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              asChild
              size="xl"
              className="px-10 py-4 text-base md:text-lg rounded-2xl font-semibold shadow-elevated btn-glow hover-lift
                         bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all duration-200"
            >
              <Link to="/signup">
                Start free in 2 minutes
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
              <Link to="/login">Already using FinMitra? Log in</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center p-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-md">
              <svg
                className="w-6 h-6 mr-3 text-emerald-300"
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
              <div className="text-left">
                <div className="font-semibold text-slate-50">Forever free plan</div>
                <div className="text-slate-400 text-xs md:text-sm">
                  Start now, upgrade only if you need to
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-md">
              <svg
                className="w-6 h-6 mr-3 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div className="text-left">
                <div className="font-semibold text-slate-50">Bank-grade security</div>
                <div className="text-slate-400 text-xs md:text-sm">
                  Encryption and privacy tailored for India
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-md">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div className="text-left">
                <div className="font-semibold text-slate-50">Cloud-powered insights</div>
                <div className="text-slate-400 text-xs md:text-sm">
                  Smart categorisation across UPI, cards & cash
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
