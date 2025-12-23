import Section1 from "@/components/home/section1";
import Section2 from "@/components/home/section2";
import Section3 from "@/components/home/section3";
import Section4 from "@/components/home/section4";
import Section5 from "@/components/home/section5";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </main>
  );
}
