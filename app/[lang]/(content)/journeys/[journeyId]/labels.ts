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

export const journeyLabels: Partial<Record<Language, JourneyLabels>> & {
    en: JourneyLabels;
} = {
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
        profileLinkLabel: "Published profile",
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
        eyebrow: "行程",
        photoCount: "张照片",
        locationCount: "个地点",
        duration: "持续时间",
        places: "到访地点",
        gallery: "照片画廊",
        hours: "小时",
        routeTitle: "行程地图",
        mapEmpty: "此行程没有地图信息。",
        locationFallback: "地点",
        profileLinkLabel: "公开资料",
    },
    es: {
        eyebrow: "Viaje",
        photoCount: "fotos",
        locationCount: "lugares",
        duration: "duracion",
        places: "Lugares visitados",
        gallery: "Galeria de fotos",
        hours: "h",
        routeTitle: "Mapa del viaje",
        mapEmpty: "No hay datos de mapa para este viaje.",
        locationFallback: "Lugar",
        profileLinkLabel: "Perfil publicado",
    },
    pt: {
        eyebrow: "Jornada",
        photoCount: "fotos",
        locationCount: "locais",
        duration: "duracao",
        places: "Locais visitados",
        gallery: "Galeria de fotos",
        hours: "h",
        routeTitle: "Mapa da jornada",
        mapEmpty: "Nao ha dados de mapa para esta jornada.",
        locationFallback: "Local",
        profileLinkLabel: "Perfil publicado",
    },
    fr: {
        eyebrow: "Voyage",
        photoCount: "photos",
        locationCount: "lieux",
        duration: "duree",
        places: "Lieux visites",
        gallery: "Galerie photo",
        hours: "h",
        routeTitle: "Carte du voyage",
        mapEmpty: "Aucune donnee de carte pour ce voyage.",
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
        eyebrow: "Hanh trinh",
        photoCount: "anh",
        locationCount: "dia diem",
        duration: "thoi luong",
        places: "Dia diem da den",
        gallery: "Bo suu tap anh",
        hours: "h",
        routeTitle: "Ban do hanh trinh",
        mapEmpty: "Khong co du lieu ban do cho hanh trinh nay.",
        locationFallback: "Dia diem",
        profileLinkLabel: "Ho so cong khai",
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
            ? `${locationText} 的行程，${photoCount} 张照片。`
            : `包含 ${photoCount} 张照片的公开行程。`;
    }

    if (lang === "es") {
        return locationText
            ? `Viaje por ${locationText} con ${photoCount} fotos.`
            : `Un viaje publicado con ${photoCount} fotos.`;
    }

    if (lang === "pt") {
        return locationText
            ? `Jornada por ${locationText} com ${photoCount} fotos.`
            : `Uma jornada publicada com ${photoCount} fotos.`;
    }

    if (lang === "fr") {
        return locationText
            ? `Voyage a travers ${locationText} avec ${photoCount} photos.`
            : `Un voyage publie avec ${photoCount} photos.`;
    }

    if (lang === "th") {
        return locationText
            ? `ทริปผ่าน ${locationText} พร้อมรูป ${photoCount} รูป`
            : `ทริปสาธารณะที่มีรูป ${photoCount} รูป`;
    }

    if (lang === "vi") {
        return locationText
            ? `Hanh trinh qua ${locationText} voi ${photoCount} anh.`
            : `Mot hanh trinh da dang voi ${photoCount} anh.`;
    }

    return locationText
        ? `Journey through ${locationText} with ${photoCount} photos.`
        : `A published journey with ${photoCount} photos.`;
}
