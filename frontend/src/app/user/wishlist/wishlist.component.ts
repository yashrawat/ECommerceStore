import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../utils/cart.service';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist;

  constructor(private userService: UserService, private cartService: CartService, private router: Router) { }

  addItemToCart(product): any {
    this.cartService.addToCart(product);
    // this.removeItemFromWishlist(product.id);
    this.router.navigate(['/product/cart-ui']);
  }

  removeItemFromWishlist(productId): any {
    this.userService.removeItemFromWishlist(productId);
    this.wishlist = this.userService.getWishlist();
  }

  ngOnInit(): void {
    this.wishlist = this.userService.getWishlist();
  }

}
