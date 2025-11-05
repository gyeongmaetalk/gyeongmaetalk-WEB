import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import MyPageAlarmPage from "./page";

export function meta() {
  return [{ title: "알림 설정" }, { name: "description", content: "알림 설정" }];
}

const MyPageAlarmLayout = () => {
  return (
    <PageLayout header={<WithBackHeader title="알림 설정" />}>
      <MyPageAlarmPage />
    </PageLayout>
  );
};

export default MyPageAlarmLayout;
