import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";

import { SumDetailEditComponent } from "./sum-detail-edit/sum-detail-edit.component";
import { MyImageAddRemoveComponent } from "./sum-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./sum-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./sum-detail-edit/my-list-selector/my-list-selector.component";
import { SumDetailComponent } from "./sum-detail/sum-detail.component";
import { SumListComponent } from "./sum-list.component";
import { SumsRoutingModule } from "./sums-routing.module";

@NgModule({
    imports: [
        SumsRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SumListComponent,
        SumDetailComponent,
        SumDetailEditComponent,
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
export class SumsModule { }
