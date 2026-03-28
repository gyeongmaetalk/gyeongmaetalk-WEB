import { useState } from "react";

import { Badge } from "@gyeongmaetalk/ui";
import { cn, formatPrice } from "@gyeongmaetalk/utils";

import { Link } from "react-router";

import Divider from "~/components/divider";
import { Info } from "~/components/icons";
import { CounselStatus } from "~/constants";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";

import CounselorAssignRequireModal from "./counselor-assign-require-modal";
import PaymentCompleteModal from "./payment-complete-modal";

const PACKAGE_LIST = [
  {
    isRecommended: true,
    name: "프리미엄 패키지",
    originalPrice: 400000,
    discountPrice: 387000,
    descriptions: [
      "경매 대행 바로 시작",
      "무료 매물 추천",
      "매물 입찰 대행",
      "추천 매물 열람권 3개",
      "기간 제한 없는 무제한 케어 (낙찰 성공 까지)",
    ],
  },
  {
    isRecommended: false,
    name: "베이직 패키지",
    originalPrice: 330000,
    discountPrice: 329000,
    descriptions: [
      "경매 대행 바로 시작",
      "무료 매물 추천",
      "매물 입찰 대행",
      "추천 매물 열람권 1개",
      "기간 제한 없는 무제한 케어 (낙찰 성공 까지)",
    ],
  },
  {
    isRecommended: false,
    name: "라이트 패키지",
    originalPrice: 300000,
    discountPrice: null,
    descriptions: [
      "경매 대행 바로 시작",
      "무료 매물 추천",
      "매물 입찰 대행",
      "기간 제한 없는 무제한 케어 (낙찰 성공 까지)",
    ],
  },
];

const LINK_LIST = [
  {
    label: "이용 약관",
    to: "/terms-of-service",
  },
  {
    label: "개인정보 처리방침",
    to: "/privacy-policy",
  },
];

export default function PaymentPackagePage() {
  const { data } = useCheckCounselStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 추후 결제 성공 시 띄워주는 모달로 변경하기
  const [isPaymentCompleteModalOpen, setIsPaymentCompleteModalOpen] = useState(false);
  const isCounselorAssigned = data && data.status !== CounselStatus.NONE;

  const onClickPackage = (selectedPackage: (typeof PACKAGE_LIST)[number]) => {
    if (!isCounselorAssigned) {
      setIsModalOpen(true);
      return;
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-6 px-4 py-6">
          <section className="flex flex-col gap-1">
            <p className="font-heading2-bold text-label-strong">
              한번 구매 시 입찰 완료 까지
              <br />
              평생 책임져 드립니다
            </p>
            <p className="font-body2-normal-regular text-label-neutral">
              경매톡과 함께 경매를 진행해 보세요!
            </p>
          </section>
          <section className="flex flex-col gap-4">
            {PACKAGE_LIST.map((p, idx) => (
              <button
                key={p.name}
                className={cn(
                  "border-cool-neutral-50/22 space-y-2 rounded-[12px] border p-3 text-left",
                  idx === 0 && "border-primary-normal bg-primary-normal/3"
                )}
                onClick={() => onClickPackage(p)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {p.isRecommended ? <Badge theme="primary">추천</Badge> : null}
                    <p className="font-label2-medium text-label-strong">{p.name}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p
                      className={cn(
                        p.discountPrice
                          ? "font-caption1-regular text-label-alternative"
                          : "font-body2-normal-bold text-label-normal"
                      )}
                    >
                      {p.discountPrice ? (
                        <span className="line-through">{formatPrice(p.originalPrice)}</span>
                      ) : (
                        formatPrice(p.originalPrice)
                      )}
                    </p>
                    {p.discountPrice ? (
                      <p className="font-body2-normal-bold text-accent-fg-red">
                        {formatPrice(p.discountPrice)}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Divider className="bg-cool-neutral-50/22" />
                <ul className="space-y-1">
                  {p.descriptions.map((d) => (
                    <li
                      key={d}
                      className="font-label2-regular text-label-normal list marker:text-label-assistive ml-3 list-disc"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
            <div className="text-label-neutral font-caption1-regular bg-cool-neutral-99 space-y-2 rounded-md p-4">
              <div className="flex items-center gap-1">
                <Info />
                <p>환불 조건 안내</p>
              </div>
              <p>
                결제 후 7일 이내, 구매하신 상품을 사용하지 않은 경우에 한해 전액 환불이 가능합니다.
                매물 자세히 보기 열람권 등 유료 서비스를 1회라도 이용하신 경우 묶음 판매 특성상 부분
                환불은 불가능합니다.
              </p>
            </div>
          </section>
        </div>
        <section className="mx-auto mt-auto mb-11 w-max space-x-2.5">
          {LINK_LIST.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-label-neutral font-caption2-regular p-2.5 underline"
            >
              {l.label}
            </Link>
          ))}
        </section>
      </div>
      <CounselorAssignRequireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PaymentCompleteModal
        isOpen={isPaymentCompleteModalOpen}
        counselorName={data?.info.counselorName || ""}
      />
    </>
  );
}
