// models/User.ts
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  role: 'user' | 'admin';
  tokens: string[];
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  tokens: [{ type: String }],
});

export default mongoose.model<IUser>('User', userSchema);
