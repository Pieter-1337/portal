import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CustomerDto } from "../models/customer.model";
import { Constants } from "../constants";

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {}

  GetCustomers(): Observable<Array<CustomerDto>> {
    let url = Constants.APIROOTURL;
    const customers = this.http.get<Array<CustomerDto>>(
      url + "/customers/GetCustomers"
    );
    return customers;
  }
}
