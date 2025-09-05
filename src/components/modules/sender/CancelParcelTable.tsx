import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
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
import type { ISenderParcel } from "@/types/parcel"
import { useCancelParcelMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"
import { X } from "lucide-react"

interface IProps {
  tableItems: ISenderParcel
}

export default function CancelParcelTable({ tableItems }: IProps) {
    const [cancelParcel] = useCancelParcelMutation()

    const handleCancelParcel = async () => {
        try {
            const res = await cancelParcel(tableItems._id).unwrap()
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    }

  return (
    <div className="mx-auto max-w-lg">
      <div className="bg-background overflow-hidden rounded-md border">
        <p className="text-end p-3">
          <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant={"destructive"}>Cancel parcel <X /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently cancel your parcel request.
                </DialogDescription>
                </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleCancelParcel} className="dark:text-black font-bold cursor-pointer" type="submit">Yes</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
        </p>
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Sending to
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
