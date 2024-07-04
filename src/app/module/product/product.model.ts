import { Schema, model } from 'mongoose';
import { IInventory, IProuduct, IVariants } from './product.interface';

const variantsSchema = new Schema<IVariants>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<IProuduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: [true, 'Product Discription is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is Required'],
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantsSchema],
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Product = model<IProuduct>('Product', productSchema);

export default Product;
