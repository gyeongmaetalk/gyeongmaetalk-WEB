import { useState } from "react";

import { Badge, Spinner } from "@gyeongmaetalk/ui";
import { cn, formatPrice } from "@gyeongmaetalk/utils";

import { Link } from "react-router";

import Divider from "~/components/divider";
import { Info } from "~/components/icons";
import PaymentLoading from "~/components/payments/payment-loading";
import { usePaymentRequest } from "~/hooks/use-payment-request";
import type { ProductListItemProps } from "~/models/product";

import CounselorAssignRequireModal from "./counselor-assign-require-modal";
import PaymentPackageCompleteModal from "./payment-package-complete-modal";

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

const BASE_DESCRIPTIONS = [
  "경매 대행 바로 시작",
  "무료 매물 추천",
  "매물 입찰 대행",
  "기간 제한 없는 무제한 케어 (낙찰 성공 까지)",
];

export default function PaymentPackagePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    products,
    onRequestOrderProduct,
    isPaymentComplete,
    isRequestOrderLoading,
    isCounselorAssigned,
  } = usePaymentRequest("PACKAGE");

  const onClickProduct = async (selectedProduct: ProductListItemProps) => {
    if (!isCounselorAssigned) {
      setIsModalOpen(true);
      return;
    }

    onRequestOrderProduct(selectedProduct);
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
            {products === undefined ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Spinner />
                <p className="font-body2-normal-regular text-label-neutral">
                  상품 정보를 불러오는 중입니다...
                </p>
              </div>
            ) : (
              products.map((p) => (
                <ProductItem key={p.id} product={p} onClick={() => onClickProduct(p)} />
              ))
            )}
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
      <PaymentPackageCompleteModal isOpen={isPaymentComplete} />
      <PaymentLoading isOpen={isRequestOrderLoading} />
    </>
  );
}

interface ProductItemProps {
  product: ProductListItemProps;
  onClick: () => void;
}

function ProductItem({ product, onClick }: ProductItemProps) {
  const viewTicket = product.components.find((c) => c.description.includes("열람권"));
  const viewTicketDescription = viewTicket ? [`추천 매물 열람권 ${viewTicket.quantity}개`] : [];

  return (
    <button
      className={cn(
        "border-cool-neutral-50/22 space-y-2 rounded-[12px] border p-3 text-left",
        product.recommended && "border-primary-normal bg-primary-normal/3"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {product.recommended ? <Badge theme="primary">추천</Badge> : null}
          <p className="font-label2-medium text-label-strong">{product.name}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <p
            className={cn(
              product.price !== null
                ? "font-caption1-regular text-label-alternative"
                : "font-body2-normal-bold text-label-normal"
            )}
          >
            {product.price !== null ? (
              <span className="line-through">{formatPrice(product.originalPrice)}</span>
            ) : (
              formatPrice(product.originalPrice)
            )}
          </p>
          {product.price !== null ? (
            <p className="font-body2-normal-bold text-accent-fg-red">
              {formatPrice(product.price)}
            </p>
          ) : null}
        </div>
      </div>
      <Divider className="bg-cool-neutral-50/22" />
      <ul className="space-y-1">
        {[...BASE_DESCRIPTIONS, ...viewTicketDescription].map((d) => (
          <li
            key={d}
            className="font-label2-regular text-label-normal list marker:text-label-assistive ml-3 list-disc"
          >
            {d}
          </li>
        ))}
      </ul>
    </button>
  );
}
