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
  const diffTime = createDate.getTime() - now.getTime();
  const isFuture = diffTime > 0;
  const absDiffTime = Math.abs(diffTime);

  const diffMinutes = Math.floor(absDiffTime / (1000 * 60));
  const diffHours = Math.floor(absDiffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(absDiffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const suffix = isFuture ? "후" : "전";

  // 어제/내일 (24시간 ~ 48시간)
  if (diffHours >= 24 && diffHours <= 48) {
    return isFuture ? "내일" : "어제";
  }

  // 하루 이내 (24시간 이내)
  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 ${suffix}`;
    }
    return `${diffHours}시간 ${suffix}`;
  }

  // 그 이전/이후 시간
  if (diffYears >= 1) {
    return `${diffYears}년 ${suffix}`;
  }

  if (diffMonths >= 1) {
    return `${diffMonths}달 ${suffix}`;
  }

  return `${diffDays}일 ${suffix}`;
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
  if (name.length <= 4) return name;
  const visiblePart = name.slice(0, 4);
  const maskedPart = "*".repeat(name.length - 4);
  return visiblePart + maskedPart;
};
