import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { SumEditService } from "../shared/sum-edit.service";
import { Sum } from "../shared/sum.model";
import { SumService } from "../shared/sum.service";
import { sumClassList, sumDoorList, sumSeatList, sumTransmissionList } from "./constants";
import { Kinvey } from 'kinvey-nativescript-sdk';
const dataStore = Kinvey.DataStore.collection('Locations');
/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "SumDetailEdit",
    templateUrl: "./sum-detail-edit.component.html",
    styleUrls: ["./sum-detail-edit.component.scss"]
})
export class SumDetailEditComponent implements OnInit {
    public _locations: Array<string>;


    constructor(
        private _sumService: SumService,
        private _sumEditService: SumEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) {
        this._locations = ["Angola, IN", "Austin, TX", "Broad Ripple, IN", "Chicago, IL",
            "Edmonton, AB", "Fort Wayne, IN", "Morrisville, NC", "Niagara Falls, ON", "Norcross, GA",
            "San Francisco, CA", "Shipshewana, IN", "Toledo, OH", "Waltham, MA", "Winnipeg, MB"];
    }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        //this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const sumId = params.id;

                this._sum = this._sumEditService.startEdit(sumId);
            });
    }

    get locations(): Array<string> {
        return this._locations;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    getLocations(): void {
        let locs = [];
        const subscription = dataStore.find()
            .subscribe((entities) => {
                entities.forEach((element) => {
                    locs.push(element["Title"]);

                });
            }, (error: Kinvey.BaseError) => {
                // ...
                //return locations;
            }, () => {
                // ...
            });

        this.locations = locs;

    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as sums/shared/sum.service.ts
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
 
        if (this._isSumImageDirty && this._sum.imageUrl) {
            queue = queue
                .then(() => this._sumService.uploadImage(this._sum.imageStoragePath, this._sum.imageUrl))
                .then((uploadedFile: any) => {
                    this._sum.imageUrl = uploadedFile.url;
                });
        }
 
        queue.then(() => this._sumService.update(this._sum))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/sums"], {
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
            .then(() => this._routerExtensions.navigate(["/sums"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }
}
