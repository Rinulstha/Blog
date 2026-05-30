import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    let article = await Article.findOne({ slug: id }).populate(
      "relatedBikes",
      "name slug brand price"
    );
    if (!article)
      article = await Article.findById(id).populate(
        "relatedBikes",
        "name slug brand price"
      );

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
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

    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
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
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}