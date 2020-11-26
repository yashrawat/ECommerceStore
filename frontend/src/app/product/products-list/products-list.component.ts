import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CartService } from '../../utils/cart.service';
import { ProductService } from '../../utils/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  searchForm: FormGroup;
  productData;
  // filteredData;
  productDataSubs: Subscription;

  constructor(private productService: ProductService, private fb: FormBuilder, private cartService: CartService) { }

  filterSearch(): any {
    const searchTextResult = this.searchForm.get('searchText').value;
    this.productService.filterSearchResults(searchTextResult);
  }

  addToCart(product): any {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchText: ['', [Validators.required]]
    });
    this.productData = this.productService.getProductData();
    // this.filteredData = this.productService.filterSearchResults();

    this.productDataSubs = this.productService.getProductDataUpdated()
      .subscribe(productStatus => {
        this.productData = productStatus.products;
      });
  }

}
