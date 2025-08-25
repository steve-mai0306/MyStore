"use client";

import { Galaxy } from "@/components/animated";
import { Input } from "@/components/ui/input";
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
import { createPasswordForm, type CreatePasswordFormValues } from "@/types";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSetupPassword } from "@/queries/mutation";

export default function SetupPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const type =
    (searchParams.get("type") as "customer" | "vendor" | null) ?? null;

  const passwordConfirm = useSetupPassword();

  const form = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(createPasswordForm),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: CreatePasswordFormValues) => {
    if (!token || !type) {
      console.error("Missing token or type in URL params");
      return;
    }
    passwordConfirm.mutate(
      {
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        onError: (error) => {
          console.error("Error confirming password:", error);
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen h-[100vh] bg-black">
      <Galaxy mouseInteraction={false} density={1} glowIntensity={0.2} />
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <div className="z-10 w-full max-w-2xl flex flex-col items-center justify-center gap-4 rounded-xl border border-border/50 bg-accent 0 p-6 md:p-8">
          <Link href="/">
            <Image
              src="/assets/my-store-logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>

          <h1 className="text-2xl lg:text-4xl text-center font-bold uppercase tracking-wide ">
            Create your new password
          </h1>
          <p className="text-muted-foreground text-base md:text-lg text-center leading-relaxed">
            Enter and confirm your new password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter a strong password"
                        />
                      </FormControl>
                      <FormDescription>
                        Use at least 8 characters, including upper & lower case,
                        a number and a symbol.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Re-enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <InteractiveHoverButton
                  type="submit"
                  className="mt-5"
                  loading={passwordConfirm.isPending}
                >
                  Continue
                </InteractiveHoverButton>
              </div>
            </form>
          </Form>
          <p className="text-muted-foreground text-base text-center leading-relaxed">
            If you have problem when creating{" "}
            <Link href="#" className="underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
