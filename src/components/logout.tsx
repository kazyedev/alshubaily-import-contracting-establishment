"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const Logout = () => {
  const t = useTranslations("Auth.SignOut");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : t("button")}
    </Button>
  );
};