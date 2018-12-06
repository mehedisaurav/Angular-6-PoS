import { Component, OnInit } from '@angular/core';
import { SearchModel } from 'src/app/models/category-model/searchmodel';
import { ProductService } from 'src/app/services/product-service';
import { ProductListViewModel } from 'src/app/models/product-model/product-list-view-model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList : any;
  search : SearchModel = new SearchModel();
  productForm : FormGroup;
  categoryDropList : any = [];
  isUpdate : boolean = false;

  constructor(private productService : ProductService) { }

  ngOnInit() {
      this.productForm = new FormGroup({
        'productId' : new FormControl(''),
        'productName' : new FormControl(''),
        'categoryId' : new FormControl(''),
        'price' :  new FormControl(null),
        'quantity' : new FormControl(null),
        'measure' : new FormControl('')
      });

      this.search.Page = "0";
      this.search.Size = "10";
      this.productList = new ProductListViewModel();

      //get all product
      this.productService.getAllProducts(this.search).subscribe((result : Response)=>{
        this.productList = result;
      });

      //category list dropdown
      this.productService.getCategoryListDropdown().subscribe((result : Response)=>{
        this.categoryDropList = result;
      });
  }


  getProduct(product : any){

    this.productForm.patchValue({
      'productId' : product['productId'],
      'categoryId' : product['categoryId'],
      'productName' : product['name'],
      'price' : product['price'],
      'quantity' : product['quantity'],
      'measure' :  product['unitMeasurement']
    });
      this.isUpdate=true;
  }

  onSubmit(){
    console.log(this.productForm.value);
    

    if(this.productForm.value['productId'] == ''){
        this.productService.saveProduct(this.productForm).subscribe((result : Response)=>{
          this.ngOnInit();
        })
    }
    else{
      this.productService.updateProduct(this.productForm).subscribe((result : Response)=>{
        this.isUpdate=false;
        this.ngOnInit();
    });

  }
}

  cancleUpdate(){
    this.productForm.reset();
    this.isUpdate=false;
  }

}
