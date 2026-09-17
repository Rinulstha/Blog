 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IBike } from "@/models/Bike";
import { generateSlug } from "@/lib/utils";

interface BikeFormProps {
  bike?: IBike;        // if editing, bike is passed in
  isEditing?: boolean;
}

export default function BikeForm({ bike, isEditing }: BikeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: bike?.name || "",
    slug: bike?.slug || "",
    brand: bike?.brand || "",
    price: bike?.price || "",
    category: bike?.category || "commuter",
    description: bike?.description || "",
    images: bike?.images?.join(", ") || "",
    isFeatured: bike?.isFeatured || false,
    isAvailable: bike?.isAvailable ?? true,
    specs: {
      engine: bike?.specs?.engine || "",
      power: bike?.specs?.power || "",
      torque: bike?.specs?.torque || "",
      fuelTank: bike?.specs?.fuelTank || "",
      seatHeight: bike?.specs?.seatHeight || "",
      weight: bike?.specs?.weight || "",
      mileage: bike?.specs?.mileage || "",
      transmission: bike?.specs?.transmission || "",
      brakes: bike?.specs?.brakes || "",
      abs: bike?.specs?.abs || false,
    },
  });

function handleChange(
  e: React.ChangeEvent<HTMLInputElement> |
     React.ChangeEvent<HTMLTextAreaElement> |
     React.ChangeEvent<HTMLSelectElement>
) {
    const { name, value } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;

    // Auto generate slug from name
    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
      return;
    }

    if (name.startsWith("specs.")) {
      const specKey = name.replace("specs.", "");
      setForm((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specKey]:
            e.target instanceof HTMLInputElement &&
            e.target.type === "checkbox"
              ? checked
              : value,
        },
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
      price: Number(form.price),
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = isEditing
      ? `/api/bikes/${(bike?._id as unknown) as string}`
      : "/api/bikes";

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

    router.push("/admin/bikes");
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
        <h2 className="text-(--color-text-primary) font-semibold text-lg">Basic Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Bike Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="KTM Duke 390"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug (auto-generated)</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="ktm-duke-390"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Brand *</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="KTM"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Price (NPR) *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="650000"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {["sport", "commuter", "adventure", "cruiser", "scooter"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write a detailed description of the bike..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Image URLs (comma separated)
          </label>
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="https://image1.jpg, https://image2.jpg"
            className={inputClass}
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="accent-(--color-accent-primary) w-4 h-4"
            />
            <span className="text-(--color-text-secondary) text-sm">Available (visible)</span>
          </label>
        </div>
      </div>

      {/* Specs */}
      <div className="card p-6 space-y-4">
        <h2 className="text-(--color-text-primary) font-semibold text-lg">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "engine", placeholder: "373.3cc, Single Cylinder" },
            { key: "power", placeholder: "43 PS @ 9000 rpm" },
            { key: "torque", placeholder: "37 Nm @ 7000 rpm" },
            { key: "fuelTank", placeholder: "13.5 Litres" },
            { key: "seatHeight", placeholder: "810mm" },
            { key: "weight", placeholder: "177 kg" },
            { key: "mileage", placeholder: "25 kmpl" },
            { key: "transmission", placeholder: "6-Speed Manual" },
            { key: "brakes", placeholder: "Front Disc, Rear Disc" },
          ].map((spec) => (
            <div key={spec.key}>
              <label className={labelClass + " capitalize"}>
                {spec.key}
              </label>
              <input
                name={`specs.${spec.key}`}
                value={form.specs[spec.key as keyof typeof form.specs] as string}
                onChange={handleChange}
                placeholder={spec.placeholder}
                className={inputClass}
              />
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="specs.abs"
              checked={form.specs.abs}
              onChange={handleChange}
              className="accent-(--color-accent-primary) w-4 h-4"
            />
            <span className="text-(--color-text-secondary) text-sm">Has ABS</span>
          </div>
        </div>
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
            ? "Update Bike"
            : "Add Bike"}
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