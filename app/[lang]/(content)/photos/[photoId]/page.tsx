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
} from "@/lib/published-journey";

export const revalidate = 3600;

const photoLabels: Partial<Record<
    Language,
    {
        backToJourney: string;
        takenAt: string;
        location: string;
        contextNote: string;
    }
>> & {
    en: {
        backToJourney: string;
        takenAt: string;
        location: string;
        contextNote: string;
    };
} = {
    en: {
        backToJourney: "Back to journey",
        takenAt: "Captured at",
        location: "Place",
        contextNote:
            "This page shows a single photo from a published journey. Some journeys are shared as photos only; anything else stays private unless shared.",
    },
    ko: {
        backToJourney: "여정으로 돌아가기",
        takenAt: "기록 시각",
        location: "장소",
        contextNote:
            "이 페이지는 게시된 여정의 사진 한 장만 보여줍니다. 사진만 공유된 여정도 있으며, 나머지는 공유하기 전까지 공개되지 않습니다.",
    },
    ja: {
        backToJourney: "旅に戻る",
        takenAt: "記録時刻",
        location: "場所",
        contextNote:
            "このページは公開された旅の写真1枚だけを表示します。写真のみで共有される旅もあり、その他は共有するまで公開されません。",
    },
    zh: {
        backToJourney: "返回行程",
        takenAt: "记录时间",
        location: "地点",
        contextNote:
            "此页面仅展示已发布行程中的一张照片。部分行程仅分享照片，其他内容在分享前不会公开。",
    },
    es: {
        backToJourney: "Volver al viaje",
        takenAt: "Capturado en",
        location: "Lugar",
        contextNote:
            "Esta pagina muestra una sola foto de un viaje publicado. Algunos viajes se comparten solo con fotos; lo demas sigue privado salvo que se comparta.",
    },
    pt: {
        backToJourney: "Voltar para jornada",
        takenAt: "Registrado em",
        location: "Local",
        contextNote:
            "Esta pagina mostra apenas uma foto de uma jornada publicada. Algumas jornadas sao compartilhadas apenas com fotos; o restante permanece privado ate ser compartilhado.",
    },
    fr: {
        backToJourney: "Retour au voyage",
        takenAt: "Capture le",
        location: "Lieu",
        contextNote:
            "Cette page affiche une seule photo d'un voyage publie. Certains voyages sont partages uniquement avec des photos; le reste reste prive sauf partage.",
    },
    th: {
        backToJourney: "กลับไปที่ทริป",
        takenAt: "บันทึกเวลา",
        location: "สถานที่",
        contextNote:
            "หน้านี้แสดงเฉพาะรูปเดียวจากทริปที่เผยแพร่ บางทริปแชร์เฉพาะรูป ส่วนที่เหลือยังเป็นส่วนตัวจนกว่าจะมีการแชร์",
    },
    vi: {
        backToJourney: "Quay lai hanh trinh",
        takenAt: "Ghi luc",
        location: "Dia diem",
        contextNote:
            "Trang nay chi hien thi mot anh tu hanh trinh da dang. Mot so hanh trinh chi chia se bang anh; phan con lai van rieng tu neu chua chia se.",
    },
};

function buildPhotoTitle(lang: Language, journeyTitle: string) {
    if (lang === "ko") {
        return `${journeyTitle}의 사진`;
    }

    if (lang === "ja") {
        return `${journeyTitle}の写真`;
    }

    if (lang === "zh") {
        return `${journeyTitle} 的照片`;
    }

    if (lang === "es") {
        return `Foto de ${journeyTitle}`;
    }

    if (lang === "pt") {
        return `Foto de ${journeyTitle}`;
    }

    if (lang === "fr") {
        return `Photo de ${journeyTitle}`;
    }

    if (lang === "th") {
        return `รูปจาก ${journeyTitle}`;
    }

    if (lang === "vi") {
        return `Anh tu ${journeyTitle}`;
    }

    return `Photo from ${journeyTitle}`;
}

function buildPhotoDescription(
    lang: Language,
    journeyTitle: string,
    locationName?: string,
) {
    if (lang === "ko") {
        return locationName
            ? `${locationName}에서 촬영된 ${journeyTitle}의 사진입니다.`
            : `${journeyTitle}에서 공유된 사진입니다.`;
    }

    if (lang === "ja") {
        return locationName
            ? `${locationName}で撮影された${journeyTitle}の写真です。`
            : `${journeyTitle}で共有された写真です。`;
    }

    if (lang === "zh") {
        return locationName
            ? `在 ${locationName} 拍摄的 ${journeyTitle} 照片。`
            : `${journeyTitle} 中分享的照片。`;
    }

    if (lang === "es") {
        return locationName
            ? `Una foto de ${journeyTitle} tomada en ${locationName}.`
            : `Una foto compartida de ${journeyTitle}.`;
    }

    if (lang === "pt") {
        return locationName
            ? `Uma foto de ${journeyTitle} tirada em ${locationName}.`
            : `Uma foto compartilhada de ${journeyTitle}.`;
    }

    if (lang === "fr") {
        return locationName
            ? `Une photo de ${journeyTitle} prise a ${locationName}.`
            : `Une photo partagee de ${journeyTitle}.`;
    }

    if (lang === "th") {
        return locationName
            ? `รูปจาก ${journeyTitle} ที่ถ่ายที่ ${locationName}`
            : `รูปที่แชร์จาก ${journeyTitle}`;
    }

    if (lang === "vi") {
        return locationName
            ? `Anh tu ${journeyTitle} chup tai ${locationName}.`
            : `Anh duoc chia se tu ${journeyTitle}.`;
    }

    return locationName
        ? `A photo from ${journeyTitle} taken at ${locationName}`
        : `A photo from ${journeyTitle}`;
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

    if (!photo) {
        return {
            title: "Photo not found",
        };
    }

    const path = `/photos/${photo.photoId}`;
    const url = buildOpenGraphUrl(lang, path);
    const title = photo.caption || buildPhotoTitle(lang, photo.journey.title);
    const description =
        photo.caption ||
        buildPhotoDescription(lang, photo.journey.title, photo.locationName);

    const publishedTime =
        photo.takenAt && !isNaN(photo.takenAt)
            ? new Date(photo.takenAt).toISOString()
            : undefined;

    return {
        title,
        description,
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

    const labels = photoLabels[lang] ?? photoLabels.en;
    const hasTakenAt =
        typeof photo.takenAt === "number" && !isNaN(photo.takenAt);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
        siteUrl,
    ).toString();

    const datePublished =
        photo.takenAt && !isNaN(photo.takenAt)
            ? new Date(photo.takenAt).toISOString()
            : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: photo.url,
        url: pageUrl,
        caption: photo.caption,
        ...(datePublished && { datePublished }),
        author: {
            "@type": "Person",
            name: "MomentBook User",
        },
        isPartOf: {
            "@type": "Article",
            name: photo.journey.title,
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link
                        href={`/${lang}/journeys/${photo.journey.publicId}`}
                        className={styles.backLink}
                    >
                        ← {labels.backToJourney}
                    </Link>
                </nav>

                <div className={styles.photoContainer}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={photo.url}
                            alt={
                                photo.caption || photo.journey.title || photoId
                            }
                            fill
                            priority
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                    </div>
                </div>

                <div className={styles.metadata}>
                    {photo.caption && (
                        <div className={styles.captionSection}>
                            <p className={styles.caption}>{photo.caption}</p>
                        </div>
                    )}

                    <div className={styles.contextNote}>
                        {labels.contextNote}
                    </div>

                    <div className={styles.detailsGrid}>
                        {hasTakenAt && (
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>
                                    {labels.takenAt}
                                </span>
                                <LocalizedDateTime
                                    lang={lang}
                                    timestamp={photo.takenAt}
                                    className={styles.detailValue}
                                />
                            </div>
                        )}

                        {photo.locationName && (
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>
                                    {labels.location}
                                </span>
                                <span className={styles.detailValue}>
                                    {photo.locationName}
                                </span>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
