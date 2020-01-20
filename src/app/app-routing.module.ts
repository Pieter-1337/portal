import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    children: []
  },
  {
    path: "home",
    pathMatch: "full",
    loadChildren: "./home/home.module#HomeModule"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
