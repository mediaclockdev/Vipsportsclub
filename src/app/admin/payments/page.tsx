"use client";

import { useEffect, useMemo, useState } from "react";
import type { Payment } from "@/lib/content-types";

function formatDateTime(dateIso: string) {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleString();
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error ?? "Request failed";
  } catch {
    return "Request failed";
  }
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const revenue = useMemo(
    () =>
      payments
        .filter((payment) => payment.status === "success")
        .reduce((sum, payment) => sum + payment.amount, 0),
    [payments],
  );
  const successCount = useMemo(
    () => payments.filter((payment) => payment.status === "success").length,
    [payments],
  );
  const failedCount = useMemo(
    () => payments.filter((payment) => payment.status === "failed").length,
    [payments],
  );
  const pendingCount = useMemo(
    () => payments.filter((payment) => payment.status === "pending").length,
    [payments],
  );

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/payments", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { payments: Payment[] };
      setPayments(payload.payments ?? []);
      setError(null);
    } catch (loadError) {
      const nextError =
        loadError instanceof Error ? loadError.message : "Failed to load payments";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Revenue
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-300">
            {formatCurrency(revenue)}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Success
          </p>
          <p className="mt-3 text-3xl font-black text-cyan-300">{successCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Failed
          </p>
          <p className="mt-3 text-3xl font-black text-rose-300">{failedCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Pending
          </p>
          <p className="mt-3 text-3xl font-black text-amber-300">{pendingCount}</p>
        </article>
      </section>

      <section className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Payments</h2>
            <p className="text-sm text-[#6b7280] dark:text-gray-400">
              Payment logs, status, and total revenue.
            </p>
          </div>
          <button
            type="button"
            onClick={loadPayments}
            className="rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-2 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-[#6b7280] dark:text-gray-400">Loading payments...</p>
        ) : error ? (
          <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </p>
        ) : payments.length === 0 ? (
          <div className="rounded-md border border-dashed border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-8 text-center text-sm text-[#6b7280] dark:text-gray-400">
            No payment logs yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-left text-xs uppercase tracking-wide text-[#7a6430] dark:text-[#E0D19B]">
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Plan</th>
                  <th className="px-3 py-3">Payment ID</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-black/10 dark:border-white/10">
                    <td className="px-3 py-3">
                      <p className="text-sm font-semibold text-[#1a242c] dark:text-white">{payment.userName}</p>
                      <p className="text-xs text-[#6b7280] dark:text-gray-400">{payment.userEmail}</p>
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold text-emerald-300">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#1a242c] dark:text-gray-200">{payment.plan}</td>
                    <td className="px-3 py-3 text-xs text-[#4b5563] dark:text-gray-300">{payment.paymentId}</td>
                    <td className="px-3 py-3 text-sm">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                          payment.status === "success"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : payment.status === "failed"
                              ? "bg-rose-500/20 text-rose-300"
                              : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">
                      {formatDateTime(payment.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
