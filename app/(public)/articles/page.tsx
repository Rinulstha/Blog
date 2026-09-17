import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { IArticle } from "@/models/Article";

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function getArticles(category?: string): Promise<IArticle[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.set("category", category);

    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/articles?${params.toString()}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

const categories = ["all", "review", "comparison", "news", "tips", "guides"];

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category } = await searchParams;

  const articles = await getArticles(
    category === "all" ? undefined : category
  );

  return (
    <div className="page-shell">

      {/* Header */}
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-3">Stories & advice</p>
        <h1 className="page-heading mb-3">
          Articles & Guides
        </h1>
        <p className="text-text-secondary">
          Reviews, comparisons and tips for bike riders in Nepal
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-12 rounded-2xl border border-(--color-border-light) bg-(--color-bg-secondary) p-5 shadow-sm sm:p-6">
        <p className="text-text-secondary text-sm font-semibold mb-3">Explore a topic</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive =
              cat === "all" ? !category || category === "all" : category === cat;
            return (
              <Link
                key={cat}
                href={`/articles?category=${cat}`}
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

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={(article._id as unknown) as string}
              article={article}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-text-muted">
          <p className="text-6xl mb-4">📰</p>
          <p className="text-xl font-semibold text-text-tertiary mb-2">
            No articles found
          </p>
          <p className="text-sm">Try changing the filter or check back later</p>
        </div>
      )}
    </div>
  );
}
