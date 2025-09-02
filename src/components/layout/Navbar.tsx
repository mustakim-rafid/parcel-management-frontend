import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router"
import { ModeToggle } from "../ui/mode-toggle"
import { useGetUserQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hook"
import { baseApi } from "@/redux/baseApi"
import { Skeleton } from "../ui/skeleton"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" }
]

export default function Navbar() {
  const { data, isLoading } = useGetUserQuery(undefined)
  const [ logout ] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout(null).unwrap()
      dispatch(baseApi.util.resetApiState())
      toast.success("Successfully logged out")
    } catch (err: any) {
      console.error(err)
      toast.error("Logout failed")
    }
  }

  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-16" /> 
          <Skeleton className="h-5 w-16" /> 
          <Skeleton className="h-5 w-16" /> 
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-10" /> 
          <Skeleton className="h-5 w-10" /> 
        </div>
      </div>
    )
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuItem>
                  ))}
                  {
                    data?.data?.email && (
                      <NavigationMenuItem className="w-full">
                        <Link to={`/dashboard/${data?.data?.role.toLowerCase()}`}>Dashboard</Link>
                      </NavigationMenuItem>
                    )
                  }
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-10">
            <Link to={"/"} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-5">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      href={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                { 
                  data?.data?.email && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      href={`/dashboard/${data?.data?.role.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={`/dashboard/${data?.data?.role.toLowerCase()}`}>Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  ) 
                }
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {
            data?.data?.email ? (
              <>
              <Button onClick={handleLogout} variant="secondary" size="sm" className="text-sm cursor-pointer">
                Logout
              </Button>
              </>
            ) : (
              <>
              <Button asChild variant="secondary" size="sm" className="text-sm">
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button asChild size="sm" className="text-sm font-bold dark:text-background">
                <Link to={"/register"}>Register</Link>
              </Button>
              </>
            )
          }    
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
