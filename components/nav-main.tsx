"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  label = "Workspace",
  items,
}: {
  label?: string
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-3 py-4 group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="px-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-sidebar-foreground/48">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
          >
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={pathname === item.url}
              className="h-10 rounded-xl font-medium text-sidebar-foreground/78 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
            >
              <Link href={item.url}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
