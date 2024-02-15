import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  productId: string;
  productName: string;
  price: number;
  status: string;
  followup: string;
  description: string;
}

const productSchema: Schema = new Schema({
  productId: { type: String, unique: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  followup: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<ProductDocument>('Product', productSchema);
