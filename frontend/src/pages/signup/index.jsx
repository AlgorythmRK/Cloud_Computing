import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import SignupForm from './components/SignupForm';
import SecurityTrustSignals from './components/Securitytrustsignals';
import AuthNavigation from '../../components/ui/AuthNavigation';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            {/* Main Signup Card */}
            <div className="bg-card rounded-xl shadow-elevated border border-border p-8">
              <WelcomeHeader />
              <SignupForm />
              <AuthNavigation />
            </div>

            {/* Security Trust Signals */}
            <SecurityTrustSignals />

            {/* Footer Links */}
            <div className="text-center mt-6 space-y-2">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <Link to="#" className="hover:text-foreground smooth-transition">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="#" className="hover:text-foreground smooth-transition">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link to="#" className="hover:text-foreground smooth-transition">
                  Support
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} FinMitra. Made with ❤️ for India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
