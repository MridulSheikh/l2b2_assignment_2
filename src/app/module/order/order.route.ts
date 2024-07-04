import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import orderValidationSchema from './order.validation.schema';
import orderController from './order.controller';

const Router = express.Router();

Router.route('/')
  .post(
    validateRequest(orderValidationSchema.createOrderValidationSchema),
    orderController.createOrderController,
  )
  .get(orderController.getAllOrderFromDBController);

export default Router;
