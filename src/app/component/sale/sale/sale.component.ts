import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SaleService } from 'src/app/services/sale-service';
import { debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';import 'rxjs/add/operator/do';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  formatter = (value: any) => value.categoryName || '';
  format = (value : any) => value.categoryName;

  search = (text$: Observable<string>) => 
  
  text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(te => this.SaleService.getCategoryListByName(te))    
    ,map((result : any[])=>{
      return  result.slice(0,7)
    }
    )
  ) 


  constructor(private SaleService : SaleService) {}

  ngOnInit() {
  }

  

}
