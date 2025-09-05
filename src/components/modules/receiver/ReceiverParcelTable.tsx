import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useApproveParcelMutation } from "@/redux/features/parcel/parcel.api"
import type { IReceiverParcel } from "@/types/parcel"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

interface IProps {
  tableItems: IReceiverParcel
}

export default function ReceiverParcelTable({ tableItems }: IProps) {
  const [approveParcel] = useApproveParcelMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleApproveParcel = async () => {
    setIsSubmitting(true)
    try {
      const res = await approveParcel(tableItems._id).unwrap()
      toast.success(res.message)
      navigate("/dashboard/receiver/incoming-parcels")
    } catch (err: any) {
      toast.error(err?.data?.message)
    } finally {
      setIsSubmitting(false)
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
              (tableItems.status === "REQUESTED" && !tableItems.isCanceled) && (
                <TableCell className="text-center">
                  <Button className="cursor-pointer" onClick={handleApproveParcel} variant={"outline"}>
                    { isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : "Approve" }
                  </Button>
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
