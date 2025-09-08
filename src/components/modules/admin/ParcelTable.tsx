import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { IParcel } from "@/types/parcel"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUpdateParcelStatusLogMutation } from "@/redux/features/parcel/parcel.api"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const statusSchema = z.object({
    location: z.string().min(1, { message: "Required field" }),
    status: z.string().min(1, { message: "Required field" }),
    note: z.string().min(1, { message: "Required field" })
})

interface IProps {
  tableItems: IParcel
}

export default function ParcelTable({ tableItems }: IProps) {
  const [updateStatusLog] = useUpdateParcelStatusLogMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      location: "",
      status: "",
      note: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof statusSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await updateStatusLog({
        id: tableItems._id,
        data: values
      }).unwrap()
      toast.success(res.message)
    } catch (err: any) {
      toast.error(err?.data?.message)
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="bg-background overflow-hidden rounded-md border">
        <p className="text-center py-1">
          { tableItems.isCanceled ? ( <span className="text-red-500">Canceled</span> ) : ( <span className="text-green-500">Active</span> )}
        </p>
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Sender email
              </TableCell>
              <TableCell className="py-2">{tableItems.senderEmail.email}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Receiver email
              </TableCell>
              <TableCell className="py-2">{tableItems.receiverEmail.email}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Parcel type
              </TableCell>
              <TableCell className="py-2">{tableItems.type}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Parcel weight
              </TableCell>
              <TableCell className="py-2">{tableItems.weight}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Fee
              </TableCell>
              <TableCell className="py-2">{tableItems.fee}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Status
              </TableCell>
              <TableCell className="py-2">{tableItems.status}</TableCell>
              {
                tableItems.status !== "REQUESTED" && tableItems.status !== "DELIVERED" && !tableItems.isCanceled && (
                  <TableCell className="py-2 text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer" variant={"outline"}>Update status</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Change status</DialogTitle>
                          <DialogDescription>
                            Make changes to the status. Click save when you&apos;re
                            done.
                          </DialogDescription>
                        </DialogHeader>
                            <Form {...form}>
                              <form id="status" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Parcel's present status</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a status to display" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {
                                            tableItems.status === "APPROVED" && (
                                              <>
                                              <SelectItem value="DISPATCHED">DISPATCHED</SelectItem>
                                              <SelectItem value="INTRANSIT">INTRANSIT</SelectItem>
                                              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                              </>
                                            )
                                          }
                                          {
                                            tableItems.status === "DISPATCHED" && (
                                              <>
                                              <SelectItem value="INTRANSIT">INTRANSIT</SelectItem>
                                              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                              </>
                                            )
                                          }
                                          {
                                            tableItems.status === "INTRANSIT" && (
                                              <>
                                              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                              </>
                                            )
                                          }
                                        </SelectContent>
                                      </Select>
                                      <FormDescription className="sr-only">
                                        Status
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="location"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Parcel location</FormLabel>
                                      <FormControl>
                                        <Input placeholder="location" {...field} />
                                      </FormControl>
                                      <FormDescription className="sr-only"> 
                                        Location
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="note"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Note</FormLabel>
                                      <FormControl>
                                        <Input placeholder="note" {...field} />
                                      </FormControl>
                                      <FormDescription className="sr-only"> 
                                        Note
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </form>
                            </Form>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button form="status" className="dark: text-black font-bold cursor-pointer" type="submit">
                            {
                              isSubmitting ? (
                                <>
                                  <Loader2 className="animate-spin" />
                                </>
                              ) : "Save changes"
                            }
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                )  
              }
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Delivery date
              </TableCell>
              <TableCell className="py-2">{(new Date(tableItems.deliveryDate).toISOString().slice(0, 10))}</TableCell>
            </TableRow>
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                To
              </TableCell>
              <TableCell className="py-2">{tableItems.address.to.state}, {tableItems.address.to.city}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                From
              </TableCell>
              <TableCell className="py-2">{tableItems.address.from.state}, {tableItems.address.from.city}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
