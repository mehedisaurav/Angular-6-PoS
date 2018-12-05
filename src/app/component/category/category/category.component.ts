import { Component, OnInit, Injectable } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service';
import { SearchModel } from 'src/app/models/category-model/searchmodel';
import { CategoryListViewModel } from 'src/app/models/category-model/category-List-ViewModel';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList : any;
  searchModel : SearchModel = new SearchModel();

   constructor(private categoryService : CategoryService) { }

  ngOnInit() {

    this.categoryList = new CategoryListViewModel();
    this.searchModel.Page = "0";
    this.searchModel.Size = "10";

    this.categoryService.getAllCategoryList(this.searchModel).subscribe((result : Response) =>{
      this.categoryList = result;
    })



  }

  getCategory(id : string){
    console.log(id);
  }

}
