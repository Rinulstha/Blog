import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Bike from "@/models/Bike";
import { formatNPR } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

// Plain type for serialized bike data
interface PlainBike {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  category: string;
  isFeatured: boolean;
}

export default async function AdminBikesPage() {
  await connectDB();

  // .lean() returns plain JS objects instead of Mongoose documents
  // JSON.parse(JSON.stringify()) converts ObjectId to string
  const rawBikes = await Bike.find().sort({ createdAt: -1 }).lean();
  const bikes: PlainBike[] = JSON.parse(JSON.stringify(rawBikes));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Bikes</h1>
          <p className="text-text-secondary mt-1">{bikes.length} bikes total</p>
        </div>
        <Link
          href="/admin/bikes/new"
          className="btn btn-primary btn-md"
        >
          + Add Bike
        </Link>
      </div>

      {/* Bikes Table */}
      {bikes.length > 0 ? (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-border-light)">
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">
                  Bike
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Brand
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Price
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Category
                </th>
                <th className="text-left text-text-secondary text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-right text-text-secondary text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr
                  key={bike._id}
                  className="border-b border-(--color-border-light) last:border-0 hover:bg-(--color-bg-hover) transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-text-primary font-medium text-sm">{bike.name}</p>
                    <p className="text-text-tertiary text-xs">{bike.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-text-secondary text-sm">{bike.brand}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-accent-primary text-sm font-medium">
                      {formatNPR(bike.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="badge badge-secondary capitalize">
                      {bike.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`badge ${bike.isFeatured ? 'badge-primary' : 'badge-secondary'}`}>
                      {bike.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/bikes/${bike._id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={bike._id} type="bikes" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 text-text-muted">
          <p className="text-6xl mb-4">🏍️</p>
          <p className="text-xl font-semibold text-text-secondary mb-2">
            No bikes yet
          </p>
          <Link
            href="/admin/bikes/new"
            className="link"
          >
            Add your first bike →
          </Link>
        </div>
      )}
    </div>
  );
}