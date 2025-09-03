import CreateParcel from "@/pages/sender/CreateParcel"
import SenderParcels from "@/pages/sender/SenderParcels"
import type { ISidebarItems } from "@/types/sidebarItems"

export const senderSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/sender",
    items: [
        {
            Component: CreateParcel,
            title: "Create parcel request",
            url: "create-parcel",
        },
        {
            Component: SenderParcels,
            title: "Parcel details",
            url: "parcels",
        },
        {
            Component: CreateParcel,
            title: "Cancel parcel",
            url: "cancel-parcel",
        }
    ]
}]

