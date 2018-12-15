import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SaleService{

    constructor(private http : HttpClient) {}


    getCategoryListByName(name : string) {
        return this.http.get('http://localhost:56403/api/Category/CategoryDropdownListByName/name?='+ name);
    }
}