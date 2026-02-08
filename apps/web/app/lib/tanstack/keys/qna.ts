export const qnaKeys = {
  all: ["qna"] as const,
  getMyQna: () => [...qnaKeys.all, "getMyQna"] as const,
  getFaq: () => [...qnaKeys.all, "getFaq"] as const,
};
