import type { Language } from "@/lib/i18n/config";

export type JourneyLabels = {
    eyebrow: string;
    photoCount: string;
    locationCount: string;
    duration: string;
    places: string;
    gallery: string;
    hours: string;
    routeTitle: string;
    mapEmpty: string;
    locationFallback: string;
    profileLinkLabel: string;
};

export const journeyLabels: Record<Language, JourneyLabels> = {
    en: {
        eyebrow: "Journey",
        photoCount: "photos",
        locationCount: "places",
        duration: "duration",
        places: "Places Visited",
        gallery: "Photo Gallery",
        hours: "h",
        routeTitle: "Journey map",
        mapEmpty: "There is no map data for this journey.",
        locationFallback: "Location",
        profileLinkLabel: "Public profile",
    },
    ko: {
        eyebrow: "여정",
        photoCount: "장",
        locationCount: "곳",
        duration: "소요 시간",
        places: "방문한 장소",
        gallery: "사진 갤러리",
        hours: "시간",
        routeTitle: "여정 지도",
        mapEmpty: "이 여정에는 지도 정보가 없습니다.",
        locationFallback: "장소",
        profileLinkLabel: "공개 프로필",
    },
    ja: {
        eyebrow: "旅",
        photoCount: "枚",
        locationCount: "か所",
        duration: "所要時間",
        places: "訪れた場所",
        gallery: "フォトギャラリー",
        hours: "時間",
        routeTitle: "旅の地図",
        mapEmpty: "この旅には地図情報がありません。",
        locationFallback: "場所",
        profileLinkLabel: "公開プロフィール",
    },
    zh: {
        eyebrow: "旅程",
        photoCount: "张照片",
        locationCount: "个地点",
        duration: "持续时间",
        places: "到访地点",
        gallery: "照片画廊",
        hours: "小时",
        routeTitle: "旅程地图",
        mapEmpty: "这段旅程没有地图信息。",
        locationFallback: "地点",
        profileLinkLabel: "公开个人资料",
    },
    es: {
        eyebrow: "Viaje",
        photoCount: "fotos",
        locationCount: "lugares",
        duration: "duración",
        places: "Lugares visitados",
        gallery: "Galería de fotos",
        hours: "h",
        routeTitle: "Mapa del viaje",
        mapEmpty: "No hay datos de mapa para este viaje.",
        locationFallback: "Lugar",
        profileLinkLabel: "Perfil público",
    },
    pt: {
        eyebrow: "Viagem",
        photoCount: "fotos",
        locationCount: "locais",
        duration: "duração",
        places: "Locais visitados",
        gallery: "Galeria de fotos",
        hours: "h",
        routeTitle: "Mapa da viagem",
        mapEmpty: "Não há dados de mapa para esta viagem.",
        locationFallback: "Local",
        profileLinkLabel: "Perfil público",
    },
    fr: {
        eyebrow: "Voyage",
        photoCount: "photos",
        locationCount: "lieux",
        duration: "durée",
        places: "Lieux visités",
        gallery: "Galerie photo",
        hours: "h",
        routeTitle: "Carte du voyage",
        mapEmpty: "Aucune donnée de carte pour ce voyage.",
        locationFallback: "Lieu",
        profileLinkLabel: "Profil public",
    },
    th: {
        eyebrow: "ทริป",
        photoCount: "รูป",
        locationCount: "สถานที่",
        duration: "ระยะเวลา",
        places: "สถานที่ที่ไป",
        gallery: "คลังรูป",
        hours: "ชม.",
        routeTitle: "แผนที่ทริป",
        mapEmpty: "ทริปนี้ไม่มีข้อมูลแผนที่",
        locationFallback: "สถานที่",
        profileLinkLabel: "โปรไฟล์สาธารณะ",
    },
    vi: {
        eyebrow: "Hành trình",
        photoCount: "ảnh",
        locationCount: "địa điểm",
        duration: "thời lượng",
        places: "Địa điểm đã đến",
        gallery: "Bộ sưu tập ảnh",
        hours: "h",
        routeTitle: "Bản đồ hành trình",
        mapEmpty: "Không có dữ liệu bản đồ cho hành trình này.",
        locationFallback: "Địa điểm",
        profileLinkLabel: "Hồ sơ công khai",
    },
};

export function buildJourneyDescription(
    lang: Language,
    locations: string[],
    photoCount: number,
) {
    const locationText = locations.slice(0, 3).join(", ");

    if (lang === "ko") {
        return locationText
            ? `${locationText}의 여정, 사진 ${photoCount}장.`
            : `사진 ${photoCount}장이 담긴 공개 여정입니다.`;
    }

    if (lang === "ja") {
        return locationText
            ? `${locationText}の旅、写真${photoCount}枚。`
            : `写真${photoCount}枚が含まれる公開された旅です。`;
    }

    if (lang === "zh") {
        return locationText
            ? `${locationText} 的旅程，${photoCount} 张照片。`
            : `一段公开的旅程，包含 ${photoCount} 张照片。`;
    }

    if (lang === "es") {
        return locationText
            ? `Viaje por ${locationText} con ${photoCount} fotos.`
            : `Un viaje publicado con ${photoCount} fotos.`;
    }

    if (lang === "pt") {
        return locationText
            ? `Viagem por ${locationText} com ${photoCount} fotos.`
            : `Uma viagem publicada com ${photoCount} fotos.`;
    }

    if (lang === "fr") {
        return locationText
            ? `Voyage à travers ${locationText} avec ${photoCount} photos.`
            : `Un voyage publié avec ${photoCount} photos.`;
    }

    if (lang === "th") {
        return locationText
            ? `ทริปผ่าน ${locationText} พร้อมรูป ${photoCount} รูป`
            : `ทริปสาธารณะที่มีรูป ${photoCount} รูป`;
    }

    if (lang === "vi") {
        return locationText
            ? `Hành trình qua ${locationText} với ${photoCount} ảnh.`
            : `Một hành trình đã đăng với ${photoCount} ảnh.`;
    }

    return locationText
        ? `Journey through ${locationText} with ${photoCount} photos.`
        : `A published journey with ${photoCount} photos.`;
}
