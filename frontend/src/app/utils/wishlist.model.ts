import { Product } from '../product/product.model';

export interface Wishlist {
  product: Product;
  userId: string;
}
