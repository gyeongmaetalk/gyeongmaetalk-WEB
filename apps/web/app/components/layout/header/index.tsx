import { cn } from "@gyeongmaetalk/utils";

import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { Alarm, Close, LogoIcon, LogoText, Share } from "~/components/icons";

// 기본 헤더 컨테이너
function HeaderContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-mobile top-ios-top fixed right-0 left-0 z-99999 mx-auto flex h-11 items-center px-4 py-2.5",
        className
      )}
    >
      {children}
    </header>
  );
}

// 헤더 섹션들
function HeaderLeft({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-1 items-center justify-start gap-4">{children}</div>;
}

function HeaderCenter({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-1 items-center justify-center">{children}</div>;
}

function HeaderRight({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-1 items-center justify-end gap-4">{children}</div>;
}

// 개별 헤더 요소들
// 로고
function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <LogoText />
    </div>
  );
}

// 뒤로가기 버튼
function HeaderBackButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();

  return <ChevronLeft onClick={() => onClick?.() || navigate(-1)} className="cursor-pointer" />;
}

// 헤더 타이틀
function HeaderTitle({
  children,
  position = "center",
}: {
  children: React.ReactNode;
  position?: "left" | "center";
}) {
  return (
    <div
      className={cn("shrink-0", position === "center" ? "font-headline2-bold" : "font-title3-bold")}
    >
      {children}
    </div>
  );
}

// 공유 버튼
function HeaderShareButton({ onClick }: { onClick?: () => void }) {
  return <Share onClick={onClick} className="cursor-pointer" />;
}

// 닫기 버튼
function HeaderCloseButton({ onClick }: { onClick?: () => void }) {
  return <Close onClick={onClick} className="cursor-pointer" />;
}

// 알림 버튼
function HeaderAlarmButton({ onClick }: { onClick?: () => void }) {
  return <Alarm onClick={onClick} className="cursor-pointer" />;
}

export const Header = {
  Container: HeaderContainer,
  Left: HeaderLeft,
  Center: HeaderCenter,
  Right: HeaderRight,
  Logo: HeaderLogo,
  Back: HeaderBackButton,
  Title: HeaderTitle,
  Share: HeaderShareButton,
  Close: HeaderCloseButton,
  Alarm: HeaderAlarmButton,
};

// 로고가 있는 기본 헤더
export function DefaultHeader({ className }: { className?: string }) {
  return (
    <Header.Container className={className}>
      <Header.Left>
        <Header.Logo />
      </Header.Left>
      <Header.Center />
      <Header.Right>
        <Link to="/alarm">
          <Header.Alarm />
        </Link>
      </Header.Right>
    </Header.Container>
  );
}

// 뒤로가기 버튼이 있는 헤더
export function WithBackHeader({
  title,
  onBack,
  onShare,
}: {
  title?: string;
  onBack?: () => void;
  onShare?: () => void;
}) {
  return (
    <Header.Container>
      <Header.Left>
        <Header.Back onClick={onBack} />
      </Header.Left>
      <Header.Center>
        <Header.Title>{title}</Header.Title>
      </Header.Center>
      <Header.Right>{onShare && <Header.Share onClick={onShare} />}</Header.Right>
    </Header.Container>
  );
}

// 닫기 버튼이 있는 헤더
export function WithCloseHeader({
  className,
  title,
  onClose,
}: {
  className?: string;
  title?: string;
  onClose: () => void;
}) {
  return (
    <Header.Container className={className}>
      <Header.Left />
      <Header.Center>{title && <Header.Title>{title}</Header.Title>}</Header.Center>
      <Header.Right>
        <Header.Close onClick={onClose} />
      </Header.Right>
    </Header.Container>
  );
}

// 타이틀이 왼쪽에 있는 헤더
export function WithLeftTitleHeader({ className, title }: { className?: string; title: string }) {
  return (
    <Header.Container className={className}>
      <Header.Left>
        <Header.Title position="left">{title}</Header.Title>
      </Header.Left>
      <Header.Center />
      <Header.Right>
        <Link to="/alarm">
          <Header.Alarm />
        </Link>
      </Header.Right>
    </Header.Container>
  );
}
