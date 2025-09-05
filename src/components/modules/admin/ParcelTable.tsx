import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { IParcel } from "@/types/parcel"

interface IProps {
  tableItems: IParcel
}

export default function ParcelTable({ tableItems }: IProps) {
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
