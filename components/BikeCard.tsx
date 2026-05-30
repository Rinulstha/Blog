import Link from "next/link";
import { IBike } from "@/models/Bike";
import { formatNPR } from "@/lib/utils";

interface BikeCardProps {
  bike: IBike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  return (
    <Link href={`/bikes/${bike.slug}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">

        {/* Bike Image */}
        <div className="relative h-48 bg-gray-800 overflow-hidden">
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
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full capitalize">
            {bike.category}
          </span>
        </div>

        {/* Bike Info */}
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">{bike.brand}</p>
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
            {bike.name}
          </h3>

          {/* Specs Row */}
          <div className="flex gap-3 text-xs text-gray-400 mb-3">
            {bike.specs?.engine && (
              <span>⚙️ {bike.specs.engine.split(",")[0]}</span>
            )}
            {bike.specs?.mileage && <span>⛽ {bike.specs.mileage}</span>}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-orange-400 font-bold text-lg">
              {formatNPR(bike.price)}
            </span>
            <span className="text-gray-400 text-xs border border-gray-700 px-2 py-1 rounded-full">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}