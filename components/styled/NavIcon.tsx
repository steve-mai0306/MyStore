"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui";
import { Search, Star, ShoppingBasket } from "lucide-react";

export const NavIcon = () => {
  return (
    <>
      <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
        <Search />
      </Button>
      <Link href="/wishlist">
        <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
          <Star />
        </Button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <ShoppingBasket />
          </Button>
        </SheetTrigger>
        <SheetContent className="z-100">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <div>
                list here
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
