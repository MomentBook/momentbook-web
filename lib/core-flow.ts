import { type Language } from "@/lib/i18n/config";

export type CoreFlowStep = {
  title: string;
  detail: string;
};

export type CoreFlowContent = {
  title: string;
  lead: string;
  steps: CoreFlowStep[];
  mapRecapTitle: string;
  mapRecapDetail: string;
};

const coreFlowContentByLanguage: Record<Language, CoreFlowContent> = {
  en: {
    title: "One flow after a trip",
    lead: "Organize mixed travel photos into one timeline and one map recap.",
    steps: [
      {
        title: "1. A multi-day trip ends",
        detail: "Photos from several days are mixed in one camera roll.",
      },
      {
        title: "2. Upload all travel photos at once",
        detail: "Select the full trip in one batch.",
      },
      {
        title: "3. Auto organize",
        detail: "Photos are arranged by date and time.",
      },
      {
        title: "4. Manual cleanup",
        detail: "Remove receipts and correct wrongly grouped photos.",
      },
      {
        title: "5. Timeline completed",
        detail: "The flow of the trip is organized into one line.",
      },
      {
        title: "6. Recall with map pins",
        detail: "Map pins on the world map help you recall places you visited.",
      },
    ],
    mapRecapTitle: "Timeline + Map",
    mapRecapDetail: "The timeline keeps order, and map pins keep place memory.",
  },
  ko: {
    title: "여행 후 하나의 흐름",
    lead: "흩어진 여행 사진을 하나의 타임라인과 지도 회상으로 정리합니다.",
    steps: [
      {
        title: "1. 며칠간의 여행이 끝납니다",
        detail: "여러 날의 사진이 카메라롤에 섞여 있습니다.",
      },
      {
        title: "2. 여행 사진을 한 번에 모두 업로드",
        detail: "여행 사진 전체를 한 번에 선택합니다.",
      },
      {
        title: "3. 자동 정리",
        detail: "날짜와 시간 기준으로 자동 정리합니다.",
      },
      {
        title: "4. 수동 보정",
        detail: "영수증이나 잘못 분류된 사진을 직접 정리합니다.",
      },
      {
        title: "5. 타임라인 완성",
        detail: "여행의 흐름이 한 줄로 완성됩니다.",
      },
      {
        title: "6. 지도 핀으로 회상",
        detail: "세계 지도 핀으로 다녀온 장소를 떠올립니다.",
      },
    ],
    mapRecapTitle: "타임라인 + 지도",
    mapRecapDetail: "타임라인은 순서를, 지도 핀은 장소 기억을 남깁니다.",
  },
  ja: {
    title: "旅行後のひとつの流れ",
    lead: "散らばった旅行写真を、ひとつのタイムラインと地図の回想に整理します。",
    steps: [
      {
        title: "1. 数日間の旅行が終わる",
        detail: "複数日の写真がカメラロールに混ざっています。",
      },
      {
        title: "2. 旅行写真をまとめてアップロード",
        detail: "旅行写真全体を一度に選択します。",
      },
      {
        title: "3. 自動整理",
        detail: "日付と時刻の基準で自動整理します。",
      },
      {
        title: "4. 手動補正",
        detail: "レシートや誤って分類された写真を手動で整えます。",
      },
      {
        title: "5. タイムライン完成",
        detail: "旅行の流れが一本の線でまとまります。",
      },
      {
        title: "6. 地図ピンで回想",
        detail: "世界地図のピンで訪れた場所を思い出せます。",
      },
    ],
    mapRecapTitle: "タイムライン + 地図",
    mapRecapDetail: "タイムラインは順序を、地図ピンは場所の記憶を残します。",
  },
  zh: {
    title: "旅行后的一条固定流程",
    lead: "将分散的旅行照片整理为一条时间线和一次地图回想。",
    steps: [
      {
        title: "1. 多日旅行结束",
        detail: "多天拍摄的照片混在同一个相册中。",
      },
      {
        title: "2. 一次性上传全部旅行照片",
        detail: "一次选择整趟旅行的全部照片。",
      },
      {
        title: "3. 自动整理",
        detail: "按日期和时间自动排序整理。",
      },
      {
        title: "4. 手动修正",
        detail: "手动移除票据等无关照片并修正错误分组。",
      },
      {
        title: "5. 时间线完成",
        detail: "整趟旅行的顺序被整理成一条清晰时间线。",
      },
      {
        title: "6. 通过地图标记回想",
        detail: "通过世界地图上的标记回想你去过的地点。",
      },
    ],
    mapRecapTitle: "时间线 + 地图",
    mapRecapDetail: "时间线保留顺序，地图标记保留地点记忆。",
  },
  es: {
    title: "Un solo flujo después del viaje",
    lead: "Organiza fotos de viaje mezcladas en una línea de tiempo y un repaso en mapa.",
    steps: [
      {
        title: "1. Termina un viaje de varios días",
        detail: "Las fotos de varios días quedan mezcladas en un solo carrete.",
      },
      {
        title: "2. Sube todas las fotos del viaje de una vez",
        detail: "Selecciona todo el viaje en un único lote.",
      },
      {
        title: "3. Organización automática",
        detail: "Las fotos se ordenan por fecha y hora.",
      },
      {
        title: "4. Ajuste manual",
        detail: "Quita recibos y corrige fotos agrupadas de forma incorrecta.",
      },
      {
        title: "5. Línea de tiempo completada",
        detail: "El flujo del viaje queda organizado en una sola secuencia.",
      },
      {
        title: "6. Recuerdo con pines en el mapa",
        detail: "Los pines del mapa mundial te ayudan a recordar los lugares visitados.",
      },
    ],
    mapRecapTitle: "Línea de tiempo + mapa",
    mapRecapDetail: "La línea de tiempo conserva el orden y los pines conservan el lugar.",
  },
  pt: {
    title: "Um fluxo único após a viagem",
    lead: "Organize fotos de viagem misturadas em uma linha do tempo e um recap no mapa.",
    steps: [
      {
        title: "1. Uma viagem de vários dias termina",
        detail: "Fotos de vários dias ficam misturadas em um único rolo da câmera.",
      },
      {
        title: "2. Envie todas as fotos da viagem de uma vez",
        detail: "Selecione toda a viagem em um único lote.",
      },
      {
        title: "3. Organização automática",
        detail: "As fotos são organizadas por data e hora.",
      },
      {
        title: "4. Ajuste manual",
        detail: "Remova recibos e corrija fotos agrupadas incorretamente.",
      },
      {
        title: "5. Linha do tempo concluída",
        detail: "O fluxo da viagem fica organizado em uma sequência única.",
      },
      {
        title: "6. Recordação com pinos no mapa",
        detail: "Os pinos no mapa mundial ajudam a lembrar os lugares visitados.",
      },
    ],
    mapRecapTitle: "Linha do tempo + mapa",
    mapRecapDetail: "A linha mantém a ordem e os pinos mantêm a memória dos lugares.",
  },
  fr: {
    title: "Un seul flux après le voyage",
    lead: "Organisez des photos de voyage mélangées en une timeline et un rappel sur carte.",
    steps: [
      {
        title: "1. Un voyage de plusieurs jours se termine",
        detail: "Les photos de plusieurs jours sont mélangées dans une seule pellicule.",
      },
      {
        title: "2. Importez toutes les photos du voyage en une fois",
        detail: "Sélectionnez l'ensemble du voyage en un seul lot.",
      },
      {
        title: "3. Organisation automatique",
        detail: "Les photos sont classées par date et heure.",
      },
      {
        title: "4. Ajustement manuel",
        detail: "Supprimez les reçus et corrigez les photos mal regroupées.",
      },
      {
        title: "5. Timeline terminée",
        detail: "Le flux du voyage est réuni en une séquence claire.",
      },
      {
        title: "6. Rappel avec les épingles de carte",
        detail: "Les épingles sur la carte du monde vous aident à revoir les lieux visités.",
      },
    ],
    mapRecapTitle: "Timeline + carte",
    mapRecapDetail: "La timeline garde l'ordre, les épingles gardent les souvenirs des lieux.",
  },
  th: {
    title: "หนึ่งโฟลว์หลังจบทริป",
    lead: "จัดรูปทริปที่กระจัดกระจายให้เป็นไทม์ไลน์เดียวและการย้อนดูบนแผนที่",
    steps: [
      {
        title: "1. ทริปหลายวันสิ้นสุดลง",
        detail: "รูปจากหลายวันปะปนอยู่ใน Camera Roll เดียวกัน",
      },
      {
        title: "2. อัปโหลดรูปทริปทั้งหมดครั้งเดียว",
        detail: "เลือกทั้งทริปแบบชุดเดียวได้ในครั้งเดียว",
      },
      {
        title: "3. จัดระเบียบอัตโนมัติ",
        detail: "รูปจะถูกเรียงตามวันที่และเวลาโดยอัตโนมัติ",
      },
      {
        title: "4. ปรับแก้ด้วยตนเอง",
        detail: "ลบรูปใบเสร็จหรือแก้รูปที่ถูกจัดกลุ่มผิด",
      },
      {
        title: "5. ไทม์ไลน์เสร็จสมบูรณ์",
        detail: "ลำดับการเดินทางถูกรวมเป็นเส้นเรื่องเดียว",
      },
      {
        title: "6. ย้อนความทรงจำด้วยหมุดแผนที่",
        detail: "หมุดบนแผนที่โลกช่วยให้นึกถึงสถานที่ที่เคยไป",
      },
    ],
    mapRecapTitle: "ไทม์ไลน์ + แผนที่",
    mapRecapDetail: "ไทม์ไลน์เก็บลำดับ และหมุดแผนที่เก็บความจำของสถานที่",
  },
  vi: {
    title: "Một luồng cố định sau chuyến đi",
    lead: "Sắp xếp ảnh du lịch lẫn lộn thành một timeline và phần hồi tưởng trên bản đồ.",
    steps: [
      {
        title: "1. Kết thúc chuyến đi nhiều ngày",
        detail: "Ảnh của nhiều ngày bị trộn trong cùng một camera roll.",
      },
      {
        title: "2. Tải toàn bộ ảnh chuyến đi một lần",
        detail: "Chọn toàn bộ ảnh chuyến đi trong một lượt.",
      },
      {
        title: "3. Tự động sắp xếp",
        detail: "Ảnh được sắp theo ngày và giờ.",
      },
      {
        title: "4. Chỉnh thủ công",
        detail: "Xóa ảnh biên lai và sửa các nhóm ảnh bị gom sai.",
      },
      {
        title: "5. Hoàn tất timeline",
        detail: "Luồng chuyến đi được gói lại thành một chuỗi rõ ràng.",
      },
      {
        title: "6. Hồi tưởng bằng ghim bản đồ",
        detail: "Ghim trên bản đồ thế giới giúp bạn nhớ lại những nơi đã đi.",
      },
    ],
    mapRecapTitle: "Timeline + bản đồ",
    mapRecapDetail: "Timeline giữ thứ tự, còn ghim bản đồ giữ ký ức về địa điểm.",
  },
};

export function getCoreFlowContent(lang: Language): CoreFlowContent {
  return coreFlowContentByLanguage[lang] ?? coreFlowContentByLanguage.en;
}
