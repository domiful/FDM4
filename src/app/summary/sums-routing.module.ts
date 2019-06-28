import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SumDetailEditComponent } from "./sum-detail-edit/sum-detail-edit.component";
import { SumDetailComponent } from "./sum-detail/sum-detail.component";
import { SumListComponent } from "./sum-list.component";

const routes: Routes = [
    { path: "", component: SumListComponent },
    { path: "sum-detail/:id", component: SumDetailComponent },
    { path: "sum-detail-edit", component: SumDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SumsRoutingModule { }
