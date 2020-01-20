import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { Observable, BehaviorSubject } from "rxjs";
import { CustomerDto } from "../../models/customer.model";
import { Select } from "@ngxs/store";
import { CustomerState } from "src/app/core/state/customer.state";
import { PersonTableService } from "../../services/person-table.service";
import { DestroyComponent } from "src/app/core/components/destroy/destroy.component";
import { PersonDto } from "../../models/person.model";
import { MatTable } from "@angular/material";
import { takeUntil, tap } from "rxjs/operators";
import { Constants } from "../../constants";

@Component({
  selector: "app-customer",
  templateUrl: "customer.component.html",
  styleUrls: ["customer.component.scss"]
})
export class CustomerComponent extends DestroyComponent implements OnInit {
  personTableCustomersName = Constants.personTableCustomersComponent;
  @ViewChild(Constants.personTableCustomersComponent, { static: false })
  personTable: MatTable<Element>;

  @Select(CustomerState.customers) customers$: Observable<Array<CustomerDto>>;
  columnsToDisplay = this._personTableService.columnsToDisplay;
  public showForm = false;
  persons$ = this._personTableService.persons$;

  constructor(public _personTableService: PersonTableService) {
    super();
  }

  ngOnInit() {
    this._personTableService.updateTable$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(value => {
          if (value) {
            // On init of the component personTable will still be undefined
            if (!!this.personTable) {
              this.personTable.renderRows();
            }
          }
        })
      )
      .subscribe();
  }
}
