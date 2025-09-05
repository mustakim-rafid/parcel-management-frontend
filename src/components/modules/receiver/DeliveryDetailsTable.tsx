import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { IDeliveryDetails } from "@/types/parcel"

interface IProps {
  tableItems: IDeliveryDetails
}

export default function DeliveryDetailsTable({ tableItems }: IProps) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Sender email
              </TableCell>
              <TableCell className="py-2">{tableItems.from}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Parcel type
              </TableCell>
              <TableCell className="py-2">{tableItems.type}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Status
              </TableCell>
              <TableCell className="py-2">{tableItems.status}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Note
              </TableCell>
              <TableCell className="py-2">{tableItems.note}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Location
              </TableCell>
              <TableCell className="py-2">{tableItems.location}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Time
              </TableCell>
              <TableCell className="py-2">{(new Date(tableItems.time).toISOString().slice(0, 10))}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
