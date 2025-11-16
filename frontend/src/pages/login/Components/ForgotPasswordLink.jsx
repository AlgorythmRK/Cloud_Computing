import React from 'react';
import Icon from '../../../components/AppIcon';

const ForgotPasswordLink = () => {
  const handleForgotPassword = () => {
    alert(
      'Password reset feature connects to Firebase Auth.\nFor demo:\nEmail: demo@finmitra.com\nPassword: demo123'
    );
  };

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={handleForgotPassword}
        className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 hover:underline smooth-transition"
      >
        <Icon name="Key" size={14} />
        <span>Forgot your password?</span>
      </button>
    </div>
  );
};

export default ForgotPasswordLink;
