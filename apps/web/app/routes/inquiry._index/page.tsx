import { useSearchParams } from "react-router";

import StatusNav from "~/routes/agency.recommend._index/status-nav";
import InquiryTab from "~/routes/inquiry._index/inquiry-tab";
import MyInquiryTab from "~/routes/inquiry._index/my-inquiry-tab";

const STATUS_LIST = [
  {
    label: "문의하기",
    value: "",
  },
  {
    label: "문의내역",
    value: "history",
  },
];

export default function InquiryPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  return (
    <div className="h-[calc(100%-var(--spacing-ios-bottom)-5.75rem)]">
      <StatusNav statusList={STATUS_LIST} status={status} />
      {status ? <MyInquiryTab /> : <InquiryTab />}
    </div>
  );
}
