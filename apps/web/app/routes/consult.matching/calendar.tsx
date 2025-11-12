import { useState } from "react";

import { cn } from "@gyeongmaetalk/utils";

import Back from "~/components/icons/Back";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect(date: Date): void;
}

const today = new Date();
const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
const DAYS_IN_WEEK = 7;
const maxSelectableDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

const getDaysInMonth = (date: Date): (Date | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];

  // 월요일 시작 기준으로 첫 번째 날의 요일 계산 (월=0, 화=1, ..., 일=6)
  const firstDayOfWeek = firstDay.getDay();
  const mondayOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // 이전 달 빈 공간
  for (let i = 0; i < mondayOffset; i++) {
    days.push(null);
  }

  // 현재 달 날짜들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // 실제 필요한 주 수 계산
  const totalDays = days.length;
  const weeksNeeded = Math.ceil(totalDays / DAYS_IN_WEEK);
  const totalDaysNeeded = weeksNeeded * DAYS_IN_WEEK;
  const remainingSlots = totalDaysNeeded - totalDays;

  // 다음 달 빈 공간 (7의 배수로 맞추기)
  for (let i = 0; i < remainingSlots; i++) {
    days.push(null);
  }

  return days;
};

const isToday = (date: Date): boolean => {
  return date.toDateString() === today.toDateString();
};

const isPastDate = (date: Date): boolean => {
  return date.getTime() < today.getTime() && !isToday(date);
};

const isAfterMaxSelectableDate = (date: Date): boolean => {
  return date.getTime() > maxSelectableDate.getTime();
};

const Calendar = ({ onDateSelect, selectedDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(today);

  const isPreviousMonthDisabled =
    currentDate.getMonth() <= today.getMonth() && currentDate.getFullYear() <= today.getFullYear();
  const isNextMonthDisabled =
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getTime() >
    maxSelectableDate.getTime();
  const days = getDaysInMonth(currentDate);

  const onPreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const onNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const onDateClick = (date: Date) => {
    onDateSelect?.(date);
  };

  const isSelected = (date: Date): boolean => {
    return date.toDateString() === selectedDate?.toDateString();
  };

  const formatMonthYear = (date: Date): string => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 py-2.5">
        <button onClick={onPreviousMonth} aria-label="이전 달" disabled={isPreviousMonthDisabled}>
          <Back
            className={cn(
              isPreviousMonthDisabled ? "text-label-disable" : "text-label-alternative"
            )}
          />
        </button>
        <h2 className="font-headline2-bold">{formatMonthYear(currentDate)}</h2>
        <button onClick={onNextMonth} aria-label="다음 달" disabled={isNextMonthDisabled}>
          <Back
            className={cn(
              "rotate-180",
              isNextMonthDisabled ? "text-label-disable" : "text-label-alternative"
            )}
          />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="font-label2-normal grid grid-cols-7 py-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="font-body1-normal grid grid-cols-7">
        {days.map((date, index) => (
          <button
            key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${index}`}
            onClick={() => date && onDateClick(date)}
            disabled={!date || isPastDate(date) || isAfterMaxSelectableDate(date)}
            className={cn(
              "aspect-square rounded-md py-1.5 transition-colors",
              date && isToday(date) && "text-primary-normal",
              date && isSelected(date) && "bg-primary-normal font-semi-bold text-white",
              date && (isPastDate(date) || isAfterMaxSelectableDate(date)) && "text-label-disable"
            )}
            aria-label={
              date
                ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
                : "빈 날짜"
            }
          >
            {date && (
              <>
                <p className={cn(!isToday(date) && "mb-4")}>{date.getDate()}</p>
                {isToday(date) && <p className="font-caption2-regular">오늘</p>}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
