import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";

@NgModule({
    imports: [
        NativeScriptUIListViewModule,
        NativeScriptCommonModule,
        MenuRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        MenuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MenuModule { }
