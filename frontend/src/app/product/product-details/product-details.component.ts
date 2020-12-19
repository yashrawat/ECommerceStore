import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/utils/user.service';
import { CartService } from '../../utils/cart.service';
import { ProductService } from '../../utils/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productData;
  productDataSubs: Subscription;
  productId;
  wishlistButton = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService
  ) { }

  addToCart(product): any {
    this.cartService.addToCart(product);
  }

  wishlistButtonClick(): any {
    if (!this.wishlistButton) {
      console.log('Added to wishlist');
      // this.addItemToWishlist();
    } else {
      console.log('Removed from wishlist');
      // Error in line 40, (TypeError: Cannot read property 'id' of undefined)
      // this.removeItemFromWishlist();
    }
    return this.wishlistButton = !this.wishlistButton;
  }

  // addItemToWishlist(): any {
  //   this.userService.addItemToWishlist(this.productId);
  // }

  // removeItemFromWishlist(): any {
  //   this.userService.removeItemFromWishlist(this.productId);
  // }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.productDataSubs = this.productService.getProductDataUpdated()
      .subscribe(productStatus => {
        this.productData = productStatus.products;
      });
    this.productData = this.productService.getProductById(this.productId);
  }

  ngOnDestroy(): void {
    this.productDataSubs.unsubscribe();
  }

}
