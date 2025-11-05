import AlarmPage from "./page";

export function meta() {
  return [{ title: "알림" }, { name: "description", content: "알림" }];
}

export default function AlarmLayout() {
  return <AlarmPage />;
}
