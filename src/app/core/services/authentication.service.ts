import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserManager, User } from "oidc-client";

@Injectable()
export class AuthenticationService {
  private _userManager: UserManager;
  private _user: User;
  constructor(private httpClient: HttpClient) {
    //Create StsSettings
    //Instantiate _userManager bases on the StsSettings
  }
}
