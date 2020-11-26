import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../utils/product.service';

@Component({
  selector: 'app-product-search-result',
  templateUrl: './product-search-result.component.html',
  styleUrls: ['./product-search-result.component.css']
})
export class ProductSearchResultComponent implements OnInit {

  searchForm1: FormGroup;
  filteredData;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  filterSearch1(): void {
    const searchTextResult = this.searchForm1.get('searchText').value;
    this.filteredData = this.productService.filterSearchResults(searchTextResult);
  }

  ngOnInit(): void {
    this.searchForm1 = this.fb.group({
      searchText: ['', [Validators.required]]
    });
    // this.filterSearch1();
  }

}
