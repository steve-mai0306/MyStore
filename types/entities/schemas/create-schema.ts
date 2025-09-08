import { z } from "zod";

export const createProductSchema = z.object({
  ProductName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  Quantity: z
    .number({ message: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .min(0, "Quantity must be at least 0"),
  Price: z
    .number({ message: "Price must be a number" })
    .min(0, "Price must be at least 0"),
  Description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),
  Status: z
    .number({ message: "Status must be a number" })
    .int("Status must be an integer")
    .refine((val) => [0, 1, 2, 3].includes(val), {
      message: "Status must be one of: 0 (Inactive), 1 (Active), 2 (Draft), 3 (Out of Stock)",
    }),
  CategoryId: z
    .number({ message: "CategoryId must be a number" })
    .int("CategoryId must be an integer")
    .min(1, "CategoryId is required"),
  Images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  ColorId: z
    .array(z.number().int("ColorId must be an integer"))
    .min(1, "At least one color is required"),
  SizeId: z
    .array(z.number().int("SizeId must be an integer"))
    .min(1, "At least one size is required"),
  TagId: z
    .array(z.number().int("TagId must be an integer"))
    .min(1, "At least one tag is required"),
  SKU: z.string().max(50, "SKU must be less than 50 characters").optional(),
});

export type CreateProductValues = z.infer<typeof createProductSchema>;
