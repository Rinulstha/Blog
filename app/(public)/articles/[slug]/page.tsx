import { notFound } from "next/navigation";
import Link from "next/link";
import { IArticle } from "@/models/Article";
import { IBike } from "@/models/Bike";
import BikeCard from "@/components/BikeCard";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<IArticle | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/articles/${slug}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-orange-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/articles"
          className="hover:text-orange-400 transition-colors"
        >
          Articles
        </Link>
        <span>/</span>
        <span className="text-white line-clamp-1">{article.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left — Main Article Content */}
        <div className="lg:col-span-2">

          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/20 capitalize">
              {article.category}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString("en-NP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-gray-800 mb-8 h-72 md:h-96">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-orange max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line"
            >
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-10">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>

        {/* Right — Sidebar */}
        <div className="space-y-8">

          {/* Related Bikes */}
          {article.relatedBikes?.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Related Bikes
              </h3>
              <div className="space-y-4">
                {(article.relatedBikes as unknown as IBike[]).map((bike) => (
                  <BikeCard
                    key={(bike._id as unknown) as string}
                    bike={bike}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Summary Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-base mb-3">
              Article Summary
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Browse More */}
          <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-5">
            <h3 className="text-white font-bold text-base mb-2">
              Looking for a bike?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Browse all bikes available in Nepal with full specs and prices.
            </p>
            <Link
              href="/bikes"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Browse Bikes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}