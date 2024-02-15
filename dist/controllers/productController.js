"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
class ProductController {
    static addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming the request body contains product details
                const { productName, price, status, followup, description } = req.body;
                // Check if product name already exists
                const existingProduct = yield product_1.default.findOne({ productName });
                if (existingProduct) {
                    res.status(400).json({ error: 'Product with this name already exists.' });
                    return;
                }
                // Create a new product
                const newProduct = new product_1.default({
                    productName,
                    price,
                    status,
                    followup,
                    description,
                });
                // Save the product to the database
                yield newProduct.save();
                res.status(201).json({ message: 'Product added successfully.' });
            }
            catch (error) {
                console.error('Error adding product:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static viewProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all products from the database
                const products = yield product_1.default.find({}, { _id: 0, __v: 0 });
                res.status(200).json({ products });
            }
            catch (error) {
                console.error('Error fetching products:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = ProductController;
