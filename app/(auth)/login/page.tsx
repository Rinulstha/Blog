"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--color-bg-primary) flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-accent-primary/15 via-transparent to-transparent" />
      <div className="card relative w-full max-w-md p-8 sm:p-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-(--color-accent-primary-light) text-3xl">🏍️</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary mt-4">
            Nepal<span className="text-accent-primary">Bikes</span>
          </h1>
          <p className="text-text-tertiary text-sm mt-1">Admin workspace</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-(--color-error-light) border border-(--color-error-light) text-(--color-error) text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nepalbikes.com"
              className="input h-12"
            />
          </div>

          <div>
            <label className="label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="input h-12"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-primary btn-lg w-full mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
