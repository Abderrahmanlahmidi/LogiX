import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/buttons/Button';


export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-error/10 flex items-center justify-center">
            <ShieldAlert className="h-10 w-10 text-error" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-normal text-text-light mb-3">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-text mb-8">
          You don't have permission to access this page. 
          Please contact your administrator or sign in with a different account.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          
          <Button
            variant="accent"
            size="md"
            icon={Home}
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}