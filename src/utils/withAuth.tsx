import { useGetUserQuery } from "@/redux/features/auth/auth.api"
import type { Role } from "@/types/auth"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (Component: ComponentType, role?: Role) => {
    return function ComponentWrapper() {
        const { data, isLoading } = useGetUserQuery(undefined)

        if (isLoading) return null

        if (!data?.data?.email) {
            return <Navigate to={"/login"} />
        }

        if (data?.data?.role !== role) {
            return <Navigate to={"/unauthorized"} state={{ fromProtected: true }} />
        }

        return <Component />
    }
}