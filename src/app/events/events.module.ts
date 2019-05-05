import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { EventDetailEditComponent } from "./event-detail-edit/event-detail-edit.component";
import { MyImageAddRemoveComponent } from "./event-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./event-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./event-detail-edit/my-list-selector/my-list-selector.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventListComponent } from "./event-list.component";
import { EventsRoutingModule } from "./events-routing.module";

@NgModule({
    imports: [
        EventsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        EventListComponent,
        EventDetailComponent,
        EventDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventsModule { }
