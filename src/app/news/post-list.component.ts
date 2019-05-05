import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Post } from "./shared/post.model";
import { PostService } from "./shared/post.service";

/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "PostsList",
    moduleId: module.id,
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
    private _isLoading: boolean = false;
    private _posts: ObservableArray<Post> = new ObservableArray<Post>([]);

    constructor(
        private _postService: PostService,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in posts/shared/post.service.ts
        *************************************************************/
        this._postService.load()
            .then((posts: Array<Post>) => {
                this._posts = new ObservableArray(posts);
                this._isLoading = false;
            })
            .catch(() => {
                this._isLoading = false;
            });
    }

    get posts(): ObservableArray<Post> {
        return this._posts;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onPostItemTap(args: ListViewEventData): void {
        const tappedPostItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/news/news-detail", tappedPostItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
