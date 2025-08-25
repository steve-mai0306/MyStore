"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import VendorSidebarLayout from "../../layout/SidebarLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Star, MapPin, Edit3, Save, X, Upload } from "lucide-react";
import { useGetProfile } from "@/queries/query";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function VendorDashboardPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const { data: vendor, isLoading } = useGetProfile(slug);

  if (!isLoading && !vendor) {
    notFound();
  }

  const [vendorData, setVendorData] = useState({
    name: "Bella's Fashion Boutique",
    slug: slug,
    description:
      "Curating timeless elegance with contemporary flair. Specializing in premium women's fashion, from casual chic to formal sophistication.",
    avatar: "/fashion-boutique-owner.png",
    rating: 4.8,
    reviewCount: 247,
    location: "Downtown Fashion District, NYC",
    phone: "+1 (555) 123-4567",
    email: "hello@bellasfashion.com",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    isActive: true,
    acceptingOrders: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("[v0] Saving vendor data:", vendorData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateVendorData = (field: keyof typeof vendorData, value: string | boolean) => {
    setVendorData((prev) => ({ ...prev, [field]: value }));
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <VendorSidebarLayout
        breadcrumb={[
          { label: "Dashboard", href: "/vendor" },
          { label: slug || "Profile" },
        ]}
      >
        <div className="space-y-5">
          {/* Profile Header Skeleton */}
          <Card className="border-none shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                <div className="relative">
                  <Skeleton className="h-24 w-24 rounded-full" />
                </div>
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-40" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-9 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Separator />
              <Skeleton className="h-6 w-40" />
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Shop Settings Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-80" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-11" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-72" />
                </div>
                <Skeleton className="h-6 w-11" />
              </div>
            </CardContent>
          </Card>
        </div>
      </VendorSidebarLayout>
    );
  }

  return (
    <VendorSidebarLayout
      breadcrumb={[
        { label: "Dashboard", href: "/vendor" },
        { label: slug || "Profile" },
      ]}
    >
      <div className="space-y-5">
        {/* Profile Header */}
        <Card className="border-none shadow-none mt-3">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-border shadow-lg">
                  <AvatarImage
                    src={vendorData.avatar || "/placeholder.svg"}
                    alt={vendorData.name}
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    BF
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 p-0"
                  >
                    <Upload className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={vendorData.name}
                    onChange={(e) => updateVendorData("name", e.target.value)}
                    className="text-2xl font-bold mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-2">
                    {vendor?.lastName} {vendor?.firstName}{" "}
                  </h1>
                )}

                <div className="flex flex-col items-center md:items-start gap-3 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vendorData.rating}</span>
                    <span className="opacity-90">
                      ({vendorData.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={vendorData.location}
                        onChange={(e) =>
                          updateVendorData("location", e.target.value)
                        }
                        className="text-sm h-6 w-48"
                      />
                    ) : (
                      <span className="opacity-90">{vendorData.location}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSave}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Your business contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={vendorData.phone}
                    onChange={(e) => updateVendorData("phone", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    {vendor?.phoneNumber || "Not provided"}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={vendorData.email}
                    onChange={(e) => updateVendorData("email", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    {vendor?.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="hours">Business Hours</Label>
              {isEditing ? (
                <Input
                  id="hours"
                  value={vendorData.hours}
                  onChange={(e) => updateVendorData("hours", e.target.value)}
                />
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  {vendorData.hours}
                </p>
              )}
            </div>
            <Separator />
            <CardTitle>Your Shop Information</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shopname">Shop Name</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {vendor?.shopName}
                </p>
              </div>
              <Link href="#" className="underline text-sm">
                Change shop name
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Shop Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Settings</CardTitle>
            <CardDescription>
              Manage your shop visibility and order preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Shop Status</Label>
                <p className="text-sm text-muted-foreground">
                  Make your shop visible to customers
                </p>
              </div>
              <Switch
                checked={vendorData.isActive}
                onCheckedChange={(checked) =>
                  updateVendorData("isActive", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Accepting Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to place new orders
                </p>
              </div>
              <Switch
                checked={vendorData.acceptingOrders}
                onCheckedChange={(checked) =>
                  updateVendorData("acceptingOrders", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorSidebarLayout>
  );
}
