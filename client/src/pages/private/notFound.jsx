import React from 'react';
import { FileX, ArrowLeft, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/buttons/Button';

export default function NotFound() {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center">
            <FileX className="h-10 w-10 text-secondary" />
          </div>
        </div>

        <div className="text-6xl font-normal text-text-light mb-2">404</div>

        <h1 className="text-2xl font-normal text-text-light mb-3">
          Page Not Found
        </h1>

        <p className="text-text mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or try searching for what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
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