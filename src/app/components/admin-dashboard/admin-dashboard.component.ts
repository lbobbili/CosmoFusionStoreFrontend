import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { VendorDetails } from 'src/app/models/vendor.details.model';
import { ProductDetails } from 'src/app/models/vendor.product.details.model';
import { RetriveProductStatusService } from 'src/app/service/retriveProductStatus/retrive-product-status.service';
import { RetriveRegistrationsService } from 'src/app/service/retriveRegistrations/retrive-registrations.service';
import { UpdateRegistrationStatusService } from 'src/app/service/updateRegistrationStatus/update-registration-status.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  vendorDetails: any;
  vendorProductDetails: any;
  showProductsToCustomer: any;

  hasPendingSignupRequests: boolean = false;
  hasPendingProductRequests: boolean = false;
  hasApprovedProducts: boolean = false;

  constructor(private retriveStatus: RetriveRegistrationsService, private updateStatus : UpdateRegistrationStatusService,
    private retriveProductStatus: RetriveProductStatusService){

  }

  ngOnInit(): void {
    this.retriveStatus.retriveByStatus("PENDING").subscribe(response => { 
      this.vendorDetails = response;
      this.hasPendingSignupRequests = true;
    });


    this.retriveProductStatus.retriveProductStatus("PENDING").subscribe(response => { 
      this.vendorProductDetails = response;
      this.hasPendingProductRequests = true;

    });

    
    this.retriveProductStatus.retriveProductStatus("APPROVED").subscribe(response => { 
      this.showProductsToCustomer = response;
      this.hasApprovedProducts = true;

    });
    }

  onSignupReject(email: string, index: number) {

    for(let i=0; i<this.vendorDetails.length;i++){
      if(this.vendorDetails[i].email == email){
       let id =  this.vendorDetails[i].vendorId;
       let request = {
        userId: id,
        registrationStatus:"REJECTED"
       };
       this.updateStatus.updateStatus(request).subscribe(response => {
        if(response.status == "SUCCESS"){
        this.vendorDetails.splice(index, 1);
        console.log(this.vendorDetails.length);
        if(this.vendorDetails.length == 0){
          this.hasPendingSignupRequests = false;
        }
        }

       });
      }
      
    }
  }


  onSignupApprove(email: string, index: number) {
    for(let i=0; i<this.vendorDetails.length;i++){
      if(this.vendorDetails[i].email == email){
       let id =  this.vendorDetails[i].vendorId;
       let request = {
        userId: id,
        registrationStatus:"APPROVED"
       };
       this.updateStatus.updateStatus(request).subscribe(response => {
        if(response.status == "SUCCESS"){
        this.vendorDetails.splice(index, 1);
        console.log(this.vendorDetails.length);
        if(this.vendorDetails.length == 0){
          this.hasPendingSignupRequests = false;
        }
        }

       });
      }
  }
}


   onProductReject(productName: string, index: number) {

    for(let i=0; i<this.vendorProductDetails.length;i++){
      if(this.vendorProductDetails[i].productName == productName){
       let id =  this.vendorProductDetails[i].productId;
       let request = {
        productId: id,
        status:"REJECTED"
       };
       this.updateStatus.updateProductStatus(request).subscribe(response => {
        if(response.status == "SUCCESS"){
        this.vendorProductDetails.splice(index, 1);
        console.log(this.vendorDetails.length);
        if(this.vendorProductDetails.length == 0){
          this.hasPendingProductRequests = false;
        }
        }

       });
      }
    }
  }


   onProductApprove(productName: string, index: number) {


    for(let i=0; i<this.vendorProductDetails.length;i++){
      if(this.vendorProductDetails[i].productName == productName){
       let id =  this.vendorProductDetails[i].productId;
       let request = {
        productId: id,
        status:"APPROVED"
       };
       this.updateStatus.updateProductStatus(request).subscribe(response => {
        if(response.status == "SUCCESS"){
        this.vendorProductDetails.splice(index, 1);
        console.log(this.vendorDetails.length);
        if(this.vendorProductDetails.length == 0){
          this.hasPendingProductRequests = false;
        }
        }

       });
      }
    }
   }

  onProductShow(vendorName: string, productName: string, index: number) {


    for(let i=0; i<this.showProductsToCustomer.length;i++){
      if(this.showProductsToCustomer[i].productName == productName){
       let id =  this.showProductsToCustomer[i].productId;
       let request = {
        productId: id,
        status:"ADD_TO_CUSTOMER_VIEW"
       };
       this.updateStatus.updateProductStatus(request).subscribe(response => {
        if(response.status == "SUCCESS"){
        this.showProductsToCustomer.splice(index, 1);
        console.log(this.vendorDetails.length);
        if(this.showProductsToCustomer.length == 0){
          this.hasApprovedProducts = false;
        }
        }

       });
      }
    }

  }

  }
