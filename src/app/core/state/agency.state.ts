import { NgxsOnInit, State, Selector, StateContext, Action } from "@ngxs/store";
import { tap, takeUntil } from "rxjs/operators";
import { DestroyComponent } from "../components/destroy/destroy.component";
import { AgencyService } from "src/app/home/services/agency.service";
import { AgencyDto } from "src/app/home/models/agency.model";
import { AgencyStateModel } from "../models/agency-state.model";
import { LoadAgencyInformation, AddAgency } from "./agency.actions";
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem
} from "@ngxs/store/operators";
@State<AgencyStateModel>({
  name: "agency"
})
export class AgencyState extends DestroyComponent implements NgxsOnInit {
  constructor(private _agencyService: AgencyService) {
    super();
  }
  @Selector()
  static agencies(state: AgencyStateModel) {
    return state.agencies;
  }
  ngxsOnInit(ctx: StateContext<AgencyStateModel>) {
    ctx.dispatch(new LoadAgencyInformation());
  }

  @Action(LoadAgencyInformation)
  LoadAgencyInformation(state: StateContext<AgencyStateModel>) {
    this._agencyService
      .getAgencies()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(agencies => {
          state.patchState({ agencies: agencies as Array<AgencyDto> });
        })
      )
      .subscribe();
  }

  @Action(AddAgency)
  AddAgency(state: StateContext<AgencyStateModel>, action: AddAgency) {
    this._agencyService.addAgency(action.agency);
    state.setState(
      patch({
        agencies: append([action.agency])
      })
    );
  }
}
