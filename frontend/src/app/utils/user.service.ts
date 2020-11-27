import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ProductService } from '.././utils/product.service';
import { Order } from '../utils/order.model';
import { Wishlist } from '../utils/wishlist.model';

const BACKEND_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dummyOrders: Order[] = [
    {
      product: {
        id: 'jkhfddsj0',
        productName: 'ProductOne',
        productContent: 'Content of ProductOne',
        imagePath: '../../assets/images/1.jpg',
        price: 1500,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'UPI'
    },
    {
      product: {
        id: '2kajrj3jjja',
        productName: 'ProductTwo',
        productContent: 'Content of ProductTwo',
        imagePath: '../../assets/images/2.jpg',
        price: 12500,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'Credit Card'
    },
    {
      product: {
        id: '33jjkejfd',
        productName: 'ProductThree',
        productContent: 'Content of ProductThree',
        imagePath: '../../assets/images/3.jpg',
        price: 101500,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'Net Banking'
    },
    {
      product: {
        id: '4sdkfnlkds',
        productName: 'ProductFour',
        productContent: 'Content of ProductFour',
        imagePath: '../../assets/images/4.jpg',
        price: 800,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'UPI'
    },
    {
      product: {
        id: '6mfnqrnkj',
        productName: 'ProductSix',
        productContent: 'Content of ProductSix',
        imagePath: '../../assets/images/6.jpg',
        price: 9500,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'Debit Card'
    },
    {
      product: {
        id: '7wqmerbewre',
        productName: 'ProductSeven',
        productContent: 'Content of ProductSeven',
        imagePath: '../../assets/images/7.jpg',
        price: 11500,
        quantity: null
      },
      orderDate: new Date('12/11/2020'),
      deliveryAddress: 'BTM Layout, Bengaluru, Karnataka, India',
      paymentMethod: 'UPI'
    }
  ];

  private dummyWishlist: Wishlist[] = [
    {
      product: {
        id: 'jkhfddsj0',
        productName: 'ProductOne',
        productContent: 'Content of ProductOne',
        imagePath: '../../assets/images/1.jpg',
        price: 1500,
        quantity: null
      },
      userId: '1'
    },
    {
      product: {
        id: '2kajrj3jjja',
        productName: 'ProductTwo',
        productContent: 'Content of ProductTwo',
        imagePath: '../../assets/images/2.jpg',
        price: 12500,
        quantity: null
      },
      userId: '2'
    },
    {
      product: {
        id: '33jjkejfd',
        productName: 'ProductThree',
        productContent: 'Content of ProductThree',
        imagePath: '../../assets/images/3.jpg',
        price: 101500,
        quantity: null
      },
      userId: '3'
    },
    {
      product: {
        id: '4sdkfnlkds',
        productName: 'ProductFour',
        productContent: 'Content of ProductFour',
        imagePath: '../../assets/images/4.jpg',
        price: 800,
        quantity: null
      },
      userId: '4'
    },
    {
      product: {
        id: '6mfnqrnkj',
        productName: 'ProductSix',
        productContent: 'Content of ProductSix',
        imagePath: '../../assets/images/6.jpg',
        price: 9500,
        quantity: null
      },
      userId: '5'
    },
    {
      product: {
        id: '7wqmerbewre',
        productName: 'ProductSeven',
        productContent: 'Content of ProductSeven',
        imagePath: '../../assets/images/7.jpg',
        price: 11500,
        quantity: null
      },
      userId: '6'
    }
  ];

  constructor(private productService: ProductService, private http: HttpClient) { }

  getOrders(): any {
    return this.dummyOrders;
  }

  getWishlist(): any {
    return this.dummyWishlist;
  }

  getProductById(productId): any {
    this.productService.getProductById(productId);
  }

  addItemToWishlist(productId): any {
    const itemExistInWishlist = this.dummyWishlist.find(wishlist => wishlist.product.id === productId);
    if (itemExistInWishlist) {
      const productDetails = this.getProductById(productId);
      // TODO: why productDetails is undefined?
      console.log(productDetails);
      const a = this.dummyWishlist.push({
        product: productDetails,
        userId: 'xyz'
      });
      console.log(a);
      return;
    }
    console.log('Product already added to wishlist');
  }

  removeItemFromWishlist(productId): any {
    this.dummyWishlist = this.dummyWishlist.filter(item => item.product.id !== productId);
  }
}
