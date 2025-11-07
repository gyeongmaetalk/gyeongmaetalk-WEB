import { PaymentMethod, PaymentStatus, PaymentType } from "@/constants/payment";
import type { Payment } from "@/types";

const date = new Date("2025-11-06T10:00:00.000Z");
const now = date.getTime();

export const mockPayments: Payment[] = [
  {
    paymentId: "pay-001",
    type: PaymentType.SUBSCRIPTION,
    status: PaymentStatus.SUCCESS,
    amount: 300000,
    paidAtIso: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    userName: "김철수",
    userPhone: "010-1234-5678",
    paymentMethod: PaymentMethod.CARD,
  },
  {
    paymentId: "pay-002",
    type: PaymentType.PAYMENT,
    status: PaymentStatus.SUCCESS,
    amount: 20000,
    paidAtIso: new Date(now - 1000 * 60 * 60 * 12).toISOString(),
    userName: "이영희",
    userPhone: "010-2222-3333",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
  },
  {
    paymentId: "pay-003",
    type: PaymentType.SUBSCRIPTION,
    status: PaymentStatus.READY,
    amount: 300000,
    paidAtIso: new Date(now - 1000 * 60 * 60 * 6).toISOString(),
    userName: "박민수",
    userPhone: "010-4444-5555",
    paymentMethod: PaymentMethod.VIRTUAL_ACCOUNT,
  },
  {
    paymentId: "pay-004",
    type: PaymentType.PAYMENT,
    status: PaymentStatus.FAIL,
    amount: 20000,
    paidAtIso: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
    userName: "최지영",
    userPhone: "010-6666-7777",
    paymentMethod: PaymentMethod.CARD,
  },
  {
    paymentId: "pay-005",
    type: PaymentType.SUBSCRIPTION,
    status: PaymentStatus.SUCCESS,
    amount: 300000,
    paidAtIso: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
    userName: "정수진",
    userPhone: "010-8888-9999",
    paymentMethod: PaymentMethod.MOBILE,
  },
  {
    paymentId: "pay-006",
    type: PaymentType.PAYMENT,
    status: PaymentStatus.SUCCESS,
    amount: 20000,
    paidAtIso: new Date(now - 1000 * 60 * 30).toISOString(),
    userName: "홍길동",
    userPhone: "010-1111-2222",
    paymentMethod: PaymentMethod.CARD,
  },
];

