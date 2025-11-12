import { useState } from "react";

import { cn } from "@gyeongmaetalk/utils";

import { Link } from "react-router";

import Divider from "~/components/divider";
import { Apple, Back, Kakao } from "~/components/icons";
import { AuthProvider, WebviewEvent } from "~/constants";
import { useWebView } from "~/hooks/use-webview";
import { useUserStore } from "~/lib/zustand/user";
import LogoutModal from "~/routes/mypage._index/logout-modal";

const MyPagePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useUserStore((state) => state.user);

  const { postMessage } = useWebView();

  const onOpenServiceIntroduction = () => {
    postMessage(WebviewEvent.OPEN_SERVICE_INTRODUCTION);
  };

  const isKakao = user?.loginType === AuthProvider.KAKAO.toUpperCase();

  return (
    <div className="flex flex-col">
      {/* 회원 로그인 정보 */}
      <div className="flex h-24 flex-row items-center justify-between px-4 pt-6 pb-[15px]">
        <div className="flex flex-row items-center gap-1">
          {user && (
            <div
              className={cn(
                "bg-kakao flex size-6 items-center justify-center rounded-[4px]",
                isKakao ? "bg-kakao" : "bg-black"
              )}
            >
              {isKakao ? (
                <Kakao className="h-[15px] w-[15px]" />
              ) : (
                <Apple className="h-[15px] w-[15px]" />
              )}
            </div>
          )}
          <Link className="font-headline1-bold ml-1" to={user ? "/mypage/userinfo" : "/login"}>
            {user ? `${user.name} 님` : "로그인 및 회원가입"}
          </Link>
          <Back className="h-3 w-[7px] -scale-x-100" />
        </div>
        {user && user.auctionStatus && (
          <div className="flex h-5 items-center rounded-[6px] bg-[#e5f6fe] px-[6px]">
            <div className="font-caption2-medium text-primary-normal">경매 진행 중</div>
          </div>
        )}
      </div>

      {/* 구분선 */}
      <Divider className="bg-cool-neutral-99 h-2" />

      <div className="px-4 pt-[15px] pb-6">
        {/* 후기 및 알림 */}
        {user && (
          <div className="flex flex-col gap-2">
            <div className="font-label2-medium text-cool-neutral-50">후기 및 알림</div>
            <Link
              className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
              to="/mypage/reviews"
            >
              작성한 후기
            </Link>
            <Link
              className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
              to="/mypage/alarm"
            >
              알림
            </Link>
            <Divider className="bg-cool-neutral-98 my-4" />
          </div>
        )}

        {/* 고객센터 */}
        <div className="flex flex-col gap-2">
          <div className="font-label2-medium text-cool-neutral-50">고객센터</div>
          <Link
            className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
            to="/questions"
          >
            자주 묻는 질문
          </Link>
          {user && (
            <Link
              className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
              to="/inquiry"
            >
              1:1 문의
            </Link>
          )}
          <Divider className="bg-cool-neutral-98 my-4" />
        </div>

        {/* 안내 */}
        <div className="flex flex-col gap-2">
          <div className="font-label2-medium text-cool-neutral-50">안내</div>
          <button
            className="font-body1-normal-regular text-label-normal cursor-pointer py-3 text-start"
            onClick={onOpenServiceIntroduction}
          >
            서비스 소개
          </button>
          <Link
            className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
            to="/terms-of-service"
          >
            이용약관
          </Link>
          <Link
            className="font-body1-normal-regular text-label-normal cursor-pointer py-3"
            to="/privacy-policy"
          >
            개인정보 처리방침
          </Link>
          <Divider className="bg-cool-neutral-98 my-4" />

          {/* 로그아웃 */}
          {user && (
            <>
              <button
                className="font-body1-normal-regular text-label-normal cursor-pointer py-3 text-start"
                onClick={() => setIsOpen(true)}
              >
                로그아웃
              </button>
              <LogoutModal isOpen={isOpen} onCancel={() => setIsOpen(false)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPagePage;
