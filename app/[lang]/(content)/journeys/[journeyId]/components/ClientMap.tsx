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
  lang: string;
  journeyPublicId: string;
};

export default function ClientMap({
  clusters,
  mode,
  locationFallback,
  photoLabel,
  lang,
  journeyPublicId,
}: ClientMapProps) {
  return (
    <JourneyMap
      clusters={clusters}
      mode={mode}
      locationFallback={locationFallback}
      photoLabel={photoLabel}
      lang={lang}
      journeyPublicId={journeyPublicId}
    />
  );
}
