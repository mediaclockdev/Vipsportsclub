"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminUser, UserRole, UserStatus } from "@/lib/content-types";

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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const totalUsers = users.length;
  const activeUsers = useMemo(
    () => users.filter((user) => user.status === "active").length,
    [users],
  );
  const blockedUsers = totalUsers - activeUsers;
  const adminUsers = useMemo(
    () => users.filter((user) => user.role === "admin").length,
    [users],
  );

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery, users]);

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

  const updateUser = async (
    userId: string,
    updates: { status?: UserStatus; role?: UserRole },
  ) => {
    try {
      setSavingUserId(userId);
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { user: AdminUser };
      setUsers((current) =>
        current.map((user) => (user.id === userId ? payload.user : user)),
      );
      setMessage("User updated.");
    } catch (updateError) {
      const nextError =
        updateError instanceof Error ? updateError.message : "Failed to update user";
      setError(nextError);
    } finally {
      setSavingUserId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Total Users
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">{totalUsers}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Active
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-300">{activeUsers}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Blocked
          </p>
          <p className="mt-3 text-3xl font-black text-rose-300">{blockedUsers}</p>
        </article>
        <article className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-gray-400">
            Admins
          </p>
          <p className="mt-3 text-3xl font-black text-cyan-300">{adminUsers}</p>
        </article>
      </section>

      <section className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 shadow-sm dark:bg-[#1a242c]/90 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a242c] dark:text-white">Users Management</h2>
            <p className="text-sm text-[#6b7280] dark:text-gray-400">
              View all users, search, block/unblock, and manage admin access.
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

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search user by name or email..."
            className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-2.5 text-sm text-[#1a242c] dark:text-gray-100 outline-none transition focus:border-[#B6983D] dark:focus:border-[#E0D19B]"
          />
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
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-md border border-dashed border-black/15 dark:border-white/15 bg-white/75 dark:bg-[#121920] px-3 py-8 text-center text-sm text-[#6b7280] dark:text-gray-400">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-left text-xs uppercase tracking-wide text-[#7a6430] dark:text-[#E0D19B]">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Plan</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Joined</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isSaving = savingUserId === user.id;
                  return (
                    <tr key={user.id} className="border-b border-black/10 dark:border-white/10">
                      <td className="px-3 py-3 text-sm font-semibold text-[#1a242c] dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">{user.email}</td>
                      <td className="px-3 py-3 text-sm">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                            user.plan === "gold"
                              ? "bg-amber-500/20 text-amber-300"
                              : user.plan === "silver"
                                ? "bg-slate-500/20 text-[#1a242c] dark:text-gray-200"
                                : "bg-zinc-500/20 text-zinc-300"
                          }`}
                        >
                          {user.plan === "none" ? "No Plan" : user.plan}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                            user.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-[#4b5563] dark:text-gray-300">
                        {formatDate(user.joinedAt)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() =>
                              void updateUser(user.id, {
                                status: user.status === "active" ? "blocked" : "active",
                              })
                            }
                            className="rounded-md border border-black/20 dark:border-white/20 bg-white/75 dark:bg-[#121920] px-2.5 py-1.5 text-xs font-semibold text-[#1a242c] dark:text-gray-100 transition hover:border-[#B6983D] dark:hover:border-[#E0D19B] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {user.status === "active" ? "Block" : "Unblock"}
                          </button>
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() =>
                              void updateUser(user.id, {
                                role: user.role === "admin" ? "user" : "admin",
                              })
                            }
                            className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                          </button>
                        </div>
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
