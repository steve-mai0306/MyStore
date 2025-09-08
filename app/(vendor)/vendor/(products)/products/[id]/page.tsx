"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductById } from "@/queries/query/useGetProduct";
import { useGetCreateOptions } from "@/queries/query/useGetCreateOptions";
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout";
import { VendorWrapper } from "@/app/(vendor)/_components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/mutiple-selector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  createProductSchema,
  CreateProductValues,
} from "@/types/entities/schemas/create-schema";
import { NumericFormat } from 'react-number-format';

// import { useUpdateProduct } from "@/queries/mutation/useProduct"; // implement your own update mutation

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const { data: product, isLoading } = useGetProductById(id);
  // const updateProductMutation = useUpdateProduct(); // implement your own mutation

  // For gallery, support multiple images if available
  const images = Array.isArray(product?.imageUrls)
    ? product?.imageUrls
    : product?.imageUrls
    ? [product.imageUrls]
    : [];

  // Local state for images if you want to allow uploading new images
  const [localImages, setLocalImages] = useState<string[]>(images);

  useEffect(() => {
    if (images.length) setLocalImages(images);
  }, [product]);

  const form = useForm<CreateProductValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      ProductName: product?.productName || "",
      Quantity: product?.quantity || 0,
      Price: product?.price || 0,
      Description: product?.description || "",
      Status: product?.status || 1,
      CategoryId: product?.categoryId || undefined,
      Images: [],
      ColorId: [],
      SizeId: [],
      TagId: [],
      SKU: "",
    },
    mode: "onChange",
  });

  // Add this effect to update form values when product data loads
  useEffect(() => {
    if (product) {
      form.reset({
        ProductName: product.productName || "",
        Quantity: product.quantity || 0,
        Price: product.price || 0,
        Description: product.description || "",
        Status: product.status || 1,
        CategoryId: product.categoryId || undefined,
        Images: product.imageUrls || [],
        ColorId: product.colors?.map((c) => c.id) || [],
        SizeId: product.sizes?.map((s) => s.id) || [],
        TagId: product.tags?.map((t) => t.id) || [],
        SKU: product.sku || "",

        // ...add other fields as needed
      });
    }
  }, [product]);

  // Handle image upload (for demonstration, just add URLs)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && localImages.length < 5 && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setLocalImages((prev) => [...prev, url]);
      form.setValue("Images", [...localImages, url]);
    }
  };

  const removeImage = (index: number) => {
    const updated = localImages.filter((_, i) => i !== index);
    setLocalImages(updated);
    form.setValue("Images", updated);
  };

  // Submit handler for updating product
  const handleSubmit = form.handleSubmit((values) => {
    // updateProductMutation.mutate({ id, ...values }, {
    //   onSuccess: () => router.push("/vendor/products"),
    // });
    // For now, just log values
    console.log("Update product:", { id, ...values });
  });

  // Add state for edit mode per field
  const [editColors, setEditColors] = useState(false);
  const [editSizes, setEditSizes] = useState(false);
  const [editTags, setEditTags] = useState(false);
  // Fetch create options for selectors
  const { data: createOptions } = useGetCreateOptions();

  if (isLoading) {
    return (
      <VendorSidebarLayout>
        <VendorWrapper>
          <Skeleton className="h-8 w-1/3 mb-6" />

          <div className="rounded-lg border bg-card mb-6">
            <div className="p-6 border-b">
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-64 w-full" />
            </div>
          </div>

          {/* Product Images Card */}
          <div className="rounded-lg border bg-card mb-6">
            <div className="p-6 border-b">
              <Skeleton className="h-6 w-44 mb-1" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="aspect-[3/4] w-full" />
              </div>
            </div>
          </div>

          {/* Product Specifications Card */}
          <div className="rounded-lg border bg-card mb-6">
            <div className="p-6 border-b">
              <Skeleton className="h-6 w-56" />
            </div>
            <div className="p-6 space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-16 rounded" />
                    <Skeleton className="h-6 w-16 rounded" />
                    <Skeleton className="h-6 w-16 rounded" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </VendorWrapper>
      </VendorSidebarLayout>
    );
  }

  if (!product) {
    return (
      <VendorSidebarLayout>
        <div className="max-w-3xl mx-auto mt-8 text-center text-muted-foreground">
          Product not found.
        </div>
      </VendorSidebarLayout>
    );
  }

  return (
    <VendorSidebarLayout>
      <VendorWrapper>
        <h1 className="text-3xl font-bold my-5">{product?.productName}</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit product details below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="ProductName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input {...field} required />
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
                          <Input {...field} type="number" min={0} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price *</FormLabel>
                        <FormControl>
                          <NumericFormat
                            value={field.value ?? ""}
                            thousandSeparator="," 
                            allowNegative={false}
                            allowLeadingZeros={false}
                            decimalScale={0}
                            customInput={Input}
                            placeholder="0"
                            required
                            onValueChange={(values) => {
                              field.onChange(values.floatValue ?? 0);
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
                          value={
                            field.value != null
                              ? String(field.value)
                              : product.categoryId != null
                              ? String(product.categoryId)
                              : ""
                          }
                          onValueChange={(val) => field.onChange(Number(val))}
                          required
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(() => {
                              const base = createOptions?.categories ?? [];
                              const hasCurrent = base.some(
                                (c) => c.id === product.categoryId
                              );
                              const merged =
                                hasCurrent || !product.categoryId
                                  ? base
                                  : [
                                      {
                                        id: product.categoryId,
                                        categoryName:
                                          product.categoryName ??
                                          `Category #${product.categoryId}`,
                                      },
                                      ...base,
                                    ];
                              return merged.map(({ id, categoryName }) => (
                                <SelectItem key={id} value={String(id)}>
                                  {categoryName}
                                </SelectItem>
                              ));
                            })()}
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <MinimalTiptap
                          {...field}
                          key={field.value}
                          content={field.value}
                          onChange={field.onChange}
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
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload or remove product images (max 5)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Grid gallery like create page */}
                {localImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {localImages.map((img, idx) => (
                      <div key={idx} className="relative group aspect-3/4">
                        <Image
                          src={img}
                          alt={`Product image ${idx + 1}`}
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
                          onClick={() => removeImage(idx)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload area matching create page */}
                {localImages.length < 5 && (
                  <label className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Upload Image ({localImages.length}/5)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

                {/* Max images message */}
                {localImages.length >= 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Maximum 5 images reached. Remove some images to add more.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Product Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                {/* SKU field */}
                <FormField
                  control={form.control}
                  name="SKU"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Stock Keeping Unit (optional)"
                        />
                      </FormControl>
                      <FormDescription>
                        SKU is optional, our system will auto-generate one if
                        left blank
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Colors:</span>
                    {!editColors ? (
                      <>
                        {product.colors?.map((c) => (
                          <span
                            key={c.id}
                            className="px-2 py-1 rounded bg-muted text-sm ml-2"
                          >
                            {c.themeColor}
                          </span>
                        ))}
                      </>
                    ) : (
                      <FormField
                        control={form.control}
                        name="ColorId"
                        render={({ field }) => (
                          <MultipleSelector
                            options={
                              createOptions?.colors?.map((c) => ({
                                value: String(c.id),
                                label: c.themeColor,
                              })) ?? []
                            }
                            value={
                              Array.isArray(field.value)
                                ? field.value.map((id: number) => {
                                    const color = createOptions?.colors?.find(
                                      (c) => c.id === id
                                    );
                                    return color
                                      ? {
                                          value: String(color.id),
                                          label: color.themeColor,
                                        }
                                      : {
                                          value: String(id),
                                          label: String(id),
                                        };
                                  })
                                : []
                            }
                            onChange={(selected) =>
                              field.onChange(
                                selected.map((opt) => Number(opt.value))
                              )
                            }
                            placeholder="Select colors"
                          />
                        )}
                      />
                    )}
                  </div>
                  {!editColors ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditColors(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditColors(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {/* Sizes */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Sizes:</span>
                    {!editSizes ? (
                      <>
                        {product.sizes?.map((s) => (
                          <span
                            key={s.id}
                            className="px-2 py-1 rounded bg-muted text-sm ml-2"
                          >
                            {s.productSize}
                          </span>
                        ))}
                      </>
                    ) : (
                      <FormField
                        control={form.control}
                        name="SizeId"
                        render={({ field }) => (
                          <MultipleSelector
                            options={
                              createOptions?.sizes?.map((s) => ({
                                value: String(s.id),
                                label: s.productSize,
                              })) ?? []
                            }
                            value={
                              Array.isArray(field.value)
                                ? field.value.map((id: number) => {
                                    const size = createOptions?.sizes?.find(
                                      (s) => s.id === id
                                    );
                                    return size
                                      ? {
                                          value: String(size.id),
                                          label: size.productSize,
                                        }
                                      : {
                                          value: String(id),
                                          label: String(id),
                                        };
                                  })
                                : []
                            }
                            onChange={(selected) =>
                              field.onChange(
                                selected.map((opt) => Number(opt.value))
                              )
                            }
                            placeholder="Select sizes"
                          />
                        )}
                      />
                    )}
                  </div>
                  {!editSizes ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditSizes(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditSizes(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {/* Tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tags:</span>
                    {!editTags ? (
                      <>
                        {product.tags?.map((t) => (
                          <span
                            key={t.id}
                            className="px-2 py-1 rounded bg-muted text-sm ml-2"
                          >
                            {t.tagName}
                          </span>
                        ))}
                      </>
                    ) : (
                      <FormField
                        control={form.control}
                        name="TagId"
                        render={({ field }) => (
                          <MultipleSelector
                            options={
                              createOptions?.tags?.map((t) => ({
                                value: String(t.id),
                                label: t.tagName,
                              })) ?? []
                            }
                            value={
                              Array.isArray(field.value)
                                ? field.value.map((id: number) => {
                                    const tag = createOptions?.tags?.find(
                                      (t) => t.id === id
                                    );
                                    return tag
                                      ? {
                                          value: String(tag.id),
                                          label: tag.tagName,
                                        }
                                      : {
                                          value: String(id),
                                          label: String(id),
                                        };
                                  })
                                : []
                            }
                            onChange={(selected) =>
                              field.onChange(
                                selected.map((opt) => Number(opt.value))
                              )
                            }
                            placeholder="Select tags"
                          />
                        )}
                      />
                    )}
                  </div>
                  {!editTags ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditTags(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditTags(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </VendorWrapper>
    </VendorSidebarLayout>
  );
}
