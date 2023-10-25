import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent {

  vendorImage: string = "";
  isSubmitted: boolean = false;

  submit(productForm: any) {

    let productDetailsFromVendor: any;

    if(productForm.value != null) {
      productDetailsFromVendor = productForm.value;
      productDetailsFromVendor['status'] = "PENDING";
      const fileName = this.vendorImage.replace(/^.*[\\\/]/, '');
      productDetailsFromVendor['image'] = fileName; 
    }

    let vendorSubmittedProductString = localStorage.getItem('vendorSubmittedProduct');
    if(vendorSubmittedProductString == null) {
      let productDetailsFromVendorArray = [productDetailsFromVendor];
      localStorage.setItem('vendorSubmittedProduct', JSON.stringify(productDetailsFromVendorArray));
    } else {
      let vendorSubmittedProduct = JSON.parse(vendorSubmittedProductString);
      vendorSubmittedProduct.push(productDetailsFromVendor);
      localStorage.setItem('vendorSubmittedProduct', JSON.stringify(vendorSubmittedProduct));
    }
    this.isSubmitted = true;
  }

}
