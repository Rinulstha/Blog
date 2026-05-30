import Link from "next/link";
import BikeCard from "@/components/BikeCard";
import { IBike } from "@/models/Bike";

interface BikesPageProps {
  searchParams: Promise<{
    brand?: string;
    category?: string;
  }>;
}

async function getBikes(brand?: string, category?: string): Promise<IBike[]> {
  try {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (category) params.set("category", category);

    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/bikes?${params.toString()}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

const categories = ["all", "sport", "commuter", "adventure", "cruiser", "scooter"];
const brands = ["all", "Hero", "Bajaj", "KTM", "Yamaha", "Honda", "TVS", "Royal Enfield", "Suzuki"];

export default async function BikesPage({ searchParams }: BikesPageProps) {
  const { brand, category } = await searchParams;

  const bikes = await getBikes(
    brand === "all" ? undefined : brand,
    category === "all" ? undefined : category
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          All Bikes in Nepal
        </h1>
        <p className="text-gray-400">
          Browse {bikes.length} bikes with full specs and prices
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 space-y-4">

        {/* Category Filter */}
        <div>
          <p className="text-gray-400 text-sm mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive =
                cat === "all" ? !category || category === "all" : category === cat;
              return (
                <Link
                  key={cat}
                  href={`/bikes?${new URLSearchParams({
                    ...(brand && brand !== "all" ? { brand } : {}),
                    category: cat,
                  }).toString()}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <p className="text-gray-400 text-sm mb-3">Filter by Brand</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => {
              const isActive =
                b === "all" ? !brand || brand === "all" : brand === b;
              return (
                <Link
                  key={b}
                  href={`/bikes?${new URLSearchParams({
                    brand: b,
                    ...(category && category !== "all" ? { category } : {}),
                  }).toString()}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {b}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bikes Grid */}
      {bikes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={(bike._id as unknown) as string} bike={bike} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-500">
          <p className="text-6xl mb-4">🏍️</p>
          <p className="text-xl font-semibold text-gray-400 mb-2">
            No bikes found
          </p>
          <p className="text-sm">Try changing the filters above</p>
        </div>
      )}
    </div>
  );
}