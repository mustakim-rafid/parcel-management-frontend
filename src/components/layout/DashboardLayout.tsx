import type { ReactNode } from "react"
import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hook"
import { useGetUserQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { baseApi } from "@/redux/baseApi"
import { Button } from "../ui/button"

interface IProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: IProps) => {
  const {data: userData} = useGetUserQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout(null).unwrap()
      dispatch(baseApi.util.resetApiState())
      toast.success("Successfully logged out")
    } catch (err: any) {
      console.error(err)
      toast.error("Logout failed")
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="w-full flex items-center justify-between px-3">
            <SidebarTrigger />
            <p>Welcome, <span className="font-semibold">{userData?.data?.name}</span></p>
            <Button onClick={handleLogout} variant="secondary" size="sm" className="text-sm cursor-pointer">
              Logout
            </Button>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout