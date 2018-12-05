
import { SearchModel } from "../models/category-model/searchmodel";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export  class ProductService{
   
    constructor(private http : HttpClient) {}

    getAllProducts(searchModel : SearchModel){
        return this.http.post('http://localhost:56403/api/Product/ProductAll',searchModel);
    }
}