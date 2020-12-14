import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchResultComponent } from './product-search-result/product-search-result.component';
import { CartUIComponent } from './cart-ui/cart-ui.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmartionComponent } from './order-confirmartion/order-confirmartion.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductSearchResultComponent,
    CartUIComponent,
    CheckoutComponent,
    OrderConfirmartionComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: []
})
export class ProductModule { }
