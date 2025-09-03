import IncomingParcels from "@/pages/receiver/IncomingParcels";
import type { ISidebarItems } from "@/types/sidebarItems";

export const receiverSidebarItems: ISidebarItems[] = [{
    title: "Options",
    url: "/dashboard/receiver",
    items: [
    {
        Component: IncomingParcels,
        title: "Incoming parcels",
        url: "incoming-parcels",
    },
    {
        Component: IncomingParcels,
        title: "Requested parcels",
        url: "requested-parcels",
    },
    {
        Component: IncomingParcels,
        title: "Delivery history",
        url: "delivery-history",
    }
    ]
}]