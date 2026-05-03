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
    name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

interface SignUpFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name:"",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await authClient.signUp.email(values); 
      
      if (!response.error) {
        onSuccess?.();
      } else {
        onError?.(response.error.message || "Sign up failed");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="John Doe" 
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
          Sign Up
        </Button>
      </form>
    </Form>
  )
}