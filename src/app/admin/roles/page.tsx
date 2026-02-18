"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminUser, UserRole } from "@/lib/content-types";

function formatDate(dateIso: string) {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleDateString();
}

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error ?? "Request failed";
  } catch {
    return "Request failed";
  }
}

export default function AdminRolesPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const adminCount = useMemo(
    () => users.filter((user) => user.role === "admin").length,
    [users],
  );
  const memberCount = users.length - adminCount;

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { users: AdminUser[] };
      setUsers(payload.users ?? []);
      setError(null);
    } catch (loadError) {
      const nextError =
        loadError instanceof Error ? loadError.message : "Failed to load users";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateRole = async (userId: string, role: UserRole) => {
    try {
      setSavingId(userId);
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { user: AdminUser };
      setUsers((current) =>
        current.map((user) => (user.id === userId ? payload.user : user)),
      );
      setMessage("Role updated.");
    } catch (updateError) {
      const nextError =
        updateError instanceof Error ? updateError.message : "Failed to update role";
      setError(nextError);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Admins
          </p>
          <p className="mt-3 text-3xl font-black text-cyan-300">{adminCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Members
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-gray-100">{memberCount}</p>
        </article>
      </section>

      <section className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Roles & Permissions</h2>
            <p className="text-sm text-[#6b7280] dark:text-gray-400">
              Promote users to admin or remove admin access.
            </p>
          </div>
          <button
            type="button"
            onClick={loadUsers}
            className="rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-2 text-sm font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B]"
          >
            Refresh
          </button>
        </div>

        {message ? (
          <p className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-[#6b7280] dark:text-gray-400">Loading users...</p>
        ) : error ? (
          <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </p>
        ) : users.length === 0 ? (
          <div className="rounded-md border border-dashed border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-8 text-center text-sm text-[#6b7280] dark:text-gray-400">
            No users available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-left text-xs uppercase tracking-wide text-[#7a6430] dark:text-[#E0D19B]">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Current Role</th>
                  <th className="px-3 py-3">Joined</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isSaving = savingId === user.id;
                  const nextRole: UserRole = user.role === "admin" ? "user" : "admin";

                  return (
                    <tr key={user.id} className="border-b border-black/10 dark:border-white/10">
                      <td className="px-3 py-3 text-sm font-semibold text-[#1a242c] dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">{user.email}</td>
                      <td className="px-3 py-3 text-sm">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                            user.role === "admin"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-500/20 text-[#1a242c] dark:text-gray-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">
                        {formatDate(user.joinedAt)}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() => void updateRole(user.id, nextRole)}
                          className="rounded-md border border-black/20 dark:border-white/20 bg-white/75 dark:bg-[#121920] px-2.5 py-1.5 text-xs font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {user.role === "admin" ? "Remove Admin" : "Make Admin"}
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
