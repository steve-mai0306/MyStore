import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signupFormSchema, type SignupFormValues } from "@/types";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatePresence, motion } from "framer-motion";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [registrationType, setRegistrationType] = useState<string>("");
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      shopName: "",
      phoneNumber: "",
      type: "customer",
    },
  });
  const onSubmit = (data: SignupFormValues) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here, e.g., API call
  };

  const handleTypeChange = (value: "customer" | "vendor") => {
    setRegistrationType(value);
    form.setValue("type", value);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">REGISTER</CardTitle>
          <CardDescription>Let&apos;s create your account!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="youremail@email.com"
                          required
                        />
                      </FormControl>
                      <FormDescription>
                        A link to set a new password will be sent to your email
                        address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AnimatePresence>
                  {registrationType === "vendor" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shopName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shop Name</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Which type of registration you want?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={handleTypeChange}
                          defaultValue={field.value}
                          className="flex flex-col"
                        >
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="customer" />
                            </FormControl>
                            <FormLabel>I am a customer</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="vendor" />
                            </FormControl>
                            <FormLabel>I am a vendor</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <InteractiveHoverButton type="submit">
                    Register
                  </InteractiveHoverButton>
                </div>
              </div>
              <div className="mt-4 text-start text-sm text-muted-foreground">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
