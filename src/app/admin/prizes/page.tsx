"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Prize } from "@/lib/content-types";
import { formatPrizeDate, getPrizeImage } from "@/lib/prize-ui";

type PrizeFormState = {
  drawDate: string;
  imageUrl: string;
  imageKey: string;
  pointsText: string;
  isPublished: boolean;
};

type StatusFilter = "all" | "published" | "hidden";

function defaultFormState(): PrizeFormState {
  return {
    drawDate: new Date().toISOString().slice(0, 10),
    imageUrl: "",
    imageKey: "",
    pointsText: "",
    isPublished: true,
  };
}

function pointsToText(points: string[]) {
  return points.join("\n");
}

function textToPoints(value: string) {
  return value
    .split("\n")
    .map((point) => point.trim())
    .filter(Boolean);
}

function toDateInputValue(dateIso: string) {
  const parsed = new Date(dateIso);
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

export default function AdminPrizesPage() {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [form, setForm] = useState<PrizeFormState>(defaultFormState);
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

    const preview = URL.createObjectURL(selectedFile);
    setLocalPreviewUrl(preview);

    return () => URL.revokeObjectURL(preview);
  }, [selectedFile]);

  const loadPrizes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/prizes", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = (await response.json()) as { prizes: Prize[] };
      setPrizes(payload.prizes ?? []);
      setError(null);
    } catch (loadError) {
      const nextError =
        loadError instanceof Error ? loadError.message : "Failed to load prizes";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrizes();
  }, []);

  const publishedCount = useMemo(
    () => prizes.filter((item) => item.isPublished).length,
    [prizes],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return prizes.filter((item) => {
      const statusMatch =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
            ? item.isPublished
            : !item.isPublished;

      if (!statusMatch) {
        return false;
      }

      if (!q) {
        return true;
      }

      return `${formatPrizeDate(item.drawDate)} ${item.points.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [prizes, searchQuery, statusFilter]);

  const resetForm = () => {
    setForm(defaultFormState());
    setEditingId(null);
    setSelectedFile(null);
  };

  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: data,
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
        ? `/api/admin/prizes/${editingId}`
        : "/api/admin/prizes";
      const method = editingId ? "PATCH" : "POST";

      let imageUrl = form.imageUrl.trim();
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const payload = {
        drawDate: form.drawDate,
        imageUrl,
        imageKey: form.imageKey.trim(),
        points: textToPoints(form.pointsText),
        isPublished: form.isPublished,
      };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadPrizes();
      resetForm();
      setMessage(editingId ? "Prize updated." : "Prize created.");
    } catch (submitError) {
      const nextError =
        submitError instanceof Error ? submitError.message : "Failed to save prize";
      setError(nextError);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (prize: Prize) => {
    setEditingId(prize.id);
    setForm({
      drawDate: toDateInputValue(prize.drawDate),
      imageUrl: prize.imageUrl,
      imageKey: prize.imageKey,
      pointsText: pointsToText(prize.points),
      isPublished: prize.isPublished,
    });
    setSelectedFile(null);
    setError(null);
    setMessage(null);
  };

  const handleDelete = async (prizeId: string) => {
    const confirmed = window.confirm("Delete this prize?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/prizes/${prizeId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadPrizes();
      if (editingId === prizeId) {
        resetForm();
      }
      setMessage("Prize deleted.");
    } catch (deleteError) {
      const nextError =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete prize";
      setError(nextError);
    }
  };

  const togglePublished = async (prize: Prize) => {
    try {
      const response = await fetch(`/api/admin/prizes/${prize.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !prize.isPublished }),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      await loadPrizes();
      setMessage(prize.isPublished ? "Prize hidden." : "Prize published.");
    } catch (toggleError) {
      const nextError =
        toggleError instanceof Error ? toggleError.message : "Failed to update";
      setError(nextError);
    }
  };

  const previewImage =
    localPreviewUrl ||
    getPrizeImage({ imageUrl: form.imageUrl, imageKey: form.imageKey });

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Total Entries
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">
            {prizes.length}
          </p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Published
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-700 dark:text-emerald-300">
            {publishedCount}
          </p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-[#1a242c]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6430] dark:text-[#E0D19B]">
            Hidden
          </p>
          <p className="mt-3 text-3xl font-black text-[#1a242c] dark:text-white">
            {prizes.length - publishedCount}
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[430px_1fr]">
        <article className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-xl dark:border-white/10 dark:bg-[#1a242c]/90">
          <h2 className="text-2xl font-black text-[#1a242c] dark:text-white">
            {editingId ? "Edit Prize" : "Create Prize"}
          </h2>
          <p className="mt-1 text-sm text-[#4b5563] dark:text-gray-300">
            Configure what users can win. Choose draw date from calendar.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Draw Date
              </span>
              <input
                required
                type="date"
                value={form.drawDate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, drawDate: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="w-full rounded-xl border border-dashed border-gray-300 bg-white px-3 py-2 text-sm text-[#1a242c] outline-none dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Image URL (optional)
              </span>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, imageUrl: event.target.value }))
                }
                placeholder="/api/uploads/... or https://..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Image Key (fallback)
              </span>
              <input
                type="text"
                value={form.imageKey}
                onChange={(event) =>
                  setForm((current) => ({ ...current, imageKey: event.target.value }))
                }
                placeholder="kayo, kingdom, gift, card3..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1a242c] dark:text-gray-100">
                Points (one per line)
              </span>
              <textarea
                required
                rows={5}
                value={form.pointsText}
                onChange={(event) =>
                  setForm((current) => ({ ...current, pointsText: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a242c] dark:text-gray-100">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    isPublished: event.target.checked,
                  }))
                }
                className="size-4 rounded border-gray-300"
              />
              Publish now
            </label>

            {previewImage ? (
              <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-40 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/winner.svg";
                  }}
                />
              </div>
            ) : null}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="rounded-xl bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_100%)] px-4 py-2 text-sm font-bold text-[#1a242c] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Entry"
                    : "Create Entry"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-[#1a242c] dark:border-white/10 dark:text-gray-200"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-xl dark:border-white/10 dark:bg-[#1a242c]/90">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by date or points..."
              className="min-w-[230px] flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#B6983D] dark:border-gray-700 dark:bg-[#121920] dark:text-white"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="hidden">Hidden</option>
            </select>
            <button
              type="button"
              onClick={() => loadPrizes()}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold text-[#1a242c] dark:border-white/10 dark:text-gray-100"
            >
              Refresh
            </button>
          </div>

          {message ? (
            <p className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-400">
              {error}
            </p>
          ) : null}

          <div className="mt-4 space-y-3">
            {loading ? (
              <p className="rounded-xl border border-dashed border-black/15 bg-white/75 px-4 py-5 text-sm text-[#6b7280] dark:border-white/15 dark:bg-[#121920] dark:text-gray-400">
                Loading entries...
              </p>
            ) : filtered.length === 0 ? (
              <p className="rounded-xl border border-dashed border-black/15 bg-white/75 px-4 py-5 text-sm text-[#6b7280] dark:border-white/15 dark:bg-[#121920] dark:text-gray-400">
                No entries found.
              </p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-black/10 bg-white/75 p-4 dark:border-white/10 dark:bg-[#121920]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#1a242c] dark:text-white">
                        {formatPrizeDate(item.drawDate)}
                      </p>
                      <p className="text-xs text-[#6b7280] dark:text-gray-400">
                        {item.isPublished ? "Published" : "Hidden"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => togglePublished(item)}
                        className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#1a242c] dark:border-white/10 dark:text-gray-100"
                      >
                        {item.isPublished ? "Hide" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#1a242c] dark:text-gray-200">
                    {item.points.map((point, index) => (
                      <li key={`${item.id}-${index}`}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
