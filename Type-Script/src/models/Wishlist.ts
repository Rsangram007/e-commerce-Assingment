import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './usermodel';
import { IProduct } from './ProductModel';

export interface IWishlist extends Document {
  user: IUser['_id'];
  products: IProduct['_id'][];
}

const wishlistSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});

const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);

export default Wishlist;
