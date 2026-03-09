import { getLocalizedScreenshotPath, type AppScreenshotKey } from "@/lib/app-screenshots";
import { type Language } from "@/lib/i18n/config";

export type InstallLandingVariantKey = "organized-journey" | "timeline" | "sorted-day-place";

export type DestinationSampleKey = "paris" | "tokyo" | "jeju" | "default";

type LocalizedText = Record<Language, string>;

type HeroHeadlineOption = {
  key: InstallLandingVariantKey;
  text: LocalizedText;
};

type BenefitCardConfig = {
  key: string;
  title: LocalizedText;
  body: LocalizedText;
  screenshotKey: AppScreenshotKey;
  objectPosition: string;
};

type SampleDay = {
  dayLabel: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;
};

type DestinationSample = {
  key: DestinationSampleKey;
  city: LocalizedText;
  heroLabel: LocalizedText;
  sectionTitle: LocalizedText;
  sectionLead: LocalizedText;
  days: SampleDay[];
};

type LandingCopy = {
  eyebrow: LocalizedText;
  heroSubheadline: LocalizedText;
  heroSubheadlineByDestination: (city: string) => LocalizedText;
  sectionBenefitsLabel: LocalizedText;
  sectionSampleLabel: LocalizedText;
  sectionInstallLabel: LocalizedText;
  sampleTripLink: LocalizedText;
  heroSteps: LocalizedText[];
  trustItems: LocalizedText[];
  benefitsTitle: LocalizedText;
  benefitsLead: LocalizedText;
  sampleFallbackTitle: LocalizedText;
  sampleFallbackLead: LocalizedText;
  finalTitle: LocalizedText;
  finalLead: LocalizedText;
  finalDesktopNote: LocalizedText;
  desktopQrTitle: LocalizedText;
  desktopQrLead: LocalizedText;
  openInAppLabel: LocalizedText;
  installBarLead: LocalizedText;
  installBarAction: LocalizedText;
  timelineViewLabel: LocalizedText;
  dismissLabel: LocalizedText;
};

export type InstallLandingContent = {
  heroHeadlineKey: InstallLandingVariantKey;
  heroHeadline: string;
  eyebrow: string;
  heroSubheadline: string;
  sectionBenefitsLabel: string;
  sectionSampleLabel: string;
  sectionInstallLabel: string;
  sampleTripLink: string;
  heroSteps: string[];
  trustItems: string[];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: Array<{
    key: string;
    title: string;
    body: string;
    screenshotSrc: string;
    objectPosition: string;
  }>;
  sample: {
    key: DestinationSampleKey;
    city: string;
    heroLabel: string;
    sectionTitle: string;
    sectionLead: string;
    days: Array<{
      dayLabel: string;
      title: string;
      note: string;
    }>;
  };
  finalTitle: string;
  finalLead: string;
  finalDesktopNote: string;
  desktopQrTitle: string;
  desktopQrLead: string;
  openInAppLabel: string;
  installBarLead: string;
  installBarAction: string;
  timelineViewLabel: string;
  dismissLabel: string;
  heroFrames: Array<{
    key: AppScreenshotKey;
    src: string;
  }>;
  sampleTimelineScreenshotSrc: string;
};

const DAY_LABELS: Record<"day1" | "day2" | "day3", LocalizedText> = {
  day1: {
    en: "Day 1",
    ko: "1일차",
    ja: "1日目",
    zh: "第1天",
    es: "Día 1",
    pt: "Dia 1",
    fr: "Jour 1",
    th: "วันที่ 1",
    vi: "Ngày 1",
  },
  day2: {
    en: "Day 2",
    ko: "2일차",
    ja: "2日目",
    zh: "第2天",
    es: "Día 2",
    pt: "Dia 2",
    fr: "Jour 2",
    th: "วันที่ 2",
    vi: "Ngày 2",
  },
  day3: {
    en: "Day 3",
    ko: "3일차",
    ja: "3日目",
    zh: "第3天",
    es: "Día 3",
    pt: "Dia 3",
    fr: "Jour 3",
    th: "วันที่ 3",
    vi: "Ngày 3",
  },
};

const HERO_HEADLINE_OPTIONS: HeroHeadlineOption[] = [
  {
    key: "organized-journey",
    text: {
      en: "Travel photos, organized into one journey.",
      ko: "여행 사진이 하나의 여정으로 정리됩니다.",
      ja: "旅行写真がひとつの旅として整理されます。",
      zh: "旅行照片会整理成一段旅程。",
      es: "Tus fotos de viaje se ordenan en un solo recorrido.",
      pt: "Suas fotos de viagem se organizam em uma só jornada.",
      fr: "Vos photos de voyage s'organisent en un seul voyage.",
      th: "รูปทริปของคุณจะถูกรวมเป็นทริปเดียว",
      vi: "Ảnh chuyến đi của bạn được sắp thành một hành trình.",
    },
  },
  {
    key: "timeline",
    text: {
      en: "Turn your trip into a timeline.",
      ko: "여행을 하나의 타임라인으로 정리하세요.",
      ja: "旅をひとつのタイムラインに整理しましょう。",
      zh: "把旅行整理成一条时间线。",
      es: "Organiza tu viaje en una sola línea de tiempo.",
      pt: "Organize sua viagem em uma única linha do tempo.",
      fr: "Organisez votre voyage en une seule chronologie.",
      th: "จัดทริปของคุณให้เป็นไทม์ไลน์เดียว",
      vi: "Sắp chuyến đi của bạn thành một dòng thời gian.",
    },
  },
  {
    key: "sorted-day-place",
    text: {
      en: "Your travel memories, sorted by day and place.",
      ko: "여행의 기억을 날짜와 장소 기준으로 정리합니다.",
      ja: "旅の記憶を日付と場所ごとに整理します。",
      zh: "按日期和地点整理旅行记忆。",
      es: "Organiza tus recuerdos de viaje por fecha y lugar.",
      pt: "Organize suas memórias de viagem por data e lugar.",
      fr: "Organisez vos souvenirs de voyage par date et lieu.",
      th: "จัดความทรงจำจากการเดินทางตามวันที่และสถานที่",
      vi: "Sắp ký ức chuyến đi theo ngày và địa điểm.",
    },
  },
];

const BENEFIT_CARDS: BenefitCardConfig[] = [
  {
    key: "group-by-place",
    title: {
      en: "Automatically group by date and place",
      ko: "날짜와 장소 기준으로 자동 정리",
      ja: "日付と場所ごとに自動整理",
      zh: "按日期和地点自动整理",
      es: "Organización automática por fecha y lugar",
      pt: "Organização automática por data e lugar",
      fr: "Organisation automatique par date et lieu",
      th: "จัดให้อัตโนมัติตามวันที่และสถานที่",
      vi: "Tự động sắp theo ngày và địa điểm",
    },
    body: {
      en: "Bring in the photos you already took and let the trip gather into one flow.",
      ko: "이미 찍어 둔 사진을 가져오면 여행 흐름이 하나로 정리됩니다.",
      ja: "すでに撮ってある写真を取り込むと、旅の流れがひとつにまとまります。",
      zh: "导入已经拍好的照片后，旅途流程会自然整理成一体。",
      es: "Si traes las fotos que ya tomaste, el flujo del viaje se organiza en uno solo.",
      pt: "Ao trazer as fotos que você já tirou, o fluxo da viagem se organiza em um só.",
      fr: "Importez les photos déjà prises et le fil du voyage se regroupe en un seul ensemble.",
      th: "เมื่อนำรูปที่ถ่ายไว้แล้วเข้ามา เส้นทางของทริปจะถูกรวมเป็นหนึ่งเดียว",
      vi: "Khi đưa vào những ảnh bạn đã chụp, dòng chảy của chuyến đi sẽ được gom lại thành một.",
    },
    screenshotKey: "photos",
    objectPosition: "center 18%",
  },
  {
    key: "clean-timeline",
    title: {
      en: "Turn a trip into a clean timeline",
      ko: "여행을 깔끔한 타임라인으로 정리",
      ja: "旅をすっきりしたタイムラインに整理",
      zh: "把旅行整理成清晰的时间线",
      es: "Convierte el viaje en una línea de tiempo clara",
      pt: "Transforme a viagem em uma linha do tempo limpa",
      fr: "Transformez le voyage en une chronologie claire",
      th: "จัดทริปให้เป็นไทม์ไลน์ที่เรียบร้อย",
      vi: "Biến chuyến đi thành một dòng thời gian gọn gàng",
    },
    body: {
      en: "See each stop in order without digging through your camera roll.",
      ko: "카메라 롤을 뒤지지 않아도 여행 순서를 바로 볼 수 있습니다.",
      ja: "カメラロールを探し回らなくても、旅の順番をすぐに見られます。",
      zh: "不用再翻相册，也能马上看到旅行的顺序。",
      es: "Puedes ver enseguida el orden del viaje sin rebuscar en el carrete.",
      pt: "Você vê a ordem da viagem de imediato, sem vasculhar o rolo da câmera.",
      fr: "Vous voyez tout de suite l'ordre du voyage sans fouiller la pellicule.",
      th: "เห็นลำดับของทริปได้ทันที โดยไม่ต้องไล่หารูปในแกลเลอรี",
      vi: "Bạn thấy ngay thứ tự của chuyến đi mà không cần lục tìm trong thư viện ảnh.",
    },
    screenshotKey: "timeline",
    objectPosition: "center top",
  },
  {
    key: "map-recap",
    title: {
      en: "Revisit memories on a map",
      ko: "지도에서 다시 보는 여행의 순간",
      ja: "地図でたどる旅の瞬間",
      zh: "在地图上重看旅行瞬间",
      es: "Vuelve a tus recuerdos en el mapa",
      pt: "Reviva momentos no mapa",
      fr: "Retrouvez vos souvenirs sur la carte",
      th: "ย้อนดูช่วงเวลาของทริปบนแผนที่",
      vi: "Xem lại khoảnh khắc chuyến đi trên bản đồ",
    },
    body: {
      en: "Use the map view to return to where the day actually unfolded.",
      ko: "지도로 하루가 실제로 펼쳐진 위치를 다시 따라갈 수 있습니다.",
      ja: "地図表示で、その日が実際に広がった場所をもう一度たどれます。",
      zh: "通过地图视图，可以重新沿着那一天真正展开过的地点回看。",
      es: "Con la vista de mapa puedes volver por los lugares donde realmente se desplegó el día.",
      pt: "Com a visualização de mapa, você volta aos lugares onde o dia realmente aconteceu.",
      fr: "Avec la vue carte, vous revenez aux lieux où la journée s'est réellement déroulée.",
      th: "ใช้มุมมองแผนที่เพื่อตามกลับไปยังสถานที่ที่วันนั้นเกิดขึ้นจริง",
      vi: "Dùng chế độ bản đồ để quay lại những nơi mà ngày hôm đó thực sự đã diễn ra.",
    },
    screenshotKey: "tracking",
    objectPosition: "center 16%",
  },
];

const LANDING_COPY: LandingCopy = {
  eyebrow: {
    en: "MomentBook · Memorize your moments",
    ko: "MomentBook · 여행의 순간을 기억하세요",
    ja: "MomentBook · 旅の瞬間を記憶に",
    zh: "MomentBook · 记住旅行的每个瞬间",
    es: "MomentBook · Recuerda cada momento de tu viaje",
    pt: "MomentBook · Guarde cada momento da sua viagem",
    fr: "MomentBook · Gardez chaque moment du voyage en mémoire",
    th: "MomentBook · จดจำทุกช่วงเวลาของการเดินทาง",
    vi: "MomentBook · Ghi nhớ từng khoảnh khắc chuyến đi",
  },
  heroSubheadline: {
    en: "Upload your trip and get a clean travel timeline from the photos you already took.",
    ko: "이미 찍은 여행 사진을 올리면, 날짜와 장소 흐름이 보이는 깔끔한 타임라인이 만들어집니다.",
    ja: "すでに撮った旅行写真をアップロードすると、日付と場所の流れが見える整ったタイムラインができます。",
    zh: "上传已经拍好的旅行照片后，会生成一条能看出日期与地点流向的整洁时间线。",
    es: "Sube las fotos de viaje que ya tomaste y obtén una línea de tiempo clara, organizada por fecha y lugar.",
    pt: "Envie as fotos de viagem que você já tirou e receba uma linha do tempo clara, organizada por data e lugar.",
    fr: "Importez les photos de voyage déjà prises et obtenez une chronologie claire, organisée par date et lieu.",
    th: "อัปโหลดรูปทริปที่คุณถ่ายไว้แล้ว แล้วจะได้ไทม์ไลน์ที่เรียบร้อยซึ่งมองเห็นลำดับตามวันที่และสถานที่",
    vi: "Tải lên những ảnh chuyến đi bạn đã chụp, rồi nhận một dòng thời gian gọn gàng theo ngày và địa điểm.",
  },
  heroSubheadlineByDestination: (city) => ({
    en: `Upload your ${city} trip photos and get a clean travel timeline from the photos you already took.`,
    ko: `${city} 여행 사진을 올리면, 날짜와 장소 흐름이 보이는 깔끔한 타임라인이 만들어집니다.`,
    ja: `${city}旅行の写真をアップロードすると、日付と場所の流れが見える整ったタイムラインができます。`,
    zh: `上传 ${city} 旅行照片后，会生成一条能看出日期与地点流向的整洁时间线。`,
    es: `Sube las fotos de tu viaje a ${city} y obtén una línea de tiempo clara, organizada por fecha y lugar.`,
    pt: `Envie as fotos da sua viagem a ${city} e receba uma linha do tempo clara, organizada por data e lugar.`,
    fr: `Importez les photos de votre voyage à ${city} et obtenez une chronologie claire, organisée par date et lieu.`,
    th: `อัปโหลดรูปทริปที่ ${city} ของคุณ แล้วจะได้ไทม์ไลน์ที่เรียบร้อยซึ่งมองเห็นลำดับตามวันที่และสถานที่`,
    vi: `Tải lên ảnh chuyến đi ${city} của bạn, rồi nhận một dòng thời gian gọn gàng theo ngày và địa điểm.`,
  }),
  sectionBenefitsLabel: {
    en: "Benefits",
    ko: "핵심 변화",
    ja: "変化",
    zh: "主要变化",
    es: "Cambios clave",
    pt: "Mudanças principais",
    fr: "Changements clés",
    th: "สิ่งที่เปลี่ยนไป",
    vi: "Điểm thay đổi chính",
  },
  sectionSampleLabel: {
    en: "Sample",
    ko: "예시",
    ja: "例",
    zh: "示例",
    es: "Ejemplo",
    pt: "Exemplo",
    fr: "Exemple",
    th: "ตัวอย่าง",
    vi: "Ví dụ",
  },
  sectionInstallLabel: {
    en: "Install",
    ko: "설치",
    ja: "インストール",
    zh: "安装",
    es: "Instalar",
    pt: "Instalar",
    fr: "Installer",
    th: "ติดตั้ง",
    vi: "Cài đặt",
  },
  sampleTripLink: {
    en: "See a sample trip",
    ko: "예시 여행 보기",
    ja: "サンプル旅を見る",
    zh: "查看示例旅程",
    es: "Ver viaje de ejemplo",
    pt: "Ver viagem de exemplo",
    fr: "Voir un voyage d'exemple",
    th: "ดูทริปตัวอย่าง",
    vi: "Xem chuyến đi mẫu",
  },
  heroSteps: [
    {
      en: "Import photos",
      ko: "사진 가져오기",
      ja: "写真を取り込む",
      zh: "导入照片",
      es: "Importar fotos",
      pt: "Importar fotos",
      fr: "Importer des photos",
      th: "นำเข้ารูปภาพ",
      vi: "Nhập ảnh",
    },
    {
      en: "Sort by day and place",
      ko: "날짜와 장소 기준 정리",
      ja: "日付と場所で整理",
      zh: "按日期与地点整理",
      es: "Ordenar por día y lugar",
      pt: "Organizar por dia e lugar",
      fr: "Classer par date et lieu",
      th: "จัดตามวันที่และสถานที่",
      vi: "Sắp theo ngày và địa điểm",
    },
    {
      en: "Review the timeline",
      ko: "타임라인 확인",
      ja: "タイムラインを確認",
      zh: "查看时间线",
      es: "Revisar la línea de tiempo",
      pt: "Ver a linha do tempo",
      fr: "Voir la chronologie",
      th: "ดูไทม์ไลน์",
      vi: "Xem dòng thời gian",
    },
    {
      en: "Revisit on the map",
      ko: "지도에서 다시 보기",
      ja: "地図で振り返る",
      zh: "在地图上回看",
      es: "Volver en el mapa",
      pt: "Rever no mapa",
      fr: "Revenir sur la carte",
      th: "ย้อนดูบนแผนที่",
      vi: "Xem lại trên bản đồ",
    },
  ],
  trustItems: [
    {
      en: "Available on App Store",
      ko: "App Store에서 사용 가능",
      ja: "App Storeで利用可能",
      zh: "可在 App Store 使用",
      es: "Disponible en App Store",
      pt: "Disponível na App Store",
      fr: "Disponible sur l'App Store",
      th: "ใช้งานได้บน App Store",
      vi: "Có trên App Store",
    },
    {
      en: "Available on Google Play",
      ko: "Google Play에서 사용 가능",
      ja: "Google Playで利用可能",
      zh: "可在 Google Play 使用",
      es: "Disponible en Google Play",
      pt: "Disponível no Google Play",
      fr: "Disponible sur Google Play",
      th: "ใช้งานได้บน Google Play",
      vi: "Có trên Google Play",
    },
  ],
  benefitsTitle: {
    en: "What changes after the trip",
    ko: "여행이 끝난 뒤 달라지는 점",
    ja: "旅が終わったあとに変わること",
    zh: "旅行结束后会有什么变化",
    es: "Lo que cambia después del viaje",
    pt: "O que muda depois da viagem",
    fr: "Ce qui change après le voyage",
    th: "สิ่งที่เปลี่ยนไปหลังทริปจบ",
    vi: "Điều thay đổi sau chuyến đi",
  },
  benefitsLead: {
    en: "Keep the first explanation short: import once, see the trip in order, return to it on a map.",
    ko: "설명은 짧게 유지합니다. 한 번에 가져오고, 순서대로 보고, 지도에서 다시 돌아갑니다.",
    ja: "説明は短く保ちます。一度に取り込み、順番に見て、地図でもう一度たどれます。",
    zh: "说明保持简短：一次导入，按顺序查看，再在地图上回看。",
    es: "Lo mantenemos breve: importa una vez, míralo en orden y vuelve a ello en el mapa.",
    pt: "Mantemos a explicação curta: importe uma vez, veja em ordem e volte a ela no mapa.",
    fr: "L'explication reste courte : importez en une fois, regardez dans l'ordre et revenez-y sur la carte.",
    th: "คำอธิบายจะสั้นไว้ก่อน: นำเข้าเพียงครั้งเดียว ดูตามลำดับ แล้วกลับไปดูบนแผนที่อีกครั้ง",
    vi: "Giữ phần giải thích thật ngắn: tải vào một lần, xem theo thứ tự rồi trở lại trên bản đồ.",
  },
  sampleFallbackTitle: {
    en: "A sample trip, matched to the short when available",
    ko: "가능하면 쇼츠 맥락에 맞춘 예시 여행",
    ja: "できるだけショートの文脈に合うサンプル旅",
    zh: "尽量贴合短视频语境的示例旅程",
    es: "Un viaje de ejemplo ajustado al contexto del video corto",
    pt: "Uma viagem de exemplo alinhada ao contexto do vídeo curto",
    fr: "Un voyage d'exemple, si possible aligné au contexte de la vidéo courte",
    th: "ทริปตัวอย่างที่สอดคล้องกับบริบทของช็อตส์ถ้าเป็นไปได้",
    vi: "Chuyến đi mẫu, nếu có thể, khớp với ngữ cảnh của video ngắn",
  },
  sampleFallbackLead: {
    en: "Use destination-specific day flows so the first sample feels connected to what the visitor just watched.",
    ko: "방금 본 쇼츠와 이어지도록 여행지별 일자 흐름 예시를 보여줍니다.",
    ja: "いま見たショートとつながるように、旅先ごとの日別フロー例を見せます。",
    zh: "为了和刚看的短视频衔接，会展示按目的地准备的每日行程示例。",
    es: "Mostramos un ejemplo por destino y por día para que conecte con el video corto que acabas de ver.",
    pt: "Mostramos um exemplo por destino e por dia para que ele se conecte ao vídeo curto que você acabou de ver.",
    fr: "Nous montrons un exemple par destination et par jour pour prolonger naturellement la vidéo courte que vous venez de voir.",
    th: "แสดงตัวอย่างลำดับรายวันตามจุดหมาย เพื่อให้ต่อเนื่องจากช็อตส์ที่เพิ่งดู",
    vi: "Chúng tôi hiển thị ví dụ theo điểm đến và theo ngày để nối tự nhiên với video ngắn bạn vừa xem.",
  },
  finalTitle: {
    en: "Install MomentBook when you are ready to keep the trip",
    ko: "여행을 남기고 싶을 때 MomentBook을 설치하세요",
    ja: "旅を残したくなったら MomentBook をインストールしてください",
    zh: "想把这段旅行留下来时，就安装 MomentBook",
    es: "Instala MomentBook cuando quieras guardar el viaje",
    pt: "Instale o MomentBook quando quiser guardar a viagem",
    fr: "Installez MomentBook lorsque vous voulez garder le voyage",
    th: "ติดตั้ง MomentBook เมื่อคุณอยากเก็บทริปนี้ไว้",
    vi: "Hãy cài MomentBook khi bạn muốn giữ lại chuyến đi này",
  },
  finalLead: {
    en: "Use the official store links below. On mobile, the page can try to open the app first when deep links are configured.",
    ko: "아래 공식 스토어 링크를 사용하세요. 모바일에서는 딥링크가 설정되어 있으면 앱 열기를 먼저 시도할 수 있습니다.",
    ja: "下の公式ストアリンクを利用してください。モバイルでは、ディープリンクが設定されていれば先にアプリを開こうとします。",
    zh: "请使用下方官方商店链接。在移动端，如果已配置深链，会先尝试直接打开应用。",
    es: "Usa los enlaces oficiales de las tiendas de abajo. En móvil, si hay deep links configurados, la página puede intentar abrir primero la aplicación.",
    pt: "Use os links oficiais das lojas abaixo. No celular, se os deep links estiverem configurados, a página pode tentar abrir primeiro o aplicativo.",
    fr: "Utilisez les liens officiels des boutiques ci-dessous. Sur mobile, si les liens profonds sont configurés, la page peut d'abord essayer d'ouvrir l'application.",
    th: "ใช้ลิงก์สโตร์ทางการด้านล่าง บนมือถือ หากตั้งค่า deep link ไว้ หน้าเพจอาจลองเปิดแอปก่อน",
    vi: "Hãy dùng các liên kết cửa hàng chính thức bên dưới. Trên di động, nếu deep link đã được cấu hình, trang có thể thử mở ứng dụng trước.",
  },
  finalDesktopNote: {
    en: "On desktop, scan the code or use a store link, then continue on your phone.",
    ko: "데스크톱에서는 QR 코드를 스캔하거나 스토어 링크를 선택한 뒤 휴대폰에서 이어서 진행하세요.",
    ja: "デスクトップでは QR コードを読み取るかストアリンクを選んでから、スマートフォンで続けてください。",
    zh: "在桌面端，请扫描二维码或选择商店链接，然后到手机上继续。",
    es: "En escritorio, escanea el código o elige un enlace de la tienda y continúa en tu teléfono.",
    pt: "No desktop, escaneie o código ou escolha um link da loja e continue no celular.",
    fr: "Sur ordinateur, scannez le code ou choisissez un lien vers la boutique, puis continuez sur votre téléphone.",
    th: "บนเดสก์ท็อป ให้สแกนโค้ดหรือเลือกลิงก์สโตร์ แล้วไปทำต่อบนโทรศัพท์ของคุณ",
    vi: "Trên máy tính, hãy quét mã hoặc chọn một liên kết cửa hàng rồi tiếp tục trên điện thoại của bạn.",
  },
  desktopQrTitle: {
    en: "Scan to continue on your phone",
    ko: "휴대폰으로 이어서 설치하기",
    ja: "スマートフォンで続ける",
    zh: "在手机上继续",
    es: "Escanea y sigue en tu teléfono",
    pt: "Escaneie e continue no celular",
    fr: "Scannez pour continuer sur votre téléphone",
    th: "สแกนแล้วทำต่อบนโทรศัพท์",
    vi: "Quét mã để tiếp tục trên điện thoại",
  },
  desktopQrLead: {
    en: "Scanning opens the official store for this phone right away.",
    ko: "코드를 스캔하면 휴대폰에서 기기에 맞는 공식 스토어가 바로 열립니다.",
    ja: "コードを読み取ると、このスマートフォンに合った公式ストアがすぐに開きます。",
    zh: "扫描二维码后，手机会直接打开适合该设备的官方商店。",
    es: "Al escanear, se abre de inmediato la tienda oficial adecuada para este teléfono.",
    pt: "Ao escanear, a loja oficial certa para este celular é aberta imediatamente.",
    fr: "En scannant, la boutique officielle adaptée à ce téléphone s'ouvre directement.",
    th: "เมื่อสแกน โค้ดจะเปิดสโตร์ทางการที่ตรงกับโทรศัพท์เครื่องนี้ทันที",
    vi: "Khi quét, cửa hàng chính thức phù hợp với điện thoại này sẽ mở ngay.",
  },
  openInAppLabel: {
    en: "Open in app",
    ko: "앱에서 열기",
    ja: "アプリで開く",
    zh: "在应用中打开",
    es: "Abrir en la aplicación",
    pt: "Abrir no aplicativo",
    fr: "Ouvrir dans l'application",
    th: "เปิดในแอป",
    vi: "Mở trong ứng dụng",
  },
  installBarLead: {
    en: "Keep going in MomentBook",
    ko: "MomentBook에서 이어서 보기",
    ja: "MomentBookで続きを見る",
    zh: "在 MomentBook 继续查看",
    es: "Seguir en MomentBook",
    pt: "Continuar no MomentBook",
    fr: "Continuer dans MomentBook",
    th: "ดูต่อใน MomentBook",
    vi: "Tiếp tục trong MomentBook",
  },
  installBarAction: {
    en: "Get it on Google Play",
    ko: "Google Play에서 받기",
    ja: "Google Play で入手",
    zh: "在 Google Play 获取",
    es: "Conseguir en Google Play",
    pt: "Baixar no Google Play",
    fr: "Télécharger sur Google Play",
    th: "รับใน Google Play",
    vi: "Tải trên Google Play",
  },
  timelineViewLabel: {
    en: "Timeline view in MomentBook",
    ko: "MomentBook 타임라인 화면",
    ja: "MomentBook のタイムライン画面",
    zh: "MomentBook 时间线画面",
    es: "Vista de línea de tiempo en MomentBook",
    pt: "Tela de linha do tempo no MomentBook",
    fr: "Vue chronologique dans MomentBook",
    th: "หน้าจอไทม์ไลน์ใน MomentBook",
    vi: "Màn hình dòng thời gian trong MomentBook",
  },
  dismissLabel: {
    en: "Close",
    ko: "닫기",
    ja: "閉じる",
    zh: "关闭",
    es: "Cerrar",
    pt: "Fechar",
    fr: "Fermer",
    th: "ปิด",
    vi: "Đóng",
  },
};

const DESTINATION_SAMPLES: Record<DestinationSampleKey, DestinationSample> = {
  default: {
    key: "default",
    city: {
      en: "Sample trip",
      ko: "예시 여행",
      ja: "サンプル旅",
      zh: "示例旅程",
      es: "Viaje de ejemplo",
      pt: "Viagem de exemplo",
      fr: "Voyage d'exemple",
      th: "ทริปตัวอย่าง",
      vi: "Chuyến đi mẫu",
    },
    heroLabel: {
      en: "Short-led sample",
      ko: "쇼츠 맥락 예시",
      ja: "ショート文脈の例",
      zh: "短视频语境示例",
      es: "Ejemplo desde el video corto",
      pt: "Exemplo vindo do vídeo curto",
      fr: "Exemple lié à la vidéo courte",
      th: "ตัวอย่างตามบริบทจากช็อตส์",
      vi: "Ví dụ theo ngữ cảnh video ngắn",
    },
    sectionTitle: {
      en: "A calm sample timeline",
      ko: "차분하게 보는 예시 타임라인",
      ja: "落ち着いて見られるサンプルタイムライン",
      zh: "适合安静回看的示例时间线",
      es: "Una línea de tiempo de ejemplo, serena",
      pt: "Uma linha do tempo de exemplo, tranquila",
      fr: "Une chronologie d'exemple à regarder calmement",
      th: "ไทม์ไลน์ตัวอย่างที่ดูได้อย่างสงบ",
      vi: "Dòng thời gian mẫu để xem một cách nhẹ nhàng",
    },
    sectionLead: {
      en: "Use a nearby example when the short does not pass a destination yet.",
      ko: "쇼츠에서 여행지를 전달하지 못했을 때는 가까운 예시를 먼저 보여줍니다.",
      ja: "ショートでまだ旅先が伝わっていないときは、近い例を先に見せます。",
      zh: "当短视频里还没有明确旅行地时，会先展示一个接近的示例。",
      es: "Cuando el video corto todavía no muestra el destino, enseñamos primero un ejemplo cercano.",
      pt: "Quando o vídeo curto ainda não mostra o destino, exibimos primeiro um exemplo próximo.",
      fr: "Quand la vidéo courte ne transmet pas encore la destination, nous montrons d'abord un exemple proche.",
      th: "ถ้าช็อตส์ยังไม่ได้บอกจุดหมาย เราจะแสดงตัวอย่างที่ใกล้เคียงก่อน",
      vi: "Khi video ngắn chưa truyền được điểm đến, chúng tôi sẽ hiển thị trước một ví dụ gần nhất.",
    },
    days: [
      {
        dayLabel: DAY_LABELS.day1,
        title: {
          en: "Arrival and first walk",
          ko: "도착 후 첫 산책",
          ja: "到着後の最初の散歩",
          zh: "抵达后的第一段散步",
          es: "Primer paseo tras la llegada",
          pt: "Primeira caminhada após a chegada",
          fr: "Première promenade après l'arrivée",
          th: "เดินเล่นครั้งแรกหลังเดินทางถึง",
          vi: "Buổi dạo đầu tiên sau khi đến",
        },
        note: {
          en: "Group the first photos into one arrival block so the trip starts cleanly.",
          ko: "첫 사진을 하나의 도착 블록으로 묶어 여행 시작을 깔끔하게 정리합니다.",
          ja: "最初の写真をひとつの到着ブロックにまとめ、旅の始まりをすっきり残します。",
          zh: "把最初几张照片归成一个抵达区块，让旅程开头更清晰。",
          es: "Agrupa las primeras fotos en un bloque de llegada para dejar limpio el inicio del viaje.",
          pt: "Reúna as primeiras fotos em um bloco de chegada para deixar o começo da viagem mais limpo.",
          fr: "Regroupez les premières photos dans un seul bloc d'arrivée pour laisser un début de voyage net.",
          th: "รวมรูปชุดแรกไว้ในบล็อกการมาถึงเดียว เพื่อให้จุดเริ่มของทริปดูชัดและเรียบร้อย",
          vi: "Gộp những ảnh đầu tiên vào một khối đến nơi để mở đầu chuyến đi gọn gàng hơn.",
        },
      },
      {
        dayLabel: DAY_LABELS.day2,
        title: {
          en: "Main route in order",
          ko: "주요 동선을 순서대로",
          ja: "主な動線を順番に",
          zh: "按顺序看主要路线",
          es: "El recorrido principal, en orden",
          pt: "O trajeto principal, em ordem",
          fr: "Le trajet principal, dans l'ordre",
          th: "เส้นทางหลักตามลำดับ",
          vi: "Lộ trình chính theo đúng thứ tự",
        },
        note: {
          en: "Follow the trip by time, not by whatever the camera roll surfaces first.",
          ko: "카메라 롤 순서가 아니라 실제 여행 시간 순서로 따라갑니다.",
          ja: "カメラロールの並びではなく、実際の旅の時間順でたどります。",
          zh: "不是按相册里的顺序，而是按真实旅行的时间顺序来回看。",
          es: "Se sigue el viaje por el orden real del tiempo, no por lo que aparezca primero en el carrete.",
          pt: "A viagem é seguida pela ordem real do tempo, não pelo que aparece primeiro no rolo da câmera.",
          fr: "On suit le voyage dans son ordre réel, pas selon ce que la pellicule affiche d'abord.",
          th: "ติดตามทริปตามลำดับเวลาจริง ไม่ใช่ตามลำดับที่โผล่ในแกลเลอรีก่อน",
          vi: "Theo dõi chuyến đi theo đúng trình tự thời gian thực tế, không phải theo thứ tự ảnh hiện lên trong thư viện.",
        },
      },
      {
        dayLabel: DAY_LABELS.day3,
        title: {
          en: "Map recap before you leave",
          ko: "떠나기 전 지도 recap",
          ja: "出発前に地図で振り返る",
          zh: "离开前在地图上回看",
          es: "Repaso en el mapa antes de partir",
          pt: "Revisão no mapa antes de ir embora",
          fr: "Retour sur la carte avant le départ",
          th: "ย้อนดูบนแผนที่ก่อนออกเดินทาง",
          vi: "Nhìn lại trên bản đồ trước khi rời đi",
        },
        note: {
          en: "Return to the last places quickly before the trip fades into the gallery.",
          ko: "여행이 갤러리에 흩어지기 전에 마지막 장소를 빠르게 다시 봅니다.",
          ja: "旅がギャラリーに埋もれる前に、最後の場所をすばやく見返せます。",
          zh: "在旅程散进相册之前，可以快速回看最后到过的地点。",
          es: "Puedes volver rápido a los últimos lugares antes de que el viaje se disperse en la galería.",
          pt: "Você revisita rapidamente os últimos lugares antes que a viagem se espalhe pela galeria.",
          fr: "Vous retrouvez vite les derniers lieux avant que le voyage ne se disperse dans la galerie.",
          th: "ย้อนดูสถานที่สุดท้ายได้อย่างรวดเร็ว ก่อนที่ทริปจะกระจายหายไปในแกลเลอรี",
          vi: "Bạn có thể xem lại nhanh những địa điểm cuối cùng trước khi chuyến đi bị phân tán trong thư viện.",
        },
      },
    ],
  },
  paris: {
    key: "paris",
    city: {
      en: "Paris",
      ko: "파리",
      ja: "パリ",
      zh: "巴黎",
      es: "París",
      pt: "Paris",
      fr: "Paris",
      th: "ปารีส",
      vi: "Paris",
    },
    heroLabel: {
      en: "Paris sample",
      ko: "파리 예시",
      ja: "パリの例",
      zh: "巴黎示例",
      es: "Ejemplo de París",
      pt: "Exemplo de Paris",
      fr: "Exemple Paris",
      th: "ตัวอย่างปารีส",
      vi: "Ví dụ Paris",
    },
    sectionTitle: {
      en: "A Paris sample timeline",
      ko: "파리 예시 타임라인",
      ja: "パリのサンプルタイムライン",
      zh: "巴黎示例时间线",
      es: "Una línea de tiempo de ejemplo en París",
      pt: "Uma linha do tempo de exemplo em Paris",
      fr: "Une chronologie d'exemple à Paris",
      th: "ไทม์ไลน์ตัวอย่างของปารีส",
      vi: "Dòng thời gian mẫu của Paris",
    },
    sectionLead: {
      en: "Use the same message from the short: one trip, ordered by day and place.",
      ko: "쇼츠에서 본 메시지를 그대로 이어갑니다. 하나의 여행을 날짜와 장소로 정리합니다.",
      ja: "ショートで見たメッセージをそのままつなぎます。ひとつの旅を日付と場所で整理します。",
      zh: "延续短视频里刚看到的信息，把一次旅行按日期和地点整理出来。",
      es: "Continúa el mismo mensaje del video corto: un viaje ordenado por fecha y lugar.",
      pt: "Segue a mesma mensagem do vídeo curto: uma viagem organizada por data e lugar.",
      fr: "On prolonge le message de la vidéo courte : un seul voyage, organisé par date et lieu.",
      th: "ต่อจากข้อความในช็อตส์ทันที จัดหนึ่งทริปตามวันที่และสถานที่",
      vi: "Tiếp đúng thông điệp từ video ngắn: một chuyến đi được sắp theo ngày và địa điểm.",
    },
    days: [
      {
        dayLabel: DAY_LABELS.day1,
        title: {
          en: "Saint-Germain to the Seine",
          ko: "생제르맹에서 센 강까지",
          ja: "サンジェルマンからセーヌ川まで",
          zh: "从圣日耳曼到塞纳河",
          es: "De Saint-Germain al Sena",
          pt: "De Saint-Germain ao Sena",
          fr: "De Saint-Germain à la Seine",
          th: "จากแซงต์แชร์กแมงถึงแม่น้ำแซน",
          vi: "Từ Saint-Germain đến sông Seine",
        },
        note: {
          en: "Morning cafe photos and river walk shots stay in one first-day block.",
          ko: "아침 카페 사진과 센 강 산책 사진이 첫날 블록으로 함께 정리됩니다.",
          ja: "朝のカフェ写真とセーヌ川の散歩写真が、初日のブロックに一緒にまとまります。",
          zh: "清晨咖啡馆照片和塞纳河散步照片会一起整理进第一天的区块。",
          es: "Las fotos del café de la mañana y del paseo por el Sena se ordenan juntas en el bloque del primer día.",
          pt: "As fotos do café da manhã e da caminhada pelo Sena ficam juntas no bloco do primeiro dia.",
          fr: "Les photos du café du matin et de la promenade sur la Seine restent ensemble dans le bloc du premier jour.",
          th: "รูปคาเฟ่ตอนเช้าและรูปเดินเล่นริมแม่น้ำแซนจะถูกรวมไว้ในบล็อกของวันแรก",
          vi: "Ảnh quán cà phê buổi sáng và ảnh đi dạo bên sông Seine được gom chung vào khối ngày đầu.",
        },
      },
      {
        dayLabel: DAY_LABELS.day2,
        title: {
          en: "Louvre to Montmartre",
          ko: "루브르에서 몽마르트까지",
          ja: "ルーブルからモンマルトルまで",
          zh: "从卢浮宫到蒙马特",
          es: "Del Louvre a Montmartre",
          pt: "Do Louvre a Montmartre",
          fr: "Du Louvre à Montmartre",
          th: "จากลูฟวร์ถึงมงมาร์ตร์",
          vi: "Từ Louvre đến Montmartre",
        },
        note: {
          en: "Museum, metro, and evening hill views become one continuous timeline.",
          ko: "박물관, 지하철, 저녁 언덕 풍경이 하나의 연속된 타임라인이 됩니다.",
          ja: "美術館、地下鉄、夕方の丘の景色が、ひと続きのタイムラインになります。",
          zh: "博物馆、地铁和傍晚山丘风景会连成一条连续时间线。",
          es: "Museo, metro y paisaje de la colina al atardecer forman una sola línea de tiempo continua.",
          pt: "Museu, metrô e vista da colina ao entardecer viram uma linha do tempo contínua.",
          fr: "Musée, métro et vue de la colline au soir forment une seule chronologie continue.",
          th: "พิพิธภัณฑ์ รถไฟใต้ดิน และวิวเนินยามเย็นจะกลายเป็นไทม์ไลน์ต่อเนื่องเดียว",
          vi: "Bảo tàng, tàu điện ngầm và khung cảnh đồi buổi tối trở thành một dòng thời gian liền mạch.",
        },
      },
      {
        dayLabel: DAY_LABELS.day3,
        title: {
          en: "Canal walk and last dinner",
          ko: "운하 산책과 마지막 저녁",
          ja: "運河の散歩と最後の夕食",
          zh: "运河散步与最后的晚餐",
          es: "Paseo por el canal y última cena",
          pt: "Caminhada pelo canal e último jantar",
          fr: "Balade le long du canal et dernier dîner",
          th: "เดินเล่นริมคลองและมื้อเย็นสุดท้าย",
          vi: "Đi dạo bên kênh và bữa tối cuối cùng",
        },
        note: {
          en: "The closing day stays easy to revisit without searching the whole gallery again.",
          ko: "마지막 날도 갤러리 전체를 다시 뒤지지 않고 바로 돌아볼 수 있습니다.",
          ja: "最終日も、ギャラリー全体を探し直さなくてもすぐに見返せます。",
          zh: "最后一天也能立刻回看，不必再翻完整个相册。",
          es: "El último día también se puede revisar enseguida, sin volver a buscar en toda la galería.",
          pt: "O último dia também pode ser revisitado rapidamente, sem procurar de novo em toda a galeria.",
          fr: "La dernière journée reste facile à revoir sans fouiller toute la galerie.",
          th: "วันสุดท้ายก็ย้อนดูได้ทันที โดยไม่ต้องกลับไปค้นทั้งแกลเลอรีอีก",
          vi: "Ngày cuối vẫn có thể xem lại ngay mà không cần lục lại toàn bộ thư viện.",
        },
      },
    ],
  },
  tokyo: {
    key: "tokyo",
    city: {
      en: "Tokyo",
      ko: "도쿄",
      ja: "東京",
      zh: "东京",
      es: "Tokio",
      pt: "Tóquio",
      fr: "Tokyo",
      th: "โตเกียว",
      vi: "Tokyo",
    },
    heroLabel: {
      en: "Tokyo sample",
      ko: "도쿄 예시",
      ja: "東京の例",
      zh: "东京示例",
      es: "Ejemplo de Tokio",
      pt: "Exemplo de Tóquio",
      fr: "Exemple Tokyo",
      th: "ตัวอย่างโตเกียว",
      vi: "Ví dụ Tokyo",
    },
    sectionTitle: {
      en: "A Tokyo sample timeline",
      ko: "도쿄 예시 타임라인",
      ja: "東京のサンプルタイムライン",
      zh: "东京示例时间线",
      es: "Una línea de tiempo de ejemplo en Tokio",
      pt: "Uma linha do tempo de exemplo em Tóquio",
      fr: "Une chronologie d'exemple à Tokyo",
      th: "ไทม์ไลน์ตัวอย่างของโตเกียว",
      vi: "Dòng thời gian mẫu của Tokyo",
    },
    sectionLead: {
      en: "Keep the pacing simple: neighborhood to neighborhood, day by day.",
      ko: "동네에서 동네로, 날짜 순서대로 단순하게 보여줍니다.",
      ja: "街から街へ、日付順にシンプルに見せます。",
      zh: "从街区到街区，按日期顺序简单呈现。",
      es: "Lo muestra de forma simple, de barrio en barrio y por orden de días.",
      pt: "Mostra de forma simples, de bairro em bairro e em ordem de dias.",
      fr: "On le montre simplement, de quartier en quartier et jour après jour.",
      th: "เล่าอย่างเรียบง่าย จากย่านหนึ่งไปอีกย่านหนึ่ง ตามลำดับวัน",
      vi: "Hiển thị đơn giản, từ khu này sang khu khác, theo thứ tự từng ngày.",
    },
    days: [
      {
        dayLabel: DAY_LABELS.day1,
        title: {
          en: "Asakusa to Ueno",
          ko: "아사쿠사에서 우에노까지",
          ja: "浅草から上野まで",
          zh: "从浅草到上野",
          es: "De Asakusa a Ueno",
          pt: "De Asakusa a Ueno",
          fr: "D'Asakusa à Ueno",
          th: "จากอาซากุสะถึงอุเอโนะ",
          vi: "Từ Asakusa đến Ueno",
        },
        note: {
          en: "Temple shots, market photos, and park stops stay connected in one day card.",
          ko: "절, 시장, 공원 사진이 하루 카드 안에 자연스럽게 이어집니다.",
          ja: "寺院、市場、公園の写真が、1日のカードの中で自然につながります。",
          zh: "寺庙、市场和公园照片会自然连在同一天的卡片里。",
          es: "Las fotos del templo, el mercado y el parque se conectan con naturalidad dentro de una misma tarjeta del día.",
          pt: "As fotos do templo, do mercado e do parque se conectam naturalmente dentro do cartão de um mesmo dia.",
          fr: "Les photos du temple, du marché et du parc se suivent naturellement dans une même carte de journée.",
          th: "รูปวัด ตลาด และสวนจะต่อเนื่องกันอย่างเป็นธรรมชาติภายในการ์ดของวันเดียว",
          vi: "Ảnh đền, chợ và công viên nối với nhau tự nhiên trong cùng một thẻ ngày.",
        },
      },
      {
        dayLabel: DAY_LABELS.day2,
        title: {
          en: "Shibuya crossing to Yoyogi",
          ko: "시부야에서 요요기까지",
          ja: "渋谷から代々木まで",
          zh: "从涩谷到代代木",
          es: "De Shibuya a Yoyogi",
          pt: "De Shibuya a Yoyogi",
          fr: "De Shibuya à Yoyogi",
          th: "จากชิบุยะถึงโยโยงิ",
          vi: "Từ Shibuya đến Yoyogi",
        },
        note: {
          en: "Busy city scenes and a quieter park walk can still sit in one clean timeline.",
          ko: "분주한 도심과 조용한 공원 산책도 하나의 깔끔한 타임라인에 담깁니다.",
          ja: "にぎやかな都心と静かな公園の散歩も、ひとつのすっきりしたタイムラインに収まります。",
          zh: "热闹的都市景象和安静的公园散步，也能放进同一条清晰时间线里。",
          es: "Las escenas urbanas agitadas y el paseo tranquilo por el parque también caben en una sola línea de tiempo limpia.",
          pt: "As cenas agitadas da cidade e a caminhada tranquila no parque também cabem em uma única linha do tempo limpa.",
          fr: "Les scènes urbaines animées et la promenade calme dans le parc trouvent aussi leur place dans une même chronologie claire.",
          th: "ทั้งภาพเมืองที่คึกคักและการเดินเล่นในสวนแบบเงียบสงบก็อยู่ในไทม์ไลน์เดียวกันได้อย่างเรียบร้อย",
          vi: "Cảnh phố xá nhộn nhịp và cuộc đi bộ yên tĩnh trong công viên vẫn nằm gọn trong cùng một dòng thời gian rõ ràng.",
        },
      },
      {
        dayLabel: DAY_LABELS.day3,
        title: {
          en: "Morning coffee and the final train",
          ko: "아침 커피와 마지막 열차",
          ja: "朝のコーヒーと最後の列車",
          zh: "清晨咖啡与最后一班列车",
          es: "Café de la mañana y último tren",
          pt: "Café da manhã e o último trem",
          fr: "Café du matin et dernier train",
          th: "กาแฟยามเช้าและรถไฟขบวนสุดท้าย",
          vi: "Cà phê buổi sáng và chuyến tàu cuối",
        },
        note: {
          en: "The trip closes with a short recap instead of ending as loose photos.",
          ko: "흩어진 사진으로 끝나는 대신 짧은 recap으로 여행을 닫습니다.",
          ja: "旅は、ばらばらの写真で終わる代わりに、短い振り返りで締めくくられます。",
          zh: "旅程不会以零散照片结束，而是用一段简短回看收尾。",
          es: "En vez de terminar en fotos sueltas, el viaje se cierra con un breve repaso.",
          pt: "Em vez de terminar em fotos soltas, a viagem se fecha com um breve resumo.",
          fr: "Au lieu de finir en photos éparses, le voyage se referme avec un bref retour.",
          th: "แทนที่จะจบลงเป็นรูปกระจัดกระจาย ทริปจะปิดท้ายด้วยการย้อนดูสั้นๆ",
          vi: "Thay vì kết thúc bằng những bức ảnh rời rạc, chuyến đi khép lại bằng một phần nhìn lại ngắn.",
        },
      },
    ],
  },
  jeju: {
    key: "jeju",
    city: {
      en: "Jeju",
      ko: "제주",
      ja: "済州",
      zh: "济州",
      es: "Jeju",
      pt: "Jeju",
      fr: "Jeju",
      th: "เชจู",
      vi: "Jeju",
    },
    heroLabel: {
      en: "Jeju sample",
      ko: "제주 예시",
      ja: "済州の例",
      zh: "济州示例",
      es: "Ejemplo de Jeju",
      pt: "Exemplo de Jeju",
      fr: "Exemple Jeju",
      th: "ตัวอย่างเชจู",
      vi: "Ví dụ Jeju",
    },
    sectionTitle: {
      en: "A Jeju sample timeline",
      ko: "제주 예시 타임라인",
      ja: "済州のサンプルタイムライン",
      zh: "济州示例时间线",
      es: "Una línea de tiempo de ejemplo en Jeju",
      pt: "Uma linha do tempo de exemplo em Jeju",
      fr: "Une chronologie d'exemple à Jeju",
      th: "ไทม์ไลน์ตัวอย่างของเชจู",
      vi: "Dòng thời gian mẫu của Jeju",
    },
    sectionLead: {
      en: "Use the sample already inside MomentBook to show how one quiet route becomes a memory path.",
      ko: "MomentBook 안의 예시를 그대로 사용해 조용한 동선이 기억의 경로가 되는 방식을 보여줍니다.",
      ja: "MomentBook内のサンプルをそのまま使い、静かな動線が記憶の道になる様子を見せます。",
      zh: "直接使用 MomentBook 里的示例，展示安静路线如何成为记忆的路径。",
      es: "Usamos tal cual el ejemplo dentro de MomentBook para mostrar cómo un recorrido tranquilo se vuelve una ruta de memoria.",
      pt: "Usamos o exemplo que já existe no MomentBook para mostrar como um trajeto tranquilo vira um caminho de memória.",
      fr: "Nous utilisons l'exemple déjà présent dans MomentBook pour montrer comment un trajet calme devient un chemin de mémoire.",
      th: "ใช้ตัวอย่างที่มีอยู่ใน MomentBook เพื่อให้เห็นว่าเส้นทางที่เงียบสงบกลายเป็นเส้นทางแห่งความทรงจำได้อย่างไร",
      vi: "Dùng chính ví dụ có sẵn trong MomentBook để cho thấy một lộ trình yên tĩnh trở thành đường ký ức như thế nào.",
    },
    days: [
      {
        dayLabel: DAY_LABELS.day1,
        title: {
          en: "Stone Park to Woljeongri Beach",
          ko: "돌문화공원에서 월정리 해변까지",
          ja: "石文化公園から月汀里ビーチまで",
          zh: "从石文化公园到月汀里海边",
          es: "Del Parque de Piedra a la playa de Woljeongri",
          pt: "Do Parque de Pedra à praia de Woljeongri",
          fr: "Du parc des pierres à la plage de Woljeongri",
          th: "จากสวนวัฒนธรรมหินถึงหาดวอลจองรี",
          vi: "Từ Công viên Đá đến bãi biển Woljeongri",
        },
        note: {
          en: "Keep the first coastal route as one story instead of scattered photos.",
          ko: "첫 해안 동선을 흩어진 사진이 아니라 하나의 이야기로 남깁니다.",
          ja: "最初の海沿いの動線を、散らばった写真ではなくひとつの物語として残します。",
          zh: "把第一段海岸路线留成一个完整故事，而不是零散照片。",
          es: "Guarda la primera ruta costera como una sola historia, no como fotos dispersas.",
          pt: "Guarda o primeiro trajeto costeiro como uma única história, e não como fotos espalhadas.",
          fr: "La première route côtière reste comme une seule histoire, plutôt qu'une série de photos dispersées.",
          th: "เก็บเส้นทางชายฝั่งช่วงแรกไว้เป็นเรื่องเดียว แทนที่จะเป็นรูปที่กระจัดกระจาย",
          vi: "Giữ chặng ven biển đầu tiên như một câu chuyện duy nhất thay vì những bức ảnh rải rác.",
        },
      },
      {
        dayLabel: DAY_LABELS.day2,
        title: {
          en: "Seongsan sunrise and east coast stops",
          ko: "성산 일출과 동쪽 해안 정차",
          ja: "城山の日の出と東海岸の立ち寄り",
          zh: "城山日出与东海岸停留点",
          es: "Amanecer en Seongsan y paradas por la costa este",
          pt: "Nascer do sol em Seongsan e paradas na costa leste",
          fr: "Lever de soleil à Seongsan et arrêts sur la côte est",
          th: "พระอาทิตย์ขึ้นที่ซองซานและจุดแวะชายฝั่งตะวันออก",
          vi: "Bình minh Seongsan và các điểm dừng ở bờ đông",
        },
        note: {
          en: "Photos from multiple scenic stops stay in order by time and place.",
          ko: "여러 풍경 지점의 사진도 시간과 장소 순서대로 유지됩니다.",
          ja: "複数の景色ポイントの写真も、時間と場所の順序が保たれます。",
          zh: "多处景观点的照片也会按照时间与地点顺序保留下来。",
          es: "Las fotos de varios puntos escénicos también se mantienen en orden por tiempo y lugar.",
          pt: "As fotos de vários pontos cênicos também se mantêm em ordem por tempo e lugar.",
          fr: "Les photos de plusieurs points de vue restent elles aussi dans l'ordre du temps et du lieu.",
          th: "แม้จะเป็นรูปจากหลายจุดชมวิว ก็ยังคงเรียงตามเวลาและสถานที่",
          vi: "Ngay cả ảnh từ nhiều điểm ngắm cảnh cũng vẫn giữ đúng thứ tự thời gian và địa điểm.",
        },
      },
      {
        dayLabel: DAY_LABELS.day3,
        title: {
          en: "Hallasan foothills and a quiet finish",
          ko: "한라산 자락과 조용한 마무리",
          ja: "漢拏山のふもとと静かな締めくくり",
          zh: "汉拏山山麓与安静的收尾",
          es: "Laderas del Hallasan y cierre tranquilo",
          pt: "Encostas do Hallasan e um fim tranquilo",
          fr: "Contreforts du Hallasan et fin tranquille",
          th: "เชิงเขาฮัลลาซานและการปิดท้ายอย่างเงียบสงบ",
          vi: "Sườn Hallasan và một kết thúc yên tĩnh",
        },
        note: {
          en: "The final day becomes easy to revisit before the trip fades into the archive.",
          ko: "여행이 아카이브로 넘어가기 전에 마지막 날을 쉽게 다시 볼 수 있습니다.",
          ja: "旅がアーカイブに移る前に、最終日を簡単に見返せます。",
          zh: "在旅程进入归档之前，可以轻松回看最后一天。",
          es: "Puedes volver fácilmente al último día antes de que el viaje pase al archivo.",
          pt: "Você pode rever facilmente o último dia antes que a viagem vá para o arquivo.",
          fr: "Vous pouvez revoir facilement le dernier jour avant que le voyage ne passe à l'archive.",
          th: "ย้อนดูวันสุดท้ายได้ง่าย ก่อนที่ทริปจะย้ายไปอยู่ในคลัง",
          vi: "Bạn có thể xem lại dễ dàng ngày cuối trước khi chuyến đi chuyển vào lưu trữ.",
        },
      },
    ],
  },
};

function readText(lang: Language, value: LocalizedText) {
  return value[lang] ?? value.en;
}

function normalizeDestinationValue(dest: string | null | undefined) {
  if (!dest) {
    return "default";
  }

  const normalized = dest.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (!normalized) {
    return "default";
  }

  if (normalized in DESTINATION_SAMPLES) {
    return normalized as DestinationSampleKey;
  }

  return "default";
}

export function normalizeInstallLandingVariant(value: string | null | undefined) {
  if (!value) {
    return HERO_HEADLINE_OPTIONS[0].key;
  }

  const matchedOption = HERO_HEADLINE_OPTIONS.find((option) => option.key === value);
  return matchedOption?.key ?? HERO_HEADLINE_OPTIONS[0].key;
}

export function getDestinationSampleKey(value: string | null | undefined) {
  return normalizeDestinationValue(value);
}

export function getInstallLandingContent(
  lang: Language,
  options: {
    dest?: string | null;
    variant?: string | null;
  } = {},
): InstallLandingContent {
  const destinationKey = getDestinationSampleKey(options.dest);
  const destination = DESTINATION_SAMPLES[destinationKey];
  const headlineKey = normalizeInstallLandingVariant(options.variant);
  const activeHeadline =
    HERO_HEADLINE_OPTIONS.find((option) => option.key === headlineKey) ?? HERO_HEADLINE_OPTIONS[0];
  const heroSubheadline = destinationKey === "default"
    ? readText(lang, LANDING_COPY.heroSubheadline)
    : readText(
        lang,
        LANDING_COPY.heroSubheadlineByDestination(readText(lang, destination.city)),
      );

  return {
    heroHeadlineKey: activeHeadline.key,
    heroHeadline: readText(lang, activeHeadline.text),
    eyebrow: readText(lang, LANDING_COPY.eyebrow),
    heroSubheadline,
    sectionBenefitsLabel: readText(lang, LANDING_COPY.sectionBenefitsLabel),
    sectionSampleLabel: readText(lang, LANDING_COPY.sectionSampleLabel),
    sectionInstallLabel: readText(lang, LANDING_COPY.sectionInstallLabel),
    sampleTripLink: readText(lang, LANDING_COPY.sampleTripLink),
    heroSteps: LANDING_COPY.heroSteps.map((step) => readText(lang, step)),
    trustItems: LANDING_COPY.trustItems.map((item) => readText(lang, item)),
    benefitsTitle: readText(lang, LANDING_COPY.benefitsTitle),
    benefitsLead: readText(lang, LANDING_COPY.benefitsLead),
    benefits: BENEFIT_CARDS.map((benefit) => ({
      key: benefit.key,
      title: readText(lang, benefit.title),
      body: readText(lang, benefit.body),
      screenshotSrc: getLocalizedScreenshotPath(lang, benefit.screenshotKey),
      objectPosition: benefit.objectPosition,
    })),
    sample: {
      key: destination.key,
      city: readText(lang, destination.city),
      heroLabel: readText(lang, destination.heroLabel),
      sectionTitle: destinationKey === "default"
        ? readText(lang, LANDING_COPY.sampleFallbackTitle)
        : readText(lang, destination.sectionTitle),
      sectionLead: destinationKey === "default"
        ? readText(lang, LANDING_COPY.sampleFallbackLead)
        : readText(lang, destination.sectionLead),
      days: destination.days.map((day) => ({
        dayLabel: readText(lang, day.dayLabel),
        title: readText(lang, day.title),
        note: readText(lang, day.note),
      })),
    },
    finalTitle: readText(lang, LANDING_COPY.finalTitle),
    finalLead: readText(lang, LANDING_COPY.finalLead),
    finalDesktopNote: readText(lang, LANDING_COPY.finalDesktopNote),
    desktopQrTitle: readText(lang, LANDING_COPY.desktopQrTitle),
    desktopQrLead: readText(lang, LANDING_COPY.desktopQrLead),
    openInAppLabel: readText(lang, LANDING_COPY.openInAppLabel),
    installBarLead: readText(lang, LANDING_COPY.installBarLead),
    installBarAction: readText(lang, LANDING_COPY.installBarAction),
    timelineViewLabel: readText(lang, LANDING_COPY.timelineViewLabel),
    dismissLabel: readText(lang, LANDING_COPY.dismissLabel),
    heroFrames: [
      { key: "intro", src: getLocalizedScreenshotPath(lang, "intro") },
      { key: "photos", src: getLocalizedScreenshotPath(lang, "photos") },
      { key: "timeline", src: getLocalizedScreenshotPath(lang, "timeline") },
      { key: "tracking", src: getLocalizedScreenshotPath(lang, "tracking") },
    ],
    sampleTimelineScreenshotSrc: getLocalizedScreenshotPath(lang, "timeline"),
  };
}
