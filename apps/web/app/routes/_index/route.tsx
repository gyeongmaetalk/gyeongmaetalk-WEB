import HomePage from "./page";

export function meta() {
  return [{ title: "경매톡" }, { name: "description", content: "경매톡 메인페이지" }];
}

export default function HomeLayout() {
  return <HomePage />;
}
