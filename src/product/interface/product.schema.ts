import { Document } from 'mongoose';
export interface Product extends Document {
  readonly email: String;
  readonly title: String;
  readonly imageUrl: String;
  readonly description: String;
  readonly created_at: Date;
}
