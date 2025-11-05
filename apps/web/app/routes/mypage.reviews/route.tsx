import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import MyPageReviewsPage from "./page";

export function meta() {
  return [{ title: "내가 작성한 후기" }, { name: "description", content: "내가 작성한 후기" }];
}

const MyPageUserInfoLayout = () => {
  return (
    <PageLayout header={<WithBackHeader title="내가 작성한 후기" />}>
      <MyPageReviewsPage />
    </PageLayout>
  );
};

export default MyPageUserInfoLayout;
