import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
  pathsTitle: string;
  pathsLead: string;
  paths: HomePath[];
  finalTitle: string;
  finalLead: string;
  finalCta: string;
};

const homeContent: Record<Language, HomeContent> = {
  en: {
    metaTitle: "MomentBook — Two simple ways to begin",
    metaDescription: "Start a journey or start with photos only. Both become a calm record you can return to.",
    eyebrow: "MomentBook",
    title: "Two simple ways to begin",
    lead: "Start a journey to let time and place gather, or start with photos only. Both become a calm record you can return to.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Home screen showing the start journey prompt.",
    heroCaption: "The home screen. Choose a start.",
    pathsTitle: "Choose your start",
    pathsLead: "Both paths keep things simple.",
    paths: [
      {
        title: "Start a journey",
        summary: "For days when you want time and place to collect as you move.",
        steps: [
          "From the home screen, start a journey.",
          "As you move, moments collect quietly.",
          "Finish when ready and add photos if you want.",
        ],
        ctaLabel: "See journey flow",
        ctaAnchor: "#journey",
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
  },
  ko: {
    metaTitle: "MomentBook — 두 가지 간단한 시작",
    metaDescription: "여정으로 시작하거나 사진으로 시작합니다. 둘 다 조용한 기록으로 이어집니다.",
    eyebrow: "MomentBook",
    title: "두 가지 간단한 시작",
    lead: "여정을 시작해 시간과 장소를 모으거나, 사진만으로 정리하세요. 두 방식 모두 조용한 기록으로 이어집니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식 보기",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "여정을 시작하는 홈 화면",
    heroCaption: "홈 화면에서 시작을 고릅니다.",
    pathsTitle: "시작 방법",
    pathsLead: "둘 중 어떤 선택도 간단합니다.",
    paths: [
      {
        title: "여정으로 시작",
        summary: "이동 중의 시간과 장소를 모으고 싶을 때.",
        steps: [
          "홈에서 여정을 시작합니다.",
          "움직이는 동안 순간이 조용히 모입니다.",
          "마무리하고 필요하면 사진을 더합니다.",
        ],
        ctaLabel: "여정 흐름 보기",
        ctaAnchor: "#journey",
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
  },
  ja: {
    metaTitle: "MomentBook — 二つのシンプルな始め方",
    metaDescription: "旅を始めるか、写真だけで整理するか。どちらも静かな記録につながります。",
    eyebrow: "MomentBook",
    title: "二つのシンプルな始め方",
    lead: "旅を始めて時間と場所を集めることも、写真だけで整理することもできます。どちらも静かな記録になります。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "旅を開始するホーム画面",
    heroCaption: "ホーム画面で始め方を選びます。",
    pathsTitle: "始め方を選ぶ",
    pathsLead: "どちらもシンプルです。",
    paths: [
      {
        title: "旅から始める",
        summary: "移動の中で時間と場所を集めたい日。",
        steps: [
          "ホームから旅を開始します。",
          "動くほどに瞬間が静かに集まります。",
          "終えたら見返し、必要なら写真を追加します。",
        ],
        ctaLabel: "旅の流れを見る",
        ctaAnchor: "#journey",
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
  },
  zh: {
    metaTitle: "MomentBook — 两种简单的开始方式",
    metaDescription: "可以先开始旅程，也可以只用照片整理。两种方式都通向安静的记录。",
    eyebrow: "MomentBook",
    title: "两种简单的开始方式",
    lead: "可以开始旅程来收集时间与地点，也可以只用照片整理。两种方式都通向安静的记录。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "查看使用方式",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "显示开始旅程的主屏幕",
    heroCaption: "在主屏幕选择开始方式。",
    pathsTitle: "选择开始方式",
    pathsLead: "两种方式都很简单。",
    paths: [
      {
        title: "从旅程开始",
        summary: "想在移动中收集时间与地点的日子。",
        steps: [
          "在主屏幕开始旅程。",
          "移动中，瞬间会安静地累积。",
          "完成后回顾，需要时可添加照片。",
        ],
        ctaLabel: "查看旅程流程",
        ctaAnchor: "#journey",
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
  },
  es: {
    metaTitle: "MomentBook — Dos formas simples de empezar",
    metaDescription: "Inicia un viaje o empieza solo con fotos. Ambas llevan a un registro tranquilo.",
    eyebrow: "MomentBook",
    title: "Dos formas simples de empezar",
    lead: "Puedes iniciar un viaje para reunir tiempo y lugar, o empezar solo con fotos. Ambas llevan a un registro tranquilo.",
    primaryCta: "Descargar MomentBook",
    secondaryCta: "Ver como funciona",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Pantalla de inicio con la opcion de iniciar un viaje.",
    heroCaption: "La pantalla de inicio. Elige como empezar.",
    pathsTitle: "Elige el inicio",
    pathsLead: "Ambas opciones son simples.",
    paths: [
      {
        title: "Iniciar un viaje",
        summary: "Para dias en los que quieres reunir tiempo y lugar al moverte.",
        steps: [
          "Desde la pantalla de inicio, inicia un viaje.",
          "Mientras te mueves, los momentos se juntan en silencio.",
          "Termina cuando quieras y agrega fotos si lo necesitas.",
        ],
        ctaLabel: "Ver flujo del viaje",
        ctaAnchor: "#journey",
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
  },
  pt: {
    metaTitle: "MomentBook — Duas formas simples de comecar",
    metaDescription: "Inicie uma jornada ou comece apenas com fotos. Ambas levam a um registro calmo.",
    eyebrow: "MomentBook",
    title: "Duas formas simples de comecar",
    lead: "Voce pode iniciar uma jornada para reunir tempo e lugar, ou comecar apenas com fotos. Ambas levam a um registro calmo.",
    primaryCta: "Baixar MomentBook",
    secondaryCta: "Ver como funciona",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Tela inicial com a opcao de iniciar jornada.",
    heroCaption: "A tela inicial. Escolha como comecar.",
    pathsTitle: "Escolha o inicio",
    pathsLead: "Ambas as opcoes sao simples.",
    paths: [
      {
        title: "Iniciar uma jornada",
        summary: "Para dias em que voce quer reunir tempo e lugar enquanto se move.",
        steps: [
          "Na tela inicial, inicie uma jornada.",
          "Enquanto voce se move, os momentos se juntam em silencio.",
          "Finalize quando quiser e adicione fotos se precisar.",
        ],
        ctaLabel: "Ver fluxo da jornada",
        ctaAnchor: "#journey",
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
  },
  fr: {
    metaTitle: "MomentBook — Deux facons simples de commencer",
    metaDescription: "Commencez un voyage ou commencez avec des photos seulement. Les deux menent a un journal calme.",
    eyebrow: "MomentBook",
    title: "Deux facons simples de commencer",
    lead: "Vous pouvez demarrer un voyage pour reunir temps et lieux, ou commencer seulement avec des photos. Les deux menent a un journal calme.",
    primaryCta: "Telecharger MomentBook",
    secondaryCta: "Voir le fonctionnement",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Ecran d'accueil avec demarrage de voyage.",
    heroCaption: "Ecran d'accueil. Choisissez comment commencer.",
    pathsTitle: "Choisir le depart",
    pathsLead: "Les deux options sont simples.",
    paths: [
      {
        title: "Commencer un voyage",
        summary: "Pour les jours ou vous voulez reunir temps et lieux en bougeant.",
        steps: [
          "Depuis l'ecran d'accueil, demarrez un voyage.",
          "En vous deplacant, les moments se rassemblent doucement.",
          "Terminez quand vous voulez et ajoutez des photos si besoin.",
        ],
        ctaLabel: "Voir le flux du voyage",
        ctaAnchor: "#journey",
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
  },
  th: {
    metaTitle: "MomentBook — สองวิธีเริ่มต้นแบบเรียบง่าย",
    metaDescription: "เริ่มด้วยการเดินทางหรือเริ่มด้วยรูปเท่านั้น ทั้งสองแบบนำไปสู่บันทึกที่สงบ.",
    eyebrow: "MomentBook",
    title: "สองวิธีเริ่มต้นแบบเรียบง่าย",
    lead: "คุณจะเริ่มการเดินทางเพื่อรวบรวมเวลาและสถานที่ หรือเริ่มด้วยรูปเท่านั้นก็ได้ ทั้งสองแบบนำไปสู่บันทึกที่สงบ.",
    primaryCta: "ดาวน์โหลด MomentBook",
    secondaryCta: "ดูวิธีการใช้งาน",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "หน้าจอหลักที่เริ่มการเดินทาง",
    heroCaption: "หน้าจอหลัก เลือกวิธีเริ่มต้น.",
    pathsTitle: "เลือกวิธีเริ่มต้น",
    pathsLead: "ทั้งสองแบบเรียบง่าย.",
    paths: [
      {
        title: "เริ่มการเดินทาง",
        summary: "สำหรับวันที่อยากให้เวลาและสถานที่ค่อยๆ รวมกันระหว่างเดินทาง.",
        steps: [
          "จากหน้าจอหลัก เริ่มการเดินทาง.",
          "ระหว่างเคลื่อนไหว ช่วงเวลาจะค่อยๆ ถูกรวบรวมอย่างเงียบๆ.",
          "จบเมื่อพร้อม และเพิ่มรูปได้ถ้าต้องการ.",
        ],
        ctaLabel: "ดูโฟลว์การเดินทาง",
        ctaAnchor: "#journey",
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
  },
  vi: {
    metaTitle: "MomentBook — Hai cach bat dau don gian",
    metaDescription: "Bat dau hanh trinh hoac bat dau chi bang anh. Ca hai deu dan den ghi chep yen binh.",
    eyebrow: "MomentBook",
    title: "Hai cach bat dau don gian",
    lead: "Ban co the bat dau hanh trinh de gom thoi gian va dia diem, hoac bat dau chi bang anh. Ca hai deu dan den ghi chep yen binh.",
    primaryCta: "Tai MomentBook",
    secondaryCta: "Xem cach hoat dong",
    heroDeviceImage: "/screenshots/start-journey.png",
    heroDeviceAlt: "Man hinh chinh voi nut bat dau hanh trinh",
    heroCaption: "Man hinh chinh. Chon cach bat dau.",
    pathsTitle: "Chon cach bat dau",
    pathsLead: "Ca hai deu don gian.",
    paths: [
      {
        title: "Bat dau hanh trinh",
        summary: "Cho nhung ngay ban muon gom thoi gian va dia diem khi di chuyen.",
        steps: [
          "Tu man hinh chinh, bat dau hanh trinh.",
          "Khi di chuyen, khoanh khac tu tu duoc gom lai.",
          "Ket thuc khi san sang va them anh neu can.",
        ],
        ctaLabel: "Xem luong hanh trinh",
        ctaAnchor: "#journey",
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
  },
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
                  href={`/${lang}/how-it-works${path.ctaAnchor}`}
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
          <Link href={`/${lang}/download`} className={styles.primaryButton}>
            {content.finalCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
