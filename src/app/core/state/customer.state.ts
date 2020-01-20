import { NgxsOnInit, State, Selector, StateContext, Action } from "@ngxs/store";
import { CustomerService } from "src/app/home/services/customer.service";
import { CustomerStateModel } from "../models/customer-state.model";
import { LoadCustomerInformation } from "./customer.actions";
import { tap, takeUntil } from "rxjs/operators";
import { CustomerDto } from "src/app/home/models/customer.model";
import { DestroyComponent } from "../components/destroy/destroy.component";
@State<CustomerStateModel>({
  name: "customer"
})
export class CustomerState extends DestroyComponent implements NgxsOnInit {
  constructor(private _customerService: CustomerService) {
    super();
  }
  @Selector()
  static customers(state: CustomerStateModel) {
    return state.customers;
  }
  ngxsOnInit(ctx: StateContext<CustomerStateModel>) {
    ctx.dispatch(new LoadCustomerInformation());
  }

  @Action(LoadCustomerInformation)
  LoadCustomerInformation(state: StateContext<CustomerStateModel>) {
    this._customerService
      .GetCustomers()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(customers => {
          state.patchState({ customers: customers as Array<CustomerDto> });
        })
      )
      .subscribe();
  }
}
