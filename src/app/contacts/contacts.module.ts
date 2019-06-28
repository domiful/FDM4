import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { ContactDetailEditComponent } from "./contact-detail-edit/contact-detail-edit.component";
import { MyImageAddRemoveComponent } from "./contact-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./contact-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./contact-detail-edit/my-list-selector/my-list-selector.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ContactListComponent } from "./contact-list.component";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { NewContactComponent } from "./new-contact/new-contact.component";
@NgModule({
    imports: [
        ContactsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ContactListComponent,
        ContactDetailComponent,
        ContactDetailEditComponent,
        NewContactComponent,
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
export class ContactsModule { }
