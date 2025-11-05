import PageLayout from "~/components/layout/page-layout";

import RedirectPage from "./page";

export function meta() {
  return [
    { title: "경매톡 - 로그인 중..." },
    { name: "description", content: "경매톡 - 로그인 중..." },
  ];
}

export default function RedirectLayout() {
  return (
    <PageLayout>
      <RedirectPage />
    </PageLayout>
  );
}
