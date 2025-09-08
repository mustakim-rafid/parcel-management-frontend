import type { ISidebarItems } from "@/types/sidebarItems"
import { lazy } from "react"

const CancelParcel = lazy(() => import("@/pages/sender/CancelParcel"))
const CreateParcel = lazy(() => import("@/pages/sender/CreateParcel"))
const SenderParcels = lazy(() => import("@/pages/sender/SenderParcels"))

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
            Component: CancelParcel,
            title: "Cancel parcel",
            url: "cancel-parcel",
        }
    ]
}]

