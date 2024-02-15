// routes/productRoutes.ts
import express from 'express';
import ProductController from '../controllers/productController';
import { authenticateUser, authorizeAdmin } from '../utils/authMiddleware';

const router = express.Router();

router.use(authenticateUser); // Middleware to authenticate users

router.post('/products', authorizeAdmin, ProductController.addProduct);
router.get('/products', ProductController.viewProducts);

export default router;
