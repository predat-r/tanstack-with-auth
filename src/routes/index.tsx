/**
 * Home Route — "/"
 *
 * This is the landing page of the application, rendered at the root URL path.
 * It uses TanStack Router's file-based routing via `createFileRoute`.
 *
 * The page displays a welcome heading and a prompt to edit the route file
 * as a starting point for development.
 */

import { createFileRoute } from '@tanstack/react-router'

/**
 * `createFileRoute('/')` — Declares a route at the root path ("/").
 * The `component` property is set to the `Home` function defined below.
 * TanStack Router uses file-based routing, so the file path under `src/routes/`
 * determines the URL segment automatically.
 */
export const Route = createFileRoute('/')({ component: Home })

/**
 * The root/home page component.
 * Renders a centered welcome message with a call-to-action prompt.
 *
 * @returns {JSX.Element} A simple landing page with a heading and subtitle.
 */
function Home() {
  return (
    <div className="p-8">
      {/* Main welcome heading */}
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      {/* Subtitle prompting the user to begin editing */}
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}

