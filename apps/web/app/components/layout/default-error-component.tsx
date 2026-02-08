import { Button } from "@gyeongmaetalk/ui";

import { Link } from "react-router";

interface DefaultErrorComponentProps {
  message: string;
  stack?: string;
};

export function DefaultErrorComponent({
  message,
  stack,
}: DefaultErrorComponentProps) {
  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center px-6"
      role="main"
      aria-label="오류 발생"
    >
      {import.meta.env.DEV ? <p className="font-heading1-bold text-primary-normal">{message}</p> : null} 
      <h1 className="mt-2 text-center font-body1-normal-bold text-label-strong">
        문제가 발생했습니다
      </h1>
      <p className="mt-1 text-center font-body2-normal-regular text-label-alternative">
        문제가 지속될 경우 문의 메일로 연락주세요.
      </p>
      {stack && import.meta.env.DEV && (
        <pre className="mt-4 w-full overflow-x-auto rounded-lg bg-label-assistive/20 p-4 font-mono text-xs text-label-normal">
          <code>{stack}</code>
        </pre>
      )}
      <Link to="/" className="mt-8 w-full" aria-label="홈으로 이동">
        <Button className="w-full">홈으로 돌아가기</Button>
      </Link>
    </main>
  );
}
