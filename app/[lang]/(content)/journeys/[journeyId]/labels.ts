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
    routeBadgeStrong: string;
    routeBadgeWeak: string;
    routeBadgeNone: string;
    routeLeadStrong: string;
    routeLeadWeak: string;
    routeLeadNone: string;
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
        routeBadgeStrong: "Clear route",
        routeBadgeWeak: "Soft route",
        routeBadgeNone: "Places only",
        routeLeadStrong: "GPS points are sufficient to trace a clear route.",
        routeLeadWeak: "GPS points are partial, so the route appears softer.",
        routeLeadNone:
            "Location data was not available, so only places are shown.",
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
        routeBadgeStrong: "선명한 경로",
        routeBadgeWeak: "느슨한 경로",
        routeBadgeNone: "장소만 표시",
        routeLeadStrong: "GPS 데이터가 충분해 경로가 선명하게 표시됩니다.",
        routeLeadWeak: "GPS 데이터가 간헐적이라 흐름이 부드럽게 보입니다.",
        routeLeadNone: "위치 데이터가 없어 장소만 표시됩니다.",
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
        routeBadgeStrong: "明確なルート",
        routeBadgeWeak: "緩やかなルート",
        routeBadgeNone: "場所のみ",
        routeLeadStrong: "GPSが十分なため、ルートが明確に表示されます。",
        routeLeadWeak: "GPSが部分的なため、ゆるやかな流れで表示されます。",
        routeLeadNone: "位置情報がないため、場所のみ表示されます。",
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
        routeBadgeStrong: "清晰路线",
        routeBadgeWeak: "柔和路线",
        routeBadgeNone: "仅地点",
        routeLeadStrong: "GPS 数据充足，因此路线清晰可见。",
        routeLeadWeak: "GPS 数据不完整，路线呈现更柔和的脉络。",
        routeLeadNone: "位置数据不可用，因此仅显示地点。",
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
        routeBadgeStrong: "Ruta clara",
        routeBadgeWeak: "Ruta suave",
        routeBadgeNone: "Solo lugares",
        routeLeadStrong:
            "Hay suficientes puntos GPS para trazar una ruta clara.",
        routeLeadWeak:
            "Los puntos GPS son parciales, por eso la ruta se ve mas suave.",
        routeLeadNone:
            "No habia datos de ubicacion, por eso solo se muestran lugares.",
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
        routeBadgeStrong: "Rota clara",
        routeBadgeWeak: "Rota suave",
        routeBadgeNone: "Somente locais",
        routeLeadStrong:
            "Os pontos de GPS sao suficientes para mostrar uma rota clara.",
        routeLeadWeak:
            "Os pontos de GPS sao parciais, entao a rota aparece mais suave.",
        routeLeadNone:
            "Nao havia dados de localizacao, entao so os locais sao mostrados.",
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
        routeBadgeStrong: "Itineraire net",
        routeBadgeWeak: "Itineraire doux",
        routeBadgeNone: "Lieux uniquement",
        routeLeadStrong:
            "Les points GPS sont suffisants pour tracer un itineraire net.",
        routeLeadWeak:
            "Les points GPS sont partiels, donc l'itineraire est plus doux.",
        routeLeadNone:
            "Les donnees de localisation etaient absentes, seuls les lieux sont affiches.",
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
        routeBadgeStrong: "เส้นทางชัดเจน",
        routeBadgeWeak: "เส้นทางแบบนุ่มนวล",
        routeBadgeNone: "แสดงเฉพาะสถานที่",
        routeLeadStrong: "จุด GPS เพียงพอ จึงแสดงเส้นทางได้ชัดเจน",
        routeLeadWeak: "จุด GPS มีบางช่วง เส้นทางจึงแสดงแบบนุ่มนวล",
        routeLeadNone: "ไม่มีข้อมูลตำแหน่ง จึงแสดงเฉพาะสถานที่",
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
        routeBadgeStrong: "Tuyen ro rang",
        routeBadgeWeak: "Tuyen mem",
        routeBadgeNone: "Chi dia diem",
        routeLeadStrong: "Du diem GPS de ve mot tuyen ro rang.",
        routeLeadWeak: "Diem GPS chi mot phan nen tuyen hien thi mem hon.",
        routeLeadNone: "Khong co du lieu vi tri nen chi hien thi dia diem.",
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
