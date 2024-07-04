import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    role: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = window.location.pathname;
  const {user} = useAuth();
  return (
    <div
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        (user && user.role.includes(item.role))?
        <NavLink
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-secondary hover:bg-primary"
              : "hover:bg-primary hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </NavLink>: <div key={item.href}></div>
        
      ))}
    </div>
  )
}
