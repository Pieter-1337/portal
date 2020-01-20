import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MasterComponent } from "./components/master/master.component";
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatMenuModule,
  MatSelectModule
} from "@angular/material";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxMaskModule } from "ngx-mask";
import { NgxsModule } from "@ngxs/store";
import { CustomerState } from "./state/customer.state";
import { AgencyState } from "./state/agency.state";

@NgModule({
  imports: [
    RouterModule,
    // material
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDialogModule,
    NgxMaskModule,
    NgxsModule.forRoot([CustomerState, AgencyState])
  ],
  exports: [MasterComponent],
  declarations: [MasterComponent],
  providers: []
})
export class CoreModule {}
