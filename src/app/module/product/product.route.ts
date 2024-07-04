import express from 'express';
import productController from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import productValidationSchema from './product.validation.schema';

const Router = express.Router();

Router.route('/')
  .get(productController.getAllProdctController)
  .post(
    validateRequest(productValidationSchema.createProductValidationSchema),
    productController.createProductController,
  );

Router.route('/:id')
  .get(productController.getSingleProductController)
  .put(
    validateRequest(productValidationSchema.updateProductValidationSchema),
    productController.updateSingleProductController,
  )
  .delete(productController.deleteSingleProductFromDB);

export default Router;
