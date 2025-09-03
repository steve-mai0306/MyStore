import { z } from "zod";

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .optional(),

  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .email("Invalid email format")
    .optional(),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .optional(),

  phoneNumber: z
    .string()
    .regex(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain numbers, spaces, and basic symbols"
    )
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .optional(),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(30, "Slug must be less than 30 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    )
    .refine((val) => !val.startsWith("-") && !val.endsWith("-"), {
      message: "Slug cannot start or end with a hyphen",
    })
    .optional(),

  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format")
    .refine((date) => {
      const [year, month, day] = date.split("-").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      const minDate = new Date("1900-01-01");
      return (
        !isNaN(inputDate.getTime()) &&
        inputDate >= minDate &&
        inputDate <= today
      );
    }, "Date of birth must be between 1900 and today")
    .optional(),
  gender: z.boolean().optional(),
});

export const profileAvatarSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image")
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "File must be JPEG, PNG, or WebP format"
    ),
});

export type ProfileAvatarValues = z.infer<typeof profileAvatarSchema>;

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;
