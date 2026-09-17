import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
      <div className="card max-w-md p-10">
        <p className="text-7xl mb-6">🏍️</p>
        <p className="eyebrow mb-3">Wrong turn</p>
        <h1 className="page-heading mb-4">404</h1>
        <p className="text-text-secondary text-lg mb-8">
          Oops! This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="btn btn-primary btn-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
