import { Component } from '@angular/core';
import { SubmitProductsService } from 'src/app/service/submitProducts/submit-products.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent {

  vendorImage: string = "";
  isSubmitted: boolean = false;

  brandName :string ="";
  vendorName:string="";
  vendorId:number = 0;

  constructor(private submitProducts: SubmitProductsService){
    let vendorDetails = localStorage.getItem("vendor-details");
    if(vendorDetails != null){
      let parsedVendorDetails = JSON.parse(vendorDetails);
      this.brandName=parsedVendorDetails.brandName;
      this.vendorName=parsedVendorDetails.vendorName;
      this.vendorId=parsedVendorDetails.vendorId;

    }
   
    
  }

  submit(productForm: any) {

    let productDetailsFromVendor: any;

    if(productForm.value != null) {
      productDetailsFromVendor = productForm.value;
      //productDetailsFromVendor['status'] = "PENDING";
      const fileName = this.vendorImage.replace(/^.*[\\\/]/, '');
      productDetailsFromVendor['productImage'] = fileName; 

      productDetailsFromVendor['vendorId'] = this.vendorId;
      this.submitProducts.postProducts(productDetailsFromVendor).subscribe(response => console.log(response));

    }



    // let vendorSubmittedProductString = localStorage.getItem('vendorSubmittedProduct');
    // if(vendorSubmittedProductString == null) {
    //   let productDetailsFromVendorArray = [productDetailsFromVendor];
    //   localStorage.setItem('vendorSubmittedProduct', JSON.stringify(productDetailsFromVendorArray));
    // } else {
    //   let vendorSubmittedProduct = JSON.parse(vendorSubmittedProductString);
    //   vendorSubmittedProduct.push(productDetailsFromVendor);
    //   localStorage.setItem('vendorSubmittedProduct', JSON.stringify(vendorSubmittedProduct));
    // }
    this.isSubmitted = true;
  }

}
