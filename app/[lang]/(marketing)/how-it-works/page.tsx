import type { Metadata } from "next";
import Image from "next/image";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./how-it-works.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

type HowItWorksStep = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

type HowItWorksFlow = {
  id: string;
  title: string;
  summary: string;
  steps: HowItWorksStep[];
};

type HowItWorksContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  actionJourney: string;
  actionPhoto: string;
  flows: HowItWorksFlow[];
};

const howItWorksContent: Record<Language, HowItWorksContent> = {
  en: {
    metaTitle: "How MomentBook Works",
    metaDescription: "Two simple flows: start a journey or start with photos.",
    title: "How MomentBook works",
    subtitle: "Two simple ways to begin. Choose the one that fits today.",
    actionJourney: "Journey flow",
    actionPhoto: "Photo flow",
    flows: [
      {
        id: "journey",
        title: "Start a journey",
        summary: "Let time and place collect while you move.",
        steps: [
          {
            title: "Start from the home screen",
            text: "Begin a journey when the day starts.",
            image: "/screenshots/start-journey.png",
            alt: "Start journey screen with a single call to action.",
          },
          {
            title: "Let moments collect",
            text: "As you move, time and place gather quietly.",
            image: "/screenshots/current-journey.png",
            alt: "Current journey status with time, photos, places, and map preview.",
          },
          {
            title: "Finish and review",
            text: "End when you are ready and view the timeline.",
            image: "/screenshots/journey-timeline.png",
            alt: "Journey timeline showing a place card, map, and photos.",
          },
        ],
      },
      {
        id: "photo",
        title: "Organize with photos",
        summary: "Begin with the photos you already have.",
        steps: [
          {
            title: "Choose photos",
            text: "Pick the photos you want to keep.",
            image: "/screenshots/photos-picker.png",
            alt: "Photo picker grid with day and time filters.",
          },
          {
            title: "Organize into moments",
            text: "One tap groups photos into small clusters.",
            image: "/screenshots/organize-photos.png",
            alt: "Organizing photos screen with a grid and organize button.",
          },
          {
            title: "Refine the moments",
            text: "Adjust the set when it needs it.",
            image: "/screenshots/user-organizing.png",
            alt: "User organizing screen with photo clusters and timestamps.",
          },
        ],
      },
    ],
  },
  ko: {
    metaTitle: "MomentBook 작동 방식",
    metaDescription: "여정으로 시작하거나 사진으로 시작하는 두 가지 흐름.",
    title: "MomentBook 작동 방식",
    subtitle: "두 가지 간단한 시작. 오늘에 맞는 방식을 고르세요.",
    actionJourney: "여정 흐름",
    actionPhoto: "사진 흐름",
    flows: [
      {
        id: "journey",
        title: "여정으로 시작",
        summary: "움직이는 동안 시간과 장소가 모입니다.",
        steps: [
          {
            title: "홈에서 여정 시작",
            text: "하루를 시작할 때 여정을 엽니다.",
            image: "/screenshots/start-journey.png",
            alt: "여정을 시작하는 버튼이 있는 화면.",
          },
          {
            title: "이동하며 모이기",
            text: "움직이는 동안 시간과 장소가 조용히 모입니다.",
            image: "/screenshots/current-journey.png",
            alt: "시간, 사진, 장소, 지도 미리보기가 있는 현재 여정 화면.",
          },
          {
            title: "마무리하고 보기",
            text: "마친 뒤 타임라인을 확인합니다.",
            image: "/screenshots/journey-timeline.png",
            alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
          },
        ],
      },
      {
        id: "photo",
        title: "사진으로 정리",
        summary: "이미 있는 사진에서 시작합니다.",
        steps: [
          {
            title: "사진 고르기",
            text: "남길 사진을 선택합니다.",
            image: "/screenshots/photos-picker.png",
            alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
          },
          {
            title: "순간으로 정리",
            text: "한 번의 정리로 작은 묶음이 만들어집니다.",
            image: "/screenshots/organize-photos.png",
            alt: "사진 그리드와 정리 버튼이 있는 화면.",
          },
          {
            title: "묶음 다듬기",
            text: "필요한 만큼만 조정합니다.",
            image: "/screenshots/user-organizing.png",
            alt: "사진 묶음과 타임스탬프가 표시된 화면.",
          },
        ],
      },
    ],
  },
  ja: {
    metaTitle: "MomentBook の使い方",
    metaDescription: "旅から始めるか、写真から始めるか。二つのシンプルな流れ。",
    title: "MomentBook の使い方",
    subtitle: "二つのシンプルな始め方。今日に合う方を選びます。",
    actionJourney: "旅の流れ",
    actionPhoto: "写真の流れ",
    flows: [
      {
        id: "journey",
        title: "旅から始める",
        summary: "動きながら時間と場所が集まります。",
        steps: [
          {
            title: "ホームから旅を開始",
            text: "一日の始まりに旅を開きます。",
            image: "/screenshots/start-journey.png",
            alt: "旅を開始するボタンがある画面。",
          },
          {
            title: "動きながら集まる",
            text: "移動の中で時間と場所が静かに集まります。",
            image: "/screenshots/current-journey.png",
            alt: "時間、写真、場所、地図のプレビューがある現在の旅画面。",
          },
          {
            title: "終えて見返す",
            text: "終えたらタイムラインを確認します。",
            image: "/screenshots/journey-timeline.png",
            alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
          },
        ],
      },
      {
        id: "photo",
        title: "写真から整理",
        summary: "すでにある写真から始めます。",
        steps: [
          {
            title: "写真を選ぶ",
            text: "残したい写真を選びます。",
            image: "/screenshots/photos-picker.png",
            alt: "日付と時間のフィルターがある写真選択画面。",
          },
          {
            title: "瞬間として整理",
            text: "一度の整理で小さなまとまりができます。",
            image: "/screenshots/organize-photos.png",
            alt: "写真グリッドと整理ボタンがある画面。",
          },
          {
            title: "まとまりを整える",
            text: "必要な分だけ調整します。",
            image: "/screenshots/user-organizing.png",
            alt: "写真のまとまりとタイムスタンプがある整理画面。",
          },
        ],
      },
    ],
  },
  zh: {
    metaTitle: "MomentBook 如何运作",
    metaDescription: "两种简单流程：从旅程开始，或从照片开始。",
    title: "MomentBook 如何运作",
    subtitle: "两种简单的开始方式。选择今天适合的那一种。",
    actionJourney: "旅程流程",
    actionPhoto: "照片流程",
    flows: [
      {
        id: "journey",
        title: "从旅程开始",
        summary: "在移动中让时间与地点自然累积。",
        steps: [
          {
            title: "从主屏幕开始",
            text: "在一天开始时开启旅程。",
            image: "/screenshots/start-journey.png",
            alt: "带有开始旅程按钮的界面。",
          },
          {
            title: "移动中累积",
            text: "移动时，时间与地点会安静地累积。",
            image: "/screenshots/current-journey.png",
            alt: "包含时间、照片、地点和地图预览的当前旅程界面。",
          },
          {
            title: "完成并查看",
            text: "结束后查看时间线。",
            image: "/screenshots/journey-timeline.png",
            alt: "包含地点卡片、地图和照片的旅程时间线界面。",
          },
        ],
      },
      {
        id: "photo",
        title: "用照片整理",
        summary: "从已有的照片开始。",
        steps: [
          {
            title: "选择照片",
            text: "挑选想保留的照片。",
            image: "/screenshots/photos-picker.png",
            alt: "带有日期和时间筛选的照片选择界面。",
          },
          {
            title: "整理成片段",
            text: "一次整理生成小片段。",
            image: "/screenshots/organize-photos.png",
            alt: "带有照片网格和整理按钮的界面。",
          },
          {
            title: "微调片段",
            text: "按需要进行调整。",
            image: "/screenshots/user-organizing.png",
            alt: "显示照片分组与时间戳的整理界面。",
          },
        ],
      },
    ],
  },
  es: {
    metaTitle: "Como funciona MomentBook",
    metaDescription: "Dos flujos simples: iniciar un viaje o empezar con fotos.",
    title: "Como funciona MomentBook",
    subtitle: "Dos formas simples de empezar. Elige la que encaje hoy.",
    actionJourney: "Flujo del viaje",
    actionPhoto: "Flujo de fotos",
    flows: [
      {
        id: "journey",
        title: "Iniciar un viaje",
        summary: "Deja que el tiempo y el lugar se reunan mientras te mueves.",
        steps: [
          {
            title: "Empieza en la pantalla de inicio",
            text: "Inicia un viaje cuando comienza el dia.",
            image: "/screenshots/start-journey.png",
            alt: "Pantalla con el boton para iniciar un viaje.",
          },
          {
            title: "Deja que los momentos se junten",
            text: "Al moverte, el tiempo y el lugar se juntan en silencio.",
            image: "/screenshots/current-journey.png",
            alt: "Estado de la jornada con hora, fotos, lugares y vista de mapa.",
          },
          {
            title: "Termina y revisa",
            text: "Finaliza cuando quieras y revisa la linea de tiempo.",
            image: "/screenshots/journey-timeline.png",
            alt: "Linea del viaje con tarjeta de lugar, mapa y fotos.",
          },
        ],
      },
      {
        id: "photo",
        title: "Ordenar con fotos",
        summary: "Empieza con las fotos que ya tienes.",
        steps: [
          {
            title: "Elige fotos",
            text: "Selecciona las fotos que quieres guardar.",
            image: "/screenshots/photos-picker.png",
            alt: "Selector de fotos con filtros por dia y hora.",
          },
          {
            title: "Organiza en momentos",
            text: "Un toque agrupa fotos en pequenos momentos.",
            image: "/screenshots/organize-photos.png",
            alt: "Pantalla de organizacion de fotos con cuadricula y boton de organizar.",
          },
          {
            title: "Ajusta los momentos",
            text: "Ajusta el conjunto cuando lo necesite.",
            image: "/screenshots/user-organizing.png",
            alt: "Pantalla de organizacion con grupos de fotos y marcas de tiempo.",
          },
        ],
      },
    ],
  },
  pt: {
    metaTitle: "Como o MomentBook funciona",
    metaDescription: "Dois fluxos simples: iniciar uma jornada ou comecar com fotos.",
    title: "Como o MomentBook funciona",
    subtitle: "Duas formas simples de comecar. Escolha a que faz sentido hoje.",
    actionJourney: "Fluxo da jornada",
    actionPhoto: "Fluxo de fotos",
    flows: [
      {
        id: "journey",
        title: "Iniciar uma jornada",
        summary: "Deixe tempo e lugar se reunirem enquanto voce se move.",
        steps: [
          {
            title: "Comece na tela inicial",
            text: "Inicie uma jornada quando o dia comeca.",
            image: "/screenshots/start-journey.png",
            alt: "Tela com o botao para iniciar uma jornada.",
          },
          {
            title: "Deixe os momentos se juntarem",
            text: "Ao se mover, tempo e lugar se juntam em silencio.",
            image: "/screenshots/current-journey.png",
            alt: "Status da jornada com tempo, fotos, locais e mapa.",
          },
          {
            title: "Finalize e reveja",
            text: "Finalize quando quiser e veja a linha do tempo.",
            image: "/screenshots/journey-timeline.png",
            alt: "Linha da jornada com cartao de local, mapa e fotos.",
          },
        ],
      },
      {
        id: "photo",
        title: "Organizar com fotos",
        summary: "Comece com as fotos que voce ja tem.",
        steps: [
          {
            title: "Escolha fotos",
            text: "Selecione as fotos que quer guardar.",
            image: "/screenshots/photos-picker.png",
            alt: "Seletor de fotos com filtros por dia e hora.",
          },
          {
            title: "Organize em momentos",
            text: "Um toque agrupa as fotos em pequenos momentos.",
            image: "/screenshots/organize-photos.png",
            alt: "Tela de organizacao de fotos com grade e botao de organizar.",
          },
          {
            title: "Ajuste os momentos",
            text: "Ajuste o conjunto quando precisar.",
            image: "/screenshots/user-organizing.png",
            alt: "Tela de organizacao com grupos de fotos e horarios.",
          },
        ],
      },
    ],
  },
  fr: {
    metaTitle: "Comment fonctionne MomentBook",
    metaDescription: "Deux flux simples : demarrer un voyage ou commencer avec des photos.",
    title: "Comment fonctionne MomentBook",
    subtitle: "Deux facons simples de commencer. Choisissez celle qui convient aujourd'hui.",
    actionJourney: "Flux du voyage",
    actionPhoto: "Flux photo",
    flows: [
      {
        id: "journey",
        title: "Commencer un voyage",
        summary: "Laissez le temps et les lieux se rassembler pendant vos deplacements.",
        steps: [
          {
            title: "Commencez depuis l'ecran d'accueil",
            text: "Demarrez un voyage quand la journee commence.",
            image: "/screenshots/start-journey.png",
            alt: "Ecran avec le bouton pour demarrer un voyage.",
          },
          {
            title: "Laissez les moments se rassembler",
            text: "En vous deplacant, le temps et les lieux se reunissent doucement.",
            image: "/screenshots/current-journey.png",
            alt: "Etat du voyage avec temps, photos, lieux et carte.",
          },
          {
            title: "Terminez et revoyez",
            text: "Terminez quand vous voulez et consultez la timeline.",
            image: "/screenshots/journey-timeline.png",
            alt: "Timeline du voyage avec carte de lieu, carte et photos.",
          },
        ],
      },
      {
        id: "photo",
        title: "Organiser avec des photos",
        summary: "Commencez avec les photos que vous avez deja.",
        steps: [
          {
            title: "Choisir des photos",
            text: "Selectionnez les photos que vous voulez garder.",
            image: "/screenshots/photos-picker.png",
            alt: "Selection de photos avec filtres par jour et heure.",
          },
          {
            title: "Organiser en moments",
            text: "Un geste regroupe les photos en petits moments.",
            image: "/screenshots/organize-photos.png",
            alt: "Ecran d'organisation des photos avec grille et bouton organiser.",
          },
          {
            title: "Ajuster les moments",
            text: "Ajustez le tout quand c'est necessaire.",
            image: "/screenshots/user-organizing.png",
            alt: "Ecran d'organisation avec groupes de photos et horodatages.",
          },
        ],
      },
    ],
  },
  th: {
    metaTitle: "วิธีการทำงานของ MomentBook",
    metaDescription: "สองโฟลว์เรียบง่าย: เริ่มการเดินทางหรือเริ่มด้วยรูป.",
    title: "วิธีการทำงานของ MomentBook",
    subtitle: "สองวิธีเริ่มต้นแบบเรียบง่าย เลือกแบบที่เหมาะกับวันนี้.",
    actionJourney: "โฟลว์การเดินทาง",
    actionPhoto: "โฟลว์รูป",
    flows: [
      {
        id: "journey",
        title: "เริ่มการเดินทาง",
        summary: "ให้เวลาและสถานที่ค่อยๆ รวมกันระหว่างเคลื่อนไหว.",
        steps: [
          {
            title: "เริ่มจากหน้าจอหลัก",
            text: "เริ่มการเดินทางเมื่อวันเริ่มต้น.",
            image: "/screenshots/start-journey.png",
            alt: "หน้าจอที่มีปุ่มเริ่มการเดินทาง.",
          },
          {
            title: "ปล่อยให้ช่วงเวลารวมตัว",
            text: "ขณะเคลื่อนไหว เวลาและสถานที่จะค่อยๆ รวมกัน.",
            image: "/screenshots/current-journey.png",
            alt: "สถานะการเดินทางพร้อมเวลา รูป สถานที่ และแผนที่.",
          },
          {
            title: "จบและดูย้อนหลัง",
            text: "จบเมื่อพร้อมและดูไทม์ไลน์.",
            image: "/screenshots/journey-timeline.png",
            alt: "ไทม์ไลน์การเดินทางที่มีการ์ดสถานที่ แผนที่ และรูป.",
          },
        ],
      },
      {
        id: "photo",
        title: "จัดด้วยรูป",
        summary: "เริ่มจากรูปที่มีอยู่แล้ว.",
        steps: [
          {
            title: "เลือกรูป",
            text: "เลือกรูปที่อยากเก็บไว้.",
            image: "/screenshots/photos-picker.png",
            alt: "ตัวเลือกภาพพร้อมตัวกรองวันและเวลา.",
          },
          {
            title: "จัดเป็นช่วงเวลา",
            text: "แตะครั้งเดียวเพื่อจัดกลุ่มเป็นช่วงเวลาเล็กๆ.",
            image: "/screenshots/organize-photos.png",
            alt: "หน้าจอจัดรูปด้วยกริดและปุ่มจัด.",
          },
          {
            title: "ปรับช่วงเวลา",
            text: "ปรับกลุ่มเท่าที่จำเป็น.",
            image: "/screenshots/user-organizing.png",
            alt: "หน้าจอจัดกลุ่มรูปพร้อมเวลา.",
          },
        ],
      },
    ],
  },
  vi: {
    metaTitle: "MomentBook hoat dong nhu the nao",
    metaDescription: "Hai luong don gian: bat dau hanh trinh hoac bat dau voi anh.",
    title: "MomentBook hoat dong nhu the nao",
    subtitle: "Hai cach bat dau don gian. Chon cach hop voi hom nay.",
    actionJourney: "Luong hanh trinh",
    actionPhoto: "Luong anh",
    flows: [
      {
        id: "journey",
        title: "Bat dau hanh trinh",
        summary: "De thoi gian va dia diem tu tu duoc gom lai khi ban di chuyen.",
        steps: [
          {
            title: "Bat dau tu man hinh chinh",
            text: "Mo hanh trinh khi ngay bat dau.",
            image: "/screenshots/start-journey.png",
            alt: "Man hinh co nut bat dau hanh trinh.",
          },
          {
            title: "De khoanh khac tu gom lai",
            text: "Khi di chuyen, thoi gian va dia diem duoc gom lai mot cach nhe nhang.",
            image: "/screenshots/current-journey.png",
            alt: "Trang thai hanh trinh voi thoi gian, anh, dia diem va ban do.",
          },
          {
            title: "Ket thuc va xem lai",
            text: "Ket thuc khi san sang va xem dong thoi gian.",
            image: "/screenshots/journey-timeline.png",
            alt: "Dong thoi gian hanh trinh co the dia diem, ban do va anh.",
          },
        ],
      },
      {
        id: "photo",
        title: "Sap xep bang anh",
        summary: "Bat dau tu nhung buc anh ban da co.",
        steps: [
          {
            title: "Chon anh",
            text: "Chon anh ban muon giu.",
            image: "/screenshots/photos-picker.png",
            alt: "Bo chon anh voi bo loc ngay va gio.",
          },
          {
            title: "Sap xep thanh khoanh khac",
            text: "Mot cham gom anh thanh cac khoanh khac nho.",
            image: "/screenshots/organize-photos.png",
            alt: "Man hinh sap xep anh voi luoi va nut sap xep.",
          },
          {
            title: "Dieu chinh khoanh khac",
            text: "Dieu chinh bo anh khi can.",
            image: "/screenshots/user-organizing.png",
            alt: "Man hinh sap xep voi nhom anh va moc thoi gian.",
          },
        ],
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
      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <div className={styles.actions}>
          <a className={styles.actionButton} href="#journey">
            {content.actionJourney}
          </a>
          <a className={styles.actionButton} href="#photo">
            {content.actionPhoto}
          </a>
        </div>
      </header>

      {content.flows.map((flow) => (
        <section key={flow.id} id={flow.id} className={styles.flow}>
          <header className={styles.flowHeader}>
            <h2 className={styles.flowTitle}>{flow.title}</h2>
            <p className={styles.flowSummary}>{flow.summary}</p>
          </header>
          <div className={styles.flowSteps}>
            {flow.steps.map((step, index) => (
              <div key={`${flow.id}-${index}`} className={styles.stepCard}>
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
                    sizes="(max-width: 768px) 240px, (max-width: 1200px) 260px, 280px"
                    className={deviceStyles.screenImage}
                  />
                </DeviceMock>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
