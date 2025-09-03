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
import { useNavigate } from "react-router"
import { useState } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useGetUserQuery, useLazyGetReceiverByEmailQuery } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api"

const FormSchema = z.object({
  email: z.email(),
  type: z.string().min(1, "Required"),
  weight: z.string().min(1, "Required"),
  fee: z.string().regex(/^[1-9][0-9]*$/, {message: "Only digits are allowed"}),
  deliveryDate: z.date()
})

export default function CreateParcelForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate() 
  const [getReceiver] = useLazyGetReceiverByEmailQuery()
  const [createParcel] = useCreateParcelMutation()
  const { data: senderData } = useGetUserQuery(undefined)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        email: "",
        type: "",
        weight: "",
        fee: "",
        deliveryDate: new Date()
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    try {
        const receiverData = await getReceiver(data.email).unwrap()
        const parcelDetails = {
            sender: senderData?.data?._id,
            receiver: receiverData?.data?._id,
            ...data
        }
        const response = await createParcel(parcelDetails).unwrap()
        toast.success(response.message)
        navigate("/dashboard/sender/parcels")
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
          <CardTitle className="text-lg">Create a parcel</CardTitle>
          <CardDescription>
            Enter the parcel details below to create a parcel request
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
                <FormLabel>Enter receiver's email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="alex@example.com" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Receiver email
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Parcel type</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="e.g., Box" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Parcel type
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            name="weight"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Parcel weight</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="e.g., 5kg" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Parcel weight
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            name="fee"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Fee</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="fee" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                    Parcel fee
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <= new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="sr-only">
                    Delivery date
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
        </CardContent>
      </Card>
    </div>
  )
}

            