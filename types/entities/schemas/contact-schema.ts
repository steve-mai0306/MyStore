import { z } from "zod";

export const contactFormSchema = z.object({
    firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .min(2, { message: "Last name must be at least 2 characters" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .min(2, { message: "Subject must be at least 2 characters" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(2, { message: "Message must be at least 2 characters" }),
});


export type ContactFormValues = z.infer<typeof contactFormSchema>;
