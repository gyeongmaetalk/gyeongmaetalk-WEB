import { http, HttpResponse } from "msw";

import { reservedCouselData } from "./data";
import { baseReponse, errorResponse } from "../../response";

export const consultHandlers = [
  // 무료 상담 페이지 - 상담 내역 조회
  http.get("/counsels/:userId", ({ params }) => {
    const { userId } = params;

    if (!userId) {
      return HttpResponse.json(
        errorResponse({ code: 400, message: "Bad Request", error: "사용자 ID는 필수입니다." }),
        { status: 400 }
      );
    }

    return HttpResponse.json(baseReponse(reservedCouselData[0]));
  }),
];
