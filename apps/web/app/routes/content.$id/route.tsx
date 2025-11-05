import type { Route } from "./+types/route";
import ContentDetailPage from "./page";

export function meta() {
  return [{ title: "콘텐츠 상세" }, { name: "description", content: "콘텐츠 상세" }];
}

export default function ContentLayout({ params }: Route.ComponentProps) {
  const { id } = params;

  return <ContentDetailPage id={+id} />;
}
