import AllParcels from "@/pages/admin/AllParcels"
import type { ISidebarItems } from "@/types/sidebarItems"

export const adminSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/admin",
    items: [
        {
            Component: AllParcels,
            title: "All parcels",
            url: "all-parcels",
        },
    ]
}]

