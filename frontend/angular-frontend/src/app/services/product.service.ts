import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {count, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/products-category';
  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(
    thePage: number,
    theCategoryId: number,
    thePageSize: number): Observable<GetResponseProducts>{
    // building url based by categoryId, page and size
    const searchUrl = `${this.baseUrl}/search/findByProductCategory_Id?id=${theCategoryId}`
                           + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // This method returns an Observable of type Product[]
  getProductList(theCategoryId: number): Observable<Product[]>{
    // building url based by categoryId
    const searchUrl = `${this.baseUrl}/search/findByProductCategory_Id?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string | null): Observable<Product[]> {
    // building url based by keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
