"use client";

import * as React from "react";
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { X, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { type ChangeEvent, useState, useEffect } from "react";
import { useGetCreateOptions } from "@/queries/query";
import {
  createProductSchema,
  CreateProductValues,
} from "@/types/entities/schemas/create-schema";
import MultipleSelector from "@/components/ui/mutiple-selector";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { useCreateProduct } from "@/queries/mutation/useProduct";

function formatThousand(value: number | string) {
  if (value === null || value === undefined) return "";
  const num = typeof value === "string" ? value.replace(/\D/g, "") : value;
  return num ? Number(num).toLocaleString("en-US") : "";
}

export default function CreateProductPage() {
  const [images, setImages] = useState<File[]>([]);

  const { data: createOptions, isLoading } = useGetCreateOptions();
  const createProductMutation = useCreateProduct();

  const form = useForm<CreateProductValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      ProductName: "",
      Quantity: 0,
      Price: 0,
      Description: "",
      Status: 1,
      CategoryId: undefined,
      Images: [],
      ColorId: [],
      SizeId: [],
      TagId: [],
    },
    shouldUnregister: true,
  });

  // Synchronize images state with form Images field
  useEffect(() => {
    form.setValue(
      "Images",
      images.map((file) => file.name)
    );
  }, [images, form]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && images.length < 5 && file.type.startsWith("image/")) {
      setImages((prev) => [...prev, file]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submit handler
  const handleSubmit = form.handleSubmit((values) => {
    const formData = new FormData();
    formData.append("ProductName", values.ProductName);
    formData.append("Quantity", String(values.Quantity));
    formData.append("Price", String(values.Price));
    formData.append("Description", values.Description);
    formData.append("Status", String(values.Status));
    if (values.CategoryId !== undefined)
      formData.append("CategoryId", String(values.CategoryId));
    images.forEach((file) => {
      formData.append("Images", file);
    });
    // Multi-selects
    values.ColorId?.forEach((id) => formData.append("ColorId", String(id)));
    values.SizeId?.forEach((id) => formData.append("SizeId", String(id)));
    values.TagId?.forEach((id) => formData.append("TagId", String(id)));

    createProductMutation.mutate(formData);
  });

  return (
    <VendorSidebarLayout
      breadcrumb={[
        { label: "Dashboard", href: "/vendor" },
        { label: "Create Product" },
      ]}
    >
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold my-5">Create New Product</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ProductName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter product name"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            inputMode="numeric"
                            required
                            placeholder="0"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "");
                              const num = raw === "" ? 0 : Number(raw);
                              field.onChange(num);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            inputMode="numeric"
                            min={0}
                            required
                            placeholder="0"
                            value={formatThousand(field.value)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/,/g, "");
                              const num = Number(raw);
                              if (!isNaN(num)) {
                                field.onChange(num);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="CategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                          required
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {createOptions?.categories?.map(
                              ({
                                id,
                                categoryName,
                              }: {
                                id: number;
                                categoryName: string;
                              }) => (
                                <SelectItem key={id} value={String(id)}>
                                  {categoryName}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <MinimalTiptap
                          {...field}
                          placeholder="Product description..."
                          className="min-h-[400px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images *</CardTitle>
                <CardDescription>
                  Upload high-quality images of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <>
                  {/* Display uploaded images in grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square"
                        >
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            quality={100}
                            className="object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload area - only show if less than 5 images */}
                  {images.length < 5 && (
                    <label className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Upload Image ({images.length}/5)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </>

                {/* Show message when max images reached */}
                {images.length >= 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Maximum 5 images reached. Remove some images to add more.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Product Status, Size, Color, Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
                <CardDescription>
                  Set product specs and add relevant tags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <>
                  <FormField
                    control={form.control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select
                          value={String(field.value)}
                          onValueChange={(val) => field.onChange(Number(val))}
                          required
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* map statuses from API */}
                            {createOptions?.statuses?.map(
                              ({
                                id,
                                status,
                              }: {
                                id: number;
                                status: string;
                              }) => (
                                <SelectItem key={id} value={String(id)}>
                                  {status}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Status which appear to customers view
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Size MultiSelector */}
                  <FormField
                    control={form.control}
                    name="SizeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            badgeClassName="bg-muted text-foreground"
                            options={
                              createOptions?.sizes?.map(
                                ({ id, productSize }) => ({
                                  value: String(id),
                                  label: productSize,
                                })
                              ) ?? []
                            }
                            value={(field.value ?? []).map((id) => {
                              const size = createOptions?.sizes?.find(
                                (s) => s.id === id
                              );
                              return size
                                ? {
                                    value: String(size.id),
                                    label: size.productSize,
                                  }
                                : { value: String(id), label: String(id) };
                            })}
                            onChange={(
                              selected: { value: string; label: string }[]
                            ) =>
                              field.onChange(
                                selected.map((opt) => Number(opt.value))
                              )
                            }
                            placeholder="Select sizes"
                          />
                        </FormControl>
                        <FormDescription>
                          Set available sizes for the product
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
                <>
                  {/* Color block multi-select */}
                  <FormField
                    control={form.control}
                    name="ColorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <div>
                            {/* Show skeleton if loading */}
                            {isLoading ? (
                              <div className="flex flex-wrap gap-2">
                                {[...Array(6)].map((_, idx) => (
                                  <Skeleton
                                    key={idx}
                                    className="w-8 h-8 rounded border-2 border-muted"
                                  />
                                ))}
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-wrap gap-2">
                                  {createOptions?.colors?.map(
                                    ({ id, themeColor, hexValue }) => {
                                      const selected =
                                        field.value?.includes(id);
                                      return (
                                        <button
                                          key={id}
                                          type="button"
                                          className={`w-8 h-8 rounded border-2 flex items-center justify-center transition
                          ${selected ? "border-blue-500" : "border-muted"}
                        `}
                                          style={{ backgroundColor: hexValue }}
                                          title={themeColor}
                                          onClick={() => {
                                            if (selected) {
                                              field.onChange(
                                                (field.value ?? []).filter(
                                                  (v) => v !== id
                                                )
                                              );
                                            } else {
                                              field.onChange([
                                                ...(field.value ?? []),
                                                id,
                                              ]);
                                            }
                                          }}
                                        ></button>
                                      );
                                    }
                                  )}
                                </div>
                                {/* Render selected colors below */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {field.value?.map((id) => {
                                    const color = createOptions?.colors?.find(
                                      (c) => c.id === id
                                    );
                                    if (!color) return null;
                                    return (
                                      <div
                                        key={id}
                                        className="flex items-center gap-1"
                                      >
                                        <span
                                          className="w-5 h-5 rounded-full border"
                                          style={{
                                            backgroundColor: color.hexValue,
                                          }}
                                          title={color.themeColor}
                                        ></span>
                                        <span className="text-xs">
                                          {color.themeColor}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choose at least 1 or more colors available
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Tag MultiSelector */}
                  <FormField
                    control={form.control}
                    name="TagId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            badgeClassName="bg-muted text-foreground"
                            options={
                              createOptions?.tags?.map(({ id, tagName }) => ({
                                value: String(id),
                                label: tagName,
                              })) ?? []
                            }
                            value={(field.value ?? []).map((id) => {
                              const tag = createOptions?.tags?.find(
                                (t) => t.id === id
                              );
                              return tag
                                ? { value: String(tag.id), label: tag.tagName }
                                : { value: String(id), label: String(id) };
                            })}
                            onChange={(
                              selected: { value: string; label: string }[]
                            ) =>
                              field.onChange(
                                selected.map((opt) => Number(opt.value))
                              )
                            }
                            placeholder="Select tags"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={createProductMutation.isPending}>
                {createProductMutation.isPending
                  ? "Creating..."
                  : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </VendorSidebarLayout>
  );
}
