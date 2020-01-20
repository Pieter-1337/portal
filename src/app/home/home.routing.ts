import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./components/customer/customer.component";
import { AgencyComponent } from "./components/agency/agency.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "customer"
  },
  {
    path: "customer",
    pathMatch: "full",
    component: CustomerComponent
  },
  {
    path: "agency",
    pathMatch: "full",
    component: AgencyComponent
  }
];

export const homeRoutes = RouterModule.forChild(routes);
