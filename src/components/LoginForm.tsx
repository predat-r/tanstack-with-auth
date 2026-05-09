/**
 * LoginForm Component
 *
 * A reusable sign-in form built with React Hook Form and Zod validation.
 * Collects the user's email and password, then authenticates via `authClient.signIn.email()`.
 *
 * Props (`LoginFormProps`):
 * - `onSuccess` — Optional callback invoked when login succeeds.
 * - `onError` — Optional callback invoked with an error message when login fails.
 *
 * Validation schema:
 * - `email` — Must be a non-empty, valid email address.
 * - `password` — Must be at least 6 characters long.
 */

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from '@/lib/auth-client'

/**
 * Zod schema defining the expected shape and validation rules for the login form fields.
 *
 * @constant {z.ZodObject}
 * @property {z.ZodString} email — Must be non-empty and pass email format validation.
 * @property {z.ZodString} password — Must be at least 6 characters.
 */
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

/**
 * TypeScript interface for the props accepted by `LoginForm`.
 */
interface LoginFormProps {
  /** Callback fired when authentication succeeds. */
  onSuccess?: () => void;
  /** Callback fired with an error message when authentication fails. */
  onError?: (message: string) => void;
}

/**
 * The LoginForm component.
 *
 * Renders email and password inputs inside a React Hook Form wrapper with Zod validation.
 * On form submission, it calls `authClient.signIn.email()` to authenticate.
 * Success or error outcomes are communicated back to the parent via the `onSuccess` and `onError` callbacks.
 *
 * @param {LoginFormProps} props - Component props.
 * @returns {JSX.Element} The rendered login form.
 */
export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  // Initialize the form with Zod resolver and default empty values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  /**
   * Handles form submission.
   * Sends the validated email/password pair to `authClient.signIn.email()`.
   * Calls `onSuccess` on success or `onError` with the error message on failure.
   *
   * @param {z.infer<typeof formSchema>} values - The validated form field values.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Attempt email-based sign-in
      const response = await authClient.signIn.email(values)

      if (!response.error) {
        onSuccess?.()
      } else {
        onError?.(response.error.message || "Login failed")
      }
    } catch (error: any) {
      // Handle network errors or unexpected exceptions
      onError?.(error?.body?.message || error.message || "An unexpected error occurred")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* --- Email Field --- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    // Clear any previously displayed error as the user types
                    if (onError) {
                      onError('')
                    }
                  }}
                />
              </FormControl>
              {/* Displays validation error for the email field */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Password Field --- */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    // Clear any previously displayed error as the user types
                    if (onError) {
                      onError('')
                    }
                  }}
                />
              </FormControl>
              {/* Displays validation error for the password field */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Submit Button --- */}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  )
}