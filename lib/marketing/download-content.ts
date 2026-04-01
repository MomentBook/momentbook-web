import { type Language } from "@/lib/i18n/config";

export type DownloadCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  availability: string;
  iosName: string;
  androidName: string;
  iosRequirements: string;
  androidRequirements: string;
  softwareRequirements: string;
};

const downloadCopy: Record<Language, DownloadCopy> = {
  en: {
    metaTitle: "Download MomentBook",
    metaDescription:
      "Install MomentBook on iOS and Android, upload trip photos in one batch, organize them by time and place, and keep the archive synced to your cloud drive.",
    title: "Remember the moments of your trip now",
    availability: "Available on the App Store and Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ on iPhone and iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) with target and compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) with target/compile API 36",
  },
  ko: {
    metaTitle: "MomentBook 다운로드",
    metaDescription:
      "iOS와 Android에서 MomentBook을 설치하고, 여행 사진을 한 번에 올려 시간과 장소 기준으로 정리한 뒤 클라우드 드라이브까지 자동 동기화하세요.",
    title: "지금, 여행의 순간을 기억하세요",
    availability: "App Store와 Google Play에서 이용할 수 있습니다.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iPhone/iPad arm64 기준 iOS 15.1 이상",
    androidRequirements: "Android 7.0 이상(API 24+), target/compile API 36",
    softwareRequirements:
      "iOS 15.1 이상(iPhone/iPad arm64), Android 7.0 이상(API 24+) 및 target/compile API 36",
  },
  ja: {
    metaTitle: "MomentBook ダウンロード",
    metaDescription:
      "iOS と Android で MomentBook をインストールし、旅行写真をまとめてアップロードすると、時間と場所で整理したタイムラインとドライブ同期まで続けられます。",
    title: "今、旅の瞬間を記憶に残しましょう",
    availability: "App Store と Google Play で利用できます。",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iPhone / iPad arm64 で iOS 15.1 以上",
    androidRequirements: "Android 7.0 以上（API 24+）、target / compile API 36",
    softwareRequirements:
      "iOS 15.1以上（iPhone/iPad arm64）、Android 7.0以上（API 24+）および target/compile API 36",
  },
  zh: {
    metaTitle: "下载 MomentBook",
    metaDescription:
      "在 iOS 和 Android 上安装 MomentBook，一次上传旅行照片后，就能按时间和地点整理时间线，并同步到云盘。",
    title: "现在，记住旅途中的每个瞬间",
    availability: "可在 App Store 与 Google Play 使用。",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "适用于 iPhone / iPad arm64，需 iOS 15.1 及以上",
    androidRequirements: "Android 7.0+（API 24+），target / compile API 36",
    softwareRequirements:
      "iOS 15.1+（iPhone/iPad arm64）；Android 7.0+（API 24+），target/compile API 36",
  },
  es: {
    metaTitle: "Descargar MomentBook",
    metaDescription:
      "Instala MomentBook en iOS y Android, sube las fotos del viaje de una vez y ordénalas por fecha y lugar hasta sincronizarlas con tu drive.",
    title: "Recuerda ahora los momentos de tu viaje",
    availability: "Disponible en App Store y Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ en iPhone y iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) con target y compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) con target/compile API 36",
  },
  pt: {
    metaTitle: "Baixar MomentBook",
    metaDescription:
      "Instale o MomentBook no iOS e Android, envie as fotos da viagem de uma vez e organize tudo por data e lugar até sincronizar com o seu drive.",
    title: "Lembre agora os momentos da sua viagem",
    availability: "Disponível na App Store e no Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ em iPhone e iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) com target e compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) com target/compile API 36",
  },
  fr: {
    metaTitle: "Télécharger MomentBook",
    metaDescription:
      "Installez MomentBook sur iOS et Android, importez les photos du voyage en une fois, organisez-les par date et lieu puis synchronisez l'archive avec votre espace cloud.",
    title: "Gardez maintenant les moments de votre voyage",
    availability: "Disponible sur App Store et Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ sur iPhone et iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) avec target et compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64) ; Android 7.0+ (API 24+) avec target/compile API 36",
  },
  th: {
    metaTitle: "ดาวน์โหลด MomentBook",
    metaDescription:
      "ติดตั้ง MomentBook บน iOS และ Android อัปโหลดรูปทริปครั้งเดียว แล้วจัดตามเวลาและสถานที่ก่อนซิงก์ต่อไปยังคลาวด์ไดรฟ์",
    title: "จดจำช่วงเวลาของการเดินทางได้ตั้งแต่ตอนนี้",
    availability: "ใช้งานได้บน App Store และ Google Play",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ บน iPhone และ iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) และ target / compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64), Android 7.0+ (API 24+) และ target/compile API 36",
  },
  vi: {
    metaTitle: "Tải MomentBook",
    metaDescription:
      "Cài MomentBook trên iOS và Android, tải ảnh chuyến đi lên một lần rồi sắp theo thời gian và địa điểm trước khi đồng bộ lên drive.",
    title: "Ghi nhớ những khoảnh khắc trong chuyến đi của bạn ngay bây giờ",
    availability: "Có trên App Store và Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    iosRequirements: "iOS 15.1+ trên iPhone và iPad (arm64)",
    androidRequirements: "Android 7.0+ (API 24+) với target và compile API 36",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) với target/compile API 36",
  },
};

export function getDownloadCopy(lang: Language): DownloadCopy {
  return downloadCopy[lang] ?? downloadCopy.en;
}
