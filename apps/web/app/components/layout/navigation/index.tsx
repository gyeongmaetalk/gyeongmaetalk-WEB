import { cn } from "@gyeongmaetalk/utils";

import { Link, useLocation } from "react-router";

import { NavAgency, NavConsult, NavHome, NavMypage } from "../../icons";

const navs = [
  {
    path: "/",
    icon: NavHome,
    label: "홈",
  },
  {
    path: "/consult",
    icon: NavConsult,
    label: "무료 상담",
  },
  {
    path: "/agency",
    icon: NavAgency,
    label: "경매 대행",
  },
  {
    path: "/mypage",
    icon: NavMypage,
    label: "마이 페이지",
  },
];

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
    <nav className="max-w-mobile border-cool-neutral-50/16 pb-ios-bottom fixed right-0 bottom-0 left-0 mx-auto border-t bg-white pt-px">
      <ul className="grid h-full grid-cols-4 py-1">
        {navs.map((nav) => (
          <li
            key={nav.label}
            className={cn(
              "text-cool-neutral-70 flex flex-1 items-center justify-center gap-2",
              isActive(nav.path) && "text-primary-normal"
            )}
          >
            <Link to={nav.path} className="flex flex-col items-center">
              <nav.icon width={24} height={24} />
              <div className="text-center text-[11px] font-medium">{nav.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
