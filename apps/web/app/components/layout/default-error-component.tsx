import { Button } from "@gyeongmaetalk/ui";

import { Link } from "react-router";

export function DefaultErrorComponent() {
  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center px-6"
      role="main"
      aria-label="오류 발생"
    >
      <h1 className="font-body1-normal-bold text-label-strong mt-2 text-center">
        문제가 발생했습니다
      </h1>
      <p className="font-body2-normal-regular text-label-alternative mt-1 text-center">
        문제가 지속될 경우 문의 메일로 연락주세요.
      </p>
      <Link to="/" className="mt-8 w-full" aria-label="홈으로 이동">
        <Button className="w-full">홈으로 돌아가기</Button>
      </Link>
    </main>
  );
}
