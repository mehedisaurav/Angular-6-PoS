import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './component/producty/product/product.component';
import { CategoryComponent } from './component/category/category/category.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category-service';
import { ProductService } from './services/product-service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaleComponent } from './component/sale/sale/sale.component';
import { SaleService } from './services/sale-service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    SaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [CategoryService, ProductService, SaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
