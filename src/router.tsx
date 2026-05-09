/**
 * Router Configuration
 *
 * This file sets up the TanStack Router instance for the entire application.
 * It imports the auto-generated route tree and configures router-level
 * options such as scroll restoration and link preloading behavior.
 */

import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

/**
 * Creates and returns the configured TanStack Router instance.
 *
 * Key configurations:
 * - `routeTree` — The generated route tree that defines all application routes.
 * - `scrollRestoration: true` — Restores scroll position when navigating back/forward.
 * - `defaultPreload: 'intent'` — Preloads a route when the user hovers over a link (intent-based).
 * - `defaultPreloadStaleTime: 0` — Preloaded data is considered stale immediately,
 *   ensuring fresh data is fetched when the route is actually visited.
 *
 * @returns {ReturnType<typeof createTanStackRouter>} The configured router instance.
 */
export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

/**
 * Module augmentation for TanStack Router's `Register` interface.
 *
 * This tells TypeScript to associate our custom router instance (returned by `getRouter()`)
 * with the `@tanstack/react-router` module, enabling type-safe route references
 * throughout the application.
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
