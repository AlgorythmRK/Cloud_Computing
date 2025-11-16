import React from 'react';
import FinMitraLogo from '../../../components/FinMitraLogo';
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="mb-6">
             <Link to="/">
                  <FinMitraLogo variant="simple" size="lg" className="cursor-pointer hover:opacity-90" />
             </Link>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
        Welcome back
      </h1>

      <p className="text-muted-foreground text-lg leading-relaxed">
        Sign in to your FinMitra account and continue managing your finances.
      </p>
    </div>
  );
};

export default LoginHeader;
