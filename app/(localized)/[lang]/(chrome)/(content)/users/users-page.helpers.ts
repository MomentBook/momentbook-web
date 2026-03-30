import type { Language } from "@/lib/i18n/config";
import { buildSeoDescription } from "@/lib/seo/public-metadata";

export type UserListLabels = {
  title: string;
  subtitle: string;
  metaDescription: string;
  directoryEyebrow: string;
  resultsEyebrow: string;
  searchPlaceholder: string;
  hashtagHint: string;
  searchButton: string;
  clearSearch: string;
  countLabel: string;
  empty: string;
  journeysLabel: string;
  viewProfile: string;
};

const userListLabels: Record<Language, UserListLabels> = {
  en: {
    title: "Public profiles",
    subtitle: "Profiles that share public journeys on MomentBook.",
    metaDescription:
      "Public profiles, shared journeys, and travel photo archives published on MomentBook.",
    directoryEyebrow: "Public directory",
    resultsEyebrow: "Profiles",
    searchPlaceholder: "Search by name, biography, or hashtag",
    hashtagHint: "Matching tags",
    searchButton: "Search",
    clearSearch: "Clear search",
    countLabel: "{count} users",
    empty: "No profiles match this search.",
    journeysLabel: "journeys",
    viewProfile: "View profile",
  },
  ko: {
    title: "공개 프로필",
    subtitle: "MomentBook에서 공개 여정을 공유하는 프로필입니다.",
    metaDescription:
      "MomentBook에 공개된 프로필, 공유 여정, 여행 사진 아카이브를 모아둔 페이지입니다.",
    directoryEyebrow: "공개 디렉터리",
    resultsEyebrow: "프로필",
    searchPlaceholder: "이름, 소개, 해시태그로 검색",
    hashtagHint: "일치한 해시태그",
    searchButton: "검색",
    clearSearch: "검색 지우기",
    countLabel: "{count}명",
    empty: "검색 결과가 없습니다.",
    journeysLabel: "개 여정",
    viewProfile: "프로필 보기",
  },
  ja: {
    title: "公開プロフィール",
    subtitle: "MomentBookで公開された旅を共有しているプロフィールです。",
    metaDescription:
      "MomentBook で公開されているプロフィール、共有された旅、旅行写真アーカイブをまとめたページです。",
    directoryEyebrow: "公開ディレクトリ",
    resultsEyebrow: "プロフィール",
    searchPlaceholder: "名前・紹介文・ハッシュタグで検索",
    hashtagHint: "一致したハッシュタグ",
    searchButton: "検索",
    clearSearch: "検索をクリア",
    countLabel: "{count}人",
    empty: "一致するプロフィールがありません。",
    journeysLabel: "件の旅",
    viewProfile: "プロフィールを見る",
  },
  zh: {
    title: "公开个人资料",
    subtitle: "在 MomentBook 分享公开旅程的个人资料。",
    metaDescription:
      "汇集了 MomentBook 上公开的个人资料、共享旅程与旅行照片档案。",
    directoryEyebrow: "公开目录",
    resultsEyebrow: "个人资料",
    searchPlaceholder: "按名称、简介或标签搜索",
    hashtagHint: "匹配标签",
    searchButton: "搜索",
    clearSearch: "清除搜索",
    countLabel: "{count} 位用户",
    empty: "没有符合的个人资料。",
    journeysLabel: "段旅程",
    viewProfile: "查看资料",
  },
  es: {
    title: "Perfiles públicos",
    subtitle: "Perfiles que comparten viajes públicos en MomentBook.",
    metaDescription:
      "Página con perfiles públicos, viajes compartidos y archivos de fotos de viaje publicados en MomentBook.",
    directoryEyebrow: "Directorio público",
    resultsEyebrow: "Perfiles",
    searchPlaceholder: "Buscar por nombre, biografía o hashtag",
    hashtagHint: "Etiquetas coincidentes",
    searchButton: "Buscar",
    clearSearch: "Borrar búsqueda",
    countLabel: "{count} usuarios",
    empty: "No hay perfiles que coincidan.",
    journeysLabel: "viajes",
    viewProfile: "Ver perfil",
  },
  pt: {
    title: "Perfis públicos",
    subtitle: "Perfis que compartilham viagens públicas no MomentBook.",
    metaDescription:
      "Página com perfis públicos, viagens compartilhadas e arquivos de fotos de viagem publicados no MomentBook.",
    directoryEyebrow: "Diretório público",
    resultsEyebrow: "Perfis",
    searchPlaceholder: "Buscar por nome, biografia ou hashtag",
    hashtagHint: "Hashtags correspondentes",
    searchButton: "Buscar",
    clearSearch: "Limpar busca",
    countLabel: "{count} usuários",
    empty: "Nenhum perfil corresponde à busca.",
    journeysLabel: "viagens",
    viewProfile: "Ver perfil",
  },
  fr: {
    title: "Profils publics",
    subtitle: "Profils qui partagent des voyages publics sur MomentBook.",
    metaDescription:
      "Page regroupant les profils publics, voyages partagés et archives photo de voyage publiés sur MomentBook.",
    directoryEyebrow: "Répertoire public",
    resultsEyebrow: "Profils",
    searchPlaceholder: "Rechercher par nom, biographie ou hashtag",
    hashtagHint: "Hashtags correspondants",
    searchButton: "Rechercher",
    clearSearch: "Effacer la recherche",
    countLabel: "{count} utilisateurs",
    empty: "Aucun profil ne correspond à la recherche.",
    journeysLabel: "voyages",
    viewProfile: "Voir le profil",
  },
  th: {
    title: "โปรไฟล์สาธารณะ",
    subtitle: "โปรไฟล์ที่แชร์ทริปจาก MomentBook",
    metaDescription:
      "รวมโปรไฟล์สาธารณะ ทริปที่แชร์ และคลังรูปท่องเที่ยวที่เผยแพร่บน MomentBook",
    directoryEyebrow: "ไดเรกทอรีสาธารณะ",
    resultsEyebrow: "โปรไฟล์",
    searchPlaceholder: "ค้นหาด้วยชื่อ คำแนะนำตัว หรือแฮชแท็ก",
    hashtagHint: "แฮชแท็กที่ตรงกัน",
    searchButton: "ค้นหา",
    clearSearch: "ล้างการค้นหา",
    countLabel: "{count} ผู้ใช้",
    empty: "ไม่พบโปรไฟล์ที่ตรงกัน",
    journeysLabel: "ทริป",
    viewProfile: "ดูโปรไฟล์",
  },
  vi: {
    title: "Hồ sơ công khai",
    subtitle: "Hồ sơ chia sẻ hành trình từ MomentBook.",
    metaDescription:
      "Trang tổng hợp hồ sơ công khai, hành trình được chia sẻ và kho ảnh du lịch đã đăng trên MomentBook.",
    directoryEyebrow: "Danh mục công khai",
    resultsEyebrow: "Hồ sơ",
    searchPlaceholder: "Tìm theo tên, tiểu sử hoặc hashtag",
    hashtagHint: "Hashtag khớp",
    searchButton: "Tìm kiếm",
    clearSearch: "Xóa tìm kiếm",
    countLabel: "{count} người dùng",
    empty: "Không có hồ sơ phù hợp.",
    journeysLabel: "hành trình",
    viewProfile: "Xem hồ sơ",
  },
};

export function getUserListLabels(lang: Language): UserListLabels {
  return userListLabels[lang] ?? userListLabels.en;
}

export function buildUserListDescription(
  labels: UserListLabels,
  query: string,
): string {
  return buildSeoDescription([
    labels.metaDescription,
    query.length > 0 ? query : null,
  ]);
}
