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
  title: "One flow after every trip",
  lead: "Turn mixed travel photos into one timeline and one map recap.",
  steps: [
    {
      title: "1. Your trip ends",
      detail: "Photos from several days are mixed in one camera roll.",
    },
    {
      title: "2. Upload all travel photos once",
      detail: "Select the whole trip in one batch.",
    },
    {
      title: "3. Auto-organize",
      detail: "Photos are sorted by date and time.",
    },
    {
      title: "4. Manual cleanup",
      detail: "Remove receipts and fix wrongly grouped photos.",
    },
    {
      title: "5. Timeline completed",
      detail: "Your trip becomes one clean sequence.",
    },
    {
      title: "6. Recall with map pins",
      detail: "Pins on the world map show where you traveled.",
    },
  ],
  mapRecapTitle: "Timeline + map",
  mapRecapDetail: "Timeline keeps order. Map pins bring places back to memory.",
};

const coreFlowKo: CoreFlowContent = {
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
};

export function getCoreFlowContent(lang: Language): CoreFlowContent {
  if (lang === "ko") {
    return coreFlowKo;
  }

  return coreFlowEn;
}
