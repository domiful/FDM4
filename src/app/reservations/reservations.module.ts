import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { ReservationDetailEditComponent } from "./reservation-detail-edit/reservation-detail-edit.component";
import { MyImageAddRemoveComponent } from "./reservation-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./reservation-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./reservation-detail-edit/my-list-selector/my-list-selector.component";
import { ReservationDetailComponent } from "./reservation-detail/reservation-detail.component";
import { ReservationListComponent } from "./reservation-list.component";
import { ReservationsRoutingModule } from "./reservations-routing.module";

@NgModule({
    imports: [
        ReservationsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ReservationListComponent,
        ReservationDetailComponent,
        ReservationDetailEditComponent,
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
export class ReservationsModule { }
