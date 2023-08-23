import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-grid.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


    products: Product[] = [];
    currentCategoryId: number = 1;
    currentCategoryName: string = "";
    searchMode: boolean = false;


    // Inject the ProductService
    constructor(private productService: ProductService,
                private route: ActivatedRoute) {
    }

    // Call the listProducts() method when the component is initialized
    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
        this.listProducts();
    }

    listProducts() {

        this.searchMode = this.route.snapshot.paramMap.has('keyword');

        if(this.searchMode){
            this.handleSearchProducts();
        } else {
            this.handleListProducts();
        }
    }

    handleListProducts() {
        //check if id parameter is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
            // get the "id" param string. convert string to a number using the "+" symbol
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

            // get the "name" param string
            this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
        } else {
            // not category id available ... default to category id 1
            this.currentCategoryId = 1;
            this.currentCategoryName = 'Books';
        }

        // now get the products for the given category id
        this.productService.getProductList(this.currentCategoryId).subscribe(
            data => {
                this.products = data;
            }
        )
    }

    private handleSearchProducts() {
      const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');

      // now search for products using given keyword
      this.productService.searchProducts(theKeyword).subscribe(
        data => {
          this.products = data;
        }
      );
    }

    protected readonly length = length;
}
