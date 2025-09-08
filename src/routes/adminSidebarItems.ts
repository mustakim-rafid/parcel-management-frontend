import type { ISidebarItems } from "@/types/sidebarItems"
import { lazy } from "react"

const AllParcels = lazy(() => import("@/pages/admin/AllParcels"))
const AllUsers = lazy(() => import("@/pages/admin/AllUsers"))

export const adminSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/admin",
    items: [
        {
            Component: AllUsers,
            title: "All users",
            url: "users",
        },
        {
            Component: AllParcels,
            title: "All parcels",
            url: "parcels",
        }
    ]
}]

