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
  Camera,
} from "lucide-react";
import { OrderCard, WishlistCard, AddressCard } from "../_components";
import { useUser } from "@/hooks/use-user";
import { useUpdateAvatar } from "@/queries/mutation/useUpdateUser";
import { useParams, notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  profileAvatarSchema,
  profileUpdateSchema,
  type ProfileUpdateValues,
} from "@/types/entities/schemas/profile-schema";
import { ZodError } from "zod";
import { toast } from "sonner";

export default function ProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, setUser, isLoading } = useUser();
  const updateAvatarMutation = useUpdateAvatar();

  //console.log(isLoading);

  // console.log(profile)

  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [selectedAvatar, setSelectedAvatar] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const form = useForm<ProfileUpdateValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      slug: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: undefined,
    },
  });

  // Reset form with user data when it becomes available
  React.useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        slug: user.slug || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth:
          user.dateOfBirth && user.dateOfBirth.length >= 10
            ? user.dateOfBirth.slice(0, 10)
            : "",
        gender: user.gender ?? undefined,
      });
    }
  }, [user, form]);

  const onProfileSubmit = (data: ProfileUpdateValues) => {
    console.log("Profile update data:", data);
    toast.success("Profile updated successfully!");
    // Close the dialog
    if (dialogRef.current) {
      const closeButton = dialogRef.current.querySelector(
        "[data-dialog-close]"
      ) as HTMLButtonElement | null;
      if (closeButton) closeButton.click();
    }
  };

  if (isLoading) {
    return (
      <>
        <StyledBreadcrumb route={slug} />
        <div className="min-h-screen">
          <Container>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row text-center items-center md:items-center md:text-start gap-6">
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
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-16 mb-2" />
                        <Skeleton className="h-6 w-12" />
                      </div>
                      <Skeleton className="w-6 h-6 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (!user) {
    notFound();
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Validate file using the schema
        await profileAvatarSchema.parseAsync({ file });

        setSelectedAvatar(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            setAvatarPreview(result);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        if (error instanceof ZodError) {
          // Get the first error message from Zod validation
          const errorMessage = error.issues[0]?.message;
          toast.error(errorMessage || "Invalid file");
        } else {
          toast.error("Failed to validate file");
        }
        // Reset the input
        e.target.value = "";
      }
    }
  };

  return (
    <>
      <StyledBreadcrumb route={slug} />
      <div className="min-h-screen">
        <Container>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row text-center items-center md:items-center md:text-start gap-6">
              <>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatar-upload"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer block"
                  >
                    <Avatar className="w-24 h-24 border-2 border-border">
                      <AvatarImage
                        src={avatarPreview || (user?.avatar ?? undefined)}
                        alt={user?.slug}
                      />
                      <AvatarFallback className="text-xl font-semibold">
                        {user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <Camera size={32} color="white" />
                    </div>
                  </label>
                </div>
                {/* Update Avatar Button */}
                {selectedAvatar && (
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      onClick={async () => {
                        try {
                          if (selectedAvatar) {
                            await updateAvatarMutation.mutateAsync({
                              file: selectedAvatar,
                            });

                            if (user && avatarPreview) {
                              setUser({ ...user, avatar: avatarPreview });
                            }
                            setSelectedAvatar(null);
                            setAvatarPreview(null);
                          }
                        } catch (error) {
                          console.error("Failed to update avatar:", error);
                        }
                      }}
                      size="default"
                      disabled={updateAvatarMutation.isPending}
                    >
                      {updateAvatarMutation.isPending
                        ? "Updating..."
                        : "Update"}
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        setSelectedAvatar(null);
                        setAvatarPreview(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex gap-4 items-center justify-center md:justify-start mb-2">
                    <h1 className="text-2xl font-bold">
                      {user?.lastName} {user?.firstName}
                    </h1>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="hidden md:block">
                          {user?.slug}
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
                    {user?.email || "No email provided"}
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
                  <DialogTrigger asChild>
                    <InteractiveHoverButton icon={<Settings size={18} />}>
                      Edit Profile
                    </InteractiveHoverButton>
                  </DialogTrigger>
                  <DialogContent ref={dialogRef} className="sm:max-w-[40rem]">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-3">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem className="grid gap-3">
                                  <FormLabel>First name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      value={field.value ?? ""}
                                      type="text"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem className="grid gap-3">
                                  <FormLabel>Last name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      value={field.value ?? ""}
                                      type="text"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                              <FormItem className="grid gap-3">
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Edit slug may change the way people find you.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="grid gap-3">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled
                                    value={field.value ?? ""}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Link
                            href="#"
                            className="mr-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Change email address?
                          </Link>
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="grid gap-3">
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    {...field}
                                    value={field.value ?? ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-3 items-start">
                            <FormField
                              control={form.control}
                              name="dateOfBirth"
                              render={({ field }) => (
                                <FormItem className="grid gap-3">
                                  <FormLabel>Date of birth</FormLabel>
                                  <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className="justify-between font-normal w-full"
                                        >
                                          {field.value
                                            ? field.value.slice(0, 10) // Only show YYYY-MM-DD
                                            : "Select date"}
                                          <ChevronDownIcon />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto overflow-hidden p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
                                        }
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                          if (date) {
                                            const formatted = `${date.getFullYear()}-${String(
                                              date.getMonth() + 1
                                            ).padStart(2, "0")}-${String(
                                              date.getDate()
                                            ).padStart(2, "0")}`;
                                            field.onChange(formatted);
                                          } else {
                                            field.onChange("");
                                          }
                                          setOpen(false);
                                        }}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem className="grid gap-3">
                                  <FormLabel>Select gender</FormLabel>
                                  <Select
                                    onValueChange={(value) => {
                                      // Convert the string value to boolean
                                      field.onChange(value === "true");
                                    }}
                                    value={
                                      field.value !== undefined
                                        ? String(field.value)
                                        : ""
                                    }
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Your gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="true">
                                          Male
                                        </SelectItem>
                                        <SelectItem value="false">
                                          Female
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" disabled={updateAvatarMutation.isPending}>
                            {updateAvatarMutation.isPending ? "Saving..." : "Save changes"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </>
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
                    Manage your shipping and billing addresses (0/3 added)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AddressCard />
                  <AddressCard />
                  <AddressCard />
                  <Dialog>
                    <DialogTrigger asChild>
                      <InteractiveHoverButton icon={<Plus />}>
                        Add New Address
                      </InteractiveHoverButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[40rem]">
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                          Add a new shipping or billing address to your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Enter last name"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            placeholder="Enter street address"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter city" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" placeholder="Enter state" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                            <Input id="zipCode" placeholder="Enter ZIP code" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">
                                  United States
                                </SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="uk">
                                  United Kingdom
                                </SelectItem>
                                <SelectItem value="vn">Vietnam</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="addressType">Address Type</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select address type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="shipping">
                                Shipping Address
                              </SelectItem>
                              <SelectItem value="billing">
                                Billing Address
                              </SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="default" />
                          <div className="grid gap-2">
                            <Label htmlFor="terms-2">
                              Set as default address
                            </Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Address</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
