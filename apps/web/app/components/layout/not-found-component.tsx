import { Button } from "@gyeongmaetalk/ui";

import { Link } from "react-router";

export function NotFoundComponent() {
  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center px-6"
      role="main"
      aria-label="페이지를 찾을 수 없음"
    >
      <h1 className="font-body1-normal-bold text-label-strong mt-2 text-center">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="font-body2-normal-regular text-label-alternative mt-1 text-center">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link to="/" className="mt-8 w-full" aria-label="홈으로 이동">
        <Button className="w-full">홈으로 돌아가기</Button>
      </Link>
    </main>
  );
}
