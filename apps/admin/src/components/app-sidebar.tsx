"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@gyeongmaetalk/ui";

import { CreditCard, House, MessageCircle, UserRound } from "lucide-react";

const items = [
  {
    title: "상담",
    url: "/consult",
    icon: UserRound,
  },
  {
    title: "결제",
    url: "/payment",
    icon: CreditCard,
  },
  {
    title: "문의",
    url: "/inquiry",
    icon: MessageCircle,
  },
  {
    title: "매물",
    url: "/property",
    icon: House,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  const getTheme = (url: string) => {
    if (pathname.startsWith(url)) {
      return "default";
    }

    return "assistive";
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium">목록</h2>
              {open && <SidebarTrigger />}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild theme={getTheme(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {!open && <SidebarTrigger className="m-2" />}
    </>
  );
}
