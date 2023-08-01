import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, map } from 'rxjs';
import { DbData } from '../models/dbData';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private router: Router) { }

  private url = 'http://localhost:3000/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProducts(): Observable<DbData> {
    return this.http.get<DbData>(this.url + '/product').pipe(
      catchError(this.errorHandler)
    )
  }

  getProduct(productId): Observable<DbData> {
    return this.http.get<DbData>(this.url + `/product/${productId}`).pipe(catchError(this.errorHandler));
  }


  createProduct(product): Observable<Product> {
    return this.http.post<Product>(this.url + '/product', JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteProduct(id: any) {
    this.http.delete(`${this.url}/product/${id}`).subscribe(() => {
      location.reload();

    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<DbData>(`${this.url}/product/${product.id}`, JSON.stringify(product), this.httpOptions)
      .pipe((map((data: DbData) => new Product(
        data.body.id,
        data.body.price,
        data.body.carousel,
        data.body.additional,
        data.body.dezen,
        data.body.gnezdo,
        data.body.komplet,
        data.body.category
      ))));
  }



  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

