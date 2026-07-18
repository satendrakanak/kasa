import Link from "next/link";
import {
  GlobeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function hasAvatar(avatar?: string) {
  return Boolean(avatar?.trim());
}

export function AdminTopNavUser({
  user,
}: {
  user: { name: string; email: string; avatar?: string };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 rounded-full border-[color:var(--button-outline-border)] bg-white/80 px-2 shadow-sm backdrop-blur dark:bg-white/5">
          <Avatar size="sm">
            {hasAvatar(user.avatar) ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : null}
            <AvatarFallback className="bg-sidebar-accent text-[0.65rem] font-semibold text-sidebar-accent-foreground">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-28 truncate text-sm md:inline">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              {hasAvatar(user.avatar) ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-sidebar-accent font-semibold text-sidebar-accent-foreground">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <LayoutDashboardIcon />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/settings">
              <Settings2Icon />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <GlobeIcon />
              View website
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/logout">
            <LogOutIcon />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
