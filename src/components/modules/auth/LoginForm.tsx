import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/features/auth/auth.api"

const FormSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password length must be at least 6").regex(/(?=.*[A-Z])/, "Password must have at least one uppercase letter").regex(/(?=.*\d)/, "Password must have at least one digit").regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must have at least one special character"),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [ login ] = useLoginMutation()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await login(data).unwrap()
      toast.success(res.message)
      navigate("/")
    } catch (err: any) {
      toast.error(err?.data?.message)
      console.error(err)
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <div className={cn(className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="alex@example.com" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Your email
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input type={isVisible ? "text" : "password"} placeholder="******" {...field} />
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            aria-pressed={isVisible}
                            aria-controls="password"
                            >
                            {isVisible ? (
                                <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                                <EyeIcon size={16} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </FormControl>
                <FormDescription className="sr-only">
                    Your password
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className="dark:text-background font-bold cursor-pointer" type="submit">
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : "Submit"
              }
            </Button>
        </form>
        </Form>
        <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="underline underline-offset-4">
            Sign up
            </Link>
        </div>
        <div className="mt-2 text-center text-sm">
            <Link to={"/"} className="underline underline-offset-4">Home</Link>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

            