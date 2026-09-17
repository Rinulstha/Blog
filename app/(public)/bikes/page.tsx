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
    <div className="page-shell">

      {/* Header */}
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-3">Discover your next ride</p>
        <h1 className="page-heading mb-3">
          All Bikes in Nepal
        </h1>
        <p className="text-(--color-text-secondary)">
          Browse {bikes.length} bikes with full specs and prices
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 rounded-2xl border border-(--color-border-light) bg-(--color-bg-secondary) p-5 shadow-sm sm:p-6 space-y-5">

        {/* Category Filter */}
        <div>
          <p className="text-(--color-text-secondary) text-sm font-semibold mb-3">Browse by category</p>
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
                  className={`filter-pill capitalize ${
                    isActive
                      ? "filter-pill-active"
                      : ""
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
          <p className="text-(--color-text-secondary) text-sm font-semibold mb-3">Browse by brand</p>
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
                  className={`filter-pill ${
                    isActive
                      ? "filter-pill-active"
                      : ""
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
        <div className="text-center py-24 text-(--color-text-muted)">
          <p className="text-6xl mb-4">🏍️</p>
          <p className="text-xl font-semibold text-(--color-text-tertiary) mb-2">
            No bikes found
          </p>
          <p className="text-sm">Try changing the filters above</p>
        </div>
      )}
    </div>
  );
}
