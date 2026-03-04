import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import styles from "./download.module.scss";
import { getStoreRegion, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type StoreLinks = {
  ios: string;
  android: string;
};

type DownloadCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  flowHighlights: [string, string, string];
  availability: string;
  deviceAlt: string;
  splashSubtitle: string;
  iosTopLabel: string;
  iosName: string;
  androidTopLabel: string;
  androidName: string;
  requirementsTitle: string;
  iosRequirement: string[];
  androidRequirement: string[];
};

const IOS_REQUIREMENTS_EN = [
  "Minimum OS: iOS 15.1+ (production app target for MomentBook)",
  "Note: Podfile/dev target is iOS 15.6 (mixed target values)",
  "Device: iPhone/iPad, arm64",
  "Permissions: Camera, Photo Library, Location (When In Use / Always), Background Location",
];

const ANDROID_REQUIREMENTS_EN = [
  "Minimum OS: Android 7.0+ (API 24+)",
  "Target/Compile: API 36",
  "Permissions: Camera, Image Read, Location (Precise / Approximate / Background)",
  "Foreground service: Location",
];

const IOS_REQUIREMENTS_KO = [
  "최소 OS: iOS 15.1+ (프로덕션 앱 타깃 MomentBook 기준)",
  "참고: Podfile/Dev 타깃은 iOS 15.6으로 값이 혼재되어 있음",
  "디바이스: iPhone/iPad, arm64",
  "주요 권한: 카메라, 사진 보관함, 위치(사용 중/항상), 백그라운드 위치",
];

const ANDROID_REQUIREMENTS_KO = [
  "최소 OS: API 24+ (Android 7.0+)",
  "Target/Compile: API 36",
  "주요 권한: 카메라, 이미지 읽기, 위치(정확/대략/백그라운드)",
  "위치 포그라운드 서비스",
];

const IOS_REQUIREMENTS_JA = [
  "最小OS: iOS 15.1+（MomentBook本番アプリ基準）",
  "参考: Podfile/Devターゲットは iOS 15.6 で値が混在",
  "デバイス: iPhone/iPad, arm64",
  "主な権限: カメラ、写真ライブラリ、位置情報（使用中/常時）、バックグラウンド位置情報",
];

const ANDROID_REQUIREMENTS_JA = [
  "最小OS: API 24+（Android 7.0+）",
  "Target/Compile: API 36",
  "主な権限: カメラ、画像読み取り、位置情報（高精度/おおよそ/バックグラウンド）",
  "位置情報フォアグラウンドサービス",
];

const IOS_REQUIREMENTS_ZH = [
  "最低 OS：iOS 15.1+（以 MomentBook 生产版本为准）",
  "备注：Podfile/开发目标为 iOS 15.6，存在版本混用",
  "设备：iPhone/iPad，arm64",
  "主要权限：相机、照片库、位置（使用期间/始终）、后台位置",
];

const ANDROID_REQUIREMENTS_ZH = [
  "最低 OS：API 24+（Android 7.0+）",
  "Target/Compile：API 36",
  "主要权限：相机、读取图片、位置（精确/大致/后台）",
  "前台服务：位置",
];

const IOS_REQUIREMENTS_ES = [
  "SO mínimo: iOS 15.1+ (según el objetivo de la app de producción de MomentBook)",
  "Nota: el objetivo de Podfile/desarrollo es iOS 15.6 (hay valores mezclados)",
  "Dispositivo: iPhone/iPad, arm64",
  "Permisos principales: Cámara, Fotos, Ubicación (en uso/siempre), Ubicación en segundo plano",
];

const ANDROID_REQUIREMENTS_ES = [
  "SO mínimo: API 24+ (Android 7.0+)",
  "Target/Compile: API 36",
  "Permisos principales: Cámara, Lectura de imágenes, Ubicación (precisa/aproximada/segundo plano)",
  "Servicio en primer plano: Ubicación",
];

const IOS_REQUIREMENTS_PT = [
  "SO mínimo: iOS 15.1+ (alvo do app de produção do MomentBook)",
  "Observação: o alvo de Podfile/desenvolvimento é iOS 15.6 (valores mistos)",
  "Dispositivo: iPhone/iPad, arm64",
  "Permissões principais: Câmera, Fotos, Localização (em uso/sempre), Localização em segundo plano",
];

const ANDROID_REQUIREMENTS_PT = [
  "SO mínimo: API 24+ (Android 7.0+)",
  "Target/Compile: API 36",
  "Permissões principais: Câmera, Leitura de imagens, Localização (precisa/aproximada/segundo plano)",
  "Serviço em primeiro plano: Localização",
];

const IOS_REQUIREMENTS_FR = [
  "OS minimum : iOS 15.1+ (cible de l'app de production MomentBook)",
  "Remarque : la cible Podfile/dev est iOS 15.6 (valeurs mixtes)",
  "Appareil : iPhone/iPad, arm64",
  "Autorisations principales : Appareil photo, Photothèque, Localisation (en cours d'utilisation/toujours), Localisation en arrière-plan",
];

const ANDROID_REQUIREMENTS_FR = [
  "OS minimum : API 24+ (Android 7.0+)",
  "Target/Compile : API 36",
  "Autorisations principales : Appareil photo, Lecture d'images, Localisation (précise/approximative/arrière-plan)",
  "Service au premier plan : Localisation",
];

const IOS_REQUIREMENTS_TH = [
  "ระบบขั้นต่ำ: iOS 15.1+ (อิงตามเป้าหมายแอปโปรดักชันของ MomentBook)",
  "หมายเหตุ: เป้าหมาย Podfile/Dev เป็น iOS 15.6 จึงมีค่าปะปน",
  "อุปกรณ์: iPhone/iPad, arm64",
  "สิทธิ์หลัก: กล้อง, คลังรูปภาพ, ตำแหน่ง (ขณะใช้งาน/ตลอดเวลา), ตำแหน่งเบื้องหลัง",
];

const ANDROID_REQUIREMENTS_TH = [
  "ระบบขั้นต่ำ: API 24+ (Android 7.0+)",
  "Target/Compile: API 36",
  "สิทธิ์หลัก: กล้อง, อ่านรูปภาพ, ตำแหน่ง (แม่นยำ/โดยประมาณ/เบื้องหลัง)",
  "บริการเบื้องหน้า: ตำแหน่ง",
];

const IOS_REQUIREMENTS_VI = [
  "OS tối thiểu: iOS 15.1+ (theo mục tiêu app production của MomentBook)",
  "Lưu ý: mục tiêu Podfile/Dev là iOS 15.6 nên có giá trị lẫn nhau",
  "Thiết bị: iPhone/iPad, arm64",
  "Quyền chính: Camera, Thư viện ảnh, Vị trí (khi dùng/luôn luôn), Vị trí nền",
];

const ANDROID_REQUIREMENTS_VI = [
  "OS tối thiểu: API 24+ (Android 7.0+)",
  "Target/Compile: API 36",
  "Quyền chính: Camera, Đọc hình ảnh, Vị trí (chính xác/tương đối/nền)",
  "Dịch vụ foreground: Vị trí",
];

const downloadCopy: Record<Language, DownloadCopy> = {
  en: {
    metaTitle: "Download MomentBook",
    metaDescription:
      "Install MomentBook on iOS and Android, then keep one post-trip flow from batch upload to timeline and map recap.",
    eyebrow: "Install MomentBook",
    title: "Remember every travel moment now",
    flowHighlights: [
      "Upload once",
      "Auto organize by time and place",
      "Revisit on timeline and map",
    ],
    availability: "Available on App Store and Google Play.",
    deviceAlt: "MomentBook splash screen",
    splashSubtitle: "Travel memories, quietly kept.",
    iosTopLabel: "Download on",
    iosName: "App Store",
    androidTopLabel: "Get it on",
    androidName: "Google Play",
    requirementsTitle: "System requirements",
    iosRequirement: IOS_REQUIREMENTS_EN,
    androidRequirement: ANDROID_REQUIREMENTS_EN,
  },
  ko: {
    metaTitle: "MomentBook 다운로드",
    metaDescription:
      "iOS와 Android에서 MomentBook을 설치하고, 여행 후 일괄 업로드부터 타임라인/지도 회상까지 같은 흐름으로 사용하세요.",
    eyebrow: "MomentBook 설치",
    title: "지금, 여행의 순간을 기억하세요",
    flowHighlights: [
      "한 번에 업로드",
      "시간과 장소 기준 자동 정리",
      "타임라인과 지도로 다시 보기",
    ],
    availability: "App Store와 Google Play에서 이용할 수 있습니다.",
    deviceAlt: "MomentBook 스플래시 화면",
    splashSubtitle: "여행 기억을 차분히 보관합니다.",
    iosTopLabel: "다운로드",
    iosName: "App Store",
    androidTopLabel: "다운로드",
    androidName: "Google Play",
    requirementsTitle: "시스템 요구사항",
    iosRequirement: IOS_REQUIREMENTS_KO,
    androidRequirement: ANDROID_REQUIREMENTS_KO,
  },
  ja: {
    metaTitle: "MomentBook ダウンロード",
    metaDescription:
      "iOS と Android で MomentBook をインストールし、旅行後は一括アップロードからタイムライン/地図回想まで同じ流れで使えます。",
    eyebrow: "MomentBook インストール",
    title: "今、旅の瞬間を記憶に残してください",
    flowHighlights: [
      "一度にアップロード",
      "時間と場所で自動整理",
      "タイムラインと地図で振り返り",
    ],
    availability: "App Store と Google Play で利用できます。",
    deviceAlt: "MomentBook スプラッシュ画面",
    splashSubtitle: "旅の記憶を静かに保管します。",
    iosTopLabel: "ダウンロード",
    iosName: "App Store",
    androidTopLabel: "ダウンロード",
    androidName: "Google Play",
    requirementsTitle: "システム要件",
    iosRequirement: IOS_REQUIREMENTS_JA,
    androidRequirement: ANDROID_REQUIREMENTS_JA,
  },
  zh: {
    metaTitle: "下载 MomentBook",
    metaDescription:
      "在 iOS 和 Android 上安装 MomentBook，并在每次旅行后按同一流程完成批量上传、时间线与地图回想。",
    eyebrow: "安装 MomentBook",
    title: "此刻，请记住旅行的每个瞬间",
    flowHighlights: [
      "一次上传",
      "按时间与地点自动整理",
      "在时间线和地图中回看",
    ],
    availability: "可在 App Store 与 Google Play 使用。",
    deviceAlt: "MomentBook 启动画面",
    splashSubtitle: "安静地保存旅行记忆。",
    iosTopLabel: "下载",
    iosName: "App Store",
    androidTopLabel: "下载",
    androidName: "Google Play",
    requirementsTitle: "系统要求",
    iosRequirement: IOS_REQUIREMENTS_ZH,
    androidRequirement: ANDROID_REQUIREMENTS_ZH,
  },
  es: {
    metaTitle: "Descargar MomentBook",
    metaDescription:
      "Instala MomentBook en iOS y Android y usa el mismo flujo después del viaje: carga por lotes, línea de tiempo y repaso en mapa.",
    eyebrow: "Instalar MomentBook",
    title: "Recuerda ahora cada momento de tu viaje",
    flowHighlights: [
      "Carga una vez",
      "Orden automático por tiempo y lugar",
      "Revísalo en línea de tiempo y mapa",
    ],
    availability: "Disponible en App Store y Google Play.",
    deviceAlt: "Pantalla de inicio de MomentBook",
    splashSubtitle: "Tus recuerdos de viaje, guardados con calma.",
    iosTopLabel: "Descargar en",
    iosName: "App Store",
    androidTopLabel: "Descargar en",
    androidName: "Google Play",
    requirementsTitle: "Requisitos del sistema",
    iosRequirement: IOS_REQUIREMENTS_ES,
    androidRequirement: ANDROID_REQUIREMENTS_ES,
  },
  pt: {
    metaTitle: "Baixar MomentBook",
    metaDescription:
      "Instale o MomentBook no iOS e Android e use o mesmo fluxo após a viagem: envio em lote, linha do tempo e revisão no mapa.",
    eyebrow: "Instalar MomentBook",
    title: "Lembre agora cada momento da sua viagem",
    flowHighlights: [
      "Envie uma vez",
      "Organização automática por tempo e lugar",
      "Revise na linha do tempo e no mapa",
    ],
    availability: "Disponível na App Store e no Google Play.",
    deviceAlt: "Tela de abertura do MomentBook",
    splashSubtitle: "Memórias de viagem guardadas com tranquilidade.",
    iosTopLabel: "Baixar na",
    iosName: "App Store",
    androidTopLabel: "Baixar no",
    androidName: "Google Play",
    requirementsTitle: "Requisitos do sistema",
    iosRequirement: IOS_REQUIREMENTS_PT,
    androidRequirement: ANDROID_REQUIREMENTS_PT,
  },
  fr: {
    metaTitle: "Télécharger MomentBook",
    metaDescription:
      "Installez MomentBook sur iOS et Android et utilisez le même flux après le voyage : import en lot, timeline et rappel sur carte.",
    eyebrow: "Installer MomentBook",
    title: "Gardez maintenant chaque moment de votre voyage",
    flowHighlights: [
      "Importez en une fois",
      "Tri automatique par temps et lieu",
      "Revoyez sur la timeline et la carte",
    ],
    availability: "Disponible sur App Store et Google Play.",
    deviceAlt: "Écran de démarrage MomentBook",
    splashSubtitle: "Les souvenirs de voyage, conservés avec calme.",
    iosTopLabel: "Télécharger sur",
    iosName: "App Store",
    androidTopLabel: "Télécharger sur",
    androidName: "Google Play",
    requirementsTitle: "Configuration requise",
    iosRequirement: IOS_REQUIREMENTS_FR,
    androidRequirement: ANDROID_REQUIREMENTS_FR,
  },
  th: {
    metaTitle: "ดาวน์โหลด MomentBook",
    metaDescription:
      "ติดตั้ง MomentBook บน iOS และ Android แล้วใช้โฟลว์เดิมหลังทริป ตั้งแต่อัปโหลดแบบชุดเดียวจนถึงไทม์ไลน์และการย้อนดูบนแผนที่",
    eyebrow: "ติดตั้ง MomentBook",
    title: "จดจำทุกช่วงเวลาการเดินทางของคุณตอนนี้",
    flowHighlights: [
      "อัปโหลดครั้งเดียว",
      "จัดอัตโนมัติตามเวลาและสถานที่",
      "ย้อนดูบนไทม์ไลน์และแผนที่",
    ],
    availability: "ใช้งานได้บน App Store และ Google Play",
    deviceAlt: "หน้าสแปลชของ MomentBook",
    splashSubtitle: "เก็บความทรงจำการเดินทางไว้อย่างสงบ",
    iosTopLabel: "ดาวน์โหลดบน",
    iosName: "App Store",
    androidTopLabel: "ดาวน์โหลดบน",
    androidName: "Google Play",
    requirementsTitle: "ความต้องการของระบบ",
    iosRequirement: IOS_REQUIREMENTS_TH,
    androidRequirement: ANDROID_REQUIREMENTS_TH,
  },
  vi: {
    metaTitle: "Tải MomentBook",
    metaDescription:
      "Cài MomentBook trên iOS và Android rồi dùng cùng một luồng sau chuyến đi: tải theo lô, timeline và hồi tưởng trên bản đồ.",
    eyebrow: "Cài đặt MomentBook",
    title: "Ghi nhớ ngay từng khoảnh khắc chuyến đi của bạn",
    flowHighlights: [
      "Tải lên một lần",
      "Tự động sắp theo thời gian và địa điểm",
      "Xem lại trên timeline và bản đồ",
    ],
    availability: "Có trên App Store và Google Play.",
    deviceAlt: "Màn hình splash MomentBook",
    splashSubtitle: "Lưu giữ ký ức chuyến đi một cách nhẹ nhàng.",
    iosTopLabel: "Tải trên",
    iosName: "App Store",
    androidTopLabel: "Tải trên",
    androidName: "Google Play",
    requirementsTitle: "Yêu cầu hệ thống",
    iosRequirement: IOS_REQUIREMENTS_VI,
    androidRequirement: ANDROID_REQUIREMENTS_VI,
  },
};

const iosPath = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";

function getStoreLinks(lang: Language): StoreLinks {
  const region = getStoreRegion(lang);

  return {
    ios: `https://apps.apple.com/${region.ios}/${iosPath}`,
    android: `https://play.google.com/store/apps/details?id=com.reflectalab.momentbook&hl=${region.hl}&gl=${region.gl}`,
  };
}

function getDownloadCopy(lang: Language): DownloadCopy {
  return downloadCopy[lang] ?? downloadCopy.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getDownloadCopy(lang);
  const path = "/download";

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, path),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getDownloadCopy(lang);
  const storeLinks = getStoreLinks(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/download"), siteUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: content.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements:
      "iOS 15.1+, iPhone/iPad arm64; Android 7.0+ (API 24+), target/compile API 36",
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        url: storeLinks.ios,
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        url: storeLinks.android,
        price: "0",
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <FadeIn>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
              {content.subtitle ? (
                <p className={styles.heroSubtitle}>{content.subtitle}</p>
              ) : null}

              <div className={styles.storeButtons}>
                <a
                  href={storeLinks.ios}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.iosName}
                >
                  <Image
                    src="/images/download/app-store-button.webp"
                    alt={content.iosName}
                    width={635}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
                <a
                  href={storeLinks.android}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.androidName}
                >
                  <Image
                    src="/images/download/google-play-button.webp"
                    alt={content.androidName}
                    width={636}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
              </div>

              <p className={styles.availability}>{content.availability}</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
