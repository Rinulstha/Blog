import { notFound } from "next/navigation";
import Link from "next/link";
import { IBike } from "@/models/Bike";
import { formatNPR } from "@/lib/utils";

interface BikeDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getBike(slug: string): Promise<IBike | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/bikes/${slug}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function BikeDetailPage({ params }: BikeDetailPageProps) {
  const { slug } = await params;
  const bike = await getBike(slug);

  if (!bike) return notFound();

  const specsList = [
    { label: "Engine", value: bike.specs?.engine },
    { label: "Power", value: bike.specs?.power },
    { label: "Torque", value: bike.specs?.torque },
    { label: "Fuel Tank", value: bike.specs?.fuelTank },
    { label: "Seat Height", value: bike.specs?.seatHeight },
    { label: "Weight", value: bike.specs?.weight },
    { label: "Mileage", value: bike.specs?.mileage },
    { label: "Transmission", value: bike.specs?.transmission },
    { label: "Brakes", value: bike.specs?.brakes },
    { label: "ABS", value: bike.specs?.abs ? "Yes" : "No" },
  ].filter((s) => s.value);

  return (
    <div className="page-shell">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-tertiary mb-10 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-accent-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/bikes" className="hover:text-accent-primary transition-colors">
          Bikes
        </Link>
        <span>/</span>
        <span className="truncate text-text-primary">{bike.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Left — Images */}
        <div>
          <div className="bg-(--color-bg-secondary) rounded-3xl overflow-hidden border border-(--color-border-light) shadow-sm h-80 md:h-96">
            {bike.images?.[0] ? (
              <img
                src={bike.images[0]}
                alt={bike.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🏍️
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {bike.images?.length > 1 && (
            <div className="flex gap-3 mt-3">
              {bike.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="w-20 h-16 bg-(--color-bg-secondary) rounded-xl overflow-hidden border border-(--color-border-light)"
                >
                  <img
                    src={img}
                    alt={`${bike.name} view ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div>
          {/* Brand & Category */}
          <div className="flex items-center gap-3 mb-3">
            <span className="eyebrow">{bike.brand}</span>
            <span className="badge badge-primary capitalize">
              {bike.category}
            </span>
          </div>

          {/* Name */}
          <h1 className="page-heading mb-5">
            {bike.name}
          </h1>

          {/* Price */}
          <div className="bg-(--color-bg-secondary) border border-(--color-border-light) rounded-2xl p-6 mb-8 shadow-sm">
            <p className="text-text-tertiary text-sm font-medium mb-1">Price in Nepal</p>
            <p className="text-3xl font-extrabold tracking-tight text-accent-primary">
              {formatNPR(bike.price)}
            </p>
            <p className="text-text-muted text-xs mt-1">
              * Ex-showroom price. May vary by dealer.
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-text-primary font-bold text-lg mb-2">
              About this Bike
            </h2>
            <p className="text-text-secondary leading-relaxed">{bike.description}</p>
          </div>
        </div>
      </div>

      {/* Full Specs Table */}
      {specsList.length > 0 && (
        <div className="mt-14">
          <div className="mb-6">
            <p className="eyebrow mb-2">Every detail</p>
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Full Specifications
            </h2>
          </div>
          <div className="bg-(--color-bg-secondary) border border-(--color-border-light) rounded-2xl overflow-hidden shadow-sm">
            {specsList.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-4 ${
                  index !== specsList.length - 1
                    ? "border-b border-(--color-border-light)"
                    : ""
                }`}
              >
                <span className="text-text-tertiary text-sm">{spec.label}</span>
                <span className="text-text-primary font-semibold text-sm text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-10">
        <Link
          href="/bikes"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm font-semibold"
        >
          ← Back to all bikes
        </Link>
      </div>
    </div>
  );
}
