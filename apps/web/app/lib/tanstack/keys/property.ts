export const propertyKeys = {
  all: ["property"] as const,
  getPropertyList: (isPurchased: string | null) =>
    [...propertyKeys.all, "getPropertyList", isPurchased] as const,
  getPropertyDetail: (id: string) => [...propertyKeys.all, "getPropertyDetail", id] as const,
};
