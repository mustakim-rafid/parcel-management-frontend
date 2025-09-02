import IncomingParcels from "@/pages/receiver/IncomingParcels";
import type { ISidebarItems } from "@/types/sidebarItems";

export const receiverSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/receiver",
    items: [
    {
        Component: IncomingParcels,
        title: "Incoming parcels",
        url: "parcels",
    },
    {
        Component: IncomingParcels,
        title: "Confirm parcel",
        url: "confirm-parcel",
    },
    {
        Component: IncomingParcels,
        title: "Status",
        url: "status",
    }
    ]
}]