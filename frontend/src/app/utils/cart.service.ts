import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
// import { Router } from '@angular/router';

const BACKEND_URL = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsService = [];

  constructor(
    // private router: Router,
    private http: HttpClient
  ) { }

  addToCart(product): any {
    const itemExistInCart = this.itemsService.find(({_id}) => _id === product._id);
    if (!itemExistInCart) {
      this.itemsService.push({...product, quantity: 1});
      // debugging
      console.log(this.itemsService);
      // this.router.navigate(['/product/cart-ui']);
      return;
    }
    itemExistInCart.quantity += 1;
    // debugging
    console.log('Service 2 => Already in cart, quantity incremented');
    // this.router.navigate(['/product/cart-ui']);
  }

  deleteCartItem(pid): any {
    this.itemsService = this.itemsService.filter(item => item._id !== pid);
  }

  quantityIncrement(pid): any {
    const item = this.itemsService.find(({_id}) => _id === pid);
    item.quantity += 1;
  }

  quantityDecrement(pid): any {
    const item = this.itemsService.find(({_id}) => _id === pid);
    if (item.quantity <= 1) {
      return;
    }
    item.quantity -= 1;
  }

  getItems(): any {
    return this.itemsService;
  }

  clearCart(): any {
    this.itemsService = [];
    return this.itemsService;
  }
}
