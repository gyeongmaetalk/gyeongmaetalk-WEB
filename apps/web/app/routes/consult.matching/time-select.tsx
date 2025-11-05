import { cn } from "@gyeongmaetalk/utils";

interface TimeSelectProps {
  selectedDate: Date;
  selectedTime: string;
  availableTimes: string[];
  onTimeSelect: (time: string) => void;
}

interface TimeSlot {
  time: string;
  label: string;
}

// TODO: 시간 슬롯 백엔드와 논의 후 로직 수정하기

// 오전 시간 슬롯 (10:00 ~ 11:30)
const morningSlots: TimeSlot[] = [
  { time: "10:00:00", label: "10:00" },
  { time: "10:30:00", label: "10:30" },
  { time: "11:00:00", label: "11:00" },
  { time: "11:30:00", label: "11:30" },
];

// 오후 시간 슬롯 (13:00 ~ 20:30)
const afternoonSlots: TimeSlot[] = [
  { time: "13:00:00", label: "1:00" },
  { time: "13:30:00", label: "1:30" },
  { time: "14:00:00", label: "2:00" },
  { time: "14:30:00", label: "2:30" },
  { time: "15:00:00", label: "3:00" },
  { time: "15:30:00", label: "3:30" },
  { time: "16:00:00", label: "4:00" },
  { time: "16:30:00", label: "4:30" },
  { time: "17:00:00", label: "5:00" },
  { time: "17:30:00", label: "5:30" },
  { time: "18:00:00", label: "6:00" },
  { time: "18:30:00", label: "6:30" },
  { time: "19:00:00", label: "7:00" },
  { time: "19:30:00", label: "7:30" },
  { time: "20:00:00", label: "8:00" },
  { time: "20:30:00", label: "8:30" },
];

const TimeSelect = ({
  selectedDate,
  selectedTime,
  availableTimes,
  onTimeSelect,
}: TimeSelectProps) => {
  const isSelected = (time: string) => {
    return selectedTime === time;
  };

  const onTimeClick = (time: string) => {
    onTimeSelect(time);
  };

  const isAvailableTime = (time: string) => {
    return availableTimes.includes(time);
  };

  const isPastTime = (time: string) => {
    const now = new Date();
    const timeDate = new Date(
      `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()} ${time}`
    );

    return timeDate.getTime() < now.getTime();
  };

  const renderTimeSlots = (slots: TimeSlot[]) => {
    return (
      <div className="font-body2-normal-medium text-label-neutral grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => onTimeClick(slot.time)}
            disabled={isPastTime(slot.time) || !isAvailableTime(slot.time)}
            className={cn(
              "rounded-lg px-4 py-3 text-center transition-colors",
              "border-cool-neutral-50/16 border bg-white",
              isSelected(slot.time) && "bg-primary-normal border-primary-normal text-white",
              (isPastTime(slot.time) || !isAvailableTime(slot.time)) && "text-label-disable"
            )}
            aria-label={`${slot.label} 선택`}
          >
            <span>{slot.label}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 오전 섹션 */}
      <div className="space-y-3">
        <h3 className="font-body2-normal-medium">오전</h3>
        {renderTimeSlots(morningSlots)}
      </div>

      {/* 오후 섹션 */}
      <div className="space-y-3">
        <h3 className="font-body2-normal-medium">오후</h3>
        {renderTimeSlots(afternoonSlots)}
      </div>
    </div>
  );
};

export default TimeSelect;
