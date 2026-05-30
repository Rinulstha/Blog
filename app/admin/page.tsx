import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Bike from "@/models/Bike";
import Article from "@/models/Article";

async function getStats() {
  await connectDB();
  const [totalBikes, totalArticles, featuredBikes, publishedArticles] =
    await Promise.all([
      Bike.countDocuments(),
      Article.countDocuments(),
      Bike.countDocuments({ isFeatured: true }),
      Article.countDocuments({ isPublished: true }),
    ]);
  return { totalBikes, totalArticles, featuredBikes, publishedArticles };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Bikes",
      value: stats.totalBikes,
      icon: "🏍️",
      href: "/admin/bikes",
    },
    {
      label: "Featured Bikes",
      value: stats.featuredBikes,
      icon: "⭐",
      href: "/admin/bikes",
    },
    {
      label: "Total Articles",
      value: stats.totalArticles,
      icon: "📰",
      href: "/admin/articles",
    },
    {
      label: "Published Articles",
      value: stats.publishedArticles,
      icon: "✅",
      href: "/admin/articles",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Admin 👋</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/bikes/new">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors flex items-center gap-4">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-2xl">
                🏍️
              </div>
              <div>
                <p className="text-white font-semibold">Add New Bike</p>
                <p className="text-gray-400 text-sm">
                  Add a bike with specs and price
                </p>
              </div>
            </div>
          </Link>
          <Link href="/admin/articles/new">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors flex items-center gap-4">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-2xl">
                📰
              </div>
              <div>
                <p className="text-white font-semibold">Write New Article</p>
                <p className="text-gray-400 text-sm">
                  Publish a review or guide
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}