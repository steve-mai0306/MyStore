"use client"

import { columns } from "../columns"
import { DataTable } from "@/app/(vendor)/_components/DataTable"
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout"
// Replace with your actual query hook for customers
// import { useGetCustomersByVendor } from "@/queries/query/useGetCustomerList"
import { useMemo } from "react"
import { useUserStore } from "@/store/useUserStore"
import Link from "next/link"

// Dummy hook for demonstration; replace with your actual data fetching logic
function useGetCustomersByVendor() {
  // ...replace with actual implementation...
  return { data: { data: [] }, isLoading: false }
}

export default function CustomersPage() {
  const slug = useUserStore((state) => state.user?.slug)

  const params = useMemo(
    () => ({
      slug,
      pageIndex: 1,
      pageSize: 20,
    }),
    [slug]
  )

  const { data, isLoading } = useGetCustomersByVendor()

  return (
    <VendorSidebarLayout>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        loading={isLoading}
        filterColumn="name"
        emptyState={
          <div className="flex flex-col items-center justify-center py-12 gap-4 bg-muted mx-auto w-full">
            <span className="text-lg font-semibold text-muted-foreground">
              No customers found
            </span>
            <span className="text-sm text-muted-foreground">
              Invite or add customers to see them here.
            </span>
            <Link
              href="/vendor/invite-customer"
              className="inline-block rounded-md bg-primary text-white dark:bg-muted-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/80"
            >
              + Invite Customer
            </Link>
          </div>
        }
      />
    </VendorSidebarLayout>
  )
}
