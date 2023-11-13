import { Component, Input, OnInit } from '@angular/core';
import { ProductDetails } from 'src/app/models/product-details.model';


@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit {

  @Input() quantity: number = 1;

  isProductAdded: boolean = false;
  product!: ProductDetails;

  ngOnInit(): void {
    let productString = localStorage.getItem('homeSelectedProduct');
    if(productString != null) this.product = JSON.parse(productString);
  }


  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onClick() {
    let products = localStorage.getItem('productsFromViewPage');
    if(products == null) {
      this.product.quantity = this.quantity;
      let productArray = [this.product];
      localStorage.setItem("productsFromViewPage", JSON.stringify(productArray));
    } else {
      let productArray = JSON.parse(products);
      let isItemIdPresentInStorage = false;
      for(let i = 0; i < productArray.length; i++) {
        if(productArray[i].productName === this.product.productName && productArray[i].brandName === this.product.brandName) {
          isItemIdPresentInStorage = true;
          productArray[i].quantity += this.quantity;
        }
      }
      this.product.quantity = this.quantity;
      if(!isItemIdPresentInStorage) productArray.push(this.product);
      localStorage.setItem("productsFromViewPage", JSON.stringify(productArray));
    }
    this.isProductAdded = true;
  }

}

