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
    journeyLabel: string;
    takenAt: string;
    location: string;
    coordinates: string;
    journeyFallback: string;
    publishedBadge: string;
    archiveEyebrow: string;
    archiveTitle: string;
    archiveBody: string;
    archiveCta: string;
    metadataTitleTemplate: string;
    metadataDescriptionWithLocationTemplate: string;
    metadataDescriptionWithoutLocationTemplate: string;
};

const photoCopy: Record<Language, PhotoPageCopy> = {
    en: {
        eyebrow: "Photo",
        backToJourney: "Back to journey",
        journeyLabel: "Journey",
        takenAt: "Captured at",
        location: "Place",
        coordinates: "Coordinates",
        journeyFallback: "Journey",
        publishedBadge: "Published photo",
        archiveEyebrow: "Published journey archive",
        archiveTitle: "Stored as part of a public journey",
        archiveBody:
            "This photo belongs to a published journey archive on MomentBook. Open the journey to view this moment in context.",
        archiveCta: "View journey",
        metadataTitleTemplate: "Photo from {journey}",
        metadataDescriptionWithLocationTemplate:
            "A photo from {journey} taken at {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "A published photo from {journey}.",
    },
    ko: {
        eyebrow: "사진",
        backToJourney: "여정으로 돌아가기",
        journeyLabel: "여정",
        takenAt: "기록 시각",
        location: "장소",
        coordinates: "좌표",
        journeyFallback: "여정",
        publishedBadge: "게시된 사진",
        archiveEyebrow: "공개 여정 아카이브",
        archiveTitle: "공개된 여정의 일부로 보관된 사진",
        archiveBody:
            "이 사진은 MomentBook의 공개 여정 아카이브에 포함되어 있습니다. 사진이 놓인 맥락은 여정 페이지에서 볼 수 있습니다.",
        archiveCta: "여정 보기",
        metadataTitleTemplate: "{journey}의 사진",
        metadataDescriptionWithLocationTemplate:
            "{location}에서 촬영된 {journey}의 사진입니다.",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}에서 공유된 사진입니다.",
    },
    ja: {
        eyebrow: "写真",
        backToJourney: "旅に戻る",
        journeyLabel: "旅",
        takenAt: "記録時刻",
        location: "場所",
        coordinates: "座標",
        journeyFallback: "旅",
        publishedBadge: "公開写真",
        archiveEyebrow: "公開旅アーカイブ",
        archiveTitle: "公開された旅の一部として保管された写真",
        archiveBody:
            "この写真は MomentBook の公開旅アーカイブに含まれています。どの文脈にあるかは旅ページで確認できます。",
        archiveCta: "旅を見る",
        metadataTitleTemplate: "{journey}の写真",
        metadataDescriptionWithLocationTemplate:
            "{location}で撮影された{journey}の写真です。",
        metadataDescriptionWithoutLocationTemplate:
            "{journey}で共有された写真です。",
    },
    zh: {
        eyebrow: "照片",
        backToJourney: "返回旅程",
        journeyLabel: "旅程",
        takenAt: "记录时间",
        location: "地点",
        coordinates: "坐标",
        journeyFallback: "旅程",
        publishedBadge: "已发布照片",
        archiveEyebrow: "公开旅程档案",
        archiveTitle: "作为公开旅程一部分保存的照片",
        archiveBody:
            "这张照片属于 MomentBook 的公开旅程档案。你可以在旅程页面中查看它所处的上下文。",
        archiveCta: "查看旅程",
        metadataTitleTemplate: "{journey} 的照片",
        metadataDescriptionWithLocationTemplate:
            "在 {location} 拍摄的 {journey} 照片。",
        metadataDescriptionWithoutLocationTemplate:
            "来自 {journey} 的公开照片。",
    },
    es: {
        eyebrow: "Foto",
        backToJourney: "Volver al viaje",
        journeyLabel: "Viaje",
        takenAt: "Capturada en",
        location: "Lugar",
        coordinates: "Coordenadas",
        journeyFallback: "Viaje",
        publishedBadge: "Foto publicada",
        archiveEyebrow: "Archivo de viaje publicado",
        archiveTitle: "Guardada como parte de un viaje público",
        archiveBody:
            "Esta foto pertenece a un archivo de viaje publicado en MomentBook. Abre el viaje para ver este momento en contexto.",
        archiveCta: "Ver viaje",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Una foto de {journey} tomada en {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Una foto publicada de {journey}.",
    },
    pt: {
        eyebrow: "Foto",
        backToJourney: "Voltar para a viagem",
        journeyLabel: "Viagem",
        takenAt: "Registrado em",
        location: "Local",
        coordinates: "Coordenadas",
        journeyFallback: "Viagem",
        publishedBadge: "Foto publicada",
        archiveEyebrow: "Arquivo de viagem publicado",
        archiveTitle: "Guardada como parte de uma viagem pública",
        archiveBody:
            "Esta foto pertence a um arquivo de viagem publicado no MomentBook. Abra a viagem para ver este momento em contexto.",
        archiveCta: "Ver viagem",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Uma foto de {journey} tirada em {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Uma foto publicada de {journey}.",
    },
    fr: {
        eyebrow: "Photo",
        backToJourney: "Retour au voyage",
        journeyLabel: "Voyage",
        takenAt: "Prise le",
        location: "Lieu",
        coordinates: "Coordonnées",
        journeyFallback: "Voyage",
        publishedBadge: "Photo publiée",
        archiveEyebrow: "Archive de voyage publiée",
        archiveTitle: "Conservée comme partie d'un voyage public",
        archiveBody:
            "Cette photo appartient à une archive de voyage publiée sur MomentBook. Ouvrez le voyage pour voir ce moment dans son contexte.",
        archiveCta: "Voir le voyage",
        metadataTitleTemplate: "Photo de {journey}",
        metadataDescriptionWithLocationTemplate:
            "Une photo de {journey} prise à {location}.",
        metadataDescriptionWithoutLocationTemplate:
            "Une photo publiée de {journey}.",
    },
    th: {
        eyebrow: "รูปภาพ",
        backToJourney: "กลับไปที่ทริป",
        journeyLabel: "ทริป",
        takenAt: "บันทึกเวลา",
        location: "สถานที่",
        coordinates: "พิกัด",
        journeyFallback: "ทริป",
        publishedBadge: "รูปที่เผยแพร่",
        archiveEyebrow: "คลังทริปสาธารณะ",
        archiveTitle: "เก็บไว้เป็นส่วนหนึ่งของทริปสาธารณะ",
        archiveBody:
            "รูปนี้เป็นส่วนหนึ่งของคลังทริปสาธารณะบน MomentBook เปิดหน้าทริปเพื่อดูรูปนี้ในบริบทของการเดินทาง",
        archiveCta: "ดูทริป",
        metadataTitleTemplate: "รูปจาก {journey}",
        metadataDescriptionWithLocationTemplate:
            "รูปจาก {journey} ที่ถ่ายที่ {location}",
        metadataDescriptionWithoutLocationTemplate:
            "รูปที่เผยแพร่จาก {journey}",
    },
    vi: {
        eyebrow: "Ảnh",
        backToJourney: "Quay lại hành trình",
        journeyLabel: "Hành trình",
        takenAt: "Thời điểm ghi",
        location: "Địa điểm",
        coordinates: "Tọa độ",
        journeyFallback: "Hành trình",
        publishedBadge: "Ảnh đã đăng",
        archiveEyebrow: "Kho lưu trữ hành trình công khai",
        archiveTitle: "Được lưu như một phần của hành trình công khai",
        archiveBody:
            "Ảnh này thuộc kho lưu trữ hành trình công khai trên MomentBook. Mở hành trình để xem khoảnh khắc này trong đúng bối cảnh.",
        archiveCta: "Xem hành trình",
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

    return `${Math.abs(lat).toFixed(5)}° ${latDirection} · ${Math.abs(lng).toFixed(5)}° ${lngDirection}`;
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
    const hasCoordinates = location !== null;
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

            <div className={styles.topBar}>
                <Link
                    href={`/${lang}/journeys/${photo.journey.publicId}`}
                    className={styles.backLink}
                >
                    <span className={styles.backIcon} aria-hidden="true">
                        ←
                    </span>
                    {copy.backToJourney}
                </Link>
                <p className={styles.brandMark}>MomentBook</p>
            </div>

            <div className={styles.layout}>
                <section className={styles.mediaColumn}>
                    <figure className={styles.mediaFrame}>
                        <Image
                            src={photo.url}
                            alt={title || photoId}
                            fill
                            priority
                            className={styles.image}
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 58vw, 880px"
                        />
                        <div className={styles.imageBadge}>
                            {copy.publishedBadge}
                        </div>
                    </figure>
                </section>

                <section className={styles.infoPanel}>
                    <header className={styles.storyHeader}>
                        <p className={styles.eyebrow}>{copy.eyebrow}</p>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.journeyCard}>
                            <p className={styles.journeyCardLabel}>
                                {copy.journeyLabel}
                            </p>
                            <Link
                                href={`/${lang}/journeys/${photo.journey.publicId}`}
                                className={styles.journeyLink}
                            >
                                {journeyTitle}
                            </Link>
                        </div>
                    </header>

                    {hasTakenAt || locationName || hasCoordinates ? (
                        <dl className={styles.detailsGrid}>
                            {hasTakenAt ? (
                                <div className={styles.detailCard}>
                                    <dt className={styles.detailLabel}>
                                        {copy.takenAt}
                                    </dt>
                                    <dd className={styles.detailValue}>
                                        <LocalizedDateTime
                                            lang={lang}
                                            timestamp={photo.takenAt}
                                        />
                                    </dd>
                                </div>
                            ) : null}

                            {locationName ? (
                                <div className={styles.detailCard}>
                                    <dt className={styles.detailLabel}>
                                        {copy.location}
                                    </dt>
                                    <dd className={styles.detailValue}>
                                        {locationName}
                                    </dd>
                                </div>
                            ) : null}

                            {hasCoordinates ? (
                                <div className={`${styles.detailCard} ${styles.detailCardWide}`}>
                                    <dt className={styles.detailLabel}>
                                        {copy.coordinates}
                                    </dt>
                                    <dd className={`${styles.detailValue} ${styles.detailValueMono}`}>
                                        {formatCoordinates(location.lat, location.lng)}
                                    </dd>
                                </div>
                            ) : null}
                        </dl>
                    ) : null}

                    <section className={styles.archiveCard}>
                        <p className={styles.archiveEyebrow}>
                            {copy.archiveEyebrow}
                        </p>
                        <h2 className={styles.archiveTitle}>
                            {copy.archiveTitle}
                        </h2>
                        <p className={styles.archiveBody}>
                            {copy.archiveBody}
                        </p>
                        <Link
                            href={`/${lang}/journeys/${photo.journey.publicId}`}
                            className={styles.archiveLink}
                        >
                            {copy.archiveCta}
                        </Link>
                    </section>
                </section>
            </div>
        </div>
    );
}
