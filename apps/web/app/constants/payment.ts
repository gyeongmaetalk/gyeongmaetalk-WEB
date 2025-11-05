export const PAYMENT_FAIL_CODES = {
  /** 구매자에 의해 결제가 취소됨 */
  PAY_PROCESS_CANCELED: {
    code: "PAY_PROCESS_CANCELED",
    message: "사용자에 의해 결제가 취소되었습니다.",
  },
  /** 결제가 실패함 */
  PAY_PROCESS_ABORTED: {
    code: "PAY_PROCESS_ABORTED",
    message: "결제 진행 중 승인에 실패하여 결제가 중단되었습니다.",
  },
  /** 카드 발급사에 의해 결제가 거절됨 */
  REJECT_CARD_COMPANY: {
    code: "REJECT_CARD_COMPANY	",
    message: "결제 승인이 거절되었습니다.",
  },
};
