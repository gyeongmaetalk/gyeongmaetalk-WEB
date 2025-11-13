export interface UpdateReviewRequest {
  score: number;
  content: string;
  imageUrls: string[];
}

export interface CreateReviewRequest extends UpdateReviewRequest {
  consultantId: string;
}

export interface ConsultantReviewListItemDTO {
  reviewId: number;
  name: string;
  createAt: string;
  mine: boolean;
  score: number;
  content: string;
  imageCount: number;
  thumbnail: string;
}

export interface ConsultantReviewListResponse {
  counselorInfo: {
    experience: number;
    name: string;
    counselorImage: string;
  };
  reviews: ConsultantReviewListItemDTO[];
}

export interface ReviewListItemDTO extends ConsultantReviewListItemDTO {
  counselorName: string;
  counselDate: string;
  counselTime: string;
}

export interface ReviewListResponse {
  reviews: ReviewListItemDTO[];
}

export interface ReviewDetailResponse {
  reviewId: number;
  name: string;
  createAt: string;
  counselDate: string;
  counselTime: string;
  mine: boolean;
  score: number;
  content: string;
  images: string[];
  counselorId: number;
  counselorName: string;
  experience: number;
  counselorImage: string;
}

export interface ReviewResponse {
  reviewId: number;
}

export interface ReviewReportRequest extends ReviewResponse {
  body: { reasonType: string; reasonDetail?: string };
}
