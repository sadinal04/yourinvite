import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Wish from "@/models/Wish";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const wishes = await Wish.find({ slug }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: wishes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();

    const { name, wish } = body;

    if (!name || !wish || !name.trim() || !wish.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and wish are required" },
        { status: 400 }
      );
    }

    const newWish = await Wish.create({
      slug,
      name: name.trim(),
      wish: wish.trim(),
    });

    return NextResponse.json({ success: true, data: newWish }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
