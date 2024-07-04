import { model, Schema } from 'mongoose';
import { IOrders } from './order.interface';

const orderSchema = new Schema<IOrders>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Order = model<IOrders>('Order', orderSchema);

export default Order;
