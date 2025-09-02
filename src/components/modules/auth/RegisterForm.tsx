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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router"
import { useState } from "react"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { useCreateUserMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import type { IUser } from "@/types/auth"

const userAddressZodSchema = z.object({
    street: z.string({message: "Street inside address is required"}),
    city: z.string({message: "City inside address is required"}),
    state: z.string({message: "State inside address is required"}),
    zip: z.string({message: "Zip inside address is required"}).length(5).regex(/^\d+$/,{message: "Only digits are allowed"}),
    country: z.string({message: `Country inside address is required`})
}, {
    message: "Address is required"
})

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name too small",
  }),
  email: z.email(),
  password: z.string().min(6, "Password length must be at least 6").regex(/(?=.*[A-Z])/, "Password must have at least one uppercase letter").regex(/(?=.*\d)/, "Password must have at least one digit").regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must have at least one special character"),
  phone: z.string().length(11, "Phone number must be Bangladeshi valid number").regex(/^\d+$/,{message: "Only digits are allowed"}),
  role: z.string(),
  address: userAddressZodSchema
})

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [ createUser ] = useCreateUserMutation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            }
        }
    })

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setIsSubmitting(true)
        try {
            const res = await createUser(data as IUser).unwrap()
            toast.success(res.message)
            navigate("/login")
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
          <CardTitle className="text-lg">Register</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Register as</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified role to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="SENDER">Sender</SelectItem>
                        <SelectItem value="RECEIVER">Receiver</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                        Enter your role
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Your name
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
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
            <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input placeholder="bangladeshi valid number" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Your phone number
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <div>
            <FormLabel className="text-base mb-5">Address</FormLabel>
                <div className="grid grid-cols-2 gap-5">
                <FormField
                name="address.city"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input placeholder="city" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Your city
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                name="address.state"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                        <Input placeholder="state" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Your state
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                name="address.street"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                        <Input placeholder="street" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Your street
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                name="address.zip"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>ZIP number</FormLabel>
                    <FormControl>
                        <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Your area zip
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                name="address.country"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                        <Input placeholder="country" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Your country
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
            </div>
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
            Already have an account?{" "}
            <Link to={"/login"} className="underline underline-offset-4">
            Sign in
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

            