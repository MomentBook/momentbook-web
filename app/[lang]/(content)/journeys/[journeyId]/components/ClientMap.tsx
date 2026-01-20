"use client";

import dynamic from "next/dynamic";
import type { PublishedJourneyCluster } from "@/lib/published-journey";

const JourneyMap = dynamic(() => import("./JourneyMap"), {
  ssr: false,
});

type ClientMapProps = {
  clusters: PublishedJourneyCluster[];
};

export default function ClientMap({ clusters }: ClientMapProps) {
  return <JourneyMap clusters={clusters} />;
}
