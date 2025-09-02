import DashboardLayout from "@/components/layout/DashboardLayout"
import { Outlet } from "react-router"

const Dashboard = () => {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  )
}

export default Dashboard