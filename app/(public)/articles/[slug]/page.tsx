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
    <div className="page-shell">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-tertiary mb-10 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-accent-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/articles"
          className="hover:text-accent-primary transition-colors"
        >
          Articles
        </Link>
        <span>/</span>
        <span className="truncate text-text-primary">{article.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left — Main Article Content */}
        <div className="lg:col-span-2">

          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-primary capitalize">
              {article.category}
            </span>
            <span className="text-text-tertiary text-sm">
              {new Date(article.createdAt).toLocaleDateString("en-NP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="page-heading mb-7">
            {article.title}
          </h1>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-3xl overflow-hidden border border-(--color-border-light) bg-(--color-bg-secondary) shadow-sm mb-8 h-72 md:h-96">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-none">
            <div
              className="text-text-secondary text-[1.05rem] leading-8 whitespace-pre-line"
            >
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-(--color-border-light)">
              <p className="text-text-tertiary text-sm font-semibold mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-(--color-bg-tertiary) text-text-secondary text-xs font-semibold px-3 py-1.5 rounded-full"
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
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm font-semibold"
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
              <h3 className="text-text-primary font-bold text-lg mb-4">
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
          <div className="card p-6">
            <h3 className="text-text-primary font-bold text-base mb-3">
              Article Summary
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Browse More */}
          <div className="bg-gradient-to-br from-(--color-accent-primary-light) to-(--color-bg-secondary) border border-(--color-accent-primary-light) rounded-2xl p-6">
            <h3 className="text-text-primary font-bold text-base mb-2">
              Looking for a bike?
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Browse all bikes available in Nepal with full specs and prices.
            </p>
            <Link
              href="/bikes"
              className="btn btn-primary btn-md"
            >
              Browse Bikes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
