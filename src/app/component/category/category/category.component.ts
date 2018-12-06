import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service';
import { SearchModel } from 'src/app/models/category-model/searchmodel';
import { CategoryListViewModel } from 'src/app/models/category-model/category-List-ViewModel';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryViewModel } from 'src/app/models/category-model/category-ViewModel';
import { error } from 'util';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList : any;
  searchModel : SearchModel = new SearchModel();
  categoryForm : FormGroup;
  isUpdate: boolean = false;

   constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    
    this.callFirst();

    this.categoryForm = new FormGroup({
      'categoryName' : new FormControl(''),
      'categoryId' : new FormControl(''),
      'note' : new FormControl('')
    });
  }

  callFirst(){
    this.categoryList = new CategoryListViewModel();
    this.searchModel.Page = "0";
    this.searchModel.Size = "10";

    this.categoryService.getAllCategoryList(this.searchModel).subscribe((result : Response) =>{
      this.categoryList = result;
    })
  }


  getCategory(category : any){
    console.log(category);

    this.categoryForm.patchValue({
      categoryName : category['categoryName'],
      note : category['note'],
      categoryId : category['categoryId']
    });
    this.isUpdate = true;

  }



  onSubmit(){
    console.log(this.categoryForm.value);

    if(this.categoryForm.value['categoryId'] == ''){
      this.categoryService.saveCategory(this.categoryForm).subscribe((result : Response)=>{
        this.categoryForm.reset();
        this.callFirst();
      },error)
    }
    else{
      this.categoryService.updateCategory(this.categoryForm).subscribe((result : Response)=>{
        this.categoryForm.reset();
        this.isUpdate = false;
        this.callFirst();
      },error)
    }

  }

  cancleUpdate(){
    this.categoryForm.reset();
    this.isUpdate = false;
  }
}
