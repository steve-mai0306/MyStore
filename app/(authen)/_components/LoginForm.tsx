import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useForm } from "react-hook-form";
import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  onError,
  ...props
}: {
  className?: string;
  onError?: (message: string) => void;
} & Omit<React.ComponentProps<"div">, "onError">) {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          onError?.("Invalid email or password. Please try again.");
        } else {
          onError?.("Login failed. Please try again.");
        }
        console.log("error login", res.error);
      } else {
        router.push("/"); // or dashboard
      }
    } catch (error) {
      onError?.("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">LOGIN</CardTitle>
          <CardDescription>
            Login to your account and start shopping now!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <InteractiveHoverButton type="submit" loading={loading}>
                  Login
                </InteractiveHoverButton>
                <InteractiveHoverButton>
                  Login with Google
                </InteractiveHoverButton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
