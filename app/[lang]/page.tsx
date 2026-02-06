import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

type HomeStep = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

type HomeFeature = {
  title: string;
  text: string;
};

type HomeGalleryItem = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  primaryCta: string;
  secondaryCta: string;
  heroDeviceImage: string;
  heroDeviceAlt: string;
  heroVisualCaption: string;
  howTitle: string;
  howLead: string;
  howSteps: HomeStep[];
  featureTitle: string;
  featureLead: string;
  features: HomeFeature[];
  galleryTitle: string;
  galleryLead: string;
  galleryItems: HomeGalleryItem[];
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  finalNote: string;
};

const homeContent: Partial<Record<Language, HomeContent>> & { en: HomeContent } = {
  en: {
    metaTitle: "MomentBook — A quiet photo-first journal",
    metaDescription: "Organize photos into a calm journey. Add time and place only if you want.",
    eyebrow: "MomentBook",
    title: "A quiet journal that starts with photos",
    lead: "Pick the photos you want to keep. MomentBook gathers them into a calm journey you can return to.",
    note: "Start with photos. If you begin a journey, time and place can gather in the background.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See the photo-first flow",
    heroDeviceImage: "/screenshots/organize-photos.png",
    heroDeviceAlt: "Organizing photos screen with a grid and organize button.",
    heroVisualCaption: "Photos first, then the story settles.",
    howTitle: "Photo-first flow",
    howLead: "A simple sequence for turning photos into a journey.",
    howSteps: [
      {
        title: "Choose the photos to keep",
        text: "Filter by day or time and pick the moments that feel right.",
        image: "/screenshots/photos-picker.png",
        alt: "Photo picker grid with day and time filters.",
      },
      {
        title: "Group them into moments",
        text: "One tap creates small clusters you can name and refine.",
        image: "/screenshots/organize-photos.png",
        alt: "Organizing photos screen with a grid and organize button.",
      },
      {
        title: "Refine the clusters",
        text: "Adjust what belongs together and add titles if you want.",
        image: "/screenshots/user-organizing.png",
        alt: "User organizing screen with photo clusters and timestamps.",
      },
      {
        title: "See the journey timeline",
        text: "Photos and places flow in order when you want to review.",
        image: "/screenshots/journey-timeline.png",
        alt: "Journey timeline showing a place card, map, and photos.",
      },
      {
        title: "Share only when ready",
        text: "Publishing creates a page you can share and later unpublish.",
        image: "/screenshots/published-summary.png",
        alt: "Published journey summary with share and unpublish options.",
      },
    ],
    featureTitle: "Designed for a photo-first start",
    featureLead: "Journeys can grow from photos, and tracking stays optional.",
    features: [
      {
        title: "Photo-first organization",
        text: "Begin by selecting photos. No journey setup is required.",
      },
      {
        title: "Optional journey context",
        text: "Start a journey to gather time and places quietly (with location permission).",
      },
      {
        title: "Moments as chapters",
        text: "Group photos into small clusters you can name and revisit.",
      },
      {
        title: "Timeline view",
        text: "See photos and places in order when you want to look back.",
      },
      {
        title: "Quiet sharing",
        text: "Publishing creates a public page only when you choose.",
      },
      {
        title: "Private by default",
        text: "Anything unshared stays private.",
      },
    ],
    galleryTitle: "From photos to a shareable page",
    galleryLead: "Follow a real flow from selection to sharing.",
    galleryItems: [
      {
        title: "Pick the photos",
        text: "Filter by day or time to choose what stays.",
        image: "/screenshots/photos-picker.png",
        alt: "Photo picker grid with day and time filters.",
      },
      {
        title: "Organize the set",
        text: "Start shaping the story with one organize tap.",
        image: "/screenshots/organize-photos.png",
        alt: "Organizing photos screen with a grid and organize button.",
      },
      {
        title: "Refine moments",
        text: "Clusters appear with timestamps you can adjust.",
        image: "/screenshots/user-organizing.png",
        alt: "User organizing screen with photo clusters and timestamps.",
      },
      {
        title: "Journey timeline",
        text: "Places, maps, and photos settle into order.",
        image: "/screenshots/journey-timeline.png",
        alt: "Journey timeline showing a place card, map, and photos.",
      },
      {
        title: "Select what to publish",
        text: "Choose the photos that should appear in the public journey.",
        image: "/screenshots/publish-select.png",
        alt: "Publish selection view with chosen photos.",
      },
      {
        title: "Published summary",
        text: "Share or unpublish from a single screen.",
        image: "/screenshots/published-summary.png",
        alt: "Published journey summary with share and unpublish options.",
      },
      {
        title: "Optional: start a journey",
        text: "If you want, begin a journey to gather time and place.",
        image: "/screenshots/start-journey.png",
        alt: "Start today’s journey screen with a single call to action.",
      },
      {
        title: "Optional: live summary",
        text: "A gentle overview appears as the day collects itself.",
        image: "/screenshots/current-journey.png",
        alt: "Current journey status with time, photos, places, and map preview.",
      },
    ],
    finalTitle: "Start with the photos you already have",
    finalLead: "MomentBook is available on iOS and Android.",
    finalCta: "Go to download",
    finalNote: "Setup takes about a minute.",
  },
  ko: {
    metaTitle: "MomentBook — 사진으로 시작하는 조용한 기록",
    metaDescription: "사진을 골라 여정으로 정리하세요. 시간과 장소는 원할 때만 모입니다.",
    eyebrow: "MomentBook",
    title: "사진으로 시작하는 조용한 기록",
    lead: "남기고 싶은 사진을 고르면 MomentBook이 조용한 여정으로 모아줍니다.",
    note: "사진부터 시작하세요. 여정을 시작하면 시간과 장소가 배경에서 모입니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "사진 중심 흐름 보기",
    heroDeviceImage: "/screenshots/organize-photos.png",
    heroDeviceAlt: "사진 그리드와 정리 버튼이 있는 화면",
    heroVisualCaption: "사진이 먼저, 이야기는 차분히.",
    howTitle: "사진 중심 흐름",
    howLead: "사진을 여정으로 바꾸는 간단한 순서.",
    howSteps: [
      {
        title: "사진 고르기",
        text: "날짜나 시간으로 필터링해 남길 순간을 선택합니다.",
        image: "/screenshots/photos-picker.png",
        alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
      },
      {
        title: "순간으로 묶기",
        text: "한 번의 정리로 작은 순간 묶음이 만들어집니다.",
        image: "/screenshots/organize-photos.png",
        alt: "사진 그리드와 정리 버튼이 있는 화면.",
      },
      {
        title: "묶음 다듬기",
        text: "이름을 붙이고 필요하면 다시 조정합니다.",
        image: "/screenshots/user-organizing.png",
        alt: "사진 묶음과 타임스탬프가 표시된 화면.",
      },
      {
        title: "여정 타임라인",
        text: "사진과 장소가 순서대로 이어집니다.",
        image: "/screenshots/journey-timeline.png",
        alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
      },
      {
        title: "필요할 때만 게시",
        text: "게시하면 공유 페이지가 만들어지고 언제든 되돌릴 수 있습니다.",
        image: "/screenshots/published-summary.png",
        alt: "공유 및 비공개 전환이 가능한 게시 요약 화면.",
      },
    ],
    featureTitle: "사진 중심으로 시작하기",
    featureLead: "여정은 필요할 때 확장되고, 사진 정리는 기본입니다.",
    features: [
      {
        title: "사진부터 정리",
        text: "여정을 시작하지 않아도 사진만으로 정리할 수 있습니다.",
      },
      {
        title: "선택적 여정 맥락",
        text: "원하면 여정을 시작해 시간과 장소를 조용히 모읍니다(위치 허용 시).",
      },
      {
        title: "순간 묶음",
        text: "사진을 작은 챕터로 나누고 이름을 붙입니다.",
      },
      {
        title: "타임라인 보기",
        text: "사진과 장소의 흐름을 한눈에 확인합니다.",
      },
      {
        title: "조용한 공유",
        text: "원할 때만 게시하고 링크를 공유합니다.",
      },
      {
        title: "기본은 비공개",
        text: "공유 전까지는 외부에 보이지 않습니다.",
      },
    ],
    galleryTitle: "사진에서 공유까지",
    galleryLead: "사진 선택부터 공유 페이지까지의 흐름.",
    galleryItems: [
      {
        title: "사진 선택",
        text: "날짜나 시간으로 필터링해 남길 사진을 고릅니다.",
        image: "/screenshots/photos-picker.png",
        alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
      },
      {
        title: "사진 정리",
        text: "정리 버튼으로 흐름을 시작합니다.",
        image: "/screenshots/organize-photos.png",
        alt: "사진 그리드와 정리 버튼이 있는 화면.",
      },
      {
        title: "순간 다듬기",
        text: "타임스탬프가 붙은 묶음을 조정합니다.",
        image: "/screenshots/user-organizing.png",
        alt: "사진 묶음과 타임스탬프가 표시된 화면.",
      },
      {
        title: "여정 타임라인",
        text: "장소, 지도, 사진이 순서대로 이어집니다.",
        image: "/screenshots/journey-timeline.png",
        alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
      },
      {
        title: "게시 선택",
        text: "공개할 사진을 선택합니다.",
        image: "/screenshots/publish-select.png",
        alt: "선택한 사진이 표시된 게시 선택 화면.",
      },
      {
        title: "게시 요약",
        text: "공유와 비공개 전환을 관리합니다.",
        image: "/screenshots/published-summary.png",
        alt: "공유 및 비공개 전환이 가능한 게시 요약 화면.",
      },
      {
        title: "선택: 여정 시작",
        text: "원하면 하루를 여정으로 시작할 수 있습니다.",
        image: "/screenshots/start-journey.png",
        alt: "오늘의 여정을 시작하는 버튼이 있는 화면.",
      },
      {
        title: "선택: 자동 요약",
        text: "여정을 시작하면 시간과 장소가 요약으로 모입니다.",
        image: "/screenshots/current-journey.png",
        alt: "시간, 사진, 장소와 지도 미리보기를 보여주는 현재 여정 화면.",
      },
    ],
    finalTitle: "이미 있는 사진으로 시작하세요",
    finalLead: "iOS와 Android에서 사용 가능합니다.",
    finalCta: "다운로드 페이지로",
    finalNote: "설정은 1분 정도면 충분합니다.",
  },
  ja: {
    metaTitle: "MomentBook — 写真から始まる静かな記録",
    metaDescription: "写真を選んで旅として整理。時間と場所は必要なときだけ。",
    eyebrow: "MomentBook",
    title: "写真から始まる静かな記録",
    lead: "残したい写真を選ぶと、MomentBook が静かな旅としてまとめます。",
    note: "写真から始められます。旅を開始すれば時間と場所が静かに集まります。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "写真中心の流れを見る",
    heroDeviceImage: "/screenshots/organize-photos.png",
    heroDeviceAlt: "写真を整理する画面",
    heroVisualCaption: "写真が先に、物語は静かに。",
    howTitle: "写真中心の流れ",
    howLead: "写真を旅にまとめるシンプルな順序。",
    howSteps: [
      {
        title: "写真を選ぶ",
        text: "日付や時間でフィルタし、残したい写真を選びます。",
        image: "/screenshots/photos-picker.png",
        alt: "日付と時間のフィルターがある写真選択画面。",
      },
      {
        title: "瞬間としてまとめる",
        text: "一度の整理で小さなまとまりができます。",
        image: "/screenshots/organize-photos.png",
        alt: "写真グリッドと整理ボタンがある画面。",
      },
      {
        title: "まとまりを整える",
        text: "タイトルを付けたり必要に応じて調整します。",
        image: "/screenshots/user-organizing.png",
        alt: "写真のまとまりとタイムスタンプが表示された画面。",
      },
      {
        title: "旅のタイムライン",
        text: "写真と場所が順序に沿って並びます。",
        image: "/screenshots/journey-timeline.png",
        alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
      },
      {
        title: "必要なときだけ公開",
        text: "公開すると共有ページができ、いつでも非公開に戻せます。",
        image: "/screenshots/published-summary.png",
        alt: "共有と非公開の切り替えができる公開後の概要画面。",
      },
    ],
    featureTitle: "写真から始められる設計",
    featureLead: "旅は必要なときに広がり、写真整理が基本です。",
    features: [
      {
        title: "写真から整理",
        text: "旅を開始しなくても写真だけでまとめられます。",
      },
      {
        title: "任意の旅コンテキスト",
        text: "必要なら旅を開始して時間と場所を静かに集めます（位置情報許可時）。",
      },
      {
        title: "瞬間の章立て",
        text: "写真を小さな章に分けて名前を付けられます。",
      },
      {
        title: "タイムライン表示",
        text: "写真と場所の流れを確認できます。",
      },
      {
        title: "静かな共有",
        text: "必要なときだけ公開しリンクを共有します。",
      },
      {
        title: "デフォルトは非公開",
        text: "共有するまで外部に表示されません。",
      },
    ],
    galleryTitle: "写真から共有ページへ",
    galleryLead: "選択から共有までの流れを追います。",
    galleryItems: [
      {
        title: "写真選択",
        text: "日付や時間でフィルタして選びます。",
        image: "/screenshots/photos-picker.png",
        alt: "日付と時間のフィルターがある写真選択画面。",
      },
      {
        title: "写真整理",
        text: "整理ボタンで流れを作ります。",
        image: "/screenshots/organize-photos.png",
        alt: "写真グリッドと整理ボタンがある画面。",
      },
      {
        title: "瞬間の調整",
        text: "タイムスタンプ付きのまとまりを調整します。",
        image: "/screenshots/user-organizing.png",
        alt: "写真のまとまりとタイムスタンプが表示された画面。",
      },
      {
        title: "旅のタイムライン",
        text: "場所・地図・写真が順に並びます。",
        image: "/screenshots/journey-timeline.png",
        alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
      },
      {
        title: "公開の選択",
        text: "公開する写真を選びます。",
        image: "/screenshots/publish-select.png",
        alt: "選択した写真が表示された公開選択画面。",
      },
      {
        title: "公開後の概要",
        text: "共有と非公開を管理します。",
        image: "/screenshots/published-summary.png",
        alt: "共有と非公開の切り替えができる公開後の概要画面。",
      },
      {
        title: "任意: 旅を開始",
        text: "必要なら一日を旅として始められます。",
        image: "/screenshots/start-journey.png",
        alt: "旅を始めるボタンがある画面。",
      },
      {
        title: "任意: 自動サマリー",
        text: "旅を開始すると時間と場所が要約されます。",
        image: "/screenshots/current-journey.png",
        alt: "時間、写真、場所、地図プレビューが表示された現在の旅画面。",
      },
    ],
    finalTitle: "今ある写真から始めましょう",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalNote: "設定は1分ほどで完了します。",
  },
  zh: {
    metaTitle: "MomentBook — 从照片开始的安静记录",
    metaDescription: "挑选照片整理成旅程，时间与地点只在需要时加入。",
    eyebrow: "MomentBook",
    title: "从照片开始的安静记录",
    lead: "选出想保留的照片，MomentBook 会把它们整理成一段安静的旅程。",
    note: "可以从照片开始。若开启旅程，时间和地点会在后台慢慢汇集。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "查看照片式流程",
    heroDeviceImage: "/screenshots/organize-photos.png",
    heroDeviceAlt: "整理照片的界面",
    heroVisualCaption: "照片在前，故事安静成形。",
    howTitle: "照片优先流程",
    howLead: "用简单顺序把照片整理成旅程。",
    howSteps: [
      {
        title: "选择照片",
        text: "按日期或时间筛选，挑选想保留的照片。",
        image: "/screenshots/photos-picker.png",
        alt: "带有日期与时间筛选的照片选择界面。",
      },
      {
        title: "整理为片段",
        text: "一键整理成小的片段，可命名并微调。",
        image: "/screenshots/organize-photos.png",
        alt: "带有照片网格和整理按钮的界面。",
      },
      {
        title: "微调片段",
        text: "调整归属并补充标题（可选）。",
        image: "/screenshots/user-organizing.png",
        alt: "照片分组与时间戳界面。",
      },
      {
        title: "旅程时间线",
        text: "照片与地点按顺序展开。",
        image: "/screenshots/journey-timeline.png",
        alt: "包含地点卡片、地图和照片的旅程时间线界面。",
      },
      {
        title: "需要时再发布",
        text: "发布会生成可分享页面，之后也可取消发布。",
        image: "/screenshots/published-summary.png",
        alt: "包含分享与取消发布选项的发布摘要界面。",
      },
    ],
    featureTitle: "为照片优先而设计",
    featureLead: "旅程可从照片生长，追踪保持可选。",
    features: [
      {
        title: "照片优先整理",
        text: "不必先开启旅程，也能用照片完成整理。",
      },
      {
        title: "可选旅程脉络",
        text: "如需时间与地点，可开启旅程在后台收集（需允许定位）。",
      },
      {
        title: "片段章节",
        text: "把照片分成小章节并命名。",
      },
      {
        title: "时间线视图",
        text: "按顺序回看照片与地点。",
      },
      {
        title: "安静分享",
        text: "只有在你选择时才发布。",
      },
      {
        title: "默认私密",
        text: "未分享内容保持私密。",
      },
    ],
    galleryTitle: "从照片到可分享页面",
    galleryLead: "从选择到分享的完整流程。",
    galleryItems: [
      {
        title: "选择照片",
        text: "按日期或时间筛选并挑选照片。",
        image: "/screenshots/photos-picker.png",
        alt: "带有日期与时间筛选的照片选择界面。",
      },
      {
        title: "整理照片",
        text: "用整理按钮开始构建故事。",
        image: "/screenshots/organize-photos.png",
        alt: "带有照片网格和整理按钮的界面。",
      },
      {
        title: "微调片段",
        text: "带时间戳的分组可以继续调整。",
        image: "/screenshots/user-organizing.png",
        alt: "显示照片分组与时间戳的整理界面。",
      },
      {
        title: "旅程时间线",
        text: "地点卡片、地图与照片形成流动。",
        image: "/screenshots/journey-timeline.png",
        alt: "包含地点卡片、地图和照片的旅程时间线界面。",
      },
      {
        title: "选择发布内容",
        text: "挑选要出现在公开旅程中的照片。",
        image: "/screenshots/publish-select.png",
        alt: "发布选择界面，显示已选照片。",
      },
      {
        title: "发布摘要",
        text: "在一个页面里管理分享与取消发布。",
        image: "/screenshots/published-summary.png",
        alt: "包含分享与取消发布选项的发布摘要界面。",
      },
      {
        title: "可选：开启旅程",
        text: "如果需要，可以从旅程开始收集时间与地点。",
        image: "/screenshots/start-journey.png",
        alt: "带有开始旅程按钮的界面。",
      },
      {
        title: "可选：实时概览",
        text: "旅程开始后会出现温和的实时概览。",
        image: "/screenshots/current-journey.png",
        alt: "显示时间、照片、地点和地图预览的当前旅程界面。",
      },
    ],
    finalTitle: "从你已有的照片开始",
    finalLead: "iOS 与 Android 均可使用。",
    finalCta: "前往下载",
    finalNote: "设置大约只需一分钟。",
  },
};

function getHomeContent(lang: Language): HomeContent {
  if (lang === "es") {
    const howSteps = [
      { title: "Elige las fotos", text: "Filtra por dia u hora y selecciona los momentos que quieres guardar." },
      { title: "Agrupalas en momentos", text: "Un toque crea pequenos grupos que puedes nombrar y ajustar." },
      { title: "Ajusta los grupos", text: "Corrige lo que va junto y agrega titulos si quieres." },
      { title: "Linea del viaje", text: "Fotos y lugares se ordenan cuando quieras revisar." },
      { title: "Publica solo cuando quieras", text: "Publicar crea una pagina que puedes compartir y despublicar." },
    ];
    const features = [
      { title: "Organizacion por fotos", text: "Puedes empezar con fotos sin iniciar un viaje." },
      { title: "Contexto opcional", text: "Si inicias un viaje, tiempo y lugares se guardan en silencio (con ubicacion)." },
      { title: "Momentos como capitulos", text: "Agrupa fotos en pequenos capitulos con nombre." },
      { title: "Vista de linea de tiempo", text: "Revisa fotos y lugares en orden cuando quieras." },
      { title: "Compartir en calma", text: "Publica solo cuando lo eliges." },
      { title: "Privado por defecto", text: "Lo no compartido queda privado." },
    ];
    const galleryItems = [
      { title: "Elige las fotos", text: "Filtra por dia u hora para decidir que queda." },
      { title: "Organiza el conjunto", text: "Empieza a dar forma con un toque de organizar." },
      { title: "Ajusta momentos", text: "Los grupos con marca de tiempo se pueden ajustar." },
      { title: "Linea del viaje", text: "Lugares, mapas y fotos se ordenan." },
      { title: "Elige que publicar", text: "Selecciona las fotos que apareceran en la pagina publica." },
      { title: "Resumen publicado", text: "Comparte o despublica desde una sola pantalla." },
      { title: "Opcional: iniciar viaje", text: "Si quieres, inicia un viaje para reunir tiempo y lugar." },
      { title: "Opcional: resumen en vivo", text: "Aparece un resumen suave mientras el dia se recoge." },
    ];
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Un diario tranquilo que empieza con fotos",
      metaDescription: "Organiza fotos en un viaje tranquilo. Tiempo y lugar solo si quieres.",
      title: "Un diario tranquilo que empieza con fotos",
      lead: "Elige las fotos que quieres guardar. MomentBook las reune en un viaje calmo.",
      note: "Empieza con fotos. Si inicias un viaje, el tiempo y el lugar se reunen en segundo plano.",
      primaryCta: "Descargar MomentBook",
      secondaryCta: "Ver el flujo con fotos",
      heroDeviceAlt: "Pantalla de organizacion de fotos con cuadricula y boton de organizar.",
      heroVisualCaption: "Primero las fotos, luego la historia.",
      howTitle: "Flujo centrado en fotos",
      howLead: "Un orden simple para convertir fotos en un viaje.",
      howSteps: homeContent.en.howSteps.map((step, i) => ({
        ...step,
        ...howSteps[i],
      })),
      featureTitle: "Disenado para empezar con fotos",
      featureLead: "Los viajes nacen de fotos y el seguimiento es opcional.",
      features: homeContent.en.features.map((feature, i) => ({
        ...feature,
        ...features[i],
      })),
      galleryTitle: "De fotos a una pagina para compartir",
      galleryLead: "Sigue el flujo desde la seleccion hasta el compartir.",
      galleryItems: homeContent.en.galleryItems.map((item, i) => ({
        ...item,
        ...galleryItems[i],
      })),
      finalTitle: "Empieza con las fotos que ya tienes",
      finalLead: "MomentBook esta disponible en iOS y Android.",
      finalCta: "Ir a descarga",
      finalNote: "La configuracion toma cerca de un minuto.",
    };
  }

  if (lang === "pt") {
    const howSteps = [
      { title: "Escolha as fotos", text: "Filtre por dia ou hora e selecione os momentos que quer guardar." },
      { title: "Agrupe em momentos", text: "Um toque cria pequenos grupos que voce pode nomear e ajustar." },
      { title: "Ajuste os grupos", text: "Ajuste o que fica junto e adicione titulos se quiser." },
      { title: "Linha da jornada", text: "Fotos e locais se organizam quando voce quiser rever." },
      { title: "Publique quando quiser", text: "Publicar cria uma pagina para compartilhar e despublicar." },
    ];
    const features = [
      { title: "Organizacao por fotos", text: "Voce pode comecar com fotos sem iniciar uma jornada." },
      { title: "Contexto opcional", text: "Se iniciar uma jornada, tempo e locais se guardam em silencio (com localizacao)." },
      { title: "Momentos como capitulos", text: "Agrupe fotos em pequenos capitulos com nome." },
      { title: "Vista de linha do tempo", text: "Reveja fotos e locais em ordem quando quiser." },
      { title: "Compartilhar em calma", text: "Publique apenas quando escolher." },
      { title: "Privado por padrao", text: "O que nao e compartilhado fica privado." },
    ];
    const galleryItems = [
      { title: "Escolha as fotos", text: "Filtre por dia ou hora para decidir o que fica." },
      { title: "Organize o conjunto", text: "Comece a dar forma com um toque de organizar." },
      { title: "Ajuste momentos", text: "Grupos com horario podem ser ajustados." },
      { title: "Linha da jornada", text: "Locais, mapas e fotos se ordenam." },
      { title: "Escolha o que publicar", text: "Selecione as fotos que aparecerao na pagina publica." },
      { title: "Resumo publicado", text: "Compartilhe ou despublique em uma unica tela." },
      { title: "Opcional: iniciar jornada", text: "Se quiser, inicie uma jornada para reunir tempo e lugar." },
      { title: "Opcional: resumo ao vivo", text: "Surge um resumo suave enquanto o dia se recolhe." },
    ];
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Um diario tranquilo que comeca com fotos",
      metaDescription: "Organize fotos em uma jornada tranquila. Tempo e lugar so se quiser.",
      title: "Um diario tranquilo que comeca com fotos",
      lead: "Escolha as fotos que quer guardar. MomentBook as reune em uma jornada calma.",
      note: "Comece com fotos. Se iniciar uma jornada, tempo e lugar se reunem em segundo plano.",
      primaryCta: "Baixar MomentBook",
      secondaryCta: "Ver fluxo com fotos",
      heroDeviceAlt: "Tela de organizacao de fotos com grade e botao de organizar.",
      heroVisualCaption: "Fotos primeiro, depois a historia.",
      howTitle: "Fluxo centrado em fotos",
      howLead: "Uma ordem simples para transformar fotos em jornada.",
      howSteps: homeContent.en.howSteps.map((step, i) => ({
        ...step,
        ...howSteps[i],
      })),
      featureTitle: "Feito para comecar com fotos",
      featureLead: "As jornadas nascem das fotos e o rastreamento e opcional.",
      features: homeContent.en.features.map((feature, i) => ({
        ...feature,
        ...features[i],
      })),
      galleryTitle: "De fotos a uma pagina para compartilhar",
      galleryLead: "Acompanhe o fluxo da selecao ao compartilhamento.",
      galleryItems: homeContent.en.galleryItems.map((item, i) => ({
        ...item,
        ...galleryItems[i],
      })),
      finalTitle: "Comece com as fotos que voce ja tem",
      finalLead: "MomentBook esta disponivel em iOS e Android.",
      finalCta: "Ir para download",
      finalNote: "A configuracao leva cerca de um minuto.",
    };
  }

  if (lang === "fr") {
    const howSteps = [
      { title: "Choisir les photos", text: "Filtrez par jour ou heure et selectionnez les moments a garder." },
      { title: "Regrouper en moments", text: "Un geste cree de petits groupes que vous pouvez nommer et ajuster." },
      { title: "Ajuster les groupes", text: "Corrigez ce qui va ensemble et ajoutez des titres si vous voulez." },
      { title: "Timeline du voyage", text: "Photos et lieux se rangent quand vous voulez revoir." },
      { title: "Publier seulement quand voulu", text: "Publier cree une page a partager et a depublier." },
    ];
    const features = [
      { title: "Organisation par photos", text: "Vous pouvez commencer avec les photos sans demarrer un voyage." },
      { title: "Contexte optionnel", text: "Si vous demarrez un voyage, temps et lieux se collectent en arriere-plan (avec localisation)." },
      { title: "Moments en chapitres", text: "Regroupez les photos en petits chapitres avec un nom." },
      { title: "Vue timeline", text: "Revenez aux photos et lieux dans l'ordre quand vous voulez." },
      { title: "Partage calme", text: "Publiez seulement quand vous le choisissez." },
      { title: "Prive par defaut", text: "Tout ce qui n'est pas partage reste prive." },
    ];
    const galleryItems = [
      { title: "Choisir les photos", text: "Filtrez par jour ou heure pour decider ce qui reste." },
      { title: "Organiser l'ensemble", text: "Commencez a donner forme avec un geste d'organisation." },
      { title: "Ajuster les moments", text: "Les groupes horodates peuvent etre ajustes." },
      { title: "Timeline du voyage", text: "Lieux, cartes et photos se rangent dans l'ordre." },
      { title: "Choisir quoi publier", text: "Selectionnez les photos qui apparaitront sur la page publique." },
      { title: "Resume publie", text: "Partagez ou depubliez depuis un seul ecran." },
      { title: "Optionnel : demarrer un voyage", text: "Si vous voulez, demarrez un voyage pour reunir temps et lieux." },
      { title: "Optionnel : resume en direct", text: "Un resume doux apparait pendant que la journee se rassemble." },
    ];
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Un journal calme qui commence par les photos",
      metaDescription: "Organisez des photos en voyage calme. Temps et lieux seulement si vous voulez.",
      title: "Un journal calme qui commence par les photos",
      lead: "Choisissez les photos a garder. MomentBook les reunit en un voyage calme.",
      note: "Commencez par les photos. Si vous demarrez un voyage, temps et lieux se reunissent en arriere-plan.",
      primaryCta: "Telecharger MomentBook",
      secondaryCta: "Voir le flux photo",
      heroDeviceAlt: "Ecran d'organisation de photos avec grille et bouton organiser.",
      heroVisualCaption: "Les photos d'abord, puis l'histoire.",
      howTitle: "Flux centre sur les photos",
      howLead: "Un ordre simple pour transformer des photos en voyage.",
      howSteps: homeContent.en.howSteps.map((step, i) => ({
        ...step,
        ...howSteps[i],
      })),
      featureTitle: "Concu pour commencer avec les photos",
      featureLead: "Les voyages naissent des photos et le suivi est optionnel.",
      features: homeContent.en.features.map((feature, i) => ({
        ...feature,
        ...features[i],
      })),
      galleryTitle: "Des photos a une page partageable",
      galleryLead: "Suivez le flux de la selection au partage.",
      galleryItems: homeContent.en.galleryItems.map((item, i) => ({
        ...item,
        ...galleryItems[i],
      })),
      finalTitle: "Commencez avec les photos que vous avez deja",
      finalLead: "MomentBook est disponible sur iOS et Android.",
      finalCta: "Aller au telechargement",
      finalNote: "La configuration prend environ une minute.",
    };
  }

  if (lang === "th") {
    const howSteps = [
      { title: "เลือกรูป", text: "กรองตามวันหรือเวลา แล้วเลือกรูปที่อยากเก็บไว้" },
      { title: "จัดเป็นช่วงเวลา", text: "แตะครั้งเดียวเพื่อสร้างกลุ่มเล็กๆ และปรับได้" },
      { title: "ปรับกลุ่ม", text: "แก้ไขสิ่งที่อยู่ด้วยกันและใส่ชื่อถ้าต้องการ" },
      { title: "ไทม์ไลน์ทริป", text: "รูปและสถานที่เรียงลําดับเมื่ออยากย้อนดู" },
      { title: "เผยแพร่เมื่อพร้อม", text: "การเผยแพร่สร้างหน้าที่แชร์ได้และยกเลิกได้" },
    ];
    const features = [
      { title: "จัดด้วยรูปก่อน", text: "เริ่มจากรูปได้โดยไม่ต้องเริ่มทริป" },
      { title: "บริบทแบบเลือกได้", text: "ถ้าเริ่มทริป เวลาและสถานที่จะถูกรวบรวมในพื้นหลัง (เมื่ออนุญาตตำแหน่ง)" },
      { title: "ช่วงเวลาเป็นบท", text: "จัดรูปเป็นบทเล็กๆ พร้อมชื่อ" },
      { title: "มุมมองไทม์ไลน์", text: "ย้อนดูรูปและสถานที่ตามลําดับ" },
      { title: "แชร์อย่างสงบ", text: "เผยแพร่เฉพาะเมื่อคุณเลือก" },
      { title: "ส่วนตัวโดยค่าเริ่มต้น", text: "สิ่งที่ไม่แชร์จะยังเป็นส่วนตัว" },
    ];
    const galleryItems = [
      { title: "เลือกรูป", text: "กรองตามวันหรือเวลาเพื่อเลือกสิ่งที่เก็บ" },
      { title: "จัดชุดภาพ", text: "เริ่มสร้างเรื่องด้วยการแตะจัดระเบียบ" },
      { title: "ปรับช่วงเวลา", text: "กลุ่มที่มีเวลาแนบสามารถปรับได้" },
      { title: "ไทม์ไลน์ทริป", text: "สถานที่ แผนที่ และรูปเรียงเป็นลําดับ" },
      { title: "เลือกรูปที่จะเผยแพร่", text: "เลือกรูปที่จะปรากฏบนหน้าสาธารณะ" },
      { title: "สรุปที่เผยแพร่", text: "แชร์หรือยกเลิกเผยแพร่ได้จากหน้เดียว" },
      { title: "ตัวเลือก: เริ่มทริป", text: "ถ้าต้องการ เริ่มทริปเพื่อรวบรวมเวลาและสถานที่" },
      { title: "ตัวเลือก: สรุปแบบสด", text: "มีสรุปอ่อนๆ ระหว่างวันที่กําลังถูกรวบรวม" },
    ];
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — ไดอารี่ที่เริ่มจากรูปภาพแบบสงบ",
      metaDescription: "จัดรูปเป็นทริปอย่างสงบ เวลาและสถานที่มีเฉพาะเมื่อคุณต้องการ",
      title: "ไดอารี่ที่เริ่มจากรูปภาพอย่างสงบ",
      lead: "เลือกรูปที่อยากเก็บ แล้ว MomentBook จะรวบรวมเป็นทริปที่คุณย้อนดูได้",
      note: "เริ่มจากรูปได้เลย หากเริ่มทริป เวลาและสถานที่จะค่อยๆ ถูกรวบรวม",
      primaryCta: "ดาวน์โหลด MomentBook",
      secondaryCta: "ดูโฟลว์จากรูป",
      heroDeviceAlt: "หน้าจอจัดรูปพร้อมกริดและปุ่มจัดระเบียบ",
      heroVisualCaption: "รูปมาก่อน เรื่องราวค่อยๆ ตามมา",
      howTitle: "โฟลว์แบบรูปก่อน",
      howLead: "ลําดับง่ายๆ ที่เปลี่ยนรูปเป็นทริป",
      howSteps: homeContent.en.howSteps.map((step, i) => ({
        ...step,
        ...howSteps[i],
      })),
      featureTitle: "ออกแบบให้เริ่มจากรูป",
      featureLead: "ทริปเติบโตจากรูป และการติดตามเป็นทางเลือก",
      features: homeContent.en.features.map((feature, i) => ({
        ...feature,
        ...features[i],
      })),
      galleryTitle: "จากรูปไปสู่หน้าที่แชร์ได้",
      galleryLead: "ตามดูโฟลว์ตั้งแต่เลือกจนถึงแชร์",
      galleryItems: homeContent.en.galleryItems.map((item, i) => ({
        ...item,
        ...galleryItems[i],
      })),
      finalTitle: "เริ่มจากรูปที่คุณมีอยู่แล้ว",
      finalLead: "MomentBook ใช้งานได้ทั้ง iOS และ Android",
      finalCta: "ไปหน้าดาวน์โหลด",
      finalNote: "ตั้งค่าใช้เวลาเพียงประมาณหนึ่งนาที",
    };
  }

  if (lang === "vi") {
    const howSteps = [
      { title: "Chon anh", text: "Loc theo ngay hoac gio de chon khoanh khac muon giu." },
      { title: "Nhom thanh khoanh khac", text: "Mot cham tao nhom nho co the dat ten va dieu chinh." },
      { title: "Dieu chinh nhom", text: "Chinh sua nhom va them tieu de neu can." },
      { title: "Timeline hanh trinh", text: "Anh va dia diem sap xep theo thu tu khi muon xem lai." },
      { title: "Dang khi san sang", text: "Dang tao trang co the chia se va huy dang." },
    ];
    const features = [
      { title: "To chuc tu anh", text: "Ban co the bat dau voi anh ma khong can bat dau hanh trinh." },
      { title: "Boi canh tuy chon", text: "Neu bat dau hanh trinh, thoi gian va dia diem duoc thu thap am tham (khi cho phep vi tri)." },
      { title: "Khoanh khac thanh chuong", text: "Nhom anh thanh cac chuong nho va dat ten." },
      { title: "Xem timeline", text: "Xem anh va dia diem theo thu tu khi can." },
      { title: "Chia se nhe nhang", text: "Chi dang khi ban chon." },
      { title: "Mac dinh rieng tu", text: "Noi dung chua chia se se giu rieng tu." },
    ];
    const galleryItems = [
      { title: "Chon anh", text: "Loc theo ngay hoac gio de quyet dinh anh giu." },
      { title: "Sap xep bo anh", text: "Bat dau tao hinh voi mot lan sap xep." },
      { title: "Dieu chinh khoanh khac", text: "Cac nhom co moc thoi gian co the dieu chinh." },
      { title: "Timeline hanh trinh", text: "Dia diem, ban do va anh sap xep theo thu tu." },
      { title: "Chon noi dung dang", text: "Chon anh se xuat hien tren trang cong khai." },
      { title: "Tom tat da dang", text: "Chia se hoac huy dang tu mot man hinh." },
      { title: "Tuy chon: bat dau hanh trinh", text: "Neu muon, bat dau hanh trinh de gom thoi gian va dia diem." },
      { title: "Tuy chon: tom tat truc tiep", text: "Tom tat nhe nhang xuat hien khi ngay dang duoc gom lai." },
    ];
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Nhat ky bat dau tu anh",
      metaDescription: "Sap xep anh thanh hanh trinh yen tinh. Thoi gian va dia diem chi khi ban muon.",
      title: "Nhat ky bat dau tu anh",
      lead: "Chon nhung buc anh muon giu. MomentBook gom lai thanh mot hanh trinh nhe nhang.",
      note: "Co the bat dau tu anh. Neu bat dau hanh trinh, thoi gian va dia diem se duoc thu thap trong nen.",
      primaryCta: "Tai MomentBook",
      secondaryCta: "Xem luong anh",
      heroDeviceAlt: "Man hinh sap xep anh voi luoi va nut sap xep.",
      heroVisualCaption: "Anh truoc, cau chuyen theo sau.",
      howTitle: "Luong bat dau tu anh",
      howLead: "Thu tu don gian de bien anh thanh hanh trinh.",
      howSteps: homeContent.en.howSteps.map((step, i) => ({
        ...step,
        ...howSteps[i],
      })),
      featureTitle: "Thiet ke de bat dau voi anh",
      featureLead: "Hanh trinh lon len tu anh va viec theo doi la tuy chon.",
      features: homeContent.en.features.map((feature, i) => ({
        ...feature,
        ...features[i],
      })),
      galleryTitle: "Tu anh den trang co the chia se",
      galleryLead: "Theo doi luong tu chon den chia se.",
      galleryItems: homeContent.en.galleryItems.map((item, i) => ({
        ...item,
        ...galleryItems[i],
      })),
      finalTitle: "Bat dau tu nhung buc anh ban dang co",
      finalLead: "MomentBook co tren iOS va Android.",
      finalCta: "Den trang tai xuong",
      finalNote: "Thiet lap mat khoang mot phut.",
    };
  }

  return homeContent[lang] ?? homeContent.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomeContent(lang);
  const path = "";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
    },
    twitter: {
      card: "summary",
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

  return (
    <div className={styles.page}>
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
                <Link href={`/${lang}/download`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/how-it-works`} className={styles.secondaryButton}>
                  {content.secondaryCta}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <p className={styles.heroNote}>{content.note}</p>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className={styles.heroVisual}>
              <DeviceMock
                className={styles.heroDevice}
                screenClassName={deviceStyles.screenMedia}
              >
                <Image
                  src={content.heroDeviceImage}
                  alt={content.heroDeviceAlt}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
                  className={deviceStyles.screenImage}
                  priority
                />
              </DeviceMock>
              <p className={styles.heroCaption}>{content.heroVisualCaption}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInnerWide}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.howTitle}</h2>
            <p className={styles.sectionLead}>{content.howLead}</p>
          </header>
          <div className={styles.stepGrid}>
            {content.howSteps.map((step, index) => (
              <div key={`${step.title}-${index}`} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepText}>{step.text}</p>
                <DeviceMock
                  className={styles.stepDevice}
                  screenClassName={deviceStyles.screenMedia}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1200px) 280px, 300px"
                    className={deviceStyles.screenImage}
                  />
                </DeviceMock>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInnerWide}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.galleryTitle}</h2>
            <p className={styles.sectionLead}>{content.galleryLead}</p>
          </header>
          <div className={styles.galleryGrid}>
            {content.galleryItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className={styles.galleryCard}>
                <DeviceMock
                  className={styles.galleryDevice}
                  screenClassName={deviceStyles.screenMedia}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 240px, (max-width: 1200px) 260px, 280px"
                    className={deviceStyles.screenImage}
                  />
                </DeviceMock>
                <div className={styles.galleryCopy}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.featureTitle}</h2>
            <p className={styles.sectionLead}>{content.featureLead}</p>
          </header>
          <div className={styles.featureGrid}>
            {content.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className={styles.featureCard}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalInner}>
          <h2 className={styles.finalTitle}>{content.finalTitle}</h2>
          <p className={styles.finalLead}>{content.finalLead}</p>
          <Link href={`/${lang}/download`} className={styles.primaryButton}>
            {content.finalCta}
          </Link>
          <p className={styles.finalNote}>{content.finalNote}</p>
        </div>
      </section>
    </div>
  );
}
