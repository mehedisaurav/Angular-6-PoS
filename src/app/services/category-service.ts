
import { HttpClient } from '@angular/common/http';
import { SearchModel } from '../models/category-model/searchmodel';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService{
    
     constructor(private http : HttpClient) {  }

    getAllCategoryList(search : SearchModel){
        return this.http.post('http://localhost:56403/api/Category/GetResult',search);
    }
}