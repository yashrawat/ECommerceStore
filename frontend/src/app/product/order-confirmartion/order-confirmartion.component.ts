import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/utils/auth.service';
import { CartService } from 'src/app/utils/cart.service';

@Component({
  selector: 'app-order-confirmartion',
  templateUrl: './order-confirmartion.component.html',
  styleUrls: ['./order-confirmartion.component.css']
})
export class OrderConfirmartionComponent implements OnInit, OnDestroy {

  date = new Date();
  itemsList;
  userData;
  userId;
  userDataSubs: Subscription;
  paymentMethodValue;

  constructor(private cartService: CartService, private authService: AuthService) { }

  calculateTotalPrice(): any {
    if (this.itemsList) {
      return this.itemsList.map(grandTotal => grandTotal.price * grandTotal.quantity)
        .reduce((a, value) =>
          a + value, 0
        );
    }
  }

  ngOnInit(): void {
    // get itemsList Data
    this.itemsList = this.cartService.getItems();

    // get userData
    this.userId = this.authService.getUserId();
    this.authService.getUserById(this.userId);
    this.userDataSubs = this.authService.getUserDataUpdated()
      .subscribe(fetchedUserData => {
        this.userData = fetchedUserData;
      });

    // get paymentMethodValue
    this.paymentMethodValue = this.authService.getpaymentMethodValue();
  }

  ngOnDestroy(): any {
    this.userDataSubs.unsubscribe();
  }

}
