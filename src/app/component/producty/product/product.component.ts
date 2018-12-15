import { Component, OnInit } from '@angular/core';
import { SearchModel } from 'src/app/models/category-model/searchmodel';
import { ProductService } from 'src/app/services/product-service';
import { ProductListViewModel } from 'src/app/models/product-model/product-list-view-model';
import { FormGroup, FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable} from 'rxjs';import 'rxjs/add/operator/do';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';

const state = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const states = [{'name':'Alabama'},{'id':'2','name':'Alaska'}]

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList : any;
  searchs : SearchModel = new SearchModel();
  productForm : FormGroup;
  categoryDropList : any = [];
  isUpdate : boolean = false;
  data : any;


  constructor(private productService : ProductService) { }

  formatter = (value: any) => value.categoryName || '';
  format = (value : any) => value.categoryName;
  search = (text$: Observable<string>) => 

  text$.pipe(
    debounceTime(200),
    distinctUntilChanged()
    ,map(term => term === '' ? [] 
     : this.categoryDropList.filter(v => v['categoryName'].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
    // :  this.productService.getCategoryListByName(term).subscribe((r) => {
    //    return r.slice(0,5);
    // })
    
  )    

  setModel(e: NgbTypeaheadSelectItemEvent, fubi: any) {
    this.productForm.patchValue({ 'categoryId' : e.item['categoryId']})
  }
  

  ngOnInit() {
      this.productForm = new FormGroup({
        'productId' : new FormControl(''),
        'productName' : new FormControl(''),
        'categoryId' : new FormControl(''),
        'price' :  new FormControl(null),
        'quantity' : new FormControl(null),
        'measure' : new FormControl('')
      });

      this.searchs.Page = "0";
      this.searchs.Size = "10";
      this.productList = new ProductListViewModel();

      //get all product
      this.productService.getAllProducts(this.searchs).subscribe((result : Response)=>{
        this.productList = result;
      });

      //category list dropdown
      this.productService.getCategoryListDropdown().subscribe((result : Response)=>{
        this.categoryDropList = result;
      });

      

      // this.queryField.valueChanges.pipe(
      //   debounceTime(400)).subscribe(queryField => this.productService.getCategoryListByName(queryField)
      //           .subscribe(result => {
      //             this.results = result;
      //             console.log(result)
      //           }));
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
