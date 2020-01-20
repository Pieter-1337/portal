import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../constants";
import { AgencyDto } from "../models/agency.model";

@Injectable()
export class AgencyService {
  private rootUrl: string = Constants.APIROOTURL;
  constructor(private http: HttpClient) {}

  getAgencies(): Observable<Array<AgencyDto>> {
    const agencies = this.http.get<Array<AgencyDto>>(
      this.rootUrl + "/agencies/GetAgencies"
    );
    return agencies;
  }

  addAgency(dto: AgencyDto) {
    return this.http
      .post(this.rootUrl + "/agencies/AddAgency", dto)
      .subscribe();
  }
}
