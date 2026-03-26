import { type Language } from "@/lib/i18n/config";

export type SupportContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  faqHeading: string;
  faqPrefix: string;
  faqLinkLabel: string;
  faqSuffix: string;
  contactHeading: string;
  contactPrefix: string;
  contactSuffix: string;
};

const supportContent: Record<Language, SupportContent> = {
  en: {
    metaTitle: "MomentBook Support",
    metaDescription: "Help and contact for MomentBook.",
    title: "MomentBook Support",
    subtitle: "Quiet help for your photos and trips.",
    faqHeading: "Common questions",
    faqPrefix: "You might find a quick answer in our ",
    faqLinkLabel: "FAQ",
    faqSuffix: ".",
    contactHeading: "Contact",
    contactPrefix: "For other questions or issues, you can reach us at ",
    contactSuffix: ".",
  },
  ko: {
    metaTitle: "MomentBook 지원",
    metaDescription: "MomentBook 도움말과 문의 방법을 안내합니다.",
    title: "MomentBook 지원",
    subtitle: "사진과 여정을 위한 조용한 도움.",
    faqHeading: "자주 묻는 질문",
    faqPrefix: "",
    faqLinkLabel: "자주 묻는 질문",
    faqSuffix: "에서 먼저 확인해 보실 수 있습니다.",
    contactHeading: "문의",
    contactPrefix: "그 외 문의는 ",
    contactSuffix: "로 연락해 주세요.",
  },
  ja: {
    metaTitle: "MomentBook サポート",
    metaDescription: "MomentBookのヘルプとお問い合わせ方法をご案内します。",
    title: "MomentBook サポート",
    subtitle: "写真と旅のための静かなサポート。",
    faqHeading: "よくある質問",
    faqPrefix: "",
    faqLinkLabel: "よくある質問",
    faqSuffix: "に回答があるかもしれません。",
    contactHeading: "お問い合わせ",
    contactPrefix: "その他のご質問や不具合は ",
    contactSuffix: " までご連絡ください。",
  },
  zh: {
    metaTitle: "MomentBook 支持",
    metaDescription: "了解 MomentBook 的帮助与联系方法。",
    title: "MomentBook 支持",
    subtitle: "为照片与旅程提供安静的帮助。",
    faqHeading: "常见问题",
    faqPrefix: "你可能可以在 ",
    faqLinkLabel: "常见问题",
    faqSuffix: " 中先查看答案。",
    contactHeading: "联系",
    contactPrefix: "其他问题或故障，请联系 ",
    contactSuffix: "。",
  },
  es: {
    metaTitle: "Soporte de MomentBook",
    metaDescription: "Ayuda y contacto para MomentBook.",
    title: "Soporte de MomentBook",
    subtitle: "Ayuda tranquila para tus fotos y viajes.",
    faqHeading: "Preguntas frecuentes",
    faqPrefix: "Puedes encontrar respuestas rápidas en ",
    faqLinkLabel: "preguntas frecuentes",
    faqSuffix: ".",
    contactHeading: "Contacto",
    contactPrefix: "Para otras dudas o problemas, escribe a ",
    contactSuffix: ".",
  },
  pt: {
    metaTitle: "Suporte do MomentBook",
    metaDescription: "Ajuda e contato do MomentBook.",
    title: "Suporte do MomentBook",
    subtitle: "Ajuda tranquila para suas fotos e viagens.",
    faqHeading: "Perguntas frequentes",
    faqPrefix: "Você pode encontrar respostas rápidas no ",
    faqLinkLabel: "perguntas frequentes",
    faqSuffix: ".",
    contactHeading: "Contato",
    contactPrefix: "Para outras dúvidas ou problemas, fale com ",
    contactSuffix: ".",
  },
  fr: {
    metaTitle: "Support MomentBook",
    metaDescription: "Aide et contact pour MomentBook.",
    title: "Support MomentBook",
    subtitle: "Aide calme pour vos photos et voyages.",
    faqHeading: "Questions fréquentes",
    faqPrefix: "Vous pouvez trouver une réponse rapide dans la ",
    faqLinkLabel: "questions fréquentes",
    faqSuffix: ".",
    contactHeading: "Contact",
    contactPrefix: "Pour toute autre question, contactez ",
    contactSuffix: ".",
  },
  th: {
    metaTitle: "ศูนย์ช่วยเหลือ MomentBook",
    metaDescription: "ความช่วยเหลือและช่องทางติดต่อของ MomentBook",
    title: "ศูนย์ช่วยเหลือ MomentBook",
    subtitle: "ความช่วยเหลือแบบสงบสำหรับรูปและทริปของคุณ",
    faqHeading: "คําถามที่พบบ่อย",
    faqPrefix: "คุณอาจพบคําตอบได้จาก ",
    faqLinkLabel: "คำถามที่พบบ่อย",
    faqSuffix: "",
    contactHeading: "ติดต่อ",
    contactPrefix: "หากมีปัญหาหรือคําถามเพิ่มเติม ติดต่อ ",
    contactSuffix: "",
  },
  vi: {
    metaTitle: "Hỗ trợ MomentBook",
    metaDescription: "Trợ giúp và liên hệ cho MomentBook.",
    title: "Hỗ trợ MomentBook",
    subtitle: "Trợ giúp nhẹ nhàng cho ảnh và hành trình của bạn.",
    faqHeading: "Câu hỏi thường gặp",
    faqPrefix: "Bạn có thể tìm thấy câu trả lời nhanh trong ",
    faqLinkLabel: "câu hỏi thường gặp",
    faqSuffix: ".",
    contactHeading: "Liên hệ",
    contactPrefix: "Với các câu hỏi hoặc sự cố khác, vui lòng liên hệ ",
    contactSuffix: ".",
  },
};

export function getSupportContent(lang: Language) {
  return supportContent[lang] ?? supportContent.en;
}
