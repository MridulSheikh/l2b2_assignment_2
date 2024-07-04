import { Request, Response } from 'express';
import orderServices from './order.service';
import httpStatus from 'http-status';

const createOrderController = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.createOrderService(req.body);
    const response = { ...(result as any)._doc };
    delete response._id;
    res.status(httpStatus.OK).send({
      success: true,
      message: 'Order created successfully!',
      data: response,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send({
      success: true,
      message: error.message || 'Something went wrong!',
    });
  }
};

const getAllOrderFromDBController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await orderServices.getAllOrderFromDbService(
      email as string,
    );
    res.status(httpStatus.OK).send({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send({
      success: true,
      message: error.message || 'Something went wrong!',
    });
  }
};

const orderController = {
  createOrderController,
  getAllOrderFromDBController,
};

export default orderController;
