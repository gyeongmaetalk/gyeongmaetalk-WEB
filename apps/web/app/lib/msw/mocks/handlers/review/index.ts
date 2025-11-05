import { http, HttpResponse } from "msw";

import { allReviews, consultantReviews, reviewDetails } from "./data";
import { baseReponse, errorResponse, paginationResponse } from "../../response";

export const reviewHandlers = [
  // 상담사 별 리뷰 목록 조회
  http.get("/reviews/list/:consultantId", () => {
    return HttpResponse.json(
      paginationResponse({
        reviews: consultantReviews,
      })
    );
  }),
  // 전체 리뷰 목록 조회
  http.get("/reviews/list", () => {
    return HttpResponse.json(
      paginationResponse({
        reviews: allReviews,
      })
    );
  }),
  // 리뷰 상세 조회
  http.get("/reviews/:reviewId", ({ params }) => {
    const { reviewId } = params;

    if (!reviewId) {
      return HttpResponse.json(
        errorResponse({
          code: 400,
          message: "Bad Request",
          error: "리뷰 ID는 필수입니다.",
        }),
        {
          status: 400,
        }
      );
    }

    const review = reviewDetails.find((review) => review.reviewId === +reviewId);

    if (!review) {
      return HttpResponse.json(
        errorResponse({
          code: 404,
          message: "Not Found",
          error: "리뷰를 찾을 수 없습니다.",
        }),
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(baseReponse(review));
  }),
  // 리뷰 생성
  http.post("/reviews", async ({ request }) => {
    const formData = await request.formData();
    const body: { score: number; content: string; consultantId: string } = JSON.parse(
      formData.get("request") as string
    );

    const createAt = new Date().toISOString();

    const newId = allReviews.length + 1;
    allReviews.push({
      reviewId: newId,
      name: "dkd1234",
      createAt: createAt,
      counselorName: "이정훈",
      counselDateTime: createAt,
      isMine: true,
      score: body.score,
      content: body.content,
      imageCount: 0,
      thumbnail: null,
    });
    consultantReviews.push({
      reviewId: newId,
      name: "dkd1234",
      createAt: createAt,
      isMine: true,
      score: body.score,
      content: body.content,
      imageCount: 0,
      thumbnail: null,
    });
    reviewDetails.push({
      reviewId: newId,
      name: "dkd1234",
      createAt: createAt,
      counselDateTime: createAt,
      isMine: true,
      score: body.score,
      content: body.content,
      images: [],
      counselorId: +body.consultantId,
      counselorName: "이정훈",
      experience: 10,
      counselorImage:
        "https://i.namu.wiki/i/8mcZn4QTDZNSyG5LCLIltEOwSsrMoAG9TKsurgtD2zMPJWqQCYvZUsL_66BkJy3JmN4lhegQHg_A2iGdD-AWLw.webp",
    });

    // 2초 지연 후 응답
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return HttpResponse.json(
      baseReponse({
        reviewId: newId,
      })
    );
  }),
  // 리뷰 수정
  http.patch("/reviews", async ({ request }) => {
    const formData = await request.formData();
    const body: { score: number; content: string; reviewId: string; existingImages: string[] } =
      JSON.parse(formData.get("request") as string);

    // 2초 지연 후 응답
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return HttpResponse.json(
      baseReponse({
        reviewId: body.reviewId,
      })
    );
  }),
  // 리뷰 삭제
  http.delete("/reviews/:reviewId", async ({ params }) => {
    const { reviewId } = params;

    if (!reviewId) {
      return HttpResponse.json(
        errorResponse({
          code: 400,
          message: "Bad Request",
          error: "리뷰 ID는 필수입니다.",
        }),
        {
          status: 400,
        }
      );
    }

    const removeIdx = allReviews.findIndex((review) => review.reviewId === +reviewId);
    if (removeIdx === -1) {
      return HttpResponse.json(
        errorResponse({
          code: 404,
          message: "Not Found",
          error: "리뷰를 찾을 수 없습니다.",
        }),
        {
          status: 404,
        }
      );
    }

    // 2초 지연 후 응답
    await new Promise((resolve) => setTimeout(resolve, 3000));
    allReviews.splice(removeIdx, 1);

    return HttpResponse.json(
      baseReponse({
        reviewId,
      })
    );
  }),
  // 리뷰 신고
  http.post("/reviews/:reviewId/reports", async ({ params }) => {
    const { reviewId } = params;

    if (!reviewId) {
      return HttpResponse.json(
        errorResponse({
          code: 400,
          message: "Bad Request",
          error: "리뷰 ID는 필수입니다.",
        }),
        {
          status: 400,
        }
      );
    }

    // 2초 지연 후 응답
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return HttpResponse.json(
      baseReponse({
        reviewId,
      })
    );
  }),
];
