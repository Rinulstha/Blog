import Link from "next/link";
import { IArticle } from "@/models/Article";

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">

        {/* Cover Image */}
        <div className="relative h-44 bg-gray-800 overflow-hidden">
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
          <span className="absolute top-3 left-3 bg-gray-700 text-orange-400 text-xs font-semibold px-2 py-1 rounded-full capitalize">
            {article.category}
          </span>
        </div>

        {/* Article Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {article.excerpt}
          </p>

          {/* Date */}
          <p className="text-gray-500 text-xs">
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