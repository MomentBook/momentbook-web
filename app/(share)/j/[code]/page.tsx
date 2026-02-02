import { redirect, notFound } from "next/navigation";
import { decodeCodeToJourneyId } from "@/lib/share/signed"; // 네가 선택한 방식(A/B)

export default async function Page({ params }: { params: { code: string } }) {
    const secret = process.env.SHORTLINK_SECRET;
    if (!secret) throw new Error("SHORTLINK_SECRET is missing");

    const journeyId = decodeCodeToJourneyId(params.code, secret);
    if (!journeyId) notFound();

    redirect(`/journeys/${journeyId}`);
}
