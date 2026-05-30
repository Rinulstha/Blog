import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
      <div>
        <p className="text-8xl mb-6">🏍️</p>
        <h1 className="text-5xl font-extrabold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-8">
          Oops! This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}