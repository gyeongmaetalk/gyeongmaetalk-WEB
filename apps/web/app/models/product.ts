export interface ProductListItemProps {
  id: number;
  name: string;
  description: string;
  productType: string;
  price: number;
  components: [
    {
      productId: number;
      componentType: string;
      name: string;
      description: string;
      ticketCount: number;
    },
  ];
}

export type ProductListResponse = ProductListItemProps[];

export type ProductCategory = "ALL" | "PACKAGE" | "VIEW_TICKET";
