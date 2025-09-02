import CreateParcel from "@/pages/sender/CreateParcel"
import type { ISidebarItems } from "@/types/sidebarItems"

export const senderSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/sender",
    items: [
        {
            Component: CreateParcel,
            title: "Create Parcel Request",
            url: "create-parcel",
        },
        {
            Component: CreateParcel,
            title: "Your created parcels",
            url: "parcels",
        },
        {
            Component: CreateParcel,
            title: "Status",
            url: "status",
        }
    ]
}]

