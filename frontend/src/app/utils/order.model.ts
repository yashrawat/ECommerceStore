import { Product } from '../product/product.model';

export interface Order {
  product: Product;
  orderDate: Date;
  deliveryAddress: string;
  paymentMethod: string;
}
