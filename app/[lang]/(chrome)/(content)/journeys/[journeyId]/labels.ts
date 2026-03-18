import type { Language } from "@/lib/i18n/config";

export type JourneyLabels = {
    eyebrow: string;
    photosStat: string;
    placesStat: string;
    durationStat: string;
    photoCount: string;
    locationCount: string;
    hours: string;
    minutes: string;
    publishedLabel: string;
    periodLabel: string;
    places: string;
    routeTitle: string;
    jumpTitle: string;
    momentsTitle: string;
    momentCta: string;
    photoArchiveTitle: string;
    photoArchiveLead: string;
    photoArchiveEmpty: string;
    capturedAtLabel: string;
    locationFallback: string;
};

export const journeyLabels: Record<Language, JourneyLabels> = {
    en: {
        eyebrow: "Journey",
        photosStat: "Photos",
        placesStat: "Places",
        durationStat: "Duration",
        photoCount: "photos",
        locationCount: "places",
        hours: "h",
        minutes: "m",
        publishedLabel: "Published",
        periodLabel: "Trip period",
        places: "Places visited",
        routeTitle: "Journey map",
        jumpTitle: "Jump to moment",
        momentsTitle: "Moments",
        momentCta: "Open moment",
        photoArchiveTitle: "Photo archive",
        photoArchiveLead:
            "This journey was published without grouped moments. Browse the captured sequence below.",
        photoArchiveEmpty: "There are no published photos in this journey.",
        capturedAtLabel: "Captured",
        locationFallback: "Location",
    },
    ko: {
        eyebrow: "여정",
        photosStat: "사진",
        placesStat: "장소",
        durationStat: "소요 시간",
        photoCount: "장",
        locationCount: "곳",
        hours: "시간",
        minutes: "분",
        publishedLabel: "게시일",
        periodLabel: "여행 기간",
        places: "방문한 장소",
        routeTitle: "여정 지도",
        jumpTitle: "순간 바로가기",
        momentsTitle: "순간",
        momentCta: "순간 보기",
        photoArchiveTitle: "사진 아카이브",
        photoArchiveLead:
            "이 여정은 순간 단위로 묶이지 않은 상태로 게시되었습니다. 아래에서 촬영 순서대로 사진을 둘러보세요.",
        photoArchiveEmpty: "이 여정에는 게시된 사진이 없습니다.",
        capturedAtLabel: "기록 시각",
        locationFallback: "장소",
    },
    ja: {
        eyebrow: "旅",
        photosStat: "写真",
        placesStat: "場所",
        durationStat: "所要時間",
        photoCount: "枚",
        locationCount: "か所",
        hours: "時間",
        minutes: "分",
        publishedLabel: "公開日",
        periodLabel: "旅行期間",
        places: "訪れた場所",
        routeTitle: "旅の地図",
        jumpTitle: "モーメントへ移動",
        momentsTitle: "モーメント",
        momentCta: "モーメントを見る",
        photoArchiveTitle: "フォトアーカイブ",
        photoArchiveLead:
            "この旅はモーメント単位のまとまりなしで公開されています。下の写真を撮影順にご覧ください。",
        photoArchiveEmpty: "この旅には公開された写真がありません。",
        capturedAtLabel: "記録時刻",
        locationFallback: "場所",
    },
    zh: {
        eyebrow: "旅程",
        photosStat: "照片",
        placesStat: "地点",
        durationStat: "时长",
        photoCount: "张照片",
        locationCount: "个地点",
        hours: "小时",
        minutes: "分钟",
        publishedLabel: "发布日期",
        periodLabel: "旅行时间",
        places: "到访地点",
        routeTitle: "旅程地图",
        jumpTitle: "跳转到瞬间",
        momentsTitle: "瞬间",
        momentCta: "查看瞬间",
        photoArchiveTitle: "照片档案",
        photoArchiveLead:
            "这段旅程在发布时没有按瞬间分组。请按拍摄顺序浏览下面的照片。",
        photoArchiveEmpty: "这段旅程没有已发布的照片。",
        capturedAtLabel: "拍摄时间",
        locationFallback: "地点",
    },
    es: {
        eyebrow: "Viaje",
        photosStat: "Fotos",
        placesStat: "Lugares",
        durationStat: "Duración",
        photoCount: "fotos",
        locationCount: "lugares",
        hours: "h",
        minutes: "min",
        publishedLabel: "Publicado",
        periodLabel: "Periodo del viaje",
        places: "Lugares visitados",
        routeTitle: "Mapa del viaje",
        jumpTitle: "Ir al momento",
        momentsTitle: "Momentos",
        momentCta: "Abrir momento",
        photoArchiveTitle: "Archivo de fotos",
        photoArchiveLead:
            "Este viaje se publicó sin momentos agrupados. Recorre abajo la secuencia de fotos capturadas.",
        photoArchiveEmpty: "No hay fotos publicadas en este viaje.",
        capturedAtLabel: "Capturada",
        locationFallback: "Lugar",
    },
    pt: {
        eyebrow: "Viagem",
        photosStat: "Fotos",
        placesStat: "Locais",
        durationStat: "Duração",
        photoCount: "fotos",
        locationCount: "locais",
        hours: "h",
        minutes: "min",
        publishedLabel: "Publicado em",
        periodLabel: "Período da viagem",
        places: "Locais visitados",
        routeTitle: "Mapa da viagem",
        jumpTitle: "Ir para o momento",
        momentsTitle: "Momentos",
        momentCta: "Abrir momento",
        photoArchiveTitle: "Arquivo de fotos",
        photoArchiveLead:
            "Esta viagem foi publicada sem momentos agrupados. Veja abaixo a sequência das fotos capturadas.",
        photoArchiveEmpty: "Não há fotos publicadas nesta viagem.",
        capturedAtLabel: "Registrado em",
        locationFallback: "Local",
    },
    fr: {
        eyebrow: "Voyage",
        photosStat: "Photos",
        placesStat: "Lieux",
        durationStat: "Durée",
        photoCount: "photos",
        locationCount: "lieux",
        hours: "h",
        minutes: "min",
        publishedLabel: "Publié",
        periodLabel: "Période du voyage",
        places: "Lieux visités",
        routeTitle: "Carte du voyage",
        jumpTitle: "Aller au moment",
        momentsTitle: "Moments",
        momentCta: "Ouvrir le moment",
        photoArchiveTitle: "Archive photo",
        photoArchiveLead:
            "Ce voyage a été publié sans regroupement par moment. Parcourez ci-dessous la séquence des photos capturées.",
        photoArchiveEmpty: "Aucune photo publiée dans ce voyage.",
        capturedAtLabel: "Prise le",
        locationFallback: "Lieu",
    },
    th: {
        eyebrow: "ทริป",
        photosStat: "รูปภาพ",
        placesStat: "สถานที่",
        durationStat: "ระยะเวลา",
        photoCount: "รูป",
        locationCount: "สถานที่",
        hours: "ชม.",
        minutes: "นาที",
        publishedLabel: "วันที่เผยแพร่",
        periodLabel: "ช่วงเวลาการเดินทาง",
        places: "สถานที่ที่ไป",
        routeTitle: "แผนที่ทริป",
        jumpTitle: "ไปยังช่วงเวลา",
        momentsTitle: "ช่วงเวลา",
        momentCta: "ดูช่วงเวลา",
        photoArchiveTitle: "คลังรูป",
        photoArchiveLead:
            "ทริปนี้ถูกเผยแพร่โดยไม่มีการจัดกลุ่มเป็นช่วงเวลา เลื่อนดูภาพด้านล่างตามลำดับการถ่ายได้เลย",
        photoArchiveEmpty: "ไม่มีรูปที่เผยแพร่ในทริปนี้",
        capturedAtLabel: "เวลาที่บันทึก",
        locationFallback: "สถานที่",
    },
    vi: {
        eyebrow: "Hành trình",
        photosStat: "Ảnh",
        placesStat: "Địa điểm",
        durationStat: "Thời lượng",
        photoCount: "ảnh",
        locationCount: "địa điểm",
        hours: "h",
        minutes: "phút",
        publishedLabel: "Đã đăng",
        periodLabel: "Thời gian chuyến đi",
        places: "Địa điểm đã đến",
        routeTitle: "Bản đồ hành trình",
        jumpTitle: "Đi tới khoảnh khắc",
        momentsTitle: "Khoảnh khắc",
        momentCta: "Mở khoảnh khắc",
        photoArchiveTitle: "Kho ảnh",
        photoArchiveLead:
            "Hành trình này được đăng mà không có các nhóm khoảnh khắc. Hãy duyệt chuỗi ảnh đã chụp ở bên dưới.",
        photoArchiveEmpty: "Không có ảnh nào được đăng trong hành trình này.",
        capturedAtLabel: "Ghi lại lúc",
        locationFallback: "Địa điểm",
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
