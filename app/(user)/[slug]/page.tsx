"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StyledBreadcrumb } from "@/components/styled";
import { Container } from "@/components/layout";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  ShoppingBag,
  Star,
  Plus,
  User,
  ChevronDownIcon,
} from "lucide-react";
import { OrderCard, WishlistCard, AddressCard } from "../_components";
import { useGetProfile } from "@/queries/query";
import { useParams, notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: profile, isLoading } = useGetProfile(slug);
  //const setProfile = useProfileStore((state) => state.setProfile);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  if (!isLoading && !profile) {
    notFound();
  }

  return (
    <>
      <StyledBreadcrumb route={slug} />
      <div className="min-h-screen">
        <Container>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {isLoading ? (
                <>
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1">
                    <div className="flex gap-4 items-center mb-2">
                      <Skeleton className="h-8 w-40" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-6 w-64 mb-3" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-32" />
                </>
              ) : (
                <>
                  <Avatar className="w-24 h-24 border-2 border-border">
                    <AvatarImage
                      src={profile?.avatar ?? undefined}
                      alt={profile?.slug}
                    />
                    <AvatarFallback className="text-xl font-semibold">
                      {profile?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex gap-4 items-center mb-2">
                      <h1 className="text-2xl font-bold">
                        {profile?.lastName} {profile?.firstName}
                      </h1>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {profile?.slug}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            You can edit your slug which how we recognize you{" "}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {profile?.email || "No email provided"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        San Francisco, CA
                      </Badge>
                      <Badge variant="secondary">
                        <User />
                        Standar user
                      </Badge>
                    </div>
                  </div>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <InteractiveHoverButton icon={<Settings size={18} />}>
                          Edit Profile
                        </InteractiveHoverButton>
                      </DialogTrigger>
                      <DialogContent
                        ref={dialogRef}
                        className="sm:max-w-[425px]"
                      >
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-3">
                            <div className="grid gap-3">
                              <Label htmlFor="firstName">Name</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                defaultValue={profile?.firstName || ""}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="lastName">Name</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                defaultValue={profile?.lastName || ""}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="username-1">Slug</Label>
                            <Input
                              id="slug"
                              name="slug"
                              defaultValue={profile?.slug || ""}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              defaultValue={profile?.email || ""}
                              disabled
                            />
                          </div>
                          <Link
                            href="#"
                            className="mr-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Change email address?
                          </Link>
                          <div className="grid gap-3">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              defaultValue={profile?.phoneNumber || ""}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-3">
                            <div className="grid gap-3">
                              <Label htmlFor="date">Date of birth</Label>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="justify-between font-normal"
                                  >
                                    {date
                                      ? date.toLocaleDateString()
                                      : "Select date"}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                      setDate(date);
                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="grid gap-3">
                              <Select>
                                <Label htmlFor="gender">Select gender</Label>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Your gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Orders
                    </p>
                    <p className="text-xl font-bold">24</p>
                  </div>
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Wishlist
                    </p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Saved
                    </p>
                    <p className="text-xl font-bold">$340</p>
                  </div>
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Reviews
                    </p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                  <Star className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Your order history and tracking information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <OrderCard />
                  <OrderCard />
                  <OrderCard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist Items</CardTitle>
                  <CardDescription>Items saved</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <WishlistCard />
                  <WishlistCard />
                  <WishlistCard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>
                    Manage your shipping and billing addresses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AddressCard />
                  <AddressCard />
                  <AddressCard />
                  <InteractiveHoverButton icon={<Plus />}>
                    Add New Address
                  </InteractiveHoverButton>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reviews</CardTitle>
                  <CardDescription>Reviews for purchased items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      product: "Wireless Headphones",
                      rating: 5,
                      date: "Jan 20, 2024",
                      review:
                        "Excellent sound quality and comfortable fit. Highly recommended!",
                    },
                    {
                      product: "Running Shoes",
                      rating: 4,
                      date: "Jan 15, 2024",
                      review:
                        "Great for daily runs, very comfortable and durable.",
                    },
                    {
                      product: "Phone Case",
                      rating: 5,
                      date: "Jan 10, 2024",
                      review:
                        "Perfect fit and great protection. Love the design!",
                    },
                  ].map((review, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{review.product}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${
                                j < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {review.review}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </>
  );
}
