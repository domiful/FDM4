import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { PostDetailEditComponent } from "./post-detail-edit/post-detail-edit.component";
import { MyImageAddRemoveComponent } from "./post-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./post-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./post-detail-edit/my-list-selector/my-list-selector.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list.component";
import { PostsRoutingModule } from "./posts-routing.module";

@NgModule({
    imports: [
        PostsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        PostListComponent,
        PostDetailComponent,
        PostDetailEditComponent,
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
export class PostsModule { }
