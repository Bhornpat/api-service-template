import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id: Number(id) },
  });
}

export async function createProduct(data) {
  return await prisma.product.create({ data });
}

export async function updateProduct(id, data) {
  const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new Error('Product not found');

  return await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteProduct(id) {
  const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new Error('Product not found');

  return await prisma.product.delete({ where: { id: Number(id) } });
}

