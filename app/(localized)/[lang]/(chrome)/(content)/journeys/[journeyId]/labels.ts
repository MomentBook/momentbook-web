import type { Language } from "@/lib/i18n/config";

export type JourneyLabels = {
    eyebrow: string;
    authorLabel: string;
    originalLanguageLabel: string;
    hashtagsTitle: string;
    photosStat: string;
    photoCount: string;
    publishedLabel: string;
    periodLabel: string;
    momentsTitle: string;
    momentsLead: string;
    momentLabel: string;
    photoArchiveTitle: string;
    photoArchiveLead: string;
    photoArchiveEmpty: string;
    locationFallback: string;
};

export const journeyLabels: Record<Language, JourneyLabels> = {
    en: {
        eyebrow: "Journey",
        authorLabel: "Author",
        originalLanguageLabel: "Original language",
        hashtagsTitle: "Themes",
        photosStat: "Photos",
        photoCount: "photos",
        publishedLabel: "Published",
        periodLabel: "Trip period",
        momentsTitle: "Timeline",
        momentsLead: "Follow the published moments in the order this journey unfolds.",
        momentLabel: "Moment",
        photoArchiveTitle: "Photo archive",
        photoArchiveLead:
            "This journey was published without grouped moments. Browse the captured sequence below.",
        photoArchiveEmpty: "There are no published photos in this journey.",
        locationFallback: "Location",
    },
    ko: {
        eyebrow: "여정",
        authorLabel: "작성자",
        originalLanguageLabel: "원문 언어",
        hashtagsTitle: "해시태그",
        photosStat: "사진",
        photoCount: "장",
        publishedLabel: "게시일",
        periodLabel: "여행 기간",
        momentsTitle: "타임라인",
        momentsLead: "이 여정이 흐르는 순서대로 게시된 순간을 따라가 보세요.",
        momentLabel: "순간",
        photoArchiveTitle: "사진 아카이브",
        photoArchiveLead:
            "이 여정은 순간 단위로 묶이지 않은 상태로 게시되었습니다. 아래에서 촬영 순서대로 사진을 둘러보세요.",
        photoArchiveEmpty: "이 여정에는 게시된 사진이 없습니다.",
        locationFallback: "장소",
    },
    ja: {
        eyebrow: "旅",
        authorLabel: "作者",
        originalLanguageLabel: "原文の言語",
        hashtagsTitle: "ハッシュタグ",
        photosStat: "写真",
        photoCount: "枚",
        publishedLabel: "公開日",
        periodLabel: "旅行期間",
        momentsTitle: "タイムライン",
        momentsLead: "この旅が流れていく順番に、公開されたモーメントをたどれます。",
        momentLabel: "モーメント",
        photoArchiveTitle: "フォトアーカイブ",
        photoArchiveLead:
            "この旅はモーメント単位のまとまりなしで公開されています。下の写真を撮影順にご覧ください。",
        photoArchiveEmpty: "この旅には公開された写真がありません。",
        locationFallback: "場所",
    },
    zh: {
        eyebrow: "旅程",
        authorLabel: "作者",
        originalLanguageLabel: "原文语言",
        hashtagsTitle: "标签",
        photosStat: "照片",
        photoCount: "张照片",
        publishedLabel: "发布日期",
        periodLabel: "旅行时间",
        momentsTitle: "时间线",
        momentsLead: "按这段旅程展开的顺序查看已发布的瞬间。",
        momentLabel: "瞬间",
        photoArchiveTitle: "照片档案",
        photoArchiveLead:
            "这段旅程在发布时没有按瞬间分组。请按拍摄顺序浏览下面的照片。",
        photoArchiveEmpty: "这段旅程没有已发布的照片。",
        locationFallback: "地点",
    },
    es: {
        eyebrow: "Viaje",
        authorLabel: "Autor",
        originalLanguageLabel: "Idioma original",
        hashtagsTitle: "Etiquetas",
        photosStat: "Fotos",
        photoCount: "fotos",
        publishedLabel: "Publicado",
        periodLabel: "Periodo del viaje",
        momentsTitle: "Cronología",
        momentsLead: "Sigue los momentos publicados en el orden en que este viaje se despliega.",
        momentLabel: "Momento",
        photoArchiveTitle: "Archivo de fotos",
        photoArchiveLead:
            "Este viaje se publicó sin momentos agrupados. Recorre abajo la secuencia de fotos capturadas.",
        photoArchiveEmpty: "No hay fotos publicadas en este viaje.",
        locationFallback: "Lugar",
    },
    pt: {
        eyebrow: "Viagem",
        authorLabel: "Autor",
        originalLanguageLabel: "Idioma original",
        hashtagsTitle: "Hashtags",
        photosStat: "Fotos",
        photoCount: "fotos",
        publishedLabel: "Publicado em",
        periodLabel: "Período da viagem",
        momentsTitle: "Linha do tempo",
        momentsLead: "Siga os momentos publicados na ordem em que esta viagem se desenrola.",
        momentLabel: "Momento",
        photoArchiveTitle: "Arquivo de fotos",
        photoArchiveLead:
            "Esta viagem foi publicada sem momentos agrupados. Veja abaixo a sequência das fotos capturadas.",
        photoArchiveEmpty: "Não há fotos publicadas nesta viagem.",
        locationFallback: "Local",
    },
    fr: {
        eyebrow: "Voyage",
        authorLabel: "Auteur",
        originalLanguageLabel: "Langue d'origine",
        hashtagsTitle: "Hashtags",
        photosStat: "Photos",
        photoCount: "photos",
        publishedLabel: "Publié",
        periodLabel: "Période du voyage",
        momentsTitle: "Chronologie",
        momentsLead: "Suivez les moments publiés dans l'ordre où ce voyage se déploie.",
        momentLabel: "Moment",
        photoArchiveTitle: "Archive photo",
        photoArchiveLead:
            "Ce voyage a été publié sans regroupement par moment. Parcourez ci-dessous la séquence des photos capturées.",
        photoArchiveEmpty: "Aucune photo publiée dans ce voyage.",
        locationFallback: "Lieu",
    },
    th: {
        eyebrow: "ทริป",
        authorLabel: "ผู้เขียน",
        originalLanguageLabel: "ภาษาต้นฉบับ",
        hashtagsTitle: "แฮชแท็ก",
        photosStat: "รูปภาพ",
        photoCount: "รูป",
        publishedLabel: "วันที่เผยแพร่",
        periodLabel: "ช่วงเวลาการเดินทาง",
        momentsTitle: "ไทม์ไลน์",
        momentsLead: "ไล่ดูช่วงเวลาที่เผยแพร่ตามลำดับที่ทริปนี้ค่อย ๆ คลี่ออก",
        momentLabel: "ช่วงเวลา",
        photoArchiveTitle: "คลังรูป",
        photoArchiveLead:
            "ทริปนี้ถูกเผยแพร่โดยไม่มีการจัดกลุ่มเป็นช่วงเวลา เลื่อนดูภาพด้านล่างตามลำดับการถ่ายได้เลย",
        photoArchiveEmpty: "ไม่มีรูปที่เผยแพร่ในทริปนี้",
        locationFallback: "สถานที่",
    },
    vi: {
        eyebrow: "Hành trình",
        authorLabel: "Tác giả",
        originalLanguageLabel: "Ngôn ngữ gốc",
        hashtagsTitle: "Thẻ chủ đề",
        photosStat: "Ảnh",
        photoCount: "ảnh",
        publishedLabel: "Đã đăng",
        periodLabel: "Thời gian chuyến đi",
        momentsTitle: "Dòng thời gian",
        momentsLead: "Đi theo các khoảnh khắc đã đăng theo đúng nhịp của hành trình này.",
        momentLabel: "Khoảnh khắc",
        photoArchiveTitle: "Kho ảnh",
        photoArchiveLead:
            "Hành trình này được đăng mà không có các nhóm khoảnh khắc. Hãy duyệt chuỗi ảnh đã chụp ở bên dưới.",
        photoArchiveEmpty: "Không có ảnh nào được đăng trong hành trình này.",
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
            ? `${locationText}를 담은 공개 여정이며 사진 ${photoCount}장이 포함되어 있습니다.`
            : `MomentBook에 공개된 여정이며 사진 ${photoCount}장이 포함되어 있습니다.`;
    }

    if (lang === "ja") {
        return locationText
            ? `${locationText}を含む公開の旅で、写真${photoCount}枚が含まれています。`
            : `MomentBook で公開されている旅で、写真${photoCount}枚が含まれています。`;
    }

    if (lang === "zh") {
        return locationText
            ? `这是一段包含 ${locationText} 的公开旅程，共有 ${photoCount} 张旅行照片。`
            : `这是 MomentBook 上公开的一段旅程，共有 ${photoCount} 张旅行照片。`;
    }

    if (lang === "es") {
        return locationText
            ? `Viaje público por ${locationText} con ${photoCount} fotos de viaje en MomentBook.`
            : `Un viaje público en MomentBook con ${photoCount} fotos de viaje.`;
    }

    if (lang === "pt") {
        return locationText
            ? `Viagem pública por ${locationText} com ${photoCount} fotos de viagem no MomentBook.`
            : `Uma viagem pública no MomentBook com ${photoCount} fotos de viagem.`;
    }

    if (lang === "fr") {
        return locationText
            ? `Voyage public à travers ${locationText} avec ${photoCount} photos de voyage sur MomentBook.`
            : `Un voyage public sur MomentBook avec ${photoCount} photos de voyage.`;
    }

    if (lang === "th") {
        return locationText
            ? `ทริปสาธารณะที่มี ${locationText} และรูปท่องเที่ยว ${photoCount} รูปบน MomentBook`
            : `ทริปสาธารณะบน MomentBook ที่มีรูปท่องเที่ยว ${photoCount} รูป`;
    }

    if (lang === "vi") {
        return locationText
            ? `Hành trình công khai qua ${locationText} với ${photoCount} ảnh du lịch trên MomentBook.`
            : `Hành trình công khai trên MomentBook với ${photoCount} ảnh du lịch.`;
    }

    return locationText
        ? `Public journey through ${locationText} with ${photoCount} travel photos on MomentBook.`
        : `A public journey on MomentBook with ${photoCount} travel photos.`;
}
