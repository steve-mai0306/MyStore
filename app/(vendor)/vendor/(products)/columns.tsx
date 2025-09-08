"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useDeleteProduct } from "@/queries/mutation/useProduct";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Product } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const url = row.getValue("imageUrl") as string;
      return (
        <div className="shrink-0">
          <Image
            src={url}
            alt="Product"
            width={48}
            height={50}
            style={{
              objectFit: "cover",
              borderRadius: 6,
              width: "50px",
              height: "60px",
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => {
      const colors = row.getValue("colors") as {
        id: number;
        hexValue: string;
        themeColor: string;
      }[];
      const count = Array.isArray(colors) ? colors.length : 0;
      return `${count} variants`;
    },
  },

  {
    accessorKey: "sizes",
    header: "Sizes",
    cell: ({ row }) => {
      const sizes = row.getValue("sizes") as
        | { id: number; productSize: string }[]
        | null;
      const count = Array.isArray(sizes) ? sizes.length : 0;
      return `${count} sizes`;
    },
  },
  {
    accessorKey: "totalSold",
    header: "Sold",
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const deleteProductMutation = useDeleteProduct();
      const [open, setOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(`${product.id}`)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View orders</DropdownMenuItem>
              <Link href={`/vendor/products/${product.id}`}>
                <DropdownMenuItem>View product details</DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="bg-destructive hover:!bg-destructive/90 text-white hover:!text-white"
                disabled={deleteProductMutation.isPending}
                onClick={() => setOpen(true)}
              >
                <Trash color="white" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
              </DialogHeader>
              <div>
                Are you sure you want to delete <b>{product.productName}</b>?
                This action cannot be undone.
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={deleteProductMutation.isPending}
                  onClick={() => {
                    deleteProductMutation.mutate(product.id, {
                      onSuccess: () => setOpen(false),
                    });
                  }}
                >
                  {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
