import { Component, OnInit } from "@angular/core";
import { DestroyComponent } from "../destroy/destroy.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-master",
  templateUrl: "master.component.html"
})
export class MasterComponent extends DestroyComponent implements OnInit {
  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {}

  navigateToCustomers() {
    this._router.navigate(["./customer"]);
  }

  navigateToAgencies() {
    this._router.navigate(["./agency"]);
  }
}
