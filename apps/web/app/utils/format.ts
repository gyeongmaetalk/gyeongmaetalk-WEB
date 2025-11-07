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
  const diffTime = now.getTime() - createDate.getTime();

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // 하루 이내 (24시간 이내)
  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    }
    return `${diffHours}시간 전`;
  }

  // 어제 (24시간 ~ 48시간 전)
  if (diffHours < 48) {
    const hours = createDate.getHours();
    const minutes = createDate.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours <= 12 ? hours : hours - 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `어제 ${period} ${displayHours}:${displayMinutes}`;
  }

  // 그 이전 시간
  if (diffYears >= 1) {
    return `${diffYears}년 전`;
  }

  if (diffMonths >= 1) {
    return `${diffMonths}달 전`;
  }

  return `${diffDays}일 전`;
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
