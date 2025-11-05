import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import QuestionsPage from "./page";

export function meta() {
  return [{ title: "자주 묻는 질문" }, { name: "description", content: "자주 묻는 질문" }];
}

export default function QuestionsLayout() {
  return (
    <PageLayout header={<WithBackHeader title="자주 묻는 질문" />}>
      <QuestionsPage />
    </PageLayout>
  );
}
