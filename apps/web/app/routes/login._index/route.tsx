import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import LoginPage from "./page";

export function meta() {
  return [
    { title: "경매톡 - 로그인" },
    { name: "description", content: "소셜 로그인으로 경매톡 시작하기" },
  ];
}

export default function LoginLayout() {
  return (
    <PageLayout header={<WithBackHeader />}>
      <LoginPage />
    </PageLayout>
  );
}
