/**
 * SignUpForm Component
 *
 * A reusable sign-up form built with React Hook Form and Zod validation.
 * Collects the user's name, email, password, and confirm password, then registers
 * the user via `authClient.signUp.email()`.
 *
 * Props (`SignUpFormProps`):
 * - `onSuccess` — Optional callback invoked when registration succeeds.
 * - `onError` — Optional callback invoked with an error message when registration fails.
 *
 * Validation schema:
 * - `email` — Must be a non-empty, valid email address.
 * - `name` — Must be at least 1 character.
 * - `password` — Must be at least 6 characters.
 * - `confirmPassword` — Must be at least 6 characters and match `password`.
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
 * Zod schema defining the expected shape and validation rules for the sign-up form fields.
 *
 * Includes a cross-field refinement that ensures `password` and `confirmPassword`
 * match, with the error attached to the `confirmPassword` path.
 *
 * @constant {z.ZodObject}
 * @property {z.ZodString} email    — Must be non-empty and pass email format validation.
 * @property {z.ZodString} name     — Must be at least 1 character.
 * @property {z.ZodString} password — Must be at least 6 characters.
 * @property {z.ZodString} confirmPassword — Must be at least 6 characters and equal to password.
 */
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

/**
 * TypeScript interface for the props accepted by `SignUpForm`.
 */
interface SignUpFormProps {
  /** Callback fired when registration succeeds. */
  onSuccess?: () => void;
  /** Callback fired with an error message when registration fails. */
  onError?: (message: string) => void;
}

/**
 * The SignUpForm component.
 *
 * Renders name, email, password, and confirm-password inputs inside a React Hook Form
 * wrapper with Zod validation. On form submission, it calls `authClient.signUp.email()`
 * to register the user. Success or error outcomes are communicated back to the parent
 * via the `onSuccess` and `onError` callbacks.
 *
 * @param {SignUpFormProps} props - Component props.
 * @returns {JSX.Element} The rendered sign-up form.
 */
export function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  // Initialize the form with Zod resolver and default empty values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  /**
   * Handles form submission.
   * Sends the validated form data (email, name, password) to `authClient.signUp.email()`.
   * Calls `onSuccess` on success or `onError` with the error message on failure.
   *
   * @param {z.infer<typeof formSchema>} values - The validated form field values.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Attempt email-based registration
      const response = await authClient.signUp.email(values);

      if (!response.error) {
        onSuccess?.()
      } else {
        onError?.(response.error.message || "Sign up failed")
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

        {/* --- Name Field --- */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
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
              {/* Displays validation error for the name field */}
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

        {/* --- Confirm Password Field --- */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
              {/* Displays validation error for the confirm-password field */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Submit Button --- */}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}