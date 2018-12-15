import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CategoryComponent } from './component/category/category/category.component';
import { ProductComponent } from './component/producty/product/product.component';
import { SaleComponent } from './component/sale/sale/sale.component';


const appRoutes :  Routes = [
  { path:'category', component: CategoryComponent},
  { path:'product', component: ProductComponent},
  { path:'sale', component: SaleComponent},
  { path:'', redirectTo:'category', pathMatch:'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
