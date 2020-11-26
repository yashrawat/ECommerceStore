import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../utils/cart.service';

@Component({
  selector: 'app-cart-ui',
  templateUrl: './cart-ui.component.html',
  styleUrls: ['./cart-ui.component.css']
})
export class CartUIComponent implements OnInit {

  itemsUI;

  constructor(private cartService: CartService, private router: Router) { }

  calculateTotalPrice(): any {
    if (this.itemsUI) {
      return this.itemsUI.map(grandTotal => grandTotal.price * grandTotal.quantity)
        .reduce((a, value) =>
          a + value, 0
        );
    }
  }

  incrementQuantityButton(id): any {
    this.cartService.quantityIncrement(id);
  }

  decrementQuantityButton(id): any {
    this.cartService.quantityDecrement(id);
  }

  deleteCartItem(id): any {
    this.cartService.deleteCartItem(id);
    this.itemsUI = this.cartService.getItems();
  }

  onCheckout(): any {
    // TODO: write before checkout code
    this.router.navigate(['/product/checkout']);
  }

  ngOnInit(): void {
    this.itemsUI = this.cartService.getItems();
  }

}
