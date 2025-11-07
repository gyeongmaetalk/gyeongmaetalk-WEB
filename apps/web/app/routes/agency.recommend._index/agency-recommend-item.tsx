import { useState } from "react";

import { Badge, Button, DragCarousel, DragCarouselItem } from "@gyeongmaetalk/ui";
import { formatPrice } from "@gyeongmaetalk/utils";

import { useNavigate } from "react-router";

import Image from "~/components/image";
import PropertyPaymentModal from "~/components/modal/property-payment-modal";
import type { PropertyListItemProps } from "~/types/property";
import { formatArea, formatDate } from "~/utils/format";

export default function AgencyRecommendItem({
  id,
  address,
  area,
  biddingDate,
  appraisedPrice,
  minPrice,
  images,
  buildingType,
  updateDate,
  isPurchased,
}: PropertyListItemProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const navigate = useNavigate();

  const onRouteToApplyRecommendDetail = (id: number) => {
    // 구매하기 버튼이라면 토스 페이먼츠로 이동
    if (!isPurchased) {
      setIsPaymentModalOpen(true);
      return;
    }
    navigate(`/agency/recommend/${id}`);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Badge size="xs" theme="accent">
            {buildingType}
          </Badge>
          <p className="font-headline1-bold text-label-strong">{address}</p>
          <div className="flex items-center justify-between">
            <p className="font-caption1-regular text-label-alternative">
              {formatDate({ date: updateDate, shortYear: true })} 업데이트 매물
            </p>
            <p className="font-caption1-bold text-primary-normal">
              {isPurchased ? "구매완료" : formatPrice(20000)}
            </p>
          </div>
        </div>
        <DragCarousel>
          {images.map((image) => (
            <DragCarouselItem key={`${id}-${image}`} className="w-4/5">
              <div className="relative overflow-hidden rounded-[12px]">
                <Image src={image} alt="건물 이미지" className="w-full" />
              </div>
            </DragCarouselItem>
          ))}
        </DragCarousel>
        <div className="space-y-0.5">
          <div className="flex">
            <p className="font-caption1-bold w-14">지역</p>
            <p className="font-label2-regular text-label-alternative">{address}</p>
          </div>
          <div className="flex">
            <p className="font-caption1-bold w-14">면적</p>
            <p className="font-label2-regular text-label-alternative">{formatArea(area)}</p>
          </div>
          <div className="flex">
            <p className="font-caption1-bold w-14">입찰일</p>
            <p className="font-label2-regular text-label-alternative">
              {formatDate({ date: biddingDate })}
            </p>
          </div>
          <div className="flex">
            <p className="font-caption1-bold w-14">감정가</p>
            <p className="font-label2-regular text-label-alternative">
              {formatPrice(appraisedPrice, { showUnit: true })}
            </p>
          </div>
          <div className="flex">
            <p className="font-caption1-bold w-14">최저가</p>
            <p className="font-label2-regular text-label-alternative">
              {formatPrice(minPrice, { showUnit: true })}
            </p>
          </div>
        </div>
        <Button
          className="w-full"
          theme={isPurchased ? "assistive" : "default"}
          onClick={() => onRouteToApplyRecommendDetail(id)}
        >
          {isPurchased ? "자세히 보기" : "구매하기"}
        </Button>
      </div>
      {isPaymentModalOpen && (
        <PropertyPaymentModal
          id={id}
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </>
  );
}
