import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";
import type { Role } from "@/types/auth";

export const generateSidebarItems = (role: Role) => {
    switch (role) {
        case "ADMIN":
            return adminSidebarItems;
        case "SENDER":
            return senderSidebarItems;
        case "RECEIVER":
            return receiverSidebarItems;
    }
}