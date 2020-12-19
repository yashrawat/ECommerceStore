import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/utils/cart.service';

import { ProductService } from '../../utils/product.service';

@Component({
  selector: 'app-product-search-result',
  templateUrl: './product-search-result.component.html',
  styleUrls: ['./product-search-result.component.css']
})
export class ProductSearchResultComponent implements OnInit {

  searchForm1: FormGroup;
  filteredData;

  constructor(private productService: ProductService, private fb: FormBuilder, private cartService: CartService) { }

  filterSearch1(): void {
    const searchTextResult = this.searchForm1.get('searchText').value;
    this.productService.filterSearchResults(searchTextResult);
    this.filteredData = this.productService.filteredData;
  }

  addToCart(data): any {
    this.cartService.addToCart(data);
  }

  ngOnInit(): void {
    this.searchForm1 = this.fb.group({
      searchText: ['', [Validators.required]]
    });
    this.filteredData = this.productService.filteredData;
  }

}
