import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { PostEditService } from "../shared/post-edit.service";
import { Post } from "../shared/post.model";
import { PostService } from "../shared/post.service";
import { postClassList, postDoorList, postSeatList, postTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "PostDetailEdit",
    templateUrl: "./post-detail-edit.component.html",
    styleUrls: ["./post-detail-edit.component.scss"]
})
export class PostDetailEditComponent implements OnInit {
    private _post: Post;
    private _postClassOptions: Array<string> = [];
    private _postDoorOptions: Array<number> = [];
    private _postSeatOptions: Array<string> = [];
    private _postTransmissionOptions: Array<string> = [];
    private _isPostImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _postService: PostService,
        private _postEditService: PostEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const postId = params.id;

                this._post = this._postEditService.startEdit(postId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get post(): Post {
        return this._post;
    }

    get pricePerDay(): number {
        return this._post.price;
    }

    set pricePerDay(value: number) {
        // force iOS UISlider to work with discrete steps
        this._post.price = Math.round(value);
    }

    get luggageValue(): number {
        return this._post.luggage;
    }

    set luggageValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._post.luggage = Math.round(value);
    }

    get postClassOptions(): Array<string> {
        return this._postClassOptions;
    }

    get postDoorOptions(): Array<number> {
        return this._postDoorOptions;
    }

    get postSeatOptions(): Array<string> {
        return this._postSeatOptions;
    }

    get postTransmissionOptions(): Array<string> {
        return this._postTransmissionOptions;
    }

    get postImageUrl(): string {
        return this._post.imageUrl;
    }

    set postImageUrl(value: string) {
        this._post.imageUrl = value;
        this._isPostImageDirty = true;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as posts/shared/post.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Kinvey database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************uncomment here*********************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isPostImageDirty && this._post.imageUrl) {
            queue = queue
                .then(() => this._postService.uploadImage(this._post.imageStoragePath, this._post.imageUrl))
                .then((uploadedFile: any) => {
                    this._post.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._postService.update(this._post))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/posts"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *********************uncomment here*************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        const readOnlyMessage = "Check out the \"Kinvey database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        const queue = Promise.resolve();
        queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
            .then(() => this._routerExtensions.navigate(["/posts"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }

    private initializeEditOptions(): void {
        for (const classItem of postClassList) {
            this._postClassOptions.push(classItem);
        }

        for (const doorItem of postDoorList) {
            this._postDoorOptions.push(doorItem);
        }

        for (const seatItem of postSeatList) {
            this._postSeatOptions.push(seatItem);
        }

        for (const transmissionItem of postTransmissionList) {
            this._postTransmissionOptions.push(transmissionItem);
        }
    }
}
