import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Bike from "@/models/Bike";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    let bike = await Bike.findOne({ slug: id });
    if (!bike) bike = await Bike.findById(id);

    if (!bike) {
      return NextResponse.json(
        { success: false, error: "Bike not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bike });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const bike = await Bike.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!bike) {
      return NextResponse.json(
        { success: false, error: "Bike not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bike });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const bike = await Bike.findByIdAndDelete(id);

    if (!bike) {
      return NextResponse.json(
        { success: false, error: "Bike not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Bike deleted" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}