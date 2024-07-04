import { IProuduct } from './product.interface';
import Product from './product.model';

const createProductIntoDBService = async (payload: IProuduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDBService = async (searchTerm: string) => {
  const pipeline: any[] = [
    {
      $project: {
        _id: 0,
      },
    },
  ];
  if (searchTerm) {
    pipeline.unshift({ $match: { $text: { $search: searchTerm } } });
  }
  const result = await Product.aggregate(pipeline);
  return result;
};

const getProductFromDbById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductIntoDB = async (payload: IProuduct, id: string) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const isProductExist = await getProductFromDbById(id);
  if (!isProductExist) {
    throw Error('Product not Found!');
  }
  const result = await Product.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

const productService = {
  createProductIntoDBService,
  getAllProductFromDBService,
  getProductFromDbById,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
};

export default productService;
