import { api } from "~/lib/ky";
import type { ProductCategory, ProductListResponse } from "~/models/product";

export const getProducts = async (category: ProductCategory): Promise<ProductListResponse> => {
  return api.get("products", { searchParams: { category } }).json();
};
