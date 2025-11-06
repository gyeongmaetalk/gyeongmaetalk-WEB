"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { errorToast } from "@/utils/toast";
import { Button, Textfield } from "@gyeongmaetalk/ui";

const EMAIL_HINT = "admin@example.com";
const PASSWORD_HINT = "password123";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (email !== EMAIL_HINT || password !== PASSWORD_HINT) {
      errorToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    if (password === PASSWORD_HINT) {
      router.replace("/consult");
      return;
    }
    setError("이메일 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4" aria-label="로그인 폼">
      <Textfield
        id="email"
        name="email"
        aria-label="이메일"
        placeholder="이메일"
        type="email"
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
      <Button type="submit" aria-label="로그인" className="w-full">
        로그인
      </Button>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        개발용 힌트: 이메일 {EMAIL_HINT}
      </p>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        개발용 힌트: 비밀번호 {PASSWORD_HINT}
      </p>
    </form>
  );
}
