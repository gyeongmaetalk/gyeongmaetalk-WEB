import { useState } from "react";

import { Navigate, useLocation, useSearchParams } from "react-router";

import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import { useUserStore } from "~/lib/zustand/user";
import type {
  MatchCounselRequest,
  MatchCounselResponse,
  ReserveConsultResponse,
} from "~/models/counsel";
import FirstStep from "~/routes/consult.matching/first-step";
import LastStep from "~/routes/consult.matching/last-step";
import SecondStep from "~/routes/consult.matching/second-step";

export type Mode = "reservation" | "complete" | null;

interface ConsultMatchingState {
  state: {
    result: MatchCounselResponse;
    matchCounselRequest: MatchCounselRequest;
  };
}

const ConsultMatchingPage = () => {
  const [reservationResult, setReservationResult] = useState<ReserveConsultResponse | null>(null);

  const [searchParams] = useSearchParams();
  const isChangeMode = searchParams.get("mode") === "change";
  const [mode, setMode] = useState<Mode>(isChangeMode ? "reservation" : null);

  const { data: counselStatus } = useCheckCounselStatus();
  const user = useUserStore((state) => state.user);

  const { state }: ConsultMatchingState = useLocation();

  if (!state || !user) {
    return <Navigate to="/" replace />;
  }

  switch (mode) {
    case "reservation":
      return (
        <SecondStep
          consultant={state.result}
          matchCounselRequest={state.matchCounselRequest}
          isChangeMode={isChangeMode}
          counselId={counselStatus?.info?.counselId ?? null}
          counselDate={counselStatus?.info?.counselDate ?? null}
          counselTime={counselStatus?.info?.counselTime ?? null}
          onChangeMode={setMode}
          setReservationResult={setReservationResult}
        />
      );
    case "complete":
      return <LastStep consultant={state.result} reservationResult={reservationResult} />;
    default:
      return <FirstStep consultant={state.result} name={user.name || ""} onChangeMode={setMode} />;
  }
};

export default ConsultMatchingPage;
