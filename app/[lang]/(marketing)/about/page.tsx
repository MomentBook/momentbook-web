import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
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
      "Two ways to begin",
      "Private by default",
      "Quiet sharing by link",
      "Export/share/backup without publishing",
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
      "현재·과거 여정을 시간·공간으로 정리",
      "두 가지 시작: 트래킹 또는 사진",
      "기본은 비공개, 필요할 때만 게시",
      "파일 저장·외부 SNS 공유·드라이브 보관 지원",
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
      "二つの始め方",
      "デフォルトは非公開",
      "リンクで静かな共有",
      "公開しなくても保存・共有・バックアップ可能",
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
      "两种开始方式",
      "默认私密",
      "通过链接安静分享",
      "不发布也可保存、分享、备份",
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
      "Dos formas de empezar",
      "Privado por defecto",
      "Compartir en calma por enlace",
      "Guardar, compartir y respaldo sin publicar",
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
      "Duas formas de comecar",
      "Privado por padrao",
      "Compartilhar por link",
      "Salvar, compartilhar e backup sem publicar",
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
      "Deux facons de commencer",
      "Prive par defaut",
      "Partage par lien",
      "Conserver, partager et sauvegarder sans publier",
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
      "สองวิธีเริ่มต้น",
      "เป็นส่วนตัวโดยค่าเริ่มต้น",
      "แชร์ด้วยลิงก์",
      "บันทึก แชร์ และสํารองได้แม้ไม่เผยแพร่",
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
      "Hai cach bat dau",
      "Rieng tu mac dinh",
      "Chia se bang lien ket",
      "Luu, chia se va sao luu duoc ma khong can dang bai",
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
    metaTitle: "Two ways to begin — MomentBook",
    metaDescription: "Track a journey or organize with photos only. Both become a calm, organized journey you can return to.",
    heroTitle: "Two ways to record a journey",
    heroSubtitle: "Track as you move, or start with photos only. Both lead to an organized journey you can return to.",
    heroTrackingCta: "Record with tracking",
    heroPhotoCta: "Organize with photos",
    keyFactsTitle: "Key facts",
    keyFacts: [
      "Two ways to start: tracking-based journey or photo-only organization",
      "Private by default; publishing is optional and creates a unique public page",
      "No social features: no feeds, likes, or rankings",
      "You can export/share/backup your journey without publishing",
    ],
    flowTitle: "Two paths, one destination",
    flowLead: "Different starts, same journey.",
    flows: [
      {
        id: "tracking",
        title: "Tracking-based journey",
        summary: "For days when you want time and place to gather as you move.",
        steps: [
          "Start tracking from the home screen.",
          "Moments gather as you move.",
          "Finish and review the journey.",
        ],
      },
      {
        id: "photo",
        title: "Photo-only organization",
        summary: "If tracking feels heavy, photos alone are enough.",
        steps: [
          "Select photos to organize.",
          "Photos group into moments.",
          "Adjust and review.",
        ],
      },
    ],
    screenshotTitle: "App screens",
    screenshotLead: "A quick look at the flow.",
    outcomeTitle: "Where both paths meet",
    outcomeLead: "Different starts, same destination.",
    outcomeHighlights: [
      "Memories shaped as journeys, not a feed.",
      "Organized moments at a glance.",
      "Sharing is optional; keeping it personal is the default.",
    ],
    outcomePrimaryCta: "Download the app",
    outcomeSecondaryCta: "See supporting features",
    featuresTitle: "Supporting features",
    featuresLead: "Details that support the flow.",
    features: [
      {
        title: "Add photos after tracking",
        text: "Upload photos after finishing.",
      },
      {
        title: "Optional publishing",
        text: "Publishing is optional.",
      },
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        question: "Do I have to track?",
        answer: "No. You can organize with photos only.",
      },
      {
        question: "When can I add photos?",
        answer: "After finishing in tracking; in photo-only you start with photos.",
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
    metaTitle: "MomentBook — 여정을 기록하는 두 가지 방법",
    metaDescription: "현재와 과거의 여정을 시간과 공간으로 묶어 정리하고, 회상할 수 있게 돕습니다.",
    heroTitle: "여정을 기록하는 두 가지 방법",
    heroSubtitle: "트래킹 또는 사진으로 시작해, 여정을 시간과 공간 기준으로 정리해 남깁니다.",
    heroTrackingCta: "트래킹으로 기록하기",
    heroPhotoCta: "사진만으로 정리하기",
    keyFactsTitle: "핵심 사실",
    keyFacts: [
      "현재·과거 여정을 시간과 공간으로 묶어 정리하고 회상을 돕습니다",
      "두 가지 시작 방법: 트래킹 기반 여정 또는 사진만으로 정리",
      "기본적으로 비공개이며, 게시 여부는 선택할 수 있습니다",
      "정리한 여정은 파일 저장, 외부 SNS 공유, 드라이브 보관이 가능합니다",
    ],
    flowTitle: "두 가지 시작, 같은 목적지",
    flowLead: "시작은 달라도 결과는 같습니다.",
    flows: [
      {
        id: "tracking",
        title: "트래킹 기반 여정",
        summary: "이동하면서 시간과 장소를 모으고 싶을 때.",
        steps: [
          "홈에서 트래킹으로 시작합니다.",
          "이동하며 순간이 모입니다.",
          "마무리하고 여정을 확인합니다.",
        ],
      },
      {
        id: "photo",
        title: "사진만으로 정리",
        summary: "트래킹이 부담스럽다면 사진만으로도 가능합니다.",
        steps: [
          "정리할 사진을 고릅니다.",
          "시간·위치로 순간이 묶입니다.",
          "보정하고 여정을 확인합니다.",
        ],
      },
    ],
    screenshotTitle: "앱 화면 미리보기",
    screenshotLead: "기록 흐름을 간단히 확인하세요.",
    outcomeTitle: "두 흐름이 만나는 지점",
    outcomeLead: "어떤 시작이든 여정으로 모입니다.",
    outcomeHighlights: [
      "기억을 피드가 아니라 시간·공간 맥락의 여정으로 정리",
      "현재 기록과 과거 기록을 함께 모아 회상하기 쉬운 구조",
      "공유는 선택, 기본은 개인 기록",
    ],
    outcomePrimaryCta: "앱 다운로드",
    outcomeSecondaryCta: "기능 더 보기",
    featuresTitle: "흐름을 돕는 요소",
    featuresLead: "작은 기능은 흐름을 돕기만 합니다.",
    features: [
      {
        title: "마무리 후 사진 추가",
        text: "마무리 이후에 사진을 더할 수 있습니다.",
      },
      {
        title: "선택적 게시",
        text: "게시 여부는 선택입니다.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        question: "트래킹은 필수인가요?",
        answer: "아니요. 트래킹이 없어도 정리할 수 있습니다.",
      },
      {
        question: "사진은 언제 추가하나요?",
        answer: "트래킹은 마무리 후 추가, 사진만 흐름은 시작부터 선택합니다.",
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
    metaTitle: "MomentBook — 旅を記録する二つの方法",
    metaDescription: "トラッキングで記録するか、写真だけで整理するか。どちらも整理された旅につながります。",
    heroTitle: "旅を記録する二つの方法",
    heroSubtitle: "トラッキングでも写真だけでも。整理された旅になります。",
    heroTrackingCta: "トラッキングで記録する",
    heroPhotoCta: "写真だけで整理する",
    keyFactsTitle: "重要な事実",
    keyFacts: [
      "二つの始め方：トラッキング起点の旅または写真だけで整理",
      "デフォルトで非公開；公開は任意で固有の公開ページを作成",
      "ソーシャル機能なし：フィード、いいね、ランキングなし",
      "公開しなくても旅をZIPで保存・共有・バックアップできます",
    ],
    flowTitle: "二つの始まり、同じ行き先",
    flowLead: "始まりは違っても、行き先は同じです。",
    flows: [
      {
        id: "tracking",
        title: "トラッキング起点の旅",
        summary: "移動しながら時間と場所を集めたい日。",
        steps: [
          "ホームからトラッキングを開始します。",
          "移動の中で瞬間が集まります。",
          "終えて旅を確認します。",
        ],
      },
      {
        id: "photo",
        title: "写真だけで整理",
        summary: "トラッキングが負担なら写真だけでも。",
        steps: [
          "整理したい写真を選びます。",
          "写真が瞬間にまとまります。",
          "調整して旅を確認します。",
        ],
      },
    ],
    screenshotTitle: "アプリ画面の流れ",
    screenshotLead: "流れを短く確認できます。",
    outcomeTitle: "二つの流れが合流するところ",
    outcomeLead: "どの始め方でも同じ場所へ。",
    outcomeHighlights: [
      "記憶をフィードではなく旅として",
      "整理された瞬間をひと目で",
      "共有は任意、基本は個人の記録",
    ],
    outcomePrimaryCta: "アプリをダウンロード",
    outcomeSecondaryCta: "機能を見る",
    featuresTitle: "流れを支える要素",
    featuresLead: "細かな機能は流れを支えるためにあります。",
    features: [
      {
        title: "トラッキング後の写真追加",
        text: "終えた後に写真を追加できます。",
      },
      {
        title: "任意の公開",
        text: "公開は任意です。",
      },
    ],
    faqTitle: "よくある質問",
    faqs: [
      {
        question: "トラッキングは必須ですか？",
        answer: "いいえ。写真だけでも整理できます。",
      },
      {
        question: "写真はいつ追加しますか？",
        answer: "トラッキングは終了後、写真だけの流れは最初から選びます。",
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
    metaTitle: "MomentBook — 记录旅程的两种方式",
    metaDescription: "可以用追踪记录，也可以只用照片整理。两种方式都通向整理后的旅程。",
    heroTitle: "记录旅程的两种方式",
    heroSubtitle: "可用追踪记录，也可只用照片整理。都能得到整理后的旅程。",
    heroTrackingCta: "用追踪记录",
    heroPhotoCta: "只用照片整理",
    keyFactsTitle: "关键事实",
    keyFacts: [
      "两种开始方式：追踪式旅程或仅用照片整理",
      "默认私密；发布是可选的并创建唯一的公开页面",
      "无社交功能：无动态、点赞或排名",
      "即使不发布，也能将旅程导出为 ZIP 保存、分享和备份",
    ],
    flowTitle: "两种起点，同一终点",
    flowLead: "起点不同，终点相同。",
    flows: [
      {
        id: "tracking",
        title: "追踪式旅程",
        summary: "想在移动中收集时间与地点时。",
        steps: [
          "在主屏幕开始追踪。",
          "移动中，瞬间会累积。",
          "结束并查看旅程。",
        ],
      },
      {
        id: "photo",
        title: "照片整理",
        summary: "如果追踪有负担，只用照片也可以。",
        steps: [
          "选择要整理的照片。",
          "照片会分组成瞬间。",
          "调整并查看旅程。",
        ],
      },
    ],
    screenshotTitle: "应用界面一览",
    screenshotLead: "快速了解流程。",
    outcomeTitle: "两条路径的汇合点",
    outcomeLead: "无论从哪开始，都会汇合。",
    outcomeHighlights: [
      "记忆不是信息流，而是旅程",
      "整理后的瞬间一目了然",
      "分享可选，默认是个人记录",
    ],
    outcomePrimaryCta: "下载应用",
    outcomeSecondaryCta: "查看功能",
    featuresTitle: "支持流程的细节",
    featuresLead: "这些功能只为帮助流程。",
    features: [
      {
        title: "追踪后添加照片",
        text: "结束后可以补充照片。",
      },
      {
        title: "可选发布",
        text: "发布是可选的。",
      },
    ],
    faqTitle: "常见问题",
    faqs: [
      {
        question: "必须追踪吗？",
        answer: "不必。只用照片也能整理。",
      },
      {
        question: "照片什么时候添加？",
        answer: "追踪在结束后添加；照片流程从一开始就选。",
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
    metaTitle: "MomentBook — Dos formas de empezar un viaje",
    metaDescription: "Puedes registrar con tracking o ordenar solo con fotos. Ambas llevan a un viaje organizado.",
    heroTitle: "Dos formas de empezar un viaje",
    heroSubtitle: "Puedes registrar con tracking o ordenar solo con fotos. El resultado es un viaje organizado.",
    heroTrackingCta: "Registrar con tracking",
    heroPhotoCta: "Ordenar solo con fotos",
    keyFactsTitle: "Datos clave",
    keyFacts: [
      "Dos formas de empezar: viaje con tracking u organización solo con fotos",
      "Privado por defecto; publicar es opcional y crea una página pública única",
      "Sin funciones sociales: sin feeds, likes ni rankings",
      "Puedes exportar, compartir y respaldar tu viaje sin publicarlo",
    ],
    flowTitle: "Dos inicios, un destino",
    flowLead: "El inicio cambia, el destino es el mismo.",
    flows: [
      {
        id: "tracking",
        title: "Viaje con tracking",
        summary: "Para dias en los que quieres reunir tiempo y lugar mientras te mueves.",
        steps: [
          "Desde la pantalla inicial, inicia el tracking.",
          "Al moverte, los momentos se juntan.",
          "Termina y revisa el viaje.",
        ],
      },
      {
        id: "photo",
        title: "Ordenar solo con fotos",
        summary: "Si el tracking se siente pesado, solo con fotos tambien funciona.",
        steps: [
          "Elige las fotos que quieres ordenar.",
          "Las fotos se agrupan en momentos.",
          "Ajusta y revisa el viaje.",
        ],
      },
    ],
    screenshotTitle: "Pantallas de la app",
    screenshotLead: "Un vistazo rápido al flujo.",
    outcomeTitle: "Donde se unen los dos caminos",
    outcomeLead: "Empieces como empieces, el destino es el mismo.",
    outcomeHighlights: [
      "Recuerdos como viajes, no como feed.",
      "Momentos ordenados de un vistazo.",
      "Compartir es opcional; lo personal es el punto de partida.",
    ],
    outcomePrimaryCta: "Descargar la app",
    outcomeSecondaryCta: "Ver funciones",
    featuresTitle: "Funciones de apoyo",
    featuresLead: "Solo apoyan el flujo.",
    features: [
      {
        title: "Agregar fotos al final",
        text: "En tracking, agrega fotos despues de terminar.",
      },
      {
        title: "Publicacion opcional",
        text: "Publicar es opcional.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        question: "El tracking es obligatorio?",
        answer: "No. Puedes ordenar solo con fotos.",
      },
      {
        question: "Cuando agrego fotos?",
        answer: "En tracking, despues de terminar. En fotos, empiezas seleccionando.",
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
    metaTitle: "MomentBook — Duas formas de iniciar uma jornada",
    metaDescription: "Voce pode registrar com tracking ou organizar so com fotos. Ambos levam a uma jornada organizada.",
    heroTitle: "Duas formas de iniciar uma jornada",
    heroSubtitle: "Voce pode registrar com tracking ou organizar so com fotos. O resultado e uma jornada organizada.",
    heroTrackingCta: "Registrar com tracking",
    heroPhotoCta: "Organizar so com fotos",
    keyFactsTitle: "Fatos principais",
    keyFacts: [
      "Duas formas de começar: jornada com tracking ou organização só com fotos",
      "Privado por padrão; publicar é opcional e cria uma página pública única",
      "Sem recursos sociais: sem feeds, likes ou rankings",
      "Voce pode exportar, compartilhar e fazer backup da jornada sem publicar",
    ],
    flowTitle: "Dois inicios, um destino",
    flowLead: "O inicio muda, o destino e o mesmo.",
    flows: [
      {
        id: "tracking",
        title: "Jornada com tracking",
        summary: "Para dias em que voce quer reunir tempo e lugar enquanto se move.",
        steps: [
          "Na tela inicial, inicie o tracking.",
          "Ao se mover, os momentos se juntam.",
          "Finalize e revise a jornada.",
        ],
      },
      {
        id: "photo",
        title: "Organizar so com fotos",
        summary: "Se o tracking parecer pesado, so com fotos tambem funciona.",
        steps: [
          "Escolha as fotos que quer organizar.",
          "As fotos se agrupam em momentos.",
          "Ajuste e revise a jornada.",
        ],
      },
    ],
    screenshotTitle: "Telas do app",
    screenshotLead: "Veja rapidamente o fluxo.",
    outcomeTitle: "Onde os dois caminhos se encontram",
    outcomeLead: "Comece por onde fizer sentido; o destino e o mesmo.",
    outcomeHighlights: [
      "Memorias como jornadas, nao como feed.",
      "Momentos organizados em um olhar.",
      "Compartilhar e opcional; o pessoal e o padrao.",
    ],
    outcomePrimaryCta: "Baixar o app",
    outcomeSecondaryCta: "Ver recursos",
    featuresTitle: "Recursos de apoio",
    featuresLead: "Apenas ajudam o fluxo.",
    features: [
      {
        title: "Adicionar fotos depois",
        text: "No tracking, adicione fotos apos finalizar.",
      },
      {
        title: "Publicacao opcional",
        text: "Publicar e opcional.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        question: "Tracking e obrigatorio?",
        answer: "Nao. Voce pode organizar so com fotos.",
      },
      {
        question: "Quando adiciono fotos?",
        answer: "No tracking, apos finalizar. No fluxo de fotos, voce comeca escolhendo.",
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
    metaTitle: "MomentBook — Deux facons de commencer un voyage",
    metaDescription: "Vous pouvez enregistrer avec tracking ou organiser uniquement avec des photos. Les deux menent a un voyage organise.",
    heroTitle: "Deux facons de commencer un voyage",
    heroSubtitle: "Enregistrer avec tracking ou organiser avec des photos. Le resultat est un voyage organise.",
    heroTrackingCta: "Enregistrer avec tracking",
    heroPhotoCta: "Organiser avec photos",
    keyFactsTitle: "Faits principaux",
    keyFacts: [
      "Deux façons de commencer : voyage avec tracking ou organisation avec photos uniquement",
      "Privé par défaut ; publier est optionnel et crée une page publique unique",
      "Aucune fonction sociale : pas de feeds, likes ou classements",
      "Vous pouvez exporter, partager et sauvegarder le voyage sans publier",
    ],
    flowTitle: "Deux departs, une destination",
    flowLead: "Le depart change, la destination reste la meme.",
    flows: [
      {
        id: "tracking",
        title: "Voyage avec tracking",
        summary: "Pour les jours ou vous voulez reunir temps et lieux en mouvement.",
        steps: [
          "Depuis l'ecran d'accueil, lancez le tracking.",
          "En bougeant, les moments se rassemblent.",
          "Terminez et revoyez le voyage.",
        ],
      },
      {
        id: "photo",
        title: "Organiser avec photos",
        summary: "Si le tracking semble lourd, les photos seules suffisent.",
        steps: [
          "Choisissez les photos a organiser.",
          "Les photos se groupent en moments.",
          "Ajustez et revoyez le voyage.",
        ],
      },
    ],
    screenshotTitle: "Ecrans de l'app",
    screenshotLead: "Un apercu rapide du flux.",
    outcomeTitle: "Le point de rencontre des deux chemins",
    outcomeLead: "Quel que soit le debut, la destination est la meme.",
    outcomeHighlights: [
      "Des souvenirs en voyages, pas en feed.",
      "Des moments organises d'un seul regard.",
      "Partager est optionnel; le personnel est la base.",
    ],
    outcomePrimaryCta: "Telecharger l'app",
    outcomeSecondaryCta: "Voir les fonctions",
    featuresTitle: "Fonctions de soutien",
    featuresLead: "Elles accompagnent le flux.",
    features: [
      {
        title: "Ajouter des photos apres",
        text: "Dans le tracking, ajoutez des photos apres la fin.",
      },
      {
        title: "Publication optionnelle",
        text: "Publier est optionnel.",
      },
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Le tracking est-il obligatoire?",
        answer: "Non. Vous pouvez organiser seulement avec des photos.",
      },
      {
        question: "Quand ajouter des photos?",
        answer: "Dans le tracking, apres la fin. Dans le flux photo, vous commencez par choisir.",
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
    metaTitle: "MomentBook — สองวิธีเริ่มบันทึกการเดินทาง",
    metaDescription: "บันทึกด้วยการติดตามหรือจัดด้วยรูปเท่านั้นก็ได้ ทั้งสองแบบจบที่การเดินทางที่จัดระเบียบแล้ว.",
    heroTitle: "สองวิธีเริ่มบันทึกการเดินทาง",
    heroSubtitle: "บันทึกด้วยการติดตาม หรือเริ่มจากรูปเท่านั้นก็ได้ ผลลัพธ์คือทริปที่จัดระเบียบแล้ว.",
    heroTrackingCta: "บันทึกด้วยการติดตาม",
    heroPhotoCta: "จัดด้วยรูปเท่านั้น",
    keyFactsTitle: "ข้อเท็จจริงสำคัญ",
    keyFacts: [
      "สองวิธีเริ่มต้น: ทริปแบบติดตามหรือจัดด้วยรูปเท่านั้น",
      "เป็นส่วนตัวโดยค่าเริ่มต้น การเผยแพร่เป็นตัวเลือกและสร้างหน้าสาธารณะเฉพาะ",
      "ไม่มีฟีเจอร์โซเชียล: ไม่มีฟีด ไลค์ หรือการจัดอันดับ",
      "คุณส่งออก แชร์ และสํารองทริปได้โดยไม่ต้องเผยแพร่",
    ],
    flowTitle: "สองจุดเริ่ม ตรงสู่ปลายทางเดียวกัน",
    flowLead: "เริ่มต่างกัน แต่ไปจุดเดียวกัน.",
    flows: [
      {
        id: "tracking",
        title: "การเดินทางแบบติดตาม",
        summary: "เหมาะกับวันที่อยากให้เวลาและสถานที่ถูกรวบรวมระหว่างการเคลื่อนไหว.",
        steps: [
          "เริ่มติดตามจากหน้าจอหลัก.",
          "ขยับไปตามปกติ แล้วช่วงเวลาจะค่อยๆ รวบรวม.",
          "จบและดูทริป.",
        ],
      },
      {
        id: "photo",
        title: "จัดด้วยรูปเท่านั้น",
        summary: "ถ้าการติดตามดูยุ่งยาก รูปอย่างเดียวก็ได้.",
        steps: [
          "เลือกรูปที่อยากจัด.",
          "รูปถูกรวมเป็นช่วงเวลา.",
          "ปรับและดูทริป.",
        ],
      },
    ],
    screenshotTitle: "ภาพหน้าจอในแอป",
    screenshotLead: "ดูภาพรวมได้อย่างรวดเร็ว.",
    outcomeTitle: "จุดที่สองเส้นทางมาบรรจบ",
    outcomeLead: "เริ่มทางไหนก็ไปทางเดียวกัน.",
    outcomeHighlights: [
      "ความทรงจำในรูปของการเดินทาง ไม่ใช่ฟีด",
      "ช่วงเวลาที่จัดไว้ในมุมมองเดียว",
      "การแชร์เป็นตัวเลือก ค่าเริ่มต้นคือบันทึกส่วนตัว",
    ],
    outcomePrimaryCta: "ดาวน์โหลดแอป",
    outcomeSecondaryCta: "ดูฟีเจอร์",
    featuresTitle: "องค์ประกอบที่ช่วยให้ลื่นไหล",
    featuresLead: "รายละเอียดเล็กๆ เพื่อช่วยกระบวนการ.",
    features: [
      {
        title: "เพิ่มรูปหลังจบ",
        text: "ในโฟลว์ติดตาม คุณเพิ่มรูปหลังจากจบได้.",
      },
      {
        title: "เผยแพร่แบบเลือกได้",
        text: "การเผยแพร่เป็นตัวเลือก.",
      },
    ],
    faqTitle: "คำถามที่พบบ่อย",
    faqs: [
      {
        question: "ต้องติดตามไหม?",
        answer: "ไม่จำเป็น รูปอย่างเดียวก็จัดได้.",
      },
      {
        question: "เพิ่มรูปเมื่อไร?",
        answer: "โฟลว์ติดตามเพิ่มหลังจบ ส่วนโฟลว์รูปเริ่มจากการเลือก.",
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
    metaTitle: "MomentBook — Hai cach bat dau hanh trinh",
    metaDescription: "Ban co the ghi lai bang tracking hoac sap xep chi voi anh. Ca hai deu dan toi hanh trinh da duoc sap xep.",
    heroTitle: "Hai cach bat dau hanh trinh",
    heroSubtitle: "Ghi lai bang tracking hoac chi voi anh. Ket qua la hanh trinh da sap xep.",
    heroTrackingCta: "Ghi lai bang tracking",
    heroPhotoCta: "Sap xep chi voi anh",
    keyFactsTitle: "Su that quan trong",
    keyFacts: [
      "Hai cach bat dau: hanh trinh bang tracking hoac sap xep chi voi anh",
      "Rieng tu mac dinh; dang bai la tuy chon va tao trang cong khai doc nhat",
      "Khong co tinh nang xa hoi: khong co nguon tin, thich hoac xep hang",
      "Ban co the xuat, chia se va sao luu hanh trinh ma khong can dang bai",
    ],
    flowTitle: "Hai diem bat dau, mot dich den",
    flowLead: "Bat dau khac nhau, ket qua giong nhau.",
    flows: [
      {
        id: "tracking",
        title: "Hanh trinh bang tracking",
        summary: "Cho nhung ngay ban muon gom thoi gian va dia diem khi di chuyen.",
        steps: [
          "Tu man hinh chinh, bat dau tracking.",
          "Khi di chuyen, cac khoanh khac tu nho lai.",
          "Ket thuc va xem hanh trinh.",
        ],
      },
      {
        id: "photo",
        title: "Sap xep chi voi anh",
        summary: "Neu tracking la ganh nang, chi voi anh cung du.",
        steps: [
          "Chon anh can sap xep.",
          "Anh gom thanh cac khoanh khac.",
          "Dieu chinh va xem hanh trinh.",
        ],
      },
    ],
    screenshotTitle: "Man hinh ung dung",
    screenshotLead: "Xem nhanh dong chay.",
    outcomeTitle: "Noi hai luong gap nhau",
    outcomeLead: "Bat dau tu dau thi ket qua cung mot huong.",
    outcomeHighlights: [
      "Ky niem thanh hanh trinh, khong phai feed.",
      "Khoanh khac da duoc sap xep trong mot cai nhin.",
      "Chia se la tuy chon, mac dinh la ghi nho ca nhan.",
    ],
    outcomePrimaryCta: "Tai ung dung",
    outcomeSecondaryCta: "Xem tinh nang",
    featuresTitle: "Tinh nang ho tro",
    featuresLead: "Chi de ho tro dong chay.",
    features: [
      {
        title: "Them anh sau khi ket thuc",
        text: "Trong luong tracking, ban co the them anh sau khi ket thuc.",
      },
      {
        title: "Cong khai tuy chon",
        text: "Cong khai la tuy chon.",
      },
    ],
    faqTitle: "Cau hoi thuong gap",
    faqs: [
      {
        question: "Tracking co bat buoc khong?",
        answer: "Khong. Ban co the sap xep chi voi anh.",
      },
      {
        question: "Khi nao them anh?",
        answer: "Trong tracking, them sau khi ket thuc. Trong luong anh, bat dau bang viec chon.",
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

const screenshots = [
  {
    src: "/images/how-it-works/home.png",
    alt: "MomentBook home screen",
  },
  {
    src: "/images/how-it-works/current-journey.png",
    alt: "MomentBook current journey tracking screen",
  },
  {
    src: "/images/how-it-works/photos-grid.png",
    alt: "MomentBook photo selection grid",
  },
  {
    src: "/images/how-it-works/organize-photos.png",
    alt: "MomentBook organizing photos screen",
  },
  {
    src: "/images/how-it-works/user-organizing.png",
    alt: "MomentBook user organizing journey screen",
  },
  {
    src: "/images/how-it-works/journey-timeline.png",
    alt: "MomentBook journey timeline screen",
  },
  {
    src: "/images/how-it-works/publish-select.png",
    alt: "MomentBook publish selection screen",
  },
  {
    src: "/images/how-it-works/publish-summary.png",
    alt: "MomentBook published journey summary screen",
  },
];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{content.heroSubtitle}</p>
          <div className={styles.heroActions}>
            <a className={styles.actionButtonPrimary} href="#tracking">
              {content.heroTrackingCta}
            </a>
            <a className={styles.actionButtonGhost} href="#photo">
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
              <div className={styles.screenshotFrame}>
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 220px"
                  className={styles.screenshotImage}
                />
              </div>
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
