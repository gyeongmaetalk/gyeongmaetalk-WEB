import { useNavigate } from "react-router";

import { WithCloseHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import SignupPage from "./page";

export function meta() {
  return [{ title: "회원가입" }, { name: "description", content: "회원가입" }];
}

export default function SignupLayout() {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={<WithCloseHeader title="회원가입" onClose={() => navigate("/", { replace: true })} />}
      withFloating
    >
      <SignupPage />
    </PageLayout>
  );
}
