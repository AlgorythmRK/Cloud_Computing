import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNavigation from '../../components/ui/AuthNavigation';
import LoginHeader from './Components/LoginHeader';
import LoginForm from './Components/LoginForm';
import ForgotPasswordLink from './Components/ForgotPasswordLink';

const LoginPage = () => {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted/30">
     

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <div className="bg-card border border-border rounded-xl shadow-subtle p-8">
            <LoginHeader />
            <LoginForm />
            <div className="mt-6">
              <ForgotPasswordLink />
            </div>
            <AuthNavigation />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

        </div>
      </div>

      <div className="bg-card border-t border-border p-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FinMitra. Secure expense tracking for modern India.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
