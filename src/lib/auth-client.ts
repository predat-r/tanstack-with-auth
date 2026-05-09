/**
 * Authentication Client
 *
 * This file creates and exports a singleton `authClient` instance from the
 * `better-auth` library. The client is used throughout the application by
 * form components (LoginForm, SignUpForm) to perform authentication
 * operations such as email-based sign-in and sign-up.
 *
 * The `react` export from `better-auth` provides a React-aware client that
 * integrates with the React ecosystem (e.g., hooks, suspense).
 */

import { createAuthClient } from 'better-auth/react'

/**
 * Singleton auth client instance.
 * All authentication requests in the app go through this client.
 */
export const authClient = createAuthClient()
