import Link from "next/link";
import { IArticle } from "@/models/Article";

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="card group h-full overflow-hidden">

        {/* Cover Image */}
        <div className="relative h-48 bg-(--color-bg-tertiary) overflow-hidden">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              📰
            </div>
          )}

          {/* Category Badge */}
          <span className="absolute top-3 left-3 badge badge-secondary capitalize">
            {article.category}
          </span>
        </div>

        {/* Article Info */}
        <div className="flex min-h-48 flex-col p-5">
          <h3 className="text-text-primary font-bold text-lg leading-snug mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2 mb-3">
            {article.excerpt}
          </p>

          {/* Date */}
          <p className="mt-auto border-t border-(--color-border-light) pt-4 text-text-tertiary text-xs font-medium">
            {new Date(article.createdAt).toLocaleDateString("en-NP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
