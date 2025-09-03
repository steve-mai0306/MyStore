import { columns, Product } from "@/app/(vendor)/_components/Columns"
import { DataTable } from "@/app/(vendor)/_components/DataTable"
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout"

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <VendorSidebarLayout>
      <DataTable columns={columns} data={data} />
    </VendorSidebarLayout>
  )
}