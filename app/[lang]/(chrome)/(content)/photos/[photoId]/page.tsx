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
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";

export const revalidate = 3600;

type PhotoPageCopy = {
    eyebrow: string;
    backToJourney: string;
    partOfLabel: string;
    takenAt: string;
    location: string;
    coordinates: string;
    journeyFallback: string;
    publishedBadge: string;
    archiveNoteLabel: string;
    archiveNoteBody: string;
    metadataTitleTemplate: string;
    metadataDescriptionWithLocationTemplate: string;
    metadataDescriptionWithoutLocationTemplate: string;
};

const photoCopy: Record<Language, PhotoPageCopy> = {
    en: {
        eyebrow: "Photo",
        backToJourney: "Back to journey",
        partOfLabel: "part of",
        takenAt: "Captured",
        location: "Place",
        coordinates: "Coordinates",
        journeyFallback: "Journey",
        publishedBadge: "Published",
        archiveNoteLabel: "Archive note",
        archiveNoteBody:
            "Shown as part of a published journey archive on MomentBook.",
        metadataTitleTemplate: "Photo from {journey}",
        metadataDescriptionWithLocationTemplate:
            "A photo from {journey} taken at {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "A published photo from {journey}.",
    },
    ko: {
        eyebrow: "사진",
        backToJourney: "여정으로 돌아가기",
        partOfLabel: "다음 여정의 일부",
        takenAt: "기록 시각",
        location: "장소",
        coordinates: "좌표",
        journeyFallback: "여정",
        publishedBadge: "공개됨",
        archiveNoteLabel: "아카이브 노트",
        archiveNoteBody:
            "MomentBook의 공개 여정 아카이브 일부로 노출되는 사진입니다.",
        metadataTitleTemplate: "{journey}의 사진",
        metadataDescriptionWithLocationTemplate:
            "{location}에서 촬영된 {journey}의 사진입니다.",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}에서 공유된 사진입니다.",
    },
    ja: {
        eyebrow: "写真",
        backToJourney: "旅に戻る",
        partOfLabel: "次の旅の一部",
        takenAt: "記録時刻",
        location: "場所",
        coordinates: "座標",
        journeyFallback: "旅",
        publishedBadge: "公開済み",
        archiveNoteLabel: "アーカイブノート",
        archiveNoteBody:
            "MomentBook の公開旅アーカイブの一部として表示される写真です。",
        metadataTitleTemplate: "{journey}の写真",
        metadataDescriptionWithLocationTemplate:
            "{location}で撮影された{journey}の写真です。",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}で共有された写真です。",
    },
    zh: {
        eyebrow: "照片",
        backToJourney: "返回旅程",
        partOfLabel: "属于以下旅程",
        takenAt: "记录时间",
        location: "地点",
        coordinates: "坐标",
        journeyFallback: "旅程",
        publishedBadge: "已发布",
        archiveNoteLabel: "归档说明",
        archiveNoteBody:
            "这张照片作为 MomentBook 公开旅程档案的一部分展示。",
        metadataTitleTemplate: "{journey} 的照片",
        metadataDescriptionWithLocationTemplate:
            "在 {location} 拍摄的 {journey} 照片。",
        metadataDescriptionWithoutLocationTemplate:
            "来自 {journey} 的公开照片。",
    },
    es: {
        eyebrow: "Foto",
        backToJourney: "Volver al viaje",
        partOfLabel: "parte de",
        takenAt: "Capturada",
        location: "Lugar",
        coordinates: "Coordenadas",
        journeyFallback: "Viaje",
        publishedBadge: "Publicada",
        archiveNoteLabel: "Nota de archivo",
        archiveNoteBody:
            "Se muestra como parte de un archivo de viaje publicado en MomentBook.",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Una foto de {journey} tomada en {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Una foto publicada de {journey}.",
    },
    pt: {
        eyebrow: "Foto",
        backToJourney: "Voltar para a viagem",
        partOfLabel: "parte de",
        takenAt: "Registrada",
        location: "Local",
        coordinates: "Coordenadas",
        journeyFallback: "Viagem",
        publishedBadge: "Publicada",
        archiveNoteLabel: "Nota de arquivo",
        archiveNoteBody:
            "Exibida como parte de um arquivo de viagem publicado no MomentBook.",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Uma foto de {journey} tirada em {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Uma foto publicada de {journey}.",
    },
    fr: {
        eyebrow: "Photo",
        backToJourney: "Retour au voyage",
        partOfLabel: "partie de",
        takenAt: "Prise le",
        location: "Lieu",
        coordinates: "Coordonnées",
        journeyFallback: "Voyage",
        publishedBadge: "Publiée",
        archiveNoteLabel: "Note d'archive",
        archiveNoteBody:
            "Affichée comme partie d'une archive de voyage publiée sur MomentBook.",
        metadataTitleTemplate: "Photo de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Une photo de {journey} prise à {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Une photo publiée de {journey}.",
    },
    th: {
        eyebrow: "รูปภาพ",
        backToJourney: "กลับไปที่ทริป",
        partOfLabel: "เป็นส่วนหนึ่งของ",
        takenAt: "เวลาที่บันทึก",
        location: "สถานที่",
        coordinates: "พิกัด",
        journeyFallback: "ทริป",
        publishedBadge: "เผยแพร่แล้ว",
        archiveNoteLabel: "หมายเหตุคลัง",
        archiveNoteBody:
            "รูปนี้แสดงเป็นส่วนหนึ่งของคลังทริปสาธารณะบน MomentBook",
        metadataTitleTemplate: "รูปจาก {journey}",
        metadataDescriptionWithLocationTemplate:
            "รูปจาก {journey} ที่ถ่ายที่ {location}",
        metadataDescriptionWithoutLocationTemplate:
            "รูปที่เผยแพร่จาก {journey}",
    },
    vi: {
        eyebrow: "Ảnh",
        backToJourney: "Quay lại hành trình",
        partOfLabel: "thuộc về",
        takenAt: "Thời điểm ghi",
        location: "Địa điểm",
        coordinates: "Tọa độ",
        journeyFallback: "Hành trình",
        publishedBadge: "Đã đăng",
        archiveNoteLabel: "Ghi chú lưu trữ",
        archiveNoteBody:
            "Ảnh này được hiển thị như một phần của kho lưu trữ hành trình công khai trên MomentBook.",
        metadataTitleTemplate: "Ảnh từ {journey}",
        metadataDescriptionWithLocationTemplate:
            "Ảnh từ {journey} chụp tại {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Ảnh đã đăng từ {journey}.",
    },
};

const photoNotFoundTitleByLanguage: Record<Language, string> = {
    en: "Photo not found",
    ko: "사진을 찾을 수 없습니다",
    ja: "写真が見つかりません",
    zh: "找不到照片",
    es: "No se encontró la foto",
    pt: "Foto não encontrada",
    fr: "Photo introuvable",
    th: "ไม่พบรูปภาพ",
    vi: "Không tìm thấy ảnh",
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
    const latDirection = lat >= 0 ? "N" : "S";
    const lngDirection = lng >= 0 ? "E" : "W";

    return `${Math.abs(lat).toFixed(5)}° ${latDirection}, ${Math.abs(lng).toFixed(5)}° ${lngDirection}`;
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
            title: photoNotFoundTitleByLanguage[lang],
        };
    }

    const { title, description } = buildSeoText(copy, photo);
    const path = `/photos/${photo.photoId}`;
    const url = buildOpenGraphUrl(lang, path);
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const publishedTime =
        takenAt !== null
            ? new Date(takenAt).toISOString()
            : undefined;

    return {
        title,
        description,
        robots: buildPublicRobots(),
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
    const locationName = readText(photo.locationName);
    const journeyTitle =
        readText(photo.journey.title) ?? copy.journeyFallback;
    const caption = readText(photo.caption);
    const title =
        caption ??
        fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
        siteUrl,
    ).toString();

    const datePublished =
        hasTakenAt
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

            <header className={styles.topBar}>
                <Link
                    href={`/${lang}/journeys/${photo.journey.publicId}`}
                    className={styles.backLink}
                >
                    <span aria-hidden="true">←</span>
                    {copy.backToJourney}
                </Link>
                <p className={styles.brandMark}>MomentBook</p>
            </header>

            <div className={styles.layout}>
                <section className={styles.mediaSection}>
                    <figure className={styles.mediaFrame}>
                        <Image
                            src={photo.url}
                            alt={title || photoId}
                            fill
                            priority
                            className={styles.image}
                            sizes="(max-width: 767px) 100vw, (max-width: 1080px) 92vw, 760px"
                        />
                        <div className={styles.imageBadge}>
                            {copy.publishedBadge}
                        </div>
                    </figure>
                </section>

                <section className={styles.contentSection}>
                    <p className={styles.eyebrow}>{copy.eyebrow}</p>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.partOfLine}>
                        {copy.partOfLabel}{" "}
                        <Link
                            href={`/${lang}/journeys/${photo.journey.publicId}`}
                            className={styles.journeyLink}
                        >
                            {journeyTitle}
                        </Link>
                    </p>

                    {hasTakenAt || locationName || location ? (
                        <dl className={styles.metaGrid}>
                            {hasTakenAt ? (
                                <div className={styles.metaItem}>
                                    <dt className={styles.metaLabel}>
                                        {copy.takenAt}
                                    </dt>
                                    <dd className={styles.metaValue}>
                                        <LocalizedDateTime
                                            lang={lang}
                                            timestamp={photo.takenAt}
                                        />
                                    </dd>
                                </div>
                            ) : null}

                            {locationName ? (
                                <div className={styles.metaItem}>
                                    <dt className={styles.metaLabel}>
                                        {copy.location}
                                    </dt>
                                    <dd className={styles.metaValue}>
                                        {locationName}
                                    </dd>
                                </div>
                            ) : null}

                            {location ? (
                                <div className={`${styles.metaItem} ${styles.metaWide}`}>
                                    <dt className={styles.metaLabel}>
                                        {copy.coordinates}
                                    </dt>
                                    <dd className={`${styles.metaValue} ${styles.metaMono}`}>
                                        {formatCoordinates(location.lat, location.lng)}
                                    </dd>
                                </div>
                            ) : null}
                        </dl>
                    ) : null}

                    <section className={styles.note}>
                        <p className={styles.noteLabel}>{copy.archiveNoteLabel}</p>
                        <p className={styles.noteBody}>{copy.archiveNoteBody}</p>
                    </section>
                </section>
            </div>
        </div>
    );
}
