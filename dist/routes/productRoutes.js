"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/productRoutes.ts
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddleware_1 = require("../utils/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateUser); // Middleware to authenticate users
router.post('/products', authMiddleware_1.authorizeAdmin, productController_1.default.addProduct);
router.get('/products', productController_1.default.viewProducts);
exports.default = router;
