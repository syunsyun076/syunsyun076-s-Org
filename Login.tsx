
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-700">NudgeLift</h1>
            <p className="mt-2 text-gray-600">Boost your CVR effortlessly.</p>
        </div>
        <div className="mt-8">
          <Button onClick={login} className="w-full" size="lg">
            Log In (Demo)
          </Button>
          <p className="mt-4 text-xs text-center text-gray-500">
            This is a demo. Clicking the button will log you in with a mock user.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
