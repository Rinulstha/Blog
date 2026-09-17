import Link from "next/link";
import { IBike } from "@/models/Bike";
import { formatNPR } from "@/lib/utils";

interface BikeCardProps {
  bike: IBike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  return (
    <Link href={`/bikes/${bike.slug}`}>
      <div className="card group h-full overflow-hidden">

        {/* Bike Image */}
        <div className="relative h-52 bg-(--color-bg-tertiary) overflow-hidden">
          {bike.images?.[0] ? (
            <img
              src={bike.images[0]}
              alt={bike.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🏍️
            </div>
          )}

          {/* Category Badge */}
          <span className="absolute top-3 left-3 badge badge-primary capitalize">
            {bike.category}
          </span>
        </div>

        {/* Bike Info */}
        <div className="flex min-h-52 flex-col p-5">
          <p className="text-text-tertiary text-xs font-bold uppercase tracking-[0.12em] mb-2">{bike.brand}</p>
          <h3 className="text-text-primary font-bold text-lg leading-snug mb-3 group-hover:text-accent-primary transition-colors">
            {bike.name}
          </h3>

          {/* Specs Row */}
          <div className="flex gap-3 text-xs text-text-tertiary mb-3">
            {bike.specs?.engine && (
              <span>⚙️ {bike.specs.engine.split(",")[0]}</span>
            )}
            {bike.specs?.mileage && <span>⛽ {bike.specs.mileage}</span>}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between border-t border-(--color-border-light) pt-4">
            <span className="text-accent-primary font-bold text-lg">
              {formatNPR(bike.price)}
            </span>
            <span className="text-text-secondary text-xs font-semibold">
              Details <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
