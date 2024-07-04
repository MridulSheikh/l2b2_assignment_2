import Product from '../product/product.model';
import { IOrders } from './order.interface';
import Order from './order.model';

const createOrderService = async (payload: IOrders) => {
  const isProductExist = await Product.findById(payload.productId);

  // check product exist or not
  if (!isProductExist) {
    throw Error('Product does not exits!');
  }

  // check product in stock or not
  if (isProductExist.inventory.quantity < payload.quantity) {
    throw Error('insufficient stock!');
  }
  const result = await Order.create(payload);
  const updatedData = await Product.findByIdAndUpdate(
    payload.productId,
    {
      $inc: { 'inventory.quantity': payload.quantity * -1 },
    },
    {
      new: true,
    },
  );

  // handle inStock status
  if (updatedData?.inventory.quantity === 0) {
    await Product.findByIdAndUpdate(updatedData._id, {
      'inventory.inStock': false,
    });
  }

  return result;
};

const getAllOrderFromDbService = async (email: string) => {
  const pipeline: any[] = [{ $project: { _id: 0 } }];
  if (email) {
    pipeline.unshift({ $match: { email: email } });
  }
  const result = await Order.aggregate(pipeline);
  return result;
};

const orderServices = {
  createOrderService,
  getAllOrderFromDbService,
};

export default orderServices;
