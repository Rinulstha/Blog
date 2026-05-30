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
          <h1 className="text-3xl font-bold text-white">Articles</h1>
          <p className="text-gray-400 mt-1">{articles.length} articles total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          + Add Article
        </Link>
      </div>

      {articles.length > 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Title
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">
                      {article.title}
                    </p>
                    <p className="text-gray-500 text-xs">{article.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full capitalize">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        article.isPublished
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
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
        <div className="text-center py-24 text-gray-500">
          <p className="text-6xl mb-4">📰</p>
          <p className="text-xl font-semibold text-gray-400 mb-2">
            No articles yet
          </p>
          <Link
            href="/admin/articles/new"
            className="text-orange-400 hover:text-orange-300 text-sm"
          >
            Write your first article →
          </Link>
        </div>
      )}
    </div>
  );
}