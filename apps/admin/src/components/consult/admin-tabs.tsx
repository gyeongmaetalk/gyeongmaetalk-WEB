"use client";

import { useMemo, useState } from "react";

import { useAdminMock } from "@/hooks/use-admin-mock";
import type { Reservation } from "@/types";

import type { BookingFiltersValue } from "./booking-filters";
import BookingFilters from "./booking-filters";
import BookingTable from "./booking-table";

export default function AdminTabs() {
  const { reservations } = useAdminMock();
  const [filters, setFilters] = useState<BookingFiltersValue>({
    statuses: [],
    startDate: undefined,
    endDate: undefined,
  });

  const filteredReservations = useMemo(() => {
    const inStatus = (r: Reservation) =>
      filters.statuses.length === 0 || filters.statuses.includes(r.status);
    const inDate = (r: Reservation) => {
      if (!filters.startDate && !filters.endDate) return true;
      const d = new Date(r.scheduledAtIso);
      if (filters.startDate) {
        const s = new Date(filters.startDate + "T00:00:00");
        if (d < s) return false;
      }
      if (filters.endDate) {
        const e = new Date(filters.endDate + "T23:59:59");
        if (d > e) return false;
      }
      return true;
    };
    return reservations.filter((r) => inStatus(r) && inDate(r));
  }, [reservations, filters]);

  return (
    <div className="space-y-4">
      <BookingFilters value={filters} onChange={setFilters} />
      <BookingTable data={filteredReservations} />
    </div>
  );
}
