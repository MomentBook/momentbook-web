import type { Metadata } from "next";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getPublicUser, publicJourneys } from "@/lib/public-content";
import { JourneyList } from "./JourneyList";
import styles from "./journeys.module.scss";

const journeyPageLabels: Partial<Record<
    Language,
    {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        countLabel: string;
        empty: string;
        byLabel: string;
        placesLabel: string;
        photosLabel: string;
        notice: string;
    }
>> & { en: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    countLabel: string;
    empty: string;
    byLabel: string;
    placesLabel: string;
    photosLabel: string;
    notice: string;
} } = {
    en: {
        title: "Published journeys",
        subtitle: "Photo-first journeys shared from MomentBook as single pages.",
        searchPlaceholder: "Search journeys, places, or people",
        countLabel: "{count} journeys",
        empty: "No journeys match this search.",
        byLabel: "shared by",
        placesLabel: "places",
        photosLabel: "photos",
        notice: "Each journey opens as its own page. Some are shared as photos only. Anything not published remains private.",
    },
    ko: {
        title: "게시된 여정",
        subtitle: "MomentBook에서 사진 중심으로 공유된 여정 페이지입니다.",
        searchPlaceholder: "여정, 장소, 사람을 검색",
        countLabel: "{count}개 여정",
        empty: "검색 결과가 없습니다.",
        byLabel: "공유한 사람",
        placesLabel: "곳",
        photosLabel: "장",
        notice: "여정 하나가 하나의 페이지로 열립니다. 사진만 공유된 여정도 있으며, 게시하지 않은 기록은 공개되지 않습니다.",
    },
    ja: {
        title: "公開された旅",
        subtitle: "MomentBook から写真中心で共有された旅ページです。",
        searchPlaceholder: "旅、場所、ユーザーを検索",
        countLabel: "{count}件の旅",
        empty: "一致する旅がありません。",
        byLabel: "共有者",
        placesLabel: "か所",
        photosLabel: "枚",
        notice: "旅ごとにページが作られます。写真のみの共有もあり、公開していない記録は表示されません。",
    },
    zh: {
        title: "已发布的行程",
        subtitle: "从 MomentBook 以照片为主分享的行程页面。",
        searchPlaceholder: "搜索行程、地点或用户",
        countLabel: "{count} 条行程",
        empty: "没有符合的行程。",
        byLabel: "分享者",
        placesLabel: "个地点",
        photosLabel: "张照片",
        notice: "每段行程对应一个页面，也可能仅分享照片。未发布的记录不会公开。",
    },
    es: {
        title: "Viajes publicados",
        subtitle: "Viajes publicados desde MomentBook con enfoque en fotos.",
        searchPlaceholder: "Buscar viajes, lugares o personas",
        countLabel: "{count} viajes",
        empty: "No hay viajes que coincidan con la búsqueda.",
        byLabel: "compartido por",
        placesLabel: "lugares",
        photosLabel: "fotos",
        notice: "Cada viaje se abre como su propia pagina. Algunos se comparten solo con fotos. Lo no publicado sigue privado.",
    },
    pt: {
        title: "Jornadas publicadas",
        subtitle: "Jornadas publicadas do MomentBook com foco em fotos.",
        searchPlaceholder: "Buscar jornadas, lugares ou pessoas",
        countLabel: "{count} jornadas",
        empty: "Nenhuma jornada corresponde à busca.",
        byLabel: "compartilhado por",
        placesLabel: "lugares",
        photosLabel: "fotos",
        notice: "Cada jornada abre em sua propria pagina. Algumas sao compartilhadas apenas com fotos. O que nao e publicado permanece privado.",
    },
    fr: {
        title: "Voyages publiés",
        subtitle: "Voyages publies depuis MomentBook avec un focus photo.",
        searchPlaceholder: "Rechercher des voyages, lieux ou personnes",
        countLabel: "{count} voyages",
        empty: "Aucun voyage ne correspond à cette recherche.",
        byLabel: "partagé par",
        placesLabel: "lieux",
        photosLabel: "photos",
        notice: "Chaque voyage ouvre sa propre page. Certains sont partages uniquement avec des photos. Tout ce qui n'est pas publie reste prive.",
    },
    th: {
        title: "ทริปที่เผยแพร่",
        subtitle: "ทริปที่แชร์จาก MomentBook โดยเน้นรูปภาพ",
        searchPlaceholder: "ค้นหาทริป สถานที่ หรือผู้คน",
        countLabel: "{count} ทริป",
        empty: "ไม่พบทริปที่ตรงกับการค้นหา",
        byLabel: "แชร์โดย",
        placesLabel: "สถานที่",
        photosLabel: "รูป",
        notice: "แต่ละทริปจะเปิดเป็นหน้าของตัวเอง บางทริปแชร์เฉพาะรูป สิ่งที่ยังไม่เผยแพร่จะยังเป็นส่วนตัว",
    },
    vi: {
        title: "Hanh trinh da dang",
        subtitle: "Cac hanh trinh duoc chia se tu MomentBook theo huong anh.",
        searchPlaceholder: "Tim hanh trinh, dia diem hoac nguoi dung",
        countLabel: "{count} hanh trinh",
        empty: "Khong co hanh trinh phu hop voi tim kiem.",
        byLabel: "chia se boi",
        placesLabel: "dia diem",
        photosLabel: "anh",
        notice: "Moi hanh trinh mo thanh trang rieng. Mot so chi chia se bang anh. Noi dung chua dang van giu rieng tu.",
    },
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = (await params) as { lang: Language };
    const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;
    const path = "/journeys";
    const url = buildOpenGraphUrl(lang, path);

    return {
        title: labels.title,
        description: labels.subtitle,
        alternates: buildAlternates(lang, path),
        openGraph: {
            title: labels.title,
            description: labels.subtitle,
            url,
        },
        twitter: {
            card: "summary",
            title: labels.title,
            description: labels.subtitle,
        },
    };
}

export default async function JourneysPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = (await params) as { lang: Language };
    const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;

    const cards = publicJourneys.map((journey) => {
        const user = getPublicUser(journey.userId);
        const cover = journey.images[0];
        const meta = `${journey.recapDraft.inputSummary.totalStayPoints} ${labels.placesLabel} · ${journey.recapDraft.inputSummary.totalPhotos} ${labels.photosLabel}`;
        const searchText = [
            journey.title,
            journey.description,
            ...journey.highlights,
            ...journey.locations,
            user?.displayName,
            user?.handle,
        ]
            .filter(Boolean)
            .join(" ");

        return {
            journeyId: journey.journeyId,
            title: journey.title,
            description: journey.description,
            coverUrl: cover?.url ?? "",
            coverAlt: cover?.caption ?? journey.title,
            highlights: journey.highlights,
            userName: user?.displayName ?? "",
            userHandle: user?.handle ?? "",
            meta,
            searchText,
        };
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, "/journeys"),
        siteUrl,
    ).toString();
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: labels.title,
        description: labels.subtitle,
        url: pageUrl,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: cards.map((card, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: new URL(
                    buildOpenGraphUrl(lang, `/journeys/${card.journeyId}`),
                    siteUrl,
                ).toString(),
                name: card.title,
            })),
        },
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className={styles.header}>
                <h1 className={styles.title}>{labels.title}</h1>
                <p className={styles.subtitle}>{labels.subtitle}</p>
            </header>

            <p className={styles.notice}>{labels.notice}</p>

            <JourneyList lang={lang} cards={cards} labels={labels} />
        </div>
    );
}
