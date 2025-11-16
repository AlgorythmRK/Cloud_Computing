import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityTrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Firebase Security',
      description:
        "Your data is protected by Google’s enterprise-grade security infrastructure",
    },
    {
      icon: 'Lock',
      title: 'Data Encryption',
      description:
        'All personal and financial data is encrypted both in transit and at rest',
    },
    {
      icon: 'MapPin',
      title: 'India Compliant',
      description:
        'Fully compliant with Indian data protection and financial regulations',
    },
    {
      icon: 'Users',
      title: 'Trusted by 10,000+',
      description:
        'Join thousands of Indians already managing their expenses securely',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-6 mt-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="ShieldCheck" size={24} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Secure &amp; Trusted</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Your financial data security is our top priority
        </p>
      </div>

      {/* Trust features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures.map((feature) => (
          <div key={feature.title} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>RBI Guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrustSignals;
