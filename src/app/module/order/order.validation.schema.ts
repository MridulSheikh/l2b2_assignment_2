import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
  }),
});

const orderValidationSchema = {
  createOrderValidationSchema,
};

export default orderValidationSchema;
