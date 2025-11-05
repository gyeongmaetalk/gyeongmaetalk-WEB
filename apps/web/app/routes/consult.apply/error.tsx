import { Button } from "@gyeongmaetalk/ui";

import { AlertCircle } from "lucide-react";

interface ApplyConsultErrorProps {
  onResetError: () => void;
}

const ApplyConsultError = ({ onResetError }: ApplyConsultErrorProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-5 text-center">
      <div className="mb-8">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="text-destructive size-16" />
        </div>
        <h1 className="text-label-neutral mb-2 text-2xl font-bold">잘못된 접근</h1>
        <p className="text-label-neutral">
          상담 신청 과정에서 문제가 발생했어요.
          <br />
          처음부터 다시 시작해주세요.
        </p>
      </div>
      <Button onClick={onResetError} className="w-full max-w-xs">
        처음부터 다시 시작하기
      </Button>
    </div>
  );
};

export default ApplyConsultError;
