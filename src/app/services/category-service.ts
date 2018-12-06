
import { HttpClient } from '@angular/common/http';
import { SearchModel } from '../models/category-model/searchmodel';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CategoryService{
    
     constructor(private http : HttpClient) {  }

    getAllCategoryList(search : SearchModel){
        return this.http.post('http://localhost:56403/api/Category/GetResult',search);
    }

    saveCategory(formData : FormGroup){
        return this.http.post('http://localhost:56403/api/Category/CreateCategory', formData.value);
    }

    updateCategory(formData : FormGroup){
        return this.http.put('http://localhost:56403/api/Category/CategoryUpdate', formData.value);
    }
}