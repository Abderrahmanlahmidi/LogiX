import React from 'react';
import { Truck, MapPin, Smartphone, ShieldCheck } from 'lucide-react';

export const LoginBillboard = () => {
  const features = [
    { icon: MapPin, text: 'Real-time Fleet Tracking' },
    { icon: Smartphone, text: 'Mobile App Support' },
    { icon: ShieldCheck, text: 'Enterprise Security' },
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-bg/90"></div>
      </div>
      
      <div className="relative z-10 p-12 w-full flex flex-col justify-center">
        <div className="max-w-lg">
          {/* Logo on Billboard */}
          <div className="flex items-center gap-2 mb-8">
            <Truck className="h-8 w-8 text-accent" />
            <span className="text-2xl font-normal text-text-light">Logix</span>
          </div>

          <h1 className="text-4xl font-normal text-text-light mb-6 leading-tight">
            Optimize Your 
            <span className="text-accent"> Fleet Operations</span>
          </h1>
          <p className="text-lg text-text mb-8">
            Comprehensive tracking, fuel management, and maintenance solutions 
            for modern truck fleets. Reduce costs and enhance safety.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon className="h-5 w-5 text-accent" />
                <span className="text-text-light">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { value: '30%', label: 'Cost Reduction' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-normal text-accent">{stat.value}</div>
                <div className="text-sm text-text-light/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};