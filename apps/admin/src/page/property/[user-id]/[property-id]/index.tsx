"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { PROPERTY } from "@/constants/property";
import { useUpdateProperty } from "@/lib/tanstack/mutation/payment";
import { useGetPropertyDetail } from "@/lib/tanstack/query/property";
import { type PropertyForm, propertyFormSchema } from "@/schema/property";
import { errorToast } from "@/utils/toast";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Spinner, Textarea, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useFieldArray, useForm } from "react-hook-form";

interface PropertyDetailPageProps {
  propertyId: string;
  memberId: number;
}

const DEFAULT_VALUES = {
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
};

export default function PropertyDetailPage({ propertyId, memberId }: PropertyDetailPageProps) {
  const router = useRouter();
  const isNew = propertyId === "new";

  const { data: propertyDetail, isLoading } = useGetPropertyDetail(propertyId);
  const { mutateAsync: updateProperty } = useUpdateProperty({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY.DETAIL, propertyId] });
      queryClient.invalidateQueries({ queryKey: [PROPERTY.LIST, memberId] });
      router.back();
    },
    onError: (error) => {
      errorToast("매물 수정에 실패했어요.");
      console.error(error);
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    control,
  } = useForm<PropertyForm>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "scheduleInfos",
  });

  useEffect(() => {
    // 새 매물인 경우 기본 폼 값으로 유지
    if (isNew || !propertyDetail) {
      return;
    }

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

  const onRemoveSchedule = (index: number) => {
    remove(index);
  };

  const onSaveProperty = handleSubmit(
    async (data) => {
      if (isNew) {
        // TODO: 매물 추가 API 호출
        return;
      }

      await updateProperty({
        propertyId,
        body: data,
      });
    },
    (error) => {
      console.error(error);
    }
  );

  const onCancel = () => {
    router.push("/property");
  };

  const onDeleteProperty = () => {
    // TODO: 매물 삭제 API 호출
    if (confirm("정말로 이 매물을 삭제하시겠습니까?")) {
      // 삭제 로직
    }
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
              disabled={isSubmitting}
            >
              삭제
            </Button>
          )}
          <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={onSaveProperty} disabled={isSubmitting}>
            {isNew ? "추가" : isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <form onSubmit={onSaveProperty} className="space-y-6">
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    onChange={field.onChange}
                    placeholder="면적을 입력하세요"
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    value={field.value}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      field.onChange(numericValue);
                    }}
                    placeholder="감정가를 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      field.onChange(numericValue);
                    }}
                    placeholder="최저가를 입력하세요"
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        value={field.value?.toString()}
                        onChange={(e) => {
                          const numValue = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                          field.onChange(numValue);
                        }}
                        placeholder="최저가를 입력하세요"
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
