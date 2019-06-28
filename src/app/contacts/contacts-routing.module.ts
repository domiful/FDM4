import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ContactDetailEditComponent } from "./contact-detail-edit/contact-detail-edit.component";
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ContactListComponent } from "./contact-list.component";

const routes: Routes = [
    { path: "", component: ContactListComponent },
    { path: "news-detail/:id", component: ContactDetailComponent },
    { path: "contact-detail-edit/:id", component: ContactDetailEditComponent },
    { path: "new-contact", component: NewContactComponent }];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ContactsRoutingModule { }
