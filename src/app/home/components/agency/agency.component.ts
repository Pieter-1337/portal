import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import { Observable, ReplaySubject, BehaviorSubject, of } from "rxjs";
import { AgencyDto } from "../../models/agency.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AgencyForm } from "../../models/agency.form";
import { Select, Store } from "@ngxs/store";
import { AgencyState } from "src/app/core/state/agency.state";
import { DestroyComponent } from "src/app/core/components/destroy/destroy.component";
import { AddAgency } from "src/app/core/state/agency.actions";
import { PersonDto } from "../../models/person.model";
import { PersonTableService } from "../../services/person-table.service";
import { takeUntil, map, tap } from "rxjs/operators";
import { MatTable } from "@angular/material";
import { Constants } from "../../constants";

@Component({
  selector: "app-agency",
  templateUrl: "agency.component.html",
  styleUrls: ["agency.component.scss"]
})
export class AgencyComponent extends DestroyComponent implements OnInit {
  form: FormGroup;
  personTableAgenciesName = Constants.personTableAgenciesComponent;
  @ViewChild(Constants.personTableAgenciesComponent, { static: false })
  personTable: MatTable<Element>;
  @Select(AgencyState.agencies) agencies$: Observable<Array<AgencyDto>>;
  public showForm$ = new BehaviorSubject<boolean>(false);
  persons$ = this._personTableService.persons$;
  columnsToDisplay = this._personTableService.columnsToDisplay;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    public _personTableService: PersonTableService
  ) {
    super();
  }

  ngOnInit() {
    this.form = AgencyForm.getForm(this.fb);
    this._personTableService.updateTable$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(updateTable => {
          if (updateTable) {
            // On init of the component personTable will still be undefined
            if (!!this.personTable) {
              this.personTable.renderRows();
            }
          }
        })
      )
      .subscribe();
  }

  saveForm() {
    const agencyDto = AgencyForm.getValue(this.form);
    this.store.dispatch(new AddAgency(agencyDto));
    this.showForm$.next(false);
  }
}
