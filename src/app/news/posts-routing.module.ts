import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PostDetailEditComponent } from "./post-detail-edit/post-detail-edit.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list.component";

const routes: Routes = [
    { path: "", component: PostListComponent },
    { path: "news-detail/:id", component: PostDetailComponent },
    { path: "post-detail-edit/:id", component: PostDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PostsRoutingModule { }
