import { redirect, RedirectType } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { getCookie } from "@/utils/cookie";
import { SidebarProvider } from "@gyeongmaetalk/ui";

interface WithSidebarLayoutProps {
  children: React.ReactNode;
}

export default async function WithSidebarLayout({ children }: WithSidebarLayoutProps) {
  const loggedIn = await getCookie("loggedIn");
  if (!loggedIn) {
    redirect("/", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
