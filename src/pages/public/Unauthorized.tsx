import { ArrowRightIcon, CircleAlert } from "lucide-react"
import { Link, Navigate, useLocation } from "react-router"

export default function Unauthorized() {
    const location = useLocation()

    if (!location.state?.fromProtected) {
        return <Navigate to={"/"} replace />
    }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-background z-50 max-w-[400px] rounded-md border px-4 py-3 shadow-lg">
      <div className="flex gap-2">
        <div className="flex grow gap-3">
          <CircleAlert
            className="mt-0.5 shrink-0 text-red-500"
            size={16}
            aria-hidden="true"
          />
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">Unauthorized request!</p>
            <Link to="/" className="group text-sm font-medium whitespace-nowrap hover:underline">
              Home
              <ArrowRightIcon
                className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
