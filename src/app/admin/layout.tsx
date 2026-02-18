import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/homepage");
  }

  return <AdminShell currentUser={session.user}>{children}</AdminShell>;
}
