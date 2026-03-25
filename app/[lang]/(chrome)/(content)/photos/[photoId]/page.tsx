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
    buildOpenGraphBase,
    buildPublicRobots,
    compactSocialImages,
    resolveTwitterCard,
    buildSeoDescription,
} from "@/lib/seo/public-metadata";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";

export const revalidate = 3600;

type PhotoPageCopy = {
    eyebrow: string;
    backToJourney: string;
    partOfLabel: string;
    takenAt: string;
    location: string;
    coordinates: string;
    archiveNoteLabel: string;
    archiveNoteBody: string;
    metadataTitleTemplate: string;
    metadataDescriptionLocationOnlyTemplate: string;
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
        archiveNoteLabel: "Archive note",
        archiveNoteBody:
            "Shown as part of a published journey archive on MomentBook.",
        metadataTitleTemplate: "Photo from {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "Published travel photo captured at {location}, shown in the MomentBook web archive.",
        metadataDescriptionWithLocationTemplate:
            "Published travel photo from {journey}, captured at {location} and shown in the MomentBook web archive.",
        metadataDescriptionWithoutLocationTemplate:
            "Published travel photo from {journey}, shown in the MomentBook web archive.",
    },
    ko: {
        eyebrow: "사진",
        backToJourney: "여정으로 돌아가기",
        partOfLabel: "다음 여정의 일부",
        takenAt: "기록 시각",
        location: "장소",
        coordinates: "좌표",
        archiveNoteLabel: "아카이브 노트",
        archiveNoteBody:
            "MomentBook의 공개 여정 아카이브 일부로 노출되는 사진입니다.",
        metadataTitleTemplate: "{journey}의 사진",
        metadataDescriptionLocationOnlyTemplate:
            "{location}에서 촬영되어 MomentBook 공개 웹 아카이브에 노출되는 여행 사진입니다.",
        metadataDescriptionWithLocationTemplate:
            "{location}에서 촬영되었고 MomentBook 공개 웹 아카이브에 노출되는 {journey}의 여행 사진입니다.",
        metadataDescriptionWithoutLocationTemplate:
            "MomentBook 공개 웹 아카이브에 노출되는 {journey}의 여행 사진입니다.",
    },
    ja: {
        eyebrow: "写真",
        backToJourney: "旅に戻る",
        partOfLabel: "次の旅の一部",
        takenAt: "記録時刻",
        location: "場所",
        coordinates: "座標",
        archiveNoteLabel: "アーカイブノート",
        archiveNoteBody:
            "MomentBook の公開旅アーカイブの一部として表示される写真です。",
        metadataTitleTemplate: "{journey}の写真",
        metadataDescriptionLocationOnlyTemplate:
            "{location}で撮影され、MomentBook の公開 Web アーカイブに表示される旅行写真です。",
        metadataDescriptionWithLocationTemplate:
            "{location}で撮影され、MomentBook の公開 Web アーカイブに表示される{journey}の旅行写真です。",
        metadataDescriptionWithoutLocationTemplate:
            "MomentBook の公開 Web アーカイブに表示される{journey}の旅行写真です。",
    },
    zh: {
        eyebrow: "照片",
        backToJourney: "返回旅程",
        partOfLabel: "属于以下旅程",
        takenAt: "记录时间",
        location: "地点",
        coordinates: "坐标",
        archiveNoteLabel: "归档说明",
        archiveNoteBody:
            "这张照片作为 MomentBook 公开旅程档案的一部分展示。",
        metadataTitleTemplate: "{journey} 的照片",
        metadataDescriptionLocationOnlyTemplate:
            "这是一张拍摄于 {location}、展示在 MomentBook 网页公开档案中的旅行照片。",
        metadataDescriptionWithLocationTemplate:
            "这是一张来自 {journey}、拍摄于 {location}，并展示在 MomentBook 网页公开档案中的旅行照片。",
        metadataDescriptionWithoutLocationTemplate:
            "这是一张来自 {journey}、展示在 MomentBook 网页公开档案中的旅行照片。",
    },
    es: {
        eyebrow: "Foto",
        backToJourney: "Volver al viaje",
        partOfLabel: "parte de",
        takenAt: "Capturada",
        location: "Lugar",
        coordinates: "Coordenadas",
        archiveNoteLabel: "Nota de archivo",
        archiveNoteBody:
            "Se muestra como parte de un archivo de viaje publicado en MomentBook.",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "Foto de viaje publicada, tomada en {location} y mostrada en el archivo web de MomentBook.",
        metadataDescriptionWithLocationTemplate:
            "Foto de viaje publicada de {journey}, tomada en {location} y mostrada en el archivo web de MomentBook.",
        metadataDescriptionWithoutLocationTemplate:
            "Foto de viaje publicada de {journey}, mostrada en el archivo web de MomentBook.",
    },
    pt: {
        eyebrow: "Foto",
        backToJourney: "Voltar para a viagem",
        partOfLabel: "parte de",
        takenAt: "Registrada",
        location: "Local",
        coordinates: "Coordenadas",
        archiveNoteLabel: "Nota de arquivo",
        archiveNoteBody:
            "Exibida como parte de um arquivo de viagem publicado no MomentBook.",
        metadataTitleTemplate: "Foto de {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "Foto de viagem publicada, tirada em {location} e exibida no arquivo web do MomentBook.",
        metadataDescriptionWithLocationTemplate:
            "Foto de viagem publicada de {journey}, tirada em {location} e exibida no arquivo web do MomentBook.",
        metadataDescriptionWithoutLocationTemplate:
            "Foto de viagem publicada de {journey}, exibida no arquivo web do MomentBook.",
    },
    fr: {
        eyebrow: "Photo",
        backToJourney: "Retour au voyage",
        partOfLabel: "partie de",
        takenAt: "Prise le",
        location: "Lieu",
        coordinates: "Coordonnées",
        archiveNoteLabel: "Note d'archive",
        archiveNoteBody:
            "Affichée comme partie d'une archive de voyage publiée sur MomentBook.",
        metadataTitleTemplate: "Photo de {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "Photo de voyage publiée, prise à {location} et affichée dans l'archive web de MomentBook.",
        metadataDescriptionWithLocationTemplate:
            "Photo de voyage publiée de {journey}, prise à {location} et affichée dans l'archive web de MomentBook.",
        metadataDescriptionWithoutLocationTemplate:
            "Photo de voyage publiée de {journey}, affichée dans l'archive web de MomentBook.",
    },
    th: {
        eyebrow: "รูปภาพ",
        backToJourney: "กลับไปที่ทริป",
        partOfLabel: "เป็นส่วนหนึ่งของ",
        takenAt: "เวลาที่บันทึก",
        location: "สถานที่",
        coordinates: "พิกัด",
        archiveNoteLabel: "หมายเหตุคลัง",
        archiveNoteBody:
            "รูปนี้แสดงเป็นส่วนหนึ่งของคลังทริปสาธารณะบน MomentBook",
        metadataTitleTemplate: "รูปจาก {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "รูปท่องเที่ยวที่ถ่ายที่ {location} และแสดงในคลังเว็บสาธารณะของ MomentBook",
        metadataDescriptionWithLocationTemplate:
            "รูปท่องเที่ยวจาก {journey} ที่ถ่ายที่ {location} และแสดงในคลังเว็บสาธารณะของ MomentBook",
        metadataDescriptionWithoutLocationTemplate:
            "รูปท่องเที่ยวจาก {journey} ที่แสดงในคลังเว็บสาธารณะของ MomentBook",
    },
    vi: {
        eyebrow: "Ảnh",
        backToJourney: "Quay lại hành trình",
        partOfLabel: "thuộc về",
        takenAt: "Thời điểm ghi",
        location: "Địa điểm",
        coordinates: "Tọa độ",
        archiveNoteLabel: "Ghi chú lưu trữ",
        archiveNoteBody:
            "Ảnh này được hiển thị như một phần của kho lưu trữ hành trình công khai trên MomentBook.",
        metadataTitleTemplate: "Ảnh từ {journey}",
        metadataDescriptionLocationOnlyTemplate:
            "Ảnh du lịch đã đăng, chụp tại {location} và hiển thị trong kho lưu trữ web của MomentBook.",
        metadataDescriptionWithLocationTemplate:
            "Ảnh du lịch đã đăng từ {journey}, chụp tại {location} và hiển thị trong kho lưu trữ web của MomentBook.",
        metadataDescriptionWithoutLocationTemplate:
            "Ảnh du lịch đã đăng từ {journey}, hiển thị trong kho lưu trữ web của MomentBook.",
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
    const journeyTitle = readText(photo.journey.title);
    const caption = readText(photo.caption);
    const locationName = readText(photo.locationName);

    const title =
        caption ??
        (journeyTitle
            ? fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle })
            : copy.eyebrow);

    const description = buildSeoDescription([
        caption,
        journeyTitle
            ? locationName
                ? fillTemplate(copy.metadataDescriptionWithLocationTemplate, {
                      journey: journeyTitle,
                      location: locationName,
                  })
                : fillTemplate(copy.metadataDescriptionWithoutLocationTemplate, {
                      journey: journeyTitle,
                  })
            : locationName
                ? fillTemplate(copy.metadataDescriptionLocationOnlyTemplate, {
                      location: locationName,
                  })
                : copy.archiveNoteBody,
    ]);

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
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const publishedTime =
        takenAt !== null
            ? new Date(takenAt).toISOString()
            : undefined;
    const socialImages = compactSocialImages([
        {
            url: photo.url,
            alt: title,
        },
    ]);

    return {
        title,
        description,
        applicationName: "MomentBook",
        creator: "MomentBook",
        publisher: "MomentBook",
        robots: buildPublicRobots(),
        alternates: buildAlternates(lang, path),
        openGraph: {
            ...buildOpenGraphBase(lang, path),
            title,
            description,
            type: "article",
            images: socialImages,
            publishedTime,
        },
        twitter: {
            card: resolveTwitterCard(socialImages),
            title,
            description,
            images: socialImages?.map((image) => image.url),
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
    const journeyTitle = readText(photo.journey.title);
    const caption = readText(photo.caption);
    const title =
        caption ??
        (journeyTitle
            ? fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle })
            : copy.eyebrow);
    const seoText = buildSeoText(copy, photo);

    const siteUrl = resolveStructuredDataSiteUrl();
    const pageUrl = buildStructuredDataUrl(
        buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
        siteUrl,
    );

    const datePublished =
        hasTakenAt
            ? new Date(takenAt).toISOString()
            : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: title,
        description: seoText.description,
        contentUrl: photo.url,
        url: pageUrl,
        caption: caption ?? undefined,
        ...(datePublished && { datePublished }),
        publisher: buildPublisherOrganizationJsonLd(siteUrl),
        isPartOf: {
            "@type": "Article",
            url: buildStructuredDataUrl(
                buildOpenGraphUrl(lang, `/journeys/${photo.journey.publicId}`),
                siteUrl,
            ),
            ...(journeyTitle ? { name: journeyTitle } : {}),
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
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
            </header>

            <section className={styles.hero}>
                <figure className={styles.mediaFrame}>
                    <Image
                        src={photo.url}
                        alt={title || photoId}
                        fill
                        priority
                        className={styles.image}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1120px"
                    />
                </figure>
            </section>

            <section className={styles.contentSection}>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1 className={styles.title}>{title}</h1>
                {journeyTitle ? (
                    <p className={styles.partOfLine}>
                        {copy.partOfLabel}{" "}
                        <Link
                            href={`/${lang}/journeys/${photo.journey.publicId}`}
                            className={styles.journeyLink}
                        >
                            {journeyTitle}
                        </Link>
                    </p>
                ) : null}

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

                <p className={styles.note}>
                    <span className={styles.noteLabel}>{copy.archiveNoteLabel}</span>
                    <span className={styles.noteBody}>{copy.archiveNoteBody}</span>
                </p>
            </section>
        </div>
    );
}
