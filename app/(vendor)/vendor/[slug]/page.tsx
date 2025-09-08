"use client";

import { useState, useRef, useEffect } from "react";
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
import { Settings, Camera } from "lucide-react";
import { useGetProfile } from "@/queries/query";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";
import {
  profileUpdateSchema,
  type ProfileUpdateValues,
  profileAvatarSchema,
} from "@/types/entities/schemas/profile-schema";
import { ZodError } from "zod";
import {
  useUpdateAvatar,
  useUpdateProfile,
} from "@/queries/mutation/useUpdateUser";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
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

export default function VendorDashboardPage() {
  const { slug } = useParams<{ slug: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { data: vendor, isLoading } = useGetProfile(slug);
  const updateAvatarMutation = useUpdateAvatar();
  const updateProfileMutation = useUpdateProfile();

  if (!isLoading && !vendor) {
    notFound();
  }

  // Form setup
  const form = useForm<ProfileUpdateValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      slug: "",
      dateOfBirth: "",
      gender: undefined,
    },
  });

  // Reset form when vendor data changes
  useEffect(() => {
    if (vendor) {
      form.reset({
        firstName: vendor.firstName ?? "",
        lastName: vendor.lastName ?? "",
        email: vendor.email ?? "",
        phoneNumber: vendor.phoneNumber ?? "",
        slug: vendor.slug ?? "",
        dateOfBirth: vendor.dateOfBirth
          ? vendor.dateOfBirth.slice(0, 10) // Ensure YYYY-MM-DD format
          : "",
        gender:
          vendor.gender === undefined
            ? undefined
            : vendor.gender === "true"
            ? true
            : vendor.gender === "false"
            ? false
            : undefined,
      });
    }
  }, [vendor, form]);

  const onProfileSubmit = async (data: ProfileUpdateValues) => {
    try {
      await updateProfileMutation.mutateAsync({
        ...data,
        slug,
      });
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await profileAvatarSchema.parseAsync({ file });
        setSelectedAvatar(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = ev.target?.result as string;
          if (result) setAvatarPreview(result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error(error.issues[0]?.message || "Invalid file");
        } else {
          toast.error("Failed to validate file");
        }
        e.target.value = "";
      }
    }
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
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="vendor-avatar-upload"
                  onChange={handleAvatarChange}
                />
                <label
                  htmlFor="vendor-avatar-upload"
                  className="cursor-pointer block"
                >
                  <span className="relative block">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={
                          avatarPreview || vendor?.avatar || "/placeholder.svg"
                        }
                        alt={vendor?.shopName || vendor?.slug}
                      />
                      <AvatarFallback className="text-2xl font-bold">
                        {vendor?.shopName?.charAt(0) || "V"}
                      </AvatarFallback>
                    </Avatar>
                    {/* Camera icon overlay, only visible on hover */}
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <Camera size={32} color="white" />
                    </span>
                  </span>
                </label>
              </div>
              {selectedAvatar && (
                <div className="flex flex-col items-center gap-2 mt-2">
                  <Button
                    onClick={async () => {
                      try {
                        if (selectedAvatar) {
                          await updateAvatarMutation.mutateAsync({
                            file: selectedAvatar,
                          });
                          // Optionally refetch vendor data here
                          setSelectedAvatar(null);
                          setAvatarPreview(null);
                        }
                      } catch (error) {
                        toast.error("Failed to update avatar");
                      }
                    }}
                    size="default"
                    disabled={updateAvatarMutation.isPending}
                  >
                    {updateAvatarMutation.isPending ? "Updating..." : "Update"}
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
                <h1 className="text-2xl font-bold mb-2">
                  {vendor?.lastName} {vendor?.firstName}
                </h1>
                <div className="flex gap-2">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setDialogOpen(true)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent ref={dialogRef} className="sm:max-w-[40rem]">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                          <DialogHeader>
                            <DialogTitle>Edit Vendor Profile</DialogTitle>
                            <DialogDescription>
                              Update your vendor profile information.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem className="grid gap-3">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
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
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
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
                                    <Input {...field} />
                                  </FormControl>
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
                                    <Input {...field} disabled />
                                  </FormControl>
                                  <FormDescription>
                                    Change your email from account settings.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem className="grid gap-3">
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
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
                            <Button
                              type="submit"
                              disabled={updateProfileMutation.isPending}
                            >
                              {updateProfileMutation.isPending
                                ? "Saving..."
                                : "Save changes"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
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
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {vendor?.phoneNumber || "Not provided"}
                </p>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {vendor?.email}
                </p>
              </div>
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
      </div>
    </VendorSidebarLayout>
  );
}
