import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CommentsRoutingModule } from "./comments-routing.module";
import { CommentsComponent } from "./comments.component";

@NgModule({
    imports: [
        NativeScriptUIListViewModule,
        NativeScriptCommonModule,
        CommentsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CommentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CommentsModule { }
