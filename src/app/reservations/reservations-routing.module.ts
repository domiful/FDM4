import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ReservationDetailEditComponent } from "./reservation-detail-edit/reservation-detail-edit.component";
import { ReservationDetailComponent } from "./reservation-detail/reservation-detail.component";
import { ReservationListComponent } from "./reservation-list.component";

const routes: Routes = [
    { path: "", component: ReservationListComponent },
    { path: "reservation-detail/:id", component: ReservationDetailComponent },
    { path: "reservation-detail-edit", component: ReservationDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ReservationsRoutingModule { }
