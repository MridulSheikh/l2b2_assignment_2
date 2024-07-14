import { Request, Response } from 'express';
import productService from './product.service';
import status from 'http-status';

const createProductController = async (req: Request, res: Response) => {
  try {
    const result = await productService.createProductIntoDBService(req.body);
    res.status(status.CREATED).send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).send({
      suceess: false,
      message:
        'Failed to create product. Please check your input and try again.',
    });
  }
};

const getAllProdctController = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productService.getAllProductFromDBService(
      searchTerm as string,
    );
    res.status(status.OK).send({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({
      suceess: false,
      message: 'Failed to Fetch product. Please try again.',
    });
  }
};

const getSingleProductController = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductFromDbById(req.params.id);
    if (result === null) {
      return res.status(status.NOT_FOUND).send({
        suceess: false,
        message: 'Product Not Found!',
      });
    }
    const response = { ...(result as any)._doc };
    delete response._id;
    res.status(status.OK).send({
      success: true,
      message: 'Product fetched successfully!',
      data: response,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).send({
      suceess: false,
      message: 'Failed to Fetch product',
    });
  }
};

const updateSingleProductController = async (req: Request, res: Response) => {
  try {
    const result = await productService.updateSingleProductIntoDB(
      req.body,
      req.params.id,
    );
    if (result === null) {
      return res.status(status.NOT_FOUND).send({
        suceess: false,
        message: 'Product Not Found!',
      });
    }
    const response = { ...(result as any)._doc };
    delete response._id;
    res.status(status.OK).send({
      success: true,
      message: 'Product Update successfully!',
      data: response,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).send({
      suceess: false,
      message: error.message || 'Failed to update product. Please try again.',
    });
  }
};

const deleteSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteSingleProductFromDB(
      req.params.id,
    );
    res.status(status.OK).send({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).send({
      suceess: false,
      message: error.message || 'Failed to delete product. Please try again.',
    });
  }
};

const productController = {
  createProductController,
  getAllProdctController,
  getSingleProductController,
  updateSingleProductController,
  deleteSingleProductFromDB,
};

export default productController;
