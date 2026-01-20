"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "../journey.module.scss";
import type {
  PublishedJourneyApi,
  PublishedJourneyCluster,
} from "@/lib/published-journey";

const JourneyMap = dynamic(() => import("./JourneyMap"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapPlaceholder}>Loading map...</div>
  ),
});

type JourneyContentProps = {
  journey: PublishedJourneyApi;
  imageMap: Map<string, string>;
  lang: string;
  labels: {
    places: string;
    gallery: string;
  };
  locations: string[];
};

export default function JourneyContent({
  journey,
  imageMap,
  lang,
  labels,
  locations,
}: JourneyContentProps) {
  const clusterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClusterClick = (clusterId: string) => {
    const element = clusterRefs.current[clusterId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <JourneyMap clusters={journey.clusters} onClusterClick={handleClusterClick} />

      {locations.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{labels.places}</h2>
          <div className={styles.tagGrid}>
            {locations.map((location) => (
              <span key={location} className={styles.tag}>
                {location}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.gallery}</h2>

        {journey.clusters.map((cluster) => {
          const clusterPhotos = cluster.photoIds
            .map((photoUrl) => {
              const photoId = imageMap.get(photoUrl);
              return {
                url: photoUrl,
                photoId: photoId || "",
              };
            })
            .filter((photo) => photo.photoId);

          if (clusterPhotos.length === 0) return null;

          return (
            <div
              key={cluster.clusterId}
              id={cluster.clusterId}
              ref={(el) => {
                clusterRefs.current[cluster.clusterId] = el;
              }}
              className={styles.clusterSection}
            >
              {cluster.locationName && (
                <h3 className={styles.clusterTitle}>{cluster.locationName}</h3>
              )}

              <div className={styles.photoGrid}>
                {clusterPhotos.map((photo) => (
                  <Link
                    key={photo.photoId}
                    href={`/${lang}/photos/${photo.photoId}`}
                    className={styles.photoCard}
                  >
                    <div className={styles.photoFrame}>
                      <Image
                        src={photo.url}
                        alt={cluster.locationName || journey.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.photoImage}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
