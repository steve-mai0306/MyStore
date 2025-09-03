"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
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
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
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
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
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
        <DashBoardLogo logo="/assets/my-store-logo.png" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
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
