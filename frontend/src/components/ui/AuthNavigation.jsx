import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AuthNavigation = () => {
  const location = useLocation();
  const isLoginPage = location?.pathname === '/login';

  return (
    <div className="text-center mt-6">
      <p className="text-muted-foreground text-sm">
        {isLoginPage ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={isLoginPage ? '/signup' : '/login'}
          className="text-primary hover:text-primary/80 font-medium smooth-transition hover:underline"
        >
          {isLoginPage ? 'Create Account' : 'Sign In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthNavigation;