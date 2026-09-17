import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-(--color-bg-secondary) border-t border-(--color-border-light) mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="grid size-9 place-items-center rounded-xl bg-(--color-accent-primary-light)">🏍️</span>
              <span className="text-lg font-extrabold tracking-tight text-text-primary">
                Nepal<span className="text-accent-primary">Bikes</span>
              </span>
            </div>
            <p className="text-text-tertiary text-sm leading-relaxed">
              Your go-to source for bikes available in Nepal.
              Specs, prices, reviews and everything you need
              to find your perfect ride.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Bikes", href: "/bikes" },
                { label: "Articles", href: "/articles" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary text-sm hover:text-accent-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Sport", "Commuter", "Adventure", "Cruiser", "Scooter"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/bikes?category=${cat.toLowerCase()}`}
                      className="text-text-tertiary text-sm hover:text-accent-primary transition-colors"
                    >
                      {cat} Bikes
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-(--color-border-light) mt-10 pt-6 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} NepalBikes. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">Made for every road in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
