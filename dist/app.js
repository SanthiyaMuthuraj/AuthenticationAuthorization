"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//mongodb+srv://Santhiya:sandy@cluster0.hi1cuc6.mongodb.net/task1302
// index.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userroutes_1 = __importDefault(require("./routes/userroutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/users', userroutes_1.default);
app.use('/products', productRoutes_1.default);
mongoose_1.default
    .connect('mongodb+srv://Santhiya:sandy@cluster0.hi1cuc6.mongodb.net/ExampleSAmple', {})
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
