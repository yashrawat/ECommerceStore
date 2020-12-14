import { Product } from '../product/product.model';
import { Order } from '../utils/order.model';
import { Wishlist } from '../utils/wishlist.model';

export interface User {
  // id: string;
  authId: string;
  cart: {
    itemsList: [
      {
        product: Product;
      }
    ]
  };
  wishlist: {
    productsList: [
      {
        wishlist: Wishlist;
      }
    ]
  };
  order: {
    ordersList: [
      {
        order: Order;
      }
    ]
  };
}

// export interface User {
//   userId: string;
//   name: string;
//   email: string;
//   address: string;
//   mobileNumber: number;
// }
