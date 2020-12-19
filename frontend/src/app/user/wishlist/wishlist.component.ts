import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/utils/auth.service';
import { CartService } from 'src/app/utils/cart.service';
import { ProductService } from 'src/app/utils/product.service';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {

  wishlist;
  wishlistSubs: Subscription;
  authUserId;

  productData;
  productDataSubs: Subscription;
  productId;

  wishlistWithProduct = [];
  wishlistWithProductUnfiltered = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  // addItemToCart(product): any {
  //   this.cartService.addToCart(product);
  //   // this.removeItemFromWishlist(product.id);
  //   this.router.navigate(['/product/cart-ui']);
  // }

  // removeItemFromWishlist(productId): any {
  //   this.userService.removeItemFromWishlist(productId);
  //   this.wishlist = this.userService.getWishlist();
  // }

  // -----------------------------------------------------------------------------------------------------------------

  // TODO: add product to cart & then remove product from wishlist
  addProductToCartFromWishlist(wishlistProduct): any {
    const product = {
      _id: wishlistProduct.productId,
      productName: wishlistProduct.productName,
      productContent: wishlistProduct.productContent,
      imagePath: wishlistProduct.imagePath,
      price: wishlistProduct.price,
      quantity: wishlistProduct.quantity
    };
    console.log(product);
    // this.removeProductFromWishlist(wishlistProduct.productId);
    // this.router.navigate(['/product/cart-ui']);
  }

  // TODO: remove product from wishlist
  removeProductFromWishlist(wishlistProductId): any {}

  ngOnInit(): void {
    // get userEssentials data
    this.authUserId = this.authService.getUserId();
    this.userService.getUserEssentialsData(this.authUserId);
    this.wishlist = this.userService.getWishlist();
    this.wishlistSubs = this.userService.getWishlistDataUpdated()
      .subscribe(fetchedWishlist => {
        this.wishlist = fetchedWishlist;

        // get product by productId
        this.wishlist.wishlist.forEach(data => {
          this.productId = data.productId;
          this.productData = this.productService.getProductById(this.productId);

          this.productDataSubs = this.productService.getProductDataUpdated()
            .subscribe(fetchedProduct => {
              // got product data
              this.productData = fetchedProduct.products;

              // mapped wishlist & productData into wishlistWithProductUnfiltered
              this.wishlistWithProductUnfiltered.push({
                productId: data.productId,
                // productId: fetchedProduct.products.productId,
                productName: fetchedProduct.products.productName,
                productContent: fetchedProduct.products.productContent,
                imagePath: fetchedProduct.products.imagePath,
                price: fetchedProduct.products.price,
                quantity: data.quantity,
              });

              // filtered duplicate products from wishlistWithProductUnfiltered & then pushed unique products into wishlistWithProduct
              this.wishlistWithProduct = this.wishlistWithProductUnfiltered.reduce((accumalator, current) => {
                if (!(accumalator.some(item => item.productId !== current.productId))) {
                  accumalator.push(current);
                }
                return accumalator;
              }, []);
            });
        });
      });
  }

  ngOnDestroy(): void {
    this.wishlistSubs?.unsubscribe();
    this.productDataSubs?.unsubscribe();
  }

}
