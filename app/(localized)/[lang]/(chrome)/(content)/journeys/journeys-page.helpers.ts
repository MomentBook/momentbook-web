import type { Language } from "@/lib/i18n/config";
import { buildSeoDescription } from "@/lib/seo/public-metadata";

export const JOURNEYS_BATCH_SIZE = 16;

export type JourneyPageLabels = {
  title: string;
  subtitle: string;
  metaDescription: string;
  countLabel: string;
  empty: string;
  byLabel: string;
  photosLabel: string;
  periodLabel: string;
  untitledJourney: string;
  publishedLabel: string;
  unknownDateLabel: string;
  unknownUserLabel: string;
  loadMoreLabel: string;
  loadingMoreLabel: string;
  loadMoreErrorLabel: string;
};

const journeyPageLabels: Record<Language, JourneyPageLabels> = {
  en: {
    title: "Journeys",
    subtitle: "Shared journeys on MomentBook.",
    metaDescription:
      "Public journeys, travel timelines, and published trip photo archives shared on MomentBook.",
    countLabel: "{count} journeys",
    empty: "No published journeys yet.",
    byLabel: "by",
    photosLabel: "photos",
    periodLabel: "period",
    untitledJourney: "Untitled journey",
    publishedLabel: "Published",
    unknownDateLabel: "Date unavailable",
    unknownUserLabel: "Unknown user",
    loadMoreLabel: "Load more journeys",
    loadingMoreLabel: "Loading more journeys...",
    loadMoreErrorLabel: "Unable to load more journeys right now.",
  },
  ko: {
    title: "여정",
    subtitle: "MomentBook에서 공유된 여정입니다.",
    metaDescription:
      "MomentBook에서 공유된 공개 여정, 여행 타임라인, 사진 아카이브를 모아둔 페이지입니다.",
    countLabel: "{count}개 여정",
    empty: "아직 게시된 여정이 없습니다.",
    byLabel: "작성자",
    photosLabel: "사진",
    periodLabel: "기간",
    untitledJourney: "제목 없는 여정",
    publishedLabel: "게시일",
    unknownDateLabel: "날짜 정보 없음",
    unknownUserLabel: "알 수 없는 사용자",
    loadMoreLabel: "여정 더 보기",
    loadingMoreLabel: "여정을 더 불러오는 중...",
    loadMoreErrorLabel: "지금은 여정을 더 불러오지 못했습니다.",
  },
  ja: {
    title: "旅",
    subtitle: "MomentBookで共有された旅です。",
    metaDescription:
      "MomentBook で共有された公開の旅、旅行タイムライン、写真アーカイブをまとめたページです。",
    countLabel: "{count}件の旅",
    empty: "公開された旅はまだありません。",
    byLabel: "投稿者",
    photosLabel: "写真",
    periodLabel: "期間",
    untitledJourney: "タイトル未設定の旅",
    publishedLabel: "公開日",
    unknownDateLabel: "日付情報なし",
    unknownUserLabel: "不明なユーザー",
    loadMoreLabel: "さらに読み込む",
    loadingMoreLabel: "さらに読み込んでいます...",
    loadMoreErrorLabel: "現在、これ以上の旅を読み込めません。",
  },
  zh: {
    title: "旅程",
    subtitle: "在 MomentBook 上分享的公开旅程。",
    metaDescription:
      "汇集了 MomentBook 上分享的公开旅程、旅行时间线与照片档案。",
    countLabel: "{count} 段旅程",
    empty: "还没有已发布的旅程。",
    byLabel: "作者",
    photosLabel: "照片",
    periodLabel: "时间",
    untitledJourney: "未命名旅程",
    publishedLabel: "发布日期",
    unknownDateLabel: "暂无日期信息",
    unknownUserLabel: "未知用户",
    loadMoreLabel: "加载更多旅程",
    loadingMoreLabel: "正在加载更多旅程...",
    loadMoreErrorLabel: "暂时无法加载更多旅程。",
  },
  es: {
    title: "Viajes",
    subtitle: "Viajes compartidos en MomentBook.",
    metaDescription:
      "Página con viajes públicos, cronologías de viaje y archivos de fotos publicados en MomentBook.",
    countLabel: "{count} viajes",
    empty: "Aún no hay viajes publicados.",
    byLabel: "por",
    photosLabel: "fotos",
    periodLabel: "período",
    untitledJourney: "Viaje sin título",
    publishedLabel: "Publicado",
    unknownDateLabel: "Fecha no disponible",
    unknownUserLabel: "Usuario desconocido",
    loadMoreLabel: "Cargar más viajes",
    loadingMoreLabel: "Cargando más viajes...",
    loadMoreErrorLabel: "No se pueden cargar más viajes ahora mismo.",
  },
  pt: {
    title: "Viagens",
    subtitle: "Viagens compartilhadas no MomentBook.",
    metaDescription:
      "Página com viagens públicas, linhas do tempo de viagem e arquivos de fotos publicados no MomentBook.",
    countLabel: "{count} viagens",
    empty: "Ainda não há viagens publicadas.",
    byLabel: "por",
    photosLabel: "fotos",
    periodLabel: "período",
    untitledJourney: "Viagem sem título",
    publishedLabel: "Publicado em",
    unknownDateLabel: "Data indisponível",
    unknownUserLabel: "Usuário desconhecido",
    loadMoreLabel: "Carregar mais viagens",
    loadingMoreLabel: "Carregando mais viagens...",
    loadMoreErrorLabel: "Não foi possível carregar mais viagens agora.",
  },
  fr: {
    title: "Voyages",
    subtitle: "Voyages partagés sur MomentBook.",
    metaDescription:
      "Page regroupant les voyages publics, chronologies de voyage et archives photo publiés sur MomentBook.",
    countLabel: "{count} voyages",
    empty: "Aucun voyage publié pour le moment.",
    byLabel: "par",
    photosLabel: "photos",
    periodLabel: "période",
    untitledJourney: "Voyage sans titre",
    publishedLabel: "Publié",
    unknownDateLabel: "Date indisponible",
    unknownUserLabel: "Utilisateur inconnu",
    loadMoreLabel: "Charger plus de voyages",
    loadingMoreLabel: "Chargement de voyages supplémentaires...",
    loadMoreErrorLabel: "Impossible de charger plus de voyages pour le moment.",
  },
  th: {
    title: "ทริป",
    subtitle: "ทริปที่แชร์บน MomentBook",
    metaDescription:
      "รวมทริปสาธารณะ ไทม์ไลน์การเดินทาง และคลังรูปที่เผยแพร่บน MomentBook",
    countLabel: "{count} ทริป",
    empty: "ยังไม่มีทริปที่เผยแพร่",
    byLabel: "โดย",
    photosLabel: "รูป",
    periodLabel: "ช่วงเวลา",
    untitledJourney: "ทริปไม่มีชื่อ",
    publishedLabel: "วันที่เผยแพร่",
    unknownDateLabel: "ไม่มีข้อมูลวันที่",
    unknownUserLabel: "ผู้ใช้ไม่ทราบชื่อ",
    loadMoreLabel: "โหลดทริปเพิ่มเติม",
    loadingMoreLabel: "กำลังโหลดทริปเพิ่มเติม...",
    loadMoreErrorLabel: "ไม่สามารถโหลดทริปเพิ่มเติมได้ในขณะนี้",
  },
  vi: {
    title: "Hành trình",
    subtitle: "Các hành trình được chia sẻ trên MomentBook.",
    metaDescription:
      "Trang tổng hợp hành trình công khai, dòng thời gian chuyến đi và kho ảnh đã đăng trên MomentBook.",
    countLabel: "{count} hành trình",
    empty: "Chưa có hành trình đã đăng.",
    byLabel: "bởi",
    photosLabel: "ảnh",
    periodLabel: "thời gian",
    untitledJourney: "Hành trình chưa đặt tên",
    publishedLabel: "Đã đăng",
    unknownDateLabel: "Không có ngày",
    unknownUserLabel: "Người dùng không rõ",
    loadMoreLabel: "Tải thêm hành trình",
    loadingMoreLabel: "Đang tải thêm hành trình...",
    loadMoreErrorLabel: "Hiện không thể tải thêm hành trình.",
  },
};

export function getJourneyPageLabels(lang: Language): JourneyPageLabels {
  return journeyPageLabels[lang] ?? journeyPageLabels.en;
}

export function buildJourneyPageTitle(labels: JourneyPageLabels): string {
  return labels.title;
}

export function buildJourneyPageDescription(labels: JourneyPageLabels): string {
  return buildSeoDescription([labels.metaDescription]);
}
