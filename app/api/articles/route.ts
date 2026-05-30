import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = { isPublished: true };
    if (category) filter.category = category;
    if (featured) filter.isFeatured = true;

    const articles = await Article.find(filter)
      .populate("relatedBikes", "name slug brand")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: articles });
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
    const article = await Article.create(body);

    return NextResponse.json(
      { success: true, data: article },
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