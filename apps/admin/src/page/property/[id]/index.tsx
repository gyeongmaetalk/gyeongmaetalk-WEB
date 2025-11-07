"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import { mockProperties } from "@/mock/properties";
import type { Property } from "@/types";
import { Button, Textarea, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useFieldArray, useForm } from "react-hook-form";

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
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "scheduleInfos",
  });

  // 데이터 로드 여부를 추적하여 중복 reset 방지
  const hasLoadedData = useRef(false);
  const currentIdRef = useRef(id);

  useEffect(() => {
    // id가 변경되었으면 플래그 초기화
    if (currentIdRef.current !== id) {
      hasLoadedData.current = false;
      currentIdRef.current = id;
    }

    // 새 매물이거나 이미 데이터를 로드한 경우에는 실행하지 않음
    if (isNew || hasLoadedData.current) {
      return;
    }

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
      hasLoadedData.current = true;
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
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.buildingType ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.area ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.address ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.appraisedPrice ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.minPrice ? "true" : "false"}
                  />
                )}
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
                    aria-invalid={errors.caseNumber ? "true" : "false"}
                  />
                )}
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
              <Controller
                name="caseTitle"
                control={control}
                render={({ field }) => (
                  <Textfield
                    id="caseTitle"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="사건명을 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="법원명을 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="채무자를 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="채권자를 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="소유자를 입력하세요"
                    disabled={isSubmitting}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="임차인을 입력하세요"
                    disabled={isSubmitting}
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
                        value={field.value || ""}
                        onChange={field.onChange}
                        disabled={isSubmitting}
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
                        value={field.value?.toString() || ""}
                        onChange={(e) => {
                          const numValue = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                          field.onChange(numValue);
                        }}
                        placeholder="최저가를 입력하세요"
                        disabled={isSubmitting}
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
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="예: 예정, 유찰, 낙찰"
                        disabled={isSubmitting}
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
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="전문가 코멘트를 입력하세요"
                  rows={4}
                  disabled={isSubmitting}
                />
              )}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
