"use client";

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
} from "lucide-react";
import { OrderCard, WishlistCard, AddressCard } from "../_components";
import { useGetProfile } from "@/queries/query";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: profile, isLoading } = useGetProfile(slug);

  return (
    <>
      <StyledBreadcrumb route={slug} />
      <div className="min-h-screen">
        <Container>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="w-24 h-24 border-2 border-border">
                <AvatarImage src="/professional-headshot.png" alt="Profile" />
                <AvatarFallback className="text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">John Doe</h1>
                <p className="text-muted-foreground mb-3">
                  Customer since March 2020
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    San Francisco, CA
                  </Badge>
                  <Badge variant="outline">Premium Member</Badge>
                </div>
              </div>
              <InteractiveHoverButton icon={<Settings className="w-4 h-4" />}>
                Edit Profile
              </InteractiveHoverButton>
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
                  <CardDescription>
                    Items you've saved for later
                  </CardDescription>
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
                  <CardDescription>
                    Reviews you've written for purchased items
                  </CardDescription>
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
