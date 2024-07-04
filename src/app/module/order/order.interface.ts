import { Schema } from 'mongoose';

export type IOrders = {
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
