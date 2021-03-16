import * as mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
  email: String,
  title: String,
  imageUrl: String,
  description: String,
});
