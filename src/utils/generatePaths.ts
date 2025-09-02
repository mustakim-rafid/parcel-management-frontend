import type { ISidebarItems } from "@/types/sidebarItems";

export const generatePaths = (sidebarItems: ISidebarItems[]) => {
    return sidebarItems.flatMap(item => {
        return item.items.map(children => {
            return {
                Component: children.Component,
                path: children.url
            }
        })
    })
}