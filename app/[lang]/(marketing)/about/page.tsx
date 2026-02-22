import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./about.module.scss";
import { type AppScreenshotKey, getLocalizedScreenshotGallery } from "@/lib/app-screenshots";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type HowItWorksFlow = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
};

type SupportingFeature = {
  title: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
  linkLabel?: string;
  linkHref?: string;
};

type HowItWorksContent = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTrackingCta: string;
  heroPhotoCta: string;
  keyFactsTitle: string;
  keyFacts: string[];
  flowTitle: string;
  flowLead: string;
  flows: HowItWorksFlow[];
  screenshotTitle: string;
  screenshotLead: string;
  outcomeTitle: string;
  outcomeLead: string;
  outcomeHighlights: string[];
  outcomePrimaryCta: string;
  outcomeSecondaryCta: string;
  featuresTitle: string;
  featuresLead: string;
  features: SupportingFeature[];
  faqTitle: string;
  faqs: FaqItem[];
};

type AboutEssentialsContent = {
  title: string;
  lead: string;
  principlesTitle: string;
  principles: string[];
  privacyTitle: string;
  privacyText: string;
  moreFaqLink: string;
};

const aboutEssentialsContent: Record<Language, AboutEssentialsContent> = {
  en: {
    title: "What matters most",
    lead: "MomentBook stays calm and practical. These are the core principles.",
    principlesTitle: "Principles",
    principles: [
      "Batch upload travel photos",
      "Auto-organization by date and time",
      "Trip recap through timeline",
      "Private by default",
      "ZIP export/share/backup without publishing",
    ],
    privacyTitle: "Publishing and visibility",
    privacyText: "Journeys are private by default. Publishing is optional and public pages may be indexed by search engines.",
    moreFaqLink: "More questions? Visit FAQ",
  },
  ko: {
    title: "핵심 원칙",
    lead: "MomentBook은 조용하고 실용적인 흐름을 지향합니다. 중요한 기준은 아래와 같습니다.",
    principlesTitle: "원칙",
    principles: [
      "여행 사진 일괄 업로드",
      "날짜·시간 기준 자동 정리",
      "정리된 타임라인으로 여행 회고",
      "기본은 비공개, 필요할 때만 게시",
      "ZIP 내보내기로 개인 보관 또는 직접 공유",
    ],
    privacyTitle: "게시와 공개 범위",
    privacyText: "여정은 기본적으로 비공개입니다. 게시는 선택이며 공개 페이지는 검색 엔진에 수집될 수 있습니다.",
    moreFaqLink: "더 궁금하신가요? FAQ 보기",
  },
  ja: {
    title: "大事なポイント",
    lead: "MomentBook は静かで実用的な流れを大切にしています。",
    principlesTitle: "原則",
    principles: [
      "旅行写真の一括アップロード",
      "日時で自動整理",
      "タイムラインで旅を振り返る",
      "デフォルトは非公開",
      "公開しなくてもZIPで保存・共有・バックアップ可能",
    ],
    privacyTitle: "公開と可視性",
    privacyText: "旅はデフォルトで非公開です。公開は任意で、公開ページは検索エンジンに表示される場合があります。",
    moreFaqLink: "他にもご質問がありますか？FAQ を見る",
  },
  zh: {
    title: "核心原则",
    lead: "MomentBook 保持安静且实用的记录方式，核心原则如下。",
    principlesTitle: "原则",
    principles: [
      "旅行照片批量上传",
      "按日期和时间自动整理",
      "通过时间线回顾旅行",
      "默认私密",
      "不发布也可 ZIP 保存、分享、备份",
    ],
    privacyTitle: "发布与可见性",
    privacyText: "旅程默认私密。发布是可选的，公开页面可能被搜索引擎收录。",
    moreFaqLink: "更多疑问？查看 FAQ",
  },
  es: {
    title: "Lo esencial",
    lead: "MomentBook mantiene un flujo tranquilo y practico.",
    principlesTitle: "Principios",
    principles: [
      "Carga en lote de fotos del viaje",
      "Orden automatico por fecha y hora",
      "Recap del viaje en timeline",
      "Privado por defecto",
      "Guardar, compartir y respaldo ZIP sin publicar",
    ],
    privacyTitle: "Publicacion y visibilidad",
    privacyText: "Los viajes son privados por defecto. Publicar es opcional y la pagina publica puede indexarse.",
    moreFaqLink: "¿Mas preguntas? Ver FAQ",
  },
  pt: {
    title: "O essencial",
    lead: "MomentBook segue um fluxo calmo e pratico.",
    principlesTitle: "Principios",
    principles: [
      "Envio em lote das fotos da viagem",
      "Organizacao automatica por data e hora",
      "Recap da viagem em timeline",
      "Privado por padrao",
      "Salvar, compartilhar e backup ZIP sem publicar",
    ],
    privacyTitle: "Publicacao e visibilidade",
    privacyText: "As jornadas sao privadas por padrao. Publicar e opcional e paginas publicas podem ser indexadas.",
    moreFaqLink: "Tem mais duvidas? Ver FAQ",
  },
  fr: {
    title: "L'essentiel",
    lead: "MomentBook garde un flux calme et pratique.",
    principlesTitle: "Principes",
    principles: [
      "Import en lot des photos du voyage",
      "Organisation auto par date et heure",
      "Recap du voyage en timeline",
      "Prive par defaut",
      "Conserver, partager et sauvegarder en ZIP sans publier",
    ],
    privacyTitle: "Publication et visibilite",
    privacyText: "Les voyages sont prives par defaut. La publication est optionnelle et la page publique peut etre indexee.",
    moreFaqLink: "D'autres questions ? Voir FAQ",
  },
  th: {
    title: "สิ่งสำคัญ",
    lead: "MomentBook เน้นการบันทึกที่สงบและใช้งานได้จริง",
    principlesTitle: "หลักการ",
    principles: [
      "อัปโหลดรูปทริปแบบชุดเดียว",
      "จัดอัตโนมัติตามวันและเวลา",
      "ทบทวนทริปผ่านไทม์ไลน์",
      "เป็นส่วนตัวโดยค่าเริ่มต้น",
      "ส่งออก ZIP เพื่อเก็บ แชร์ และสํารองได้แม้ไม่เผยแพร่",
    ],
    privacyTitle: "การเผยแพร่และการมองเห็น",
    privacyText: "ทริปเป็นส่วนตัวโดยค่าเริ่มต้น การเผยแพร่เป็นตัวเลือก และหน้าเว็บสาธารณะอาจถูกจัดทำดัชนี",
    moreFaqLink: "มีคำถามเพิ่มเติมไหม? ดู FAQ",
  },
  vi: {
    title: "Dieu quan trong",
    lead: "MomentBook giu dong chay nhe nhang va thuc dung.",
    principlesTitle: "Nguyen tac",
    principles: [
      "Tai len hang loat anh du lich",
      "Tu dong sap xep theo ngay gio",
      "Recap chuyen di bang timeline",
      "Rieng tu mac dinh",
      "Luu, chia se va sao luu ZIP duoc ma khong can dang bai",
    ],
    privacyTitle: "Dang bai va hien thi",
    privacyText: "Hanh trinh mac dinh la rieng tu. Dang bai la tuy chon va trang cong khai co the duoc lap chi muc.",
    moreFaqLink: "Them cau hoi? Xem FAQ",
  },
};

const timelineExportInfoByLang: Record<Language, { title: string; text: string }> = {
  en: {
    title: "Timeline export",
    text: "After organizing a journey into a timeline, you can export a ZIP (images + metadata) to keep personally or share directly. This works even without publishing.",
  },
  ko: {
    title: "타임라인 내보내기",
    text: "여정을 타임라인으로 정리한 뒤 이미지+메타데이터 ZIP으로 내보내 개인 보관하거나 타인에게 직접 공유할 수 있습니다. 게시하지 않아도 가능합니다.",
  },
  ja: {
    title: "タイムライン書き出し",
    text: "旅をタイムラインとして整理した後、画像+メタデータのZIPを書き出して個人保管または直接共有できます。公開しなくても利用できます。",
  },
  zh: {
    title: "时间线导出",
    text: "将旅程整理为时间线后，可导出包含图片和元数据的 ZIP，用于个人保存或直接分享。无需发布也可使用。",
  },
  es: {
    title: "Exportar timeline",
    text: "Despues de ordenar el viaje en timeline, puedes exportar un ZIP (imagenes + metadatos) para guardarlo o compartirlo directamente. Funciona incluso sin publicar.",
  },
  pt: {
    title: "Exportar timeline",
    text: "Depois de organizar a jornada em timeline, voce pode exportar um ZIP (imagens + metadados) para guardar ou compartilhar diretamente. Funciona mesmo sem publicar.",
  },
  fr: {
    title: "Export timeline",
    text: "Apres organisation du voyage en timeline, vous pouvez exporter un ZIP (images + metadonnees) pour conserver ou partager directement. Cela fonctionne meme sans publier.",
  },
  th: {
    title: "ส่งออกไทม์ไลน์",
    text: "หลังจัดทริปเป็นไทม์ไลน์แล้ว คุณสามารถส่งออก ZIP (รูป+เมทาดาทา) เพื่อเก็บเองหรือแชร์โดยตรงได้ โดยไม่ต้องเผยแพร่",
  },
  vi: {
    title: "Xuat timeline",
    text: "Sau khi sap xep hanh trinh thanh timeline, ban co the xuat ZIP (anh + metadata) de tu luu hoac chia se truc tiep. Van dung duoc ma khong can dang bai.",
  },
};

const howItWorksContent: Record<Language, HowItWorksContent> = {
  en: {
    metaTitle: "How auto travel photo organization works — MomentBook",
    metaDescription: "Batch upload travel photos, let MomentBook sort them by date and time, then revisit your trip in one timeline.",
    heroTitle: "Upload travel photos once. MomentBook organizes them by date and time.",
    heroSubtitle: "From batch upload to recap, the app keeps the flow simple: upload, auto-organize, revisit.",
    heroTrackingCta: "See batch upload",
    heroPhotoCta: "See auto-organization",
    keyFactsTitle: "Key facts",
    keyFacts: [
      "Batch upload photos from your trip",
      "Automatic organization by date and time",
      "Timeline recap for easy reflection",
      "Private by default; publishing is optional and creates a unique public page",
      "ZIP export for personal archive, direct sharing, or backup",
    ],
    flowTitle: "Batch upload -> auto-organize -> recap",
    flowLead: "One clear flow in three steps.",
    flows: [
      {
        id: "upload",
        title: "1. Batch upload",
        summary: "Upload all travel photos in one go.",
        steps: [
          "Select photos across multiple dates at once.",
          "Original capture timestamps are kept.",
          "Move directly to organization.",
        ],
      },
      {
        id: "organize",
        title: "2. Auto-organize by date/time",
        summary: "The app arranges photos in chronological order automatically.",
        steps: [
          "Nearby timestamps are grouped into moments.",
          "A trip timeline is built automatically.",
          "Fine-tune only when needed.",
        ],
      },
      {
        id: "recap",
        title: "3. Trip recap",
        summary: "Review your journey naturally through the organized timeline.",
        steps: [
          "See your full trip at a glance by date.",
          "Jump back to moments you want to remember.",
          "Export ZIP for personal archive or direct sharing.",
        ],
      },
    ],
    screenshotTitle: "App screens",
    screenshotLead: "A quick look from upload to recap.",
    outcomeTitle: "Revisit a cleanly organized trip",
    outcomeLead: "Upload once, let the app organize, and focus on your recap.",
    outcomeHighlights: [
      "Trip photos organized into a date-based timeline",
      "Less manual sorting, more reflection",
      "Sharing is optional; personal record is the default",
    ],
    outcomePrimaryCta: "Organize travel photos in one upload",
    outcomeSecondaryCta: "See supporting features",
    featuresTitle: "Supporting features",
    featuresLead: "Details that support the flow.",
    features: [
      {
        title: "Light manual adjustment",
        text: "You can adjust auto-grouped moments only when needed.",
      },
      {
        title: "Optional publishing",
        text: "Publishing is optional.",
      },
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        question: "Can I upload photos from multiple days at once?",
        answer: "Yes. You can batch upload photos from across your trip.",
      },
      {
        question: "Do I need to sort manually?",
        answer: "No. Photos are auto-organized by date and time.",
      },
      {
        question: "If I publish, can anyone see it?",
        answer: "Publishing is optional. A public page can be shared by link and may appear in search results.",
        linkLabel: "Read the community guidelines.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  ko: {
    metaTitle: "MomentBook — 여행 사진 자동 정리",
    metaDescription: "여행 기간 사진을 한 번에 업로드하면 날짜와 시간순으로 자동 정리해 회고하기 쉬운 타임라인을 만듭니다.",
    heroTitle: "여행 사진, 한 번에 올리면 자동으로 정리됩니다",
    heroSubtitle: "일괄 업로드한 사진을 날짜와 시간 기준으로 자동 정리해 여행을 다시 보기 쉬운 흐름으로 정돈합니다.",
    heroTrackingCta: "일괄 업로드 흐름 보기",
    heroPhotoCta: "자동 정리 흐름 보기",
    keyFactsTitle: "핵심 사실",
    keyFacts: [
      "여행 기간 사진을 한 번에 업로드할 수 있습니다",
      "업로드된 사진을 날짜·시간 기준으로 자동 정리합니다",
      "정리된 타임라인으로 여행을 쉽게 회고할 수 있습니다",
      "기본적으로 비공개이며, 게시 여부는 선택할 수 있습니다",
      "정리한 여정은 ZIP으로 내보내 개인 보관 또는 직접 공유할 수 있습니다",
    ],
    flowTitle: "일괄 업로드에서 여행 회고까지",
    flowLead: "핵심 흐름은 세 단계입니다.",
    flows: [
      {
        id: "upload",
        title: "1. 여행 사진 일괄 업로드",
        summary: "여행 기간 동안 찍은 사진을 한 번에 선택해 올립니다.",
        steps: [
          "여러 날짜의 사진을 한 번에 선택합니다.",
          "원본 촬영 시간 정보가 그대로 유지됩니다.",
          "업로드가 끝나면 자동 정리 단계로 이동합니다.",
        ],
      },
      {
        id: "organize",
        title: "2. 날짜/시간 자동 정리",
        summary: "앱이 사진을 시간 흐름에 맞게 자동으로 배치합니다.",
        steps: [
          "시간대가 가까운 사진을 순간 단위로 묶습니다.",
          "날짜 순서대로 여행 타임라인이 구성됩니다.",
          "필요할 때만 묶음을 간단히 조정하면 됩니다.",
        ],
      },
      {
        id: "recap",
        title: "3. 여행 회고",
        summary: "정리된 타임라인으로 여행의 흐름을 다시 돌아봅니다.",
        steps: [
          "날짜별로 이동 동선을 한눈에 확인합니다.",
          "기억하고 싶은 순간을 다시 찾아볼 수 있습니다.",
          "원하면 ZIP으로 내보내 보관하거나 직접 공유합니다.",
        ],
      },
    ],
    screenshotTitle: "앱 화면 미리보기",
    screenshotLead: "업로드부터 타임라인 회고까지 흐름을 확인하세요.",
    outcomeTitle: "정리된 여행을 바로 돌아보기",
    outcomeLead: "사진을 올리면 정리는 앱이 맡고, 회고는 더 간단해집니다.",
    outcomeHighlights: [
      "여행 사진을 날짜 흐름대로 정돈된 타임라인으로 확인",
      "사진 선택 이후 정리 부담을 줄여 회고에 집중",
      "공유는 선택이고, 기본은 개인 기록",
    ],
    outcomePrimaryCta: "여행 사진 한 번에 정리하기",
    outcomeSecondaryCta: "기능 더 보기",
    featuresTitle: "흐름을 돕는 요소",
    featuresLead: "작은 기능은 흐름을 돕기만 합니다.",
    features: [
      {
        title: "자동 묶음 조정",
        text: "자동으로 묶인 순간은 필요할 때만 간단히 다듬을 수 있습니다.",
      },
      {
        title: "선택적 게시",
        text: "게시 여부는 선택입니다.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        question: "여러 날짜 사진도 한 번에 올릴 수 있나요?",
        answer: "네. 여행 기간 사진을 한 번에 선택해 업로드할 수 있습니다.",
      },
      {
        question: "정리를 직접 해야 하나요?",
        answer: "아니요. 업로드한 사진을 날짜와 시간 기준으로 자동 정리합니다.",
      },
      {
        question: "공개하면 누구나 보나요?",
        answer: "게시 여부는 선택입니다. 공개 페이지는 링크로 공유할 수 있고 검색에 노출될 수 있습니다.",
        linkLabel: "커뮤니티 가이드라인 보기.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  ja: {
    metaTitle: "MomentBook — 旅行写真を自動整理",
    metaDescription: "旅行写真をまとめてアップロードすると、日時順に自動整理して、振り返りやすいタイムラインになります。",
    heroTitle: "旅行写真をまとめてアップロード。日時順に自動整理されます。",
    heroSubtitle: "流れはシンプルです。まとめてアップロードして、自動整理されたタイムラインで旅を振り返ります。",
    heroTrackingCta: "一括アップロードを見る",
    heroPhotoCta: "自動整理を見る",
    keyFactsTitle: "重要な事実",
    keyFacts: [
      "旅行写真を一括アップロード",
      "日時順に自動整理",
      "タイムラインで旅を振り返る",
      "デフォルトで非公開、公開は任意",
      "ZIP書き出しで保存・共有・バックアップ可能",
    ],
    flowTitle: "一括アップロード -> 自動整理 -> 振り返り",
    flowLead: "3ステップで完了します。",
    flows: [
      {
        id: "upload",
        title: "1. 一括アップロード",
        summary: "旅行中の写真をまとめて一度にアップロードします。",
        steps: [
          "複数日の写真を同時に選択します。",
          "撮影時刻の情報はそのまま保持されます。",
          "アップロード後すぐ整理へ進みます。",
        ],
      },
      {
        id: "organize",
        title: "2. 日時で自動整理",
        summary: "アプリが時系列で自動的に並べます。",
        steps: [
          "近い時刻の写真を瞬間単位でまとめます。",
          "旅のタイムラインが自動生成されます。",
          "必要なときだけ調整します。",
        ],
      },
      {
        id: "recap",
        title: "3. 旅を振り返る",
        summary: "整理されたタイムラインで自然に見返せます。",
        steps: [
          "日付順で旅全体を一目で確認できます。",
          "思い出したい場面へすぐ戻れます。",
          "ZIPで個人保存や直接共有ができます。",
        ],
      },
    ],
    screenshotTitle: "アプリ画面の流れ",
    screenshotLead: "アップロードから振り返りまで確認できます。",
    outcomeTitle: "整理された旅をすぐ振り返る",
    outcomeLead: "整理はアプリに任せて、振り返りに集中できます。",
    outcomeHighlights: [
      "旅行写真を日付ベースのタイムラインで確認",
      "手動整理を減らして回想に集中",
      "共有は任意、基本は個人記録",
    ],
    outcomePrimaryCta: "旅行写真をまとめて整理する",
    outcomeSecondaryCta: "機能を見る",
    featuresTitle: "流れを支える要素",
    featuresLead: "細かな機能は流れを支えるためにあります。",
    features: [
      {
        title: "自動グループの調整",
        text: "必要な場合だけ、まとまりを簡単に調整できます。",
      },
      {
        title: "任意の公開",
        text: "公開は任意です。",
      },
    ],
    faqTitle: "よくある質問",
    faqs: [
      {
        question: "複数日の写真を一度にアップロードできますか？",
        answer: "はい。旅行期間の写真をまとめてアップロードできます。",
      },
      {
        question: "手動で並べ替える必要がありますか？",
        answer: "いいえ。日時で自動整理されます。",
      },
      {
        question: "公開すると誰でも見られますか？",
        answer: "公開は任意です。公開ページはリンクで共有でき、検索に表示される可能性があります。",
        linkLabel: "コミュニティガイドラインを見る。",
        linkHref: "/community-guidelines",
      },
    ],
  },
  zh: {
    metaTitle: "MomentBook — 旅行照片自动整理",
    metaDescription: "将旅行照片一次上传后，应用会按日期和时间自动整理，形成便于回顾的时间线。",
    heroTitle: "旅行照片一次上传，按日期和时间自动整理",
    heroSubtitle: "流程很简单：批量上传，自动整理，然后在时间线里回顾旅行。",
    heroTrackingCta: "查看批量上传",
    heroPhotoCta: "查看自动整理",
    keyFactsTitle: "关键事实",
    keyFacts: [
      "旅行照片可一次批量上传",
      "按日期和时间自动整理",
      "通过时间线轻松回顾旅行",
      "默认私密，发布为可选项",
      "支持 ZIP 导出用于保存、分享和备份",
    ],
    flowTitle: "批量上传 -> 自动整理 -> 旅行回顾",
    flowLead: "三步完成。",
    flows: [
      {
        id: "upload",
        title: "1. 批量上传",
        summary: "一次上传旅行期间拍摄的照片。",
        steps: [
          "可同时选择多个日期的照片。",
          "原始拍摄时间信息会保留。",
          "上传后直接进入整理步骤。",
        ],
      },
      {
        id: "organize",
        title: "2. 日期/时间自动整理",
        summary: "应用会自动按时间顺序整理照片。",
        steps: [
          "时间相近的照片会聚合为瞬间。",
          "旅行时间线自动生成。",
          "仅在需要时做少量调整。",
        ],
      },
      {
        id: "recap",
        title: "3. 旅行回顾",
        summary: "在已整理好的时间线上自然回看旅行。",
        steps: [
          "按日期一眼查看完整旅程。",
          "快速回到想重看的片段。",
          "可导出 ZIP 用于保存或直接分享。",
        ],
      },
    ],
    screenshotTitle: "应用界面一览",
    screenshotLead: "快速查看从上传到回顾的流程。",
    outcomeTitle: "更快回看已整理的旅行",
    outcomeLead: "上传后由应用完成整理，你只需要专注回顾。",
    outcomeHighlights: [
      "旅行照片按日期形成清晰时间线",
      "减少手动整理，更多专注回顾",
      "分享可选，默认保留为个人记录",
    ],
    outcomePrimaryCta: "一次整理旅行照片",
    outcomeSecondaryCta: "查看功能",
    featuresTitle: "支持流程的细节",
    featuresLead: "这些功能只为帮助流程。",
    features: [
      {
        title: "自动分组微调",
        text: "自动分组后，必要时可进行简短调整。",
      },
      {
        title: "可选发布",
        text: "发布是可选的。",
      },
    ],
    faqTitle: "常见问题",
    faqs: [
      {
        question: "可以一次上传多个日期的照片吗？",
        answer: "可以。旅行期间的照片可一次批量上传。",
      },
      {
        question: "需要手动整理吗？",
        answer: "不需要。系统会按日期和时间自动整理。",
      },
      {
        question: "发布后所有人都能看到吗？",
        answer: "发布是可选的。公开页面可以通过链接分享，并可能被搜索引擎收录。",
        linkLabel: "查看社区准则。",
        linkHref: "/community-guidelines",
      },
    ],
  },
  es: {
    metaTitle: "MomentBook — Organizacion automatica de fotos de viaje",
    metaDescription: "Sube las fotos del viaje en lote y la app las ordena por fecha y hora para revisarlas en timeline.",
    heroTitle: "Sube tus fotos del viaje una vez. Se ordenan por fecha y hora.",
    heroSubtitle: "El flujo es directo: carga en lote, organizacion automatica y recap del viaje.",
    heroTrackingCta: "Ver carga en lote",
    heroPhotoCta: "Ver organizacion automatica",
    keyFactsTitle: "Datos clave",
    keyFacts: [
      "Carga en lote de fotos del viaje",
      "Orden automatico por fecha y hora",
      "Recap del viaje con timeline clara",
      "Privado por defecto; publicar es opcional",
      "Exportacion ZIP para guardar, compartir o respaldo",
    ],
    flowTitle: "Carga en lote -> organizacion automatica -> recap",
    flowLead: "Tres pasos, un flujo claro.",
    flows: [
      {
        id: "upload",
        title: "1. Carga en lote",
        summary: "Sube de una vez las fotos tomadas durante el viaje.",
        steps: [
          "Selecciona fotos de varios dias al mismo tiempo.",
          "Se conserva la hora original de captura.",
          "Despues de subir, pasas directo a organizar.",
        ],
      },
      {
        id: "organize",
        title: "2. Organizacion automatica por fecha y hora",
        summary: "La app acomoda las fotos en orden cronologico automaticamente.",
        steps: [
          "Fotos cercanas en tiempo se agrupan en momentos.",
          "Se crea la timeline del viaje automaticamente.",
          "Ajustas solo si hace falta.",
        ],
      },
      {
        id: "recap",
        title: "3. Recap del viaje",
        summary: "Recorre tu viaje de forma natural con la timeline ya ordenada.",
        steps: [
          "Ve todo el viaje por fecha en un vistazo.",
          "Vuelve rapido a los momentos que quieres recordar.",
          "Exporta ZIP para guardar o compartir directo.",
        ],
      },
    ],
    screenshotTitle: "Pantallas de la app",
    screenshotLead: "Vista rapida desde la carga hasta el recap.",
    outcomeTitle: "Revisa un viaje ya organizado",
    outcomeLead: "Tu subes las fotos; la app hace la organizacion.",
    outcomeHighlights: [
      "Fotos del viaje ordenadas en una timeline por fecha",
      "Menos trabajo manual, mas enfoque en recordar",
      "Compartir es opcional; lo personal es el punto de partida",
    ],
    outcomePrimaryCta: "Organizar fotos del viaje en una carga",
    outcomeSecondaryCta: "Ver funciones",
    featuresTitle: "Funciones de apoyo",
    featuresLead: "Solo apoyan el flujo.",
    features: [
      {
        title: "Ajuste ligero de grupos",
        text: "Puedes ajustar grupos automaticos solo cuando sea necesario.",
      },
      {
        title: "Publicacion opcional",
        text: "Publicar es opcional.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        question: "Puedo subir fotos de varios dias en una sola vez?",
        answer: "Si. Puedes hacer una carga en lote de todo el viaje.",
      },
      {
        question: "Tengo que ordenar manualmente?",
        answer: "No. Las fotos se ordenan automaticamente por fecha y hora.",
      },
      {
        question: "Si publico, cualquiera puede verlo?",
        answer: "Publicar es opcional. La pagina publica se puede compartir por link y puede aparecer en buscadores.",
        linkLabel: "Leer las reglas de la comunidad.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  pt: {
    metaTitle: "MomentBook — Organizacao automatica de fotos de viagem",
    metaDescription: "Envie as fotos da viagem em lote e o app organiza por data e hora para revisar em timeline.",
    heroTitle: "Envie suas fotos da viagem uma vez. Elas se organizam por data e hora.",
    heroSubtitle: "Fluxo direto: envio em lote, organizacao automatica e recap da viagem.",
    heroTrackingCta: "Ver envio em lote",
    heroPhotoCta: "Ver organizacao automatica",
    keyFactsTitle: "Fatos principais",
    keyFacts: [
      "Envio em lote das fotos da viagem",
      "Organizacao automatica por data e hora",
      "Recap da viagem em timeline clara",
      "Privado por padrao; publicar e opcional",
      "Exportacao ZIP para guardar, compartilhar ou backup",
    ],
    flowTitle: "Envio em lote -> organizacao automatica -> recap",
    flowLead: "Tres etapas em um fluxo claro.",
    flows: [
      {
        id: "upload",
        title: "1. Envio em lote",
        summary: "Envie de uma vez as fotos tiradas durante a viagem.",
        steps: [
          "Selecione fotos de varios dias ao mesmo tempo.",
          "Os horarios originais de captura sao mantidos.",
          "Depois do envio, voce vai direto para organizar.",
        ],
      },
      {
        id: "organize",
        title: "2. Organizacao automatica por data e hora",
        summary: "O app posiciona as fotos em ordem cronologica automaticamente.",
        steps: [
          "Fotos com horario proximo viram momentos agrupados.",
          "A timeline da viagem e criada automaticamente.",
          "Ajuste apenas quando necessario.",
        ],
      },
      {
        id: "recap",
        title: "3. Recap da viagem",
        summary: "Revise a viagem naturalmente com a timeline ja organizada.",
        steps: [
          "Veja a viagem completa por data em um olhar.",
          "Volte rapido aos momentos que quer lembrar.",
          "Exporte ZIP para guardar ou compartilhar direto.",
        ],
      },
    ],
    screenshotTitle: "Telas do app",
    screenshotLead: "Visao rapida do envio ao recap.",
    outcomeTitle: "Revise uma viagem ja organizada",
    outcomeLead: "Voce envia as fotos; o app cuida da organizacao.",
    outcomeHighlights: [
      "Fotos da viagem em timeline organizada por data",
      "Menos trabalho manual, mais foco em recordar",
      "Compartilhar e opcional; o pessoal e o padrao",
    ],
    outcomePrimaryCta: "Organizar fotos da viagem em um envio",
    outcomeSecondaryCta: "Ver recursos",
    featuresTitle: "Recursos de apoio",
    featuresLead: "Apenas ajudam o fluxo.",
    features: [
      {
        title: "Ajuste leve de grupos",
        text: "Ajuste grupos automaticos somente quando precisar.",
      },
      {
        title: "Publicacao opcional",
        text: "Publicar e opcional.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        question: "Posso enviar fotos de varios dias de uma vez?",
        answer: "Sim. Voce pode enviar em lote tudo da viagem.",
      },
      {
        question: "Preciso organizar manualmente?",
        answer: "Nao. As fotos sao organizadas automaticamente por data e hora.",
      },
      {
        question: "Se publicar, qualquer pessoa ve?",
        answer: "Publicar e opcional. A pagina publica pode ser compartilhada por link e pode aparecer em buscadores.",
        linkLabel: "Leia as regras da comunidade.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  fr: {
    metaTitle: "MomentBook — Organisation automatique des photos de voyage",
    metaDescription: "Importez les photos du voyage en lot et l'app les classe par date et heure pour les revoir en timeline.",
    heroTitle: "Importez vos photos de voyage une fois. Elles se classent par date et heure.",
    heroSubtitle: "Flux simple : import en lot, organisation automatique, puis recap du voyage.",
    heroTrackingCta: "Voir l'import en lot",
    heroPhotoCta: "Voir l'organisation auto",
    keyFactsTitle: "Faits principaux",
    keyFacts: [
      "Import en lot des photos du voyage",
      "Organisation auto par date et heure",
      "Recap du voyage dans une timeline claire",
      "Prive par defaut ; publication optionnelle",
      "Export ZIP pour conserver, partager ou sauvegarder",
    ],
    flowTitle: "Import en lot -> organisation auto -> recap",
    flowLead: "Trois etapes dans un seul flux.",
    flows: [
      {
        id: "upload",
        title: "1. Import en lot",
        summary: "Importez d'un coup les photos prises pendant le voyage.",
        steps: [
          "Selectionnez des photos de plusieurs jours en une fois.",
          "Les horodatages d'origine sont conserves.",
          "Apres import, vous passez directement a l'organisation.",
        ],
      },
      {
        id: "organize",
        title: "2. Organisation auto par date et heure",
        summary: "L'app range automatiquement les photos dans l'ordre chronologique.",
        steps: [
          "Les photos proches dans le temps sont groupees en moments.",
          "La timeline du voyage est creee automatiquement.",
          "Ajustez seulement si necessaire.",
        ],
      },
      {
        id: "recap",
        title: "3. Recap du voyage",
        summary: "Revoyez naturellement le voyage depuis la timeline organisee.",
        steps: [
          "Voyez tout le voyage par date en un coup d'oeil.",
          "Revenez vite aux moments que vous voulez garder en memoire.",
          "Exportez en ZIP pour conserver ou partager directement.",
        ],
      },
    ],
    screenshotTitle: "Ecrans de l'app",
    screenshotLead: "Apercu rapide de l'import au recap.",
    outcomeTitle: "Revoir un voyage deja organise",
    outcomeLead: "Vous importez les photos ; l'app fait l'organisation.",
    outcomeHighlights: [
      "Photos du voyage en timeline datee et claire",
      "Moins de tri manuel, plus de place pour le souvenir",
      "Partager est optionnel ; le personnel reste la base",
    ],
    outcomePrimaryCta: "Organiser les photos du voyage en un import",
    outcomeSecondaryCta: "Voir les fonctions",
    featuresTitle: "Fonctions de soutien",
    featuresLead: "Elles accompagnent le flux.",
    features: [
      {
        title: "Ajustement leger des groupes",
        text: "Ajustez les groupes automatiques seulement si necessaire.",
      },
      {
        title: "Publication optionnelle",
        text: "Publier est optionnel.",
      },
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Puis-je importer des photos de plusieurs jours en une fois?",
        answer: "Oui. Vous pouvez importer en lot toutes les photos du voyage.",
      },
      {
        question: "Dois-je trier manuellement?",
        answer: "Non. Les photos sont organisees automatiquement par date et heure.",
      },
      {
        question: "Si je publie, tout le monde peut voir?",
        answer: "La publication est optionnelle. La page publique peut etre partagee par lien et peut apparaitre dans les moteurs de recherche.",
        linkLabel: "Lire les regles de la communaute.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  th: {
    metaTitle: "MomentBook — จัดรูปทริปอัตโนมัติ",
    metaDescription: "อัปโหลดรูปทริปแบบชุดเดียว แล้วแอปจะจัดตามวันและเวลาให้อัตโนมัติ เพื่อทบทวนได้ง่าย",
    heroTitle: "อัปโหลดรูปทริปครั้งเดียว แล้วระบบจัดตามวันเวลาให้เอง",
    heroSubtitle: "โฟลว์ชัดเจน 3 ขั้นตอน: อัปโหลดแบบชุดเดียว จัดอัตโนมัติ และทบทวนทริป",
    heroTrackingCta: "ดูขั้นตอนอัปโหลด",
    heroPhotoCta: "ดูขั้นตอนจัดอัตโนมัติ",
    keyFactsTitle: "ข้อเท็จจริงสำคัญ",
    keyFacts: [
      "อัปโหลดรูปทริปแบบชุดเดียว",
      "จัดเรียงอัตโนมัติตามวันและเวลา",
      "ทบทวนทริปผ่านไทม์ไลน์ที่อ่านง่าย",
      "ค่าเริ่มต้นเป็นส่วนตัว การเผยแพร่เป็นตัวเลือก",
      "ส่งออก ZIP เพื่อเก็บ แชร์ หรือสํารองได้",
    ],
    flowTitle: "อัปโหลดแบบชุดเดียว -> จัดอัตโนมัติ -> ทบทวน",
    flowLead: "ครบใน 3 ขั้นตอน",
    flows: [
      {
        id: "upload",
        title: "1. อัปโหลดแบบชุดเดียว",
        summary: "เลือกรูปจากทริประยะหลายวันแล้วอัปโหลดพร้อมกันครั้งเดียว",
        steps: [
          "เลือกรูปจากหลายวันพร้อมกันได้",
          "ข้อมูลเวลาเดิมของรูปจะถูกเก็บไว้",
          "อัปโหลดเสร็จแล้วเข้าสู่การจัดเรียงทันที",
        ],
      },
      {
        id: "organize",
        title: "2. จัดอัตโนมัติตามวัน/เวลา",
        summary: "แอปจัดรูปตามลำดับเวลาให้อัตโนมัติ",
        steps: [
          "รูปที่เวลาใกล้กันจะถูกรวมเป็นช่วงเวลา",
          "ไทม์ไลน์ของทริปถูกสร้างให้อัตโนมัติ",
          "ปรับเฉพาะจุดที่ต้องการเท่านั้น",
        ],
      },
      {
        id: "recap",
        title: "3. ทบทวนทริป",
        summary: "ย้อนดูการเดินทางได้ง่ายจากไทม์ไลน์ที่จัดเรียบร้อยแล้ว",
        steps: [
          "เห็นภาพรวมทริปทั้งหมดตามวันในมุมมองเดียว",
          "กลับไปดูช่วงที่อยากจำได้รวดเร็ว",
          "ส่งออก ZIP เพื่อเก็บหรือแชร์ตรงได้",
        ],
      },
    ],
    screenshotTitle: "ภาพหน้าจอในแอป",
    screenshotLead: "ดูโฟลว์ตั้งแต่อัปโหลดจนถึงทบทวนอย่างรวดเร็ว",
    outcomeTitle: "ทบทวนทริปที่จัดไว้แล้วได้ทันที",
    outcomeLead: "คุณอัปโหลดรูป ส่วนการจัดเรียงให้แอปดูแล",
    outcomeHighlights: [
      "รูปทริปถูกจัดเป็นไทม์ไลน์ตามวันอย่างชัดเจน",
      "ลดภาระการจัดเอง ให้โฟกัสกับการทบทวน",
      "การแชร์เป็นตัวเลือก ค่าเริ่มต้นคือบันทึกส่วนตัว",
    ],
    outcomePrimaryCta: "จัดรูปทริปในครั้งเดียว",
    outcomeSecondaryCta: "ดูฟีเจอร์",
    featuresTitle: "องค์ประกอบที่ช่วยให้ลื่นไหล",
    featuresLead: "รายละเอียดเล็กๆ เพื่อช่วยกระบวนการ.",
    features: [
      {
        title: "ปรับกลุ่มอัตโนมัติแบบเบาๆ",
        text: "แก้ไขกลุ่มที่ระบบจัดให้ได้เมื่อจำเป็น",
      },
      {
        title: "เผยแพร่แบบเลือกได้",
        text: "การเผยแพร่เป็นตัวเลือก.",
      },
    ],
    faqTitle: "คำถามที่พบบ่อย",
    faqs: [
      {
        question: "อัปโหลดรูปหลายวันในครั้งเดียวได้ไหม?",
        answer: "ได้ คุณสามารถเลือกและอัปโหลดรูปทั้งทริปแบบชุดเดียวได้",
      },
      {
        question: "ต้องจัดเรียงเองไหม?",
        answer: "ไม่ต้อง แอปจะจัดตามวันและเวลาให้อัตโนมัติ",
      },
      {
        question: "ถ้าเผยแพร่ ทุกคนเห็นไหม?",
        answer: "การเผยแพร่เป็นตัวเลือก หน้าเว็บสาธารณะสามารถแชร์ด้วยลิงก์และอาจถูกค้นหาได้.",
        linkLabel: "อ่านคู่มือชุมชน.",
        linkHref: "/community-guidelines",
      },
    ],
  },
  vi: {
    metaTitle: "MomentBook — Tu dong sap xep anh du lich",
    metaDescription: "Tai anh du lich theo lo, ung dung tu sap xep theo ngay gio de ban de dang recap chuyen di.",
    heroTitle: "Tai anh du lich mot lan. Ung dung tu sap xep theo ngay gio.",
    heroSubtitle: "Luong don gian: tai len hang loat, tu dong sap xep, roi recap chuyen di.",
    heroTrackingCta: "Xem buoc tai len",
    heroPhotoCta: "Xem buoc tu dong sap xep",
    keyFactsTitle: "Su that quan trong",
    keyFacts: [
      "Tai len hang loat anh du lich",
      "Tu dong sap xep theo ngay gio",
      "Recap chuyen di bang timeline ro rang",
      "Rieng tu mac dinh; dang bai la tuy chon",
      "Xuat ZIP de luu, chia se hoac sao luu",
    ],
    flowTitle: "Tai len hang loat -> tu dong sap xep -> recap",
    flowLead: "3 buoc trong mot luong ro rang.",
    flows: [
      {
        id: "upload",
        title: "1. Tai len hang loat",
        summary: "Tai mot lan tat ca anh chup trong chuyen di.",
        steps: [
          "Chon anh cua nhieu ngay cung mot luc.",
          "Thoi gian chup goc duoc giu nguyen.",
          "Tai xong la vao buoc sap xep.",
        ],
      },
      {
        id: "organize",
        title: "2. Tu dong sap xep theo ngay/gio",
        summary: "Ung dung tu dat anh theo thu tu thoi gian.",
        steps: [
          "Anh gan gio se duoc nhom thanh khoanh khac.",
          "Timeline cua chuyen di duoc tao tu dong.",
          "Chi can chinh sua khi can.",
        ],
      },
      {
        id: "recap",
        title: "3. Recap chuyen di",
        summary: "Nhin lai hanh trinh tu nhien voi timeline da sap xep.",
        steps: [
          "Xem toan bo chuyen di theo ngay trong mot man hinh.",
          "Quay lai nhanh nhung khoanh khac ban muon nho.",
          "Xuat ZIP de luu ca nhan hoac chia se truc tiep.",
        ],
      },
    ],
    screenshotTitle: "Man hinh ung dung",
    screenshotLead: "Xem nhanh luong tu tai len den recap.",
    outcomeTitle: "Nhin lai chuyen di da duoc sap xep",
    outcomeLead: "Ban tai anh; ung dung lo phan sap xep.",
    outcomeHighlights: [
      "Anh du lich duoc sap xep thanh timeline theo ngay",
      "Giam cong viec thu cong, tap trung vao recap",
      "Chia se la tuy chon, mac dinh la ghi nho ca nhan",
    ],
    outcomePrimaryCta: "Sap xep anh du lich trong mot lan tai",
    outcomeSecondaryCta: "Xem tinh nang",
    featuresTitle: "Tinh nang ho tro",
    featuresLead: "Chi de ho tro dong chay.",
    features: [
      {
        title: "Dieu chinh nhe nhom tu dong",
        text: "Ban co the dieu chinh nhom tu dong khi that su can.",
      },
      {
        title: "Cong khai tuy chon",
        text: "Cong khai la tuy chon.",
      },
    ],
    faqTitle: "Cau hoi thuong gap",
    faqs: [
      {
        question: "Toi co the tai anh cua nhieu ngay trong mot lan khong?",
        answer: "Co. Ban co the tai len hang loat toan bo anh trong chuyen di.",
      },
      {
        question: "Toi co can sap xep thu cong khong?",
        answer: "Khong. Anh duoc tu dong sap xep theo ngay va gio.",
      },
      {
        question: "Neu cong khai thi ai cung xem duoc?",
        answer: "Cong khai la tuy chon. Trang cong khai co the chia se bang lien ket va co the duoc tim thay.",
        linkLabel: "Doc huong dan cong dong.",
        linkHref: "/community-guidelines",
      },
    ],
  },
};

const screenshotAltByKey: Record<AppScreenshotKey, string> = {
  intro: "MomentBook intro screen",
  tracking: "MomentBook travel photo upload screen",
  photos: "MomentBook photo organization screen",
  timeline: "MomentBook journey timeline screen",
};

function getHowItWorksContent(lang: Language): HowItWorksContent {
  return howItWorksContent[lang] ?? howItWorksContent.en;
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHowItWorksContent(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/about"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/about"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHowItWorksContent(lang);
  const essentials = aboutEssentialsContent[lang] ?? aboutEssentialsContent.en;
  const timelineExportInfo = timelineExportInfoByLang[lang] ?? timelineExportInfoByLang.en;
  const primaryFlowAnchor = content.flows[0] ? `#${content.flows[0].id}` : "#";
  const secondaryFlowAnchor = content.flows[1]
    ? `#${content.flows[1].id}`
    : primaryFlowAnchor;
  const screenshots = getLocalizedScreenshotGallery(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MomentBook",
        item: `${siteUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.metaTitle.split(" — ")[0] || "About",
        item: `${siteUrl}/${lang}/about`,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{content.heroSubtitle}</p>
          <div className={styles.heroActions}>
            <a className={styles.actionButtonPrimary} href={primaryFlowAnchor}>
              {content.heroTrackingCta}
            </a>
            <a className={styles.actionButtonGhost} href={secondaryFlowAnchor}>
              {content.heroPhotoCta}
            </a>
          </div>
        </div>
      </header>

      <section className={styles.keyFactsSection}>
        <div className={styles.keyFactsInner}>
          <h2 className={styles.keyFactsTitle}>{content.keyFactsTitle}</h2>
          <ul className={styles.keyFactsList}>
            {content.keyFacts.map((fact, idx) => (
              <li key={`keyfact-${idx}`} className={styles.keyFactItem}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.flowTitle}</h2>
          <p className={styles.sectionLead}>{content.flowLead}</p>
        </header>
        <div className={styles.flowGrid}>
          {content.flows.map((flow) => (
            <article key={flow.id} id={flow.id} className={styles.flowCard}>
              <header className={styles.flowHeader}>
                <h3 className={styles.flowTitle}>{flow.title}</h3>
                <p className={styles.flowSummary}>{flow.summary}</p>
              </header>
              <ol className={styles.stepList}>
                {flow.steps.map((step, index) => (
                  <li key={`${flow.id}-${index}`} className={styles.stepItem}>
                    <span className={styles.stepBadge}>{index + 1}</span>
                    <span className={styles.stepText}>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.screenshotTitle}</h2>
          <p className={styles.sectionLead}>{content.screenshotLead}</p>
        </header>
        <div className={styles.screenshotGrid}>
          {screenshots.map((screenshot) => (
            <div key={screenshot.src} className={styles.screenshotCard}>
              <DeviceMock
                className={styles.screenshotDevice}
                screenClassName={deviceStyles.screenMedia}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshotAltByKey[screenshot.key]}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 960px) 42vw, 300px"
                  className={deviceStyles.screenImage}
                />
              </DeviceMock>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.outcomeCard}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.outcomeTitle}</h2>
            <p className={styles.sectionLead}>{content.outcomeLead}</p>
          </header>
          <ul className={styles.outcomeList}>
            {content.outcomeHighlights.map((item, index) => (
              <li key={`outcome-${index}`} className={styles.outcomeItem}>
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.sectionActions}>
            <Link className={styles.actionButtonPrimary} href={`/${lang}/download`}>
              {content.outcomePrimaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.essentialsCard}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{essentials.title}</h2>
            <p className={styles.sectionLead}>{essentials.lead}</p>
          </header>
          <h3 className={styles.essentialsTitle}>{essentials.principlesTitle}</h3>
          <ul className={styles.essentialsList}>
            {essentials.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={styles.essentialsTitle}>{essentials.privacyTitle}</h3>
          <p className={styles.essentialsText}>{essentials.privacyText}</p>
          <h3 className={styles.essentialsTitle}>{timelineExportInfo.title}</h3>
          <p className={styles.essentialsText}>{timelineExportInfo.text}</p>
          <p className={styles.essentialsText}>
            <Link href={`/${lang}/faq`} className={styles.faqLink}>
              {essentials.moreFaqLink}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
