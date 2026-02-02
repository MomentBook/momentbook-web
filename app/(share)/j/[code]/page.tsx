import { redirect, notFound } from "next/navigation";
import { decodeCodeToPublicId } from "@/lib/share/signedPublic";
import { ENV } from "@/src/configs/env.server";

export const runtime = "nodejs";

export default async function Page({ params }: { params: { code: string } }) {
    const secret = ENV.SHORTLINK_SECRET;
    if (!secret) throw new Error("SHORTLINK_SECRET is missing");

    const publicId = decodeCodeToPublicId(params.code, secret);
    if (!publicId) notFound();

    redirect(`/journeys/${publicId}`);
}
