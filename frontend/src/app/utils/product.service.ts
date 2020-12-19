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

  // Works
  getProductDataUpdated(): any {
    return this.productDataUpdated.asObservable();
  }

  // Works
  // searching through products list
  filterSearchResults(searchTextResult): any {
    this.filteredData = [];
    const searchTextValue = searchTextResult;
    this.productData.forEach(products => {
        if (products.productName.toLowerCase().includes(searchTextValue.toLowerCase())) {
          this.filteredData.push(products);
        }
      }
    );
    this.router.navigate(['/product/product-search-result']);
  }

  // Works
  // Get all products
  getProductData(): any {
    this.http.get<{ message: string; products: Product[]; }>(`${BACKEND_URL}/allProducts`)
      .subscribe((fetchedProductsData) => {
        // this.productData = [];
        this.productData = fetchedProductsData.products;
        this.productDataUpdated.next({ products: [...this.productData] });
      });
  }

  // Works
  // Get One Product By ID
  getProductById(productId): any {
    this.http.get<{ message: string; products: Product[]; }>(`${BACKEND_URL}/productById/${productId}`)
      .subscribe((fetchedProductData) => {
        // this.productData = [];
        this.productData = fetchedProductData.products;
        this.productDataUpdated.next({ products: this.productData });
      });
  }
}
