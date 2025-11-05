import ConsultApplyPage from "./page";

export function meta() {
  return [{ title: "상담 신청하기" }, { name: "description", content: "상담 신청하기" }];
}

export default function ConsultApplyLayout() {
  return <ConsultApplyPage />;
}
