import { NextResponse } from "next/server";
import { encodeJourneyIdToCode } from "@/lib/share/signed";
import { ENV } from "@/src/configs/env.server";

export const runtime = "nodejs"; // crypto 사용 위해 권장

export async function POST(req: Request) {
    const secret = ENV.SHORTLINK_SECRET;
    if (!secret) {
        return NextResponse.json(
            { error: "SHORTLINK_SECRET is missing" },
            { status: 500 },
        );
    }

    const body = await req.json().catch(() => null);
    const journeyId = body?.journeyId;

    if (typeof journeyId !== "string" || !/^[0-9a-f]{24}$/i.test(journeyId)) {
        return NextResponse.json(
            { error: "Invalid journeyId" },
            { status: 400 },
        );
    }

    const code = encodeJourneyIdToCode(journeyId, secret);
    const shortUrl = `https://www.momentbook.xyz/j/${code}`;

    return NextResponse.json({ data: { shortUrl } });
}
