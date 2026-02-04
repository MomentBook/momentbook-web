import type { Metadata } from "next";
import Link from "next/link";
import faqStyles from "./faq.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  calloutPrefix: string;
  calloutLink: string;
  calloutSuffix: string;
  items: FAQItem[];
};

function getFaqContent(lang: Language): FAQContent {
  if (lang === "es") {
    return {
      metaTitle: "Preguntas sobre MomentBook",
      metaDescription: "Respuestas tranquilas para entender MomentBook.",
      pageTitle: "Preguntas sobre MomentBook",
      pageSubtitle: "Respuestas breves y calmadas sobre como funciona.",
      calloutPrefix: "Tienes otra pregunta? ",
      calloutLink: "Contactanos",
      calloutSuffix: "",
      items: [
        { question: "Que es MomentBook?", answer: "Un archivo tranquilo que guarda momentos como viajes." },
        { question: "Es una red social?", answer: "No. No hay feed, likes ni rankings. Compartir es opcional." },
        { question: "Que es un viaje?", answer: "Un tramo de tiempo guardado como una sola historia." },
        { question: "Que se guarda?", answer: "Fotos, notas cortas, hora de captura y lugares/rutas si permites ubicacion." },
        { question: "Es privado por defecto?", answer: "Si. Los viajes siguen privados hasta que los publiques." },
        { question: "Que significa Publish?", answer: "Publicar crea una pagina web publica con URL unica para ese viaje." },
        { question: "Se puede ver sin la app?", answer: "Si. Cualquiera con el enlace puede verlo en la web, y puede indexarse." },
        { question: "Rastrea mi ubicacion?", answer: "Solo si lo permites. Se usa para ubicar momentos dentro del viaje." },
        { question: "Que hace la IA?", answer: "Ayuda con titulos, resumenes y nombres de lugares. No crea por ti." },
      ],
    };
  }

  if (lang === "pt") {
    return {
      metaTitle: "Perguntas sobre o MomentBook",
      metaDescription: "Respostas calmas sobre o MomentBook.",
      pageTitle: "Perguntas sobre o MomentBook",
      pageSubtitle: "Respostas curtas e tranquilas sobre como funciona.",
      calloutPrefix: "Ainda com duvidas? ",
      calloutLink: "Fale conosco",
      calloutSuffix: "",
      items: [
        { question: "O que e o MomentBook?", answer: "Um arquivo tranquilo que guarda momentos como jornadas." },
        { question: "E uma rede social?", answer: "Nao. Nao ha feed, curtidas ou ranking. Compartilhar e opcional." },
        { question: "O que e uma jornada?", answer: "Um periodo unico de tempo guardado como uma historia." },
        { question: "O que e salvo?", answer: "Fotos, notas curtas, horario da captura e lugares/rotas quando a localizacao e permitida." },
        { question: "E privado por padrao?", answer: "Sim. As jornadas ficam privadas ate voce publicar." },
        { question: "O que significa Publish?", answer: "Publicar cria uma pagina web publica com URL unica para a jornada." },
        { question: "Da para ver sem o app?", answer: "Sim. Qualquer pessoa com o link pode ver na web, e pode ser indexado." },
        { question: "Ele rastreia minha localizacao?", answer: "Somente se voce permitir. A localizacao organiza os momentos da jornada." },
        { question: "O que a IA faz?", answer: "Ajuda com titulos, resumos e nomes de lugares. Nao cria no seu lugar." },
      ],
    };
  }

  if (lang === "fr") {
    return {
      metaTitle: "Questions sur MomentBook",
      metaDescription: "Des reponses calmes pour comprendre MomentBook.",
      pageTitle: "Questions sur MomentBook",
      pageSubtitle: "Des reponses courtes et calmes sur son fonctionnement.",
      calloutPrefix: "Une autre question ? ",
      calloutLink: "Nous contacter",
      calloutSuffix: "",
      items: [
        { question: "Qu'est-ce que MomentBook ?", answer: "Une archive calme qui conserve les moments sous forme de voyages." },
        { question: "Est-ce un reseau social ?", answer: "Non. Pas de fil, de likes ni de classement. Le partage est optionnel." },
        { question: "Qu'est-ce qu'un voyage ?", answer: "Une periode de temps conservee comme une seule histoire." },
        { question: "Que sauvegarde l'app ?", answer: "Photos, notes courtes, heure de prise et lieux/itineraires si la localisation est autorisee." },
        { question: "Est-ce prive par defaut ?", answer: "Oui. Les voyages restent prives tant que vous ne publiez pas." },
        { question: "Que signifie Publish ?", answer: "Publier cree une page web publique avec une URL unique pour ce voyage." },
        { question: "Peut-on voir sans l'app ?", answer: "Oui. Toute personne ayant le lien peut voir la page web, qui peut etre indexee." },
        { question: "L'app suit-elle ma position ?", answer: "Seulement si vous l'autorisez. Elle sert a organiser les moments du voyage." },
        { question: "Que fait l'IA ?", answer: "Elle aide pour les titres, resumes et noms de lieux. Elle ne cree pas a votre place." },
      ],
    };
  }

  if (lang === "th") {
    return {
      metaTitle: "คําถามเกี่ยวกับ MomentBook",
      metaDescription: "คําตอบแบบเรียบง่ายเพื่อเข้าใจ MomentBook",
      pageTitle: "คําถามเกี่ยวกับ MomentBook",
      pageSubtitle: "คําตอบสั้นๆ อย่างสงบว่าแอปทํางานอย่างไร",
      calloutPrefix: "ยังมีคําถามอยู่ไหม? ",
      calloutLink: "ติดต่อเรา",
      calloutSuffix: "",
      items: [
        { question: "MomentBook คืออะไร?", answer: "คลังบันทึกแบบเงียบๆ ที่เก็บช่วงเวลาเป็นทริป" },
        { question: "เป็นโซเชียลเน็ตเวิร์กไหม?", answer: "ไม่ใช่ ไม่มีฟีด ไลก์ หรืออันดับ การแชร์เป็นทางเลือก" },
        { question: "ทริปคืออะไร?", answer: "ช่วงเวลาหนึ่งที่ถูกรวบรวมเป็นเรื่องเดียว" },
        { question: "บันทึกอะไรบ้าง?", answer: "รูป เมโมสั้น เวลา และสถานที่/เส้นทางเมื่อคุณอนุญาตตำแหน่ง" },
        { question: "เป็นส่วนตัวโดยค่าเริ่มต้นไหม?", answer: "ใช่ ทริปจะเป็นส่วนตัวจนกว่าคุณจะเผยแพร่" },
        { question: "Publish คืออะไร?", answer: "การเผยแพร่จะสร้างหน้าเว็บสาธารณะที่มี URL เฉพาะของทริปนั้น" },
        { question: "ดูได้โดยไม่ต้องมีแอปไหม?", answer: "ได้ คนที่มีลิงก์ดูผ่านเว็บได้ และอาจถูกจัดทำดัชนีโดยเสิร์ชเอนจิน" },
        { question: "ติดตามตำแหน่งตลอดไหม?", answer: "เฉพาะเมื่อคุณอนุญาต ใช้เพื่อจัดช่วงเวลาให้อยู่ในทริป" },
        { question: "AI ทําอะไร?", answer: "ช่วยเรื่องชื่อเรื่อง สรุป และชื่อสถานที่ ไม่ได้สร้างแทนคุณ" },
      ],
    };
  }

  if (lang === "vi") {
    return {
      metaTitle: "Cau hoi ve MomentBook",
      metaDescription: "Cau tra loi nhe nhang de hieu MomentBook.",
      pageTitle: "Cau hoi ve MomentBook",
      pageSubtitle: "Cau tra loi ngan gon va binh tinh ve cach ung dung hoat dong.",
      calloutPrefix: "Ban van con thac mac? ",
      calloutLink: "Lien he",
      calloutSuffix: "",
      items: [
        { question: "MomentBook la gi?", answer: "Mot kho luu tru nhe nhang giu lai khoanh khac theo hanh trinh." },
        { question: "Day co phai mang xa hoi?", answer: "Khong. Khong co feed, like hay xep hang. Chia se la tuy chon." },
        { question: "Hanh trinh la gi?", answer: "Mot khoang thoi gian duoc giu lai thanh mot cau chuyen." },
        { question: "Ung dung luu gi?", answer: "Anh, ghi chu ngan, thoi gian chup va dia diem/tuyen duong neu ban cho phep vi tri." },
        { question: "Mac dinh co rieng tu khong?", answer: "Co. Hanh trinh van rieng tu tru khi ban dang." },
        { question: "Publish co nghia la gi?", answer: "Dang se tao mot trang web cong khai co URL rieng cho hanh trinh do." },
        { question: "Nguoi khac co xem duoc neu khong co app?", answer: "Co. Bat ky ai co lien ket deu xem duoc tren web, va co the duoc lap chi muc." },
        { question: "Ung dung co theo doi vi tri lien tuc?", answer: "Chi khi ban cho phep. Vi tri duoc dung de xep khoanh khac vao hanh trinh." },
        { question: "AI lam gi?", answer: "AI ho tro tieu de, tom tat va ten dia diem. AI khong tao thay ban." },
      ],
    };
  }

  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 질문과 답",
      metaDescription: "MomentBook을 조용히 이해할 수 있는 질문과 답입니다.",
      pageTitle: "MomentBook 질문과 답",
      pageSubtitle: "짧고 차분한 답변을 모았습니다.",
      calloutPrefix: "더 필요한 내용이 있나요? ",
      calloutLink: "문의하기",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook이 무엇인가요?",
          answer: "순간을 여정으로 묶어 두는 기록 아카이브입니다.",
        },
        {
          question: "SNS인가요?",
          answer: "아니요. 피드, 좋아요, 랭킹이 없고 공유는 선택입니다.",
        },
        {
          question: "여정이란 무엇인가요?",
          answer: "시작과 끝이 있는 시간을 하나로 묶는 기록 단위입니다.",
        },
        {
          question: "무엇이 저장되나요?",
          answer: "사진, 짧은 메모, 기록 시각, 위치를 허용한 경우 장소와 경로입니다.",
        },
        {
          question: "기본은 비공개인가요?",
          answer: "네. 기본은 비공개이며, 게시할 때만 공개됩니다.",
        },
        {
          question: "게시(Publish)는 무엇인가요?",
          answer: "해당 여정만의 고유 URL 페이지를 만들어 공유하는 기능입니다.",
        },
        {
          question: "앱 없이도 볼 수 있나요?",
          answer: "네. 링크를 받은 사람은 웹에서 볼 수 있고, 검색 엔진에 수집될 수 있습니다.",
        },
        {
          question: "항상 위치를 추적하나요?",
          answer: "아니요. 위치는 허용한 경우에만 사용됩니다.",
        },
        {
          question: "AI는 무엇을 하나요?",
          answer: "제목 제안, 요약, 장소명 정리처럼 정리를 돕는 역할에 한정됩니다.",
        },
      ],
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook 質問と回答",
      metaDescription: "MomentBook を静かに理解するための質問と回答です。",
      pageTitle: "MomentBook 質問と回答",
      pageSubtitle: "短く穏やかな回答をまとめました。",
      calloutPrefix: "まだ気になる点があれば、",
      calloutLink: "お問い合わせ",
      calloutSuffix: "ください。",
      items: [
        {
          question: "MomentBook とは何ですか？",
          answer: "瞬間を旅としてまとめて残す記録アーカイブです。",
        },
        {
          question: "SNS ですか？",
          answer: "いいえ。フィードやいいね、ランキングはなく、共有は任意です。",
        },
        {
          question: "旅とは何ですか？",
          answer: "始まりと終わりのある時間をひとつにまとめる単位です。",
        },
        {
          question: "何が保存されますか？",
          answer: "写真、短いメモ、記録時刻、許可した場合の場所とルートです。",
        },
        {
          question: "デフォルトは非公開ですか？",
          answer: "はい。基本は非公開で、投稿したときだけ公開されます。",
        },
        {
          question: "Publish(投稿)とは？",
          answer: "その旅だけの固有URLページを作成して共有することです。",
        },
        {
          question: "アプリがなくても見られますか？",
          answer: "はい。リンクを受け取った人はWebで閲覧でき、検索エンジンに表示される可能性もあります。",
        },
        {
          question: "常に位置情報を追跡しますか？",
          answer: "いいえ。位置情報は許可した場合のみ使用します。",
        },
        {
          question: "AI は何をしますか？",
          answer: "タイトル提案や要約、場所名の整理など、整理の補助に限ります。",
        },
      ],
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "MomentBook 问题与回答",
      metaDescription: "帮助你安静了解 MomentBook 的问题与回答。",
      pageTitle: "MomentBook 问题与回答",
      pageSubtitle: "简短而平和的回答汇总。",
      calloutPrefix: "还有其他疑问？",
      calloutLink: "联系我们",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook 是什么？",
          answer: "把瞬间整理成旅程并安静保存的记录应用。",
        },
        {
          question: "是社交网络吗？",
          answer: "不是。没有信息流、点赞或排名，分享是可选的。",
        },
        {
          question: "什么是旅程？",
          answer: "把有开始和结束的时间整理成一个整体的记录单位。",
        },
        {
          question: "会保存哪些内容？",
          answer: "照片、短句、记录时间，以及在允许位置时的地点与路线。",
        },
        {
          question: "默认是私密的吗？",
          answer: "是的。默认私密，仅在发布时公开。",
        },
        {
          question: "发布(Publish)是什么？",
          answer: "为该旅程生成一个唯一 URL 的网页并进行分享。",
        },
        {
          question: "没有 App 也能看吗？",
          answer: "可以。收到链接的人可在网页查看，并可能被搜索引擎收录。",
        },
        {
          question: "会一直追踪位置吗？",
          answer: "不会。只有在你允许时才会使用位置。",
        },
        {
          question: "AI 会做什么？",
          answer: "只负责整理辅助，例如标题建议、摘要、地点名称整理。",
        },
      ],
    };
  }

  return {
    metaTitle: "MomentBook Questions",
    metaDescription: "Quiet answers about MomentBook.",
    pageTitle: "MomentBook questions",
    pageSubtitle: "Short, calm answers about how it works.",
    calloutPrefix: "Still wondering about something? ",
    calloutLink: "Get in touch",
    calloutSuffix: "",
    items: [
      {
        question: "What is MomentBook?",
        answer: "A quiet archive that keeps moments as journeys.",
      },
      {
        question: "Is it a social network?",
        answer: "No. There is no feed, likes, or rankings. Sharing is optional.",
      },
      {
        question: "What is a journey?",
        answer: "A journey is a single stretch of time kept together as one story.",
      },
      {
        question: "What gets saved?",
        answer: "Photos, short notes, time of capture, and places/routes when location is allowed.",
      },
      {
        question: "Is it private by default?",
        answer: "Yes. Journeys stay private unless you publish them.",
      },
      {
        question: "What does Publish mean?",
        answer: "Publishing creates a public web page with a unique URL for that journey.",
      },
      {
        question: "Can people view without the app?",
        answer: "Yes. Anyone with the link can view it on the web, and it may be indexed.",
      },
      {
        question: "Does it track my location?",
        answer: "Only if you allow it. Location is used to place moments into a journey.",
      },
      {
        question: "What does AI do?",
        answer: "It helps with titles, summaries, and place names. It does not create for you.",
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const path = "/faq";
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

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/faq"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className={faqStyles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={faqStyles.header}>
        <h1 className={faqStyles.title}>{content.pageTitle}</h1>
        <p className={faqStyles.subtitle}>{content.pageSubtitle}</p>
      </header>

      <div className={faqStyles.faqGrid}>
        {content.items.map((faq, index) => (
          <section key={`${faq.question}-${index}`} className={faqStyles.faqItem}>
            <h2 className={faqStyles.faqQuestion}>{faq.question}</h2>
            <p className={faqStyles.faqAnswer}>{faq.answer}</p>
          </section>
        ))}
      </div>

      <aside className={faqStyles.callout}>
        <p>
          {content.calloutPrefix}
          <Link href={`/${lang}/support`} className={faqStyles.link}>
            {content.calloutLink}
          </Link>
          {content.calloutSuffix}
        </p>
      </aside>
    </div>
  );
}
