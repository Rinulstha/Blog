import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏍️</span>
              <span className="text-xl font-bold text-white">
                Nepal<span className="text-orange-500">Bikes</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your go-to source for bikes available in Nepal. 
              Specs, prices, reviews and everything you need 
              to find your perfect ride.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Bikes", href: "/bikes" },
                { label: "Articles", href: "/articles" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Sport", "Commuter", "Adventure", "Cruiser", "Scooter"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/bikes?category=${cat.toLowerCase()}`}
                      className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
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
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NepalBikes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}