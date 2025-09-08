import App from "@/App";
import About from "@/pages/public/About";
import Login from "@/pages/authentication/Login";
import Register from "@/pages/authentication/Register";
import { createBrowserRouter, Navigate } from "react-router";
import Dashboard from "@/pages/dashboard/Dashboard";
import { generatePaths } from "@/utils/generatePaths";
import { senderSidebarItems } from "@/routes/senderSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import Unauthorized from "@/pages/public/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { Role } from "@/types/auth";
import { adminSidebarItems } from "./adminSidebarItems";
import Home from "@/pages/public/Home";
import Contact from "@/pages/public/Contact";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/"
            },
            {
                Component: About,
                path: "/about"
            },
            {
                Component: Contact,
                path: "/contact"
            }
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: withAuth(Dashboard, role.ADMIN as Role),
        path: "/dashboard/admin",
        children: [
            {
                index: true,
                element: <Navigate to={"users"} />
            },
            ...generatePaths(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(Dashboard, role.SENDER as Role),
        path: "/dashboard/sender",
        children: [
            {
                index: true,
                element: <Navigate to={"create-parcel"} />
            },
            ...generatePaths(senderSidebarItems)
        ]
    },
    {
        Component: withAuth(Dashboard, role.RECEIVER as Role),
        path: "/dashboard/receiver",
        children: [
            {
                index: true,
                element: <Navigate to={"incoming-parcels"} />
            },
            ...generatePaths(receiverSidebarItems)
        ]
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    }
])