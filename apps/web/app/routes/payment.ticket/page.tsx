import { cn, formatPrice } from "@gyeongmaetalk/utils";

import { Link } from "react-router";

import { Info, Ticket } from "~/components/icons";

const TICKET_LIST = [
  {
    amount: 1,
    originalPrice: 30000,
    discountPrice: null,
  },
  {
    amount: 5,
    originalPrice: 150000,
    discountPrice: 145000,
  },
  {
    amount: 10,
    originalPrice: 300000,
    discountPrice: 270000,
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

export default function PaymentTicketPage() {
  const onClickTicket = (ticket: (typeof TICKET_LIST)[number]) => {
    console.log(ticket);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-10 px-4 py-6">
        <section className="bg-cool-neutral-99 flex flex-col items-center gap-3 rounded-md p-3">
          <div className="flex items-center gap-1">
            <Ticket />
            <p className="text-label-alternative font-label2-bold">잔여 열람권</p>
          </div>
          <p className="font-label1-normal-bold text-label-normal">0개</p>
        </section>
        <section className="space-y-4">
          <p className="font-body2-normal-bold text-label-strong">열람권 구매</p>
          <div className="flex flex-col gap-3">
            {TICKET_LIST.map((p) => (
              <button
                key={p.amount}
                className="border-cool-neutral-50/22 space-y-2 rounded-[12px] border p-3 text-left"
                onClick={() => onClickTicket(p)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Ticket />
                    <p className="font-label2-medium text-label-strong">열람권 {p.amount}개</p>
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
              </button>
            ))}
          </div>
        </section>
        <section className="text-label-neutral font-caption1-regular bg-cool-neutral-99 space-y-2 rounded-md p-4">
          <div className="flex items-center gap-1">
            <Info />
            <p>환불 조건 안내</p>
          </div>
          <p>
            결제 후 7일 이내, 구매하신 상품을 사용하지 않은 경우에 한해 전액 환불이 가능합니다. 매물
            자세히 보기 열람권 등 유료 서비스를 1회라도 이용하신 경우 묶음 판매 특성상 부분 환불은
            불가능합니다.
          </p>
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
  );
}
