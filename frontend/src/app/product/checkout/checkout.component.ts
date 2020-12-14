import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/utils/auth.service';
import { CartService } from 'src/app/utils/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'];
  radioPaymentMethod;
  itemsList;
  userId;
  userData;
  userDataSubs: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  // works
  // radio buttons change handler
  radioChangeHandler(event): any {
    this.radioPaymentMethod = event.target.value;
  }

  // works
  calculateTotalPrice(): any {
    if (this.itemsList) {
      return this.itemsList.map(grandTotal => grandTotal.price * grandTotal.quantity)
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
    this.itemsList = this.cartService.getItems();
  }

  // works
  onConfirmOrder(): any {
    this.authService.confirmOrder(this.radioPaymentMethod);
    this.router.navigate(['/product/order-confirmation']);
  }

  ngOnInit(): void {
    // get itemsList Data
    this.itemsList = this.cartService.getItems();

    // get userData
    this.userId = this.authService.getUserId();
    this.authService.getUserById(this.userId);
    this.userData = this.authService.getUserData();
    this.userDataSubs = this.authService.getUserDataUpdated()
      .subscribe(fetchedUserData => {
        this.userData = fetchedUserData;
      });
  }

  ngOnDestroy(): any {
    this.userDataSubs.unsubscribe();
  }

}
