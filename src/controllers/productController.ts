// controllers/ProductController.ts
import { Request, Response } from 'express';
import Product from '../models/product';
import { IUser } from '../models/user';

class ProductController {
  public static async addProduct(req: Request, res: Response): Promise<void> {
    try {
      // Assuming the request body contains product details
      const { productName, price, status, followup, description } = req.body;

      // Check if product name already exists
      const existingProduct = await Product.findOne({ productName });
      if (existingProduct) {
        res.status(400).json({ error: 'Product with this name already exists.' });
        return;
      }

      // Create a new product
      const newProduct = new Product({
        productName,
        price,
        status,
        followup,
        description,
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async viewProducts(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all products from the database
      const products = await Product.find({}, { _id: 0, __v: 0 });

      res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ProductController;
