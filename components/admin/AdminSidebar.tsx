"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Bikes", href: "/admin/bikes", icon: "🏍️" },
  { label: "Articles", href: "/admin/articles", icon: "📰" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-(--color-bg-secondary) border-r border-(--color-border-light) min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-(--color-border-light)">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏍️</span>
          <span className="font-bold text-text-primary">
            Nepal<span className="text-accent-primary">Bikes</span>
          </span>
        </div>
        <p className="text-text-muted text-xs mt-1">Admin Panel</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-(--color-accent-primary-light) text-accent-primary border border-(--color-accent-primary-light)"
                  : "text-text-secondary hover:bg-(--color-bg-tertiary) hover:text-text-primary"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — View Site + Logout */}
      <div className="p-4 border-t border-(--color-border-light) space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-secondary hover:bg-(--color-bg-tertiary) hover:text-text-primary transition-colors"
        >
          <span>🌐</span> View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-secondary hover:bg-(--color-error-light) hover:text-error transition-colors"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}