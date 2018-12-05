import { Component, OnInit } from '@angular/core';
import { SearchModel } from 'src/app/models/category-model/searchmodel';
import { ProductService } from 'src/app/services/product-service';
import { ProductListViewModel } from 'src/app/models/product-model/product-list-view-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList : any;
  search : SearchModel = new SearchModel();

  constructor(private productService : ProductService) { }

  ngOnInit() {
      this.search.Page = "0";
      this.search.Size = "10";
      this.productList = new ProductListViewModel();
      
      this.productService.getAllProducts(this.search).subscribe((result : Response)=>{
        this.productList = result;
      })
  }

}
