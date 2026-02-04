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
    metaTitle: "MomentBook — A quiet journey journal",
    metaDescription: "Keep daily moments as a journey with time, place, and photos. Share only when you choose.",
    eyebrow: "MomentBook",
    title: "A quiet journal for real journeys",
    lead: "Start a journey, let time and place collect the story, and shape it into something you can return to.",
    note: "Private by default. Publishing creates a shareable page you control.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Start today’s journey prompt on MomentBook",
    heroVisualCaption: "A gentle start to today’s journey.",
    howTitle: "How it works",
    howLead: "A calm flow from the first prompt to a finished journey.",
    howSteps: [
      {
        title: "Start the journey",
        text: "A simple prompt invites you to begin the day — no setup, no checklist.",
        image: "/screenshots/start-journey.png",
        alt: "Start today’s journey screen with a single call to action.",
      },
      {
        title: "Auto-record along the way",
        text: "MomentBook tracks time, photos, and places while you move, with a live summary.",
        image: "/screenshots/current-journey.png",
        alt: "Current journey status with time, photos, places, and map preview.",
      },
      {
        title: "Collect your photos",
        text: "Filter by day or time and choose the moments you want to keep.",
        image: "/screenshots/photos-picker.png",
        alt: "Photo picker grid with day and time filters.",
      },
      {
        title: "Organize into chapters",
        text: "Group photos into meaningful clusters with one tap, then refine as needed.",
        image: "/screenshots/organize-photos.png",
        alt: "Organizing photos screen with a grid and organize button.",
      },
      {
        title: "Review the timeline",
        text: "See place sections with maps and photos laid out in order.",
        image: "/screenshots/journey-timeline.png",
        alt: "Journey timeline showing a place card, map, and photos.",
      },
      {
        title: "Publish only when ready",
        text: "Choose what to share, publish, and keep the option to unpublish later.",
        image: "/screenshots/published-summary.png",
        alt: "Published journey summary with share and unpublish options.",
      },
    ],
    featureTitle: "Built for quiet journaling",
    featureLead: "Keep the rhythm of the day without turning it into a performance.",
    features: [
      {
        title: "Start a journey",
        text: "Begin with a calm prompt that sets the tone for the day.",
      },
      {
        title: "Auto-recorded context",
        text: "Time and place collect gently in the background (if you allow location).",
      },
      {
        title: "Photo selection",
        text: "Choose the photos that feel right, with filters that keep it manageable.",
      },
      {
        title: "Meaningful clusters",
        text: "Organize photos into small chapters you can name and revisit.",
      },
      {
        title: "Timeline view",
        text: "See the flow of a journey with maps and photos in order.",
      },
      {
        title: "Publish on your terms",
        text: "Share a journey only when you want to — and unpublish anytime.",
      },
    ],
    galleryTitle: "A screenshot-led story",
    galleryLead: "Follow one journey from the first prompt to the shareable page.",
    galleryItems: [
      {
        title: "Ready to start",
        text: "A gentle invitation to begin today’s journey.",
        image: "/screenshots/start-journey.png",
        alt: "Start today’s journey screen with a single call to action.",
      },
      {
        title: "Current journey",
        text: "Live status shows time, photos, places, and a map preview.",
        image: "/screenshots/current-journey.png",
        alt: "Current journey status with time, photos, places, and map preview.",
      },
      {
        title: "Photo picker",
        text: "Browse by day or time to select the moments you want to keep.",
        image: "/screenshots/photos-picker.png",
        alt: "Photo picker grid with day and time filters.",
      },
      {
        title: "Organize the set",
        text: "Gather 150 photos and tap organize to start shaping the story.",
        image: "/screenshots/organize-photos.png",
        alt: "Organizing photos screen with a grid and organize button.",
      },
      {
        title: "User organizing",
        text: "Photo clusters appear with timestamps and coordinates for each moment.",
        image: "/screenshots/user-organizing.png",
        alt: "User organizing screen with photo clusters, timestamps, and coordinates.",
      },
      {
        title: "Journey timeline",
        text: "Place sections blend maps, titles, and photos into a single flow.",
        image: "/screenshots/journey-timeline.png",
        alt: "Journey timeline showing a place card, map, and photos.",
      },
      {
        title: "Choose what to publish",
        text: "Select the photos that should appear in the public journey.",
        image: "/screenshots/publish-select.png",
        alt: "Publish selection view with chosen photos.",
      },
      {
        title: "Published summary",
        text: "A clear summary with sharing controls and the option to unpublish.",
        image: "/screenshots/published-summary.png",
        alt: "Published journey summary with share and unpublish options.",
      },
    ],
    finalTitle: "Start your journey today",
    finalLead: "MomentBook is available on iOS and Android.",
    finalCta: "Go to download",
    finalNote: "Setup takes about a minute.",
  },
  ko: {
    metaTitle: "MomentBook — 여정을 기록하는 조용한 일기",
    metaDescription: "시간과 장소, 사진을 한 번에 묶어 여정으로 기록하세요. 공유는 원할 때만 합니다.",
    eyebrow: "MomentBook",
    title: "여정을 기록하는 조용한 일기",
    lead: "여정을 시작하면 시간과 장소가 이야기를 모아줍니다. 필요할 때만 다듬어 남기세요.",
    note: "기본은 비공개. 게시하면 내가 관리하는 공유 페이지가 만들어집니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "오늘의 여정을 시작하라는 안내 화면",
    heroVisualCaption: "오늘의 여정을 조용히 시작합니다.",
    howTitle: "작동 방식",
    howLead: "첫 안내부터 정리된 여정까지 차분한 흐름.",
    howSteps: [
      {
        title: "여정 시작",
        text: "간단한 안내로 하루를 시작합니다. 준비는 필요 없습니다.",
        image: "/screenshots/start-journey.png",
        alt: "오늘의 여정을 시작하는 버튼이 있는 화면.",
      },
      {
        title: "자동 기록",
        text: "시간, 사진, 장소를 자동으로 기록해 현재 상태를 보여줍니다.",
        image: "/screenshots/current-journey.png",
        alt: "시간, 사진, 장소와 지도 미리보기를 보여주는 현재 여정 화면.",
      },
      {
        title: "사진 모으기",
        text: "하루나 시간대로 필터링해 남길 사진을 선택합니다.",
        image: "/screenshots/photos-picker.png",
        alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
      },
      {
        title: "챕터로 정리",
        text: "사진을 묶어 작은 챕터로 만들고 필요하면 다시 다듬습니다.",
        image: "/screenshots/organize-photos.png",
        alt: "사진 그리드와 정리 버튼이 있는 사진 정리 화면.",
      },
      {
        title: "타임라인 확인",
        text: "지도와 사진이 함께 이어지는 타임라인을 확인합니다.",
        image: "/screenshots/journey-timeline.png",
        alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
      },
      {
        title: "필요할 때만 게시",
        text: "공개할 사진을 고르고, 원하면 언제든 비공개로 전환합니다.",
        image: "/screenshots/published-summary.png",
        alt: "공유 및 비공개 전환이 가능한 게시 요약 화면.",
      },
    ],
    featureTitle: "조용한 기록을 위한 설계",
    featureLead: "보여주기보다 하루의 흐름을 남깁니다.",
    features: [
      {
        title: "여정 시작",
        text: "차분한 안내로 하루의 리듬을 만들어요.",
      },
      {
        title: "자동 기록",
        text: "허용 시 시간과 장소가 자연스럽게 기록됩니다.",
      },
      {
        title: "사진 선택",
        text: "필터로 정리해 남길 순간을 고릅니다.",
      },
      {
        title: "의미 있는 묶음",
        text: "사진을 작은 챕터로 나누어 기억하기 쉽게 만듭니다.",
      },
      {
        title: "타임라인",
        text: "지도와 사진이 이어진 여정 흐름을 확인합니다.",
      },
      {
        title: "내 방식의 공유",
        text: "원할 때만 게시하고 언제든 비공개로 전환합니다.",
      },
    ],
    galleryTitle: "스크린샷으로 보는 여정",
    galleryLead: "첫 안내부터 공유 페이지까지 한 흐름으로 살펴보세요.",
    galleryItems: [
      {
        title: "여정 준비",
        text: "오늘의 여정을 시작하라는 안내가 나타납니다.",
        image: "/screenshots/start-journey.png",
        alt: "오늘의 여정을 시작하는 버튼이 있는 화면.",
      },
      {
        title: "현재 여정",
        text: "시간, 사진, 장소와 지도 미리보기가 표시됩니다.",
        image: "/screenshots/current-journey.png",
        alt: "시간, 사진, 장소와 지도 미리보기를 보여주는 현재 여정 화면.",
      },
      {
        title: "사진 선택",
        text: "날짜와 시간으로 필터링하며 사진을 고릅니다.",
        image: "/screenshots/photos-picker.png",
        alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
      },
      {
        title: "사진 정리",
        text: "많은 사진을 모아 정리 버튼으로 흐름을 시작합니다.",
        image: "/screenshots/organize-photos.png",
        alt: "사진 그리드와 정리 버튼이 있는 사진 정리 화면.",
      },
      {
        title: "사용자 정리",
        text: "타임스탬프와 좌표가 함께 묶음으로 표시됩니다.",
        image: "/screenshots/user-organizing.png",
        alt: "사진 묶음과 타임스탬프, 좌표가 표시된 사용자 정리 화면.",
      },
      {
        title: "여정 타임라인",
        text: "장소 카드, 지도, 사진이 하나의 흐름으로 정리됩니다.",
        image: "/screenshots/journey-timeline.png",
        alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
      },
      {
        title: "게시 선택",
        text: "공개할 사진을 선택해 여정을 준비합니다.",
        image: "/screenshots/publish-select.png",
        alt: "선택한 사진이 표시된 게시 선택 화면.",
      },
      {
        title: "게시 요약",
        text: "공유와 비공개 전환을 한곳에서 관리합니다.",
        image: "/screenshots/published-summary.png",
        alt: "공유 및 비공개 전환이 가능한 게시 요약 화면.",
      },
    ],
    finalTitle: "오늘의 여정을 시작하세요",
    finalLead: "iOS와 Android에서 사용 가능합니다.",
    finalCta: "다운로드 페이지로",
    finalNote: "설정은 1분 정도면 충분합니다.",
  },
  ja: {
    metaTitle: "MomentBook — 旅を静かに記録する日記",
    metaDescription: "時間・場所・写真を旅としてまとめ、必要なときだけ共有できます。",
    eyebrow: "MomentBook",
    title: "旅を静かに記録する日記",
    lead: "旅を始めると、時間と場所が物語を集めます。必要なときだけ整えましょう。",
    note: "基本は非公開。公開すると管理できる共有ページが作られます。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "今日の旅を始める案内画面",
    heroVisualCaption: "今日の旅を静かに始める。",
    howTitle: "MomentBook の流れ",
    howLead: "最初の案内から整った旅まで、穏やかな流れ。",
    howSteps: [
      {
        title: "旅を始める",
        text: "シンプルな案内で一日を開始。準備は不要です。",
        image: "/screenshots/start-journey.png",
        alt: "旅を始めるボタンがある画面。",
      },
      {
        title: "自動で記録",
        text: "時間・写真・場所が自動で残り、現在の状況がわかります。",
        image: "/screenshots/current-journey.png",
        alt: "時間、写真、場所、地図プレビューが表示された現在の旅画面。",
      },
      {
        title: "写真を選ぶ",
        text: "日付や時間でフィルタし、残したい写真を選択します。",
        image: "/screenshots/photos-picker.png",
        alt: "日付と時間のフィルターがある写真選択画面。",
      },
      {
        title: "章として整理",
        text: "写真を小さな章にまとめ、必要なら調整します。",
        image: "/screenshots/organize-photos.png",
        alt: "写真グリッドと整理ボタンがある画面。",
      },
      {
        title: "タイムラインを確認",
        text: "地図と写真が並ぶ流れを見返します。",
        image: "/screenshots/journey-timeline.png",
        alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
      },
      {
        title: "必要なときだけ公開",
        text: "公開する写真を選び、いつでも非公開に戻せます。",
        image: "/screenshots/published-summary.png",
        alt: "共有と非公開の切り替えができる公開後の概要画面。",
      },
    ],
    featureTitle: "静かな記録のために",
    featureLead: "見せるより、日々の流れを残します。",
    features: [
      {
        title: "旅を始める",
        text: "落ち着いた案内で一日のリズムを作ります。",
      },
      {
        title: "自動記録",
        text: "許可すれば時間と場所が自然に記録されます。",
      },
      {
        title: "写真セレクト",
        text: "フィルターで整理し、残す瞬間を選べます。",
      },
      {
        title: "意味あるまとまり",
        text: "写真を小さな章に分けて振り返りやすくします。",
      },
      {
        title: "タイムライン",
        text: "地図と写真が並ぶ旅の流れを確認します。",
      },
      {
        title: "自分のペースで公開",
        text: "必要なときだけ公開し、いつでも非公開に戻せます。",
      },
    ],
    galleryTitle: "スクリーンショットで見る旅",
    galleryLead: "最初の案内から共有ページまでの流れを追います。",
    galleryItems: [
      {
        title: "旅の準備",
        text: "今日の旅を始める案内が表示されます。",
        image: "/screenshots/start-journey.png",
        alt: "旅を始めるボタンがある画面。",
      },
      {
        title: "現在の旅",
        text: "時間・写真・場所と地図プレビューが見えます。",
        image: "/screenshots/current-journey.png",
        alt: "時間、写真、場所、地図プレビューが表示された現在の旅画面。",
      },
      {
        title: "写真選択",
        text: "日付と時間でフィルタし写真を選びます。",
        image: "/screenshots/photos-picker.png",
        alt: "日付と時間のフィルターがある写真選択画面。",
      },
      {
        title: "写真整理",
        text: "たくさんの写真を集め、整理ボタンで流れを作ります。",
        image: "/screenshots/organize-photos.png",
        alt: "写真グリッドと整理ボタンがある画面。",
      },
      {
        title: "ユーザー整理",
        text: "タイムスタンプと座標が写真のまとまりに付いています。",
        image: "/screenshots/user-organizing.png",
        alt: "写真のまとまり、タイムスタンプ、座標が表示された画面。",
      },
      {
        title: "旅のタイムライン",
        text: "場所カードと写真が一つの流れになります。",
        image: "/screenshots/journey-timeline.png",
        alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
      },
      {
        title: "公開の選択",
        text: "公開する写真を選び、旅を整えます。",
        image: "/screenshots/publish-select.png",
        alt: "選択した写真が表示された公開選択画面。",
      },
      {
        title: "公開後の概要",
        text: "共有と非公開の切り替えを一つの画面で管理します。",
        image: "/screenshots/published-summary.png",
        alt: "共有と非公開の切り替えができる公開後の概要画面。",
      },
    ],
    finalTitle: "今日の旅を始めましょう",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalNote: "設定は1分ほどで完了します。",
  },
  zh: {
    metaTitle: "MomentBook — 安静记录旅程",
    metaDescription: "把时间、地点与照片记录为一段旅程，只在需要时分享。",
    eyebrow: "MomentBook",
    title: "安静记录你的旅程",
    lead: "开始旅程后，时间与地点会为你整理故事。需要时再轻轻整理即可。",
    note: "默认私密。发布后会生成你可管理的分享页面。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "开始今日旅程的提示界面",
    heroVisualCaption: "从温柔的提示开始今天的旅程。",
    howTitle: "如何运作",
    howLead: "从提示到整理完成的旅程，保持安静的节奏。",
    howSteps: [
      {
        title: "开始旅程",
        text: "一个简单提示邀请你开始今天，无需复杂设置。",
        image: "/screenshots/start-journey.png",
        alt: "带有开始旅程按钮的界面。",
      },
      {
        title: "自动记录",
        text: "时间、照片与地点会自动记录，并显示当前状态。",
        image: "/screenshots/current-journey.png",
        alt: "显示时间、照片、地点和地图预览的当前旅程界面。",
      },
      {
        title: "收集照片",
        text: "按日期或时间筛选，挑选想保留的照片。",
        image: "/screenshots/photos-picker.png",
        alt: "带有日期与时间筛选的照片选择界面。",
      },
      {
        title: "整理成章节",
        text: "将照片分组为小章节，再按需微调。",
        image: "/screenshots/organize-photos.png",
        alt: "带有照片网格和整理按钮的界面。",
      },
      {
        title: "查看时间线",
        text: "地图与照片按顺序呈现旅程流动。",
        image: "/screenshots/journey-timeline.png",
        alt: "包含地点卡片、地图和照片的旅程时间线界面。",
      },
      {
        title: "需要时再发布",
        text: "选择要公开的内容，并可随时取消发布。",
        image: "/screenshots/published-summary.png",
        alt: "包含分享与取消发布选项的发布摘要界面。",
      },
    ],
    featureTitle: "为安静记录而生",
    featureLead: "保留一天的节奏，而不是表演。",
    features: [
      {
        title: "开始旅程",
        text: "从一条温柔提示开始今天。",
      },
      {
        title: "自动记录脉络",
        text: "允许位置后，时间与地点会安静记录。",
      },
      {
        title: "照片筛选",
        text: "通过筛选挑选真正想留下的瞬间。",
      },
      {
        title: "有意义的分组",
        text: "把照片整理成可回看的小章节。",
      },
      {
        title: "时间线视图",
        text: "地图与照片一起呈现旅程顺序。",
      },
      {
        title: "按自己的节奏发布",
        text: "只在需要时分享，随时可以撤回。",
      },
    ],
    galleryTitle: "用截图讲述旅程",
    galleryLead: "从第一次提示到分享页面的完整流程。",
    galleryItems: [
      {
        title: "准备开始",
        text: "温柔提示你开始今天的旅程。",
        image: "/screenshots/start-journey.png",
        alt: "带有开始旅程按钮的界面。",
      },
      {
        title: "当前旅程",
        text: "实时查看时间、照片、地点与地图预览。",
        image: "/screenshots/current-journey.png",
        alt: "显示时间、照片、地点和地图预览的当前旅程界面。",
      },
      {
        title: "照片选择",
        text: "按日期与时间浏览并挑选照片。",
        image: "/screenshots/photos-picker.png",
        alt: "带有日期与时间筛选的照片选择界面。",
      },
      {
        title: "整理照片",
        text: "整理大量照片，并用整理按钮开始分组。",
        image: "/screenshots/organize-photos.png",
        alt: "带有照片网格和整理按钮的界面。",
      },
      {
        title: "用户整理",
        text: "照片分组显示时间戳与坐标信息。",
        image: "/screenshots/user-organizing.png",
        alt: "显示照片分组、时间戳与坐标的界面。",
      },
      {
        title: "旅程时间线",
        text: "地点卡片与照片一起呈现旅程流动。",
        image: "/screenshots/journey-timeline.png",
        alt: "包含地点卡片、地图和照片的旅程时间线界面。",
      },
      {
        title: "发布选择",
        text: "选择要公开的照片内容。",
        image: "/screenshots/publish-select.png",
        alt: "显示已选照片的发布选择界面。",
      },
      {
        title: "发布摘要",
        text: "分享控制与取消发布选项清晰可见。",
        image: "/screenshots/published-summary.png",
        alt: "包含分享与取消发布选项的发布摘要界面。",
      },
    ],
    finalTitle: "从今天开始记录",
    finalLead: "iOS 与 Android 均可使用。",
    finalCta: "前往下载",
    finalNote: "设置时间不到一分钟。",
  },
};

function getHomeContent(lang: Language): HomeContent {
  if (lang === "es") {
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Un diario tranquilo de viajes",
      metaDescription: "Guarda momentos diarios como viaje con tiempo, lugar y fotos. Comparte solo cuando quieras.",
      title: "Un diario tranquilo para viajes reales",
      lead: "Empieza un viaje y deja que el tiempo y el lugar formen la historia.",
      note: "Privado por defecto. Publicar crea una pagina compartible que controlas.",
      primaryCta: "Descargar MomentBook",
      secondaryCta: "Ver como funciona",
      howTitle: "Como funciona",
      howLead: "Un flujo tranquilo desde el primer paso hasta un viaje terminado.",
      featureTitle: "Hecho para registrar en calma",
      featureLead: "Conserva el ritmo del dia sin convertirlo en rendimiento.",
      galleryTitle: "Una historia guiada por capturas",
      galleryLead: "Sigue un viaje desde el primer paso hasta la pagina compartible.",
      finalTitle: "Empieza tu viaje hoy",
      finalLead: "MomentBook esta disponible en iOS y Android.",
      finalCta: "Ir a descarga",
      finalNote: "La configuracion toma cerca de un minuto.",
    };
  }

  if (lang === "pt") {
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Um diario tranquilo de jornadas",
      metaDescription: "Guarde momentos do dia como jornada com tempo, lugar e fotos. Compartilhe so quando quiser.",
      title: "Um diario tranquilo para jornadas reais",
      lead: "Inicie uma jornada e deixe tempo e lugar reunirem a historia.",
      note: "Privado por padrao. Publicar cria uma pagina compartilhavel sob seu controle.",
      primaryCta: "Baixar MomentBook",
      secondaryCta: "Ver como funciona",
      howTitle: "Como funciona",
      howLead: "Um fluxo calmo do primeiro passo ate a jornada pronta.",
      featureTitle: "Feito para um registro tranquilo",
      featureLead: "Mantenha o ritmo do dia sem transformar em performance.",
      galleryTitle: "Uma historia guiada por capturas",
      galleryLead: "Acompanhe uma jornada do primeiro passo ate a pagina compartilhavel.",
      finalTitle: "Comece sua jornada hoje",
      finalLead: "MomentBook esta disponivel em iOS e Android.",
      finalCta: "Ir para download",
      finalNote: "A configuracao leva cerca de um minuto.",
    };
  }

  if (lang === "fr") {
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Un journal de voyage calme",
      metaDescription: "Gardez vos moments quotidiens comme un voyage avec temps, lieux et photos. Partagez seulement si vous le souhaitez.",
      title: "Un journal calme pour de vrais voyages",
      lead: "Demarrez un voyage et laissez le temps et le lieu assembler l'histoire.",
      note: "Prive par defaut. Publier cree une page partageable que vous controlez.",
      primaryCta: "Telecharger MomentBook",
      secondaryCta: "Voir le fonctionnement",
      howTitle: "Comment ca marche",
      howLead: "Un flux calme du premier ecran au voyage finalise.",
      featureTitle: "Concu pour un journal calme",
      featureLead: "Gardez le rythme du jour sans en faire une performance.",
      galleryTitle: "Une histoire guidee par captures",
      galleryLead: "Suivez un voyage du premier pas a la page partageable.",
      finalTitle: "Demarrez votre voyage aujourd'hui",
      finalLead: "MomentBook est disponible sur iOS et Android.",
      finalCta: "Aller au telechargement",
      finalNote: "La configuration prend environ une minute.",
    };
  }

  if (lang === "th") {
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — ไดอารี่ทริปแบบสงบ",
      metaDescription: "เก็บช่วงเวลาในแต่ละวันเป็นทริปด้วยเวลา สถานที่ และรูป แชร์เมื่อคุณพร้อมเท่านั้น",
      title: "ไดอารี่เงียบๆ สำหรับทริปจริง",
      lead: "เริ่มทริป แล้วปล่อยให้เวลาและสถานที่ช่วยร้อยเรื่องราว",
      note: "เป็นส่วนตัวโดยค่าเริ่มต้น การเผยแพร่จะสร้างหน้าที่แชร์ได้และคุณควบคุมได้",
      primaryCta: "ดาวน์โหลด MomentBook",
      secondaryCta: "ดูวิธีการทำงาน",
      howTitle: "วิธีการทำงาน",
      howLead: "ลำดับการใช้งานที่สงบ ตั้งแต่เริ่มจนจบทริป",
      featureTitle: "ออกแบบเพื่อการบันทึกอย่างสงบ",
      featureLead: "เก็บจังหวะของวัน โดยไม่ต้องทำให้เป็นการแข่งขัน",
      galleryTitle: "เรื่องราวผ่านภาพหน้าจอ",
      galleryLead: "ตามดูทริปตั้งแต่เริ่มจนถึงหน้าที่แชร์ได้",
      finalTitle: "เริ่มทริปของคุณวันนี้",
      finalLead: "MomentBook ใช้งานได้ทั้ง iOS และ Android",
      finalCta: "ไปหน้าดาวน์โหลด",
      finalNote: "ตั้งค่าใช้เวลาเพียงประมาณหนึ่งนาที",
    };
  }

  if (lang === "vi") {
    return {
      ...homeContent.en,
      metaTitle: "MomentBook — Nhat ky hanh trinh yen tinh",
      metaDescription: "Luu khoanh khac moi ngay thanh hanh trinh voi thoi gian, dia diem va anh. Chi chia se khi ban muon.",
      title: "Nhat ky nhe nhang cho hanh trinh that",
      lead: "Bat dau hanh trinh va de thoi gian, dia diem ket noi cau chuyen.",
      note: "Rieng tu mac dinh. Dang bai tao trang co the chia se ma ban kiem soat.",
      primaryCta: "Tai MomentBook",
      secondaryCta: "Xem cach hoat dong",
      howTitle: "Cach hoat dong",
      howLead: "Mot luong nhe nhang tu buoc dau den hanh trinh hoan chinh.",
      featureTitle: "Thiet ke cho viec ghi lai nhe nhang",
      featureLead: "Giu nhip mot ngay ma khong bien no thanh ap luc.",
      galleryTitle: "Cau chuyen qua anh chup man hinh",
      galleryLead: "Theo doi mot hanh trinh tu buoc dau den trang co the chia se.",
      finalTitle: "Bat dau hanh trinh hom nay",
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
