import type { Language } from "@/lib/i18n/config";
import type { HomeDownloadNarrativeContent } from "./HomeDownloadSection";
import type { HomeHeroContent } from "./HomeHero";
import type { HomeMarketingContent } from "./HomeMarketingStory";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  heroFootnote: string;
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
    heroTitle: "Upload your trip once, then revisit it as a timeline",
    heroLead:
      "MomentBook takes one batch of trip photos, organizes them by time and place, and carries the organized archive to your drive.",
    heroFootnote:
      "Available on the App Store and Google Play. Journeys stay private unless you choose to publish them.",
    primaryCta: "Install app",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 올리면, 드라이브까지 정리됩니다",
    metaDescription:
      "여행 사진을 한 번에 올리면 시간과 장소 기준 타임라인으로 정리하고, 정리된 아카이브를 클라우드 드라이브에 자동 동기화합니다.",
    heroTitle: "여행 사진을 한 번 올리면, 다시 보기 쉬운 타임라인이 됩니다",
    heroLead:
      "이미 찍은 여행 사진을 한 번에 올리면 시간과 장소 흐름으로 정리하고, 정리된 아카이브를 드라이브까지 이어 줍니다.",
    heroFootnote:
      "App Store와 Google Play에서 사용할 수 있으며, 여정은 게시를 선택하기 전까지 비공개로 유지됩니다.",
    primaryCta: "앱 설치",
  },
  ja: {
    metaTitle: "MomentBook — 一度アップロードすると、ドライブまで整理されます",
    metaDescription:
      "旅行写真をまとめてアップロードすると、時間と場所の流れでタイムラインに整理し、整理されたアーカイブをクラウドドライブに自動同期します。",
    heroTitle: "旅の写真を一度まとめてアップロードすると、あとで見返しやすいタイムラインになります",
    heroLead:
      "すでに撮った旅行写真をまとめて取り込むと、時間と場所の流れで整理され、整理されたアーカイブがドライブまでつながります。",
    heroFootnote:
      "App Store と Google Play で利用でき、旅は公開を選ぶまで非公開のままです。",
    primaryCta: "アプリをインストール",
  },
  zh: {
    metaTitle: "MomentBook — 一次上传，连云盘都会整理好",
    metaDescription:
      "一次上传旅行照片后，MomentBook 会按时间和地点整理成时间线，并将整理好的档案自动同步到云盘。",
    heroTitle: "旅行照片一次上传后，就会整理成便于回看的时间线",
    heroLead:
      "把已经拍好的旅行照片一次上传后，MomentBook 会按时间和地点整理，并把整理好的档案继续同步到你的云盘。",
    heroFootnote:
      "可在 App Store 和 Google Play 使用，旅程在你选择发布前会保持私密。",
    primaryCta: "安装应用",
  },
  es: {
    metaTitle: "MomentBook — Súbelo una vez y se ordena hasta tu drive",
    metaDescription:
      "Sube las fotos del viaje de una vez. MomentBook las ordena en una línea de tiempo por fecha y lugar, y sincroniza automáticamente el archivo con tu nube.",
    heroTitle: "Sube tu viaje una vez y vuelve a verlo como una línea de tiempo",
    heroLead:
      "MomentBook toma un solo lote de fotos del viaje, las organiza por fecha y lugar y lleva ese archivo ordenado hasta tu drive.",
    heroFootnote:
      "Disponible en App Store y Google Play. Los viajes siguen siendo privados hasta que decidas publicarlos.",
    primaryCta: "Instalar app",
  },
  pt: {
    metaTitle: "MomentBook — Envie uma vez e tudo segue organizado até o drive",
    metaDescription:
      "Envie as fotos da viagem de uma vez. O MomentBook organiza tudo em uma linha do tempo por data e lugar e sincroniza automaticamente o arquivo com seu drive na nuvem.",
    heroTitle: "Envie sua viagem uma vez e revisite tudo como uma linha do tempo",
    heroLead:
      "O MomentBook recebe um único lote de fotos da viagem, organiza por data e lugar e leva o arquivo organizado até o seu drive.",
    heroFootnote:
      "Disponível na App Store e no Google Play. As viagens permanecem privadas até você decidir publicar.",
    primaryCta: "Instalar app",
  },
  fr: {
    metaTitle: "MomentBook — Importez une fois, l'organisation va jusqu'au drive",
    metaDescription:
      "Importez les photos du voyage en une fois. MomentBook les range dans une chronologie par date et lieu, puis synchronise automatiquement l'archive avec votre espace cloud.",
    heroTitle: "Importez votre voyage une fois, puis retrouvez-le comme une chronologie",
    heroLead:
      "MomentBook prend un seul lot de photos du voyage, les organise par date et lieu, puis prolonge l'archive organisée jusqu'à votre drive.",
    heroFootnote:
      "Disponible sur l'App Store et Google Play. Les voyages restent privés tant que vous ne choisissez pas de les publier.",
    primaryCta: "Installer l'app",
  },
  th: {
    metaTitle: "MomentBook — อัปโหลดครั้งเดียว แล้วจัดไปถึงไดรฟ์",
    metaDescription:
      "อัปโหลดรูปทริปครั้งเดียว MomentBook จะจัดเป็นไทม์ไลน์ตามเวลาและสถานที่ พร้อมซิงก์คลังที่จัดแล้วไปยังคลาวด์ไดรฟ์โดยอัตโนมัติ",
    heroTitle: "อัปโหลดรูปทริปครั้งเดียว แล้วกลับมาดูเป็นไทม์ไลน์ได้ง่าย",
    heroLead:
      "MomentBook รับรูปทริปเป็นชุดเดียว จัดตามเวลาและสถานที่ แล้วพาคลังที่จัดแล้วต่อเนื่องไปยังไดรฟ์ของคุณ",
    heroFootnote:
      "ใช้งานได้บน App Store และ Google Play และทริปจะยังเป็นส่วนตัวจนกว่าคุณจะเลือกเผยแพร่",
    primaryCta: "ติดตั้งแอป",
  },
  vi: {
    metaTitle: "MomentBook — Tải lên một lần, sắp xếp tới tận drive",
    metaDescription:
      "Tải ảnh chuyến đi lên một lần. MomentBook sắp thành dòng thời gian theo thời gian và địa điểm, rồi tự động đồng bộ kho lưu trữ đã sắp xếp lên cloud drive.",
    heroTitle: "Tải chuyến đi lên một lần rồi xem lại như một dòng thời gian rõ ràng",
    heroLead:
      "MomentBook nhận trọn một lượt ảnh chuyến đi, sắp theo thời gian và địa điểm rồi đưa kho lưu trữ đã sắp xếp lên drive của bạn.",
    heroFootnote:
      "Có trên App Store và Google Play. Hành trình vẫn ở chế độ riêng tư cho đến khi bạn chọn công khai.",
    primaryCta: "Cài ứng dụng",
  },
};

const homeEditorialCopy: Record<Language, HomeEditorialCopy> = {
  en: {
    heroEyebrow: "Travel photo organizer",
    heroExploreCta: "See the flow",
    featuredEyebrow: "Public archive",
    featuredTitle: "Recent public journeys",
    featuredLead: "Recently published trips.",
    featuredArchiveCta: "View all",
    photoCountLabel: "photos",
    untitledJourney: "Untitled journey",
    unknownUser: "Unknown user",
    emptyJourneys: "No public journeys yet.",
  },
  ko: {
    heroEyebrow: "여행 사진 정리 앱",
    heroExploreCta: "정리 흐름 보기",
    featuredEyebrow: "공개 아카이브",
    featuredTitle: "최근 공개된 여행",
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
    featuredTitle: "最近公開された旅",
    featuredLead: "最近公開された旅行です。",
    featuredArchiveCta: "すべて見る",
    photoCountLabel: "枚",
    untitledJourney: "タイトル未設定の旅",
    unknownUser: "不明なユーザー",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    heroEyebrow: "旅行照片整理应用",
    heroExploreCta: "查看如何整理",
    featuredEyebrow: "公开档案",
    featuredTitle: "最近公开的旅程",
    featuredLead: "最近公开的旅程。",
    featuredArchiveCta: "查看全部",
    photoCountLabel: "张",
    untitledJourney: "未命名旅程",
    unknownUser: "未知用户",
    emptyJourneys: "还没有公开旅程。",
  },
  es: {
    heroEyebrow: "App para organizar fotos de viaje",
    heroExploreCta: "Ver cómo se organiza",
    featuredEyebrow: "Archivo público",
    featuredTitle: "Viajes públicos recientes",
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
    featuredTitle: "Viagens públicas recentes",
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
    featuredTitle: "Voyages publics récents",
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
    featuredTitle: "ทริปสาธารณะที่เผยแพร่ล่าสุด",
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
    featuredTitle: "Những hành trình công khai gần đây",
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
          "Travel photos group by time and place into a readable timeline.",
        primaryCta: "Install app",
        secondaryCta: "See the flow",
      },
      storyEyebrow: "From photo roll to trip flow",
      storyTitle: "How it gets organized",
      storyLead:
        "A short walkthrough from a mixed camera roll to a timeline that is easier to revisit later.",
      scenes: [
        {
          sceneLabel: "Scene 01",
          title: "Trip photos keep piling up in your camera roll",
          description:
            "Photos from the trip stay exactly where and how you captured them.",
        },
        {
          sceneLabel: "Scene 02",
          title: "Bring them in all at once",
          description:
            "Select the batch once and the app starts reading it as one trip.",
        },
        {
          sceneLabel: "Scene 03",
          title: "It gets organized by time and place",
          description:
            "Scattered photos gather into moments shaped by time and place, and the timeline takes form.",
        },
      ],
      value: {
        eyebrow: "What stays visible",
        title: "The flow of the trip becomes easy to see again",
        lead:
          "The organized result leaves the route, timing, and grouped photos in a form that is easier to read later.",
        bullets: [
          "Follow the trip in day-by-day order.",
          "Keep moments from the same place together.",
          "Carry the organized archive through to your drive.",
        ],
      },
    },
    download: {
      title: "Download MomentBook",
      lead: "Install the app and start organizing trip photos.",
    },
  },
  ko: {
    marketing: {
      showcase: {
        eyebrow: "결과 먼저 보기",
        title: "여행 사진이, 타임라인으로 정리됩니다",
        lead:
          "여행 사진이 시간과 장소 기준 타임라인으로 정리됩니다.",
        primaryCta: "앱 설치",
        secondaryCta: "정리 흐름 보기",
      },
      storyEyebrow: "사진 묶음에서 여행 흐름까지",
      storyTitle: "정리되는 과정",
      storyLead:
        "섞여 있는 카메라 롤이 다시 보기 쉬운 여행 기록으로 바뀌는 흐름입니다.",
      scenes: [
        {
          sceneLabel: "장면 01",
          title: "여행에서 찍은 사진이 쌓여 있습니다",
          description:
            "여행 중 찍은 사진은 찍힌 순서 그대로 갤러리에 남습니다.",
        },
        {
          sceneLabel: "장면 02",
          title: "사진 한 묶음을 가져옵니다",
          description:
            "사진을 업로드 하면 장소 단위로 모읍니다.",
        },
        {
          sceneLabel: "장면 03",
          title: "시간과 장소를 따라 타임라인이 정리됩니다",
          description:
            "흩어진 사진이 모먼트 단위로 묶이며 다시 보기 쉬운 흐름이 생깁니다.",
        },
      ],
      value: {
        eyebrow: "정리 후 남는 것",
        title: "여행 흐름이 다시 보입니다",
        lead:
          "정리된 결과는 이동 흐름과 시점, 함께 묶인 사진을 나중에도 읽기 쉽게 남깁니다.",
        bullets: [
          "하루 단위의 여행 순서를 따라볼 수 있습니다.",
          "장소 기준의 순간이 함께 남습니다.",
          "정리된 아카이브가 드라이브로 이어집니다.",
        ],
      },
    },
    download: {
      title: "MomentBook 다운로드",
      lead: "앱을 설치하고 여행 사진을 정리하세요.",
    },
  },
  ja: {
    marketing: {
      showcase: {
        eyebrow: "結果を先に見る",
        title: "旅行写真がタイムラインとして整います",
        lead:
          "旅行写真を時間と場所でまとめ、旅の流れがあとで見返しやすい形で残ります。",
        primaryCta: "アプリをインストール",
        secondaryCta: "どう整理されるか見る",
      },
      storyEyebrow: "写真の束から旅の流れへ",
      storyTitle: "整理される流れ",
      storyLead:
        "混ざったカメラロールが、あとで見返しやすい旅の記録に変わる流れです。",
      scenes: [
        {
          sceneLabel: "場面 01",
          title: "旅行写真がカメラロールにたまっていきます",
          description: "旅先で撮った写真は、撮った順のまま残っています。",
        },
        {
          sceneLabel: "場面 02",
          title: "まとめて取り込みます",
          description:
            "写真のまとまりを一度に選ぶと、アプリがひとつの旅として読み始めます。",
        },
        {
          sceneLabel: "場面 03",
          title: "時間と場所に沿って整います",
          description:
            "散らばった写真が時間と場所を基準にしたモーメントとしてまとまり、タイムラインになります。",
        },
      ],
      value: {
        eyebrow: "整理したあとに残るもの",
        title: "旅の流れがもう一度見えやすくなります",
        lead:
          "整理された結果は、移動の流れや時点、ひとまとまりの写真をあとでも読みやすく残します。",
        bullets: [
          "1日ごとの順番で旅をたどれます。",
          "同じ場所で撮った瞬間をひとまとまりで残せます。",
          "整理されたアーカイブがドライブへ続きます。",
        ],
      },
    },
    download: {
      title: "MomentBook をダウンロード",
      lead: "インストールして、旅行写真の整理を始めましょう。",
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
      storyTitle: "整理过程",
      storyLead: "混在一起的相册，会变成之后更容易回看的旅行记录。",
      scenes: [
        {
          sceneLabel: "场景 01",
          title: "旅行照片会堆在相册里",
          description: "旅行中拍下的照片，会按拍摄时的状态原样留下来。",
        },
        {
          sceneLabel: "场景 02",
          title: "一次全部导入",
          description: "一次选好这一组照片后，应用会开始把它们当作同一趟旅行来读取。",
        },
        {
          sceneLabel: "场景 03",
          title: "会按时间和地点整理",
          description: "分散的照片会按时间和地点被整理成一个个时刻，时间线也随之成形。",
        },
      ],
      value: {
        eyebrow: "整理后留下的东西",
        title: "旅程的脉络会重新变得清楚",
        lead:
          "整理后的结果会把路线、时间和成组照片保留下来，之后再看也更容易理解。",
        bullets: [
          "可以按每天的顺序回看整段旅程。",
          "同一地点拍下的时刻会留在一起。",
          "整理好的档案会继续同步到云盘。",
        ],
      },
    },
    download: {
      title: "下载 MomentBook",
      lead: "安装后，开始整理旅行照片。",
    },
  },
  es: {
    marketing: {
      showcase: {
        eyebrow: "Primero, el resultado",
        title: "Tu viaje, ordenado como una línea de tiempo",
        lead:
          "MomentBook agrupa las fotos del viaje por fecha y lugar para que el recorrido sea más fácil de revisar después.",
        primaryCta: "Instalar app",
        secondaryCta: "Ver cómo se organiza",
      },
      storyEyebrow: "De un carrete mezclado al flujo del viaje",
      storyTitle: "Cómo se organiza",
      storyLead:
        "Un recorrido breve desde un carrete mezclado hasta un registro del viaje más fácil de volver a mirar.",
      scenes: [
        {
          sceneLabel: "Escena 01",
          title: "Las fotos del viaje se acumulan en el carrete",
          description:
            "Las fotos del viaje se quedan tal como las fuiste tomando.",
        },
        {
          sceneLabel: "Escena 02",
          title: "Tráelas de una vez",
          description:
            "Elige el lote una sola vez y la app empieza a leerlo como un solo viaje.",
        },
        {
          sceneLabel: "Escena 03",
          title: "Se ordena por fecha y lugar",
          description:
            "Las fotos dispersas se agrupan en momentos según la fecha y el lugar, y así toma forma la línea de tiempo.",
        },
      ],
      value: {
        eyebrow: "Lo que sigue visible",
        title: "El recorrido del viaje vuelve a verse con claridad",
        lead:
          "El resultado organizado mantiene legible la ruta, el tiempo y los grupos de fotos para volver más tarde.",
        bullets: [
          "Sigue el viaje en orden día por día.",
          "Mantén juntos los momentos tomados en un mismo lugar.",
          "Continúa el archivo organizado en tu drive.",
        ],
      },
    },
    download: {
      title: "Descargar MomentBook",
      lead: "Instala la app y empieza a organizar tus fotos de viaje.",
    },
  },
  pt: {
    marketing: {
      showcase: {
        eyebrow: "Primeiro, o resultado",
        title: "Sua viagem, organizada como uma linha do tempo",
        lead:
          "O MomentBook agrupa as fotos da viagem por tempo e lugar para que o percurso fique mais fácil de revisitar depois.",
        primaryCta: "Instalar app",
        secondaryCta: "Ver como se organiza",
      },
      storyEyebrow: "Do rolo de fotos ao fluxo da viagem",
      storyTitle: "Como a organização acontece",
      storyLead:
        "Um percurso curto entre um rolo misturado e um registro de viagem mais fácil de revisar depois.",
      scenes: [
        {
          sceneLabel: "Cena 01",
          title: "As fotos da viagem se acumulam no rolo",
          description:
            "As fotos da viagem permanecem exatamente como foram registradas.",
        },
        {
          sceneLabel: "Cena 02",
          title: "Traga tudo de uma vez",
          description:
            "Selecione o lote uma vez e o app começa a ler tudo como uma única viagem.",
        },
        {
          sceneLabel: "Cena 03",
          title: "Tudo se organiza por tempo e lugar",
          description:
            "Fotos espalhadas viram momentos agrupados por tempo e lugar, e a linha do tempo ganha forma.",
        },
      ],
      value: {
        eyebrow: "O que continua visível",
        title: "O fluxo da viagem volta a ficar fácil de ver",
        lead:
          "O resultado organizado mantém a rota, o tempo e os grupos de fotos fáceis de revisar depois.",
        bullets: [
          "Acompanhe a viagem em ordem, dia após dia.",
          "Mantenha juntos os momentos feitos no mesmo lugar.",
          "Continue o arquivo organizado no seu drive.",
        ],
      },
    },
    download: {
      title: "Baixar MomentBook",
      lead: "Instale o app e comece a organizar as fotos da sua viagem.",
    },
  },
  fr: {
    marketing: {
      showcase: {
        eyebrow: "Voir d'abord le résultat",
        title: "Votre voyage, remis en chronologie",
        lead:
          "MomentBook regroupe les photos du voyage par date et lieu pour que le fil du trajet soit plus facile à revoir ensuite.",
        primaryCta: "Installer l'app",
        secondaryCta: "Voir comment cela s'organise",
      },
      storyEyebrow: "Du rouleau photo au fil du voyage",
      storyTitle: "Comment cela s'organise",
      storyLead:
        "Un parcours court entre un rouleau mélangé et un récit de voyage plus simple à revoir ensuite.",
      scenes: [
        {
          sceneLabel: "Scène 01",
          title: "Les photos du voyage s'accumulent dans le rouleau",
          description:
            "Les photos du voyage restent telles qu'elles ont été prises.",
        },
        {
          sceneLabel: "Scène 02",
          title: "Importez-les en une fois",
          description:
            "Sélectionnez le lot une seule fois et l'app commence à le lire comme un seul voyage.",
        },
        {
          sceneLabel: "Scène 03",
          title: "Le tout s'organise par date et lieu",
          description:
            "Les photos dispersées se regroupent en moments selon le temps et le lieu, et la chronologie prend forme.",
        },
      ],
      value: {
        eyebrow: "Ce qui reste visible",
        title: "Le fil du voyage redevient facile à voir",
        lead:
          "Le résultat organisé laisse la route, le temps et les groupes de photos faciles à relire plus tard.",
        bullets: [
          "Suivez le voyage jour après jour.",
          "Gardez ensemble les moments pris au même endroit.",
          "Prolongez l'archive organisée jusqu'à votre drive.",
        ],
      },
    },
    download: {
      title: "Télécharger MomentBook",
      lead: "Installez l'app et commencez à organiser vos photos de voyage.",
    },
  },
  th: {
    marketing: {
      showcase: {
        eyebrow: "ดูผลลัพธ์ก่อน",
        title: "รูปทริปของคุณจะถูกจัดเป็นไทม์ไลน์",
        lead:
          "MomentBook จัดรูปทริปตามเวลาและสถานที่ เพื่อให้ลำดับของการเดินทางย้อนกลับมาดูได้ง่ายขึ้น",
        primaryCta: "ติดตั้งแอป",
        secondaryCta: "ดูว่าจัดอย่างไร",
      },
      storyEyebrow: "จากกองรูปสู่ลำดับการเดินทาง",
      storyTitle: "ขั้นตอนการจัด",
      storyLead:
        "จากแกลเลอรีที่ปะปนกัน ไปสู่บันทึกการเดินทางที่ย้อนกลับมาดูได้ง่ายขึ้น",
      scenes: [
        {
          sceneLabel: "ฉาก 01",
          title: "รูปทริปสะสมอยู่ในแกลเลอรี",
          description:
            "รูปที่ถ่ายระหว่างทริปจะยังคงอยู่ตามลำดับที่ถ่ายไว้",
        },
        {
          sceneLabel: "ฉาก 02",
          title: "นำเข้าพร้อมกันครั้งเดียว",
          description:
            "เมื่อเลือกรูปทั้งชุดครั้งเดียว แอปจะเริ่มอ่านว่าเป็นทริปเดียวกัน",
        },
        {
          sceneLabel: "ฉาก 03",
          title: "จัดตามเวลาและสถานที่",
          description:
            "รูปที่กระจัดกระจายจะถูกจัดเป็นช่วงเวลาตามเวลาและสถานที่ แล้วไทม์ไลน์จึงค่อยเป็นรูปเป็นร่าง",
        },
      ],
      value: {
        eyebrow: "สิ่งที่ยังมองเห็นได้หลังจัดแล้ว",
        title: "ลำดับของการเดินทางกลับมาดูได้ชัดขึ้นอีกครั้ง",
        lead:
          "ผลลัพธ์ที่จัดแล้วทำให้เส้นทาง เวลา และกลุ่มรูปยังอ่านได้ง่ายเมื่อต้องการกลับมาดูอีกครั้ง",
        bullets: [
          "ย้อนดูการเดินทางตามลำดับวันได้",
          "เก็บช่วงเวลาที่ถ่ายในสถานที่เดียวกันไว้ด้วยกัน",
          "ให้คลังที่จัดแล้วต่อเนื่องไปยังไดรฟ์ของคุณ",
        ],
      },
    },
    download: {
      title: "ดาวน์โหลด MomentBook",
      lead: "ติดตั้งแอปแล้วเริ่มจัดรูปทริปของคุณ",
    },
  },
  vi: {
    marketing: {
      showcase: {
        eyebrow: "Xem kết quả trước",
        title: "Ảnh chuyến đi được sắp thành dòng thời gian",
        lead:
          "MomentBook nhóm ảnh chuyến đi theo thời gian và địa điểm để mạch chuyến đi dễ nhìn lại hơn về sau.",
        primaryCta: "Cài ứng dụng",
        secondaryCta: "Xem cách sắp xếp",
      },
      storyEyebrow: "Từ cuộn ảnh đến mạch chuyến đi",
      storyTitle: "Quá trình sắp xếp",
      storyLead:
        "Một lộ trình ngắn từ cuộn ảnh lẫn lộn đến bản ghi chuyến đi dễ xem lại hơn.",
      scenes: [
        {
          sceneLabel: "Cảnh 01",
          title: "Ảnh chuyến đi dồn lại trong thư viện",
          description:
            "Ảnh chụp trong chuyến đi vẫn nằm nguyên như lúc bạn chụp.",
        },
        {
          sceneLabel: "Cảnh 02",
          title: "Đưa vào một lần",
          description:
            "Chọn cả lô ảnh một lần và ứng dụng bắt đầu đọc chúng như một chuyến đi.",
        },
        {
          sceneLabel: "Cảnh 03",
          title: "Được sắp theo thời gian và địa điểm",
          description:
            "Những ảnh rời rạc được gom thành các khoảnh khắc theo thời gian và địa điểm, rồi dòng thời gian dần thành hình.",
        },
      ],
      value: {
        eyebrow: "Những gì còn nhìn thấy rõ",
        title: "Mạch chuyến đi lại trở nên dễ nhìn hơn",
        lead:
          "Kết quả đã sắp xếp giúp tuyến đi, thời điểm và nhóm ảnh vẫn dễ xem lại về sau.",
        bullets: [
          "Theo dõi chuyến đi theo thứ tự từng ngày.",
          "Giữ các khoảnh khắc chụp ở cùng một nơi ở cùng nhau.",
          "Tiếp tục đồng bộ kho lưu trữ đã sắp xếp lên drive.",
        ],
      },
    },
    download: {
      title: "Tải MomentBook",
      lead: "Cài ứng dụng và bắt đầu sắp xếp ảnh chuyến đi của bạn.",
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
    heroFootnote: pageCopy.heroFootnote,
  };
}
