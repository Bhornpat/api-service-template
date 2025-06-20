import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/app.js'; // ให้เราย้าย server setup มาแยกออก

//เตรียมข้อมูลก่อนและหลังการทดสอบ
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.product.deleteMany();    // ล้างข้อมูลทั้งหมดในตาราง product ก่อนเริ่มทดสอบ
});

afterAll(async () => {
  await prisma.$disconnect();          // ปิดการเชื่อมต่อฐานข้อมูลหลังจบทุก test
});

describe('🧪 /api/products', () => {      //ใช้ describe() เพื่อจัดกลุ่มชุดของ test ที่เกี่ยวกับ /api/products
  let createdId;                          //ใช้เก็บ id ของสินค้าที่ถูกสร้างขึ้นเพื่อใช้ใน test ถัดไป

//สร้างสินค้าใหม่
  test('POST / should create a product', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Test Product',
      description: 'Test Description',
      price: 123.45,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');   // รหัส 201 ตรวจสอบชื่อสินค้าว่าตรงกับที่ส่งไป
    createdId = res.body.id;                      // เก็บ id เพื่อนำไปใช้ใน test ต่อๆ ไป
  });

//ดึงสินค้าทั้งหมด
  test('GET / should return product list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);         // รหัส 200 ตรวจว่า response เป็น array หรือไม่v
  });

//อัปเดตสินค้า
  test('PUT /:id should update product', async () => {
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send({ name: 'Updated Product', description: 'Updated', price: 999.99 });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Product');          // รหัส 200 ตรวจว่าอัปเดตสำเร็จหรือไม่
  });

//ลบสินค้า
  test('DELETE /:id should delete product', async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');         // รหัส 200 ตรวจว่าแสดงข้อความลบถูกต้อง
  });
});


//ชุดทดสอบ (Test Suite) ที่ใช้ทดสอบ API ของ /api/products
///Jest สำหรับการรัน test
///Supertest สำหรับจำลองการส่ง HTTP request ไปที่ server
///Prisma สำหรับเชื่อมต่อกับฐานข้อมูล
///Express App ที่อยู่ใน ../src/app.js
