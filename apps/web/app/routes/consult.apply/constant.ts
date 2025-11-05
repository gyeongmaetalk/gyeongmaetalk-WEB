export const PURPOSE_OPTIONS = [
  "실거주를 위한 집을 사고 싶어요",
  "투자 목적이에요",
  "아직 잘 모르겠어요",
];

export const REGION_OPTIONS = ["수도권", "지방 광역시", "아직 잘 모르겠어요", "직접 입력"];

export const SERVICE_OPTIONS = [
  "서류 준비",
  "낙찰부터 명도까지 전반적으로 도와주세요",
  "경매 전략 컨설팅을 받고 싶어요",
  "잘 모르겠어요. 관련해서 설명을 듣고 싶어요",
];

export const CATEGORY_OPTIONS = [
  "상가/빌딩 경매",
  "아파트 경매",
  "유치권/임차권 등 권리 분석",
  "낙찰 후 명도",
  "아직 잘 모르겠어요",
];

export const LAST_STEP_OPTIONS = [
  {
    value: "personal",
    label: "개인",
    options: [
      {
        value: "personal-business",
        label: "감면 목적 등으로\n개인 사업자로 진행을 고려 중이에요",
      },
      {
        value: "personal-business-no",
        label: "개인 사업자 진행은 계획이 없어요",
      },
    ],
  },
  {
    value: "company",
    label: "법인",
  },
  {
    value: "unknown",
    label: "아직 정하지 못했어요",
  },
];
