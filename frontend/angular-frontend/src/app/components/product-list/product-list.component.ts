import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    // Create an array of type Product
    products: Product[] = [];

    // Inject the ProductService
    constructor(private productService: ProductService) {
    }

    // Call the listProducts() method when the component is initialized
    ngOnInit(): void {
        this.listProducts();
    }

    listProducts() {
        this.productService.getProductList().subscribe(
            data => {
                this.products = data;
            }
        )
    }

}
