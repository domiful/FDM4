import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { EventEditService } from "../shared/event-edit.service";
import { Event } from "../shared/event.model";
import { EventService } from "../shared/event.service";
import { eventClassList, eventDoorList, eventSeatList, eventTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "EventDetailEdit",
    templateUrl: "./event-detail-edit.component.html",
    styleUrls: ["./event-detail-edit.component.scss"]
})
export class EventDetailEditComponent implements OnInit {
    private _event: Event;
    private _eventClassOptions: Array<string> = [];
    private _eventDoorOptions: Array<number> = [];
    private _eventSeatOptions: Array<string> = [];
    private _eventTransmissionOptions: Array<string> = [];
    private _isEventImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _eventService: EventService,
        private _eventEditService: EventEditService,
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
                const eventId = params.id;

                this._event = this._eventEditService.startEdit(eventId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get event(): Event {
        return this._event;
    }

    get pricePerDay(): number {
        return this._event.price;
    }

    set pricePerDay(value: number) {
        // force iOS UISlider to work with discrete steps
        this._event.price = Math.round(value);
    }

    get luggageValue(): number {
        return this._event.luggage;
    }

    set luggageValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._event.luggage = Math.round(value);
    }

    get eventClassOptions(): Array<string> {
        return this._eventClassOptions;
    }

    get eventDoorOptions(): Array<number> {
        return this._eventDoorOptions;
    }

    get eventSeatOptions(): Array<string> {
        return this._eventSeatOptions;
    }

    get eventTransmissionOptions(): Array<string> {
        return this._eventTransmissionOptions;
    }

    get eventImageUrl(): string {
        return this._event.imageUrl;
    }

    set eventImageUrl(value: string) {
        this._event.imageUrl = value;
        this._isEventImageDirty = true;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as events/shared/event.service.ts
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

        if (this._isEventImageDirty && this._event.imageUrl) {
            queue = queue
                .then(() => this._eventService.uploadImage(this._event.imageStoragePath, this._event.imageUrl))
                .then((uploadedFile: any) => {
                    this._event.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._eventService.update(this._event))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/events"], {
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
            .then(() => this._routerExtensions.navigate(["/events"], {
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
        for (const classItem of eventClassList) {
            this._eventClassOptions.push(classItem);
        }

        for (const doorItem of eventDoorList) {
            this._eventDoorOptions.push(doorItem);
        }

        for (const seatItem of eventSeatList) {
            this._eventSeatOptions.push(seatItem);
        }

        for (const transmissionItem of eventTransmissionList) {
            this._eventTransmissionOptions.push(transmissionItem);
        }
    }
}
