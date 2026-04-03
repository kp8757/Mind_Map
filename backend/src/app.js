import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '2mb' }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120
  })
);

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
