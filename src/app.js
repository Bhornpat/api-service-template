//แยก app.js = เพื่อให้ Express app เป็น pure instance ไม่รัน server เอง → ทำให้สามารถใช้ใน test, serverless, multi-runtime ได้
import express from 'express';
import dotenv from 'dotenv';
import productRouter from './api/product.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/products', productRouter);

export default app;

