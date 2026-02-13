import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./photo.module.scss";
import { LocalizedDateTime } from "./LocalizedDateTime";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
    fetchPublishedPhoto,
    type PublishedPhotoApi,
} from "@/lib/published-journey";
import {
    buildOpenGraphArticleTags,
    buildPublicKeywords,
    buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";

export const revalidate = 3600;

type PhotoPageCopy = {
    eyebrow: string;
    backToJourney: string;
    detailsTitle: string;
    journeyLabel: string;
    takenAt: string;
    location: string;
    coordinates: string;
    journeyFallback: string;
    metadataTitleTemplate: string;
    metadataDescriptionWithLocationTemplate: string;
    metadataDescriptionWithoutLocationTemplate: string;
};

const photoCopy: Partial<Record<Language, PhotoPageCopy>> & {
    en: PhotoPageCopy;
} = {
    en: {
        eyebrow: "Photo",
        backToJourney: "Back to journey",
        detailsTitle: "Photo details",
        journeyLabel: "Journey",
        takenAt: "Captured at",
        location: "Place",
        coordinates: "Coordinates",
        journeyFallback: "Journey",
        metadataTitleTemplate: "Photo from {journey}",
        metadataDescriptionWithLocationTemplate:
            "A photo from {journey} taken at {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "A published photo from {journey}.",
    },
    ko: {
        eyebrow: "사진",
        backToJourney: "여정으로 돌아가기",
        detailsTitle: "사진 정보",
        journeyLabel: "여정",
        takenAt: "기록 시각",
        location: "장소",
        coordinates: "좌표",
        journeyFallback: "여정",
        metadataTitleTemplate: "{journey}의 사진",
        metadataDescriptionWithLocationTemplate:
            "{location}에서 촬영된 {journey}의 사진입니다.",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}에서 공유된 사진입니다.",
    },
    ja: {
        eyebrow: "写真",
        backToJourney: "旅に戻る",
        detailsTitle: "写真情報",
        journeyLabel: "旅",
        takenAt: "記録時刻",
        location: "場所",
        coordinates: "座標",
        journeyFallback: "旅",
        metadataTitleTemplate: "{journey}の写真",
        metadataDescriptionWithLocationTemplate:
            "{location}で撮影された{journey}の写真です。",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}で共有された写真です。",
    },
    zh: {
        eyebrow: "照片",
        backToJourney: "返回行程",
        detailsTitle: "照片信息",
        journeyLabel: "行程",
        takenAt: "记录时间",
        location: "地点",
        coordinates: "坐标",
        journeyFallback: "行程",
        metadataTitleTemplate: "{journey} 的照片",
        metadataDescriptionWithLocationTemplate:
            "在 {location} 拍摄的 {journey} 照片。",
        metadataDescriptionWithoutLocationTemplate:
            "来自 {journey} 的公开照片。",
    },
    es: {
        eyebrow: "Foto",
        backToJourney: "Volver al viaje",
        detailsTitle: "Detalles de la foto",
        journeyLabel: "Viaje",
        takenAt: "Capturado en",
        location: "Lugar",
        coordinates: "Coordenadas",
        journeyFallback: "Viaje",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Una foto de {journey} tomada en {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Una foto publicada de {journey}.",
    },
    pt: {
        eyebrow: "Foto",
        backToJourney: "Voltar para jornada",
        detailsTitle: "Detalhes da foto",
        journeyLabel: "Jornada",
        takenAt: "Registrado em",
        location: "Local",
        coordinates: "Coordenadas",
        journeyFallback: "Jornada",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Uma foto de {journey} tirada em {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Uma foto publicada de {journey}.",
    },
    fr: {
        eyebrow: "Photo",
        backToJourney: "Retour au voyage",
        detailsTitle: "Details de la photo",
        journeyLabel: "Voyage",
        takenAt: "Capture le",
        location: "Lieu",
        coordinates: "Coordonnees",
        journeyFallback: "Voyage",
        metadataTitleTemplate: "Photo de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Une photo de {journey} prise a {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Une photo publiee de {journey}.",
    },
    th: {
        eyebrow: "รูปภาพ",
        backToJourney: "กลับไปที่ทริป",
        detailsTitle: "รายละเอียดรูปภาพ",
        journeyLabel: "ทริป",
        takenAt: "บันทึกเวลา",
        location: "สถานที่",
        coordinates: "พิกัด",
        journeyFallback: "ทริป",
        metadataTitleTemplate: "รูปจาก {journey}",
        metadataDescriptionWithLocationTemplate:
            "รูปจาก {journey} ที่ถ่ายที่ {location}",
        metadataDescriptionWithoutLocationTemplate:
            "รูปที่เผยแพร่จาก {journey}",
    },
    vi: {
        eyebrow: "Anh",
        backToJourney: "Quay lai hanh trinh",
        detailsTitle: "Thong tin anh",
        journeyLabel: "Hanh trinh",
        takenAt: "Ghi luc",
        location: "Dia diem",
        coordinates: "Toa do",
        journeyFallback: "Hanh trinh",
        metadataTitleTemplate: "Anh tu {journey}",
        metadataDescriptionWithLocationTemplate:
            "Anh tu {journey} chup tai {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Anh da dang tu {journey}.",
    },
};

function fillTemplate(
    template: string,
    values: Record<string, string>,
): string {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function readText(value: string | undefined): string | null {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function hasValidTimestamp(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

function hasValidCoordinates(
    location: PublishedPhotoApi["location"],
): location is { lat: number; lng: number } {
    return Boolean(
        location &&
            Number.isFinite(location.lat) &&
            Number.isFinite(location.lng),
    );
}

function formatCoordinates(lat: number, lng: number): string {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function buildSeoText(
    copy: PhotoPageCopy,
    photo: PublishedPhotoApi,
): { title: string; description: string } {
    const journeyTitle =
        readText(photo.journey.title) ?? copy.journeyFallback;
    const caption = readText(photo.caption);
    const locationName = readText(photo.locationName);

    const title =
        caption ??
        fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle });

    const description =
        caption ??
        (locationName
            ? fillTemplate(copy.metadataDescriptionWithLocationTemplate, {
                  journey: journeyTitle,
                  location: locationName,
              })
            : fillTemplate(copy.metadataDescriptionWithoutLocationTemplate, {
                  journey: journeyTitle,
              }));

    return { title, description };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; photoId: string }>;
}): Promise<Metadata> {
    const { lang, photoId } = (await params) as {
        lang: Language;
        photoId: string;
    };
    const photo = await fetchPublishedPhoto(photoId);
    const copy = photoCopy[lang] ?? photoCopy.en;

    if (!photo) {
        return {
            title: "Photo not found",
        };
    }

    const { title, description } = buildSeoText(copy, photo);
    const path = `/photos/${photo.photoId}`;
    const url = buildOpenGraphUrl(lang, path);
    const locationName = readText(photo.locationName);
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const publishedTime = takenAt !== null
            ? new Date(takenAt).toISOString()
            : undefined;
    const keywords = buildPublicKeywords({
        kind: "photo",
        title,
        locationNames: locationName ? [locationName] : [],
        extra: ["published image", "travel photography"],
    });
    const tags = buildOpenGraphArticleTags(keywords);

    return {
        title,
        description,
        keywords,
        category: "Photography",
        robots: buildPublicRobots(),
        publisher: "MomentBook",
        alternates: buildAlternates(lang, path),
        openGraph: {
            title,
            description,
            type: "article",
            url,
            images: [
                {
                    url: photo.url,
                    alt: title,
                },
            ],
            tags,
            section: "Photography",
            publishedTime,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [photo.url],
        },
    };
}

export default async function PhotoPage({
    params,
}: {
    params: Promise<{ lang: string; photoId: string }>;
}) {
    const { lang, photoId } = (await params) as {
        lang: Language;
        photoId: string;
    };
    const photo = await fetchPublishedPhoto(photoId);

    if (!photo) {
        notFound();
    }

    const copy = photoCopy[lang] ?? photoCopy.en;
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const hasTakenAt = takenAt !== null;
    const location = hasValidCoordinates(photo.location) ? photo.location : null;
    const hasCoordinates = location !== null;
    const journeyTitle =
        readText(photo.journey.title) ?? copy.journeyFallback;
    const caption = readText(photo.caption);
    const locationName = readText(photo.locationName);
    const title =
        caption ??
        fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
        siteUrl,
    ).toString();

    const datePublished = hasTakenAt
            ? new Date(takenAt).toISOString()
            : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: title,
        description: caption ?? undefined,
        contentUrl: photo.url,
        url: pageUrl,
        caption: caption ?? undefined,
        ...(datePublished && { datePublished }),
        author: {
            "@type": "Person",
            name: "MomentBook User",
        },
        isPartOf: {
            "@type": "Article",
            name: journeyTitle,
            url: new URL(
                buildOpenGraphUrl(lang, `/journeys/${photo.journey.publicId}`),
                siteUrl,
            ).toString(),
        },
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
            />
            <header className={styles.hero}>
                <Link
                    href={`/${lang}/journeys/${photo.journey.publicId}`}
                    className={styles.backLink}
                >
                    ← {copy.backToJourney}
                </Link>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>
                    {copy.journeyLabel}:{" "}
                    <Link
                        href={`/${lang}/journeys/${photo.journey.publicId}`}
                        className={styles.journeyLink}
                    >
                        {journeyTitle}
                    </Link>
                </p>
            </header>

            <section className={styles.section}>
                <figure className={styles.figure}>
                    <div className={styles.imageFrame}>
                        <Image
                            src={photo.url}
                            alt={title || photoId}
                            fill
                            priority
                            className={styles.image}
                            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1100px"
                        />
                    </div>
                    {caption && (
                        <figcaption className={styles.caption}>
                            {caption}
                        </figcaption>
                    )}
                </figure>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{copy.detailsTitle}</h2>
                <dl className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <dt className={styles.detailLabel}>{copy.journeyLabel}</dt>
                        <dd className={styles.detailValue}>
                            <Link
                                href={`/${lang}/journeys/${photo.journey.publicId}`}
                                className={styles.detailLink}
                            >
                                {journeyTitle}
                            </Link>
                        </dd>
                    </div>

                    {hasTakenAt && (
                        <div className={styles.detailItem}>
                            <dt className={styles.detailLabel}>{copy.takenAt}</dt>
                            <dd className={styles.detailValue}>
                                <LocalizedDateTime
                                    lang={lang}
                                    timestamp={photo.takenAt}
                                />
                            </dd>
                        </div>
                    )}

                    {locationName && (
                        <div className={styles.detailItem}>
                            <dt className={styles.detailLabel}>{copy.location}</dt>
                            <dd className={styles.detailValue}>
                                {locationName}
                            </dd>
                        </div>
                    )}

                    {hasCoordinates && (
                        <div className={styles.detailItem}>
                            <dt className={styles.detailLabel}>{copy.coordinates}</dt>
                            <dd className={styles.detailValue}>
                                {formatCoordinates(location.lat, location.lng)}
                            </dd>
                        </div>
                    )}
                </dl>
            </section>
        </div>
    );
}
