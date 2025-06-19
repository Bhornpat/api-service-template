import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = await createProduct({ name, description, price });
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updated = await updateProduct(id, { name, description, price });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteProduct(id);
    res.json({ message: 'Product deleted', data: deleted });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});


export default router;

