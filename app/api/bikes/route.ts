import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Bike from "@/models/Bike";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = { isAvailable: true };
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (featured) filter.isFeatured = true;

    const bikes = await Bike.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: bikes });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const bike = await Bike.create(body);

    return NextResponse.json(
      { success: true, data: bike },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}