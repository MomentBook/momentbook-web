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

const coreFlowEn: CoreFlowContent = {
  title: "One quiet flow after every trip",
  lead: "MomentBook stays focused on one thing: turn scattered travel photos into a timeline and map you can revisit.",
  steps: [
    {
      title: "1. Your trip ends",
      detail: "You return from a multi-day trip with a mixed camera roll.",
    },
    {
      title: "2. Upload all travel photos in one batch",
      detail: "Select your trip photos at once instead of sorting album by album.",
    },
    {
      title: "3. Auto-organize",
      detail: "MomentBook groups photos by date and time into ordered moments.",
    },
    {
      title: "4. Manual cleanup",
      detail: "Remove receipts and unrelated shots, then adjust wrongly grouped items.",
    },
    {
      title: "5. Timeline completed",
      detail: "Your trip becomes one clean timeline you can scan from start to end.",
    },
    {
      title: "6. Recall with map pins",
      detail: "View pins on the world map and remember where you actually traveled.",
    },
  ],
  mapRecapTitle: "Timeline and map, together",
  mapRecapDetail:
    "The timeline keeps chronological context, while map pins bring back place memory. This is the core MomentBook experience.",
};

const coreFlowKo: CoreFlowContent = {
  title: "여행이 끝난 뒤, 하나의 조용한 흐름",
  lead: "MomentBook은 한 가지에 집중합니다. 흩어진 여행 사진을 타임라인과 지도로 정리해 다시 떠올릴 수 있게 만드는 것.",
  steps: [
    {
      title: "1. 며칠간의 여행이 끝납니다",
      detail: "여러 날에 걸쳐 찍은 사진이 카메라롤에 섞여 있습니다.",
    },
    {
      title: "2. 여행 사진을 한 번에 모두 업로드",
      detail: "앨범별로 나누지 않고 여행 사진을 일괄로 선택합니다.",
    },
    {
      title: "3. 자동 정리",
      detail: "MomentBook이 날짜와 시간 기준으로 사진을 순간 단위로 묶습니다.",
    },
    {
      title: "4. 수동 보정",
      detail: "영수증이나 기타 잘못 분류된 사진을 직접 정리합니다.",
    },
    {
      title: "5. 타임라인 완성",
      detail: "여행의 시작부터 끝까지 한 눈에 읽히는 흐름이 완성됩니다.",
    },
    {
      title: "6. 지도 핀으로 회상",
      detail: "세계 지도에 꽂힌 핀을 보며 어디를 다녀왔는지 자연스럽게 떠올립니다.",
    },
  ],
  mapRecapTitle: "타임라인과 지도의 결합",
  mapRecapDetail:
    "타임라인은 시간의 맥락을, 지도 핀은 장소의 기억을 남깁니다. 이것이 MomentBook의 핵심 경험입니다.",
};

export function getCoreFlowContent(lang: Language): CoreFlowContent {
  if (lang === "ko") {
    return coreFlowKo;
  }

  return coreFlowEn;
}
