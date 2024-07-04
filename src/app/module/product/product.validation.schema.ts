import { z } from 'zod';

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    variants: z
      .array(
        z.object({
          type: z.string().optional(),
          value: z.string().optional(),
        }),
      )
      .min(1)
      .optional(),
    inventory: z
      .object({
        quantity: z.number().min(1).optional(),
        inStock: z.boolean().optional(),
      })
      .optional(),
  }),
});

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z
      .array(
        z.object({
          type: z.string(),
          value: z.string(),
        }),
      )
      .min(1),
    inventory: z.object({
      quantity: z.number().min(1),
      inStock: z.boolean(),
    }),
  }),
});

export default {
  createProductValidationSchema,
  updateProductValidationSchema,
};
