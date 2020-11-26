import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../product/product.model';

const BACKEND_URL = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  filteredData = [];

  private productData: Product[] = [];
  private productDataUpdated = new Subject<{ products: Product[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  filterSearchResults(searchTextResult): any {
    this.filteredData = [];
    const searchTextValue = searchTextResult;
    this.productData.forEach(products => {
      if (products.productName.toLowerCase().includes(searchTextValue)) {
        this.filteredData.push(products);
        // console.log(products);
      }
    });
    // console.log(this.filteredData);
    this.router.navigate(['/product/product-search-result']);
    // return this.filteredData;
  }

  // code connected with backend
  getProductData(): any {
    this.http.get<{ message: string; products: Product[]; }>(`${BACKEND_URL}/allProducts`)
      .subscribe((fetchedProductsData) => {
        this.productData = fetchedProductsData.products;
        this.productDataUpdated.next({ products: [...this.productData] });
      });
  }

  getProductDataUpdated(): any {
    return this.productDataUpdated.asObservable();
  }

  getProductById(productId): any {
    this.http.get<{ message: string; products: Product[]; }>(`${BACKEND_URL}/productById/${productId}`)
      .subscribe((fetchedProductData) => {
        this.productData = fetchedProductData.products;
        this.productDataUpdated.next({ products: this.productData });
      });
  }
}
