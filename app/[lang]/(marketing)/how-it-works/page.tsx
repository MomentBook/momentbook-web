import type { Metadata } from "next";
import Link from "next/link";
import styles from "./how-it-works.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
  flowTitle: string;
  flowLead: string;
  flows: HowItWorksFlow[];
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

const howItWorksContent: Record<Language, HowItWorksContent> = {
  en: {
    metaTitle: "Two ways to begin — MomentBook",
    metaDescription: "Track a journey or organize with photos only. Both become a calm, organized journey you can return to.",
    heroTitle: "Two ways to record a journey",
    heroSubtitle: "Track as you move, or start with photos only. Both lead to an organized journey you can return to.",
    heroTrackingCta: "Record with tracking",
    heroPhotoCta: "Organize with photos",
    flowTitle: "Two paths, one destination",
    flowLead: "Choose the start that fits today. The destination is an organized journey.",
    flows: [
      {
        id: "tracking",
        title: "Tracking-based journey",
        summary: "For days when you want time and place to gather as you move.",
        steps: [
          "Start tracking from the home screen.",
          "Move naturally while moments collect.",
          "Finish the journey when you are ready.",
          "Add photos or notes during the organization step.",
          "Review the organized journey.",
        ],
      },
      {
        id: "photo",
        title: "Photo-only organization",
        summary: "If tracking feels heavy, photos alone are enough.",
        steps: [
          "Select the photos you want to organize.",
          "Time and location are read from the photos.",
          "Photos group into moments automatically.",
          "Adjust the moments when needed.",
          "Review the organized journey.",
        ],
      },
    ],
    outcomeTitle: "Where both paths meet",
    outcomeLead: "However you begin, the result points to the same place.",
    outcomeHighlights: [
      "Memories shaped as journeys, not a feed.",
      "Organized moments at a glance.",
      "Sharing is optional; keeping it personal is the default.",
    ],
    outcomePrimaryCta: "Download the app",
    outcomeSecondaryCta: "See supporting features",
    featuresTitle: "Supporting features",
    featuresLead: "Details that help the flow without taking it over.",
    features: [
      {
        title: "Add photos after tracking",
        text: "In the tracking flow, you can upload photos after finishing.",
      },
      {
        title: "Lightweight adjustments",
        text: "Tweak groupings and order only when you need to.",
      },
      {
        title: "Optional publishing",
        text: "Publishing creates a shareable web page. It is not required.",
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
        answer: "In the tracking flow, you add after finishing. In photo-only, you start by selecting photos.",
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
    metaDescription: "트래킹으로 기록하거나 사진만으로 정리합니다. 두 방식 모두 정리된 여정으로 이어집니다.",
    heroTitle: "여정을 기록하는 두 가지 방법",
    heroSubtitle: "트래킹으로 기록하거나 사진만으로 정리합니다. 두 방식 모두 정리된 여정으로 이어집니다.",
    heroTrackingCta: "트래킹으로 기록하기",
    heroPhotoCta: "사진만으로 정리하기",
    flowTitle: "두 가지 시작, 같은 목적지",
    flowLead: "오늘의 시작을 고르세요. 목적지는 정리된 여정입니다.",
    flows: [
      {
        id: "tracking",
        title: "트래킹 기반 여정",
        summary: "이동하면서 시간과 장소를 모으고 싶을 때.",
        steps: [
          "홈에서 트래킹으로 시작합니다.",
          "이동하며 순간이 조용히 모입니다.",
          "원할 때 여정을 마무리합니다.",
          "정리 과정에서 사진과 메모를 더합니다.",
          "정리된 여정을 확인합니다.",
        ],
      },
      {
        id: "photo",
        title: "사진만으로 정리",
        summary: "트래킹이 부담스럽다면 사진만으로도 가능합니다.",
        steps: [
          "정리하고 싶은 사진을 고릅니다.",
          "시간과 위치 정보가 읽힙니다.",
          "사진이 순간으로 자동 묶입니다.",
          "필요한 만큼만 보정합니다.",
          "정리된 여정을 확인합니다.",
        ],
      },
    ],
    outcomeTitle: "두 흐름이 만나는 지점",
    outcomeLead: "어떤 시작이든 결과는 같은 방향입니다.",
    outcomeHighlights: [
      "기억을 ‘피드’가 아니라 ‘여정’으로",
      "정리된 순간들을 한눈에",
      "공유는 선택, 기본은 개인 기록",
    ],
    outcomePrimaryCta: "앱 다운로드",
    outcomeSecondaryCta: "기능 더 보기",
    featuresTitle: "흐름을 돕는 요소",
    featuresLead: "작은 기능이 흐름을 방해하지 않도록 배치됩니다.",
    features: [
      {
        title: "마무리 후 사진 추가",
        text: "트래킹 흐름에서는 마무리 이후에 사진을 더할 수 있습니다.",
      },
      {
        title: "가벼운 보정",
        text: "묶음과 순서를 필요할 때만 조정합니다.",
      },
      {
        title: "선택적 게시",
        text: "게시하면 공유 가능한 공개 페이지가 만들어집니다. 필수는 아닙니다.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        question: "트래킹은 필수인가요?",
        answer: "아니요. 사진만으로도 정리할 수 있습니다.",
      },
      {
        question: "사진은 언제 추가하나요?",
        answer: "트래킹 흐름에서는 마무리 후 추가할 수 있고, 사진만 흐름에서는 시작부터 사진을 선택합니다.",
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
    heroSubtitle: "トラッキングでも写真だけでも。どちらも整理された旅につながります。",
    heroTrackingCta: "トラッキングで記録する",
    heroPhotoCta: "写真だけで整理する",
    flowTitle: "二つの始まり、同じ行き先",
    flowLead: "今日の始め方を選びます。行き先は整理された旅です。",
    flows: [
      {
        id: "tracking",
        title: "トラッキング起点の旅",
        summary: "移動しながら時間と場所を集めたい日。",
        steps: [
          "ホームからトラッキングを開始します。",
          "移動の中で瞬間が静かに集まります。",
          "好きなタイミングで旅を終えます。",
          "整理の中で写真やメモを追加します。",
          "整理された旅を確認します。",
        ],
      },
      {
        id: "photo",
        title: "写真だけで整理",
        summary: "トラッキングが負担なら写真だけでも。",
        steps: [
          "整理したい写真を選びます。",
          "時間と場所の情報を読み取ります。",
          "写真が自動で瞬間にまとまります。",
          "必要な分だけ調整します。",
          "整理された旅を確認します。",
        ],
      },
    ],
    outcomeTitle: "二つの流れが合流するところ",
    outcomeLead: "どの始め方でも結果は同じ方向です。",
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
        text: "トラッキングの流れでは終えた後に写真を追加できます。",
      },
      {
        title: "軽い調整",
        text: "まとまりや順序を必要な分だけ整えます。",
      },
      {
        title: "任意の公開",
        text: "公開すると共有できるWebページが作られます。必須ではありません。",
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
        answer: "トラッキングの流れでは終了後に追加でき、写真だけの流れでは最初から写真を選びます。",
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
    heroSubtitle: "可以用追踪记录，也可以只用照片整理。两种方式都通向整理后的旅程。",
    heroTrackingCta: "用追踪记录",
    heroPhotoCta: "只用照片整理",
    flowTitle: "两种起点，同一终点",
    flowLead: "选择今天的开始方式，终点是整理后的旅程。",
    flows: [
      {
        id: "tracking",
        title: "追踪式旅程",
        summary: "想在移动中收集时间与地点时。",
        steps: [
          "在主屏幕开始追踪。",
          "移动中，瞬间会安静地累积。",
          "准备好时结束旅程。",
          "整理过程中可添加照片或备注。",
          "查看整理后的旅程。",
        ],
      },
      {
        id: "photo",
        title: "照片整理",
        summary: "如果追踪有负担，只用照片也可以。",
        steps: [
          "选择要整理的照片。",
          "读取时间与位置信息。",
          "照片会自动分组成瞬间。",
          "按需要进行调整。",
          "查看整理后的旅程。",
        ],
      },
    ],
    outcomeTitle: "两条路径的汇合点",
    outcomeLead: "无论从哪开始，结果都指向同一处。",
    outcomeHighlights: [
      "记忆不是信息流，而是旅程",
      "整理后的瞬间一目了然",
      "分享可选，默认是个人记录",
    ],
    outcomePrimaryCta: "下载应用",
    outcomeSecondaryCta: "查看功能",
    featuresTitle: "支持流程的细节",
    featuresLead: "这些功能只为帮助流程，不喧宾夺主。",
    features: [
      {
        title: "追踪后添加照片",
        text: "在追踪流程中可以在结束后补充照片。",
      },
      {
        title: "轻量调整",
        text: "只在需要时调整分组和顺序。",
      },
      {
        title: "可选发布",
        text: "发布会生成可分享的网页。并非必需。",
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
        answer: "追踪流程在结束后可添加；照片流程从一开始就选择照片。",
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
    heroSubtitle: "Puedes registrar con tracking o ordenar solo con fotos. Ambas llevan a un viaje organizado.",
    heroTrackingCta: "Registrar con tracking",
    heroPhotoCta: "Ordenar solo con fotos",
    flowTitle: "Dos inicios, un destino",
    flowLead: "Elige el inicio de hoy. El destino es un viaje organizado.",
    flows: [
      {
        id: "tracking",
        title: "Viaje con tracking",
        summary: "Para dias en los que quieres reunir tiempo y lugar mientras te mueves.",
        steps: [
          "Desde la pantalla inicial, inicia el tracking.",
          "Al moverte, los momentos se juntan en silencio.",
          "Termina el viaje cuando quieras.",
          "Durante el ordenado puedes agregar fotos o notas.",
          "Revisa el viaje organizado.",
        ],
      },
      {
        id: "photo",
        title: "Ordenar solo con fotos",
        summary: "Si el tracking se siente pesado, solo con fotos tambien funciona.",
        steps: [
          "Elige las fotos que quieres ordenar.",
          "Se leen tiempo y lugar.",
          "Las fotos se agrupan en momentos automaticamente.",
          "Ajusta lo necesario.",
          "Revisa el viaje organizado.",
        ],
      },
    ],
    outcomeTitle: "Donde se unen los dos caminos",
    outcomeLead: "Empieces como empieces, el resultado es el mismo.",
    outcomeHighlights: [
      "Recuerdos como viajes, no como feed.",
      "Momentos ordenados de un vistazo.",
      "Compartir es opcional; lo personal es el punto de partida.",
    ],
    outcomePrimaryCta: "Descargar la app",
    outcomeSecondaryCta: "Ver funciones",
    featuresTitle: "Funciones de apoyo",
    featuresLead: "Solo acompanan el flujo.",
    features: [
      {
        title: "Agregar fotos al final",
        text: "En el flujo de tracking puedes agregar fotos despues de terminar.",
      },
      {
        title: "Ajustes ligeros",
        text: "Ajusta grupos y orden solo cuando lo necesites.",
      },
      {
        title: "Publicacion opcional",
        text: "Publicar crea una pagina web para compartir. No es obligatorio.",
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
        answer: "En tracking, despues de terminar. En fotos, empiezas seleccionando fotos.",
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
    heroSubtitle: "Voce pode registrar com tracking ou organizar so com fotos. Ambos levam a uma jornada organizada.",
    heroTrackingCta: "Registrar com tracking",
    heroPhotoCta: "Organizar so com fotos",
    flowTitle: "Dois inicios, um destino",
    flowLead: "Escolha o inicio de hoje. O destino e uma jornada organizada.",
    flows: [
      {
        id: "tracking",
        title: "Jornada com tracking",
        summary: "Para dias em que voce quer reunir tempo e lugar enquanto se move.",
        steps: [
          "Na tela inicial, inicie o tracking.",
          "Ao se mover, os momentos se juntam em silencio.",
          "Finalize a jornada quando quiser.",
          "Durante a organizacao, adicione fotos ou notas.",
          "Revise a jornada organizada.",
        ],
      },
      {
        id: "photo",
        title: "Organizar so com fotos",
        summary: "Se o tracking parecer pesado, so com fotos tambem funciona.",
        steps: [
          "Escolha as fotos que quer organizar.",
          "Tempo e lugar sao lidos.",
          "As fotos se agrupam em momentos automaticamente.",
          "Ajuste o necessario.",
          "Revise a jornada organizada.",
        ],
      },
    ],
    outcomeTitle: "Onde os dois caminhos se encontram",
    outcomeLead: "Comece por onde fizer sentido; o resultado e o mesmo.",
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
        text: "No fluxo de tracking, voce pode adicionar fotos apos finalizar.",
      },
      {
        title: "Ajustes leves",
        text: "Ajuste grupos e ordem so quando precisar.",
      },
      {
        title: "Publicacao opcional",
        text: "Publicar cria uma pagina web para compartilhar. Nao e obrigatorio.",
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
        answer: "No tracking, apos finalizar. No fluxo de fotos, voce comeca escolhendo fotos.",
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
    heroSubtitle: "Enregistrer avec tracking ou organiser uniquement avec des photos. Les deux menent a un voyage organise.",
    heroTrackingCta: "Enregistrer avec tracking",
    heroPhotoCta: "Organiser avec photos",
    flowTitle: "Deux departs, une destination",
    flowLead: "Choisissez le depart du jour. La destination est un voyage organise.",
    flows: [
      {
        id: "tracking",
        title: "Voyage avec tracking",
        summary: "Pour les jours ou vous voulez reunir temps et lieux en mouvement.",
        steps: [
          "Depuis l'ecran d'accueil, lancez le tracking.",
          "En bougeant, les moments se rassemblent doucement.",
          "Terminez le voyage quand vous voulez.",
          "Pendant l'organisation, ajoutez photos ou notes.",
          "Revoyez le voyage organise.",
        ],
      },
      {
        id: "photo",
        title: "Organiser avec photos",
        summary: "Si le tracking semble lourd, les photos seules suffisent.",
        steps: [
          "Choisissez les photos a organiser.",
          "Le temps et le lieu sont lus.",
          "Les photos se groupent en moments automatiquement.",
          "Ajustez seulement ce qui est necessaire.",
          "Revoyez le voyage organise.",
        ],
      },
    ],
    outcomeTitle: "Le point de rencontre des deux chemins",
    outcomeLead: "Quel que soit le debut, le resultat est le meme.",
    outcomeHighlights: [
      "Des souvenirs en voyages, pas en feed.",
      "Des moments organises d'un seul regard.",
      "Partager est optionnel; le personnel est la base.",
    ],
    outcomePrimaryCta: "Telecharger l'app",
    outcomeSecondaryCta: "Voir les fonctions",
    featuresTitle: "Fonctions de soutien",
    featuresLead: "Elles accompagnent le flux sans le remplacer.",
    features: [
      {
        title: "Ajouter des photos apres",
        text: "Dans le flux tracking, vous pouvez ajouter des photos apres avoir termine.",
      },
      {
        title: "Ajustements legers",
        text: "Ajustez groupes et ordre seulement si besoin.",
      },
      {
        title: "Publication optionnelle",
        text: "Publier cree une page web partageable. Ce n'est pas obligatoire.",
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
        answer: "Dans le flux tracking, apres la fin. Dans le flux photo, vous commencez par choisir des photos.",
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
    heroSubtitle: "บันทึกด้วยการติดตาม หรือเริ่มจากรูปเท่านั้นก็ได้ ทั้งสองแบบจบที่การเดินทางที่จัดระเบียบแล้ว.",
    heroTrackingCta: "บันทึกด้วยการติดตาม",
    heroPhotoCta: "จัดด้วยรูปเท่านั้น",
    flowTitle: "สองจุดเริ่ม ตรงสู่ปลายทางเดียวกัน",
    flowLead: "เลือกจุดเริ่มของวันนี้ ปลายทางคือการเดินทางที่จัดระเบียบแล้ว.",
    flows: [
      {
        id: "tracking",
        title: "การเดินทางแบบติดตาม",
        summary: "เหมาะกับวันที่อยากให้เวลาและสถานที่ถูกรวบรวมระหว่างการเคลื่อนไหว.",
        steps: [
          "เริ่มติดตามจากหน้าจอหลัก.",
          "ขยับไปตามปกติ แล้วช่วงเวลาจะค่อยๆ รวบรวม.",
          "จบการเดินทางเมื่อพร้อม.",
          "ระหว่างการจัด สามารถเพิ่มรูปหรือบันทึกได้.",
          "ดูการเดินทางที่จัดระเบียบแล้ว.",
        ],
      },
      {
        id: "photo",
        title: "จัดด้วยรูปเท่านั้น",
        summary: "ถ้าการติดตามดูยุ่งยาก รูปอย่างเดียวก็ได้.",
        steps: [
          "เลือกรูปที่อยากจัด.",
          "ระบบอ่านเวลาและตำแหน่งจากรูป.",
          "รูปจะถูกรวมเป็นช่วงเวลาโดยอัตโนมัติ.",
          "ปรับเฉพาะส่วนที่จำเป็น.",
          "ดูการเดินทางที่จัดระเบียบแล้ว.",
        ],
      },
    ],
    outcomeTitle: "จุดที่สองเส้นทางมาบรรจบ",
    outcomeLead: "เริ่มทางไหน ผลลัพธ์ก็ไปทางเดียวกัน.",
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
        title: "ปรับอย่างเบา",
        text: "ปรับกลุ่มและลำดับเท่าที่จำเป็น.",
      },
      {
        title: "เผยแพร่แบบเลือกได้",
        text: "การเผยแพร่จะสร้างหน้าเว็บสำหรับแชร์ ไม่ใช่สิ่งจำเป็น.",
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
        answer: "โฟลว์ติดตามเพิ่มหลังจบ ส่วนโฟลว์รูปเริ่มจากการเลือกรูป.",
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
    heroSubtitle: "Ghi lai bang tracking hoac chi voi anh. Ca hai deu dan toi hanh trinh da duoc sap xep.",
    heroTrackingCta: "Ghi lai bang tracking",
    heroPhotoCta: "Sap xep chi voi anh",
    flowTitle: "Hai diem bat dau, mot dich den",
    flowLead: "Chon cach bat dau hom nay. Dich den la hanh trinh da duoc sap xep.",
    flows: [
      {
        id: "tracking",
        title: "Hanh trinh bang tracking",
        summary: "Cho nhung ngay ban muon gom thoi gian va dia diem khi di chuyen.",
        steps: [
          "Tu man hinh chinh, bat dau tracking.",
          "Khi di chuyen, cac khoanh khac tu nho lai.",
          "Ket thuc hanh trinh khi san sang.",
          "Trong qua trinh sap xep, them anh hoac ghi chu.",
          "Xem hanh trinh da duoc sap xep.",
        ],
      },
      {
        id: "photo",
        title: "Sap xep chi voi anh",
        summary: "Neu tracking la ganh nang, chi voi anh cung du.",
        steps: [
          "Chon anh can sap xep.",
          "Doc thong tin thoi gian va dia diem.",
          "Anh tu dong gom thanh cac khoanh khac.",
          "Dieu chinh khi can.",
          "Xem hanh trinh da duoc sap xep.",
        ],
      },
    ],
    outcomeTitle: "Noi hai luong gap nhau",
    outcomeLead: "Bat dau tu dau thi ket qua cung di ve mot huong.",
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
        title: "Dieu chinh nhe",
        text: "Dieu chinh nhom va thu tu khi can.",
      },
      {
        title: "Cong khai tuy chon",
        text: "Cong khai tao mot trang web de chia se. Khong bat buoc.",
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
        answer: "Trong tracking, them sau khi ket thuc. Trong luong anh, bat dau bang viec chon anh.",
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
    alternates: buildAlternates(lang, "/how-it-works"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/how-it-works"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHowItWorksContent(lang);

  return (
    <main className={styles.page}>
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
            <a className={styles.actionButtonGhost} href="#features">
              {content.outcomeSecondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section id="features" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.featuresTitle}</h2>
          <p className={styles.sectionLead}>{content.featuresLead}</p>
        </header>
        <div className={styles.featuresGrid}>
          {content.features.map((feature, index) => (
            <div key={`feature-${index}`} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.faqTitle}</h2>
        </header>
        <div className={styles.faqList}>
          {content.faqs.map((item, index) => (
            <div key={`faq-${index}`} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{item.question}</h3>
              <p className={styles.faqAnswer}>{item.answer}</p>
              {item.linkLabel && item.linkHref ? (
                <Link className={styles.faqLink} href={`/${lang}${item.linkHref}`}>
                  {item.linkLabel}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
