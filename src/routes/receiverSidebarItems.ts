import IncomingParcels from "@/pages/receiver/IncomingParcels";
import RequestedParcels from "@/pages/receiver/RequestedParcels";
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
        Component: RequestedParcels,
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