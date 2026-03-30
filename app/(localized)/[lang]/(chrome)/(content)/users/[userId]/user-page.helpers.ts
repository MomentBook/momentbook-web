import type { Language } from "@/lib/i18n/config";
import type { PublicUserApi } from "@/lib/public-users";
import { buildSeoDescription } from "@/lib/seo/public-metadata";
import { formatTemplate, readText } from "@/lib/view-helpers";

export const JOURNEYS_PER_PAGE = 16;

export type UserPageLabels = {
  profileEyebrow: string;
  journeys: string;
  photos: string;
  period: string;
  publishedLabel: string;
  unknownDateLabel: string;
  previousPage: string;
  nextPage: string;
  sharedCount: string;
  untitledJourney: string;
  periodUnknown: string;
  emptyJourneys: string;
  pageStatus: string;
  metaPageLabel: string;
};

export const userLabels: Record<Language, UserPageLabels> = {
  en: {
    profileEyebrow: "Profile",
    journeys: "Collected journeys",
    photos: "photos",
    period: "Travel period",
    publishedLabel: "Published",
    unknownDateLabel: "Date unavailable",
    previousPage: "Previous",
    nextPage: "Next",
    sharedCount: "{count} journeys",
    untitledJourney: "Untitled journey",
    periodUnknown: "Time not available",
    emptyJourneys: "No published journeys yet.",
    pageStatus: "Page {current} of {total}",
    metaPageLabel: "Page {page}",
  },
  ko: {
    profileEyebrow: "프로필",
    journeys: "기록된 여정",
    photos: "사진",
    period: "여행 기간",
    publishedLabel: "게시일",
    unknownDateLabel: "날짜 정보 없음",
    previousPage: "이전",
    nextPage: "다음",
    sharedCount: "여정 {count}개",
    untitledJourney: "제목 없는 여정",
    periodUnknown: "시간 정보 없음",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
    pageStatus: "{total}페이지 중 {current}페이지",
    metaPageLabel: "{page}페이지",
  },
  ja: {
    profileEyebrow: "プロフィール",
    journeys: "記録された旅",
    photos: "写真",
    period: "旅の期間",
    publishedLabel: "公開日",
    unknownDateLabel: "日付情報なし",
    previousPage: "前へ",
    nextPage: "次へ",
    sharedCount: "{count}件の旅",
    untitledJourney: "タイトル未設定の旅",
    periodUnknown: "時間情報なし",
    emptyJourneys: "公開された旅はまだありません。",
    pageStatus: "{total}ページ中 {current}ページ",
    metaPageLabel: "{page}ページ",
  },
  zh: {
    profileEyebrow: "个人资料",
    journeys: "已记录的旅程",
    photos: "照片",
    period: "旅行时间",
    publishedLabel: "发布日期",
    unknownDateLabel: "暂无日期信息",
    previousPage: "上一页",
    nextPage: "下一页",
    sharedCount: "{count} 段旅程",
    untitledJourney: "未命名旅程",
    periodUnknown: "暂无时间信息",
    emptyJourneys: "还没有公开旅程。",
    pageStatus: "第 {current} / {total} 页",
    metaPageLabel: "第 {page} 页",
  },
  es: {
    profileEyebrow: "Perfil",
    journeys: "Viajes reunidos",
    photos: "fotos",
    period: "Período del viaje",
    publishedLabel: "Publicado",
    unknownDateLabel: "Fecha no disponible",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    sharedCount: "{count} viajes",
    untitledJourney: "Viaje sin título",
    periodUnknown: "Horario no disponible",
    emptyJourneys: "Aún no hay viajes publicados.",
    pageStatus: "Página {current} de {total}",
    metaPageLabel: "Página {page}",
  },
  pt: {
    profileEyebrow: "Perfil",
    journeys: "Viagens reunidas",
    photos: "fotos",
    period: "Período da viagem",
    publishedLabel: "Publicado em",
    unknownDateLabel: "Data indisponível",
    previousPage: "Anterior",
    nextPage: "Próxima",
    sharedCount: "{count} viagens",
    untitledJourney: "Viagem sem título",
    periodUnknown: "Horário indisponível",
    emptyJourneys: "Ainda não há viagens publicadas.",
    pageStatus: "Página {current} de {total}",
    metaPageLabel: "Página {page}",
  },
  fr: {
    profileEyebrow: "Profil",
    journeys: "Voyages rassemblés",
    photos: "photos",
    period: "Période du voyage",
    publishedLabel: "Publié",
    unknownDateLabel: "Date indisponible",
    previousPage: "Précédent",
    nextPage: "Suivant",
    sharedCount: "{count} voyages",
    untitledJourney: "Voyage sans titre",
    periodUnknown: "Horaire indisponible",
    emptyJourneys: "Aucun voyage publié pour le moment.",
    pageStatus: "Page {current} sur {total}",
    metaPageLabel: "Page {page}",
  },
  th: {
    profileEyebrow: "โปรไฟล์",
    journeys: "ทริปที่บันทึกไว้",
    photos: "รูป",
    period: "ช่วงเวลาเดินทาง",
    publishedLabel: "วันที่เผยแพร่",
    unknownDateLabel: "ไม่มีข้อมูลวันที่",
    previousPage: "ก่อนหน้า",
    nextPage: "ถัดไป",
    sharedCount: "{count} ทริป",
    untitledJourney: "ทริปไม่มีชื่อ",
    periodUnknown: "ไม่มีข้อมูลเวลา",
    emptyJourneys: "ยังไม่มีทริปที่เผยแพร่",
    pageStatus: "หน้า {current} จาก {total}",
    metaPageLabel: "หน้า {page}",
  },
  vi: {
    profileEyebrow: "Hồ sơ",
    journeys: "Hành trình đã lưu",
    photos: "ảnh",
    period: "Thời gian chuyến đi",
    publishedLabel: "Đã đăng",
    unknownDateLabel: "Không có ngày",
    previousPage: "Trước",
    nextPage: "Sau",
    sharedCount: "{count} hành trình",
    untitledJourney: "Hành trình chưa đặt tên",
    periodUnknown: "Không có thông tin thời gian",
    emptyJourneys: "Chưa có hành trình đã đăng.",
    pageStatus: "Trang {current} trên {total}",
    metaPageLabel: "Trang {page}",
  },
};

const userDescriptionTemplates: Record<Language, string> = {
  en: "Public journeys, travel photos, and timeline archives shared by {name} on MomentBook.",
  ko: "{name}님이 MomentBook에서 공유한 공개 여정, 여행 사진, 타임라인 아카이브입니다.",
  ja: "{name}さんが MomentBook で共有した公開の旅、旅行写真、タイムラインアーカイブです。",
  zh: "{name} 在 MomentBook 分享的公开旅程、旅行照片与时间线档案。",
  es: "Viajes públicos, fotos de viaje y archivos de cronología compartidos por {name} en MomentBook.",
  pt: "Viagens públicas, fotos de viagem e arquivos de linha do tempo compartilhados por {name} no MomentBook.",
  fr: "Voyages publics, photos de voyage et archives de chronologie partagés par {name} sur MomentBook.",
  th: "ทริปสาธารณะ รูปท่องเที่ยว และคลังไทม์ไลน์ที่ {name} แชร์บน MomentBook",
  vi: "Hành trình công khai, ảnh du lịch và kho dòng thời gian do {name} chia sẻ trên MomentBook.",
};

const userTitleTemplates: Record<Language, string> = {
  en: "{name}'s public journeys",
  ko: "{name}님의 공개 여정",
  ja: "{name}さんの公開された旅",
  zh: "{name} 的公开旅程",
  es: "Viajes públicos de {name}",
  pt: "Viagens públicas de {name}",
  fr: "Voyages publics de {name}",
  th: "ทริปสาธารณะของ {name}",
  vi: "Hành trình công khai của {name}",
};

const userJourneyCountTemplates: Record<Language, string> = {
  en: "{count} published journeys.",
  ko: "공개 여정 {count}개.",
  ja: "公開された旅 {count}件。",
  zh: "已发布旅程 {count} 段。",
  es: "{count} viajes publicados.",
  pt: "{count} viagens publicadas.",
  fr: "{count} voyages publiés.",
  th: "ทริปที่เผยแพร่ {count} ทริป",
  vi: "{count} hành trình đã đăng.",
};

export const userNotFoundTitleByLanguage: Record<Language, string> = {
  en: "User not found",
  ko: "사용자를 찾을 수 없습니다",
  ja: "ユーザーが見つかりません",
  zh: "找不到用户",
  es: "No se encontró el usuario",
  pt: "Usuário não encontrado",
  fr: "Utilisateur introuvable",
  th: "ไม่พบผู้ใช้",
  vi: "Không tìm thấy người dùng",
};

export function getUserPageLabels(lang: Language): UserPageLabels {
  return userLabels[lang] ?? userLabels.en;
}

export function buildUserProfilePageHref(
  lang: Language,
  userId: string,
  page: number,
): string {
  if (page <= 1) {
    return `/${lang}/users/${userId}`;
  }

  return `/${lang}/users/${userId}?page=${page}`;
}

export function buildUserProfileDescription(
  lang: Language,
  user: PublicUserApi,
): string {
  const biography = readText(user.biography);
  const countSummary = formatTemplate(
    userJourneyCountTemplates[lang] ?? userJourneyCountTemplates.en,
    {
      count: user.publishedJourneyCount,
    },
  );
  const scopeSummary = formatTemplate(
    userDescriptionTemplates[lang] ?? userDescriptionTemplates.en,
    {
      name: user.name,
    },
  );

  return buildSeoDescription([biography, countSummary, scopeSummary]);
}

export function buildUserMetadataTitle(
  lang: Language,
  userName: string,
  currentPage: number,
): string {
  const labels = getUserPageLabels(lang);
  const baseTitle = formatTemplate(
    userTitleTemplates[lang] ?? userTitleTemplates.en,
    { name: userName },
  );

  if (currentPage <= 1) {
    return baseTitle;
  }

  return `${baseTitle} · ${formatTemplate(labels.metaPageLabel, { page: currentPage })}`;
}

export function buildUserMetadataDescription(
  lang: Language,
  user: PublicUserApi,
  currentPage: number,
): string {
  const labels = getUserPageLabels(lang);

  return buildSeoDescription([
    buildUserProfileDescription(lang, user),
    currentPage > 1
      ? formatTemplate(labels.metaPageLabel, { page: currentPage })
      : null,
  ]);
}

export function buildUserSharedCountText(
  labels: UserPageLabels,
  publishedJourneyCount: number,
): string {
  return formatTemplate(labels.sharedCount, {
    count: publishedJourneyCount,
  });
}

export function buildUserPageStatusText(
  labels: UserPageLabels,
  currentPage: number,
  totalPages: number,
): string {
  return formatTemplate(labels.pageStatus, {
    current: currentPage,
    total: totalPages,
  });
}
