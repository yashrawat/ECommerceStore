import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ProductService } from '.././utils/product.service';
import { User } from '../user/user.model';

const BACKEND_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authId: string;
  private cart;
  private order;
  private wishlist;
  private wishlistProductId = [];

  constructor(private productService: ProductService, private http: HttpClient) { }

  // get model
  getAuthId(): any {
    return this.authId;
  }

  getCart(): any {
    return this.cart;
  }

  getWishlist(): any {
    return this.wishlist;
  }

  getOrder(): any {
    return this.order;
  }

  getWishlistProductId(): any {
    return this.wishlistProductId;
  }

  getProductById(productId): any {
    this.productService.getProductById(productId);
  }

  // new code
  getUserData(): any {
    this.http.get<{ message: string; userData: User }>(`${BACKEND_URL}/getUserData`)
      .pipe(
        map(data => {
          return {
            authId: data.userData[0].authId,
            cart: data.userData[0].cart,
            wishlist: data.userData[0].wishlist,
            order: data.userData[0].order
          };
        })
      )
      .subscribe(responseData => {
        this.authId = responseData.authId;
        this.cart = responseData.cart.itemsList;
        responseData.wishlist.productsList.forEach(wishlistProduct => {
          if (this.wishlistProductId.includes(wishlistProduct.productId) === false) {
            this.wishlistProductId.push(wishlistProduct.productId);
          }
        });
        this.order = responseData.order.ordersList;
        // this.order = responseData.order.ordersList.forEach(orderProduct => console.log(orderProduct));
        // console.log(`authId => ${responseData.authId}`);
        // console.log(`cart => ${responseData.cart.itemsList[0].productId}`);
        // console.log(`wishlist => ${responseData.wishlist.productsList[0].productId}`);
        // console.log(`order => ${responseData.order.ordersList[0].productId}`);
      });
  }

  addUserData(authId: string, cart: any, wishlist: any, order: any): any {
    const userData: User = {
      authId,
      cart,
      wishlist,
      order
    };

    this.http.post<{ message: string; userData: User }>(`${BACKEND_URL}/addUserData`, userData);
  }

  // Completed
  deleteUserDataById(id: string): any {
    return this.http.delete(`${BACKEND_URL}/deleteUserDataById/${id}`);
  }

  // --------------------------------------------------------------------------------------------------

  // addItemToWishlist(productId): any {
  //   const itemExistInWishlist = this.dummyWishlist.find(wishlist => wishlist.product.id === productId);
  //   if (itemExistInWishlist) {
  //     const productDetails = this.getProductById(productId);
  //     // TODO: why productDetails is undefined?
  //     console.log(productDetails);
  //     const a = this.dummyWishlist.push({
  //       product: productDetails,
  //       userId: 'xyz'
  //     });
  //     console.log(a);
  //     return;
  //   }
  //   console.log('Product already added to wishlist');
  // }
  // removeItemFromWishlist(productId): any {
  //   this.dummyWishlist = this.dummyWishlist.filter(item => item.product.id !== productId);
  // }
}
