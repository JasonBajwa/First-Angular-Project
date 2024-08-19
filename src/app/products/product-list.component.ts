import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'PRODUCT LIST';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    // listFilter: string = 'cart';
    errorMessage: string = "";
    sub!: Subscription;

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        //This portion is to show what the filter is looking for
        this._listFilter = value;
        console.log('In Setter: ', value)

        //this is the acutal filter
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    //Basically used this as a get/set for product service
    constructor(private productService: ProductService) {

    }

    performFilter( filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy))
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        // this.products = this.productService.getProducts();
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });

        // this.filteredProducts = this.products;

        // this.listFilter = 'cart';
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    } 

    onRatingClicked(message: string): void {
        this.pageTitle = "Product List: " + message; 
    }

}