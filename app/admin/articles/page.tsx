import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import DeleteButton from "@/components/admin/DeleteButton";

// Plain type for serialized article data
interface PlainArticle {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export default async function AdminArticlesPage() {
  await connectDB();

  const rawArticles = await Article.find().sort({ createdAt: -1 }).lean();
  const articles: PlainArticle[] = JSON.parse(JSON.stringify(rawArticles));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Articles</h1>
          <p className="text-text-secondary mt-1">{articles.length} articles total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="btn btn-primary btn-md"
        >
          + Add Article
        </Link>
      </div>

      {articles.length > 0 ? (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-border-light)">
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">
                  Title
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right text-text-secondary text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b border-(--color-border-light) last:border-0 hover:bg-(--color-bg-hover) transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-text-primary font-medium text-sm">
                      {article.title}
                    </p>
                    <p className="text-text-tertiary text-xs">{article.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="badge badge-secondary capitalize">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`badge ${article.isPublished ? 'badge-success' : 'badge-secondary'}`}>
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={article._id} type="articles" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 text-text-muted">
          <p className="text-6xl mb-4">📰</p>
          <p className="text-xl font-semibold text-text-secondary mb-2">
            No articles yet
          </p>
          <Link
            href="/admin/articles/new"
            className="link"
          >
            Write your first article →
          </Link>
        </div>
      )}
    </div>
  );
}