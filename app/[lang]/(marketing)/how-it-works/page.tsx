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

type HowItWorksDetail = {
    title: string;
    items: string[];
};

type HowItWorksContent = {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    intro: string;
    steps: HowItWorksStep[];
    details: HowItWorksDetail[];
    noPressureTitle: string;
    noPressureItems: string[];
};

const howItWorksContent: Partial<Record<Language, HowItWorksContent>> & { en: HowItWorksContent } = {
    en: {
        metaTitle: "How MomentBook Works",
        metaDescription: "A calm flow from starting a journey to sharing it.",
        title: "How MomentBook works",
        subtitle: "A gentle flow, guided by your journey.",
        intro: "MomentBook keeps moments as journeys without asking for a routine.",
        steps: [
            {
                title: "Begin with a gentle prompt",
                text: "Start today’s journey with a single tap. The rest gathers quietly.",
                image: "/screenshots/start-journey.png",
                alt: "Start today’s journey screen with a single call to action.",
            },
            {
                title: "Let the day collect itself",
                text: "Time, photos, and places gather into a clear summary view.",
                image: "/screenshots/current-journey.png",
                alt: "Current journey status with time, photos, places, and map preview.",
            },
            {
                title: "Pick and organize",
                text: "Filter photos and group them into chapters you want to return to.",
                image: "/screenshots/organize-photos.png",
                alt: "Organizing photos screen with a grid and organize button.",
            },
            {
                title: "Publish only when ready",
                text: "Choose what to share and publish when it feels right.",
                image: "/screenshots/publish-select.png",
                alt: "Publish selection view with chosen photos.",
            },
        ],
        details: [
            {
                title: "What gets saved",
                items: [
                    "Photos",
                    "Short notes",
                    "Time of capture",
                    "Places and route (if location is allowed)",
                ],
            },
            {
                title: "How routes appear",
                items: [
                    "Strong route when GPS is rich and precise",
                    "Soft route when GPS is intermittent",
                    "No route when location is not allowed",
                ],
            },
            {
                title: "When it becomes public",
                items: [
                    "Only when you tap Publish",
                    "Creates a public web page with a unique URL",
                    "Anyone with the link can view, and it may be indexed",
                ],
            },
        ],
        noPressureTitle: "On your terms",
        noPressureItems: [
            "No feeds, likes, or rankings",
            "No streaks or daily goals",
            "Private by default",
            "Share only when you choose",
        ],
    },
    ko: {
        metaTitle: "MomentBook 작동 방식",
        metaDescription:
            "여정을 시작부터 공유까지 차분하게 따라가는 흐름입니다.",
        title: "MomentBook 작동 방식",
        subtitle: "여정에 따라 흐르는 차분한 구성.",
        intro: "MomentBook은 일상을 방해하지 않고 순간을 여정으로 남깁니다.",
        steps: [
            {
                title: "부드러운 안내로 시작",
                text: "한 번의 탭으로 오늘의 여정을 시작합니다. 나머지는 조용히 모입니다.",
                image: "/screenshots/start-journey.png",
                alt: "오늘의 여정을 시작하는 버튼이 있는 화면.",
            },
            {
                title: "하루가 스스로 모입니다",
                text: "시간, 사진, 장소가 모여 요약 화면으로 정리됩니다.",
                image: "/screenshots/current-journey.png",
                alt: "시간, 사진, 장소와 지도 미리보기를 보여주는 현재 여정 화면.",
            },
            {
                title: "사진을 고르고 정리",
                text: "필터로 사진을 고르고, 기억하고 싶은 장면으로 정리합니다.",
                image: "/screenshots/organize-photos.png",
                alt: "사진 그리드와 정리 버튼이 있는 사진 정리 화면.",
            },
            {
                title: "필요할 때만 게시",
                text: "공개할 내용을 고르고 필요할 때만 게시합니다.",
                image: "/screenshots/publish-select.png",
                alt: "선택한 사진이 표시된 게시 선택 화면.",
            },
        ],
        details: [
            {
                title: "저장되는 것",
                items: [
                    "사진",
                    "짧은 메모",
                    "기록 시각",
                    "장소와 경로(허용 시)",
                ],
            },
            {
                title: "경로 표현 방식",
                items: [
                    "GPS가 충분하면 선명한 경로",
                    "GPS가 간헐이면 부드러운 경로",
                    "위치 정보가 없으면 경로 없음",
                ],
            },
            {
                title: "웹에 공개되는 경우",
                items: [
                    "게시하기를 눌렀을 때만",
                    "게시된 여정은 웹에 공개",
                    "공개 여부는 사용자가 선택",
                ],
            },
            {
                title: "공개 페이지의 성격",
                items: [
                    "고유 URL의 웹페이지가 생성됨",
                    "링크를 아는 사람은 열람 가능",
                    "검색 엔진에 수집될 수 있음",
                ],
            },
        ],
        noPressureTitle: "내 방식대로",
        noPressureItems: [
            "피드, 좋아요, 랭킹 없음",
            "연속 기록이나 목표 없음",
            "기본은 비공개",
            "원할 때만 공유",
        ],
    },
    ja: {
        metaTitle: "MomentBook の仕組み",
        metaDescription: "旅の始まりから共有までを静かに辿る流れ。",
        title: "MomentBook の仕組み",
        subtitle: "旅の流れに寄り添うシンプルな体験。",
        intro: "MomentBook は日常を邪魔せず、瞬間を旅として残します。",
        steps: [
            {
                title: "やさしい案内から開始",
                text: "ワンタップで今日の旅を始めます。あとは静かに集まります。",
                image: "/screenshots/start-journey.png",
                alt: "旅を始めるボタンがある画面。",
            },
            {
                title: "一日が自然に集まる",
                text: "時間・写真・場所が集まり、概要で確認できます。",
                image: "/screenshots/current-journey.png",
                alt: "時間、写真、場所、地図プレビューが表示された現在の旅画面。",
            },
            {
                title: "写真を選んで整理",
                text: "フィルタで選び、戻りたい場面として整えます。",
                image: "/screenshots/organize-photos.png",
                alt: "写真グリッドと整理ボタンがある画面。",
            },
            {
                title: "必要なときだけ公開",
                text: "公開する内容を選び、必要なときだけ公開します。",
                image: "/screenshots/publish-select.png",
                alt: "選択した写真が表示された公開選択画面。",
            },
        ],
        details: [
            {
                title: "保存されるもの",
                items: ["写真", "短いメモ", "記録時刻", "場所とルート(許可時)"],
            },
            {
                title: "ルート表示",
                items: [
                    "GPSが十分なら明確なルート",
                    "GPSが途切れると緩やかなルート",
                    "位置情報がない場合はルートなし",
                ],
            },
            {
                title: "公開される条件",
                items: [
                    "投稿したときだけ",
                    "公開した旅はWebで表示",
                    "公開するかどうかは自分で決める",
                ],
            },
            {
                title: "公開ページについて",
                items: [
                    "固有URLのWebページが作成される",
                    "リンクを知っている人は閲覧可能",
                    "検索エンジンに表示される可能性がある",
                ],
            },
        ],
        noPressureTitle: "自分のペースで",
        noPressureItems: [
            "フィード、いいね、ランキングなし",
            "連続記録や目標なし",
            "デフォルトは非公開",
            "必要なときだけ共有",
        ],
    },
    zh: {
        metaTitle: "MomentBook 如何运作",
        metaDescription: "从开始旅程到分享的安静流程。",
        title: "MomentBook 如何运作",
        subtitle: "跟随旅程节奏的简洁体验。",
        intro: "MomentBook 不打扰日常，把瞬间整理成旅程。",
        steps: [
            {
                title: "温柔提示开始",
                text: "轻触一下即可开始今天的旅程，其余会静静汇集。",
                image: "/screenshots/start-journey.png",
                alt: "带有开始旅程按钮的界面。",
            },
            {
                title: "一天自然汇集",
                text: "时间、照片与地点汇集整理，并在摘要中呈现。",
                image: "/screenshots/current-journey.png",
                alt: "显示时间、照片、地点和地图预览的当前旅程界面。",
            },
            {
                title: "筛选并整理",
                text: "通过筛选挑选照片，整理成想要回看的章节。",
                image: "/screenshots/organize-photos.png",
                alt: "带有照片网格和整理按钮的界面。",
            },
            {
                title: "需要时再发布",
                text: "选择要公开的内容，在需要时再发布。",
                image: "/screenshots/publish-select.png",
                alt: "显示已选照片的发布选择界面。",
            },
        ],
        details: [
            {
                title: "保存的内容",
                items: ["照片", "短句", "记录时间", "地点与路线(允许时)"],
            },
            {
                title: "路线呈现方式",
                items: [
                    "GPS 充足时显示清晰路线",
                    "GPS 间歇时显示柔和路线",
                    "位置不可用时不显示路线",
                ],
            },
            {
                title: "何时公开",
                items: [
                    "仅在点击发布时",
                    "发布的旅程会在网页公开",
                    "是否公开由你决定",
                ],
            },
            {
                title: "公开页面",
                items: [
                    "生成唯一 URL 的网页",
                    "知道链接的人可以访问",
                    "可能被搜索引擎收录",
                ],
            },
        ],
        noPressureTitle: "按你的节奏",
        noPressureItems: [
            "没有信息流、点赞或排名",
            "没有连续记录或目标",
            "默认私密",
            "仅在需要时分享",
        ],
    },
};

function getHowItWorksContent(lang: Language): HowItWorksContent {
    if (lang === "es") {
        return {
            ...howItWorksContent.en,
            metaTitle: "Como funciona MomentBook",
            metaDescription: "Un flujo tranquilo desde empezar un viaje hasta compartirlo.",
            title: "Como funciona MomentBook",
            subtitle: "Un flujo suave guiado por tu viaje.",
            intro: "MomentBook guarda momentos como viajes sin imponer una rutina.",
            steps: [
                {
                    title: "Empieza con una invitacion suave",
                    text: "Empieza el viaje de hoy con un toque. Lo demas se reune en silencio.",
                    image: "/screenshots/start-journey.png",
                    alt: "Pantalla para empezar el viaje de hoy con una accion principal.",
                },
                {
                    title: "Deja que el dia se ordene",
                    text: "Tiempo, fotos y lugares se reunen en un resumen claro.",
                    image: "/screenshots/current-journey.png",
                    alt: "Estado del viaje con tiempo, fotos, lugares y vista previa del mapa.",
                },
                {
                    title: "Elige y organiza",
                    text: "Filtra fotos y agrupalas en capitulos a los que quieras volver.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Pantalla para organizar fotos con cuadricula y boton de organizar.",
                },
                {
                    title: "Publica solo cuando quieras",
                    text: "Elige que compartir y publica cuando te parezca bien.",
                    image: "/screenshots/publish-select.png",
                    alt: "Pantalla de seleccion de publicacion con fotos elegidas.",
                },
            ],
            details: [
                {
                    title: "Que se guarda",
                    items: ["Fotos", "Notas cortas", "Hora de captura", "Lugares y ruta (si permites ubicacion)"],
                },
                {
                    title: "Como aparece la ruta",
                    items: [
                        "Ruta clara cuando el GPS es preciso y abundante",
                        "Ruta suave cuando el GPS es intermitente",
                        "Sin ruta cuando no se permite ubicacion",
                    ],
                },
                {
                    title: "Cuando se vuelve publico",
                    items: [
                        "Solo cuando tocas Publicar",
                        "Se crea una pagina web publica con URL unica",
                        "Cualquiera con el enlace puede verla y puede indexarse",
                    ],
                },
            ],
            noPressureTitle: "A tu ritmo",
            noPressureItems: [
                "Sin feed, likes ni rankings",
                "Sin rachas ni metas diarias",
                "Privado por defecto",
                "Comparte solo cuando quieras",
            ],
        };
    }

    if (lang === "pt") {
        return {
            ...howItWorksContent.en,
            metaTitle: "Como o MomentBook funciona",
            metaDescription: "Um fluxo tranquilo do inicio da jornada ate o compartilhamento.",
            title: "Como o MomentBook funciona",
            subtitle: "Um fluxo suave guiado pela sua jornada.",
            intro: "MomentBook guarda momentos como jornadas sem exigir rotina.",
            steps: [
                {
                    title: "Comece com um convite suave",
                    text: "Inicie a jornada de hoje com um toque. O resto se organiza em silencio.",
                    image: "/screenshots/start-journey.png",
                    alt: "Tela para iniciar a jornada de hoje com uma acao principal.",
                },
                {
                    title: "Deixe o dia se reunir",
                    text: "Tempo, fotos e lugares se juntam em um resumo claro.",
                    image: "/screenshots/current-journey.png",
                    alt: "Status da jornada com tempo, fotos, lugares e mapa.",
                },
                {
                    title: "Escolha e organize",
                    text: "Filtre fotos e agrupe em capitulos para revisitar depois.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Tela de organizacao de fotos com grade e botao de organizar.",
                },
                {
                    title: "Publique quando estiver pronto",
                    text: "Escolha o que compartilhar e publique quando fizer sentido.",
                    image: "/screenshots/publish-select.png",
                    alt: "Tela de selecao de publicacao com fotos escolhidas.",
                },
            ],
            details: [
                {
                    title: "O que fica salvo",
                    items: ["Fotos", "Notas curtas", "Horario da captura", "Lugares e rota (se localizacao for permitida)"],
                },
                {
                    title: "Como a rota aparece",
                    items: [
                        "Rota clara quando o GPS e abundante e preciso",
                        "Rota suave quando o GPS e intermitente",
                        "Sem rota quando a localizacao nao e permitida",
                    ],
                },
                {
                    title: "Quando vira publico",
                    items: [
                        "Somente ao tocar em Publicar",
                        "Cria uma pagina web publica com URL unica",
                        "Quem tiver o link pode ver, e pode ser indexado",
                    ],
                },
            ],
            noPressureTitle: "Do seu jeito",
            noPressureItems: [
                "Sem feed, curtidas ou ranking",
                "Sem sequencias ou metas diarias",
                "Privado por padrao",
                "Compartilhe so quando quiser",
            ],
        };
    }

    if (lang === "fr") {
        return {
            ...howItWorksContent.en,
            metaTitle: "Comment fonctionne MomentBook",
            metaDescription: "Un flux calme du debut du voyage jusqu'au partage.",
            title: "Comment fonctionne MomentBook",
            subtitle: "Un flux doux guide par votre voyage.",
            intro: "MomentBook garde les moments comme des voyages sans imposer de routine.",
            steps: [
                {
                    title: "Commencez avec une invitation douce",
                    text: "Demarrez le voyage du jour en un geste. Le reste se rassemble en silence.",
                    image: "/screenshots/start-journey.png",
                    alt: "Ecran pour demarrer le voyage du jour avec une action principale.",
                },
                {
                    title: "Laissez la journee se structurer",
                    text: "Temps, photos et lieux se rassemblent dans un resume clair.",
                    image: "/screenshots/current-journey.png",
                    alt: "Etat du voyage avec temps, photos, lieux et apercu carte.",
                },
                {
                    title: "Choisir et organiser",
                    text: "Filtrez les photos et regroupez-les en chapitres a revisiter.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Ecran d'organisation de photos avec grille et bouton.",
                },
                {
                    title: "Publiez seulement quand vous voulez",
                    text: "Choisissez ce que vous partagez et publiez au bon moment.",
                    image: "/screenshots/publish-select.png",
                    alt: "Ecran de selection de publication avec photos choisies.",
                },
            ],
            details: [
                {
                    title: "Ce qui est enregistre",
                    items: ["Photos", "Notes courtes", "Heure de capture", "Lieux et itineraire (si localisation autorisee)"],
                },
                {
                    title: "Affichage de l'itineraire",
                    items: [
                        "Itineraire net quand le GPS est riche et precis",
                        "Itineraire doux quand le GPS est intermittent",
                        "Aucun itineraire sans autorisation de localisation",
                    ],
                },
                {
                    title: "Quand cela devient public",
                    items: [
                        "Seulement quand vous appuyez sur Publier",
                        "Cree une page web publique avec URL unique",
                        "Toute personne avec le lien peut voir, et cela peut etre indexe",
                    ],
                },
            ],
            noPressureTitle: "A votre rythme",
            noPressureItems: [
                "Pas de feed, de likes ni de classement",
                "Pas de serie ni d'objectif quotidien",
                "Prive par defaut",
                "Partagez seulement quand vous le choisissez",
            ],
        };
    }

    if (lang === "th") {
        return {
            ...howItWorksContent.en,
            metaTitle: "MomentBook ทํางานอย่างไร",
            metaDescription: "ขั้นตอนแบบสงบ ตั้งแต่เริ่มทริปจนถึงการแชร์",
            title: "MomentBook ทํางานอย่างไร",
            subtitle: "ลำดับที่นุ่มนวลตามจังหวะของทริป",
            intro: "MomentBook เก็บช่วงเวลาเป็นทริป โดยไม่บังคับให้ทำตามรูทีน",
            steps: [
                {
                    title: "เริ่มด้วยคําเชิญที่อ่อนโยน",
                    text: "แตะครั้งเดียวเพื่อเริ่มทริปวันนี้ ที่เหลือจะค่อยๆ รวมกันเอง",
                    image: "/screenshots/start-journey.png",
                    alt: "หน้าจอเริ่มทริปวันนี้ด้วยปุ่มหลักหนึ่งปุ่ม",
                },
                {
                    title: "ปล่อยให้วันค่อยๆ รวมตัว",
                    text: "เวลา รูป และสถานที่จะถูกรวมเป็นภาพรวมที่ชัดเจน",
                    image: "/screenshots/current-journey.png",
                    alt: "สถานะทริปพร้อมเวลา รูป สถานที่ และแผนที่",
                },
                {
                    title: "เลือกและจัดระเบียบ",
                    text: "กรองรูปและจัดเป็นบทเล็กๆ ที่อยากย้อนกลับมาดู",
                    image: "/screenshots/organize-photos.png",
                    alt: "หน้าจอจัดรูปพร้อมกริดและปุ่มจัดระเบียบ",
                },
                {
                    title: "เผยแพร่เมื่อพร้อมเท่านั้น",
                    text: "เลือกสิ่งที่จะแชร์ แล้วเผยแพร่เมื่อรู้สึกว่าใช่",
                    image: "/screenshots/publish-select.png",
                    alt: "หน้าจอเลือกเผยแพร่พร้อมรูปที่เลือก",
                },
            ],
            details: [
                {
                    title: "ข้อมูลที่ถูกบันทึก",
                    items: ["รูป", "โน้ตสั้น", "เวลาที่บันทึก", "สถานที่และเส้นทาง (เมื่ออนุญาตตำแหน่ง)"],
                },
                {
                    title: "การแสดงเส้นทาง",
                    items: [
                        "เส้นทางชัดเจนเมื่อ GPS เพียงพอและแม่นยํา",
                        "เส้นทางแบบนุ่มนวลเมื่อ GPS ขาดช่วง",
                        "ไม่มีเส้นทางเมื่อไม่อนุญาตตำแหน่ง",
                    ],
                },
                {
                    title: "เมื่อใดจึงเป็นสาธารณะ",
                    items: [
                        "เมื่อคุณแตะเผยแพร่เท่านั้น",
                        "จะสร้างหน้าเว็บสาธารณะพร้อม URL เฉพาะ",
                        "ผู้ที่มีลิงก์สามารถดูได้ และอาจถูกจัดทำดัชนี",
                    ],
                },
            ],
            noPressureTitle: "ในแบบของคุณ",
            noPressureItems: [
                "ไม่มีฟีด ไลก์ หรืออันดับ",
                "ไม่มีสตรีกหรือเป้าหมายรายวัน",
                "เป็นส่วนตัวโดยค่าเริ่มต้น",
                "แชร์เมื่อคุณเลือกเท่านั้น",
            ],
        };
    }

    if (lang === "vi") {
        return {
            ...howItWorksContent.en,
            metaTitle: "MomentBook hoat dong nhu the nao",
            metaDescription: "Mot luong nhe nhang tu bat dau hanh trinh den luc chia se.",
            title: "MomentBook hoat dong nhu the nao",
            subtitle: "Mot luong nhe nhang duoc dan dat boi hanh trinh cua ban.",
            intro: "MomentBook giu cac khoanh khac thanh hanh trinh ma khong ep buoc thanh thoi quen.",
            steps: [
                {
                    title: "Bat dau bang loi moi nhe nhang",
                    text: "Bat dau hanh trinh hom nay bang mot lan cham. Phan con lai se tu lang le tap hop.",
                    image: "/screenshots/start-journey.png",
                    alt: "Man hinh bat dau hanh trinh hom nay voi mot hanh dong chinh.",
                },
                {
                    title: "De ngay tu ket noi",
                    text: "Thoi gian, anh va dia diem duoc tong hop thanh mot ban tom tat ro rang.",
                    image: "/screenshots/current-journey.png",
                    alt: "Trang thai hanh trinh voi thoi gian, anh, dia diem va ban do.",
                },
                {
                    title: "Chon va sap xep",
                    text: "Loc anh va nhom thanh cac chuong nho de quay lai sau.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Man hinh sap xep anh voi luoi va nut sap xep.",
                },
                {
                    title: "Chi dang khi san sang",
                    text: "Chon noi dung can chia se va dang khi ban thay phu hop.",
                    image: "/screenshots/publish-select.png",
                    alt: "Man hinh chon dang voi cac anh da chon.",
                },
            ],
            details: [
                {
                    title: "Nhung gi duoc luu",
                    items: ["Anh", "Ghi chu ngan", "Thoi gian chup", "Dia diem va tuyen duong (neu cho phep vi tri)"],
                },
                {
                    title: "Cach hien thi tuyen duong",
                    items: [
                        "Tuyen ro rang khi GPS day du va chinh xac",
                        "Tuyen mem khi GPS bi gian doan",
                        "Khong co tuyen khi khong cho phep vi tri",
                    ],
                },
                {
                    title: "Khi nao tro thanh cong khai",
                    items: [
                        "Chi khi ban bam Dang",
                        "Tao mot trang web cong khai co URL rieng",
                        "Bat ky ai co lien ket deu xem duoc va co the duoc lap chi muc",
                    ],
                },
            ],
            noPressureTitle: "Theo nhip cua ban",
            noPressureItems: [
                "Khong feed, like hay xep hang",
                "Khong chuoi ngay hay muc tieu hang ngay",
                "Rieng tu mac dinh",
                "Chi chia se khi ban chon",
            ],
        };
    }

    return howItWorksContent[lang] ?? howItWorksContent.en;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = (await params) as { lang: Language };
    const content = getHowItWorksContent(lang);
    const path = "/how-it-works";
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

export default async function HowItWorksPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = (await params) as { lang: Language };
    const content = getHowItWorksContent(lang);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, "/how-it-works"),
        siteUrl,
    ).toString();
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: content.title,
        description: content.metaDescription,
        url: pageUrl,
        step: content.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.text,
            image: new URL(step.image, siteUrl).toString(),
        })),
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className={styles.header}>
                <h1 className={styles.title}>{content.title}</h1>
                <p className={styles.subtitle}>{content.subtitle}</p>
                <p className={styles.intro}>{content.intro}</p>
            </header>

            <section className={styles.steps}>
                {content.steps.map((step, index) => (
                    <div
                        key={`${step.title}-${index}`}
                        className={styles.stepCard}
                    >
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>
                                {index + 1}
                            </span>
                            <h2 className={styles.stepTitle}>{step.title}</h2>
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
                                sizes="(max-width: 768px) 260px, (max-width: 1200px) 300px, 320px"
                                className={deviceStyles.screenImage}
                            />
                        </DeviceMock>
                    </div>
                ))}
            </section>

            <section className={styles.detailGrid}>
                {content.details.map((detail) => (
                    <div key={detail.title} className={styles.detailCard}>
                        <h2 className={styles.detailTitle}>{detail.title}</h2>
                        <ul className={styles.detailList}>
                            {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className={styles.noPressure}>
                <h2 className={styles.noPressureTitle}>
                    {content.noPressureTitle}
                </h2>
                <ul className={styles.noPressureList}>
                    {content.noPressureItems.map((item) => (
                        <li key={item} className={styles.noPressureItem}>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
