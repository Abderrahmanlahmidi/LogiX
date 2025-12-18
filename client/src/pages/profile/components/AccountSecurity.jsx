import React from 'react';
import { Shield, Monitor, LogOut, Lock, Smartphone, Globe } from 'lucide-react';

const AccountSecurity = () => {
  const securityInfo = [
    {
      icon: <Shield className="h-4 w-4 text-accent" />,
      title: "Account Protection",
      description: "Your account is secured with encrypted password storage",
      status: "Protected",
      statusColor: "text-green-400",
      bgColor: "bg-green-900/10"
    },
    {
      icon: <Lock className="h-4 w-4 text-blue-400" />,
      title: "Password Security",
      description: "Last changed: 2 weeks ago",
      status: "Strong",
      statusColor: "text-green-400",
      bgColor: "bg-blue-900/10"
    },
    {
      icon: <Monitor className="h-4 w-4 text-purple-400" />,
      title: "Active Sessions",
      description: "Currently logged in on 1 device",
      status: "1 Active",
      statusColor: "text-purple-400",
      bgColor: "bg-purple-900/10"
    },
    {
      icon: <Smartphone className="h-4 w-4 text-yellow-400" />,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      status: "Not Enabled",
      statusColor: "text-yellow-400",
      bgColor: "bg-yellow-900/10"
    },
  ];

  return (
    <div className="bg-bg border border-secondary rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-light mb-4">Account Security Overview</h3>
      <div className="space-y-3">
        {securityInfo.map((info, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded border border-secondary/30 hover:border-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${info.bgColor}`}>
                {info.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-light">{info.title}</h4>
                <p className="text-xs text-text/60">{info.description}</p>
              </div>
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded ${info.bgColor} ${info.statusColor}`}>
              {info.status}
            </div>
          </div>
        ))}
      </div>
      
      {/* Security Tips */}
      <div className="mt-6 pt-4 border-t border-secondary/30">
        <h4 className="text-sm font-medium text-text-light mb-2">Security Tips</h4>
        <ul className="text-xs text-text/60 space-y-1">
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1"></div>
            <span>Change your password every 3 months for maximum security</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1"></div>
            <span>Enable two-factor authentication for added protection</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1"></div>
            <span>Always log out from shared or public computers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSecurity;