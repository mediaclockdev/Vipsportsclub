"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Winner } from "@/lib/content-types";

type WinnerFormState = {
  name: string;
  prize: string;
  location: string;
  imageUrl: string;
  announcedAt: string;
  isPublished: boolean;
};

type StatusFilter = "all" | "published" | "hidden";

function defaultFormState(): WinnerFormState {
  return {
    name: "",
    prize: "",
    location: "",
    imageUrl: "",
    announcedAt: new Date().toISOString().slice(0, 10),
    isPublished: true,
  };
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "Invalid date";
  }

  return parsed.toLocaleDateString();
}

function toDateInputValue(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return parsed.toISOString().slice(0, 10);
}

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error ?? "Request failed";
  } catch {
    return "Request failed";
  }
}

function inferStatusLabel(winner: Winner) {
  return winner.isPublished ? "Published" : "Hidden";
}

export default function AdminWinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [form, setForm] = useState<WinnerFormState>(defaultFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setLocalPreviewUrl(null);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    setLocalPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [selectedFile]);

  const loadWinners = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/winners", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { winners: Winner[] };
      setWinners(payload.winners ?? []);
      setError(null);
    } catch (loadError) {
      const nextError =
        loadError instanceof Error ? loadError.message : "Failed to load winners";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWinners();
  }, []);

  const publishedCount = useMemo(
    () => winners.filter((winner) => winner.isPublished).length,
    [winners],
  );

  const hiddenCount = winners.length - publishedCount;

  const filteredWinners = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return winners.filter((winner) => {
      const passesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
            ? winner.isPublished
            : !winner.isPublished;

      if (!passesStatus) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableValue = `${winner.name} ${winner.prize} ${winner.location}`.toLowerCase();
      return searchableValue.includes(normalizedQuery);
    });
  }, [searchQuery, statusFilter, winners]);

  const previewImageUrl = localPreviewUrl || form.imageUrl || "/winner.svg";

  const resetForm = () => {
    setForm(defaultFormState());
    setEditingId(null);
    setSelectedFile(null);
  };

  const uploadImage = async (file: File) => {
    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { imageUrl: string };
      return payload.imageUrl;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const endpoint = editingId
        ? `/api/admin/winners/${editingId}`
        : "/api/admin/winners";
      const method = editingId ? "PATCH" : "POST";

      let imageUrl = form.imageUrl.trim();

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const payload = {
        ...form,
        imageUrl,
        announcedAt: new Date(`${form.announcedAt}T00:00:00`).toISOString(),
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadWinners();
      resetForm();
      setMessage(editingId ? "Winner updated successfully." : "Winner added.");
    } catch (submitError) {
      const nextError =
        submitError instanceof Error
          ? submitError.message
          : "Failed to save winner";
      setError(nextError);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (winner: Winner) => {
    setEditingId(winner.id);
    setForm({
      name: winner.name,
      prize: winner.prize,
      location: winner.location,
      imageUrl: winner.imageUrl,
      announcedAt: toDateInputValue(winner.announcedAt),
      isPublished: winner.isPublished,
    });
    setSelectedFile(null);
    setMessage(null);
    setError(null);
  };

  const handleDelete = async (winnerId: string) => {
    const confirmed = window.confirm(
      "Delete this winner? This action cannot be undone.",
    );
    if (!confirmed) {
      return;
    }

    try {
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/winners/${winnerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadWinners();
      if (editingId === winnerId) {
        resetForm();
      }
      setMessage("Winner deleted.");
    } catch (deleteError) {
      const nextError =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete winner";
      setError(nextError);
    }
  };

  const togglePublished = async (winner: Winner) => {
    try {
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/winners/${winner.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: !winner.isPublished }),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadWinners();
      setMessage(!winner.isPublished ? "Winner published." : "Winner hidden.");
    } catch (updateError) {
      const nextError =
        updateError instanceof Error
          ? updateError.message
          : "Failed to update winner";
      setError(nextError);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Total Winners
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">
            {winners.length}
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Published
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-700 dark:text-emerald-300">
            {publishedCount}
          </p>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Hidden Drafts
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">
            {hiddenCount}
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[430px_1fr]">
        <article className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#1a242c]/90">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-[#1a242c] dark:text-white">
              {editingId ? "Edit Winner" : "Create Winner"}
            </h2>
            <p className="mt-1 text-sm text-[#4b5563] dark:text-gray-300">
              Upload from your local machine or paste an image URL.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Winner Name
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Prize / Title
              </span>
              <input
                type="text"
                required
                value={form.prize}
                onChange={(event) =>
                  setForm((current) => ({ ...current, prize: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                  Location
                </span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  placeholder="WA, VIC, NSW..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                  Announced Date
                </span>
                <input
                  type="date"
                  required
                  value={form.announcedAt}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      announcedAt: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Image URL
              </span>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    imageUrl: event.target.value,
                  }))
                }
                placeholder="https://... or /uploaded-image.jpg"
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Or Upload Image (JPG/PNG/WEBP/AVIF up to 5MB)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(event) => {
                  const nextFile = event.target.files?.[0] ?? null;
                  setSelectedFile(nextFile);
                }}
                className="w-full cursor-pointer rounded-xl border border-dashed border-[#B6983D] bg-[#fbf6e3] px-3 py-3 text-sm text-[#6d561f] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1a242c] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:bg-[#f8f0d3] dark:border-[#E0D19B] dark:bg-[#2c3238] dark:text-[#E0D19B] dark:file:bg-[#E0D19B] dark:file:text-[#1a242c]"
              />
              {selectedFile && (
                <p className="mt-1 text-xs text-[#4b5563] dark:text-gray-300">
                  Selected: {selectedFile.name}
                </p>
              )}
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2.5 text-sm font-semibold text-[#1a242c] dark:border-white/10 dark:text-gray-100">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    isPublished: event.target.checked,
                  }))
                }
                className="h-4 w-4 accent-[#B6983D]"
              />
              Publish on public winners page
            </label>

            <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
              <div className="h-44 w-full bg-gray-100 dark:bg-[#10171d]">
                <img
                  src={previewImageUrl}
                  alt="Winner preview"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/winner.svg";
                  }}
                />
              </div>
              <div className="bg-black/5 px-3 py-2 text-xs font-medium text-[#4b5563] dark:bg-white/5 dark:text-gray-300">
                Live preview (file upload takes priority over URL)
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="rounded-xl bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_75%)] px-4 py-2.5 text-sm font-bold text-[#1a242c] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving || uploadingImage
                  ? "Saving..."
                  : editingId
                    ? "Update Winner"
                    : "Create Winner"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-black/20 px-4 py-2.5 text-sm font-semibold text-[#1a242c] transition hover:bg-black/5 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/5"
              >
                Reset
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </p>
          )}
        </article>

        <article className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#1a242c]/90">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-[#1a242c] dark:text-white">
                Winners Library
              </h2>
              <p className="text-sm text-[#4b5563] dark:text-gray-300">
                Search, filter, publish, or edit entries.
              </p>
            </div>
            <button
              type="button"
              onClick={loadWinners}
              className="rounded-xl border border-black/20 px-3 py-2 text-sm font-semibold text-[#1a242c] transition hover:bg-black/5 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/5"
            >
              Refresh
            </button>
          </div>

          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by winner, prize, or location..."
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          {loading ? (
            <p className="text-sm text-[#4b5563] dark:text-gray-300">
              Loading winners...
            </p>
          ) : filteredWinners.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/20 bg-black/5 px-4 py-8 text-center dark:border-white/20 dark:bg-white/5">
              <p className="text-sm font-medium text-[#4b5563] dark:text-gray-300">
                No winners match the current filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredWinners.map((winner) => (
                <article
                  key={winner.id}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#10171d]"
                >
                  <div className="h-40 w-full bg-gray-100 dark:bg-gray-800">
                    <img
                      src={winner.imageUrl || "/winner.svg"}
                      alt={winner.name}
                      className="h-full w-full object-cover object-center"
                      onError={(event) => {
                        event.currentTarget.src = "/winner.svg";
                      }}
                    />
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-[#1a242c] dark:text-gray-100">
                          {winner.name}
                        </h3>
                        <p className="text-sm text-[#4b5563] dark:text-gray-300">
                          {winner.prize}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                          winner.isPublished
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {inferStatusLabel(winner)}
                      </span>
                    </div>

                    <div className="text-xs text-[#6b7280] dark:text-gray-400">
                      {winner.location && <p>Location: {winner.location}</p>}
                      <p>Announced: {formatDate(winner.announcedAt)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(winner)}
                        className="rounded-lg border border-black/20 px-3 py-1.5 text-xs font-semibold text-[#1a242c] transition hover:bg-black/5 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/5"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePublished(winner)}
                        className="rounded-lg border border-black/20 px-3 py-1.5 text-xs font-semibold text-[#1a242c] transition hover:bg-black/5 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/5"
                      >
                        {winner.isPublished ? "Hide" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(winner.id)}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
