"use client";

import dynamic from "next/dynamic";
import styles from "../journey.module.scss";
import type { PublishedJourneyCluster } from "@/lib/published-journey";

const JourneyMap = dynamic(() => import("./JourneyMap"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapPlaceholder}>Loading map...</div>
  ),
});

type MapWrapperProps = {
  clusters: PublishedJourneyCluster[];
};

export default function MapWrapper({ clusters }: MapWrapperProps) {
  return <JourneyMap clusters={clusters} />;
}
