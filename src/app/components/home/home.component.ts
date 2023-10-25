import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: ProductDetails[] = [];
  productBrands: string[] = [];

  constructor(private router: Router) {
    let isCustomerLoggedIn = localStorage.getItem('isLogin');
    if(isCustomerLoggedIn == null) localStorage.setItem('isLogin', JSON.stringify(false));
  }

  ngOnInit(): void {

    localStorage.removeItem('homeSelectedProduct');

    let products = localStorage.getItem('showProductsToCustomer');
    if(products != null) {
      this.productDetails = JSON.parse(products);
      this.productBrands = this.productDetails
                            .filter((product) => product.status === "SHOW_CUSTOMER")
                            .map((product) => product.brandName)
                            .filter((value, index, self) => self.indexOf(value) === index) ;
      
      for(let i = 0; i < this.productDetails.length; i++) {
        let product = this.productDetails[i];
        product['imagePath'] = "../../../assets/" + product.brandName + "/" + product.productCategory.toLowerCase() + "/" + product.image;
        console.log(product.imagePath);
      }
    }
  }

  onClick(product: ProductDetails) {
    localStorage.setItem('homeSelectedProduct', JSON.stringify(product));
    this.router.navigate(["/view-product"]);
  }

}
