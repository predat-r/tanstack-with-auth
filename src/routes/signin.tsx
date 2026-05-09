/**
 * Sign-In Route — "/signin"
 *
 * This route provides both sign-in and sign-up functionality on a single page.
 * Users can toggle between the two modes using buttons at the bottom of the form.
 * The route manages form display, error handling, and post-login navigation.
 */

import { LoginForm } from '#/components/LoginForm'
import { SignUpForm } from '#/components/signUpform'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

/**
 * Route definition for the "/signin" path.
 * Renders the `RouteComponent` which manages the sign-in/sign-up UI.
 */
export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

/**
 * The main component rendered by the sign-in route.
 *
 * Manages:
 * - `mode` state: either 'signin' or 'signup', controlling which form is displayed.
 * - `errorMessage` state: holds any authentication error messages to display.
 * - `handleSuccess` callback: navigates to the home page ("/") on successful auth.
 * - `handleError` callback: receives and displays error messages from child form components.
 * - `switchToSignup` / `switchToSignin`: toggles between sign-in and sign-up mode,
 *   clearing any existing error messages when switching.
 *
 * @returns {JSX.Element} The sign-in/sign-up page layout with conditionally rendered form.
 */
function RouteComponent() {
  const navigate = Route.useNavigate()

  // Tracks which form is currently displayed: 'signin' or 'signup'
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  // Stores any authentication error message to render above the form
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  /**
   * Called by LoginForm or SignUpForm when authentication succeeds.
   * Redirects the user to the home page.
   */
  const handleSuccess = () => {
    navigate({ to: '/' })
  }

  /**
   * Called by child form components when an authentication error occurs.
   * Sets the error message to display at the top of the page.
   *
   * @param {string} errorMessage - The error message string to display.
   */
  const handleError = (errorMessage: string) => {
    if (errorMessage) {
      setErrorMessage(errorMessage)
    } else {
      setErrorMessage(null)
    }
  }

  /**
   * Switches the UI to sign-up mode and clears any existing error message.
   */
  const switchToSignup = () => {
    setMode('signup')
    setErrorMessage(null)
  }

  /**
   * Switches the UI to sign-in mode and clears any existing error message.
   */
  const switchToSignin = () => {
    setMode('signin')
    setErrorMessage(null)
  }

  return (
    // Full-screen centered container with a light blue background
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-blue-50'>
      {/* White card container for the form */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Page heading */}
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {/* Conditionally render error message if one exists */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Toggle between LoginForm and SignUpForm based on `mode` state */}
        {mode === 'signin' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : (
          <SignUpForm
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}

        {/* Footer links to switch between sign-in and sign-up modes */}
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