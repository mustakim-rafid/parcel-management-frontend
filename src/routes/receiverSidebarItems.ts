import type { ISidebarItems } from "@/types/sidebarItems";
import { lazy } from "react";

const DeliveryDetails = lazy(() => import("@/pages/receiver/DeliveryDetails"))
const IncomingParcels = lazy(() => import("@/pages/receiver/IncomingParcels"))
const RequestedParcels = lazy(() => import("@/pages/receiver/RequestedParcels"))

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
        Component: DeliveryDetails,
        title: "Delivery history",
        url: "delivery-history",
    }
    ]
}]