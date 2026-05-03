import { LoginForm } from '#/components/LoginForm';
import { SignUpForm } from '#/components/SignUpform';
import { createFileRoute} from '@tanstack/react-router'
import { useState } from 'react';


export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [mode,setMode] = useState<'signin' | 'signup'>('signin');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuccess = () => {
    // Redirect to home page after successful login
    navigate({ to: '/' });
  };

  const handleError = (errorMessage: string) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    } else {
      setErrorMessage(null);
    }
  };

  // Clear error when switching modes
  const switchToSignup = () => {
    setMode('signup');
    setErrorMessage(null);
  };

  const switchToSignin = () => {
    setMode('signin');
    setErrorMessage(null);
  };


  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-blue-50'>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        
        {/* Error message display */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
        
        {mode==="signin"? 
          <LoginForm 
            onSuccess={handleSuccess} 
            onError={handleError} 
          /> : 
          <SignUpForm 
            onSuccess={handleSuccess} 
            onError={handleError} 
          />
        }
        <div className="mt-4 text-center">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={switchToSignup}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={switchToSignin}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}