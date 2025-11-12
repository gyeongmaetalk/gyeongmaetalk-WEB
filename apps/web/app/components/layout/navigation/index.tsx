import { cn } from "@gyeongmaetalk/utils";

import { Link, useLocation } from "react-router";

import { NavAgency, NavConsult, NavHome, NavMypage } from "../../icons";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    // 홈 경로는 정확히 일치할 때 isActive 스타일 적용
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="max-w-mobile bottom-ios-bottom border-cool-neutral-50/16 fixed right-0 left-0 mx-auto h-12 border-t pt-px">
      <div className="h-full bg-white">
        <ul className="grid h-full grid-cols-4 py-1">
          <li
            className={cn(
              "text-cool-neutral-70 flex flex-1 items-center justify-center gap-2",
              isActive("/") && "text-primary-normal"
            )}
          >
            <Link to="/" className="flex flex-col items-center">
              <NavHome width={24} height={24} />
              <div className="text-center text-[11px] font-medium">홈</div>
            </Link>
          </li>
          <li
            className={cn(
              "text-cool-neutral-70 flex flex-1 items-center justify-center gap-2",
              isActive("/consult") && "text-primary-normal"
            )}
          >
            <Link to="/consult" className="flex flex-col items-center">
              <NavConsult width={24} height={24} />
              <div className="text-center text-[11px] font-medium">무료 상담</div>
            </Link>
          </li>
          <li
            className={cn(
              "text-cool-neutral-70 flex flex-1 items-center justify-center gap-2",
              isActive("/agency") && "text-primary-normal"
            )}
          >
            <Link to="/agency" className="flex flex-col items-center">
              <NavAgency width={24} height={24} />
              <div className="text-center text-[11px] font-medium">경매 대행</div>
            </Link>
          </li>
          <li
            className={cn(
              "text-cool-neutral-70 flex flex-1 items-center justify-center gap-2",
              isActive("/mypage") && "text-primary-normal"
            )}
          >
            <Link to="/mypage" className="flex flex-col items-center">
              <NavMypage width={24} height={24} />
              <div className="text-center text-[11px] font-medium">마이 페이지</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
