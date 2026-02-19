import Link from "next/link";
import {
  listPayments,
  listSubscriptions,
  listUsers,
  listWinners,
} from "@/lib/content-store";

const NOW_TS = Date.now();
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function formatDate(dateIso: string) {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleDateString();
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminDashboardPage() {
  const [users, subscriptions, winners, payments] = await Promise.all([
    listUsers(),
    listSubscriptions(),
    listWinners(),
    listPayments(),
  ]);

  const sevenDaysAgo = NOW_TS - SEVEN_DAYS_MS;

  const totalUsers = users.length;
  const activeSubscribers = subscriptions.filter((subscription) => {
    const expiryTime = new Date(subscription.expiresAt).getTime();
    return (
      (subscription.plan === "silver" || subscription.plan === "gold") &&
      subscription.status === "active" &&
      !Number.isNaN(expiryTime) &&
      expiryTime >= NOW_TS
    );
  }).length;
  const noPlanUsers = users.filter((user) => user.plan === "none").length;
  const silverUsers = users.filter((user) => user.plan === "silver").length;
  const goldUsers = users.filter((user) => user.plan === "gold").length;
  const expiredMemberships = subscriptions.filter((subscription) => {
    const expiryTime = new Date(subscription.expiresAt).getTime();
    return (
      (subscription.plan === "silver" || subscription.plan === "gold") &&
      (
        subscription.status === "expired" ||
        Number.isNaN(expiryTime) ||
        expiryTime < NOW_TS
      )
    );
  }).length;
  const recentSignups = users.filter((user) => {
    const joinedAt = new Date(user.joinedAt).getTime();
    return !Number.isNaN(joinedAt) && joinedAt >= sevenDaysAgo;
  }).length;

  const totalRevenue = payments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const recentUsers = users.slice(0, 6);
  const latestWinner = winners[0];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-7">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Total Users
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">{totalUsers}</p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Active Subscribers
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-300">
            {activeSubscribers}
          </p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Silver Users
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-gray-200">{silverUsers}</p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            No Plan Users
          </p>
          <p className="mt-3 text-3xl font-black text-zinc-300">{noPlanUsers}</p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Gold Users
          </p>
          <p className="mt-3 text-3xl font-black text-amber-300">{goldUsers}</p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Expired Memberships
          </p>
          <p className="mt-3 text-3xl font-black text-rose-300">
            {expiredMemberships}
          </p>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Recent Signups (7d)
          </p>
          <p className="mt-3 text-3xl font-black text-cyan-300">{recentSignups}</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
          <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Control Center Modules</h2>
          <p className="mt-1 text-sm text-[#4b5563] dark:text-gray-300">
            Quickly jump into each admin module.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/admin/users"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Users Management
            </Link>
            <Link
              href="/admin/subscriptions"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Subscription Management
            </Link>
            <Link
              href="/admin/winners"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Winners Management
            </Link>
            <Link
              href="/admin/prizes"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              What You Can Win
            </Link>
            <Link
              href="/admin/payments"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Payments
            </Link>
            <Link
              href="/admin/roles"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Roles & Permissions
            </Link>
            <Link
              href="/winners"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-4 py-3 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
            >
              Preview Winners Page
            </Link>
          </div>
        </article>

        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
          <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Platform Snapshot</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-3 py-2">
              <span className="text-[#4b5563] dark:text-gray-300">Total Revenue</span>
              <span className="font-bold text-emerald-300">{formatCurrency(totalRevenue)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-3 py-2">
              <span className="text-[#4b5563] dark:text-gray-300">Winners Published</span>
              <span className="font-bold text-[#1a242c] dark:text-white">
                {winners.filter((winner) => winner.isPublished).length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-3 py-2">
              <span className="text-[#4b5563] dark:text-gray-300">Latest Winner</span>
              <span className="font-bold text-[#1a242c] dark:text-white">
                {latestWinner ? latestWinner.name : "None"}
              </span>
            </div>
          </div>

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#6b7280] dark:text-gray-400">
            Recent Signups
          </h3>
          <div className="mt-2 space-y-2">
            {recentUsers.length === 0 ? (
              <p className="rounded-lg border border-dashed border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-3 text-sm text-[#6b7280] dark:text-gray-400">
                No users yet.
              </p>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#121920] px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1a242c] dark:text-white">{user.name}</p>
                    <p className="text-xs text-[#6b7280] dark:text-gray-400">{user.email}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#4b5563] dark:text-gray-300">
                    {formatDate(user.joinedAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
