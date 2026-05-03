import { queryOptions } from "@gyeongmaetalk/lib/tanstack";

import type { ProductCategory } from "~/models/product";
import { getProducts } from "~/services/product";

import { productKeys } from "../keys/product";

export const PRODUCT_QUERY_OPTIONS = {
  GetProducts: (category: ProductCategory) =>
    queryOptions({
      queryKey: productKeys.getProducts(category),
      queryFn: () => getProducts(category),
    }),
};
