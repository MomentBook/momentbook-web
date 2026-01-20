"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./JourneyMap.module.scss";
import type { PublishedJourneyCluster } from "@/lib/published-journey";

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type JourneyMapProps = {
  clusters: PublishedJourneyCluster[];
  onClusterClick?: (clusterId: string) => void;
};

function calculateBounds(
  clusters: PublishedJourneyCluster[]
): [[number, number], [number, number]] {
  if (clusters.length === 0) {
    return [
      [0, 0],
      [0, 0],
    ];
  }

  let minLat = clusters[0].center.lat;
  let maxLat = clusters[0].center.lat;
  let minLng = clusters[0].center.lng;
  let maxLng = clusters[0].center.lng;

  clusters.forEach((cluster) => {
    minLat = Math.min(minLat, cluster.center.lat);
    maxLat = Math.max(maxLat, cluster.center.lat);
    minLng = Math.min(minLng, cluster.center.lng);
    maxLng = Math.max(maxLng, cluster.center.lng);
  });

  // Add padding
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding],
  ];
}

export default function JourneyMap({
  clusters,
  onClusterClick,
}: JourneyMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const bounds = calculateBounds(clusters);

  useEffect(() => {
    // Fix for SSR
    if (typeof window === "undefined") return;

    if (mapRef.current && bounds) {
      mapRef.current.fitBounds(bounds);
    }
  }, [bounds]);

  if (clusters.length === 0) {
    return null;
  }

  const center: [number, number] = [
    (bounds[0][0] + bounds[1][0]) / 2,
    (bounds[0][1] + bounds[1][1]) / 2,
  ];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={13}
        bounds={bounds}
        scrollWheelZoom={false}
        className={styles.map}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clusters.map((cluster) => (
          <Marker
            key={cluster.clusterId}
            position={[cluster.center.lat, cluster.center.lng]}
            eventHandlers={{
              click: () => {
                if (onClusterClick) {
                  onClusterClick(cluster.clusterId);
                }
              },
            }}
          >
            <Popup>
              <div className={styles.popup}>
                <strong>{cluster.locationName || "Location"}</strong>
                <p>{cluster.photoIds.length} photos</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
