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
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-(--color-bg-primary)" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-accent-primary/15 via-transparent to-transparent" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ea580c\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block bg-(--color-bg-secondary)/90 text-accent-primary text-xs font-bold uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-(--color-accent-primary-light) shadow-sm mb-6 animate-fade-in">
            🏍️ Nepal&apos;s #1 Bike Guide
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-[-0.055em] text-text-primary mb-6 leading-[0.98] animate-slide-up">
            Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
              {" "}Perfect Ride
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
            Explore bikes available in Nepal with detailed specs, real prices, and expert articles to help you choose the right bike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              href="/bikes"
              className="btn btn-primary btn-lg"
            >
              Explore Bikes
            </Link>
            <Link
              href="/articles"
              className="btn btn-secondary btn-lg"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Bikes Section ── */}
      <section className="section pt-20">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="eyebrow mb-2">Curated for you</p>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">Featured Bikes</h2>
              <p className="text-text-secondary mt-1">Top picks available in Nepal</p>
            </div>
            <Link
              href="/bikes"
              className="text-accent-primary hover:text-accent-primary-hover text-sm font-medium transition-colors"
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
            <div className="text-center py-16 text-text-muted">
              <p className="text-5xl mb-4">🏍️</p>
              <p>No featured bikes yet. Add some from the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="bg-(--color-bg-secondary) border-y border-(--color-border-light) py-14">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Bikes Listed" },
              { value: "10+", label: "Brands Covered" },
              { value: "20+", label: "Articles Written" },
              { value: "100%", label: "Nepal Focused" },
            ].map((stat) => (
              <div key={stat.label} className="relative after:absolute after:right-0 after:top-1/2 after:hidden after:h-10 after:w-px after:-translate-y-1/2 after:bg-(--color-border-light) md:[&:not(:last-child)]:after:block">
                <p className="text-4xl font-extrabold text-accent-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Articles Section ── */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="eyebrow mb-2">From the road</p>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">Latest Articles</h2>
              <p className="text-text-secondary mt-1">Reviews, guides and comparisons</p>
            </div>
            <Link
              href="/articles"
              className="text-accent-primary hover:text-accent-primary-hover text-sm font-medium transition-colors"
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
            <div className="text-center py-16 text-text-muted">
              <p className="text-5xl mb-4">📰</p>
              <p>No articles yet. Add some from the admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
