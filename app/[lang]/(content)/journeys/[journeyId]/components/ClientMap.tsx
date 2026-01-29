"use client";

import dynamic from "next/dynamic";
import type { JourneyMode, PublishedJourneyCluster } from "@/lib/published-journey";

const JourneyMap = dynamic(() => import("./JourneyMap"), {
  ssr: false,
});

type ClientMapProps = {
  clusters: PublishedJourneyCluster[];
  mode: JourneyMode;
  locationFallback: string;
  photoLabel: string;
};

export default function ClientMap({
  clusters,
  mode,
  locationFallback,
  photoLabel,
}: ClientMapProps) {
  return (
    <JourneyMap
      clusters={clusters}
      mode={mode}
      locationFallback={locationFallback}
      photoLabel={photoLabel}
    />
  );
}
