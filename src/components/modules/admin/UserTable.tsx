import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api"
import type { IShowUser } from "@/types/auth"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface IProps {
  tableItems: IShowUser
}

export default function UserTable({ tableItems }: IProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [updateUser] = useUpdateUserMutation()

    const handleBlockUser = async () => {
        setIsSubmitting(true)
        try {
            const res = await updateUser({
                id: tableItems._id,
                data: {
                    isBlocked: true
                }
            }).unwrap()
            toast.success(`User blocked, ${res.message}`)
        } catch (err: any) {
            toast.error(err?.data?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUnblockUser = async () => {
        setIsSubmitting(true)
        try {
            const res = await updateUser({
                id: tableItems._id,
                data: {
                    isBlocked: false
                }
            }).unwrap()
            toast.success(`User unblocked, ${res.message}`)
        } catch (err: any) {
            toast.error(err?.data?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className="mx-auto max-w-lg">
      <div className="bg-background overflow-hidden rounded-md border">
        <div className="text-end p-2">
            {
            tableItems.role !== "ADMIN" && (
                tableItems.isBlocked ? (
                    <Button onClick={handleUnblockUser} className="cursor-pointer dark:text-black font-bold">
                        {
                            isSubmitting ? (
                                <>
                                <Loader2 className="animate-spin" /> Unblocking... 
                                </>
                            ) : "Unblock user"
                        }
                    </Button>
                ) : (
                    <Button onClick={handleBlockUser} variant="destructive" className="cursor-pointer">
                        {
                            isSubmitting ? (
                                <>
                                <Loader2 className="animate-spin" /> Blocking... 
                                </>
                            ) : "Block user"
                        }
                    </Button>
                )
            )
            }
        </div>
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Name
              </TableCell>
              <TableCell className="py-2">{tableItems.name}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Email
              </TableCell>
              <TableCell className="py-2">{tableItems.email}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Role
              </TableCell>
              <TableCell className="py-2">{tableItems.role}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Phone
              </TableCell>
              <TableCell className="py-2">{tableItems.phone}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Blocked
              </TableCell>
              <TableCell className="py-2">{tableItems.isBlocked ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Verified
              </TableCell>
              <TableCell className="py-2">{tableItems.isVerified ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Account created
              </TableCell>
              <TableCell className="py-2">{(new Date(tableItems.createdAt).toISOString().slice(0, 10))}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Account updated
              </TableCell>
              <TableCell className="py-2">{(new Date(tableItems.updatedAt).toISOString().slice(0, 10))}</TableCell>
            </TableRow>
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Address
              </TableCell>
              <TableCell className="py-2">{tableItems.address.state}, {tableItems.address.city}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
