import type { ComponentType } from "react";

export interface ISidebarItems {
    title: string;
    url: string;
    items: {
        Component: ComponentType
        title: string;
        url: string;
    }[]
}