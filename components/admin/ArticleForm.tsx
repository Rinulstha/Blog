"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IArticle } from "@/models/Article";
import { generateSlug } from "@/lib/utils";

interface ArticleFormProps {
  article?: IArticle;
  isEditing?: boolean;
}

export default function ArticleForm({ article, isEditing }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    coverImage: article?.coverImage || "",
    category: article?.category || "review",
    tags: article?.tags?.join(", ") || "",
    isPublished: article?.isPublished || false,
    isFeatured: article?.isFeatured || false,
  });

function handleChange(
  e: React.ChangeEvent<HTMLInputElement> |
     React.ChangeEvent<HTMLTextAreaElement> |
     React.ChangeEvent<HTMLSelectElement>
) {
    const { name, value } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? checked
          : value,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = isEditing
      ? `/api/articles/${(article?._id as unknown) as string}`
      : "/api/articles";

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  const inputClass =
    "w-full bg-(--color-bg-secondary) border border-(--color-border-medium) text-(--color-text-primary) rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-(--color-accent-primary) focus:ring-2 focus:ring-(--color-accent-primary-light) transition-colors";

  const labelClass = "text-(--color-text-secondary) text-sm mb-1.5 block";

  return (
    <div className="max-w-3xl space-y-8">
      {error && (
        <div className="bg-(--color-error-light) border border-(--color-error-light) text-(--color-error) text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="card p-6 space-y-4">
        <h2 className="text-(--color-text-primary) font-semibold text-lg">Article Info</h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Best Bikes Under 3 Lakh in Nepal"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Slug (auto-generated)</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {["review", "comparison", "news", "tips", "guides"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://image.jpg"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Excerpt (short preview shown on listing)
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            placeholder="A short summary of the article..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="KTM, sport bikes, 2024"
            className={inputClass}
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={form.isPublished}
              onChange={handleChange}
              className="accent-(--color-accent-primary) w-4 h-4"
            />
            <span className="text-(--color-text-secondary) text-sm">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
              className="accent-(--color-accent-primary) w-4 h-4"
            />
            <span className="text-(--color-text-secondary) text-sm">Featured on Homepage</span>
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="card p-6 space-y-4">
        <h2 className="text-(--color-text-primary) font-semibold text-lg">Content *</h2>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={16}
          placeholder="Write your full article here..."
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary btn-lg"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Article"
            : "Publish Article"}
        </button>
        <button
          onClick={() => router.back()}
          className="btn btn-secondary btn-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}