import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EventDetailEditComponent } from "./event-detail-edit/event-detail-edit.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventListComponent } from "./event-list.component";

const routes: Routes = [
    { path: "", component: EventListComponent },
    { path: "news-detail/:id", component: EventDetailComponent },
    { path: "event-detail-edit/:id", component: EventDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }
