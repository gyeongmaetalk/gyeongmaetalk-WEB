"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { mockProperties } from "@/mock/properties";
import type { Property } from "@/types";
import { Button, Textarea, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm } from "react-hook-form";

import { type PropertyForm, propertyFormSchema } from "./schema";

// 추후 tanstack query로 교체
const isLoading = false;

const DEFAULT_VALUES: PropertyForm = {
  name: "",
  buildingType: "",
  area: "",
  address: "",
  appraisedPrice: "",
  minPrice: "",
  caseNumber: "",
  caseTitle: "",
  courtName: "",
  registrationDate: "",
  commencementDate: "",
  status: "",
  debtor: "",
  creditor: "",
  owner: "",
  tenant: "",
  expertComment: "",
  scheduleInfos: [],
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "scheduleInfos",
  });

  useEffect(() => {
    if (!isNew) {
      // TODO: API 호출로 매물 데이터 가져오기
      const property = mockProperties.find((p) => p.propertyId === id);
      if (property) {
        reset({
          name: property.name,
          buildingType: property.buildingType,
          area: property.area.toString(),
          address: property.address,
          appraisedPrice: property.appraisedPrice.toString(),
          minPrice: property.minPrice.toString(),
          caseNumber: property.caseNumber,
          caseTitle: property.caseTitle,
          courtName: property.courtName,
          registrationDate: property.registrationDate.split("T")[0],
          commencementDate: property.commencementDate.split("T")[0],
          status: property.status,
          debtor: property.debtor,
          creditor: property.creditor,
          owner: property.owner,
          tenant: property.tenant,
          expertComment: property.expertComment,
          scheduleInfos: property.scheduleInfos.map((schedule) => ({
            ...schedule,
            date: schedule.date.split("T")[0],
            price: schedule.price,
          })),
        });
      }
    }
  }, [id, isNew, reset]);

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

  const onSaveProperty = handleSubmit(async (data) => {
    // 데이터 변환
    const propertyData: Omit<Property, "propertyId"> = {
      name: data.name.trim(),
      buildingType: data.buildingType.trim(),
      area: parseFloat(data.area),
      address: data.address.trim(),
      appraisedPrice: parseInt(data.appraisedPrice.replace(/,/g, ""), 10),
      minPrice: parseInt(data.minPrice.replace(/,/g, ""), 10),
      caseNumber: data.caseNumber.trim(),
      caseTitle: data.caseTitle?.trim() || "",
      courtName: data.courtName?.trim() || "",
      registrationDate: data.registrationDate
        ? new Date(data.registrationDate + "T00:00:00").toISOString()
        : new Date().toISOString(),
      commencementDate: data.commencementDate
        ? new Date(data.commencementDate + "T00:00:00").toISOString()
        : new Date().toISOString(),
      status: data.status?.trim() || "진행중",
      scheduleInfos: data.scheduleInfos.map((schedule, index) => ({
        round: index + 1,
        date: new Date(schedule.date + "T00:00:00").toISOString(),
        price:
          typeof schedule.price === "string"
            ? parseInt(String(schedule.price).replace(/,/g, ""), 10)
            : schedule.price,
        result: schedule.result,
      })),
      debtor: data.debtor?.trim() || "",
      creditor: data.creditor?.trim() || "",
      owner: data.owner?.trim() || "",
      tenant: data.tenant?.trim() || "",
      expertComment: data.expertComment?.trim() || "",
      images: [],
      updateDate: new Date().toISOString(),
      purchased: false,
    };

    // TODO: API 호출 - propertyData를 사용하여 저장
    console.log("Property data to save:", propertyData);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 저장 후 목록 페이지로 이동
    router.push("/property");
  });

  const onCancel = () => {
    router.push("/property");
  };

  if (isLoading) {
    return (
      <main>
        <div className="flex h-screen items-center">
          <p className="text-muted-foreground mx-auto">로딩 중...</p>
        </div>
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
          <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={onSaveProperty} disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장"}
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
                매물명 *
              </label>
              <Textfield
                id="name"
                {...register("name")}
                placeholder="매물명을 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="buildingType" className="text-sm font-medium">
                건물 유형 *
              </label>
              <Textfield
                id="buildingType"
                {...register("buildingType")}
                placeholder="예: 아파트, 오피스텔, 상가"
                disabled={isSubmitting}
                aria-invalid={errors.buildingType ? "true" : "false"}
              />
              {errors.buildingType && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.buildingType.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="area" className="text-sm font-medium">
                면적 (㎡) *
              </label>
              <Textfield
                id="area"
                type="number"
                step="0.01"
                {...register("area")}
                placeholder="면적을 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.area ? "true" : "false"}
              />
              {errors.area && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.area.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                주소 *
              </label>
              <Textfield
                id="address"
                {...register("address")}
                placeholder="주소를 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">가격 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="appraisedPrice" className="text-sm font-medium">
                감정가 (원) *
              </label>
              <Textfield
                id="appraisedPrice"
                {...register("appraisedPrice")}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setValue("appraisedPrice", numericValue, { shouldValidate: true });
                }}
                placeholder="감정가를 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.appraisedPrice ? "true" : "false"}
              />
              {errors.appraisedPrice && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.appraisedPrice.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="minPrice" className="text-sm font-medium">
                최저가 (원) *
              </label>
              <Textfield
                id="minPrice"
                {...register("minPrice")}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setValue("minPrice", numericValue, { shouldValidate: true });
                }}
                placeholder="최저가를 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.minPrice ? "true" : "false"}
              />
              {errors.minPrice && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.minPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 사건 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">사건 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="caseNumber" className="text-sm font-medium">
                사건번호 *
              </label>
              <Textfield
                id="caseNumber"
                {...register("caseNumber")}
                placeholder="사건번호를 입력하세요"
                disabled={isSubmitting}
                aria-invalid={errors.caseNumber ? "true" : "false"}
              />
              {errors.caseNumber && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.caseNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="caseTitle" className="text-sm font-medium">
                사건명
              </label>
              <Textfield
                id="caseTitle"
                {...register("caseTitle")}
                placeholder="사건명을 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="courtName" className="text-sm font-medium">
                법원명
              </label>
              <Textfield
                id="courtName"
                {...register("courtName")}
                placeholder="법원명을 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                현재 상태
              </label>
              <Textfield
                id="status"
                {...register("status")}
                placeholder="예: 진행중, 완료"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="registrationDate" className="text-sm font-medium">
                접수일
              </label>
              <Textfield
                id="registrationDate"
                type="date"
                {...register("registrationDate")}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="commencementDate" className="text-sm font-medium">
                개시결정일
              </label>
              <Textfield
                id="commencementDate"
                type="date"
                {...register("commencementDate")}
                disabled={isSubmitting}
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
              <Textfield
                id="debtor"
                {...register("debtor")}
                placeholder="채무자를 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="creditor" className="text-sm font-medium">
                채권자
              </label>
              <Textfield
                id="creditor"
                {...register("creditor")}
                placeholder="채권자를 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="owner" className="text-sm font-medium">
                소유자
              </label>
              <Textfield
                id="owner"
                {...register("owner")}
                placeholder="소유자를 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tenant" className="text-sm font-medium">
                임차인
              </label>
              <Textfield
                id="tenant"
                {...register("tenant")}
                placeholder="임차인을 입력하세요"
                disabled={isSubmitting}
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
                  <Textfield
                    type="date"
                    {...register(`scheduleInfos.${index}.date`)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">최저가 (원)</label>
                  <Textfield
                    value={watch(`scheduleInfos.${index}.price`)?.toString() || ""}
                    onChange={(e) => {
                      const numValue = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                      setValue(`scheduleInfos.${index}.price`, numValue, { shouldValidate: true });
                    }}
                    placeholder="최저가를 입력하세요"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">결과</label>
                  <Textfield
                    {...register(`scheduleInfos.${index}.result`)}
                    placeholder="예: 예정, 유찰, 낙찰"
                    disabled={isSubmitting}
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
            <Textarea
              {...register("expertComment")}
              placeholder="전문가 코멘트를 입력하세요"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
