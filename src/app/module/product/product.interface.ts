export type IVariants = {
  type: string;
  value: string;
};

export type IInventory = {
  quantity: number;
  inStock: boolean;
};

export type IProuduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariants[];
  inventory: IInventory;
};
