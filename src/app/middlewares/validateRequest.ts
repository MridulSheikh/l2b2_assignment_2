import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import status from 'http-status';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      return res.status(status.UNPROCESSABLE_ENTITY).send({
        success: false,
        error: error,
      });
    }
  };
};

export default validateRequest;
