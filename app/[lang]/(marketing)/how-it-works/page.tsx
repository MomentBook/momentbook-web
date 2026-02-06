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
        metaDescription: "A photo-first flow with optional journey context.",
        title: "How MomentBook works",
        subtitle: "Start with photos, expand into a journey when you want.",
        intro: "MomentBook lets you begin with photos and add time and place only if it helps.",
        steps: [
            {
                title: "Choose photos first",
                text: "Filter by day or time and pick the moments to keep.",
                image: "/screenshots/photos-picker.png",
                alt: "Photo picker grid with day and time filters.",
            },
            {
                title: "Organize into moments",
                text: "One tap groups photos into small clusters you can name.",
                image: "/screenshots/organize-photos.png",
                alt: "Organizing photos screen with a grid and organize button.",
            },
            {
                title: "See the journey timeline",
                text: "Photos and places line up when you want to review.",
                image: "/screenshots/journey-timeline.png",
                alt: "Journey timeline showing a place card, map, and photos.",
            },
            {
                title: "Publish only when ready",
                text: "Publishing creates a page you can share and later unpublish.",
                image: "/screenshots/publish-select.png",
                alt: "Publish selection view with chosen photos.",
            },
        ],
        details: [
            {
                title: "Two ways to begin",
                items: [
                    "Start with photos only",
                    "Or start a journey for time and place",
                ],
            },
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
                title: "When location is available",
                items: [
                    "Strong route when GPS is rich and precise",
                    "Soft route when GPS is intermittent",
                    "No route when location is off",
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
            "사진 중심 흐름과 선택적 여정 맥락을 안내합니다.",
        title: "MomentBook 작동 방식",
        subtitle: "사진으로 시작하고, 원할 때 여정으로 확장.",
        intro: "MomentBook은 사진부터 시작해 필요할 때만 시간과 장소를 더합니다.",
        steps: [
            {
                title: "사진 먼저 고르기",
                text: "날짜나 시간으로 필터링해 남길 사진을 고릅니다.",
                image: "/screenshots/photos-picker.png",
                alt: "날짜와 시간 필터가 있는 사진 선택 화면.",
            },
            {
                title: "순간으로 정리",
                text: "한 번의 정리로 작은 묶음이 만들어지고 이름을 붙일 수 있습니다.",
                image: "/screenshots/organize-photos.png",
                alt: "사진 그리드와 정리 버튼이 있는 화면.",
            },
            {
                title: "여정 타임라인 보기",
                text: "사진과 장소가 순서대로 이어집니다.",
                image: "/screenshots/journey-timeline.png",
                alt: "장소 카드, 지도, 사진이 이어진 여정 타임라인 화면.",
            },
            {
                title: "필요할 때만 게시",
                text: "게시하면 공유 페이지가 만들어지고 언제든 되돌릴 수 있습니다.",
                image: "/screenshots/publish-select.png",
                alt: "선택한 사진이 표시된 게시 선택 화면.",
            },
        ],
        details: [
            {
                title: "두 가지 시작 방법",
                items: [
                    "사진만으로 시작",
                    "여정을 시작해 시간·장소를 모으기",
                ],
            },
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
                title: "위치가 있을 때",
                items: [
                    "GPS가 충분하면 선명한 경로",
                    "GPS가 간헐이면 부드러운 경로",
                    "위치가 없으면 경로 없음",
                ],
            },
            {
                title: "웹에 공개되는 경우",
                items: [
                    "게시하기를 눌렀을 때만",
                    "고유 URL의 공개 페이지 생성",
                    "링크를 아는 사람은 열람 가능하며 검색될 수 있음",
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
        metaDescription: "写真から始め、必要なときだけ旅の文脈を加える流れ。",
        title: "MomentBook の仕組み",
        subtitle: "写真から始め、必要なときに旅へ。",
        intro: "MomentBook は写真から始め、必要なら時間と場所を加えます。",
        steps: [
            {
                title: "写真を選ぶ",
                text: "日付や時間でフィルタし、残したい写真を選びます。",
                image: "/screenshots/photos-picker.png",
                alt: "日付と時間のフィルターがある写真選択画面。",
            },
            {
                title: "瞬間として整理",
                text: "一度の整理で小さなまとまりができ、名前を付けられます。",
                image: "/screenshots/organize-photos.png",
                alt: "写真グリッドと整理ボタンがある画面。",
            },
            {
                title: "旅のタイムライン",
                text: "写真と場所が順序に沿って並びます。",
                image: "/screenshots/journey-timeline.png",
                alt: "場所カード、地図、写真が並ぶ旅のタイムライン画面。",
            },
            {
                title: "必要なときだけ公開",
                text: "公開すると共有ページができ、いつでも非公開に戻せます。",
                image: "/screenshots/publish-select.png",
                alt: "選択した写真が表示された公開選択画面。",
            },
        ],
        details: [
            {
                title: "二つの始め方",
                items: [
                    "写真から始める",
                    "旅を開始して時間・場所を集める",
                ],
            },
            {
                title: "保存されるもの",
                items: ["写真", "短いメモ", "記録時刻", "場所とルート(許可時)"],
            },
            {
                title: "位置情報がある場合",
                items: [
                    "GPSが十分なら明確なルート",
                    "GPSが部分的なら緩やかなルート",
                    "位置情報がない場合はルートなし",
                ],
            },
            {
                title: "公開されるタイミング",
                items: [
                    "Publishを押したときのみ",
                    "固有URLの公開ページが作成される",
                    "リンクを知っている人は閲覧でき、検索される可能性",
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
        metaDescription: "从照片开始，按需加入旅程脉络的流程。",
        title: "MomentBook 如何运作",
        subtitle: "从照片开始，需要时再扩展为旅程。",
        intro: "MomentBook 让你先整理照片，只有需要时才加入时间与地点。",
        steps: [
            {
                title: "选择照片",
                text: "按日期或时间筛选，挑选想保留的照片。",
                image: "/screenshots/photos-picker.png",
                alt: "带有日期与时间筛选的照片选择界面。",
            },
            {
                title: "整理为片段",
                text: "一键整理成小片段，可命名并调整。",
                image: "/screenshots/organize-photos.png",
                alt: "带有照片网格和整理按钮的界面。",
            },
            {
                title: "旅程时间线",
                text: "照片与地点按顺序排列。",
                image: "/screenshots/journey-timeline.png",
                alt: "包含地点卡片、地图和照片的旅程时间线界面。",
            },
            {
                title: "需要时再发布",
                text: "发布会生成可分享页面，之后也可取消发布。",
                image: "/screenshots/publish-select.png",
                alt: "显示已选照片的发布选择界面。",
            },
        ],
        details: [
            {
                title: "两种开始方式",
                items: [
                    "仅从照片开始",
                    "开始旅程以收集时间与地点",
                ],
            },
            {
                title: "保存的内容",
                items: ["照片", "短备注", "拍摄时间", "地点与路线(允许定位时)"],
            },
            {
                title: "有定位时",
                items: [
                    "GPS 充足时显示清晰路线",
                    "GPS 不完整时显示柔和路线",
                    "未允许定位则不显示路线",
                ],
            },
            {
                title: "公开时机",
                items: [
                    "仅在点击发布时",
                    "生成带唯一 URL 的公开页面",
                    "知道链接的人可查看，可能被搜索引擎收录",
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
            metaDescription: "Un flujo centrado en fotos con contexto de viaje opcional.",
            title: "Como funciona MomentBook",
            subtitle: "Empieza con fotos y amplia a un viaje cuando quieras.",
            intro: "MomentBook te deja empezar con fotos y agregar tiempo y lugar solo si ayuda.",
            steps: [
                {
                    title: "Elige fotos primero",
                    text: "Filtra por dia u hora y elige los momentos que quieres guardar.",
                    image: "/screenshots/photos-picker.png",
                    alt: "Selector de fotos con filtros de dia y hora.",
                },
                {
                    title: "Organiza en momentos",
                    text: "Un toque agrupa fotos en pequenos conjuntos que puedes nombrar.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Pantalla para organizar fotos con cuadricula y boton de organizar.",
                },
                {
                    title: "Ver la linea del viaje",
                    text: "Fotos y lugares se ordenan cuando quieras revisar.",
                    image: "/screenshots/journey-timeline.png",
                    alt: "Linea del viaje con lugar, mapa y fotos.",
                },
                {
                    title: "Publica solo cuando quieras",
                    text: "Publicar crea una pagina que puedes compartir y despublicar.",
                    image: "/screenshots/publish-select.png",
                    alt: "Pantalla de seleccion de publicacion con fotos elegidas.",
                },
            ],
            details: [
                {
                    title: "Dos maneras de empezar",
                    items: [
                        "Empezar solo con fotos",
                        "O iniciar un viaje para tiempo y lugar",
                    ],
                },
                {
                    title: "Lo que se guarda",
                    items: ["Fotos", "Notas cortas", "Hora de captura", "Lugares y ruta (si permites ubicacion)"],
                },
                {
                    title: "Si hay ubicacion",
                    items: [
                        "Ruta clara cuando el GPS es fuerte",
                        "Ruta suave cuando el GPS es parcial",
                        "Sin ruta cuando la ubicacion esta desactivada",
                    ],
                },
                {
                    title: "Cuando es publico",
                    items: [
                        "Solo al tocar Publicar",
                        "Crea una pagina publica con URL unica",
                        "Cualquiera con el enlace puede verlo y puede indexarse",
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
            metaDescription: "Um fluxo centrado em fotos com contexto de jornada opcional.",
            title: "Como o MomentBook funciona",
            subtitle: "Comece com fotos e expanda para uma jornada quando quiser.",
            intro: "MomentBook permite comecar com fotos e adicionar tempo e lugar apenas se ajudar.",
            steps: [
                {
                    title: "Escolha fotos primeiro",
                    text: "Filtre por dia ou hora e escolha os momentos que quer guardar.",
                    image: "/screenshots/photos-picker.png",
                    alt: "Seletor de fotos com filtros de dia e hora.",
                },
                {
                    title: "Organize em momentos",
                    text: "Um toque agrupa fotos em pequenos conjuntos que voce pode nomear.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Tela de organizacao de fotos com grade e botao de organizar.",
                },
                {
                    title: "Ver a linha da jornada",
                    text: "Fotos e lugares se ordenam quando voce quiser rever.",
                    image: "/screenshots/journey-timeline.png",
                    alt: "Linha da jornada com lugar, mapa e fotos.",
                },
                {
                    title: "Publique quando quiser",
                    text: "Publicar cria uma pagina que voce pode compartilhar e despublicar.",
                    image: "/screenshots/publish-select.png",
                    alt: "Tela de selecao de publicacao com fotos escolhidas.",
                },
            ],
            details: [
                {
                    title: "Duas formas de comecar",
                    items: [
                        "Comecar so com fotos",
                        "Ou iniciar uma jornada para tempo e lugar",
                    ],
                },
                {
                    title: "O que fica salvo",
                    items: ["Fotos", "Notas curtas", "Horario da captura", "Lugares e rota (se localizacao for permitida)"],
                },
                {
                    title: "Quando ha localizacao",
                    items: [
                        "Rota clara quando o GPS e forte",
                        "Rota suave quando o GPS e parcial",
                        "Sem rota quando a localizacao esta desativada",
                    ],
                },
                {
                    title: "Quando vira publico",
                    items: [
                        "Somente ao tocar em Publicar",
                        "Cria uma pagina publica com URL unica",
                        "Quem tiver o link pode ver e pode ser indexado",
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
            metaDescription: "Un flux centre sur les photos avec contexte de voyage optionnel.",
            title: "Comment fonctionne MomentBook",
            subtitle: "Commencez par les photos, puis etendez au voyage si besoin.",
            intro: "MomentBook vous laisse commencer avec les photos et ajouter temps et lieux seulement si cela aide.",
            steps: [
                {
                    title: "Choisir les photos d'abord",
                    text: "Filtrez par jour ou heure et choisissez les moments a garder.",
                    image: "/screenshots/photos-picker.png",
                    alt: "Selecteur de photos avec filtres jour et heure.",
                },
                {
                    title: "Organiser en moments",
                    text: "Un geste regroupe les photos en petits ensembles que vous pouvez nommer.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Ecran d'organisation de photos avec grille et bouton.",
                },
                {
                    title: "Voir la timeline du voyage",
                    text: "Photos et lieux se rangent quand vous voulez revoir.",
                    image: "/screenshots/journey-timeline.png",
                    alt: "Timeline du voyage avec lieu, carte et photos.",
                },
                {
                    title: "Publier quand vous voulez",
                    text: "Publier cree une page a partager et a depublier.",
                    image: "/screenshots/publish-select.png",
                    alt: "Ecran de selection de publication avec photos choisies.",
                },
            ],
            details: [
                {
                    title: "Deux facons de commencer",
                    items: [
                        "Commencer seulement avec les photos",
                        "Ou demarrer un voyage pour temps et lieux",
                    ],
                },
                {
                    title: "Ce qui est conserve",
                    items: ["Photos", "Notes courtes", "Heure de capture", "Lieux et itineraire (si localisation autorisee)"],
                },
                {
                    title: "Quand il y a la localisation",
                    items: [
                        "Itineraire net quand le GPS est fort",
                        "Itineraire doux quand le GPS est partiel",
                        "Pas d'itineraire si la localisation est desactivee",
                    ],
                },
                {
                    title: "Quand c'est public",
                    items: [
                        "Seulement en touchant Publier",
                        "Cree une page publique avec URL unique",
                        "Toute personne avec le lien peut voir et peut etre indexe",
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
            metaDescription: "โฟลว์แบบรูปก่อน พร้อมบริบททริปที่เลือกได้",
            title: "MomentBook ทํางานอย่างไร",
            subtitle: "เริ่มจากรูป แล้วค่อยขยายเป็นทริปเมื่ออยากได้",
            intro: "MomentBook ให้เริ่มจากรูป และเพิ่มเวลา/สถานที่เฉพาะเมื่อจําเป็น",
            steps: [
                {
                    title: "เลือกรูปก่อน",
                    text: "กรองตามวันหรือเวลา แล้วเลือกรูปที่อยากเก็บไว้",
                    image: "/screenshots/photos-picker.png",
                    alt: "ตัวเลือกรูปพร้อมตัวกรองวันและเวลา",
                },
                {
                    title: "จัดเป็นช่วงเวลา",
                    text: "แตะครั้งเดียวเพื่อรวมเป็นกลุ่มเล็กๆ ที่ตั้งชื่อได้",
                    image: "/screenshots/organize-photos.png",
                    alt: "หน้าจอจัดรูปพร้อมกริดและปุ่มจัดระเบียบ",
                },
                {
                    title: "ดูไทม์ไลน์ทริป",
                    text: "รูปและสถานที่เรียงลําดับเมื่ออยากย้อนดู",
                    image: "/screenshots/journey-timeline.png",
                    alt: "ไทม์ไลน์ทริปพร้อมสถานที่ แผนที่ และรูป",
                },
                {
                    title: "เผยแพร่เมื่อพร้อม",
                    text: "การเผยแพร่สร้างหน้าที่แชร์ได้และยกเลิกได้",
                    image: "/screenshots/publish-select.png",
                    alt: "หน้าจอเลือกเผยแพร่พร้อมรูปที่เลือก",
                },
            ],
            details: [
                {
                    title: "สองวิธีเริ่มต้น",
                    items: [
                        "เริ่มจากรูปอย่างเดียว",
                        "หรือเริ่มทริปเพื่อเก็บเวลาและสถานที่",
                    ],
                },
                {
                    title: "สิ่งที่บันทึก",
                    items: ["รูป", "โน้ตสั้นๆ", "เวลาในการถ่าย", "สถานที่และเส้นทาง (เมื่ออนุญาตตำแหน่ง)"],
                },
                {
                    title: "เมื่อมีตำแหน่ง",
                    items: [
                        "เส้นทางชัดเมื่อ GPS ดี",
                        "เส้นทางนุ่มเมื่อ GPS บางช่วง",
                        "ไม่มีเส้นทางเมื่อปิดตำแหน่ง",
                    ],
                },
                {
                    title: "เมื่อเป็นสาธารณะ",
                    items: [
                        "เฉพาะเมื่อกดเผยแพร่",
                        "สร้างหน้าเว็บสาธารณะพร้อม URL เฉพาะ",
                        "ผู้มีลิงก์ดูได้ และอาจถูกจัดทำดัชนี",
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
            metaDescription: "Luong bat dau tu anh voi boi canh hanh trinh tuy chon.",
            title: "MomentBook hoat dong nhu the nao",
            subtitle: "Bat dau voi anh, mo rong hanh trinh khi can.",
            intro: "MomentBook cho phep bat dau tu anh va chi them thoi gian, dia diem khi can.",
            steps: [
                {
                    title: "Chon anh truoc",
                    text: "Loc theo ngay hoac gio de chon khoanh khac muon giu.",
                    image: "/screenshots/photos-picker.png",
                    alt: "Bo chon anh voi bo loc ngay va gio.",
                },
                {
                    title: "Sap xep thanh khoanh khac",
                    text: "Mot cham gom anh thanh nhom nho co the dat ten.",
                    image: "/screenshots/organize-photos.png",
                    alt: "Man hinh sap xep anh voi luoi va nut sap xep.",
                },
                {
                    title: "Xem timeline hanh trinh",
                    text: "Anh va dia diem sap xep theo thu tu khi muon xem lai.",
                    image: "/screenshots/journey-timeline.png",
                    alt: "Timeline hanh trinh voi dia diem, ban do va anh.",
                },
                {
                    title: "Dang khi san sang",
                    text: "Dang tao trang co the chia se va huy dang.",
                    image: "/screenshots/publish-select.png",
                    alt: "Man hinh chon dang voi cac anh da chon.",
                },
            ],
            details: [
                {
                    title: "Hai cach bat dau",
                    items: [
                        "Bat dau chi tu anh",
                        "Hoac bat dau hanh trinh de gom thoi gian va dia diem",
                    ],
                },
                {
                    title: "Nhung gi duoc luu",
                    items: ["Anh", "Ghi chu ngan", "Thoi gian chup", "Dia diem va tuyen duong (neu cho phep vi tri)"],
                },
                {
                    title: "Khi co vi tri",
                    items: [
                        "Tuyen ro khi GPS tot",
                        "Tuyen mem khi GPS mot phan",
                        "Khong co tuyen khi tat vi tri",
                    ],
                },
                {
                    title: "Khi cong khai",
                    items: [
                        "Chi khi bam Dang",
                        "Tao trang cong khai voi URL rieng",
                        "Nguoi co lien ket co the xem va co the duoc lap chi muc",
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
