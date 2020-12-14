import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

const BACKEND_URL = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsService = [];

  constructor(private snackbar: MatSnackBar) { }

  openSnackbar(message, action): any {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  addToCart(product): any {
    const itemExistInCart = this.itemsService.find(({_id}) => _id === product._id);
    if (!itemExistInCart) {
      this.itemsService.push({...product, quantity: 1});
      this.openSnackbar('Added to cart', 'Added');
      return;
    }
    itemExistInCart.quantity += 1;
    this.openSnackbar('Already in cart', 'Quantity Incremented');
  }

  deleteCartItem(pid): any {
    this.itemsService = this.itemsService.filter(item => item._id !== pid);
    this.openSnackbar('Deleted from cart', 'Deleted');
  }

  quantityIncrement(pid): any {
    const item = this.itemsService.find(({_id}) => _id === pid);
    item.quantity += 1;
    this.openSnackbar('Quantity Incremented', 'Incremented');
  }

  quantityDecrement(pid): any {
    const item = this.itemsService.find(({_id}) => _id === pid);
    if (item.quantity <= 1) {
      return;
    }
    item.quantity -= 1;
    this.openSnackbar('Quantity Decremented', 'Decremented');
  }

  getItems(): any {
    return this.itemsService;
  }

  clearCart(): any {
    this.itemsService = [];
    return this.itemsService;
  }

  // Checkout
  // 1. Cartitems added to checkout (TODO: on placement of order, add these items to orderlist)
  // 2. also send value of payment method selected to orderlist
  // 3. Fetch address of user, then on order placement send address to orderlist
  // onCheckout(): any {}
}
