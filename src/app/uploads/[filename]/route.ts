import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { uploadPath } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  if (!/^[a-zA-Z0-9-]+\.webp$/.test(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(uploadPath(filename));
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
