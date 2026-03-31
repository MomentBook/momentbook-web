import { defaultLanguage, type Language } from "@/lib/i18n/config";

export type NotFoundCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryHome: string;
  primaryJourneys: string;
  primaryUsers: string;
  secondaryBack: string;
  secondarySupport: string;
};

const copyByLanguage: Record<Language, NotFoundCopy> = {
  en: {
    eyebrow: "Page not found",
    title: "We couldn't find this page",
    lead: "The link may have changed, or this public page may no longer be available on the web.",
    primaryHome: "Go home",
    primaryJourneys: "Browse journeys",
    primaryUsers: "Browse people",
    secondaryBack: "Back",
    secondarySupport: "Support",
  },
  ko: {
    eyebrow: "페이지를 찾을 수 없습니다",
    title: "이 페이지를 찾지 못했습니다",
    lead: "링크가 바뀌었거나, 이 공개 페이지가 더 이상 웹에서 제공되지 않을 수 있습니다.",
    primaryHome: "홈으로 이동",
    primaryJourneys: "여정 보기",
    primaryUsers: "사람 둘러보기",
    secondaryBack: "뒤로",
    secondarySupport: "지원",
  },
  ja: {
    eyebrow: "ページが見つかりません",
    title: "このページは見つかりませんでした",
    lead: "リンクが変わったか、この公開ページはウェブで利用できなくなっている可能性があります。",
    primaryHome: "ホームへ",
    primaryJourneys: "旅を見る",
    primaryUsers: "人を探す",
    secondaryBack: "戻る",
    secondarySupport: "サポート",
  },
  zh: {
    eyebrow: "找不到页面",
    title: "我们找不到这个页面",
    lead: "这个链接可能已经变更，或者这个公开页面已不再在网页上提供。",
    primaryHome: "前往首页",
    primaryJourneys: "浏览旅程",
    primaryUsers: "浏览用户",
    secondaryBack: "返回",
    secondarySupport: "支持",
  },
  es: {
    eyebrow: "Página no encontrada",
    title: "No pudimos encontrar esta página",
    lead: "Es posible que el enlace haya cambiado o que esta página pública ya no esté disponible en la web.",
    primaryHome: "Ir al inicio",
    primaryJourneys: "Ver viajes",
    primaryUsers: "Ver personas",
    secondaryBack: "Volver",
    secondarySupport: "Soporte",
  },
  pt: {
    eyebrow: "Página não encontrada",
    title: "Não conseguimos encontrar esta página",
    lead: "O link pode ter mudado ou esta página pública pode não estar mais disponível na web.",
    primaryHome: "Ir para o início",
    primaryJourneys: "Ver viagens",
    primaryUsers: "Ver pessoas",
    secondaryBack: "Voltar",
    secondarySupport: "Suporte",
  },
  fr: {
    eyebrow: "Page introuvable",
    title: "Nous n'avons pas trouvé cette page",
    lead: "Le lien a peut-être changé, ou cette page publique n'est peut-être plus disponible sur le web.",
    primaryHome: "Aller à l'accueil",
    primaryJourneys: "Voir les voyages",
    primaryUsers: "Voir les personnes",
    secondaryBack: "Retour",
    secondarySupport: "Support",
  },
  th: {
    eyebrow: "ไม่พบหน้านี้",
    title: "เราไม่พบหน้านี้",
    lead: "ลิงก์อาจเปลี่ยนไปแล้ว หรือหน้าสาธารณะนี้อาจไม่พร้อมใช้งานบนเว็บอีกต่อไป",
    primaryHome: "ไปหน้าแรก",
    primaryJourneys: "ดูทริป",
    primaryUsers: "ดูผู้คน",
    secondaryBack: "ย้อนกลับ",
    secondarySupport: "ช่วยเหลือ",
  },
  vi: {
    eyebrow: "Không tìm thấy trang",
    title: "Chúng tôi không tìm thấy trang này",
    lead: "Liên kết có thể đã thay đổi hoặc trang công khai này không còn khả dụng trên web nữa.",
    primaryHome: "Về trang chủ",
    primaryJourneys: "Xem hành trình",
    primaryUsers: "Xem mọi người",
    secondaryBack: "Quay lại",
    secondarySupport: "Hỗ trợ",
  },
};

export function getNotFoundCopy(lang: Language | null | undefined): NotFoundCopy {
  if (!lang) {
    return copyByLanguage[defaultLanguage];
  }

  return copyByLanguage[lang] ?? copyByLanguage[defaultLanguage];
}
