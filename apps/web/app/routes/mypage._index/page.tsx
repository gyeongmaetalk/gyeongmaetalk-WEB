import { useState } from "react";

import { cn } from "@gyeongmaetalk/utils";

import { Link } from "react-router";

import Divider from "~/components/divider";
import { Apple, Back, Gift, Kakao, Ticket } from "~/components/icons";
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
      <div className="space-y-4 px-4 pb-[15px]">
        <div className="mt-6 flex items-center justify-between py-3">
          <div className="flex items-center gap-1">
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
              {user
                ? user.name
                  ? `${user.name} 님`
                  : "정보 입력이 필요해요"
                : "로그인 및 회원가입"}
            </Link>
            <Back className="h-3 w-[7px] -scale-x-100" />
          </div>
          {user && user.auctionStatus && (
            <div className="flex h-5 items-center rounded-[6px] bg-[#e5f6fe] px-[6px]">
              <div className="font-caption2-medium text-primary-normal">경매 진행 중</div>
            </div>
          )}
        </div>
        {/* 경매 진행 중이 아닐 때 보여주기 */}
        {/* <div className="bg-cool-neutral-99 space-y-3 rounded-md py-3 text-center">
          <p className="font-label2-bold text-label-strong">이용중인 패키지가 없습니다</p>
          <p className="font-label2-regular text-label-strong">경매 대행 패키지를 이용해보세요</p>
        </div> */}
        {/* 경매 진행 중일 때 보여주기 */}
        {/* <div className="flex items-center gap-3">
          <div className="bg-cool-neutral-99 flex flex-1 flex-col items-center gap-3 rounded-md py-3">
            <div className="flex items-center gap-1">
              <Gift />
              <p className="font-label2-bold text-label-alternative">이용중인 패키지</p>
            </div>
            <p className="font-label1-normal-bold text-label-normal">추천 패키지</p>
          </div>
          <Link
            to="/payment/ticket"
            className="bg-cool-neutral-99 flex flex-1 flex-col items-center gap-3 rounded-md py-3"
          >
            <div className="flex items-center gap-1">
              <Ticket />
              <p className="font-label2-bold text-label-alternative">잔여 열람권</p>
            </div>
            <p className="font-label1-normal-bold text-label-normal">0개</p>
          </Link>
        </div> */}
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
