import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const signupFormSchema = z.discriminatedUnion("type", [
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    type: z.literal("customer"),
  }),
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    type: z.literal("vendor"),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" }),
    shopName: z
      .string()
      .min(1, { message: "Shop name is required" })
      .min(2, { message: "Shop name must be at least 2 characters" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^0\d{9}$/, { message: "Phone number must start with 0 and be 10 digits" }),
  }),
]);

export const createPasswordForm = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type SignupFormValues = z.infer<typeof signupFormSchema>;
export type CreatePasswordFormValues = z.infer<typeof createPasswordForm>;
