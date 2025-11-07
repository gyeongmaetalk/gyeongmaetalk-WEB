interface FormatPriceOptions {
  showUnit?: boolean;
}

export const formatPrice = (price: number, options: FormatPriceOptions = {}) => {
  const { showUnit = false } = options;

  if (!showUnit || price < 10000) {
    return `${price.toLocaleString("ko-KR")}원`;
  }

  // 1억 이상인 경우
  if (price >= 100000000) {
    const eok = Math.floor(price / 100000000);
    const remainder = price % 100000000;

    const eokFormatted = eok.toLocaleString("ko-KR");

    if (remainder === 0) {
      return `${eokFormatted}억원`;
    } else {
      const man = Math.floor(remainder / 10000);
      const manRemainder = remainder % 10000;

      const manFormatted = man.toLocaleString("ko-KR");
      const manRemainderFormatted = manRemainder.toLocaleString("ko-KR");

      if (manRemainder === 0) {
        return `${eokFormatted}억 ${manFormatted}만원`;
      } else {
        return `${eokFormatted}억 ${manFormatted}만 ${manRemainderFormatted}원`;
      }
    }
  }

  // 1만원 이상 1억 미만인 경우
  const man = Math.floor(price / 10000);
  const remainder = price % 10000;

  const manFormatted = man.toLocaleString("ko-KR");
  const remainderFormatted = remainder.toLocaleString("ko-KR");

  if (remainder === 0) {
    return `${manFormatted}만원`;
  } else {
    return `${manFormatted}만 ${remainderFormatted}원`;
  }
};
