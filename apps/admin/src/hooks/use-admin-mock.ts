"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CounselStatus } from "@/constants/counsel";
import type { Reservation } from "@/types";

import { mockReservations } from "../mock/bookings";

interface UseAdminMockResult {
  reservations: Reservation[];
  updateStatus: (reservationId: string, next: CounselStatus) => void;
}

export function useAdminMock(): UseAdminMockResult {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);

  const updateStatus = useCallback((reservationId: string, next: CounselStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.reservationId === reservationId ? { ...r, status: next } : r))
    );
  }, []);

  // 자동 완료 규칙: 승인 상태이고 예정 시간이 지났다면 completed로 마킹 (데모 용)
  useEffect(() => {
    const id = setInterval(() => {
      setReservations((prev) =>
        prev.map((r) =>
          new Date(r.scheduledAtIso).getTime() < Date.now() && r.status === CounselStatus.SUBSCRIBE
            ? { ...r, status: CounselStatus.NONE }
            : r
        )
      );
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => ({ reservations, updateStatus }), [reservations, updateStatus]);
}
