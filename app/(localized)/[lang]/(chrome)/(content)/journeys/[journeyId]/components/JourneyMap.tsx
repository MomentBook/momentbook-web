"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./JourneyMap.module.scss";
import type { Language } from "@/lib/i18n/config";
import type { JourneyMode, PublishedJourneyCluster } from "@/lib/published-journey";
import { sortJourneyClustersByTimeline } from "../utils";

function createSequenceIcon(sequence: number) {
    return L.divIcon({
        className: styles.sequenceMarkerIcon,
        html: `<span class="${styles.sequenceMarkerLabel}">${sequence}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -20],
    });
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

type JourneyMapProps = {
    clusters: PublishedJourneyCluster[];
    mode: JourneyMode;
    locationFallback: string;
    photoLabel: string;
    lang: Language;
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
    const router = useRouter();

    useEffect(() => {
        if (!mapRef.current || clusters.length === 0) {
            return undefined;
        }

        const orderedClusters = sortJourneyClustersByTimeline(clusters);

        if (leafletMapRef.current) {
            leafletMapRef.current.remove();
            leafletMapRef.current = null;
        }

        const map = L.map(mapRef.current, {
            attributionControl: true,
            boxZoom: false,
            doubleClickZoom: false,
            dragging: false,
            keyboard: false,
            scrollWheelZoom: false,
            touchZoom: false,
            zoomControl: false,
        });

        leafletMapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const cssVars = getComputedStyle(document.documentElement);
        const routeColor =
            cssVars.getPropertyValue("--color-accent").trim() || "#51d0eb";
        const hasRouteLine = mode === "ROUTE_STRONG" || mode === "ROUTE_WEAK";

        if (hasRouteLine && orderedClusters.length > 1) {
            const points: [number, number][] = orderedClusters.map((cluster) => [
                cluster.center.lat,
                cluster.center.lng,
            ]);
            L.polyline(points, {
                color: routeColor,
                dashArray: mode === "ROUTE_WEAK" ? "5 8" : undefined,
                lineCap: "round",
                lineJoin: "round",
                opacity: mode === "ROUTE_STRONG" ? 0.82 : 0.48,
                weight: mode === "ROUTE_STRONG" ? 3 : 2,
            }).addTo(map);
        }

        const encodedJourneyId = encodeURIComponent(journeyPublicId);

        orderedClusters.forEach((cluster, index) => {
            const sequence = index + 1;
            const safeLocationName = escapeHtml(cluster.locationName || locationFallback);
            const marker = L.marker([cluster.center.lat, cluster.center.lng], {
                icon: createSequenceIcon(sequence),
            }).addTo(map);

            const tooltipContent = `
                <div class="${styles.tooltipContent}">
                    <p class="${styles.tooltipSequence}">#${sequence}</p>
                    <strong class="${styles.tooltipTitle}">${safeLocationName}</strong>
                    <p class="${styles.tooltipMeta}">${cluster.photoIds.length} ${photoLabel}</p>
                </div>
            `;

            marker.bindTooltip(tooltipContent, {
                className: styles.clusterTooltip,
                direction: "top",
                offset: [0, -16],
                opacity: 1,
            });
            marker.on("click", () => {
                router.push(
                    `/${lang}/journeys/${encodedJourneyId}/moments/${encodeURIComponent(cluster.clusterId)}`,
                );
            });
        });

        const latitudes = orderedClusters.map((cluster) => cluster.center.lat);
        const longitudes = orderedClusters.map((cluster) => cluster.center.lng);
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);
        const hasSingleViewportTarget =
            orderedClusters.length === 1 || (minLat === maxLat && minLng === maxLng);

        if (hasSingleViewportTarget) {
            map.setView([orderedClusters[0]!.center.lat, orderedClusters[0]!.center.lng], 11);
        } else {
            map.fitBounds(
                [
                    [minLat, minLng],
                    [maxLat, maxLng],
                ],
                {
                    maxZoom: 11,
                    padding: [28, 28],
                },
            );
        }

        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, [clusters, journeyPublicId, lang, locationFallback, mode, photoLabel, router]);

    if (clusters.length === 0) {
        return null;
    }

    return <div ref={mapRef} className={styles.mapContainer} />;
}
