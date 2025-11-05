import { useRef, useState } from "react";

import type { BaseResponse } from "@gyeongmaetalk/types";
import { Button, Textfield } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import { api } from "~/lib/ky";
import { STATUS } from "~/routes/signup._index/constant";
import { formatRemainingTime } from "~/routes/signup._index/util";
import { errorToast } from "~/utils/toast";

interface PhoneVerificationProps {
  phone: string;
  code: string;
  accessToken: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerificationComplete: (isVerified: boolean) => void;
}

const TIMEOUT_DURATION = 60 * 5;

export default function PhoneVerification({
  phone,
  code,
  accessToken,
  onPhoneChange,
  onCodeChange,
  onVerificationComplete,
}: PhoneVerificationProps) {
  const [isPhoneVerified, setIsPhoneVerified] = useState(0);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const isCodeVerifyDisabled =
    !isPhoneVerified || !code || intervalRef.current === null || isPending;
  const isCheckCodeDisabled = !isPhoneVerified || !remainingTime || isPending;

  const onRequestCode = async () => {
    setIsPending(true);
    try {
      await api
        .post("auth/sms", {
          searchParams: { phoneNumber: phone },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .json();

      // 기존 interval이 있다면 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsPhoneVerified((prev) => prev + 1);
      setRemainingTime(TIMEOUT_DURATION);

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          }
          if (intervalRef.current) {
            errorToast("전화번호와 인증 번호가 초기화 되었습니다.\n다시 시도해주세요.");
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
            textFieldRef.current?.blur();
            setErrorText(STATUS.CODE_EXPIRED);
          }
          return null;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      errorToast("전화번호 인증 요청에 실패했습니다.\n다시 시도해주세요.");
    } finally {
      setIsPending(false);
    }
  };

  const onRequestCodeVerify = async () => {
    setIsPending(true);
    try {
      const res = await api
        .post<BaseResponse<boolean>>("auth/sms/verify", {
          searchParams: { code, phoneNumber: phone },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .json();
      setIsCodeVerified(res.result);
      onVerificationComplete(res.result);

      if (res.result) {
        setSuccessText(STATUS.VALID_CODE);
        setErrorText("");
        setRemainingTime(null);

        if (intervalRef.current) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;
        }
      } else {
        setErrorText(STATUS.INVALID_CODE);
      }
    } catch (error) {
      console.error(error);
      errorToast("인증번호 인증에 실패했습니다.\n다시 시도해주세요.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <Textfield
            label="휴대폰 번호"
            required
            placeholder="번호를 입력해주세요.(ex.01012345678)"
            className="rounded-r-none"
            maxLength={11}
            value={phone}
            onChange={onPhoneChange}
          />
        </div>
        <Button
          type="button"
          variant="outlined"
          theme="secondary"
          className="self-end rounded-l-none border-l-0"
          onClick={onRequestCode}
          disabled={isCodeVerified || isPending || isPhoneVerified > 1}
        >
          {isPhoneVerified ? "재전송" : "확인"}
        </Button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <Textfield
            ref={textFieldRef}
            required
            label="인증번호"
            placeholder="인증번호를 입력해주세요."
            className={cn(!successText && "rounded-r-none")}
            disabled={isCheckCodeDisabled}
            successText={successText}
            errorText={errorText}
            value={code}
            onChange={onCodeChange}
            additionalText={formatRemainingTime(remainingTime)}
          />
        </div>
        {!isCodeVerified && (
          <Button
            variant="outlined"
            theme="secondary"
            disabled={isCodeVerifyDisabled || isCodeVerified}
            className={cn(
              "disabled:bg-cool-neutral-50/8 self-end rounded-l-none border-l-0 disabled:opacity-100",
              errorText && "mt-1 self-center"
            )}
            onClick={onRequestCodeVerify}
          >
            인증
          </Button>
        )}
      </div>
    </>
  );
}
