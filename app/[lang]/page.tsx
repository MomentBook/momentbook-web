import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { buildAbsoluteAppLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type HomePath = {
  title: string;
  summary: string;
  steps: string[];
  ctaLabel: string;
  ctaAnchor: string;
};

type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  heroDeviceAlt: string;
  tldrTitle: string;
  tldrQuestion: string;
  tldrAnswer: string;
  tldrPoints: string[];
  pathsTitle: string;
  pathsLead: string;
  paths: HomePath[];
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  finalFaqCta: string;
};

const homeContent: Record<Language, HomeContent> = {
  en: {
    metaTitle: "MomentBook — Auto-organize travel photos",
    metaDescription: "Upload travel photos in one batch. MomentBook sorts them by date and time so you can revisit your trip.",
    eyebrow: "MomentBook",
    title: "Upload travel photos once. They organize themselves.",
    lead: "Select all photos from your trip at once. MomentBook arranges them by date and time into a timeline you can revisit easily.",
    primaryCta: "Organize travel photos in one upload",
    secondaryCta: "See auto-organization flow",
    heroDeviceAlt: "Home screen for batch photo upload.",
    tldrTitle: "Quick answer",
    tldrQuestion: "What is MomentBook?",
    tldrAnswer: "MomentBook helps you upload travel photos in one batch, auto-organize them by date and time, and revisit your journey as a clean timeline.",
    tldrPoints: [
      "Batch upload all trip photos at once",
      "Automatic date/time organization",
      "Trip recap through a timeline",
      "Private by default, optional publishing",
      "Export a ZIP timeline to keep, share, or back up in your drive",
    ],
    pathsTitle: "Travel photo organization flow",
    pathsLead: "From upload to recap in three steps.",
    paths: [
      {
        title: "1. Batch upload",
        summary: "Upload photos from your trip in one go.",
        steps: [
          "Select photos across multiple dates at once.",
          "Original capture timestamps stay intact.",
          "Move straight into organization after upload.",
        ],
        ctaLabel: "See batch upload",
        ctaAnchor: "#upload",
      },
      {
        title: "2. Auto-organize by date/time",
        summary: "The app places photos in chronological order automatically.",
        steps: [
          "Nearby timestamps become grouped moments.",
          "A trip timeline is created automatically.",
          "Fine-tune groups only if you need to.",
        ],
        ctaLabel: "See auto-organization",
        ctaAnchor: "#organize",
      },
      {
        title: "3. Trip recap",
        summary: "Review your trip naturally through the organized timeline.",
        steps: [
          "See the full trip at a glance by date.",
          "Jump back to moments you want to remember.",
          "Export as ZIP for personal archive or direct sharing.",
        ],
        ctaLabel: "See recap flow",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "From upload to recap, in one flow",
    finalLead: "MomentBook is available on iOS and Android.",
    finalCta: "Organize travel photos in one upload",
    finalFaqCta: "Common questions",
  },
  ko: {
    metaTitle: "MomentBook — 여행 사진 자동 정리",
    metaDescription: "여행 기간 사진을 한 번에 업로드하면 날짜와 시간순으로 자동 정리해 여행 회고까지 이어집니다.",
    eyebrow: "MomentBook",
    title: "여행 사진, 한 번에 올리면 자동으로 정리됩니다",
    lead: "여행 기간 사진을 일괄 업로드하면 날짜와 시간별로 정리된 타임라인이 만들어져 여행을 더 쉽게 돌아볼 수 있습니다.",
    primaryCta: "여행 사진 한 번에 정리하기",
    secondaryCta: "자동 정리 방식 보기",
    heroDeviceAlt: "여정을 시작하는 홈 화면",
    tldrTitle: "핵심 요약",
    tldrQuestion: "MomentBook은 무엇인가요?",
    tldrAnswer: "MomentBook은 여행 사진을 한 번에 올리면 날짜와 시간 기준으로 자동 정리해, 회고하기 쉬운 타임라인을 만드는 앱입니다.",
    tldrPoints: [
      "여행 기간 사진을 한 번에 일괄 업로드",
      "날짜·시간 기준으로 자동 정리",
      "정리된 타임라인으로 여행 회고",
      "기본은 비공개, 원할 때만 선택적으로 게시",
      "정리한 여정을 파일로 저장하고 외부 SNS 공유·드라이브 보관 가능",
    ],
    pathsTitle: "여행 사진 정리 흐름",
    pathsLead: "일괄 업로드부터 회고까지, 세 단계로 이어집니다.",
    paths: [
      {
        title: "1. 일괄 업로드",
        summary: "여행 기간 동안 찍은 사진을 한 번에 선택해 올립니다.",
        steps: [
          "여러 날짜의 사진을 한 번에 선택합니다.",
          "원본의 촬영 시간 정보가 유지됩니다.",
          "업로드 후 바로 정리 단계로 이어집니다.",
        ],
        ctaLabel: "일괄 업로드 자세히 보기",
        ctaAnchor: "#upload",
      },
      {
        title: "2. 날짜/시간 자동 정리",
        summary: "앱이 사진을 날짜와 시간 순서로 자동 배치합니다.",
        steps: [
          "시간대가 가까운 사진을 순간 단위로 묶습니다.",
          "여행 타임라인이 자동으로 구성됩니다.",
          "필요하면 묶음을 간단히 조정할 수 있습니다.",
        ],
        ctaLabel: "자동 정리 자세히 보기",
        ctaAnchor: "#organize",
      },
      {
        title: "3. 여행 회고",
        summary: "정리된 타임라인으로 여행 흐름을 자연스럽게 돌아봅니다.",
        steps: [
          "날짜 흐름대로 여행 전체를 한눈에 확인합니다.",
          "기억하고 싶은 구간을 다시 찾아볼 수 있습니다.",
          "필요하면 ZIP으로 내보내 개인 보관하거나 공유합니다.",
        ],
        ctaLabel: "회고 흐름 자세히 보기",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "업로드부터 회고까지 한 번에",
    finalLead: "iOS와 Android에서 사용할 수 있습니다.",
    finalCta: "여행 사진 한 번에 정리하기",
    finalFaqCta: "자주 묻는 질문",
  },
  ja: {
    metaTitle: "MomentBook — 旅行写真を自動整理",
    metaDescription: "旅行中の写真をまとめてアップロードすると、日時順に自動整理して振り返りやすいタイムラインになります。",
    eyebrow: "MomentBook",
    title: "旅行写真をまとめてアップロード。自動で整理されます",
    lead: "旅行中の写真を一度に選ぶだけで、日時順のタイムラインが自動で作られ、あとから振り返りやすくなります。",
    primaryCta: "旅行写真をまとめて整理する",
    secondaryCta: "自動整理の流れを見る",
    heroDeviceAlt: "写真をまとめてアップロードするホーム画面",
    tldrTitle: "クイック回答",
    tldrQuestion: "MomentBookとは何ですか？",
    tldrAnswer: "MomentBookは旅行写真をまとめてアップロードすると、日時で自動整理して、振り返りやすいタイムラインにしてくれるアプリです。",
    tldrPoints: [
      "旅行写真を一括アップロード",
      "日時順に自動整理",
      "タイムラインで旅を振り返る",
      "デフォルトで非公開、公開は任意",
      "公開せずにZIPを書き出して保存・共有・ドライブ保管ができます",
    ],
    pathsTitle: "旅行写真の整理フロー",
    pathsLead: "アップロードから振り返りまで、3ステップです。",
    paths: [
      {
        title: "1. 一括アップロード",
        summary: "旅行期間の写真をまとめて一度にアップロードします。",
        steps: [
          "複数日の写真をまとめて選択します。",
          "撮影時刻の情報はそのまま維持されます。",
          "アップロード後すぐに整理へ進みます。",
        ],
        ctaLabel: "一括アップロードを見る",
        ctaAnchor: "#upload",
      },
      {
        title: "2. 日時で自動整理",
        summary: "アプリが写真を日時順に自動で並べます。",
        steps: [
          "近い時刻の写真を瞬間単位にまとめます。",
          "旅のタイムラインが自動で構成されます。",
          "必要なときだけ簡単に調整できます。",
        ],
        ctaLabel: "自動整理を見る",
        ctaAnchor: "#organize",
      },
      {
        title: "3. 旅を振り返る",
        summary: "整理されたタイムラインで旅の流れを見返せます。",
        steps: [
          "日付順で旅全体を一目で確認できます。",
          "思い出したい場面にすぐ戻れます。",
          "ZIPで書き出して保存や直接共有もできます。",
        ],
        ctaLabel: "振り返りの流れを見る",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "アップロードから振り返りまで一つの流れで",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "旅行写真をまとめて整理する",
    finalFaqCta: "よくある質問",
  },
  zh: {
    metaTitle: "MomentBook — 旅行照片自动整理",
    metaDescription: "一次上传旅行期间的照片，应用会按日期和时间自动整理，生成便于回顾的时间线。",
    eyebrow: "MomentBook",
    title: "旅行照片一次上传，自动整理完成",
    lead: "把旅行期间的照片一次选中上传后，系统会按日期和时间整理成时间线，回顾更轻松。",
    primaryCta: "一次整理旅行照片",
    secondaryCta: "查看自动整理流程",
    heroDeviceAlt: "批量上传照片的首页",
    tldrTitle: "快速回答",
    tldrQuestion: "什么是 MomentBook？",
    tldrAnswer: "MomentBook 可将旅行照片一次上传后按日期和时间自动整理，形成便于回顾的旅程时间线。",
    tldrPoints: [
      "旅行照片一键批量上传",
      "按日期与时间自动整理",
      "通过时间线回顾旅行",
      "默认私密，可选发布",
      "可导出 ZIP 用于保存、外部分享或网盘备份",
    ],
    pathsTitle: "旅行照片整理流程",
    pathsLead: "从上传到回顾，共三步。",
    paths: [
      {
        title: "1. 批量上传",
        summary: "一次上传旅行期间拍摄的照片。",
        steps: [
          "可同时选择多个日期的照片。",
          "原始拍摄时间信息会被保留。",
          "上传后直接进入整理步骤。",
        ],
        ctaLabel: "查看批量上传",
        ctaAnchor: "#upload",
      },
      {
        title: "2. 日期/时间自动整理",
        summary: "应用会自动按时间顺序排好照片。",
        steps: [
          "时间相近的照片会聚合为一个瞬间。",
          "旅行时间线会自动生成。",
          "仅在需要时做少量微调即可。",
        ],
        ctaLabel: "查看自动整理",
        ctaAnchor: "#organize",
      },
      {
        title: "3. 旅行回顾",
        summary: "在整理后的时间线上自然回看整段旅行。",
        steps: [
          "按日期一眼查看完整旅程。",
          "快速回到想重看的片段。",
          "可导出 ZIP 进行保存或直接分享。",
        ],
        ctaLabel: "查看回顾流程",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "上传到回顾，一条完整流程",
    finalLead: "可在 iOS 和 Android 使用。",
    finalCta: "一次整理旅行照片",
    finalFaqCta: "常见问题",
  },
  es: {
    metaTitle: "MomentBook — Organiza fotos de viaje automaticamente",
    metaDescription: "Sube las fotos del viaje en una sola carga. La app las ordena por fecha y hora para que puedas repasarlo facilmente.",
    eyebrow: "MomentBook",
    title: "Sube las fotos del viaje una vez. Se ordenan solas.",
    lead: "Selecciona todas las fotos del viaje de una sola vez y MomentBook las organiza por fecha y hora en una linea de tiempo facil de revisar.",
    primaryCta: "Organizar fotos del viaje en una carga",
    secondaryCta: "Ver flujo de organizacion automatica",
    heroDeviceAlt: "Pantalla de inicio con la opcion de iniciar un viaje.",
    tldrTitle: "Respuesta rápida",
    tldrQuestion: "¿Qué es MomentBook?",
    tldrAnswer: "MomentBook te permite subir fotos del viaje en lote, ordenarlas automaticamente por fecha y hora, y volver al viaje en una linea de tiempo clara.",
    tldrPoints: [
      "Carga en lote de fotos del viaje",
      "Orden automatico por fecha y hora",
      "Recap del viaje en timeline",
      "Privado por defecto, publicación opcional",
      "Exporta un ZIP del timeline para guardar, compartir o respaldar en tu nube",
    ],
    pathsTitle: "Flujo para ordenar fotos del viaje",
    pathsLead: "De la carga al recap en tres pasos.",
    paths: [
      {
        title: "1. Carga en lote",
        summary: "Sube de una vez las fotos tomadas durante el viaje.",
        steps: [
          "Selecciona fotos de varios dias al mismo tiempo.",
          "Se mantiene la hora original de cada foto.",
          "Al terminar la carga, pasas directo a la organizacion.",
        ],
        ctaLabel: "Ver carga en lote",
        ctaAnchor: "#upload",
      },
      {
        title: "2. Organizacion automatica por fecha y hora",
        summary: "La app acomoda las fotos en orden cronologico automaticamente.",
        steps: [
          "Las fotos cercanas en tiempo se agrupan en momentos.",
          "Se crea automaticamente la linea de tiempo del viaje.",
          "Solo ajustas grupos si realmente lo necesitas.",
        ],
        ctaLabel: "Ver organizacion automatica",
        ctaAnchor: "#organize",
      },
      {
        title: "3. Recap del viaje",
        summary: "Recorre de forma natural tu viaje con la timeline ya ordenada.",
        steps: [
          "Ve el viaje completo de un vistazo por fecha.",
          "Vuelve rapido a los momentos que quieres recordar.",
          "Exporta ZIP para guardar o compartir directamente.",
        ],
        ctaLabel: "Ver flujo de recap",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "De la carga al recap en un solo flujo",
    finalLead: "MomentBook esta disponible en iOS y Android.",
    finalCta: "Organizar fotos del viaje en una carga",
    finalFaqCta: "Preguntas frecuentes",
  },
  pt: {
    metaTitle: "MomentBook — Organizacao automatica de fotos de viagem",
    metaDescription: "Envie as fotos da viagem de uma vez. O app organiza por data e hora para facilitar a revisao da jornada.",
    eyebrow: "MomentBook",
    title: "Envie as fotos da viagem uma vez. Elas se organizam sozinhas.",
    lead: "Selecione todas as fotos da viagem de uma vez e o MomentBook organiza por data e hora em uma timeline facil de rever.",
    primaryCta: "Organizar fotos da viagem em um envio",
    secondaryCta: "Ver fluxo de organizacao automatica",
    heroDeviceAlt: "Tela inicial com a opcao de iniciar jornada.",
    tldrTitle: "Resposta rápida",
    tldrQuestion: "O que é MomentBook?",
    tldrAnswer: "MomentBook permite enviar fotos da viagem em lote, organizar automaticamente por data e hora e rever a jornada em uma timeline limpa.",
    tldrPoints: [
      "Envio em lote das fotos da viagem",
      "Organizacao automatica por data e hora",
      "Revisao da viagem em timeline",
      "Privado por padrão, publicação opcional",
      "Exporte um ZIP da timeline para guardar, compartilhar ou salvar no seu drive",
    ],
    pathsTitle: "Fluxo de organizacao das fotos da viagem",
    pathsLead: "Do envio ao recap em tres etapas.",
    paths: [
      {
        title: "1. Envio em lote",
        summary: "Envie de uma vez as fotos tiradas durante a viagem.",
        steps: [
          "Selecione fotos de varios dias ao mesmo tempo.",
          "Os horarios originais de captura sao mantidos.",
          "Apos o envio, voce segue direto para a organizacao.",
        ],
        ctaLabel: "Ver envio em lote",
        ctaAnchor: "#upload",
      },
      {
        title: "2. Organizacao automatica por data e hora",
        summary: "O app posiciona as fotos em ordem cronologica automaticamente.",
        steps: [
          "Fotos com horario proximo viram momentos agrupados.",
          "A timeline da viagem e criada automaticamente.",
          "Ajuste grupos apenas quando necessario.",
        ],
        ctaLabel: "Ver organizacao automatica",
        ctaAnchor: "#organize",
      },
      {
        title: "3. Recap da viagem",
        summary: "Reveja naturalmente a viagem com a timeline organizada.",
        steps: [
          "Veja a viagem inteira por data em um unico olhar.",
          "Volte rapido para os momentos que quer lembrar.",
          "Exporte ZIP para guardar ou compartilhar direto.",
        ],
        ctaLabel: "Ver fluxo de recap",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "Do envio ao recap em um unico fluxo",
    finalLead: "MomentBook esta disponivel no iOS e Android.",
    finalCta: "Organizar fotos da viagem em um envio",
    finalFaqCta: "Perguntas frequentes",
  },
  fr: {
    metaTitle: "MomentBook — Organisation automatique des photos de voyage",
    metaDescription: "Importez les photos du voyage en une fois. L'app les classe par date et heure pour faciliter le retour.",
    eyebrow: "MomentBook",
    title: "Importez vos photos de voyage une fois. Elles se rangent toutes seules.",
    lead: "Selectionnez toutes les photos du voyage d'un coup. MomentBook les organise par date et heure en timeline facile a revoir.",
    primaryCta: "Organiser les photos du voyage en un import",
    secondaryCta: "Voir le flux d'organisation automatique",
    heroDeviceAlt: "Ecran d'accueil avec demarrage de voyage.",
    tldrTitle: "Réponse rapide",
    tldrQuestion: "Qu'est-ce que MomentBook ?",
    tldrAnswer: "MomentBook permet d'importer les photos de voyage en lot, de les organiser automatiquement par date et heure, puis de revoir le voyage en timeline claire.",
    tldrPoints: [
      "Import en lot des photos du voyage",
      "Organisation auto par date et heure",
      "Recap du voyage en timeline",
      "Privé par défaut, publication optionnelle",
      "Exportez un ZIP de la timeline pour conserver, partager ou sauvegarder sur votre drive",
    ],
    pathsTitle: "Flux d'organisation des photos de voyage",
    pathsLead: "De l'import au recap en trois etapes.",
    paths: [
      {
        title: "1. Import en lot",
        summary: "Importez d'un coup les photos prises pendant le voyage.",
        steps: [
          "Selectionnez des photos sur plusieurs jours en une fois.",
          "Les horaires de prise de vue sont conserves.",
          "Apres import, vous passez directement a l'organisation.",
        ],
        ctaLabel: "Voir l'import en lot",
        ctaAnchor: "#upload",
      },
      {
        title: "2. Organisation auto par date et heure",
        summary: "L'app place automatiquement les photos dans l'ordre chronologique.",
        steps: [
          "Les photos proches dans le temps sont regroupees en moments.",
          "La timeline du voyage est creee automatiquement.",
          "Ajustez seulement si necessaire.",
        ],
        ctaLabel: "Voir l'organisation auto",
        ctaAnchor: "#organize",
      },
      {
        title: "3. Recap du voyage",
        summary: "Revoyez naturellement le voyage depuis la timeline organisee.",
        steps: [
          "Voyez tout le voyage en un coup d'oeil par date.",
          "Revenez vite aux moments que vous voulez garder en memoire.",
          "Exportez en ZIP pour conserver ou partager directement.",
        ],
        ctaLabel: "Voir le flux de recap",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "De l'import au recap en un seul flux",
    finalLead: "MomentBook est disponible sur iOS et Android.",
    finalCta: "Organiser les photos du voyage en un import",
    finalFaqCta: "Questions fréquentes",
  },
  th: {
    metaTitle: "MomentBook — จัดรูปทริปอัตโนมัติ",
    metaDescription: "อัปโหลดรูปจากทริปครั้งเดียว แล้วแอปจะจัดตามวันและเวลาให้อัตโนมัติ เพื่อทบทวนทริปได้ง่ายขึ้น",
    eyebrow: "MomentBook",
    title: "อัปโหลดรูปทริปครั้งเดียว แล้วระบบจัดให้เอง",
    lead: "เลือกรูปจากทริปทั้งหมดในครั้งเดียว MomentBook จะจัดเรียงตามวันและเวลาเป็นไทม์ไลน์ที่ย้อนดูได้ง่าย",
    primaryCta: "จัดรูปทริปในครั้งเดียว",
    secondaryCta: "ดูโฟลว์จัดอัตโนมัติ",
    heroDeviceAlt: "หน้าจอหลักที่เริ่มการเดินทาง",
    tldrTitle: "คำตอบสั้น",
    tldrQuestion: "MomentBook คืออะไร?",
    tldrAnswer: "MomentBook ช่วยอัปโหลดรูปทริปแบบครั้งเดียว แล้วจัดตามวันและเวลาอัตโนมัติ เพื่อให้ทบทวนการเดินทางได้ง่ายในรูปแบบไทม์ไลน์",
    tldrPoints: [
      "อัปโหลดรูปทริปแบบชุดเดียว",
      "จัดเรียงอัตโนมัติตามวันและเวลา",
      "ทบทวนทริปผ่านไทม์ไลน์",
      "ส่วนตัวเป็นค่าเริ่มต้น การเผยแพร่เป็นตัวเลือก",
      "ส่งออก ZIP เพื่อเก็บ แชร์ภายนอก หรือสํารองไว้ในไดรฟ์ของคุณ",
    ],
    pathsTitle: "โฟลว์จัดรูปทริป",
    pathsLead: "จากอัปโหลดถึงทบทวนใน 3 ขั้นตอน",
    paths: [
      {
        title: "1. อัปโหลดครั้งเดียว",
        summary: "อัปโหลดรูปที่ถ่ายระหว่างทริปทั้งหมดในครั้งเดียว",
        steps: [
          "เลือกรูปจากหลายวันพร้อมกันได้",
          "ข้อมูลเวลาเดิมของรูปจะถูกเก็บไว้",
          "อัปโหลดเสร็จแล้วไปขั้นตอนจัดเรียงทันที",
        ],
        ctaLabel: "ดูขั้นตอนอัปโหลด",
        ctaAnchor: "#upload",
      },
      {
        title: "2. จัดอัตโนมัติตามวัน/เวลา",
        summary: "แอปจะเรียงรูปตามลำดับเวลาให้อัตโนมัติ",
        steps: [
          "รูปที่เวลาใกล้กันจะถูกรวมเป็นช่วงเวลา",
          "ไทม์ไลน์ของทริปถูกสร้างให้อัตโนมัติ",
          "ปรับแต่งเฉพาะจุดที่ต้องการเท่านั้น",
        ],
        ctaLabel: "ดูขั้นตอนจัดอัตโนมัติ",
        ctaAnchor: "#organize",
      },
      {
        title: "3. ทบทวนทริป",
        summary: "ย้อนดูการเดินทางได้อย่างเป็นธรรมชาติจากไทม์ไลน์ที่จัดแล้ว",
        steps: [
          "เห็นภาพรวมทริปทั้งหมดตามวันได้ในหน้าเดียว",
          "กลับไปดูช่วงที่อยากจำได้รวดเร็ว",
          "ส่งออก ZIP เพื่อเก็บหรือแชร์ตรงได้",
        ],
        ctaLabel: "ดูขั้นตอนทบทวน",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "จากอัปโหลดถึงทบทวนในโฟลว์เดียว",
    finalLead: "MomentBook ใช้งานได้บน iOS และ Android.",
    finalCta: "จัดรูปทริปในครั้งเดียว",
    finalFaqCta: "คำถามที่พบบ่อย",
  },
  vi: {
    metaTitle: "MomentBook — Tu dong sap xep anh du lich",
    metaDescription: "Tai anh trong chuyen di len mot lan. Ung dung se sap xep theo ngay va gio de ban de dang nhin lai hanh trinh.",
    eyebrow: "MomentBook",
    title: "Tai anh du lich mot lan. Ung dung tu sap xep.",
    lead: "Chon tat ca anh trong chuyen di cung luc. MomentBook se sap xep theo ngay gio thanh timeline de ban nhin lai de hon.",
    primaryCta: "Sap xep anh du lich trong mot lan tai",
    secondaryCta: "Xem luong tu dong sap xep",
    heroDeviceAlt: "Man hinh chinh voi nut bat dau hanh trinh",
    tldrTitle: "Cau tra loi nhanh",
    tldrQuestion: "MomentBook la gi?",
    tldrAnswer: "MomentBook giup ban tai anh du lich theo lo, tu dong sap xep theo ngay gio va nhin lai chuyen di bang mot timeline ro rang.",
    tldrPoints: [
      "Tai len hang loat anh du lich",
      "Tu dong sap xep theo ngay gio",
      "Nhin lai chuyen di bang timeline",
      "Rieng tu mac dinh, xuat ban tuy chon",
      "Xuat ZIP timeline de luu, chia se ben ngoai hoac sao luu tren drive",
    ],
    pathsTitle: "Luong sap xep anh du lich",
    pathsLead: "Tu tai len den recap trong 3 buoc.",
    paths: [
      {
        title: "1. Tai len hang loat",
        summary: "Tai mot lan tat ca anh chup trong chuyen di.",
        steps: [
          "Chon anh cua nhieu ngay cung mot luc.",
          "Thoi gian chup goc duoc giu nguyen.",
          "Tai xong la chuyen sang buoc sap xep.",
        ],
        ctaLabel: "Xem buoc tai len",
        ctaAnchor: "#upload",
      },
      {
        title: "2. Tu dong sap xep theo ngay/gio",
        summary: "Ung dung tu dat anh theo thu tu thoi gian.",
        steps: [
          "Anh gan gio se duoc nhom thanh khoanh khac.",
          "Timeline cua chuyen di duoc tao tu dong.",
          "Chi can chinh sua khi that su can.",
        ],
        ctaLabel: "Xem buoc tu dong sap xep",
        ctaAnchor: "#organize",
      },
      {
        title: "3. Recap chuyen di",
        summary: "Nhin lai hanh trinh tu nhien voi timeline da sap xep.",
        steps: [
          "Xem toan bo chuyen di theo ngay trong mot man hinh.",
          "Quay lai nhanh nhung khoanh khac ban muon nho.",
          "Xuat ZIP de luu ca nhan hoac chia se truc tiep.",
        ],
        ctaLabel: "Xem luong recap",
        ctaAnchor: "#recap",
      },
    ],
    finalTitle: "Tu tai len den recap trong mot luong",
    finalLead: "MomentBook co san tren iOS va Android.",
    finalCta: "Sap xep anh du lich trong mot lan tai",
    finalFaqCta: "Cau hoi thuong gap",
  },
};

const timelineExportNoteByLang: Record<Language, string> = {
  en: "After organizing a journey into a timeline, you can export a ZIP (images + metadata) to keep for yourself or share directly with others, even without publishing.",
  ko: "자동 정리된 타임라인은 이미지+메타데이터 ZIP으로 내보낼 수 있어, 게시 없이도 개인 보관이나 직접 공유에 활용할 수 있습니다.",
  ja: "旅をタイムラインとして整理した後、画像+メタデータのZIPを書き出して、公開せずに自分で保管したり相手に直接共有できます。",
  zh: "将旅程整理为时间线后，可导出包含图片和元数据的 ZIP，即使不发布也可自行保存或直接分享给他人。",
  es: "Despues de ordenar el viaje en timeline, puedes exportar un ZIP (imagenes + metadatos) para guardarlo o compartirlo directamente, incluso sin publicar.",
  pt: "Depois de organizar a jornada em timeline, voce pode exportar um ZIP (imagens + metadados) para guardar ou compartilhar diretamente, mesmo sem publicar.",
  fr: "Apres avoir organise le voyage en timeline, vous pouvez exporter un ZIP (images + metadonnees) pour le conserver ou le partager directement, meme sans publier.",
  th: "หลังจัดทริปเป็นไทม์ไลน์แล้ว คุณสามารถส่งออก ZIP (รูป+เมทาดาทา) เพื่อเก็บเองหรือแชร์ให้ผู้อื่นได้โดยตรง แม้ไม่ต้องเผยแพร่",
  vi: "Sau khi sap xep hanh trinh thanh timeline, ban co the xuat ZIP (anh + metadata) de tu luu hoac chia se truc tiep, ke ca khi khong dang bai.",
};

function getHomeContent(lang: Language): HomeContent {
  return homeContent[lang] ?? homeContent.en;
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomeContent(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHomeContent(lang);
  const timelineExportNote = timelineExportNoteByLang[lang] ?? timelineExportNoteByLang.en;
  const primaryAboutAnchor = content.paths[0]?.ctaAnchor ?? "";
  const secondaryAboutAnchor = content.paths[1]?.ctaAnchor ?? primaryAboutAnchor;
  const heroDeviceImage = getLocalizedScreenshotPath(lang, "intro");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: buildAbsoluteAppLogoUrl(siteUrl),
    sameAs: [
      "https://apps.apple.com/app/momentbook/id6749165889",
      "https://play.google.com/store/apps/details?id=com.reflectalab.momentbook",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: supportEmail,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MomentBook",
    url: siteUrl,
    description: content.metaDescription,
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <FadeIn>
              <span className={styles.eyebrow}>{content.eyebrow}</span>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p className={styles.heroLead}>{content.lead}</p>
            </FadeIn>
            <FadeIn delay={160}>
              <div className={styles.heroActions}>
                <Link href={`/${lang}/about${primaryAboutAnchor}`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/about${secondaryAboutAnchor}`} className={styles.secondaryButton}>
                  {content.secondaryCta}
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className={styles.heroVisual}>
              <DeviceMock
                className={styles.heroDevice}
                screenClassName={deviceStyles.screenMedia}
              >
                <Image
                  src={heroDeviceImage}
                  alt={content.heroDeviceAlt}
                  fill
                  sizes="(max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
                  className={deviceStyles.screenImage}
                  priority
                />
              </DeviceMock>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.tldrSection}>
        <div className={styles.tldrInner}>
          <h2 className={styles.tldrTitle}>{content.tldrTitle}</h2>
          <div className={styles.tldrCard}>
            <h3 className={styles.tldrQuestion}>{content.tldrQuestion}</h3>
            <p className={styles.tldrAnswer}>{content.tldrAnswer}</p>
            <ul className={styles.tldrPoints}>
              {content.tldrPoints.map((point, idx) => (
                <li key={`tldr-point-${idx}`}>{point}</li>
              ))}
            </ul>
            <p className={styles.tldrNote}>{timelineExportNote}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInnerWide}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.pathsTitle}</h2>
            <p className={styles.sectionLead}>{content.pathsLead}</p>
          </header>
          <div className={styles.pathsGrid}>
            {content.paths.map((path, index) => (
              <div key={`${path.title}-${index}`} className={styles.pathCard}>
                <h3 className={styles.pathTitle}>{path.title}</h3>
                <p className={styles.pathSummary}>{path.summary}</p>
                <ol className={styles.pathSteps}>
                  {path.steps.map((step, stepIndex) => (
                    <li key={`${path.title}-step-${stepIndex}`}>{step}</li>
                  ))}
                </ol>
                <Link
                  href={`/${lang}/about${path.ctaAnchor}`}
                  className={styles.pathLink}
                >
                  {path.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalInner}>
          <h2 className={styles.finalTitle}>{content.finalTitle}</h2>
          <p className={styles.finalLead}>{content.finalLead}</p>
          <div className={styles.finalActions}>
            <Link href={`/${lang}/download`} className={styles.primaryButton}>
              {content.finalCta}
            </Link>
            <Link href={`/${lang}/faq`} className={styles.secondaryButton}>
              {content.finalFaqCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
