import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

interface WithLayoutProps {
  children: React.ReactNode;
}

export default function WithLayout({ children }: WithLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
