import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import allRoutes from './app/routes/index';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', allRoutes);

const test = async (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'Server Running',
  });
};

app.get('/', test);

app.use('*', notFound);

export default app;
