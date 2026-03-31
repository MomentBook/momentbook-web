import type { Language } from "@/lib/i18n/config";
import { buildSeoDescription } from "@/lib/seo/public-metadata";

export const JOURNEYS_PER_PAGE = 16;

export type JourneyPageLabels = {
  title: string;
  subtitle: string;
  metaDescription: string;
  paginationLabel: string;
  countLabel: string;
  empty: string;
  byLabel: string;
  photosLabel: string;
  periodLabel: string;
  previousPage: string;
  nextPage: string;
  untitledJourney: string;
  publishedLabel: string;
  pageLabel: string;
  unknownDateLabel: string;
  unknownUserLabel: string;
};

const journeyPageLabels: Record<Language, JourneyPageLabels> = {
  en: {
    title: "Journeys",
    subtitle: "Shared journeys on MomentBook.",
    metaDescription:
      "Public journeys, travel timelines, and published trip photo archives shared on MomentBook.",
    paginationLabel: "Journey list pagination",
    countLabel: "{count} journeys",
    empty: "No published journeys yet.",
    byLabel: "by",
    photosLabel: "photos",
    periodLabel: "period",
    previousPage: "Previous",
    nextPage: "Next",
    untitledJourney: "Untitled journey",
    publishedLabel: "Published",
    pageLabel: "Page {page}",
    unknownDateLabel: "Date unavailable",
    unknownUserLabel: "Unknown user",
  },
  ko: {
    title: "여정",
    subtitle: "MomentBook에서 공유된 여정입니다.",
    metaDescription:
      "MomentBook에서 공유된 공개 여정, 여행 타임라인, 사진 아카이브를 모아둔 페이지입니다.",
    paginationLabel: "여정 목록 페이지 이동",
    countLabel: "{count}개 여정",
    empty: "아직 게시된 여정이 없습니다.",
    byLabel: "작성자",
    photosLabel: "사진",
    periodLabel: "기간",
    previousPage: "이전",
    nextPage: "다음",
    untitledJourney: "제목 없는 여정",
    publishedLabel: "게시일",
    pageLabel: "{page}페이지",
    unknownDateLabel: "날짜 정보 없음",
    unknownUserLabel: "알 수 없는 사용자",
  },
  ja: {
    title: "旅",
    subtitle: "MomentBookで共有された旅です。",
    metaDescription:
      "MomentBook で共有された公開の旅、旅行タイムライン、写真アーカイブをまとめたページです。",
    paginationLabel: "旅一覧のページ切り替え",
    countLabel: "{count}件の旅",
    empty: "公開された旅はまだありません。",
    byLabel: "投稿者",
    photosLabel: "写真",
    periodLabel: "期間",
    previousPage: "前へ",
    nextPage: "次へ",
    untitledJourney: "タイトル未設定の旅",
    publishedLabel: "公開日",
    pageLabel: "{page}ページ",
    unknownDateLabel: "日付情報なし",
    unknownUserLabel: "不明なユーザー",
  },
  zh: {
    title: "旅程",
    subtitle: "在 MomentBook 上分享的公开旅程。",
    metaDescription:
      "汇集了 MomentBook 上分享的公开旅程、旅行时间线与照片档案。",
    paginationLabel: "旅程列表分页",
    countLabel: "{count} 段旅程",
    empty: "还没有已发布的旅程。",
    byLabel: "作者",
    photosLabel: "照片",
    periodLabel: "时间",
    previousPage: "上一页",
    nextPage: "下一页",
    untitledJourney: "未命名旅程",
    publishedLabel: "发布日期",
    pageLabel: "第 {page} 页",
    unknownDateLabel: "暂无日期信息",
    unknownUserLabel: "未知用户",
  },
  es: {
    title: "Viajes",
    subtitle: "Viajes compartidos en MomentBook.",
    metaDescription:
      "Página con viajes públicos, cronologías de viaje y archivos de fotos publicados en MomentBook.",
    paginationLabel: "Paginación de la lista de viajes",
    countLabel: "{count} viajes",
    empty: "Aún no hay viajes publicados.",
    byLabel: "por",
    photosLabel: "fotos",
    periodLabel: "período",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    untitledJourney: "Viaje sin título",
    publishedLabel: "Publicado",
    pageLabel: "Página {page}",
    unknownDateLabel: "Fecha no disponible",
    unknownUserLabel: "Usuario desconocido",
  },
  pt: {
    title: "Viagens",
    subtitle: "Viagens compartilhadas no MomentBook.",
    metaDescription:
      "Página com viagens públicas, linhas do tempo de viagem e arquivos de fotos publicados no MomentBook.",
    paginationLabel: "Paginação da lista de viagens",
    countLabel: "{count} viagens",
    empty: "Ainda não há viagens publicadas.",
    byLabel: "por",
    photosLabel: "fotos",
    periodLabel: "período",
    previousPage: "Anterior",
    nextPage: "Próxima",
    untitledJourney: "Viagem sem título",
    publishedLabel: "Publicado em",
    pageLabel: "Página {page}",
    unknownDateLabel: "Data indisponível",
    unknownUserLabel: "Usuário desconhecido",
  },
  fr: {
    title: "Voyages",
    subtitle: "Voyages partagés sur MomentBook.",
    metaDescription:
      "Page regroupant les voyages publics, chronologies de voyage et archives photo publiés sur MomentBook.",
    paginationLabel: "Pagination de la liste des voyages",
    countLabel: "{count} voyages",
    empty: "Aucun voyage publié pour le moment.",
    byLabel: "par",
    photosLabel: "photos",
    periodLabel: "période",
    previousPage: "Précédent",
    nextPage: "Suivant",
    untitledJourney: "Voyage sans titre",
    publishedLabel: "Publié",
    pageLabel: "Page {page}",
    unknownDateLabel: "Date indisponible",
    unknownUserLabel: "Utilisateur inconnu",
  },
  th: {
    title: "ทริป",
    subtitle: "ทริปที่แชร์บน MomentBook",
    metaDescription:
      "รวมทริปสาธารณะ ไทม์ไลน์การเดินทาง และคลังรูปที่เผยแพร่บน MomentBook",
    paginationLabel: "การแบ่งหน้ารายการทริป",
    countLabel: "{count} ทริป",
    empty: "ยังไม่มีทริปที่เผยแพร่",
    byLabel: "โดย",
    photosLabel: "รูป",
    periodLabel: "ช่วงเวลา",
    previousPage: "ก่อนหน้า",
    nextPage: "ถัดไป",
    untitledJourney: "ทริปไม่มีชื่อ",
    publishedLabel: "วันที่เผยแพร่",
    pageLabel: "หน้า {page}",
    unknownDateLabel: "ไม่มีข้อมูลวันที่",
    unknownUserLabel: "ผู้ใช้ไม่ทราบชื่อ",
  },
  vi: {
    title: "Hành trình",
    subtitle: "Các hành trình được chia sẻ trên MomentBook.",
    metaDescription:
      "Trang tổng hợp hành trình công khai, dòng thời gian chuyến đi và kho ảnh đã đăng trên MomentBook.",
    paginationLabel: "Phân trang danh sách hành trình",
    countLabel: "{count} hành trình",
    empty: "Chưa có hành trình đã đăng.",
    byLabel: "bởi",
    photosLabel: "ảnh",
    periodLabel: "thời gian",
    previousPage: "Trước",
    nextPage: "Sau",
    untitledJourney: "Hành trình chưa đặt tên",
    publishedLabel: "Đã đăng",
    pageLabel: "Trang {page}",
    unknownDateLabel: "Không có ngày",
    unknownUserLabel: "Người dùng không rõ",
  },
};

export function getJourneyPageLabels(lang: Language): JourneyPageLabels {
  return journeyPageLabels[lang] ?? journeyPageLabels.en;
}

export function buildJourneyPageTitle(
  labels: JourneyPageLabels,
  currentPage: number,
): string {
  return currentPage > 1
    ? `${labels.title} · ${labels.pageLabel.replace("{page}", String(currentPage))}`
    : labels.title;
}

export function buildJourneyPageDescription(
  labels: JourneyPageLabels,
  currentPage: number,
): string {
  return buildSeoDescription([
    labels.metaDescription,
    currentPage > 1
      ? labels.pageLabel.replace("{page}", String(currentPage))
      : null,
  ]);
}
