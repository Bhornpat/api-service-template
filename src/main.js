import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import productRouter from './api/product.route.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error("❌ Failed to start server:", err);
});

