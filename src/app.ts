
// index.ts
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userroutes';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);

mongoose
  .connect('connection string', {
   
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
