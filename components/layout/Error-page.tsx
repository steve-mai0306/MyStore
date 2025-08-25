import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout";
import { Home } from "lucide-react";
import Image from "next/image";

interface ErrorPageProps {
  code: number;
  message?: string;
  image?: React.ReactNode;
}

export function ErrorPage({ code, message, image }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="text-center space-y-6">
          {image && (
            <div className="flex justify-center">
              <div className="w-64 h-64 max-w-full">
                {image}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">{code}</h1>
            <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
