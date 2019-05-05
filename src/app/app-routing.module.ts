import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { KinveyCommon } from "~/app/shared/kinvey.common";


const routes: Routes = [
    { path: "", redirectTo: KinveyCommon.isUserLoggedIn() ? "/home" : "/login", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "~/app/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "reservations", loadChildren: "~/app/reservations/reservations.module#ReservationsModule" },
    { path: "news", loadChildren: "~/app/news/posts.module#PostsModule" },
    { path: "events", loadChildren: "~/app/events/events.module#EventsModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "menu", loadChildren: "~/app/menu/menu.module#MenuModule" }


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
