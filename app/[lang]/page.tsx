import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
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
  heroDeviceImage: string;
  heroDeviceAlt: string;
  heroCaption: string;
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
    metaTitle: "MomentBook — Two simple ways to begin",
    metaDescription: "Track a journey or organize with photos only. Both become a calm record you can return to.",
    eyebrow: "MomentBook",
    title: "A quiet way to record journeys and return",
    lead: "Track as you move or organize with photos only. Either way, your journey stays ready to return to.",
    primaryCta: "Record with tracking",
    secondaryCta: "Organize with photos",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Home screen showing the start journey prompt.",
    heroCaption: "The home screen. Choose a start.",
    tldrTitle: "Quick answer",
    tldrQuestion: "What is MomentBook?",
    tldrAnswer: "MomentBook is a quiet journey archive that can start with tracking or photos. It's not a social network—no feeds, likes, or rankings.",
    tldrPoints: [
      "Two ways to begin: tracking or photos",
      "Private by default, optional publishing",
      "Organized moments, not a feed",
      "Export a ZIP timeline to keep, share, or back up in your drive",
    ],
    pathsTitle: "Choose your start",
    pathsLead: "Both paths keep things simple.",
    paths: [
      {
        title: "Tracking-based journey",
        summary: "For days when you want time and place to collect as you move.",
        steps: [
          "From the home screen, start tracking.",
          "As you move, moments collect quietly.",
          "Finish when ready and add photos if you want.",
        ],
        ctaLabel: "See tracking flow",
        ctaAnchor: "#tracking",
      },
      {
        title: "Organize with photos",
        summary: "For days when you already have photos and want them in order.",
        steps: [
          "From the home screen, choose photos to organize.",
          "MomentBook groups them into small moments.",
          "Adjust the set and view the timeline.",
        ],
        ctaLabel: "See photo flow",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "A quiet record, on your terms",
    finalLead: "MomentBook is available on iOS and Android.",
    finalCta: "Go to download",
    finalFaqCta: "Common questions",
  },
  ko: {
    metaTitle: "MomentBook — 두 가지 간단한 시작",
    metaDescription: "현재와 과거의 여정을 시간과 공간으로 묶어 정리하고, 다시 회상할 수 있게 돕습니다.",
    eyebrow: "MomentBook",
    title: "현재와 과거의 여정을 시간과 공간으로 정리",
    lead: "트래킹 또는 사진으로 시작해 여정을 시간과 공간 기준으로 묶고, 기억을 더 쉽게 돌아보게 합니다.",
    primaryCta: "트래킹으로 기록하기",
    secondaryCta: "사진만으로 정리하기",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "여정을 시작하는 홈 화면",
    heroCaption: "홈 화면에서 시작을 고릅니다.",
    tldrTitle: "핵심 요약",
    tldrQuestion: "MomentBook은 무엇인가요?",
    tldrAnswer: "MomentBook은 현재와 과거의 여정을 시간과 공간으로 정리해 기억과 회상을 돕는 앱입니다. 피드 중심이 아니라 여정 중심으로 기록을 남깁니다.",
    tldrPoints: [
      "두 가지 시작 방식: 트래킹 또는 사진 정리",
      "기본은 비공개, 원할 때만 선택적으로 게시",
      "순간을 시간·장소 기준으로 묶어 여정으로 정리",
      "정리한 여정을 파일로 저장하고 외부 SNS 공유·드라이브 보관 가능",
    ],
    pathsTitle: "시작 방법",
    pathsLead: "둘 중 어떤 선택도 간단합니다.",
    paths: [
      {
        title: "트래킹 기반 여정",
        summary: "이동 중의 시간과 장소를 모으고 싶을 때.",
        steps: [
          "홈에서 트래킹을 시작합니다.",
          "움직이는 동안 순간이 조용히 모입니다.",
          "마무리하고 필요하면 사진을 더합니다.",
        ],
        ctaLabel: "트래킹 흐름 보기",
        ctaAnchor: "#tracking",
      },
      {
        title: "사진으로 정리",
        summary: "이미 있는 사진을 정리하고 싶을 때.",
        steps: [
          "홈에서 사진으로 정리하기를 선택합니다.",
          "MomentBook이 사진을 작은 순간으로 묶습니다.",
          "묶음을 다듬고 타임라인을 확인합니다.",
        ],
        ctaLabel: "사진 흐름 보기",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "내 방식대로 남기는 기록",
    finalLead: "iOS와 Android에서 사용할 수 있습니다.",
    finalCta: "다운로드로 이동",
    finalFaqCta: "자주 묻는 질문",
  },
  ja: {
    metaTitle: "MomentBook — 二つのシンプルな始め方",
    metaDescription: "トラッキングで記録するか、写真だけで整理するか。どちらも静かな記録につながります。",
    eyebrow: "MomentBook",
    title: "旅を記録して、いつでも戻れるように",
    lead: "トラッキングでも写真だけでも。どの始め方でも、静かに戻れる旅として残ります。",
    primaryCta: "トラッキングで記録する",
    secondaryCta: "写真だけで整理する",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "旅を開始するホーム画面",
    heroCaption: "ホーム画面で始め方を選びます。",
    tldrTitle: "クイック回答",
    tldrQuestion: "MomentBookとは何ですか？",
    tldrAnswer: "MomentBookはトラッキングまたは写真で始められる静かな旅の記録です。ソーシャルネットワークではなく、フィード、いいね、ランキングはありません。",
    tldrPoints: [
      "二つの始め方：トラッキングまたは写真",
      "デフォルトで非公開、公開は任意",
      "フィードではなく整理された瞬間",
      "公開せずにZIPを書き出して保存・共有・ドライブ保管ができます",
    ],
    pathsTitle: "始め方を選ぶ",
    pathsLead: "どちらもシンプルです。",
    paths: [
      {
        title: "トラッキング起点の旅",
        summary: "移動の中で時間と場所を集めたい日。",
        steps: [
          "ホームからトラッキングを開始します。",
          "動くほどに瞬間が静かに集まります。",
          "終えたら見返し、必要なら写真を追加します。",
        ],
        ctaLabel: "トラッキングの流れを見る",
        ctaAnchor: "#tracking",
      },
      {
        title: "写真から整理",
        summary: "すでにある写真を整えたい日。",
        steps: [
          "ホームから写真で整理を選びます。",
          "MomentBook が写真を小さな瞬間にまとめます。",
          "まとまりを整えてタイムラインを見ます。",
        ],
        ctaLabel: "写真の流れを見る",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "静かな記録を自分のペースで",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalFaqCta: "よくある質問",
  },
  zh: {
    metaTitle: "MomentBook — 两种简单的开始方式",
    metaDescription: "可以用追踪记录，也可以只用照片整理。两种方式都通向安静的记录。",
    eyebrow: "MomentBook",
    title: "记录旅程，并可随时回看",
    lead: "可用追踪记录，也可只用照片整理。无论从哪开始，都能安静地回看旅程。",
    primaryCta: "用追踪记录",
    secondaryCta: "只用照片整理",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "显示开始旅程的主屏幕",
    heroCaption: "在主屏幕选择开始方式。",
    tldrTitle: "快速回答",
    tldrQuestion: "什么是 MomentBook？",
    tldrAnswer: "MomentBook 是一个可以从追踪或照片开始的安静旅程记录。它不是社交网络，没有动态、点赞或排名。",
    tldrPoints: [
      "两种开始方式：追踪或照片",
      "默认私密，可选发布",
      "组织的瞬间，而非动态",
      "可导出 ZIP 用于保存、外部分享或网盘备份",
    ],
    pathsTitle: "选择开始方式",
    pathsLead: "两种方式都很简单。",
    paths: [
      {
        title: "追踪式旅程",
        summary: "想在移动中收集时间与地点的日子。",
        steps: [
          "在主屏幕开始追踪。",
          "移动中，瞬间会安静地累积。",
          "完成后回顾，需要时可添加照片。",
        ],
        ctaLabel: "查看追踪流程",
        ctaAnchor: "#tracking",
      },
      {
        title: "用照片整理",
        summary: "已经有照片，只想整理的时候。",
        steps: [
          "在主屏幕选择用照片整理。",
          "MomentBook 将照片分成小片段。",
          "调整分组并查看时间线。",
        ],
        ctaLabel: "查看照片流程",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "按自己的节奏留下记录",
    finalLead: "可在 iOS 和 Android 使用。",
    finalCta: "前往下载",
    finalFaqCta: "常见问题",
  },
  es: {
    metaTitle: "MomentBook — Dos formas simples de empezar",
    metaDescription: "Registra con tracking o empieza solo con fotos. Ambas llevan a un registro tranquilo.",
    eyebrow: "MomentBook",
    title: "Registra viajes y vuelve cuando quieras",
    lead: "Puedes registrar con tracking o empezar solo con fotos. En ambos casos, el viaje queda listo para volver.",
    primaryCta: "Registrar con tracking",
    secondaryCta: "Ordenar solo con fotos",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Pantalla de inicio con la opcion de iniciar un viaje.",
    heroCaption: "La pantalla de inicio. Elige como empezar.",
    tldrTitle: "Respuesta rápida",
    tldrQuestion: "¿Qué es MomentBook?",
    tldrAnswer: "MomentBook es un archivo tranquilo de viajes que puede empezar con tracking o fotos. No es una red social: no hay feeds, likes ni rankings.",
    tldrPoints: [
      "Dos formas de empezar: tracking o fotos",
      "Privado por defecto, publicación opcional",
      "Momentos organizados, no un feed",
      "Exporta un ZIP del timeline para guardar, compartir o respaldar en tu nube",
    ],
    pathsTitle: "Elige el inicio",
    pathsLead: "Ambas opciones son simples.",
    paths: [
      {
        title: "Viaje con tracking",
        summary: "Para dias en los que quieres reunir tiempo y lugar al moverte.",
        steps: [
          "Desde la pantalla de inicio, inicia el tracking.",
          "Mientras te mueves, los momentos se juntan en silencio.",
          "Termina cuando quieras y agrega fotos si lo necesitas.",
        ],
        ctaLabel: "Ver flujo de tracking",
        ctaAnchor: "#tracking",
      },
      {
        title: "Ordenar con fotos",
        summary: "Para dias en los que ya tienes fotos y quieres ordenarlas.",
        steps: [
          "Desde la pantalla de inicio, elige ordenar con fotos.",
          "MomentBook agrupa las fotos en pequenos momentos.",
          "Ajusta el conjunto y mira la linea de tiempo.",
        ],
        ctaLabel: "Ver flujo de fotos",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "Un registro tranquilo, a tu ritmo",
    finalLead: "MomentBook esta disponible en iOS y Android.",
    finalCta: "Ir a descarga",
    finalFaqCta: "Preguntas frecuentes",
  },
  pt: {
    metaTitle: "MomentBook — Duas formas simples de comecar",
    metaDescription: "Registre com tracking ou comece apenas com fotos. Ambas levam a um registro calmo.",
    eyebrow: "MomentBook",
    title: "Registre jornadas e volte quando quiser",
    lead: "Voce pode registrar com tracking ou comecar apenas com fotos. Em ambos os casos, a jornada fica pronta para voltar.",
    primaryCta: "Registrar com tracking",
    secondaryCta: "Organizar so com fotos",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Tela inicial com a opcao de iniciar jornada.",
    heroCaption: "A tela inicial. Escolha como comecar.",
    tldrTitle: "Resposta rápida",
    tldrQuestion: "O que é MomentBook?",
    tldrAnswer: "MomentBook é um arquivo calmo de jornadas que pode começar com tracking ou fotos. Não é uma rede social—sem feeds, likes ou rankings.",
    tldrPoints: [
      "Duas formas de começar: tracking ou fotos",
      "Privado por padrão, publicação opcional",
      "Momentos organizados, não um feed",
      "Exporte um ZIP da timeline para guardar, compartilhar ou salvar no seu drive",
    ],
    pathsTitle: "Escolha o inicio",
    pathsLead: "Ambas as opcoes sao simples.",
    paths: [
      {
        title: "Jornada com tracking",
        summary: "Para dias em que voce quer reunir tempo e lugar enquanto se move.",
        steps: [
          "Na tela inicial, inicie o tracking.",
          "Enquanto voce se move, os momentos se juntam em silencio.",
          "Finalize quando quiser e adicione fotos se precisar.",
        ],
        ctaLabel: "Ver fluxo de tracking",
        ctaAnchor: "#tracking",
      },
      {
        title: "Organizar com fotos",
        summary: "Para dias em que voce ja tem fotos e quer organizar.",
        steps: [
          "Na tela inicial, escolha organizar com fotos.",
          "MomentBook agrupa as fotos em pequenos momentos.",
          "Ajuste o conjunto e veja a linha do tempo.",
        ],
        ctaLabel: "Ver fluxo das fotos",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "Um registro calmo, no seu ritmo",
    finalLead: "MomentBook esta disponivel no iOS e Android.",
    finalCta: "Ir para download",
    finalFaqCta: "Perguntas frequentes",
  },
  fr: {
    metaTitle: "MomentBook — Deux facons simples de commencer",
    metaDescription: "Enregistrez avec tracking ou commencez avec des photos seulement. Les deux menent a un journal calme.",
    eyebrow: "MomentBook",
    title: "Enregistrez des voyages et revenez quand vous voulez",
    lead: "Vous pouvez enregistrer avec tracking ou commencer avec des photos. Dans les deux cas, le voyage reste pret a retrouver.",
    primaryCta: "Enregistrer avec tracking",
    secondaryCta: "Organiser avec photos",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Ecran d'accueil avec demarrage de voyage.",
    heroCaption: "Ecran d'accueil. Choisissez comment commencer.",
    tldrTitle: "Réponse rapide",
    tldrQuestion: "Qu'est-ce que MomentBook ?",
    tldrAnswer: "MomentBook est un journal calme de voyages qui peut commencer avec tracking ou photos. Ce n'est pas un réseau social—pas de feeds, likes ou classements.",
    tldrPoints: [
      "Deux façons de commencer : tracking ou photos",
      "Privé par défaut, publication optionnelle",
      "Moments organisés, pas un feed",
      "Exportez un ZIP de la timeline pour conserver, partager ou sauvegarder sur votre drive",
    ],
    pathsTitle: "Choisir le depart",
    pathsLead: "Les deux options sont simples.",
    paths: [
      {
        title: "Voyage avec tracking",
        summary: "Pour les jours ou vous voulez reunir temps et lieux en bougeant.",
        steps: [
          "Depuis l'ecran d'accueil, lancez le tracking.",
          "En vous deplacant, les moments se rassemblent doucement.",
          "Terminez quand vous voulez et ajoutez des photos si besoin.",
        ],
        ctaLabel: "Voir le flux de tracking",
        ctaAnchor: "#tracking",
      },
      {
        title: "Organiser avec des photos",
        summary: "Pour les jours ou vous avez deja des photos a ordonner.",
        steps: [
          "Depuis l'ecran d'accueil, choisissez organiser avec des photos.",
          "MomentBook regroupe les photos en petits moments.",
          "Ajustez l'ensemble et consultez la timeline.",
        ],
        ctaLabel: "Voir le flux photo",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "Un journal calme, a votre rythme",
    finalLead: "MomentBook est disponible sur iOS et Android.",
    finalCta: "Aller au telechargement",
    finalFaqCta: "Questions fréquentes",
  },
  th: {
    metaTitle: "MomentBook — สองวิธีเริ่มต้นแบบเรียบง่าย",
    metaDescription: "บันทึกด้วยการติดตามหรือเริ่มด้วยรูปเท่านั้น ทั้งสองแบบนำไปสู่บันทึกที่สงบ.",
    eyebrow: "MomentBook",
    title: "บันทึกทริปและกลับมาดูได้เสมอ",
    lead: "คุณจะบันทึกด้วยการติดตามหรือเริ่มด้วยรูปเท่านั้นก็ได้ ไม่ว่าจะเริ่มแบบไหน ก็กลับมาดูทริปได้อย่างสงบ.",
    primaryCta: "บันทึกด้วยการติดตาม",
    secondaryCta: "จัดด้วยรูปเท่านั้น",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "หน้าจอหลักที่เริ่มการเดินทาง",
    heroCaption: "หน้าจอหลัก เลือกวิธีเริ่มต้น.",
    tldrTitle: "คำตอบสั้น",
    tldrQuestion: "MomentBook คืออะไร?",
    tldrAnswer: "MomentBook เป็นบันทึกทริปที่สงบซึ่งเริ่มได้ด้วยการติดตามหรือรูป ไม่ใช่โซเชียลเน็ตเวิร์ก ไม่มีฟีด ไลค์ หรือการจัดอันดับ.",
    tldrPoints: [
      "สองวิธีเริ่มต้น: การติดตามหรือรูป",
      "ส่วนตัวเป็นค่าเริ่มต้น การเผยแพร่เป็นตัวเลือก",
      "ช่วงเวลาที่จัดระเบียบ ไม่ใช่ฟีด",
      "ส่งออก ZIP เพื่อเก็บ แชร์ภายนอก หรือสํารองไว้ในไดรฟ์ของคุณ",
    ],
    pathsTitle: "เลือกวิธีเริ่มต้น",
    pathsLead: "ทั้งสองแบบเรียบง่าย.",
    paths: [
      {
        title: "การเดินทางแบบติดตาม",
        summary: "สำหรับวันที่อยากให้เวลาและสถานที่ค่อยๆ รวมกันระหว่างเดินทาง.",
        steps: [
          "เริ่มติดตามจากหน้าจอหลัก.",
          "ระหว่างเคลื่อนไหว ช่วงเวลาจะค่อยๆ ถูกรวบรวมอย่างเงียบๆ.",
          "จบเมื่อพร้อม และเพิ่มรูปได้ถ้าต้องการ.",
        ],
        ctaLabel: "ดูโฟลว์ติดตาม",
        ctaAnchor: "#tracking",
      },
      {
        title: "จัดด้วยรูป",
        summary: "สำหรับวันที่มีรูปอยู่แล้วและอยากจัดระเบียบ.",
        steps: [
          "จากหน้าจอหลัก เลือกจัดด้วยรูป.",
          "MomentBook จัดรูปเป็นช่วงเวลาย่อยๆ.",
          "ปรับกลุ่มและดูไทม์ไลน์.",
        ],
        ctaLabel: "ดูโฟลว์รูป",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "บันทึกอย่างสงบ ในแบบของคุณ",
    finalLead: "MomentBook ใช้งานได้บน iOS และ Android.",
    finalCta: "ไปที่ดาวน์โหลด",
    finalFaqCta: "คำถามที่พบบ่อย",
  },
  vi: {
    metaTitle: "MomentBook — Hai cach bat dau don gian",
    metaDescription: "Ghi lai bang tracking hoac bat dau chi bang anh. Ca hai deu dan den ghi chep yen binh.",
    eyebrow: "MomentBook",
    title: "Ghi lai hanh trinh va quay lai bat cu luc nao",
    lead: "Ban co the ghi lai bang tracking hoac bat dau chi voi anh. Cach nao cung de quay lai hanh trinh mot cach yen tinh.",
    primaryCta: "Ghi lai bang tracking",
    secondaryCta: "Sap xep chi voi anh",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Man hinh chinh voi nut bat dau hanh trinh",
    heroCaption: "Man hinh chinh. Chon cach bat dau.",
    tldrTitle: "Cau tra loi nhanh",
    tldrQuestion: "MomentBook la gi?",
    tldrAnswer: "MomentBook la kho luu tru hanh trinh yen tinh co the bat dau bang tracking hoac anh. No khong phai mang xa hoi—khong co nguon tin, thich hoac xep hang.",
    tldrPoints: [
      "Hai cach bat dau: tracking hoac anh",
      "Rieng tu mac dinh, xuat ban tuy chon",
      "Khoanh khac duoc sap xep, khong phai nguon tin",
      "Xuat ZIP timeline de luu, chia se ben ngoai hoac sao luu tren drive",
    ],
    pathsTitle: "Chon cach bat dau",
    pathsLead: "Ca hai deu don gian.",
    paths: [
      {
        title: "Hanh trinh bang tracking",
        summary: "Cho nhung ngay ban muon gom thoi gian va dia diem khi di chuyen.",
        steps: [
          "Tu man hinh chinh, bat dau tracking.",
          "Khi di chuyen, khoanh khac tu tu duoc gom lai.",
          "Ket thuc khi san sang va them anh neu can.",
        ],
        ctaLabel: "Xem luong tracking",
        ctaAnchor: "#tracking",
      },
      {
        title: "Sap xep bang anh",
        summary: "Cho nhung ngay ban da co anh va muon sap xep.",
        steps: [
          "Tu man hinh chinh, chon sap xep bang anh.",
          "MomentBook gom anh thanh cac khoanh khac nho.",
          "Dieu chinh bo va xem dong thoi gian.",
        ],
        ctaLabel: "Xem luong anh",
        ctaAnchor: "#photo",
      },
    ],
    finalTitle: "Ghi chep yen binh, theo cach cua ban",
    finalLead: "MomentBook co san tren iOS va Android.",
    finalCta: "Di den tai ve",
    finalFaqCta: "Cau hoi thuong gap",
  },
};

const timelineExportNoteByLang: Record<Language, string> = {
  en: "After organizing a journey into a timeline, you can export a ZIP (images + metadata) to keep for yourself or share directly with others, even without publishing.",
  ko: "여정을 타임라인으로 정리한 뒤 이미지+메타데이터 ZIP으로 내보내, 게시 없이도 파일 저장, 외부 SNS 공유, 개인 드라이브 보관에 활용할 수 있습니다.",
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
                <Link href={`/${lang}/about#tracking`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/about#photo`} className={styles.secondaryButton}>
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
                  src={content.heroDeviceImage}
                  alt={content.heroDeviceAlt}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
                  className={deviceStyles.screenImage}
                  priority
                />
              </DeviceMock>
              <p className={styles.heroCaption}>{content.heroCaption}</p>
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
