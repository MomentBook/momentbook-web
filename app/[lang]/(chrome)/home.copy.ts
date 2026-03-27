import type { Language } from "@/lib/i18n/config";
import type { HomeDownloadNarrativeContent } from "./HomeDownloadSection";
import type { HomeHeroContent } from "./HomeHero";
import type { HomeMarketingContent } from "./HomeMarketingStory";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
};

type HomeEditorialCopy = {
  heroEyebrow: string;
  heroExploreCta: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredLead: string;
  featuredArchiveCta: string;
  photoCountLabel: string;
  untitledJourney: string;
  unknownUser: string;
  emptyJourneys: string;
};

type HomeMarketingCopy = {
  marketing: HomeMarketingContent;
  download: HomeDownloadNarrativeContent;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Upload once, organized all the way to your drive",
    metaDescription:
      "Upload trip photos in one batch. MomentBook organizes them into a timeline by time and place, then automatically syncs the archive to your cloud drive.",
    heroTitle: "Remember your trip",
    heroLead:
      "Upload trip photos and MomentBook organizes them by time and place, then automatically syncs them to your drive.",
    primaryCta: "Install app",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 올리면, 드라이브까지 정리됩니다",
    metaDescription:
      "여행 사진을 한 번에 올리면 시간과 장소 기준 타임라인으로 정리하고, 정리된 아카이브를 클라우드 드라이브에 자동 동기화합니다.",
    heroTitle: "당신의 여행을 기억하세요",
    heroLead:
      "여행 사진을 올리면 시간과 장소 기준으로 정리하고, 드라이브까지 자동 동기화합니다.",
    primaryCta: "앱 설치",
  },
  ja: {
    metaTitle: "MomentBook — 一度アップロードすると、ドライブまで整理されます",
    metaDescription:
      "旅行写真をまとめてアップロードすると、時間と場所の流れでタイムラインに整理し、整理されたアーカイブをクラウドドライブに自動同期します。",
    heroTitle: "あなたの旅を記憶に残しましょう",
    heroLead:
      "旅行写真をアップロードすると、時間と場所で整理され、ドライブまで自動で同期されます。",
    primaryCta: "アプリをインストール",
  },
  zh: {
    metaTitle: "MomentBook — 一次上传，连云盘都会整理好",
    metaDescription:
      "一次上传旅行照片后，MomentBook 会按时间和地点整理成时间线，并将整理好的档案自动同步到云盘。",
    heroTitle: "记住你的旅行",
    heroLead:
      "上传旅行照片后，MomentBook 会按时间和地点整理，并自动同步到云盘。",
    primaryCta: "安装应用",
  },
  es: {
    metaTitle: "MomentBook — Súbelo una vez y se ordena hasta tu drive",
    metaDescription:
      "Sube las fotos del viaje de una vez. MomentBook las ordena en una línea de tiempo por fecha y lugar, y sincroniza automáticamente el archivo con tu nube.",
    heroTitle: "Recuerda tu viaje",
    heroLead:
      "Sube las fotos del viaje y MomentBook las ordena por fecha y lugar, y después las sincroniza automáticamente con tu drive.",
    primaryCta: "Instalar app",
  },
  pt: {
    metaTitle: "MomentBook — Envie uma vez e tudo segue organizado até o drive",
    metaDescription:
      "Envie as fotos da viagem de uma vez. O MomentBook organiza tudo em uma linha do tempo por data e lugar e sincroniza automaticamente o arquivo com seu drive na nuvem.",
    heroTitle: "Guarde sua viagem",
    heroLead:
      "Envie as fotos da viagem e o MomentBook organiza tudo por data e lugar, depois sincroniza automaticamente com o seu drive.",
    primaryCta: "Instalar app",
  },
  fr: {
    metaTitle: "MomentBook — Importez une fois, l'organisation va jusqu'au drive",
    metaDescription:
      "Importez les photos du voyage en une fois. MomentBook les range dans une chronologie par date et lieu, puis synchronise automatiquement l'archive avec votre espace cloud.",
    heroTitle: "Gardez votre voyage en mémoire",
    heroLead:
      "Importez les photos du voyage et MomentBook les organise par date et lieu, puis les synchronise automatiquement avec votre espace cloud.",
    primaryCta: "Installer l'app",
  },
  th: {
    metaTitle: "MomentBook — อัปโหลดครั้งเดียว แล้วจัดไปถึงไดรฟ์",
    metaDescription:
      "อัปโหลดรูปทริปครั้งเดียว MomentBook จะจัดเป็นไทม์ไลน์ตามเวลาและสถานที่ พร้อมซิงก์คลังที่จัดแล้วไปยังคลาวด์ไดรฟ์โดยอัตโนมัติ",
    heroTitle: "จดจำการเดินทางของคุณ",
    heroLead:
      "เมื่ออัปโหลดรูปทริป MomentBook จะจัดตามเวลาและสถานที่ แล้วซิงก์ไปยังไดรฟ์ของคุณโดยอัตโนมัติ",
    primaryCta: "ติดตั้งแอป",
  },
  vi: {
    metaTitle: "MomentBook — Tải lên một lần, sắp xếp tới tận drive",
    metaDescription:
      "Tải ảnh chuyến đi lên một lần. MomentBook sắp thành dòng thời gian theo thời gian và địa điểm, rồi tự động đồng bộ kho lưu trữ đã sắp xếp lên cloud drive.",
    heroTitle: "Ghi nhớ chuyến đi của bạn",
    heroLead:
      "Tải ảnh chuyến đi lên và MomentBook sẽ sắp xếp theo thời gian, địa điểm rồi tự động đồng bộ lên drive của bạn.",
    primaryCta: "Cài ứng dụng",
  },
};

const homeEditorialCopy: Record<Language, HomeEditorialCopy> = {
  en: {
    heroEyebrow: "Travel photo organizer",
    heroExploreCta: "See how it comes together",
    featuredEyebrow: "Public archive",
    featuredTitle: "See the organized result",
    featuredLead: "Recently published trips.",
    featuredArchiveCta: "View all",
    photoCountLabel: "photos",
    untitledJourney: "Untitled journey",
    unknownUser: "Unknown user",
    emptyJourneys: "No public journeys yet.",
  },
  ko: {
    heroEyebrow: "여행 사진 정리 앱",
    heroExploreCta: "어떻게 정리되는지 보기",
    featuredEyebrow: "공개 아카이브",
    featuredTitle: "정리된 결과 보기",
    featuredLead: "최근 공개된 여행입니다.",
    featuredArchiveCta: "전체 보기",
    photoCountLabel: "장의 사진",
    untitledJourney: "제목 없는 여정",
    unknownUser: "알 수 없는 사용자",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
  },
  ja: {
    heroEyebrow: "旅行写真整理アプリ",
    heroExploreCta: "どう整理されるか見る",
    featuredEyebrow: "公開アーカイブ",
    featuredTitle: "整理された結果を見る",
    featuredLead: "最近公開された旅行です。",
    featuredArchiveCta: "すべて見る",
    photoCountLabel: "枚の写真",
    untitledJourney: "タイトル未設定の旅",
    unknownUser: "不明なユーザー",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    heroEyebrow: "旅行照片整理应用",
    heroExploreCta: "查看如何整理",
    featuredEyebrow: "公开档案",
    featuredTitle: "查看整理结果",
    featuredLead: "最近公开的旅程。",
    featuredArchiveCta: "查看全部",
    photoCountLabel: "张照片",
    untitledJourney: "未命名旅程",
    unknownUser: "未知用户",
    emptyJourneys: "还没有公开旅程。",
  },
  es: {
    heroEyebrow: "App para organizar fotos de viaje",
    heroExploreCta: "Ver cómo se organiza",
    featuredEyebrow: "Archivo público",
    featuredTitle: "Ver el resultado organizado",
    featuredLead: "Viajes publicados recientemente.",
    featuredArchiveCta: "Ver todo",
    photoCountLabel: "fotos",
    untitledJourney: "Viaje sin título",
    unknownUser: "Usuario desconocido",
    emptyJourneys: "Aún no hay viajes públicos.",
  },
  pt: {
    heroEyebrow: "App para organizar fotos de viagem",
    heroExploreCta: "Ver como se organiza",
    featuredEyebrow: "Arquivo público",
    featuredTitle: "Ver o resultado organizado",
    featuredLead: "Viagens publicadas recentemente.",
    featuredArchiveCta: "Ver tudo",
    photoCountLabel: "fotos",
    untitledJourney: "Viagem sem título",
    unknownUser: "Usuário desconhecido",
    emptyJourneys: "Ainda não há viagens publicadas.",
  },
  fr: {
    heroEyebrow: "App d'organisation de photos de voyage",
    heroExploreCta: "Voir comment cela s'organise",
    featuredEyebrow: "Archive publique",
    featuredTitle: "Voir le résultat organisé",
    featuredLead: "Voyages publiés récemment.",
    featuredArchiveCta: "Voir tout",
    photoCountLabel: "photos",
    untitledJourney: "Voyage sans titre",
    unknownUser: "Utilisateur inconnu",
    emptyJourneys: "Aucun voyage public pour le moment.",
  },
  th: {
    heroEyebrow: "แอปจัดรูปทริป",
    heroExploreCta: "ดูว่าจัดอย่างไร",
    featuredEyebrow: "คลังสาธารณะ",
    featuredTitle: "ดูผลลัพธ์ที่จัดแล้ว",
    featuredLead: "ทริปที่เพิ่งเผยแพร่ล่าสุด",
    featuredArchiveCta: "ดูทั้งหมด",
    photoCountLabel: "ภาพ",
    untitledJourney: "ทริปไม่มีชื่อ",
    unknownUser: "ผู้ใช้ไม่ทราบชื่อ",
    emptyJourneys: "ยังไม่มีทริปสาธารณะ",
  },
  vi: {
    heroEyebrow: "Ứng dụng sắp xếp ảnh du lịch",
    heroExploreCta: "Xem cách sắp xếp",
    featuredEyebrow: "Kho lưu trữ công khai",
    featuredTitle: "Xem kết quả đã sắp xếp",
    featuredLead: "Những hành trình vừa được công khai.",
    featuredArchiveCta: "Xem tất cả",
    photoCountLabel: "ảnh",
    untitledJourney: "Hành trình chưa đặt tên",
    unknownUser: "Người dùng không rõ",
    emptyJourneys: "Chưa có hành trình công khai.",
  },
};

const homeMarketingCopy: Record<Language, HomeMarketingCopy> = {
  en: {
    marketing: {
      showcase: {
        eyebrow: "Result first",
        title: "Your trip, arranged as a timeline",
        lead:
          "MomentBook groups travel photos by time and place so the flow of the trip stays readable.",
        primaryCta: "Install app",
        secondaryCta: "See how it comes together",
      },
      storyEyebrow: "From photo roll to trip flow",
      storyTitle: "Three scenes, one organized trip",
      storyLead:
        "A short walkthrough from a mixed camera roll to a timeline you can revisit.",
      scenes: [
        {
          sceneLabel: "Scene 01",
          title: "Photos keep piling up",
          description:
            "The trip stays in your camera roll exactly as you captured it.",
        },
        {
          sceneLabel: "Scene 02",
          title: "Bring them in together",
          description:
            "Select the batch once, then let the app read the trip as one set.",
        },
        {
          sceneLabel: "Scene 03",
          title: "The timeline takes shape",
          description:
            "Time and place turn scattered photos into grouped moments.",
        },
      ],
      value: {
        eyebrow: "What stays visible",
        title:
          "Where you were, when it happened, and what belonged together stays in view",
        lead:
          "The organized result keeps the route, timing, and grouped photos easy to review later.",
        bullets: [
          "Follow the trip in day-by-day order.",
          "Keep place-based moments together.",
          "Continue the organized archive to your drive.",
        ],
      },
      bridge: {
        title: "Ready to keep the next trip in order?",
        lead:
          "Install the app, then bring your next batch of travel photos in together.",
        cta: "Go to download",
      },
    },
    download: {
      title: "Download now",
      lead: "Install now and start organizing trip photos.",
    },
  },
  ko: {
    marketing: {
      showcase: {
        eyebrow: "결과 먼저 보기",
        title: "여행 사진이, 타임라인으로 정리됩니다",
        lead:
          "MomentBook는 여행 사진을 시간과 장소 기준으로 묶어 여행 흐름이 다시 보이도록 남깁니다.",
        primaryCta: "앱 설치",
        secondaryCta: "어떻게 정리되는지 보기",
      },
      storyEyebrow: "사진 묶음에서 여행 흐름까지",
      storyTitle: "세 장면으로 보는 정리 과정",
      storyLead:
        "섞여 있는 카메라 롤이 다시 보기 쉬운 여행 기록으로 바뀌는 흐름입니다.",
      scenes: [
        {
          sceneLabel: "장면 01",
          title: "사진이 계속 쌓입니다",
          description:
            "여행 중 찍은 사진은 찍힌 순서 그대로 카메라 롤에 남습니다.",
        },
        {
          sceneLabel: "장면 02",
          title: "한 번에 가져옵니다",
          description:
            "사진을 한 번에 선택하면 여행 한 묶음으로 읽기 시작합니다.",
        },
        {
          sceneLabel: "장면 03",
          title: "타임라인이 모습을 갖춥니다",
          description:
            "시간과 장소 흐름에 따라 흩어진 사진이 모먼트로 정리됩니다.",
        },
      ],
      value: {
        eyebrow: "정리 후 남는 것",
        title: "어디에 있었고, 언제였고, 무엇이 함께였는지 다시 보입니다",
        lead:
          "정리된 결과는 이동 흐름과 시점, 함께 묶인 사진을 나중에도 읽기 쉽게 남깁니다.",
        bullets: [
          "하루 단위의 여행 순서를 따라볼 수 있습니다.",
          "장소 기준의 순간이 함께 남습니다.",
          "정리된 아카이브가 드라이브로 이어집니다.",
        ],
      },
      bridge: {
        title: "다음 여행도 차분하게 남길 준비가 되었나요?",
        lead: "앱을 설치하고 다음 여행 사진도 한 번에 가져와 보세요.",
        cta: "다운로드로 이동",
      },
    },
    download: {
      title: "지금 바로 다운로드하세요",
      lead: "지금 설치하고 여행 사진 정리를 시작하세요.",
    },
  },
  ja: {
    marketing: {
      showcase: {
        eyebrow: "結果を先に見る",
        title: "旅の写真がタイムラインとして整います",
        lead:
          "MomentBook は旅行写真を時間と場所でまとめ、旅の流れが読み返しやすい形で残ります。",
        primaryCta: "アプリをインストール",
        secondaryCta: "どう整理されるか見る",
      },
      storyEyebrow: "写真の束から旅の流れへ",
      storyTitle: "3つの場面で見る整理の流れ",
      storyLead:
        "混ざったカメラロールが、あとで見返しやすい旅の記録に変わる流れです。",
      scenes: [
        {
          sceneLabel: "場面 01",
          title: "写真がたまっていきます",
          description: "旅先で撮った写真は、そのままカメラロールに残ります。",
        },
        {
          sceneLabel: "場面 02",
          title: "まとめて取り込みます",
          description:
            "写真を一度に選ぶと、1つの旅として読み取り始めます。",
        },
        {
          sceneLabel: "場面 03",
          title: "タイムラインの形になります",
          description:
            "時間と場所の流れに沿って、散らばった写真がモーメントにまとまります。",
        },
      ],
      value: {
        eyebrow: "整理したあとに残るもの",
        title: "どこにいて、いつで、何が一緒だったかが見え直します",
        lead:
          "整理された結果は、移動の流れや時点、ひとまとまりの写真をあとでも読みやすく残します。",
        bullets: [
          "1日ごとの旅の順番を追えます。",
          "場所ごとのモーメントをひとまとまりで残せます。",
          "整理されたアーカイブがドライブへ続きます。",
        ],
      },
      bridge: {
        title: "次の旅も落ち着いて残しませんか",
        lead:
          "アプリをインストールして、次の旅の写真もまとめて取り込みましょう。",
        cta: "ダウンロードへ",
      },
    },
    download: {
      title: "今すぐダウンロード",
      lead: "インストールして旅行写真の整理を始めましょう。",
    },
  },
  zh: {
    marketing: {
      showcase: {
        eyebrow: "先看结果",
        title: "旅行照片，会整理成时间线",
        lead:
          "MomentBook 会按时间和地点整理旅行照片，让整段旅程的脉络更容易回看。",
        primaryCta: "安装应用",
        secondaryCta: "查看如何整理",
      },
      storyEyebrow: "从照片堆到旅程脉络",
      storyTitle: "用 3 个场景看整理过程",
      storyLead: "混在一起的相册，会变成之后更容易重看的旅行记录。",
      scenes: [
        {
          sceneLabel: "场景 01",
          title: "照片会一直堆着",
          description: "旅行中拍下的照片，会原样留在相册里。",
        },
        {
          sceneLabel: "场景 02",
          title: "一次全部导入",
          description: "一次选好照片后，应用会把它们当作同一趟旅行来读取。",
        },
        {
          sceneLabel: "场景 03",
          title: "时间线开始成形",
          description: "按时间和地点整理后，分散的照片会变成一个个时刻。",
        },
      ],
      value: {
        eyebrow: "整理后留下的东西",
        title: "去了哪里、发生在何时、哪些照片属于同一刻，都还能看见",
        lead:
          "整理后的结果会把路线、时间和成组照片保留下来，之后再看也更容易理解。",
        bullets: [
          "可以按每天的顺序回看整段旅程。",
          "同一地点的时刻会留在一起。",
          "整理好的档案会继续同步到云盘。",
        ],
      },
      bridge: {
        title: "准备好把下一趟旅行也整理好吗？",
        lead: "安装应用后，把下一批旅行照片也一次带进来。",
        cta: "前往下载",
      },
    },
    download: {
      title: "立即下载",
      lead: "安装 MomentBook，开始整理旅行照片。",
    },
  },
  es: {
    marketing: {
      showcase: {
        eyebrow: "Primero, el resultado",
        title: "Tu viaje, ordenado como una línea de tiempo",
        lead:
          "MomentBook agrupa las fotos del viaje por fecha y lugar para que el recorrido siga siendo legible.",
        primaryCta: "Instalar app",
        secondaryCta: "Ver cómo se organiza",
      },
      storyEyebrow: "De un carrete mezclado al flujo del viaje",
      storyTitle: "Tres escenas para entender la organización",
      storyLead:
        "Un recorrido breve desde un carrete mezclado hasta una línea de tiempo fácil de revisar.",
      scenes: [
        {
          sceneLabel: "Escena 01",
          title: "Las fotos se siguen acumulando",
          description:
            "Las fotos del viaje se quedan en el carrete tal como las fuiste tomando.",
        },
        {
          sceneLabel: "Escena 02",
          title: "Llévalas juntas",
          description:
            "Selecciona todo el lote una vez y la app empieza a leerlo como un solo viaje.",
        },
        {
          sceneLabel: "Escena 03",
          title: "La línea de tiempo toma forma",
          description:
            "La fecha y el lugar convierten las fotos dispersas en momentos agrupados.",
        },
      ],
      value: {
        eyebrow: "Lo que sigue visible",
        title: "Dónde estuviste, cuándo pasó y qué pertenecía al mismo momento sigue a la vista",
        lead:
          "El resultado organizado mantiene legible la ruta, el tiempo y los grupos de fotos para volver más tarde.",
        bullets: [
          "Sigue el viaje en orden día por día.",
          "Mantén juntos los momentos de cada lugar.",
          "Continúa el archivo organizado en tu drive.",
        ],
      },
      bridge: {
        title: "¿Listo para mantener en orden el próximo viaje?",
        lead:
          "Instala la app y lleva también el siguiente lote de fotos del viaje de una sola vez.",
        cta: "Ir a la descarga",
      },
    },
    download: {
      title: "Descarga ahora",
      lead: "Instala MomentBook y empieza a organizar tus fotos de viaje.",
    },
  },
  pt: {
    marketing: {
      showcase: {
        eyebrow: "Primeiro, o resultado",
        title: "Sua viagem, organizada como uma linha do tempo",
        lead:
          "O MomentBook agrupa as fotos da viagem por tempo e lugar para que o percurso continue legível.",
        primaryCta: "Instalar app",
        secondaryCta: "Ver como se organiza",
      },
      storyEyebrow: "Do rolo de fotos ao fluxo da viagem",
      storyTitle: "Três cenas para entender a organização",
      storyLead:
        "Um percurso curto entre um rolo misturado e uma linha do tempo fácil de revisitar.",
      scenes: [
        {
          sceneLabel: "Cena 01",
          title: "As fotos continuam se acumulando",
          description:
            "As fotos da viagem ficam no rolo exatamente como foram registradas.",
        },
        {
          sceneLabel: "Cena 02",
          title: "Traga tudo de uma vez",
          description:
            "Selecione o lote uma vez e o app começa a ler tudo como uma única viagem.",
        },
        {
          sceneLabel: "Cena 03",
          title: "A linha do tempo ganha forma",
          description:
            "Tempo e lugar transformam fotos espalhadas em momentos agrupados.",
        },
      ],
      value: {
        eyebrow: "O que continua visível",
        title: "Onde você esteve, quando aconteceu e o que pertencia ao mesmo momento continua à vista",
        lead:
          "O resultado organizado mantém a rota, o tempo e os grupos de fotos fáceis de revisar depois.",
        bullets: [
          "Acompanhe a viagem em ordem, dia após dia.",
          "Mantenha juntos os momentos de cada lugar.",
          "Continue o arquivo organizado no seu drive.",
        ],
      },
      bridge: {
        title: "Pronto para manter a próxima viagem em ordem?",
        lead:
          "Instale o app e leve também o próximo lote de fotos da viagem de uma só vez.",
        cta: "Ir para o download",
      },
    },
    download: {
      title: "Baixe agora",
      lead: "Instale agora e comece a organizar as fotos da sua viagem.",
    },
  },
  fr: {
    marketing: {
      showcase: {
        eyebrow: "Voir d'abord le résultat",
        title: "Votre voyage, remis en chronologie",
        lead:
          "MomentBook regroupe les photos du voyage par date et lieu pour que le fil du trajet reste lisible.",
        primaryCta: "Installer l'app",
        secondaryCta: "Voir comment cela s'organise",
      },
      storyEyebrow: "Du rouleau photo au fil du voyage",
      storyTitle: "Trois scènes pour comprendre l'organisation",
      storyLead:
        "Un parcours court entre un rouleau mélangé et une chronologie plus simple à revoir.",
      scenes: [
        {
          sceneLabel: "Scène 01",
          title: "Les photos continuent de s'accumuler",
          description:
            "Les photos du voyage restent dans le rouleau telles qu'elles ont été prises.",
        },
        {
          sceneLabel: "Scène 02",
          title: "Rassemblez-les d'un coup",
          description:
            "Sélectionnez le lot une seule fois et l'app commence à le lire comme un seul voyage.",
        },
        {
          sceneLabel: "Scène 03",
          title: "La chronologie prend forme",
          description:
            "Le temps et le lieu transforment des photos dispersées en moments regroupés.",
        },
      ],
      value: {
        eyebrow: "Ce qui reste visible",
        title: "Où vous étiez, quand cela s'est passé et ce qui appartenait au même moment reste lisible",
        lead:
          "Le résultat organisé laisse la route, le temps et les groupes de photos faciles à relire plus tard.",
        bullets: [
          "Suivez le voyage jour après jour.",
          "Gardez ensemble les moments liés à un lieu.",
          "Prolongez l'archive organisée jusqu'à votre drive.",
        ],
      },
      bridge: {
        title: "Prêt à garder le prochain voyage en ordre ?",
        lead:
          "Installez l'app, puis importez d'un coup le prochain lot de photos de voyage.",
        cta: "Aller au téléchargement",
      },
    },
    download: {
      title: "Téléchargez maintenant",
      lead: "Installez-le maintenant et commencez à organiser vos photos de voyage.",
    },
  },
  th: {
    marketing: {
      showcase: {
        eyebrow: "ดูผลลัพธ์ก่อน",
        title: "รูปทริปของคุณจะถูกจัดเป็นไทม์ไลน์",
        lead:
          "MomentBook จัดรูปทริปตามเวลาและสถานที่ เพื่อให้ลำดับของการเดินทางย้อนดูได้ง่ายขึ้น",
        primaryCta: "ติดตั้งแอป",
        secondaryCta: "ดูว่าจัดอย่างไร",
      },
      storyEyebrow: "จากกองรูปสู่ลำดับการเดินทาง",
      storyTitle: "ดูขั้นตอนการจัดผ่าน 3 ฉาก",
      storyLead:
        "จากแกลเลอรีที่ปะปนกัน ไปสู่บันทึกการเดินทางที่ย้อนกลับมาดูได้ง่ายขึ้น",
      scenes: [
        {
          sceneLabel: "ฉาก 01",
          title: "รูปยังคงเพิ่มขึ้นเรื่อย ๆ",
          description:
            "รูปที่ถ่ายระหว่างทริปจะยังคงอยู่ในแกลเลอรีตามลำดับที่ถ่ายไว้",
        },
        {
          sceneLabel: "ฉาก 02",
          title: "นำเข้าพร้อมกันครั้งเดียว",
          description:
            "เมื่อเลือกรูปทั้งชุดครั้งเดียว แอปจะเริ่มอ่านว่าเป็นทริปเดียวกัน",
        },
        {
          sceneLabel: "ฉาก 03",
          title: "ไทม์ไลน์เริ่มเป็นรูปเป็นร่าง",
          description:
            "เวลาและสถานที่จะเปลี่ยนรูปที่กระจัดกระจายให้เป็นช่วงเวลาที่จัดเป็นกลุ่ม",
        },
      ],
      value: {
        eyebrow: "สิ่งที่ยังมองเห็นได้หลังจัดแล้ว",
        title: "คุณอยู่ที่ไหน เมื่อไร และรูปไหนอยู่ในช่วงเดียวกัน ยังย้อนกลับมาดูได้",
        lead:
          "ผลลัพธ์ที่จัดแล้วทำให้เส้นทาง เวลา และกลุ่มรูปยังอ่านได้ง่ายเมื่อต้องการกลับมาดูอีกครั้ง",
        bullets: [
          "ย้อนดูการเดินทางตามลำดับวันได้",
          "เก็บช่วงเวลาในสถานที่เดียวกันไว้ด้วยกัน",
          "ให้คลังที่จัดแล้วต่อเนื่องไปยังไดรฟ์ของคุณ",
        ],
      },
      bridge: {
        title: "พร้อมจะเก็บทริปถัดไปให้เป็นระเบียบแล้วหรือยัง",
        lead: "ติดตั้งแอป แล้วนำเข้ารูปทริปชุดถัดไปพร้อมกันในครั้งเดียว",
        cta: "ไปยังส่วนดาวน์โหลด",
      },
    },
    download: {
      title: "ดาวน์โหลดตอนนี้",
      lead: "ติดตั้งตอนนี้แล้วเริ่มจัดรูปทริปของคุณ",
    },
  },
  vi: {
    marketing: {
      showcase: {
        eyebrow: "Xem kết quả trước",
        title: "Ảnh chuyến đi được sắp thành dòng thời gian",
        lead:
          "MomentBook nhóm ảnh chuyến đi theo thời gian và địa điểm để mạch chuyến đi vẫn dễ nhìn lại.",
        primaryCta: "Cài ứng dụng",
        secondaryCta: "Xem cách sắp xếp",
      },
      storyEyebrow: "Từ cuộn ảnh đến mạch chuyến đi",
      storyTitle: "Ba cảnh để hiểu cách sắp xếp",
      storyLead:
        "Một lộ trình ngắn từ cuộn ảnh lẫn lộn đến bản ghi chuyến đi dễ xem lại hơn.",
      scenes: [
        {
          sceneLabel: "Cảnh 01",
          title: "Ảnh vẫn tiếp tục dồn lại",
          description:
            "Ảnh chụp trong chuyến đi vẫn nằm trong thư viện đúng như lúc bạn chụp.",
        },
        {
          sceneLabel: "Cảnh 02",
          title: "Đưa vào cùng một lần",
          description:
            "Chọn cả lô ảnh một lần, rồi ứng dụng bắt đầu đọc chúng như một chuyến đi.",
        },
        {
          sceneLabel: "Cảnh 03",
          title: "Dòng thời gian bắt đầu thành hình",
          description:
            "Thời gian và địa điểm biến những ảnh rời rạc thành các khoảnh khắc được nhóm lại.",
        },
      ],
      value: {
        eyebrow: "Những gì còn nhìn thấy rõ",
        title: "Bạn đã ở đâu, khi nào, và ảnh nào thuộc cùng một khoảnh khắc vẫn hiện rõ",
        lead:
          "Kết quả đã sắp xếp giúp tuyến đi, thời điểm và nhóm ảnh vẫn dễ xem lại về sau.",
        bullets: [
          "Theo dõi chuyến đi theo thứ tự từng ngày.",
          "Giữ các khoảnh khắc theo địa điểm ở cùng nhau.",
          "Tiếp tục đồng bộ kho lưu trữ đã sắp xếp lên drive.",
        ],
      },
      bridge: {
        title: "Sẵn sàng giữ chuyến đi tiếp theo gọn gàng hơn chưa?",
        lead:
          "Cài ứng dụng rồi đưa cả lô ảnh của chuyến đi tiếp theo vào cùng một lần.",
        cta: "Đi tới phần tải xuống",
      },
    },
    download: {
      title: "Tải ngay",
      lead: "Cài ngay và bắt đầu sắp xếp ảnh chuyến đi của bạn.",
    },
  },
};

const contactTypeByLanguage: Record<Language, string> = {
  en: "Customer Support",
  ko: "고객 지원",
  ja: "カスタマーサポート",
  zh: "客户支持",
  es: "Atención al cliente",
  pt: "Suporte ao cliente",
  fr: "Support client",
  th: "ฝ่ายสนับสนุนลูกค้า",
  vi: "Hỗ trợ khách hàng",
};

export function getHomePageCopy(lang: Language): HomePageCopy {
  return homePageCopy[lang] ?? homePageCopy.en;
}

export function getHomeEditorialCopy(lang: Language): HomeEditorialCopy {
  return homeEditorialCopy[lang] ?? homeEditorialCopy.en;
}

export function getHomeMarketingCopy(lang: Language): HomeMarketingCopy {
  return homeMarketingCopy[lang] ?? homeMarketingCopy.en;
}

export function getHomeContactType(lang: Language): string {
  return contactTypeByLanguage[lang] ?? contactTypeByLanguage.en;
}

export function buildHomeHeroContent(
  pageCopy: HomePageCopy,
  editorialCopy: HomeEditorialCopy,
): HomeHeroContent {
  return {
    heroEyebrow: editorialCopy.heroEyebrow,
    heroTitle: pageCopy.heroTitle,
    heroLead: pageCopy.heroLead,
    heroExploreCta: editorialCopy.heroExploreCta,
    primaryCta: pageCopy.primaryCta,
    heroFootnote: "",
  };
}
