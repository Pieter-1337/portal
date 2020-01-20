import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerComponent } from "./components/customer/customer.component";
import { homeRoutes } from "./home.routing";
import { CommonModule } from "@angular/common";
import { CustomerService } from "./services/customer.service";
import { HttpClientModule } from "@angular/common/http";
import { AgencyService } from "./services/agency.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AgencyComponent } from "./components/agency/agency.component";
import { PersonTableService } from "./services/person-table.service";
import { MaterialModule } from "src/libs/material.module";

@NgModule({
  imports: [
    homeRoutes,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // material
    MaterialModule
  ],
  exports: [],
  declarations: [CustomerComponent, AgencyComponent],
  providers: [CustomerService, AgencyService, PersonTableService]
})
export class HomeModule {}
