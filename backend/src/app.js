import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', reportRoutes);

app.use(errorHandler);

export default app;
