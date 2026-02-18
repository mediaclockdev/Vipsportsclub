"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Moon,
  ShieldCheck,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

const primaryItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: Users },
  { label: "Winners", href: "/admin/winners", icon: Trophy },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
];

const navGroups: AdminNavGroup[] = [
  { title: "General", items: [primaryItems[0], primaryItems[1]] },
  { title: "Membership", items: [primaryItems[2]] },
  { title: "Content", items: [primaryItems[3]] },
  { title: "Finance", items: [primaryItems[4]] },
  { title: "Permissions", items: [primaryItems[5]] },
];

const pageMeta = [
  {
    match: (pathname: string) => pathname === "/admin",
    title: "Dashboard",
    description: "Track winners and membership growth in real time.",
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/users"),
    title: "Users",
    description: "Manage members, account status, and plan ownership.",
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/subscriptions"),
    title: "Subscriptions",
    description: "Control plan status, expiry, and manual upgrades.",
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/winners"),
    title: "Winners",
    description: "Create, publish, and manage winner entries.",
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/payments"),
    title: "Payments",
    description: "Review transaction logs, revenue, and payment status.",
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/roles"),
    title: "Roles & Permissions",
    description: "Promote members to admin or remove admin access.",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getCurrentPageMeta(pathname: string) {
  return (
    pageMeta.find((entry) => entry.match(pathname)) ?? {
      title: "Admin",
      description: "Manage website content and subscriptions.",
    }
  );
}

function renderSidebarItem(pathname: string, item: AdminNavItem) {
  const Icon = item.icon;
  const active = isActivePath(pathname, item.href);

  return (
    <Link
      key={item.href}
      href={item.href}
      className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? "bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_100%)] text-[#1a242c] shadow"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon
          className={`size-4 ${
            active ? "text-[#1a242c]" : "text-slate-400 group-hover:text-slate-200"
          }`}
        />
        {item.label}
      </span>
      <ChevronRight
        className={`size-3 transition ${
          active
            ? "text-[#1a242c]/70"
            : "text-slate-600 group-hover:translate-x-0.5 group-hover:text-slate-400"
        }`}
      />
    </Link>
  );
}

export default function AdminShell({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser?: {
    name?: string | null;
    email?: string | null;
  };
}) {
  const pathname = usePathname();
  const currentPageMeta = getCurrentPageMeta(pathname);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <section className="min-h-screen bg-[#E4E4E4] text-[#1B242C] dark:bg-[#212E36] dark:text-gray-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1700px]">
        <aside className="hidden w-[280px] shrink-0 border-r border-black/20 bg-[#1B242C] px-4 py-5 lg:flex lg:flex-col dark:border-white/10 dark:bg-[#18232b]">
          <Link
            href="/homepage"
            className="rounded-xl border border-white/15 bg-black/20 p-3 transition hover:border-[#E0D19B]/70"
          >
            <Image
              src="/3dlogo.svg"
              alt="VIP Sports Club"
              width={260}
              height={70}
              className="h-12 w-full object-contain"
              priority
            />
          </Link>

          <div className="mt-6 space-y-6">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => renderSidebarItem(pathname, item))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <Link
              href="/winners"
              className="block rounded-lg border border-[#B6983D] px-3 py-2 text-center text-sm font-semibold text-[#E0D19B] transition hover:bg-[#B6983D]/20"
            >
              Preview Winners Page
            </Link>
            <Link
              href="/homepage"
              className="block rounded-lg border border-white/20 px-3 py-2 text-center text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Back to Website
            </Link>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin User
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                {currentUser?.name?.trim() || "VIP Sports Club"}
              </p>
              <p className="text-xs text-slate-400">
                {currentUser?.email?.trim() || "Control panel"}
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-black/10 bg-[#E4E4E4]/95 backdrop-blur dark:border-white/10 dark:bg-[#212E36]/95">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
                  {currentPageMeta.title}
                </p>
                <p className="truncate text-sm text-[#4b5563] dark:text-gray-300">
                  {currentPageMeta.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#B6983D] bg-white/80 text-[#1a242c] transition hover:brightness-105 dark:bg-[#1a242c] dark:text-[#E0D19B]"
                aria-label="Toggle theme"
              >
                <Sun className="hidden size-4 dark:block" />
                <Moon className="block size-4 dark:hidden" />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-black/10 px-4 py-2 sm:px-6 lg:px-8 dark:border-white/10">
              {primaryItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
                      active
                        ? "bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_100%)] text-[#1a242c]"
                        : "text-[#4b5563] hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </header>

          <div className="border-b border-black/10 bg-[#1B242C] px-4 py-3 lg:hidden dark:border-white/10">
            <div className="flex gap-2 overflow-x-auto">
              {primaryItems.map((item) => renderSidebarItem(pathname, item))}
            </div>
          </div>

          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </section>
  );
}
