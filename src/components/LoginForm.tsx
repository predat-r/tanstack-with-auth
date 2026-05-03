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

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await authClient.signIn.email(values);
      
      if (!response.error) {
        onSuccess?.();
      } else {
        onError?.(response.error.message || "Login failed");
      }
    } catch (error: any) {
      onError?.(error?.body?.message || error.message || "An unexpected error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    field.onChange(e);
                    // Call onError with null/empty to clear error when user starts typing
                    if (onError) {
                      // We'll pass a special indicator to clear the error
                      onError('');
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                    field.onChange(e);
                    // Call onError with null/empty to clear error when user starts typing
                    if (onError) {
                      onError('');
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  )
}