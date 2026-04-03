import type { Language } from "@/lib/i18n/config";
import type { PublishedJourneyApi } from "@/lib/published-journey";

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

type JourneyUnavailableVariant = "pending" | "rejected" | "hidden";

type JourneyUnavailableCopy = {
    title: string;
    message: string;
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

const journeyUnavailableLabels: Record<
    Language,
    Record<JourneyUnavailableVariant, JourneyUnavailableCopy>
> = {
    en: {
        pending: {
            title: "This journey is waiting for review",
            message:
                "This journey was submitted for publishing and is still waiting for admin review.",
        },
        rejected: {
            title: "This journey was not approved for the web",
            message:
                "This journey was reviewed and is not currently available on the public web.",
        },
        hidden: {
            title: "This journey is unavailable",
            message: "This journey is currently unavailable on the public web.",
        },
    },
    ko: {
        pending: {
            title: "이 여정은 검토 대기 중입니다",
            message:
                "이 여정은 게시 요청이 저장되었지만 관리자 검토가 끝날 때까지 웹에 노출되지 않습니다.",
        },
        rejected: {
            title: "이 여정은 웹에 공개되지 않았습니다",
            message: "이 여정은 검토 결과 현재 웹에 공개되지 않습니다.",
        },
        hidden: {
            title: "이 여정은 웹에서 볼 수 없습니다",
            message: "이 여정은 현재 웹에서 볼 수 없습니다.",
        },
    },
    ja: {
        pending: {
            title: "この旅は審査待ちです",
            message:
                "この旅は公開リクエストとして保存されましたが、管理者の審査が終わるまでウェブには表示されません。",
        },
        rejected: {
            title: "この旅はウェブ公開の対象外です",
            message: "この旅は審査の結果、現在ウェブでは公開されていません。",
        },
        hidden: {
            title: "この旅はウェブでは表示できません",
            message: "この旅は現在ウェブでは表示できません。",
        },
    },
    zh: {
        pending: {
            title: "此旅程正在等待审核",
            message: "此旅程已保存为发布记录，但在管理员审核完成前不会显示在网页上。",
        },
        rejected: {
            title: "此旅程未通过网页公开审核",
            message: "此旅程经过审核后，当前不会在公开网页上显示。",
        },
        hidden: {
            title: "此旅程暂时无法在网页上查看",
            message: "此旅程当前无法在网页上查看。",
        },
    },
    es: {
        pending: {
            title: "Este viaje está pendiente de revisión",
            message:
                "Este viaje se guardó como una publicación, pero no aparecerá en la web hasta que termine la revisión administrativa.",
        },
        rejected: {
            title: "Este viaje no fue aprobado para la web",
            message: "Este viaje fue revisado y no está disponible actualmente en la web pública.",
        },
        hidden: {
            title: "Este viaje no está disponible en la web",
            message: "Este viaje no está disponible actualmente en la web.",
        },
    },
    pt: {
        pending: {
            title: "Esta viagem está aguardando revisão",
            message:
                "Esta viagem foi salva como publicação, mas não aparecerá na web até a revisão administrativa ser concluída.",
        },
        rejected: {
            title: "Esta viagem não foi aprovada para a web",
            message: "Esta viagem foi revisada e não está disponível no momento na web pública.",
        },
        hidden: {
            title: "Esta viagem não está disponível na web",
            message: "Esta viagem não está disponível no momento na web.",
        },
    },
    fr: {
        pending: {
            title: "Ce voyage est en attente de validation",
            message:
                "Ce voyage a bien été enregistré pour publication, mais il ne sera pas visible sur le web avant la fin de la validation admin.",
        },
        rejected: {
            title: "Ce voyage n'a pas été approuvé pour le web",
            message:
                "Ce voyage a été examiné et n'est actuellement pas disponible sur le web public.",
        },
        hidden: {
            title: "Ce voyage n'est pas disponible sur le web",
            message: "Ce voyage n'est actuellement pas disponible sur le web.",
        },
    },
    th: {
        pending: {
            title: "ทริปนี้กำลังรอการตรวจสอบ",
            message:
                "ทริปนี้ถูกบันทึกไว้เพื่อเผยแพร่แล้ว แต่จะยังไม่แสดงบนเว็บจนกว่าผู้ดูแลจะตรวจสอบเสร็จ",
        },
        rejected: {
            title: "ทริปนี้ยังไม่ได้รับอนุมัติให้แสดงบนเว็บ",
            message: "ทริปนี้ผ่านการตรวจสอบแล้วและขณะนี้ยังไม่พร้อมแสดงบนเว็บสาธารณะ",
        },
        hidden: {
            title: "ทริปนี้ไม่สามารถดูบนเว็บได้",
            message: "ขณะนี้ทริปนี้ไม่สามารถดูบนเว็บได้",
        },
    },
    vi: {
        pending: {
            title: "Hành trình này đang chờ duyệt",
            message:
                "Hành trình này đã được lưu để xuất bản nhưng sẽ chưa hiển thị trên web cho đến khi quản trị viên duyệt xong.",
        },
        rejected: {
            title: "Hành trình này chưa được chấp thuận cho web",
            message: "Hành trình này đã được xem xét và hiện không hiển thị trên web công khai.",
        },
        hidden: {
            title: "Hành trình này hiện không xem được trên web",
            message: "Hành trình này hiện không xem được trên web.",
        },
    },
};

function trimMessage(value: string | null | undefined): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function resolveJourneyUnavailableVariant(
    journey?: Pick<PublishedJourneyApi, "contentStatus" | "reviewStatus"> | null,
): JourneyUnavailableVariant {
    if (
        journey?.contentStatus === "review_pending" ||
        journey?.reviewStatus === "PENDING"
    ) {
        return "pending";
    }

    if (
        journey?.contentStatus === "review_rejected" ||
        journey?.reviewStatus === "REJECTED"
    ) {
        return "rejected";
    }

    return "hidden";
}

export function resolveJourneyUnavailableCopy(
    lang: Language,
    journey?: Pick<
        PublishedJourneyApi,
        "contentStatus" | "reviewStatus" | "notice"
    > | null,
    fallbackMessage?: string,
) {
    const variant = resolveJourneyUnavailableVariant(journey);
    const labels =
        journeyUnavailableLabels[lang] ?? journeyUnavailableLabels.en;
    const defaultCopy = labels[variant];

    return {
        ...defaultCopy,
        message:
            trimMessage(journey?.notice) ??
            trimMessage(fallbackMessage) ??
            defaultCopy.message,
    };
}

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
