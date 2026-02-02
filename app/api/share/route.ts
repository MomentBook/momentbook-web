import { NextResponse } from "next/server";
import { encodePublicIdToCode } from "@/lib/share/signedPublic";
import { ENV } from "@/src/configs/env.server";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const secret = ENV.SHORTLINK_SECRET;
    if (!secret)
        return NextResponse.json(
            { error: "SHORTLINK_SECRET missing" },
            { status: 500 },
        );

    const body = await req.json().catch(() => null);
    const publicId = body?.publicId;

    if (typeof publicId !== "string") {
        return NextResponse.json(
            { error: "publicId required" },
            { status: 400 },
        );
    }

    let code: string;
    try {
        code = encodePublicIdToCode(publicId, secret);
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? "invalid publicId" },
            { status: 400 },
        );
    }

    const shortUrl = `https://www.momentbook.xyz/j/${code}`;
    return NextResponse.json({ data: { shortUrl } });
}
