import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";


@Injectable({
    //so we can use the code elsewhere
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) { }

    // getProducts(): IProduct[] {
    //     return [
    //         {
    //             "productId": 2,
    //             "productName": "Garden Cart",
    //             "productCode": "GDN-0023",
    //             "releaseDate": "March 18, 2021",
    //             "description": "15 gallon capacity rolling garden cart",
    //             "price": 32.99,
    //             "starRating": 4.2,
    //             "imageUrl": "assets/images/garden_cart.png"
    //         },
    //         {
    //             "productId": 5,
    //             "productName": "Hammer",
    //             "productCode": "TBX-0048",
    //             "releaseDate": "May 21, 2021",
    //             "description": "Curved claw steel hammer",
    //             "price": 8.9,
    //             "starRating": 4.8,
    //             "imageUrl": "assets/images/hammer.png"
    //         }
    //     ]
    // }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('ALL', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }


    private handleError (err: HttpErrorResponse) {
        let errorMessage = " ";
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An eror occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}