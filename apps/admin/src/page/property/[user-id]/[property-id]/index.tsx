"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { PROPERTY } from "@/constants/property";
import {
  useAddProperty,
  useDeleteProperty,
  useUpdateProperty,
} from "@/lib/tanstack/mutation/property";
import { useGetPropertyDetail } from "@/lib/tanstack/query/property";
import { type PropertyForm, propertyFormSchema } from "@/schema/property";
import { uploadImage } from "@/service/image";
import { errorToast, infoToast, successToast } from "@/utils/toast";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import {
  Button,
  DragCarousel,
  DragCarouselItem,
  Spinner,
  Textarea,
  Textfield,
} from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, X } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface PropertyDetailPageProps {
  propertyId: string;
  memberId: number;
}

const DEFAULT_VALUES: PropertyForm = {
  name: "",
  buildingType: "",
  area: 0,
  address: "",
  appraisedPrice: 0,
  minPrice: 0,
  caseNumber: "",
  caseTitle: "",
  courtName: "",
  registrationDate: "",
  commencementDate: "",
  debtor: "",
  creditor: "",
  owner: "",
  tenant: "",
  expertComment: "",
  scheduleInfos: [],
  status: "",
  images: [],
};

const MAX_IMAGES = 10;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const s3BaseUrl = "https://auctiontalk-s3.s3.ap-northeast-2.amazonaws.com";

// URL을 정규화하여 비교하기 위한 함수 (s3BaseUrl과 쿼리 파라미터 제거)
const normalizeImageUrl = (url: string): string => {
  return url.replace(`${s3BaseUrl}/`, "").split("?")[0];
};

export default function PropertyDetailPage({ propertyId, memberId }: PropertyDetailPageProps) {
  const router = useRouter();
  const isNew = propertyId === "new";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageUrlsRef = useRef<string[]>([]);

  const { data: propertyDetail, isLoading } = useGetPropertyDetail(propertyId);

  const { mutateAsync: updateProperty } = useUpdateProperty({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY.DETAIL, propertyId] });
      queryClient.invalidateQueries({ queryKey: [PROPERTY.LIST, memberId] });
      successToast("매물이 수정되었어요.");
      router.back();
    },
    onError: (error) => {
      errorToast("매물 수정에 실패했어요.");
      console.error(error);
    },
  });
  const { mutateAsync: deleteProperty, isPending: isDeleting } = useDeleteProperty({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY.DETAIL, propertyId] });
      queryClient.invalidateQueries({ queryKey: [PROPERTY.LIST, memberId] });
      successToast("매물이 삭제되었어요.");
      router.push(`/property/${memberId}`);
    },
    onError: (error) => {
      errorToast("매물 삭제에 실패했어요.");
      console.error(error);
    },
  });
  const { mutateAsync: addProperty } = useAddProperty({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY.LIST, memberId] });
      successToast("매물이 추가되었어요.");
      router.back();
    },
    onError: (error) => {
      errorToast("매물 추가에 실패했어요.");
      console.error(error);
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<PropertyForm>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const images = watch("images");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "scheduleInfos",
  });

  const isDisabled = isSubmitting || isDeleting;

  const onChnageNumber = (value: string, onChange: (value: number) => void) => {
    if (value === "" || value === null || value === undefined) {
      onChange(0);
      return;
    }

    const numValue = +value;

    if (isNaN(numValue)) {
      onChange(0);
      return;
    }

    onChange(numValue);
  };

  const onRemoveSchedule = (index: number) => {
    remove(index);
  };

  const onSaveProperty = handleSubmit(
    async (data) => {
      const { images, ...restData } = data;

      if (isNew) {
        const body = {
          ...restData,
          imageUrls: data.images.map((url) => normalizeImageUrl(url)),
        };
        await addProperty({ ...body, memberId });
        return;
      }

      // 수정 시 기존 이미지와 새 이미지 분리
      const normalizedCurrentImages = data.images.map((url) => normalizeImageUrl(url));
      const normalizedOriginalImages = originalImageUrlsRef.current.map((url) =>
        normalizeImageUrl(url)
      );

      const remainImageUrls: string[] = [];
      const addImageUrls: string[] = [];

      for (const normalizedUrl of normalizedCurrentImages) {
        if (normalizedOriginalImages.includes(normalizedUrl)) {
          remainImageUrls.push(normalizedUrl);
          continue;
        }
        addImageUrls.push(normalizedUrl);
      }

      const body = {
        ...restData,
        remainImageUrls,
        addImageUrls,
      };

      await updateProperty({
        propertyId,
        body,
      });
    },
    (error) => {
      console.error(error);
    }
  );

  const onCancel = () => {
    router.back();
  };

  const onDeleteProperty = async () => {
    const isConfirmed = confirm("정말로 이 매물을 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }

    await deleteProperty(propertyId);
  };

  useEffect(() => {
    // 새 매물인 경우 기본 폼 값으로 유지
    if (isNew || !propertyDetail) {
      originalImageUrlsRef.current = [];
      return;
    }

    originalImageUrlsRef.current = propertyDetail.images;

    reset(propertyDetail);
  }, [propertyId, isNew, reset, propertyDetail]);

  const onAddSchedule = () => {
    append({
      round: fields.length + 1,
      date: new Date().toISOString().split("T")[0],
      price: 0,
      result: "예정",
    });
  };

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const currentImageCount = images.length;
    const remainingSlots = MAX_IMAGES - currentImageCount;

    if (files.length > remainingSlots) {
      infoToast(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`);
      return;
    }

    try {
      const newImageUrls = await Promise.all(files.map((file) => uploadImage(file, "property")));
      const validUrls = newImageUrls.filter((url) => url !== "");
      setValue("images", [...images, ...validUrls]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      errorToast("이미지 업로드에 실패했어요.");
      console.error(error);
    }
  };

  const onRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setValue("images", newImages);
  };

  if (isLoading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <Spinner className="size-8" />
        <p className="text-muted-foreground">로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isNew ? "매물 추가" : "매물 수정"}
        </h1>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              variant="outlined"
              theme="destructive"
              onClick={onDeleteProperty}
              disabled={isDisabled}
            >
              삭제
            </Button>
          )}
          <Button variant="outlined" onClick={onCancel} disabled={isDisabled}>
            취소
          </Button>
          <Button onClick={onSaveProperty} disabled={isDisabled}>
            {isNew ? "추가" : isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <form onSubmit={onSaveProperty} className="space-y-6">
        {/* 매물 이미지 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">매물 이미지</h3>
          <div className="flex flex-wrap gap-2">
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-cool-neutral-50/16 flex size-60 flex-col items-center justify-center gap-1 rounded-lg border"
                aria-label="이미지 업로드"
                disabled={isDisabled}
              >
                <Camera className="text-label-alternative size-8" />
                <p className="font-body2-normal-bold text-label-alternative">
                  {images.length}/{MAX_IMAGES}
                </p>
              </button>
            )}
            <DragCarousel>
              {images.map((url, index) => (
                <DragCarouselItem key={`${url}-${index}`}>
                  <div className="relative">
                    <Image
                      src={url}
                      alt={`매물 이미지 ${index + 1}`}
                      className="rounded-lg object-cover"
                      width={240}
                      height={240}
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(index)}
                      className="bg-label-neutral absolute top-1 right-1 flex items-center justify-center rounded-full p-1"
                      aria-label={`이미지 ${index + 1} 삭제`}
                      disabled={isDisabled}
                    >
                      <X className="size-4 text-white" />
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
        </div>

        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">기본 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                매물명
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="name"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="매물명을 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.name?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="buildingType" className="text-sm font-medium">
                건물 유형
              </label>
              <Controller
                name="buildingType"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="buildingType"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="예: 아파트, 오피스텔, 상가"
                    disabled={isDisabled}
                    errorText={errors.buildingType?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="area" className="text-sm font-medium">
                면적 (㎡)
              </label>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="area"
                    type="number"
                    step="0.01"
                    value={field.value}
                    onChange={(e) => onChnageNumber(e.target.value, field.onChange)}
                    placeholder="면적을 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.area?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                주소
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="address"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="주소를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.address?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">가격 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="appraisedPrice" className="text-sm font-medium">
                감정가 (원)
              </label>
              <Controller
                name="appraisedPrice"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="appraisedPrice"
                    type="number"
                    value={field.value}
                    onChange={(e) => onChnageNumber(e.target.value, field.onChange)}
                    placeholder="감정가를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.appraisedPrice?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="minPrice" className="text-sm font-medium">
                최저가 (원)
              </label>
              <Controller
                name="minPrice"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="minPrice"
                    type="number"
                    value={field.value}
                    onChange={(e) => onChnageNumber(e.target.value, field.onChange)}
                    placeholder="최저가를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.minPrice?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* 사건 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">사건 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="caseNumber" className="text-sm font-medium">
                사건번호
              </label>
              <Controller
                name="caseNumber"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="caseNumber"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="사건번호를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.caseNumber?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="caseTitle" className="text-sm font-medium">
                사건명
              </label>
              <Controller
                name="caseTitle"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="caseTitle"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="사건명을 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.caseTitle?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="courtName" className="text-sm font-medium">
                법원명
              </label>
              <Controller
                name="courtName"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="courtName"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="법원명을 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.courtName?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="registrationDate" className="text-sm font-medium">
                접수일
              </label>
              <Controller
                name="registrationDate"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="registrationDate"
                    type="date"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isDisabled}
                    errorText={errors.registrationDate?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="commencementDate" className="text-sm font-medium">
                개시결정일
              </label>
              <Controller
                name="commencementDate"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="commencementDate"
                    type="date"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isDisabled}
                    errorText={errors.commencementDate?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                상태
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="status"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="상태를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.status?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* 권리관계 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">권리관계</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="debtor" className="text-sm font-medium">
                채무자
              </label>
              <Controller
                name="debtor"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="debtor"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="채무자를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.debtor?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="creditor" className="text-sm font-medium">
                채권자
              </label>
              <Controller
                name="creditor"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="creditor"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="채권자를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.creditor?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="owner" className="text-sm font-medium">
                소유자
              </label>
              <Controller
                name="owner"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="owner"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="소유자를 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.owner?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tenant" className="text-sm font-medium">
                임차인
              </label>
              <Controller
                name="tenant"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="tenant"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="임차인을 입력하세요"
                    disabled={isDisabled}
                    errorText={errors.tenant?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* 입찰 일정 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">입찰 일정</h3>
            <Button
              type="button"
              size="sm"
              variant="outlined"
              onClick={onAddSchedule}
              disabled={isDisabled}
            >
              일정 추가
            </Button>
          </div>
          {fields.length === 0 && (
            <p className="text-muted-foreground text-sm">입찰 일정이 없습니다.</p>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className="border-cool-neutral-95 space-y-2 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{index + 1}차 입찰</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outlined"
                  onClick={() => onRemoveSchedule(index)}
                  disabled={isDisabled}
                >
                  삭제
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">매각기일</label>
                  <Controller
                    name={`scheduleInfos.${index}.date`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        type="date"
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isDisabled}
                        errorText={errors.scheduleInfos?.[index]?.date?.message}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">최저가 (원)</label>
                  <Controller
                    name={`scheduleInfos.${index}.price`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        type="number"
                        value={field.value}
                        onChange={(e) => onChnageNumber(e.target.value, field.onChange)}
                        placeholder="최저가를 입력하세요"
                        disabled={isDisabled}
                        errorText={errors.scheduleInfos?.[index]?.price?.message}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">결과</label>
                  <Controller
                    name={`scheduleInfos.${index}.result`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="예: 예정, 유찰, 낙찰"
                        disabled={isDisabled}
                        errorText={errors.scheduleInfos?.[index]?.result?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 전문가 코멘트 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">전문가 코멘트</h3>
          <div className="space-y-2">
            <Controller
              name="expertComment"
              control={control}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="전문가 코멘트를 입력하세요"
                  rows={4}
                  disabled={isDisabled}
                  errorText={errors.expertComment?.message}
                />
              )}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
