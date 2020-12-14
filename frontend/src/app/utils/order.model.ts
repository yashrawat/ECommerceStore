// import { Product } from '../product/product.model';

export interface Order {
  // id: string;
  productId: string;
  orderDate: Date;
  deliveryAddress: string;
  paymentMethod: string;
}

// export interface Order {
//   product: Product;
//   orderDate: Date;
//   deliveryAddress: string;
//   paymentMethod: string;
// }
