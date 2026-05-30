import ArticleForm from "@/components/admin/ArticleForm";

export default function AddArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Write New Article
      </h1>
      <ArticleForm />
    </div>
  );
}