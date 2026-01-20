"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./JourneyMap.module.scss";
import type { PublishedJourneyCluster } from "@/lib/published-journey";

// Fix default marker icon
const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png";
const iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png";
const shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

type JourneyMapProps = {
  clusters: PublishedJourneyCluster[];
};

export default function JourneyMap({ clusters }: JourneyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || clusters.length === 0) return;

    // Clean up existing map
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // Calculate bounds
    const lats = clusters.map((c) => c.center.lat);
    const lngs = clusters.map((c) => c.center.lng);
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

    // Add markers
    clusters.forEach((cluster) => {
      const marker = L.marker([cluster.center.lat, cluster.center.lng]).addTo(map);

      const popupContent = `
        <div style="padding: 0.5rem;">
          <strong style="display: block; margin-bottom: 0.25rem; font-size: 0.95rem;">
            ${cluster.locationName || "Location"}
          </strong>
          <p style="margin: 0; font-size: 0.85rem; color: #666;">
            ${cluster.photoIds.length} photos
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);
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
  }, [clusters]);

  if (clusters.length === 0) {
    return null;
  }

  return <div ref={mapRef} className={styles.mapContainer} />;
}
