import { useEffect, useRef, useState } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import {
  Button,
  Checkbox,
  DragCarousel,
  DragCarouselItem,
  Label,
  Textarea,
} from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import ConsultantReviewCard from "~/components/card/consultant-review-card";
import FloatingContainer from "~/components/container/floating-container";
import Divider from "~/components/divider";
import { Close } from "~/components/icons";
import Image from "~/components/image";
import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import Modal from "~/components/modal";
import StarRating from "~/components/star-rating";
import { REVIEW } from "~/constants";
import { useCreateReview, useUpdateReview } from "~/lib/tanstack/mutation/review";
import { useGetCounselInfo } from "~/lib/tanstack/query/counsel";
import type { ReviewDetailResponse } from "~/models/review";
import {
  type WriteConsultReviewForm,
  writeConsultReviewFormSchema,
} from "~/routes/consult.write/schema";
import { errorToast, infoToast, successToast } from "~/utils/toast";

interface ConsultWriteReviewPageProps {
  review: ReviewDetailResponse | null;
}

const DEFAULT_VALUES = {
  rating: 0,
  content: "",
  images: [],
  isAgree: false,
};

const MAX_IMAGES = 5;
const MIN_CONTENT_LENGTH = 20;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const getRatingText = (rating: number) => {
  if (rating === 1) return "별로에요";
  if (rating === 2) return "그럭저럭 괜찮았어요";
  if (rating === 3) return "보통이에요";
  if (rating === 4) return "아주 만족해요";
  return "훌륭한 경험이었어요!";
};

export default function ConsultWriteReviewPage({ review }: ConsultWriteReviewPageProps) {
  const [searchParams] = useSearchParams();
  const consultantId = searchParams.get("consultantId");
  const reviewId = searchParams.get("reviewId");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const navigate = useNavigate();

  const { data: counselInfoData, isLoading: isCounselInfoLoading } =
    useGetCounselInfo(consultantId);

  const counselorInfo = {
    name: counselInfoData?.name || review?.counselorName || "",
    experience: counselInfoData?.experience || review?.experience || 0,
    counselDate:
      counselInfoData?.counselDate || `${review?.counselDate}T${review?.counselTime}` || "",
    counselorImage: counselInfoData?.counselorImage || review?.counselorImage || "",
  };

  // 리뷰 생성 Mutation
  const { mutateAsync: createReview } = useCreateReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEWS] });
      successToast("리뷰가 등록되었어요.");
      navigate("/consult/reviews");
    },
    onError: (error) => {
      errorToast("리뷰 등록에 실패했어요.");
      console.error(error);
    },
  });

  // 리뷰 수정 Mutation
  const { mutateAsync: updateReview } = useUpdateReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEWS] });
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEW_DETAIL, reviewId] });
      successToast("리뷰가 수정되었어요.");
      navigate(-1);
    },
    onError: (error) => {
      errorToast("리뷰 수정에 실패했어요.");
      console.error(error);
    },
  });

  const form = useForm<WriteConsultReviewForm>({
    resolver: zodResolver(writeConsultReviewFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const rating = form.watch("rating");
  const images = form.watch("images");
  const isAgree = form.watch("isAgree");
  const content = form.watch("content");

  const submitDisabled =
    rating === 0 || content.length < MIN_CONTENT_LENGTH || !isAgree || form.formState.isSubmitting;
  const statusText = reviewId ? "수정" : "작성";

  const onRatingChange = (newRating: number) => {
    if (rating === newRating) return;
    form.setValue("rating", newRating);
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const currentImageCount = images?.length || 0;
    const remainingSlots = MAX_IMAGES - currentImageCount;

    if (files.length > remainingSlots) {
      infoToast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`);
      return;
    }

    form.setValue("images", [...(images || []), ...files]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onRemoveImage = (index: number) => {
    const newImages = [...(images || [])];
    const newPreviewUrls = [...imagePreviewUrls];

    URL.revokeObjectURL(newPreviewUrls[index]);

    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    form.setValue("images", newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const onUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (!consultantId && !reviewId) {
    return <Navigate to="/consult" />;
  }

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.content.trim().length < MIN_CONTENT_LENGTH) {
      errorToast("앞, 뒤 공백 제외 최소 20자 이상 작성해주세요.");
      return;
    }

    const formData = new FormData();
    const request = {
      score: data.rating,
      content: data.content,
    };

    if (reviewId) {
      const existingImages: string[] = [];
      const reviewImages: File[] = [];
      data.images?.forEach((image) => {
        if (image.name.startsWith("https://")) {
          existingImages.push(image.name);
        } else {
          reviewImages.push(image);
        }
      });
      Object.assign(request, { existingImages });
      formData.append("request", JSON.stringify(request));
      if (reviewImages.length > 0) {
        reviewImages.forEach((image) => {
          formData.append("reviewImages", image);
        });
      }
      await updateReview({ formData, reviewId });
      return;
    }
    Object.assign(request, { consultantId });
    formData.append("request", JSON.stringify(request));

    if (data.images) {
      data.images.forEach((image) => {
        formData.append("reviewImages", image);
      });
    }

    await createReview(formData);
  });

  useEffect(() => {
    if (review) {
      form.setValue("rating", review.score);
      form.setValue("content", review.content);
      form.setValue(
        "images",
        review.images.map((image) => new File([image], image))
      );
      setImagePreviewUrls(review.images);
    }
  }, []);

  return (
    <>
      <PageLayout header={<WithBackHeader title={`상담후기 ${statusText}`} />} withFloating>
        <form className="space-y-5 px-4 py-6" onSubmit={onSubmit}>
          {isCounselInfoLoading ? (
            <div className="bg-cool-neutral-98 h-[6.5rem] animate-pulse rounded-lg" />
          ) : (
            <ConsultantReviewCard
              date={counselorInfo.counselDate}
              counselorName={counselorInfo.name}
              experience={counselorInfo.experience}
              counselorImage={counselorInfo.counselorImage}
            />
          )}

          <p className="font-body1-normal-bold">이정훈 상담사와 상담 경험은 어땠나요?</p>
          <div className="flex items-center gap-2">
            <StarRating rating={form.watch("rating")} size="lg" setRating={onRatingChange} />
            {rating > 0 && (
              <p className="text-label-neutral font-label2-regular">{getRatingText(rating)}</p>
            )}
          </div>
          <Divider className="bg-cool-neutral-98" />
          <Textarea
            value={content}
            onChange={(e) => form.setValue("content", e.target.value)}
            label="후기작성"
            placeholder="진행하신 상담 경험을 20자 이상 공유해 주시면, 다른 분들에게 도움이 됩니다."
            minLength={MIN_CONTENT_LENGTH}
            additionalText="최소 20자"
          />
          <div className="flex flex-wrap gap-2">
            {imagePreviewUrls.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={onUploadButtonClick}
                className="border-cool-neutral-50/16 flex size-20 flex-col items-center justify-center gap-1 rounded-lg border"
                aria-label="이미지 업로드"
              >
                <Camera />
                <p className="font-label2-medium text-label-alternative">
                  {imagePreviewUrls.length}/{MAX_IMAGES}
                </p>
              </button>
            )}
            <DragCarousel>
              {imagePreviewUrls.map((url, index) => (
                <DragCarouselItem key={`${url}-${index}`}>
                  <div className="relative">
                    <Image
                      src={url}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className="size-20 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(index)}
                      className="bg-label-neutral absolute top-1 right-1 flex items-center justify-center rounded-full p-1"
                      aria-label={`이미지 ${index + 1} 삭제`}
                    >
                      <Close className="size-4 text-white" />
                    </button>
                  </div>
                </DragCarouselItem>
              ))}
            </DragCarousel>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={onFileSelect}
              className="hidden"
            />
          </div>
          <Divider className="bg-cool-neutral-98" />
          <div className="flex items-center gap-1">
            <Checkbox id="isAgree" {...form.register("isAgree")} />
            <Label htmlFor="isAgree" className="font-body2-normal-regular text-label-alternative">
              작성된 후기는 경매톡의 홍보 및 서비스 개선에 활용될 수 있습니다. (필수)
            </Label>
          </div>
          <FloatingContainer>
            <Button type="submit" className="w-full" disabled={submitDisabled}>
              {statusText}완료
            </Button>
          </FloatingContainer>
        </form>
      </PageLayout>
      {form.formState.isSubmitting && (
        <Modal className="flex flex-col items-center justify-center gap-7 bg-transparent">
          <Loader2 className="size-20 animate-spin text-white" />
          <Modal.Content className="font-heading1-bold text-white">
            리뷰를 {statusText}하고 있어요
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
