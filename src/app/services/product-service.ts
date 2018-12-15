
import { SearchModel } from "../models/category-model/searchmodel";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import 'rxjs/add/operator/map';

@Injectable()
export  class ProductService{
   
    constructor(private http : HttpClient) {}

    getAllProducts(searchModel : SearchModel){
        return this.http.post('http://localhost:56403/api/Product/ProductAll',searchModel);
    }

    getCategoryListDropdown(){
        return this.http.get('http://localhost:56403/api/Category/CategoryDropList');
    }

    saveProduct(formData : FormGroup){
        return this.http.post('http://localhost:56403/api/Product/SaveProduct', formData.value);
    }

    updateProduct(formData : FormGroup){
        return this.http.put('http://localhost:56403/api/Product/UpdateProduct', formData.value)
    }

    getCategoryListByName(query : string){
        return this.http.get('http://localhost:56403/api/Category/CategoryDropdownListByName/name?='+ query);
    }
}