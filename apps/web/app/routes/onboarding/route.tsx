import OnboardingPage from "./page";

export function meta() {
  return [{ title: "경매톡 시작하기" }, { name: "description", content: "경매톡 시작하기" }];
}

export default function OnboardingLayout() {
  return <OnboardingPage />;
}
