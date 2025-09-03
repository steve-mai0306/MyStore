import { AppSidebar } from "../_components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

export default function VendorSidebarLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: BreadcrumbItemType[];
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b shadow-md sticky top-0 z-50 bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {(breadcrumb ?? [{ label: "Dashboard" }]).map(
                  (item, idx, arr) => (
                    <React.Fragment key={`breadcrumb-${idx}-${item.label}`}>
                      <BreadcrumbItem>
                        {idx === arr.length - 1 ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : item.href ? (
                          <a href={item.href}>{item.label}</a>
                        ) : (
                          item.label
                        )}
                      </BreadcrumbItem>
                      {idx < arr.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  )
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 z-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
