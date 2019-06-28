import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { KinveyCommon } from "~/app/shared/kinvey.common";


const routes: Routes = [
    { path: "", redirectTo: KinveyCommon.isUserLoggedIn() ? "/menu" : "/login", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "~/app/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "summary", loadChildren: "~/app/summary/sums.module#SumsModule" },
    { path: "contacts", loadChildren: "~/app/contacts/contacts.module#ContactsModule" },
    { path: "events", loadChildren: "~/app/events/events.module#EventsModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "menu", loadChildren: "~/app/menu/menu.module#MenuModule" },
    { path: "comments", loadChildren: "~/app/comments/comments.module#CommentsModule" }




];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
