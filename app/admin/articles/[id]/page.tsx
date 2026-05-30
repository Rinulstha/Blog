import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  await connectDB();
  const { id } = await params;
  const article = await Article.findById(id).lean();

  if (!article) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Article</h1>
      <ArticleForm article={JSON.parse(JSON.stringify(article))} isEditing />
    </div>
  );
}