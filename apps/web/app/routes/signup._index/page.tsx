import { useState } from "react";

import type { BaseResponse } from "@gyeongmaetalk/types";
import { Button, Textfield } from "@gyeongmaetalk/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import PhoneVerification from "~/components/phone-verification";
import { api } from "~/lib/ky";
import { useAccessTokenStore, useRefreshTokenStore } from "~/lib/zustand/user";
import type { SignupResponse } from "~/models/auth";
import { type SignupForm, signupFormSchema } from "~/routes/signup._index/schema";
import { errorToast, successToast } from "~/utils/toast";

const DEFAULT_VALUES: SignupForm = {
  name: "",
  birth: "",
  phone: "",
  code: "",
};

export default function SignupPage() {
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  const { formState, watch, handleSubmit, setValue } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useRefreshTokenStore((state) => state.setRefreshToken);

  const accessToken = state?.accessToken;
  const refreshToken = state?.refreshToken;

  const name = watch("name");
  const birth = watch("birth");
  const phone = watch("phone");
  const code = watch("code");

  const isSubmitDisabled =
    !name || !birth || !phone || !code || !isCodeVerified || formState.isSubmitting || isPending;

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, id: keyof SignupForm) => {
    const value = e.target.value;

    const regex = /^\d+$/;

    // 빈 문자열이라면 공백으로 설정
    if (value.trim() === "") {
      setValue(id, "");
      return;
    }

    // 숫자가 아니라면 return
    if (!regex.test(value)) return;

    setValue(id, value);
  };

  const onVerificationComplete = (isVerified: boolean) => {
    setIsCodeVerified(isVerified);
  };

  const onSubmit = handleSubmit(async (data) => {
    const year = data.birth.slice(0, 4);
    const month = data.birth.slice(4, 6);
    const day = data.birth.slice(6, 8);
    const birth = `${year}-${month}-${day}`;

    try {
      setIsPending(true);
      const res = await api
        .post<BaseResponse<SignupResponse>>("auth/signup", {
          json: {
            name: data.name,
            birth,
            cellPhone: data.phone,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .json();

      if (res.isSuccess) {
        successToast("회원가입이 완료되었어요.");
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        navigate("/onboarding", { replace: true });
      } else {
        errorToast("회원가입에 실패했어요.");
        console.error(res);
      }
    } catch (error) {
      errorToast("회원가입 요청에 실패했어요.\n다시 시도해주세요.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  });

  if (!accessToken || !refreshToken) {
    return <Navigate to="/" />;
  }

  return (
    <main className="space-y-6 px-4 py-6">
      <header className="font-title3-bold text-label-strong">
        <span className="text-primary-normal">연락 가능한 정보를 입력</span>하고
        <br />
        회원가입을 완료하세요!
      </header>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Textfield
          label="이름"
          required
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setValue("name", e.target.value)}
        />
        <Textfield
          label="생년월일"
          required
          placeholder="텍스트를 입력해주세요.(ex.19900123)"
          maxLength={8}
          value={birth}
          onChange={(e) => onChangeNumber(e, "birth")}
        />
        <PhoneVerification
          accessToken={accessToken}
          phone={phone}
          code={code}
          onPhoneChange={(e) => onChangeNumber(e, "phone")}
          onCodeChange={(e) => setValue("code", e.target.value)}
          onVerificationComplete={onVerificationComplete}
        />
        <FloatingContainer>
          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            완료
          </Button>
        </FloatingContainer>
      </form>
    </main>
  );
}
