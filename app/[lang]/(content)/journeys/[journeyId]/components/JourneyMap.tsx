"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./JourneyMap.module.scss";
import type { JourneyMode, PublishedJourneyCluster } from "@/lib/published-journey";
import { sortJourneyClustersByTimeline } from "../utils";

function createSequenceIcon(sequence: number) {
  return L.divIcon({
    className: styles.sequenceMarkerIcon,
    html: `<span class="${styles.sequenceMarkerLabel}">${sequence}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -16],
  });
}

type JourneyMapProps = {
  clusters: PublishedJourneyCluster[];
  mode: JourneyMode;
  locationFallback: string;
  photoLabel: string;
  lang: string;
  journeyPublicId: string;
};

export default function JourneyMap({
  clusters,
  mode,
  locationFallback,
  photoLabel,
  lang,
  journeyPublicId,
}: JourneyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || clusters.length === 0) return;

    const orderedClusters = sortJourneyClustersByTimeline(clusters);

    // Clean up existing map
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // Calculate bounds
    const lats = orderedClusters.map((c) => c.center.lat);
    const lngs = orderedClusters.map((c) => c.center.lng);
    const bounds: L.LatLngBoundsExpression = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];

    // Create map
    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    });

    leafletMapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const cssVars = getComputedStyle(document.documentElement);
    const routeColor = cssVars.getPropertyValue("--color-accent").trim() || "#2f6bff";
    const hasRouteLine = mode === "ROUTE_STRONG" || mode === "ROUTE_WEAK";

    if (hasRouteLine && orderedClusters.length > 1) {
      const points: [number, number][] = orderedClusters.map((cluster) => [
        cluster.center.lat,
        cluster.center.lng,
      ]);
      const polyline = L.polyline(points, {
        color: routeColor,
        weight: mode === "ROUTE_STRONG" ? 3 : 2,
        opacity: mode === "ROUTE_STRONG" ? 0.85 : 0.5,
        dashArray: mode === "ROUTE_WEAK" ? "6 8" : undefined,
      });
      polyline.addTo(map);
    }

    const encodedJourneyId = encodeURIComponent(journeyPublicId);

    // Add markers
    orderedClusters.forEach((cluster, index) => {
      const sequence = index + 1;
      const marker = L.marker([cluster.center.lat, cluster.center.lng], {
        icon: createSequenceIcon(sequence),
      }).addTo(map);

      const tooltipContent = `
        <div style="padding: 0.5rem;">
          <p style="margin: 0 0 0.2rem; font-size: 0.75rem; color: #64748b;">
            #${sequence}
          </p>
          <strong style="display: block; margin-bottom: 0.25rem; font-size: 0.95rem;">
            ${cluster.locationName || locationFallback}
          </strong>
          <p style="margin: 0; font-size: 0.85rem; color: #666;">
            ${cluster.photoIds.length} ${photoLabel}
          </p>
        </div>
      `;

      marker.bindTooltip(tooltipContent, { direction: "top", opacity: 0.9 });
      marker.on("click", () => {
        const encodedClusterId = encodeURIComponent(cluster.clusterId);
        window.location.href = `/${lang}/journeys/${encodedJourneyId}/moments/${encodedClusterId}`;
      });
    });

    // Fit bounds with padding
    map.fitBounds(bounds, { padding: [50, 50] });

    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [clusters, mode, locationFallback, photoLabel, lang, journeyPublicId]);

  if (clusters.length === 0) {
    return null;
  }

  return <div ref={mapRef} className={styles.mapContainer} />;
}
