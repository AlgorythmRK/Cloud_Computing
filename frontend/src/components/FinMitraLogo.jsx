import React from 'react';

const FinMitraLogo = ({ variant = 'full', size = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    default: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  const FinMitraIcon = ({ className }) => (
    <svg 
      viewBox="0 0 40 40" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rupee Symbol with Rising Chart Integration */}
      <defs>
        <linearGradient id="finmitraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="20" cy="20" r="18" fill="url(#finmitraGradient)" />
      
      {/* Stylized FM Monogram */}
      <g fill="white">
        {/* F */}
        <path d="M12 13h8v2h-6v3h5v2h-5v5h-2V13z" />
        {/* M */}
        <path d="M22 13h2l3 8 3-8h2v12h-2v-9l-3 7-3-7v9h-2V13z" />
      </g>
      
      {/* Rising Chart Element */}
      <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.8">
        <path d="M10 28L15 24L20 26L25 22L30 20" />
        <circle cx="30" cy="20" r="1.5" fill="white" />
      </g>
      
      {/* Rupee Symbol Accent */}
      <g fill="white" opacity="0.6">
        <path d="M8 10h4v1h-4z" />
        <path d="M8 12h3v1h-3z" />
      </g>
    </svg>
  );

  const FinMitraWordmark = ({ size, className }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <FinMitraIcon className={`${sizeClasses?.[size]} w-auto`} />
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary tracking-tight">
          FinMitra
        </span>
        <span className="text-xs text-muted-foreground font-medium tracking-wide">
          SMART EXPENSE TRACKING
        </span>
      </div>
    </div>
  );

  if (variant === 'icon') {
    return <FinMitraIcon className={`${sizeClasses?.[size]} w-auto ${className}`} />;
  }

  if (variant === 'simple') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <FinMitraIcon className={`${sizeClasses?.[size]} w-auto`} />
        <span className="text-2xl font-bold text-primary tracking-tight">
          FinMitra
        </span>
      </div>
    );
  }

  return <FinMitraWordmark size={size} className={className} />;
};

export default FinMitraLogo;
