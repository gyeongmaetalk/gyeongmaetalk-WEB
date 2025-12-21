"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/lib/tanstack/mutation/auth";
import { setCookie } from "@/utils/cookie";
import type { BaseResponse } from "@gyeongmaetalk/types";
import { Button, Textfield } from "@gyeongmaetalk/ui";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useLogin({
    onSuccess: () => {
      setCookie("loggedIn", "true");
      router.push("/counsel");
    },
    onError: async (error) => {
      const errorResponse = await error.response.json<BaseResponse>();
      setError(errorResponse.message);
    },
  });

  const isSubmitDisabled = isPending || isSuccess;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      return;
    }

    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    login({ username, password });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="로그인 폼">
      <div className="space-y-2">
        <Textfield
          id="username"
          name="username"
          aria-label="아이디"
          placeholder="아이디"
          required
        />
        <Textfield
          id="password"
          name="password"
          aria-label="비밀번호"
          placeholder="비밀번호"
          type="password"
          required
          errorText={error}
        />
      </div>
      <Button type="submit" aria-label="로그인" className="w-full" disabled={isSubmitDisabled}>
        로그인
      </Button>
    </form>
  );
}
