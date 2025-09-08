import AllParcels from "@/pages/admin/AllParcels"
import AllUsers from "@/pages/admin/AllUsers"
import type { ISidebarItems } from "@/types/sidebarItems"

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

