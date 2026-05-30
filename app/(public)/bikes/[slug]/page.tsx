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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-orange-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/bikes" className="hover:text-orange-400 transition-colors">
          Bikes
        </Link>
        <span>/</span>
        <span className="text-white">{bike.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — Images */}
        <div>
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 h-80 md:h-96">
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
                  className="w-20 h-16 bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
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
            <span className="text-gray-400 text-sm">{bike.brand}</span>
            <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-full capitalize border border-orange-500/20">
              {bike.category}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-extrabold text-white mb-4">
            {bike.name}
          </h1>

          {/* Price */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
            <p className="text-gray-400 text-sm mb-1">Price in Nepal</p>
            <p className="text-3xl font-extrabold text-orange-400">
              {formatNPR(bike.price)}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              * Ex-showroom price. May vary by dealer.
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-white font-semibold text-lg mb-2">
              About this Bike
            </h2>
            <p className="text-gray-400 leading-relaxed">{bike.description}</p>
          </div>
        </div>
      </div>

      {/* Full Specs Table */}
      {specsList.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-white mb-6">
            Full Specifications
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {specsList.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-4 ${
                  index !== specsList.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
              >
                <span className="text-gray-400 text-sm">{spec.label}</span>
                <span className="text-white font-medium text-sm">
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
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
        >
          ← Back to all bikes
        </Link>
      </div>
    </div>
  );
}