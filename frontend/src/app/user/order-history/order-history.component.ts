import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/utils/auth.service';
import { ProductService } from 'src/app/utils/product.service';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  orderHistory;
  orderHistorySubs: Subscription;
  authUserId;

  productData;
  productDataSubs: Subscription;
  productId;

  ordersWithProduct = [];
  ordersWithProductUnfiltered = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // get userEssentials data
    this.authUserId = this.authService.getUserId();
    this.userService.getUserEssentialsData(this.authUserId);
    this.orderHistory = this.userService.getOrderHistory();
    this.orderHistorySubs = this.userService.getOrderHistoryUpdated()
      .subscribe(fetchedOrderHistory => {
        this.orderHistory = fetchedOrderHistory;

        // get product by productID
        this.orderHistory.orderHistory.forEach(data => {
          this.productId = data.productId;
          this.productData = this.productService.getProductById(this.productId);

          this.productDataSubs = this.productService.getProductDataUpdated()
            .subscribe(fetchedProduct => {
              // got product data
              this.productData = fetchedProduct.products;

              // mapped orderHistory & productData into ordersWithProductUnfiltered
              this.ordersWithProductUnfiltered.push({
                productId: data.productId,
                productName: fetchedProduct.products.productName,
                imagePath: fetchedProduct.products.imagePath,
                price: fetchedProduct.products.price,
                orderDate: data.orderDate,
                paymentMethod: data.paymentMethod,
                deliveryAddress: data.deliveryAddress
              });

              // filtered duplicate products from ordersWithProductUnfiltered & then inserted unique products into ordersWithProduct
              this.ordersWithProduct = this.ordersWithProductUnfiltered.reduce((accumalator, current) => {
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
    this.orderHistorySubs?.unsubscribe();
    this.productDataSubs?.unsubscribe();
  }

}
