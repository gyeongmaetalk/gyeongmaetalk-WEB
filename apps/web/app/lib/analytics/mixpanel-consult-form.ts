export function getConsultFormEntryPointLabel(mode: string | undefined): string {
  if (mode === "change") {
    return "예약_변경";
  }
  if (mode === "apply") {
    return "온보딩_상담";
  }
  return "기본";
}
