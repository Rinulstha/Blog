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
          <h1 className="text-3xl font-bold text-white">Bikes</h1>
          <p className="text-gray-400 mt-1">{bikes.length} bikes total</p>
        </div>
        <Link
          href="/admin/bikes/new"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          + Add Bike
        </Link>
      </div>

      {/* Bikes Table */}
      {bikes.length > 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Bike
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Brand
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden md:table-cell">
                  Price
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Category
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr
                  key={bike._id}
                  className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">{bike.name}</p>
                    <p className="text-gray-500 text-xs">{bike.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-gray-300 text-sm">{bike.brand}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-orange-400 text-sm font-medium">
                      {formatNPR(bike.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full capitalize">
                      {bike.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        bike.isFeatured
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {bike.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/bikes/${bike._id}`}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
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
        <div className="text-center py-24 text-gray-500">
          <p className="text-6xl mb-4">🏍️</p>
          <p className="text-xl font-semibold text-gray-400 mb-2">
            No bikes yet
          </p>
          <Link
            href="/admin/bikes/new"
            className="text-orange-400 hover:text-orange-300 text-sm"
          >
            Add your first bike →
          </Link>
        </div>
      )}
    </div>
  );
}