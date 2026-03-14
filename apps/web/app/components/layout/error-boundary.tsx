import { Suspense } from "react";

import { HTTPError } from "@gyeongmaetalk/lib/ky";
import { QueryErrorResetBoundary } from "@gyeongmaetalk/lib/tanstack";
import { Button } from "@gyeongmaetalk/ui";

import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Link } from "react-router";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  suspenseFallback?: React.ReactNode;
  errorFallback?: (props: FallbackProps) => React.ReactNode;
  resetKeys?: unknown[];
}

export default function ErrorBoundary({
  children,
  suspenseFallback,
  errorFallback,
  resetKeys,
}: ErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ReactErrorBoundary
            onReset={reset}
            fallbackRender={errorFallback ?? ((props) => <DefaultErrorFallback {...props} />)}
            resetKeys={resetKeys}
          >
            {suspenseFallback ? (
              <Suspense fallback={suspenseFallback}>{children}</Suspense>
            ) : (
              children
            )}
          </ReactErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { title, description } = getErrorMessage(error);

  return (
    <main
      className="flex flex-col items-center justify-center p-6"
      role="main"
      aria-label="오류 발생"
    >
      <h1 className="font-body1-normal-bold text-label-strong mt-2 text-center">{title}</h1>
      <p className="font-body2-normal-regular text-label-alternative mt-1 text-center">
        {description}
      </p>
      <div className="mt-4 flex gap-4">
        <Link to="mailto:work@epqpf.com">
          <Button theme="secondary" size="md">
            문의하기
          </Button>
        </Link>
        <Button size="md" onClick={resetErrorBoundary}>
          새로고침
        </Button>
      </div>
    </main>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof HTTPError) {
    if (error.response.status === 400) {
      return {
        title: "잘못된 요청",
        description: "요청한 내용을 확인해주세요.",
      };
    }

    if (error.response.status === 403) {
      return {
        title: "접근 권한이 없습니다",
        description: "접근 권한이 없는 페이지입니다.",
      };
    }

    if (error.response.status === 500) {
      return {
        title: "서버 오류",
        description: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  }

  return {
    title: "문제가 발생했습니다",
    description: "문제가 지속될 경우 문의 메일로 연락주세요.",
  };
}
