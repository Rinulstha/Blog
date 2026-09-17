import { notFound } from "next/navigation";
import BikeForm from "@/components/admin/BikeForm";
import connectDB from "@/lib/mongodb";
import Bike from "@/models/Bike";

interface EditBikePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBikePage({ params }: EditBikePageProps) {
  await connectDB();
  const { id } = await params;
  const bike = await Bike.findById(id).lean();

  if (!bike) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Edit Bike</h1>
      <BikeForm bike={JSON.parse(JSON.stringify(bike))} isEditing />
    </div>
  );
}