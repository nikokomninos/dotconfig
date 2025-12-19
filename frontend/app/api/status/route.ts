
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie"); 

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`, {
    headers: {
      Cookie: cookie || "",
    },
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
