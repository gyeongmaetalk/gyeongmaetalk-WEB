import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@gyeongmaetalk/ui";

interface WithSidebarLayoutProps {
  children: React.ReactNode;
}

export default function WithSidebarLayout({ children }: WithSidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
  return <div>WithSidebarLayout</div>;
}
