import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';

@Injectable({
  providedIn: 'root'
})
export class RetriveProductStatusService {

  constructor(private http: HttpClient) { }

  retriveProductStatus(productStatus : any){
    return this.http.get<ProductDetails[]>("http://localhost:8080/products/retrieve/"+productStatus);
  }
}
