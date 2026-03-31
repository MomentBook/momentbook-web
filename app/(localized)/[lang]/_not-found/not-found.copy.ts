import { defaultLanguage, type Language } from "@/lib/i18n/config";

export type NotFoundCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  reasonTyped: string;
  reasonSearch: string;
  reasonRecovery: string;
  primaryHome: string;
  primaryJourneys: string;
  primaryUsers: string;
  secondaryBack: string;
  secondarySupport: string;
  secondaryFaq: string;
  cards: {
    journeys: {
      title: string;
      description: string;
      cta: string;
    };
    users: {
      title: string;
      description: string;
      cta: string;
    };
    support: {
      title: string;
      description: string;
      cta: string;
    };
  };
};

const copyByLanguage: Record<Language, NotFoundCopy> = {
  en: {
    eyebrow: "Page not found",
    title: "We couldn't find this page",
    lead: "The link may be out of date, the address may be incomplete, or this public page may no longer be available on the web.",
    reasonTyped: "If you typed the address directly, check that the full link is correct.",
    reasonSearch: "If you opened an old search result or saved link, the page may have changed or been removed.",
    reasonRecovery: "Use one of the paths below to keep exploring MomentBook on the web.",
    primaryHome: "Go to home",
    primaryJourneys: "Browse journeys",
    primaryUsers: "Browse people",
    secondaryBack: "Go back",
    secondarySupport: "Support",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "Public journeys",
        description: "Continue with published journeys that are still available on the web.",
        cta: "Open journeys",
      },
      users: {
        title: "People directory",
        description: "Browse public profiles and the journeys they shared.",
        cta: "Open people",
      },
      support: {
        title: "Need help?",
        description: "If this link should still work, contact support and include the page you opened.",
        cta: "Open support",
      },
    },
  },
  ko: {
    eyebrow: "페이지를 찾을 수 없습니다",
    title: "이 페이지를 찾지 못했습니다",
    lead: "링크가 오래되었거나 주소가 완전하지 않거나, 이 공개 페이지가 더 이상 웹에서 제공되지 않을 수 있습니다.",
    reasonTyped: "주소를 직접 입력했다면 전체 링크가 맞는지 확인해 주세요.",
    reasonSearch: "오래된 검색 결과나 저장한 링크에서 열었다면 페이지가 바뀌었거나 삭제되었을 수 있습니다.",
    reasonRecovery: "아래 경로에서 MomentBook 웹 탐색을 이어갈 수 있습니다.",
    primaryHome: "홈으로 이동",
    primaryJourneys: "여정 보기",
    primaryUsers: "사람 둘러보기",
    secondaryBack: "뒤로 가기",
    secondarySupport: "지원",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "공개 여정",
        description: "지금도 웹에서 볼 수 있는 공개 여정을 이어서 둘러보세요.",
        cta: "여정 열기",
      },
      users: {
        title: "사람 디렉터리",
        description: "공개 프로필과 그들이 공유한 여정을 살펴보세요.",
        cta: "사람 열기",
      },
      support: {
        title: "도움이 필요하신가요?",
        description: "이 링크가 아직 작동해야 한다면 열었던 페이지와 함께 지원으로 알려 주세요.",
        cta: "지원 열기",
      },
    },
  },
  ja: {
    eyebrow: "ページが見つかりません",
    title: "このページは見つかりませんでした",
    lead: "リンクが古いか、アドレスが不完全か、この公開ページがウェブで利用できなくなっている可能性があります。",
    reasonTyped: "アドレスを直接入力した場合は、リンク全体が正しいか確認してください。",
    reasonSearch: "古い検索結果や保存したリンクから開いた場合は、ページが変更または削除された可能性があります。",
    reasonRecovery: "以下の導線から MomentBook のウェブ閲覧を続けられます。",
    primaryHome: "ホームへ",
    primaryJourneys: "旅を見る",
    primaryUsers: "人を探す",
    secondaryBack: "戻る",
    secondarySupport: "サポート",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "公開された旅",
        description: "現在もウェブで公開されている旅を続けて見ることができます。",
        cta: "旅を開く",
      },
      users: {
        title: "人のディレクトリ",
        description: "公開プロフィールと、その人が共有した旅をたどれます。",
        cta: "人を開く",
      },
      support: {
        title: "お困りですか？",
        description: "このリンクがまだ有効なはずなら、開いたページ情報とあわせてサポートへご連絡ください。",
        cta: "サポートを開く",
      },
    },
  },
  zh: {
    eyebrow: "找不到页面",
    title: "我们找不到这个页面",
    lead: "这个链接可能已经过期、地址可能不完整，或者这个公开页面已不再在网页上提供。",
    reasonTyped: "如果你是直接输入地址，请确认完整链接是否正确。",
    reasonSearch: "如果你是从旧的搜索结果或已保存的链接打开，页面可能已被更改或移除。",
    reasonRecovery: "你可以通过下面的入口继续浏览 MomentBook 网页内容。",
    primaryHome: "前往首页",
    primaryJourneys: "浏览旅程",
    primaryUsers: "浏览用户",
    secondaryBack: "返回上一页",
    secondarySupport: "支持",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "公开旅程",
        description: "继续查看目前仍可在网页上访问的公开旅程。",
        cta: "打开旅程",
      },
      users: {
        title: "用户目录",
        description: "浏览公开个人资料以及他们分享的旅程。",
        cta: "打开用户",
      },
      support: {
        title: "需要帮助？",
        description: "如果这个链接本应仍然有效，请把你打开的页面信息发给支持团队。",
        cta: "打开支持",
      },
    },
  },
  es: {
    eyebrow: "Página no encontrada",
    title: "No pudimos encontrar esta página",
    lead: "Es posible que el enlace esté desactualizado, que la dirección esté incompleta o que esta página pública ya no esté disponible en la web.",
    reasonTyped: "Si escribiste la dirección manualmente, revisa que el enlace completo sea correcto.",
    reasonSearch: "Si abriste un resultado antiguo de búsqueda o un enlace guardado, es posible que la página haya cambiado o sido eliminada.",
    reasonRecovery: "Usa una de las rutas siguientes para seguir explorando MomentBook en la web.",
    primaryHome: "Ir al inicio",
    primaryJourneys: "Ver viajes",
    primaryUsers: "Ver personas",
    secondaryBack: "Volver",
    secondarySupport: "Soporte",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "Viajes públicos",
        description: "Continúa con los viajes publicados que siguen disponibles en la web.",
        cta: "Abrir viajes",
      },
      users: {
        title: "Directorio de personas",
        description: "Explora perfiles públicos y los viajes que compartieron.",
        cta: "Abrir personas",
      },
      support: {
        title: "¿Necesitas ayuda?",
        description: "Si este enlace debería seguir funcionando, contacta con soporte e incluye la página que abriste.",
        cta: "Abrir soporte",
      },
    },
  },
  pt: {
    eyebrow: "Página não encontrada",
    title: "Não conseguimos encontrar esta página",
    lead: "O link pode estar desatualizado, o endereço pode estar incompleto ou esta página pública pode não estar mais disponível na web.",
    reasonTyped: "Se você digitou o endereço manualmente, verifique se o link completo está correto.",
    reasonSearch: "Se você abriu um resultado antigo de busca ou um link salvo, a página pode ter mudado ou sido removida.",
    reasonRecovery: "Use um dos caminhos abaixo para continuar explorando o MomentBook na web.",
    primaryHome: "Ir para a página inicial",
    primaryJourneys: "Ver viagens",
    primaryUsers: "Ver pessoas",
    secondaryBack: "Voltar",
    secondarySupport: "Suporte",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "Viagens públicas",
        description: "Continue com viagens publicadas que ainda estão disponíveis na web.",
        cta: "Abrir viagens",
      },
      users: {
        title: "Diretório de pessoas",
        description: "Veja perfis públicos e as viagens que essas pessoas compartilharam.",
        cta: "Abrir pessoas",
      },
      support: {
        title: "Precisa de ajuda?",
        description: "Se este link ainda deveria funcionar, fale com o suporte e informe a página que você abriu.",
        cta: "Abrir suporte",
      },
    },
  },
  fr: {
    eyebrow: "Page introuvable",
    title: "Nous n'avons pas trouvé cette page",
    lead: "Le lien est peut-être ancien, l'adresse est peut-être incomplète, ou cette page publique n'est peut-être plus disponible sur le web.",
    reasonTyped: "Si vous avez saisi l'adresse manuellement, vérifiez que le lien complet est correct.",
    reasonSearch: "Si vous avez ouvert un ancien résultat de recherche ou un lien enregistré, la page a peut-être changé ou été supprimée.",
    reasonRecovery: "Utilisez l'un des chemins ci-dessous pour continuer à explorer MomentBook sur le web.",
    primaryHome: "Aller à l'accueil",
    primaryJourneys: "Voir les voyages",
    primaryUsers: "Voir les personnes",
    secondaryBack: "Retour",
    secondarySupport: "Support",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "Voyages publics",
        description: "Continuez avec les voyages publiés qui sont encore disponibles sur le web.",
        cta: "Ouvrir les voyages",
      },
      users: {
        title: "Annuaire des personnes",
        description: "Parcourez les profils publics et les voyages qu'ils ont partagés.",
        cta: "Ouvrir les personnes",
      },
      support: {
        title: "Besoin d'aide ?",
        description: "Si ce lien devrait encore fonctionner, contactez le support en indiquant la page que vous avez ouverte.",
        cta: "Ouvrir le support",
      },
    },
  },
  th: {
    eyebrow: "ไม่พบหน้านี้",
    title: "เราไม่พบหน้านี้",
    lead: "ลิงก์อาจเก่าอยู่แล้ว ที่อยู่อาจไม่ครบ หรือหน้าสาธารณะนี้อาจไม่พร้อมใช้งานบนเว็บอีกต่อไป",
    reasonTyped: "หากคุณพิมพ์ที่อยู่เอง โปรดตรวจสอบว่าลิงก์ทั้งหมดถูกต้อง",
    reasonSearch: "หากคุณเปิดจากผลการค้นหาเก่าหรือลิงก์ที่บันทึกไว้ หน้านี้อาจถูกเปลี่ยนหรือถูกลบแล้ว",
    reasonRecovery: "ใช้เส้นทางด้านล่างเพื่อสำรวจ MomentBook บนเว็บต่อได้",
    primaryHome: "ไปหน้าแรก",
    primaryJourneys: "ดูทริป",
    primaryUsers: "ดูผู้คน",
    secondaryBack: "ย้อนกลับ",
    secondarySupport: "ช่วยเหลือ",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "ทริปสาธารณะ",
        description: "ไปต่อกับทริปที่ยังเปิดดูได้บนเว็บในตอนนี้",
        cta: "เปิดทริป",
      },
      users: {
        title: "ไดเรกทอรีผู้คน",
        description: "ดูโปรไฟล์สาธารณะและทริปที่พวกเขาแชร์ไว้",
        cta: "เปิดผู้คน",
      },
      support: {
        title: "ต้องการความช่วยเหลือ?",
        description: "หากลิงก์นี้ควรยังใช้งานได้ โปรดติดต่อทีมช่วยเหลือพร้อมแจ้งหน้าที่คุณเปิด",
        cta: "เปิดหน้าช่วยเหลือ",
      },
    },
  },
  vi: {
    eyebrow: "Không tìm thấy trang",
    title: "Chúng tôi không tìm thấy trang này",
    lead: "Liên kết có thể đã cũ, địa chỉ có thể chưa đầy đủ, hoặc trang công khai này không còn khả dụng trên web nữa.",
    reasonTyped: "Nếu bạn nhập địa chỉ trực tiếp, hãy kiểm tra lại toàn bộ liên kết.",
    reasonSearch: "Nếu bạn mở từ kết quả tìm kiếm cũ hoặc liên kết đã lưu, trang có thể đã thay đổi hoặc bị gỡ bỏ.",
    reasonRecovery: "Hãy dùng một trong các lối đi bên dưới để tiếp tục khám phá MomentBook trên web.",
    primaryHome: "Về trang chủ",
    primaryJourneys: "Xem hành trình",
    primaryUsers: "Xem mọi người",
    secondaryBack: "Quay lại",
    secondarySupport: "Hỗ trợ",
    secondaryFaq: "FAQ",
    cards: {
      journeys: {
        title: "Hành trình công khai",
        description: "Tiếp tục với các hành trình đã xuất bản vẫn còn xem được trên web.",
        cta: "Mở hành trình",
      },
      users: {
        title: "Danh bạ người dùng",
        description: "Xem hồ sơ công khai và các hành trình họ đã chia sẻ.",
        cta: "Mở người dùng",
      },
      support: {
        title: "Cần trợ giúp?",
        description: "Nếu liên kết này lẽ ra vẫn phải hoạt động, hãy liên hệ hỗ trợ và gửi kèm trang bạn đã mở.",
        cta: "Mở hỗ trợ",
      },
    },
  },
};

export function getNotFoundCopy(lang: Language | null | undefined): NotFoundCopy {
  if (!lang) {
    return copyByLanguage[defaultLanguage];
  }

  return copyByLanguage[lang] ?? copyByLanguage[defaultLanguage];
}
