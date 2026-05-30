import Link from "next/link";
import BikeCard from "@/components/BikeCard";
import ArticleCard from "@/components/ArticleCard";
import { IBike } from "@/models/Bike";
import { IArticle } from "@/models/Article";

// Fetch featured bikes from our own API
async function getFeaturedBikes(): Promise<IBike[]> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/bikes?featured=true`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data.slice(0, 3) : [];
  } catch {
    return [];
  }
}

// Fetch featured articles from our own API
async function getFeaturedArticles(): Promise<IArticle[]> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/articles?featured=true`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data.slice(0, 3) : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredBikes, featuredArticles] = await Promise.all([
    getFeaturedBikes(),
    getFeaturedArticles(),
  ]);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block bg-orange-500/10 text-orange-400 text-sm font-medium px-4 py-1.5 rounded-full border border-orange-500/20 mb-6">
            🏍️ Nepal&apos;s #1 Bike Guide
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {" "}Perfect Ride
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore bikes available in Nepal with detailed specs, 
            real prices, and expert articles to help you choose the right bike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bikes"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
            >
              Explore Bikes
            </Link>
            <Link
              href="/articles"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3.5 rounded-full border border-gray-700 transition-colors duration-200"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Bikes Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Bikes</h2>
            <p className="text-gray-400 mt-1">Top picks available in Nepal</p>
          </div>
          <Link
            href="/bikes"
            className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {featuredBikes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBikes.map((bike) => (
              <BikeCard key={(bike._id as unknown) as string} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-5xl mb-4">🏍️</p>
            <p>No featured bikes yet. Add some from the admin panel.</p>
          </div>
        )}
      </section>

      {/* ── Stats Section ── */}
      <section className="bg-gray-900 border-y border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Bikes Listed" },
              { value: "10+", label: "Brands Covered" },
              { value: "20+", label: "Articles Written" },
              { value: "100%", label: "Nepal Focused" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold text-orange-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Articles Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <p className="text-gray-400 mt-1">Reviews, guides and comparisons</p>
          </div>
          <Link
            href="/articles"
            className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {featuredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={(article._id as unknown) as string} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-5xl mb-4">📰</p>
            <p>No articles yet. Add some from the admin panel.</p>
          </div>
        )}
      </section>
    </div>
  );
}