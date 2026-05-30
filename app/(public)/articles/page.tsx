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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Articles & Guides
        </h1>
        <p className="text-gray-400">
          Reviews, comparisons and tips for bike riders in Nepal
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <p className="text-gray-400 text-sm mb-3">Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive =
              cat === "all" ? !category || category === "all" : category === cat;
            return (
              <Link
                key={cat}
                href={`/articles?category=${cat}`}
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
        <div className="text-center py-24 text-gray-500">
          <p className="text-6xl mb-4">📰</p>
          <p className="text-xl font-semibold text-gray-400 mb-2">
            No articles found
          </p>
          <p className="text-sm">Try changing the filter or check back later</p>
        </div>
      )}
    </div>
  );
}