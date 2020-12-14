import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../../utils/product.service';
import { CartService } from '../../utils/cart.service';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist;
  productData;
  productDataSubs: Subscription;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) { }

  addItemToCart(product): any {
    this.cartService.addToCart(product);
    // this.removeItemFromWishlist(product.id);
    this.router.navigate(['/product/cart-ui']);
  }

  // removeItemFromWishlist(productId): any {
  //   this.userService.removeItemFromWishlist(productId);
  //   this.wishlist = this.userService.getWishlist();
  // }

  getWishlistProducts(): any {
    this.userService.getWishlistProductId().forEach(productId => {
      // this.productData = this.productService.getProductById(productId);
      // TODO: add if check
      // if () {}
      this.wishlist = this.productService.getProductById(productId);
      // console.log(this.wishlist.productId);
      this.productDataSubs = this.productService.getProductDataUpdated()
        .subscribe(productStatus => {
          // this.productData = productStatus.products;
          this.wishlist = productStatus.products;
          console.log(this.wishlist);
        });
    });
  }

  ngOnInit(): void {
    this.userService.getUserData();
    this.getWishlistProducts();
  }

}
