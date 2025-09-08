"use client";

import * as React from "react";
import {
  Users,
  Frame,
  Package,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import { DashBoardLogo } from "./Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Explore all",
          url: "/vendor/products",
        },
        {
          title: "Create new",
          url: "/vendor/create-product",
        },
        {
          title: "Update",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All customers",
          url: "/vendor/customers",
        },
        {
          title: "Group customers",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/vendor/setting/general",
        },
        {
          title: "Team",
          url: "/vendor/setting/team",
        },
        {
          title: "Billing",
          url: "/vendor/setting/billing",
        },
        {
          title: "Limits",
          url: "/vendor/setting/limits",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = session?.user
    ? {
        name: session.user.name ?? "Unknown",
        email: session.user.email ?? "No email",
        avatar: session.user.image ?? "",
        slug: session.user.slug ?? "unknown-slug",
      }
    : undefined;

  //console.log("Session data:", session);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <DashBoardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={user}
            onLogout={async () => {
              await signOut({ callbackUrl: "/authen" });
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
