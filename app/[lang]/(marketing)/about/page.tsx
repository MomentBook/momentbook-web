import type { Metadata } from "next";
import styles from "./about.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

type AboutSection = {
  heading: string;
  paragraphs: string[];
};

type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  lead: string;
  missionTitle: string;
  missionParagraphs: string[];
  principlesTitle: string;
  principles: string[];
  sections: AboutSection[];
  privacyTitle: string;
  privacyParagraphs: string[];
  closingTitle: string;
  closingParagraph: string;
};

const aboutContent: Partial<Record<Language, AboutContent>> & { en: AboutContent } = {
  en: {
    metaTitle: "About MomentBook",
    metaDescription: "A quiet archive that starts with photos.",
    title: "About MomentBook",
    subtitle: "A quiet way to keep photos as journeys.",
    lead:
      "MomentBook starts with photos and gathers time and place into a calm journey without becoming a feed.",
    missionTitle: "Why it exists",
    missionParagraphs: [
      "Photos scatter across cameras, maps, and messages, and the context fades.",
      "MomentBook keeps the flow of a day in one place so you can return without performing.",
    ],
    principlesTitle: "Principles",
    principles: [
      "Photo-first start",
      "Private by default",
      "Quiet sharing by link",
      "AI as a helper, not an author",
    ],
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "People who want to organize travel or daily photos without a public feed.",
          "Anyone who prefers short notes and photos over long journaling.",
        ],
      },
      {
        heading: "Who it is not for",
        paragraphs: [
          "If you want social discovery, rankings, or habit tracking, this may not fit.",
        ],
      },
    ],
    privacyTitle: "Publishing and visibility",
    privacyParagraphs: [
      "Journeys are private by default.",
      "Publishing creates a public web page with a unique URL you can share, and it may be indexed by search engines.",
    ],
    closingTitle: "Quiet by design",
    closingParagraph: "If you want a calm, photo-first archive for your journeys, MomentBook was built for that.",
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "사진으로 시작하는 조용한 기록 아카이브입니다.",
    title: "MomentBook 소개",
    subtitle: "사진에서 여정으로 이어지는 조용한 방법.",
    lead:
      "MomentBook은 사진부터 시작해 시간과 장소를 한 흐름으로 남깁니다. 피드가 되지 않습니다.",
    missionTitle: "왜 필요한가요",
    missionParagraphs: [
      "사진과 기록이 흩어지면 맥락이 흐려집니다.",
      "MomentBook은 하루의 흐름을 한곳에 모아 조용히 돌아볼 수 있게 합니다.",
    ],
    principlesTitle: "원칙",
    principles: [
      "사진 중심 시작",
      "기본은 비공개",
      "링크로 조용한 공유",
      "AI는 조력자",
    ],
    sections: [
      {
        heading: "누구에게 맞나요",
        paragraphs: [
          "공개 피드 없이 여행이나 일상 사진을 정리하고 싶은 분.",
          "긴 글보다 짧은 메모와 사진이 편한 분.",
        ],
      },
      {
        heading: "맞지 않을 수 있는 경우",
        paragraphs: [
          "소셜 확산이나 랭킹, 습관 관리가 중심이라면 맞지 않을 수 있습니다.",
        ],
      },
    ],
    privacyTitle: "게시와 공개 범위",
    privacyParagraphs: [
      "기본은 비공개입니다.",
      "게시하면 고유 URL 페이지가 만들어지며, 링크 공유와 검색 엔진 수집이 가능할 수 있습니다.",
    ],
    closingTitle: "조용한 의도",
    closingParagraph: "사진으로 시작하는 조용한 기록이 필요하다면 MomentBook이 맞습니다.",
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "写真から始まる静かな記録アーカイブです。",
    title: "MomentBook について",
    subtitle: "写真から旅へつながる静かな方法。",
    lead:
      "MomentBook は写真から始め、時間と場所を一つの流れとして残します。フィードにはしません。",
    missionTitle: "なぜ必要か",
    missionParagraphs: [
      "写真や記録が散らばると文脈が失われます。",
      "MomentBook は一日の流れを一つにまとめ、静かに振り返れるようにします。",
    ],
    principlesTitle: "原則",
    principles: [
      "写真から始める",
      "デフォルトは非公開",
      "リンクで静かな共有",
      "AIは補助者",
    ],
    sections: [
      {
        heading: "合う人",
        paragraphs: [
          "公開フィードなしで旅や日常の写真を整理したい人。",
          "長文よりも短いメモと写真が合う人。",
        ],
      },
      {
        heading: "合わないかもしれない人",
        paragraphs: [
          "ソーシャル拡散、ランキング、習慣管理を求める場合。",
        ],
      },
    ],
    privacyTitle: "公開と可視性",
    privacyParagraphs: [
      "基本は非公開です。",
      "投稿すると固有URLのWebページが作成され、共有や検索エンジンに表示される可能性があります。",
    ],
    closingTitle: "静かな意図",
    closingParagraph: "写真から静かに残したいなら MomentBook が合います。",
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "从照片开始的安静记录档案。",
    title: "关于 MomentBook",
    subtitle: "从照片到旅程的安静方法。",
    lead:
      "MomentBook 从照片开始，把时间与地点整理成一段安静的旅程，而不是信息流。",
    missionTitle: "为什么需要它",
    missionParagraphs: [
      "照片与记录分散时，脉络就容易丢失。",
      "MomentBook 把一天的脉络保留下来，方便安静回看。",
    ],
    principlesTitle: "原则",
    principles: [
      "照片优先开始",
      "默认私密",
      "通过链接安静分享",
      "AI 只是助手",
    ],
    sections: [
      {
        heading: "适合谁",
        paragraphs: [
          "想在没有公开信息流的情况下整理旅程或日常照片的人。",
          "更喜欢短句和照片的人。",
        ],
      },
      {
        heading: "可能不适合谁",
        paragraphs: [
          "如果你需要社交扩散、排名或习惯管理，可能不适合。",
        ],
      },
    ],
    privacyTitle: "发布与可见性",
    privacyParagraphs: [
      "默认是私密的。",
      "发布后会生成一个公开网页链接，可被分享，也可能被搜索引擎收录。",
    ],
    closingTitle: "安静的意图",
    closingParagraph: "如果你想从照片开始安静地保存旅程，MomentBook 就是为此而做。",
  },
};

function getAboutContent(lang: Language): AboutContent {
  if (lang === "es") {
    return {
      ...aboutContent.en,
      metaTitle: "Acerca de MomentBook",
      metaDescription: "Un archivo tranquilo que empieza con fotos.",
      title: "Acerca de MomentBook",
      subtitle: "Una forma tranquila de guardar fotos como viajes.",
      lead: "MomentBook empieza con fotos y reune tiempo y lugar en un viaje tranquilo, sin convertirse en feed.",
      missionTitle: "Por que existe",
      missionParagraphs: [
        "Las fotos se dispersan entre camara, mapas y mensajes, y el contexto se pierde.",
        "MomentBook guarda el flujo de un dia en un solo lugar para volver sin rendir para otros.",
      ],
      principlesTitle: "Principios",
      principles: [
        "Inicio con fotos",
        "Privado por defecto",
        "Compartir en calma por enlace",
        "IA como ayuda, no como autora",
      ],
      sections: [
        {
          heading: "Para quien es",
          paragraphs: [
            "Para quienes quieren organizar fotos de viajes o dias sin un feed publico.",
            "Para quien prefiere fotos y notas cortas a escribir largo.",
          ],
        },
        {
          heading: "Para quien no es",
          paragraphs: [
            "Si buscas descubrimiento social, rankings o seguimiento de habitos, puede no encajar.",
          ],
        },
      ],
      privacyTitle: "Publicacion y visibilidad",
      privacyParagraphs: [
        "Los viajes son privados por defecto.",
        "Publicar crea una pagina web publica con URL unica y puede indexarse en buscadores.",
      ],
      closingTitle: "Calma por diseno",
      closingParagraph: "Si buscas un archivo tranquilo y centrado en fotos para tus viajes, MomentBook fue hecho para eso.",
    };
  }

  if (lang === "pt") {
    return {
      ...aboutContent.en,
      metaTitle: "Sobre o MomentBook",
      metaDescription: "Um arquivo tranquilo que comeca com fotos.",
      title: "Sobre o MomentBook",
      subtitle: "Uma forma tranquila de guardar fotos como jornadas.",
      lead: "MomentBook comeca com fotos e reune tempo e lugar em uma jornada calma, sem virar feed.",
      missionTitle: "Por que existe",
      missionParagraphs: [
        "Fotos se espalham entre camera, mapas e mensagens, e o contexto desaparece.",
        "MomentBook guarda o fluxo de um dia em um so lugar para voce voltar sem performar.",
      ],
      principlesTitle: "Principios",
      principles: [
        "Inicio com fotos",
        "Privado por padrao",
        "Compartilhamento discreto por link",
        "IA como apoio, nao como autora",
      ],
      sections: [
        {
          heading: "Para quem e",
          paragraphs: [
            "Para quem quer organizar fotos de viagens ou dias sem feed publico.",
            "Para quem prefere notas curtas e fotos em vez de textos longos.",
          ],
        },
        {
          heading: "Para quem nao e",
          paragraphs: [
            "Se voce busca descoberta social, ranking ou rastreio de habitos, talvez nao seja o ideal.",
          ],
        },
      ],
      privacyTitle: "Publicacao e visibilidade",
      privacyParagraphs: [
        "As jornadas sao privadas por padrao.",
        "Publicar cria uma pagina publica com URL unica, que pode ser indexada por buscadores.",
      ],
      closingTitle: "Calmo por design",
      closingParagraph: "Se voce quer um arquivo calmo e centrado em fotos para suas jornadas, o MomentBook foi feito para isso.",
    };
  }

  if (lang === "fr") {
    return {
      ...aboutContent.en,
      metaTitle: "A propos de MomentBook",
      metaDescription: "Une archive calme qui commence par les photos.",
      title: "A propos de MomentBook",
      subtitle: "Une facon calme de garder les photos comme des voyages.",
      lead: "MomentBook commence par les photos et rassemble temps et lieux dans un voyage calme, sans devenir un feed.",
      missionTitle: "Pourquoi il existe",
      missionParagraphs: [
        "Les photos se dispersent entre appareil photo, cartes et messages, et le contexte s'efface.",
        "MomentBook garde le fil d'une journee en un seul endroit pour y revenir sans se mettre en scene.",
      ],
      principlesTitle: "Principes",
      principles: [
        "Debut par les photos",
        "Prive par defaut",
        "Partage discret par lien",
        "IA comme aide, pas comme autrice",
      ],
      sections: [
        {
          heading: "Pour qui c'est fait",
          paragraphs: [
            "Pour celles et ceux qui veulent organiser des photos de voyages ou de jours sans feed public.",
            "Pour celles et ceux qui preferent photos et notes courtes aux longs textes.",
          ],
        },
        {
          heading: "Pour qui ce n'est pas fait",
          paragraphs: [
            "Si vous cherchez decouverte sociale, classement ou suivi d'habitudes, ce n'est peut-etre pas adapte.",
          ],
        },
      ],
      privacyTitle: "Publication et visibilite",
      privacyParagraphs: [
        "Les voyages sont prives par defaut.",
        "Publier cree une page web publique avec URL unique, potentiellement indexee.",
      ],
      closingTitle: "Calme par conception",
      closingParagraph: "Si vous cherchez une archive calme, centree sur les photos, pour vos voyages, MomentBook est fait pour cela.",
    };
  }

  if (lang === "th") {
    return {
      ...aboutContent.en,
      metaTitle: "เกี่ยวกับ MomentBook",
      metaDescription: "คลังบันทึกแบบสงบที่เริ่มจากรูปภาพ",
      title: "เกี่ยวกับ MomentBook",
      subtitle: "วิธีเก็บรูปให้เป็นทริปอย่างสงบ",
      lead: "MomentBook เริ่มจากรูป แล้วรวมเวลาและสถานที่เป็นทริป โดยไม่ทําให้เป็นฟีด",
      missionTitle: "ทําไมแอปนี้จึงมีอยู่",
      missionParagraphs: [
        "รูปและช่วงเวลามักกระจัดกระจายอยู่ตามกล้อง แผนที่ และข้อความ จนบริบทหายไป",
        "MomentBook เก็บลําดับของวันไว้ในที่เดียว เพื่อให้คุณกลับมาดูได้โดยไม่ต้องแสดงตัว",
      ],
      principlesTitle: "หลักการ",
      principles: [
        "เริ่มจากรูปเป็นหลัก",
        "เป็นส่วนตัวโดยค่าเริ่มต้น",
        "แชร์อย่างเงียบด้วยลิงก์",
        "AI เป็นผู้ช่วย ไม่ใช่ผู้เขียนแทน",
      ],
      sections: [
        {
          heading: "เหมาะกับใคร",
          paragraphs: [
            "คนที่อยากจัดรูปทริปหรือวันธรรมดาโดยไม่ต้องมีฟีดสาธารณะ",
            "คนที่ชอบโน้ตสั้นๆ และรูปมากกว่าการเขียนยาว",
          ],
        },
        {
          heading: "อาจไม่เหมาะกับใคร",
          paragraphs: [
            "หากต้องการการค้นพบแบบโซเชียล การจัดอันดับ หรือการติดตามนิสัย แอปนี้อาจไม่ตอบโจทย์",
          ],
        },
      ],
      privacyTitle: "การเผยแพร่และการมองเห็น",
      privacyParagraphs: [
        "ทริปเป็นส่วนตัวโดยค่าเริ่มต้น",
        "เมื่อเผยแพร่จะสร้างหน้าเว็บสาธารณะพร้อม URL เฉพาะ และอาจถูกจัดทำดัชนีโดยเสิร์ชเอนจิน",
      ],
      closingTitle: "สงบโดยตั้งใจ",
      closingParagraph: "ถ้าคุณต้องการคลังบันทึกที่สงบและเริ่มจากรูป MomentBook ถูกสร้างมาเพื่อสิ่งนั้น",
    };
  }

  if (lang === "vi") {
    return {
      ...aboutContent.en,
      metaTitle: "Ve MomentBook",
      metaDescription: "Kho luu tru nhe nhang bat dau tu anh.",
      title: "Ve MomentBook",
      subtitle: "Mot cach nhe nhang de giu anh thanh hanh trinh.",
      lead: "MomentBook bat dau tu anh va gom thoi gian, dia diem thanh hanh trinh nhe nhang, khong tro thanh feed.",
      missionTitle: "Vi sao no ton tai",
      missionParagraphs: [
        "Anh va khoanh khac thuong tan man giua may anh, ban do va tin nhan, roi mat di boi canh.",
        "MomentBook giu nhiep chay cua mot ngay trong cung mot noi de ban quay lai ma khong can the hien.",
      ],
      principlesTitle: "Nguyen tac",
      principles: [
        "Bat dau tu anh",
        "Rieng tu mac dinh",
        "Chia se nhe nhang bang lien ket",
        "AI la tro ly, khong phai tac gia",
      ],
      sections: [
        {
          heading: "Danh cho ai",
          paragraphs: [
            "Nguoi muon sap xep anh chuyen di hoac nhung ngay thuong ma khong can feed cong khai.",
            "Nguoi thich ghi chu ngan va anh hon viet dai.",
          ],
        },
        {
          heading: "Khong danh cho ai",
          paragraphs: [
            "Neu ban can kham pha xa hoi, bang xep hang hoac theo doi thoi quen, co the no khong phu hop.",
          ],
        },
      ],
      privacyTitle: "Dang bai va kha nang hien thi",
      privacyParagraphs: [
        "Hanh trinh la rieng tu theo mac dinh.",
        "Dang bai tao trang web cong khai voi URL rieng va co the duoc cong cu tim kiem lap chi muc.",
      ],
      closingTitle: "Tinh lang theo chu dich",
      closingParagraph: "Neu ban can kho luu tru nhe nhang bat dau tu anh cho hanh trinh, MomentBook duoc tao ra cho dieu do.",
    };
  }

  return aboutContent[lang] ?? aboutContent.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getAboutContent(lang);
  const path = "/about";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getAboutContent(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/about"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "Organization",
      name: "MomentBook",
      url: siteUrl,
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <p className={styles.lead}>{content.lead}</p>
        </div>
      </header>

      <section className={styles.mission}>
        <div className={styles.missionCopy}>
          <h2 className={styles.sectionTitle}>{content.missionTitle}</h2>
          {content.missionParagraphs.map((paragraph, index) => (
            <p key={`${content.missionTitle}-${index}`} className={styles.sectionText}>
              {paragraph}
            </p>
          ))}
        </div>
        <aside className={styles.principles}>
          <h3 className={styles.sectionTitle}>{content.principlesTitle}</h3>
          <ul className={styles.principleList}>
            {content.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.sectionGrid}>
        {content.sections.map((section, index) => (
          <div key={`${section.heading}-${index}`} className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>{section.heading}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${section.heading}-${paragraphIndex}`} className={styles.sectionText}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.privacySection}>
        <h2 className={styles.sectionTitle}>{content.privacyTitle}</h2>
        {content.privacyParagraphs.map((paragraph, index) => (
          <p key={`${content.privacyTitle}-${index}`} className={styles.sectionText}>
            {paragraph}
          </p>
        ))}
      </section>

      <section className={styles.closingSection}>
        <h2 className={styles.sectionTitle}>{content.closingTitle}</h2>
        <p className={styles.sectionText}>{content.closingParagraph}</p>
      </section>
    </div>
  );
}
