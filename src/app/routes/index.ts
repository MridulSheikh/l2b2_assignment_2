import { Router } from 'express';
import productRoute from '../module/product/product.route';
import orderRoute from '../module/order/order.route';

const router = Router();

const modulesRutes = [
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
];

modulesRutes.forEach((route) => router.use(route.path, route.route));

export default router;
