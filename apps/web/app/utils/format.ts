export const formatDate = ({
  date,
  withTime,
  shortYear,
}: {
  date: string;
  withTime?: boolean;
  shortYear?: boolean;
}) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const formattedYear = shortYear ? year.toString().slice(2) : year.toString();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hour = dateObj.getHours().toString().padStart(2, "0");
  const minute = dateObj.getMinutes().toString().padStart(2, "0");

  if (withTime) {
    return `${formattedYear}.${month}.${day} ${hour}:${minute}`;
  }

  return `${formattedYear}.${month}.${day}`;
};

export const formatArea = (pyeong: number): string => {
  // 평을 제곱미터로 변환
  const squareMeter = Math.round(pyeong * 3.3058 * 100) / 100;
  return `${squareMeter}㎡ (${pyeong}평)`;
};

export const getTimeDisplay = (date: string) => {
  const now = new Date();
  const createDate = new Date(date);

  const isFuture = createDate.getTime() > now.getTime();
  const suffix = isFuture ? "후" : "전";

  const absDiffMilliseconds = Math.abs(createDate.getTime() - now.getTime());
  const absDiffMinutes = Math.floor(absDiffMilliseconds / (1000 * 60));
  const absDiffHours = Math.floor(absDiffMilliseconds / (1000 * 60 * 60));
  const absDiffDays = Math.floor(absDiffMilliseconds / (1000 * 60 * 60 * 24));
  const absDiffMonths = Math.floor(absDiffDays / 30);
  const absDiffYears = Math.floor(absDiffDays / 365);

  if (absDiffMinutes < 1) {
    return "방금 전";
  }

  if (absDiffHours < 1) {
    return `${absDiffMinutes}분 ${suffix}`;
  }

  if (absDiffDays < 1) {
    return `${absDiffHours}시간 ${suffix}`;
  }

  if (absDiffMonths < 1) {
    return `${absDiffDays}일 ${suffix}`;
  }

  if (absDiffYears < 1) {
    return `${absDiffMonths}달 ${suffix}`;
  }

  return `${absDiffYears}년 ${suffix}`;
};

export const formatCounselDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
};

export const formatCounselTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const maskUserName = (name: string): string => {
  const visiblePart = name.slice(0, 1);
  const maskedPart = "*".repeat(name.length - 1);
  return visiblePart + maskedPart;
};
