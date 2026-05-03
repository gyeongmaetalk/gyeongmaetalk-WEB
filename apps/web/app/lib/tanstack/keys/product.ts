import type { ProductCategory } from "~/models/product";

export const productKeys = {
  all: ["product"] as const,
  getProducts: (category: ProductCategory) =>
    [...productKeys.all, "get-products", category] as const,
};
