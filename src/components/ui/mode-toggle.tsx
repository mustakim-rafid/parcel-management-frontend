import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ui/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {
            theme === "light" ? <Moon /> : <Sun />
        }
        <span className="sr-only">Toggle theme</span>
    </Button>
  )
}