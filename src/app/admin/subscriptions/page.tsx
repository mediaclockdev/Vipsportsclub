"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  MembershipPlan,
  Subscription,
  SubscriptionStatus,
} from "@/lib/content-types";

function formatDateTime(dateIso: string) {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleString();
}

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error ?? "Request failed";
  } catch {
    return "Request failed";
  }
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const now = Date.now();
  const paidSubscriptions = useMemo(
    () =>
      subscriptions.filter(
        (subscription) =>
          subscription.plan === "silver" || subscription.plan === "gold",
      ),
    [subscriptions],
  );
  const activeCount = useMemo(
    () =>
      paidSubscriptions.filter((subscription) => {
        const expiry = new Date(subscription.expiresAt).getTime();
        return (
          subscription.status === "active" && !Number.isNaN(expiry) && expiry >= now
        );
      }).length,
    [paidSubscriptions, now],
  );
  const expiredCount = paidSubscriptions.length - activeCount;
  const silverCount = useMemo(
    () =>
      paidSubscriptions.filter((subscription) => subscription.plan === "silver")
        .length,
    [paidSubscriptions],
  );
  const goldCount = paidSubscriptions.filter(
    (subscription) => subscription.plan === "gold",
  ).length;

  const filteredSubscriptions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return paidSubscriptions;
    }

    return paidSubscriptions.filter((subscription) =>
      `${subscription.userName} ${subscription.userEmail}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [searchQuery, paidSubscriptions]);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/subscriptions", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { subscriptions: Subscription[] };
      setSubscriptions(payload.subscriptions ?? []);
      setError(null);
    } catch (loadError) {
      const nextError =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load subscriptions";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const updateSubscription = async (
    subscriptionId: string,
    updates: {
      plan?: MembershipPlan;
      status?: SubscriptionStatus;
      extendDays?: number;
    },
  ) => {
    try {
      setSavingId(subscriptionId);
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { subscription: Subscription };
      setSubscriptions((current) =>
        current.map((subscription) =>
          subscription.id === subscriptionId ? payload.subscription : subscription,
        ),
      );
      setMessage("Subscription updated.");
    } catch (updateError) {
      const nextError =
        updateError instanceof Error
          ? updateError.message
          : "Failed to update subscription";
      setError(nextError);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Active Members
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-300">{activeCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Expired Plans
          </p>
          <p className="mt-3 text-3xl font-black text-rose-300">{expiredCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Silver Plans
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-gray-200">{silverCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Gold Plans
          </p>
          <p className="mt-3 text-3xl font-black text-amber-300">{goldCount}</p>
        </article>
      </section>

      <section className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Subscription Management</h2>
            <p className="text-sm text-[#6b7280] dark:text-gray-400">
              Upgrade or downgrade plans and extend membership expiry.
            </p>
          </div>
          <button
            type="button"
            onClick={loadSubscriptions}
            className="rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-2 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
          >
            Refresh
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by user or email..."
            className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-2.5 text-sm text-[#1a242c] dark:text-gray-100 outline-none transition focus:border-[#B6983D] dark:focus:border-[#E0D19B]"
          />
        </div>

        {message ? (
          <p className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-[#6b7280] dark:text-gray-400">Loading subscriptions...</p>
        ) : error ? (
          <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </p>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="rounded-md border border-dashed border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-8 text-center text-sm text-[#6b7280] dark:text-gray-400">
            No subscriptions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-left text-xs uppercase tracking-wide text-[#7a6430] dark:text-[#E0D19B]">
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Plan</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Expiry</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription) => {
                  const isSaving = savingId === subscription.id;

                  return (
                    <tr key={subscription.id} className="border-b border-black/10 dark:border-white/10">
                      <td className="px-3 py-3">
                        <p className="text-sm font-semibold text-[#1a242c] dark:text-white">
                          {subscription.userName}
                        </p>
                        <p className="text-xs text-[#6b7280] dark:text-gray-400">{subscription.userEmail}</p>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={subscription.plan}
                          disabled={isSaving}
                          onChange={(event) =>
                            void updateSubscription(subscription.id, {
                              plan: event.target.value as MembershipPlan,
                            })
                          }
                          className="rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1a242c] dark:text-gray-100 outline-none transition focus:border-[#B6983D] dark:focus:border-[#E0D19B] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="silver">Silver</option>
                          <option value="gold">Gold</option>
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={subscription.status}
                          disabled={isSaving}
                          onChange={(event) =>
                            void updateSubscription(subscription.id, {
                              status: event.target.value as SubscriptionStatus,
                            })
                          }
                          className="rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1a242c] dark:text-gray-100 outline-none transition focus:border-[#B6983D] dark:focus:border-[#E0D19B] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="active">Active</option>
                          <option value="expired">Expired</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">
                        {formatDateTime(subscription.expiresAt)}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() =>
                            void updateSubscription(subscription.id, { extendDays: 30 })
                          }
                          className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Extend +30d
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
