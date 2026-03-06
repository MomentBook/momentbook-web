import { type Language } from "@/lib/i18n/config";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  title: string;
  description: string;
  items: FAQItem[];
};

export type FAQContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  groups: FAQGroup[];
  calloutPrefix: string;
  calloutLink: string;
  calloutSuffix: string;
};

const faqContent: Record<Language, FAQContent> = {
  en: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Frequently asked questions about MomentBook's travel-photo organization flow.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "This page keeps practical answers short: upload, organize, cleanup, publish scope, and archive handling.",
    groups: [
      {
        title: "Flow basics",
        description: "What MomentBook does from trip end to recap.",
        items: [
          {
            question: "What is MomentBook for?",
            answer: "It turns mixed travel photos into one timeline and map recap.",
          },
          {
            question: "Do I upload photos one by one?",
            answer: "No. The main flow starts with a single batch upload.",
          },
          {
            question: "What happens after upload?",
            answer: "Photos are auto-organized by date and time.",
          },
          {
            question: "Can I fix wrongly organized photos?",
            answer: "Yes. You can remove unrelated photos and adjust grouped sections manually.",
          },
        ],
      },
      {
        title: "Visibility and archive",
        description: "How publish visibility and backup behave.",
        items: [
          {
            question: "Is everything public by default?",
            answer: "No. Journeys are private by default and publishing is optional.",
          },
          {
            question: "Can I keep a copy without publishing?",
            answer: "Yes. You can export a ZIP with images and metadata.",
          },
          {
            question: "What does MomentBook Web provide?",
            answer: "Public journeys, moments, photos, and user profiles are available as read-only pages.",
          },
        ],
      },
    ],
    calloutPrefix: "Need account or technical help? ",
    calloutLink: "Contact support",
    calloutSuffix: ".",
  },
  ko: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "MomentBook 여행 사진 정리 흐름에 대한 자주 묻는 질문입니다.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "업로드, 자동 정리, 보정, 공개 범위, 보관 방식까지 필요한 답변만 짧게 정리했습니다.",
    groups: [
      {
        title: "핵심 흐름",
        description: "여행 종료 후 회상 결과까지의 기본 동작입니다.",
        items: [
          {
            question: "MomentBook은 어떤 앱인가요?",
            answer: "흩어진 여행 사진을 하나의 타임라인과 지도 회상으로 정리하는 앱입니다.",
          },
          {
            question: "사진을 하나씩 올려야 하나요?",
            answer: "아니요. 핵심은 여행 사진을 한 번에 일괄 업로드하는 방식입니다.",
          },
          {
            question: "업로드 후에는 무엇이 일어나나요?",
            answer: "사진이 날짜와 시간 기준으로 자동 정리됩니다.",
          },
          {
            question: "잘못 정리된 사진은 수정할 수 있나요?",
            answer: "네. 불필요한 사진을 제거하고 잘못 묶인 구간을 수동 보정할 수 있습니다.",
          },
        ],
      },
      {
        title: "공개와 보관",
        description: "게시 공개 범위와 백업 관련 동작입니다.",
        items: [
          {
            question: "기본 공개인가요?",
            answer: "아니요. 기본은 비공개이며 게시는 선택입니다.",
          },
          {
            question: "게시하지 않고 보관할 수 있나요?",
            answer: "네. 이미지와 메타데이터를 ZIP으로 내보낼 수 있습니다.",
          },
          {
            question: "웹에서는 무엇을 제공하나요?",
            answer: "공개된 여정, 모먼트, 사진, 프로필을 읽기 전용 페이지로 제공합니다.",
          },
        ],
      },
    ],
    calloutPrefix: "계정 또는 기술 지원이 필요하면 ",
    calloutLink: "지원팀에 문의",
    calloutSuffix: "해 주세요.",
  },
  ja: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "MomentBook の旅行写真整理フローに関するよくある質問です。",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "アップロード、自動整理、補正、公開範囲、保管方法まで、必要な回答だけを短くまとめています。",
    groups: [
      {
        title: "コアフロー",
        description: "旅行終了後から回想結果までの基本動作です。",
        items: [
          {
            question: "MomentBook はどんなアプリですか？",
            answer: "散らばった旅行写真を、ひとつのタイムラインと地図回想に整理するアプリです。",
          },
          {
            question: "写真を1枚ずつアップロードする必要がありますか？",
            answer: "いいえ。旅行写真を一度にまとめてアップロードする方式が中心です。",
          },
          {
            question: "アップロード後には何が起きますか？",
            answer: "写真が日付と時刻の基準で自動整理されます。",
          },
          {
            question: "誤って整理された写真は修正できますか？",
            answer: "はい。不要な写真を削除し、誤ってまとめられた区間を手動で補正できます。",
          },
        ],
      },
      {
        title: "公開と保管",
        description: "公開範囲とバックアップ関連の動作です。",
        items: [
          {
            question: "初期状態で公開されますか？",
            answer: "いいえ。初期状態は非公開で、公開は任意です。",
          },
          {
            question: "公開せずに保管できますか？",
            answer: "はい。画像とメタデータを ZIP で書き出せます。",
          },
          {
            question: "Web では何を提供しますか？",
            answer: "公開された旅、モーメント、写真、プロフィールを読み取り専用ページで提供します。",
          },
        ],
      },
    ],
    calloutPrefix: "アカウントや技術サポートが必要な場合は ",
    calloutLink: "サポートへ問い合わせ",
    calloutSuffix: "してください。",
  },
  zh: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "关于 MomentBook 旅行照片整理流程的常见问题。",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "从上传、自动整理、修正到公开范围与存档方式，仅保留必要且简短的回答。",
    groups: [
      {
        title: "核心流程",
        description: "从旅行结束到回想结果的基础流程。",
        items: [
          {
            question: "MomentBook 是什么应用？",
            answer: "它将分散的旅行照片整理为一条时间线和一次地图回想。",
          },
          {
            question: "照片需要一张一张上传吗？",
            answer: "不需要。核心方式是一次批量上传整趟旅行照片。",
          },
          {
            question: "上传后会发生什么？",
            answer: "照片会按日期和时间自动整理。",
          },
          {
            question: "整理错误的照片可以修正吗？",
            answer: "可以。你可以删除无关照片，并手动修正错误分组区间。",
          },
        ],
      },
      {
        title: "公开与存档",
        description: "与发布可见范围和备份相关的行为。",
        items: [
          {
            question: "默认会公开吗？",
            answer: "不会。默认是私密，发布是可选操作。",
          },
          {
            question: "不发布也能保存副本吗？",
            answer: "可以。你可以导出包含图片与元数据的 ZIP。",
          },
          {
            question: "网页端提供什么？",
            answer: "网页端提供公开行程、时刻、照片与个人资料的只读页面。",
          },
        ],
      },
    ],
    calloutPrefix: "如果你需要账号或技术支持，",
    calloutLink: "请联系支持团队",
    calloutSuffix: "。",
  },
  es: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Preguntas frecuentes sobre el flujo de organización de fotos de viaje en MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "Respuestas breves y necesarias sobre carga, organización automática, ajustes, visibilidad y archivo.",
    groups: [
      {
        title: "Flujo principal",
        description: "Funcionamiento base desde el fin del viaje hasta el repaso.",
        items: [
          {
            question: "¿Qué tipo de app es MomentBook?",
            answer:
              "Es una app que organiza fotos de viaje dispersas en una sola línea de tiempo y un repaso en mapa.",
          },
          {
            question: "¿Debo subir las fotos una por una?",
            answer: "No. El flujo central es subir todas las fotos del viaje en un solo lote.",
          },
          {
            question: "¿Qué pasa después de subirlas?",
            answer: "Las fotos se ordenan automáticamente por fecha y hora.",
          },
          {
            question: "¿Puedo corregir fotos mal organizadas?",
            answer: "Sí. Puedes quitar fotos innecesarias y ajustar manualmente grupos mal formados.",
          },
        ],
      },
      {
        title: "Visibilidad y archivo",
        description: "Comportamiento de publicación y respaldo.",
        items: [
          {
            question: "¿Todo es público por defecto?",
            answer: "No. Por defecto es privado y publicar es opcional.",
          },
          {
            question: "¿Puedo guardar sin publicar?",
            answer: "Sí. Puedes exportar un ZIP con imágenes y metadatos.",
          },
          {
            question: "¿Qué ofrece la web?",
            answer:
              "La web ofrece viajes, momentos, fotos y perfiles publicados en páginas de solo lectura.",
          },
        ],
      },
    ],
    calloutPrefix: "Si necesitas ayuda técnica o de cuenta, ",
    calloutLink: "contacta al equipo de soporte",
    calloutSuffix: ".",
  },
  pt: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Perguntas frequentes sobre o fluxo de organização de fotos de viagem no MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "Respostas curtas e diretas sobre envio, organização automática, ajustes, visibilidade e arquivamento.",
    groups: [
      {
        title: "Fluxo principal",
        description: "Comportamento básico do fim da viagem até a revisão.",
        items: [
          {
            question: "Que tipo de app é o MomentBook?",
            answer:
              "É um app que organiza fotos de viagem dispersas em uma timeline única e uma revisão no mapa.",
          },
          {
            question: "Preciso enviar fotos uma por uma?",
            answer: "Não. O fluxo principal começa com envio em lote de toda a viagem.",
          },
          {
            question: "O que acontece após o envio?",
            answer: "As fotos são organizadas automaticamente por data e hora.",
          },
          {
            question: "Posso corrigir fotos organizadas errado?",
            answer: "Sim. Você pode remover fotos desnecessárias e ajustar manualmente grupos incorretos.",
          },
        ],
      },
      {
        title: "Publicação e arquivo",
        description: "Comportamento de visibilidade e backup.",
        items: [
          {
            question: "Tudo fica público por padrão?",
            answer: "Não. O padrão é privado e publicar é opcional.",
          },
          {
            question: "Posso guardar sem publicar?",
            answer: "Sim. Você pode exportar um ZIP com imagens e metadados.",
          },
          {
            question: "O que o site oferece?",
            answer:
              "O site oferece jornadas, momentos, fotos e perfis publicados em páginas de leitura.",
          },
        ],
      },
    ],
    calloutPrefix: "Se precisar de suporte técnico ou de conta, ",
    calloutLink: "fale com o suporte",
    calloutSuffix: ".",
  },
  fr: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Questions fréquentes sur le flux d'organisation des photos de voyage dans MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "Des réponses courtes et utiles sur l'import, le tri automatique, la correction, la visibilité et l'archivage.",
    groups: [
      {
        title: "Flux principal",
        description: "Fonctionnement de base entre la fin du voyage et le rappel.",
        items: [
          {
            question: "Quel type d'application est MomentBook ?",
            answer:
              "C'est une application qui organise les photos de voyage dispersées en une timeline unique et un rappel sur carte.",
          },
          {
            question: "Dois-je importer les photos une par une ?",
            answer: "Non. Le flux principal est un import en lot de toutes les photos du voyage.",
          },
          {
            question: "Que se passe-t-il après l'import ?",
            answer: "Les photos sont organisées automatiquement selon la date et l'heure.",
          },
          {
            question: "Puis-je corriger des photos mal classées ?",
            answer: "Oui. Vous pouvez supprimer les photos inutiles et corriger manuellement les regroupements erronés.",
          },
        ],
      },
      {
        title: "Publication et archivage",
        description: "Comportement de visibilité et de sauvegarde.",
        items: [
          {
            question: "Tout est-il public par défaut ?",
            answer: "Non. Le mode par défaut est privé et la publication est optionnelle.",
          },
          {
            question: "Puis-je conserver une copie sans publier ?",
            answer: "Oui. Vous pouvez exporter un ZIP contenant images et métadonnées.",
          },
          {
            question: "Que propose le web ?",
            answer:
              "Le web propose les voyages, moments, photos et profils publiés en pages de lecture seule.",
          },
        ],
      },
    ],
    calloutPrefix: "Si vous avez besoin d'aide technique ou de compte, ",
    calloutLink: "contactez le support",
    calloutSuffix: ".",
  },
  th: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "คำถามที่พบบ่อยเกี่ยวกับโฟลว์การจัดรูปทริปของ MomentBook",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "สรุปคำตอบสั้น ๆ ที่จำเป็นเกี่ยวกับการอัปโหลด การจัดอัตโนมัติ การปรับแก้ ขอบเขตการเผยแพร่ และการเก็บรักษา",
    groups: [
      {
        title: "โฟลว์หลัก",
        description: "การทำงานพื้นฐานตั้งแต่จบทริปจนถึงการย้อนความทรงจำ",
        items: [
          {
            question: "MomentBook เป็นแอปแบบไหน?",
            answer: "เป็นแอปที่จัดรูปทริปที่กระจัดกระจายให้เป็นไทม์ไลน์เดียวและการย้อนดูบนแผนที่",
          },
          {
            question: "ต้องอัปโหลดรูปทีละรูปไหม?",
            answer: "ไม่ต้อง จุดหลักคืออัปโหลดรูปทั้งทริปแบบชุดเดียวในครั้งเดียว",
          },
          {
            question: "หลังอัปโหลดแล้วเกิดอะไรขึ้น?",
            answer: "รูปจะถูกจัดเรียงอัตโนมัติตามวันที่และเวลา",
          },
          {
            question: "แก้ไขรูปที่จัดผิดได้ไหม?",
            answer: "ได้ คุณสามารถลบรูปที่ไม่เกี่ยวข้องและปรับช่วงที่จัดกลุ่มผิดด้วยตนเอง",
          },
        ],
      },
      {
        title: "การเผยแพร่และการเก็บรักษา",
        description: "พฤติกรรมเกี่ยวกับการเปิดเผยและการสำรองข้อมูล",
        items: [
          {
            question: "ค่าเริ่มต้นเป็นสาธารณะไหม?",
            answer: "ไม่ใช่ ค่าเริ่มต้นคือส่วนตัว และการเผยแพร่เป็นทางเลือก",
          },
          {
            question: "เก็บไว้โดยไม่เผยแพร่ได้ไหม?",
            answer: "ได้ คุณสามารถส่งออกไฟล์ ZIP ที่มีรูปและเมทาดาทาได้",
          },
          {
            question: "เว็บให้บริการอะไรบ้าง?",
            answer: "เว็บให้หน้าอ่านอย่างเดียวสำหรับทริป โมเมนต์ รูป และโปรไฟล์ที่เผยแพร่แล้ว",
          },
        ],
      },
    ],
    calloutPrefix: "หากต้องการความช่วยเหลือด้านบัญชีหรือเทคนิค ",
    calloutLink: "ติดต่อทีมซัพพอร์ต",
    calloutSuffix: " ได้เลย",
  },
  vi: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Câu hỏi thường gặp về luồng sắp xếp ảnh chuyến đi của MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "Tóm tắt ngắn gọn các câu trả lời cần thiết về tải ảnh, sắp xếp tự động, chỉnh sửa, phạm vi công khai và lưu trữ.",
    groups: [
      {
        title: "Luồng cốt lõi",
        description: "Hành vi cơ bản từ lúc kết thúc chuyến đi đến khi hồi tưởng.",
        items: [
          {
            question: "MomentBook là ứng dụng gì?",
            answer: "Đây là ứng dụng sắp xếp ảnh du lịch rời rạc thành một timeline và phần hồi tưởng trên bản đồ.",
          },
          {
            question: "Tôi phải tải ảnh từng tấm không?",
            answer: "Không. Cốt lõi là tải toàn bộ ảnh chuyến đi theo lô trong một lần.",
          },
          {
            question: "Sau khi tải lên thì điều gì xảy ra?",
            answer: "Ảnh sẽ được tự động sắp xếp theo ngày và giờ.",
          },
          {
            question: "Có thể sửa ảnh bị sắp sai không?",
            answer: "Có. Bạn có thể xóa ảnh không cần thiết và chỉnh thủ công các cụm bị gom sai.",
          },
        ],
      },
      {
        title: "Công khai và lưu trữ",
        description: "Hành vi liên quan đến phạm vi công khai và sao lưu.",
        items: [
          {
            question: "Mặc định mọi thứ là công khai sao?",
            answer: "Không. Mặc định là riêng tư và việc công khai là tùy chọn.",
          },
          {
            question: "Có thể lưu mà không công khai không?",
            answer: "Có. Bạn có thể xuất ZIP gồm hình ảnh và metadata.",
          },
          {
            question: "Web cung cấp những gì?",
            answer: "Web cung cấp hành trình, khoảnh khắc, ảnh và hồ sơ đã công khai dưới dạng trang chỉ đọc.",
          },
        ],
      },
    ],
    calloutPrefix: "Nếu bạn cần hỗ trợ tài khoản hoặc kỹ thuật, ",
    calloutLink: "hãy liên hệ đội hỗ trợ",
    calloutSuffix: ".",
  },
};

export function getFaqContent(lang: Language): FAQContent {
  return faqContent[lang] ?? faqContent.en;
}

export function flattenFaqItems(groups: FAQGroup[]): FAQItem[] {
  return groups.flatMap((group) => group.items);
}
