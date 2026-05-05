export interface ProductListItemProps {
  id: number;
  name: string;
  components: {
    description: string;
    quantity: number;
  }[];
  price: number | null;
  originalPrice: number;
  recommended: boolean;
}

export type ProductListResponse = ProductListItemProps[];

export type ProductCategory = "ALL" | "PACKAGE" | "VIEW_TICKET";
