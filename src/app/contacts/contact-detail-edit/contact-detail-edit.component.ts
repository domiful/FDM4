import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { ContactEditService } from "../shared/contact-edit.service";
import { Contact } from "../shared/contact.model";
import { ContactService } from "../shared/contact.service";
import { contactClassList, contactDoorList, contactSeatList, contactTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "ContactDetailEdit",
    templateUrl: "./contact-detail-edit.component.html",
    styleUrls: ["./contact-detail-edit.component.scss"]
})
export class ContactDetailEditComponent implements OnInit {
    private _contact: Contact;
    private _contactClassOptions: Array<string> = [];
    private _contactDoorOptions: Array<number> = [];
    private _contactSeatOptions: Array<string> = [];
    private _contactTransmissionOptions: Array<string> = [];
    private _isContactImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _contactService: ContactService,
        private _contactEditService: ContactEditService,
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
                const contactId = params.id;

                this._contact = this._contactEditService.startEdit(contactId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get contact(): Contact {
        return this._contact;
    }

    get pricePerDay(): number {
        return this._contact.price;
    }

    set pricePerDay(value: number) {
        // force iOS UISlider to work with discrete steps
        this._contact.price = Math.round(value);
    }

    get luggageValue(): number {
        return this._contact.luggage;
    }

    set luggageValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._contact.luggage = Math.round(value);
    }

    get contactClassOptions(): Array<string> {
        return this._contactClassOptions;
    }

    get contactDoorOptions(): Array<number> {
        return this._contactDoorOptions;
    }

    get contactSeatOptions(): Array<string> {
        return this._contactSeatOptions;
    }

    get contactTransmissionOptions(): Array<string> {
        return this._contactTransmissionOptions;
    }

    get contactImageUrl(): string {
        return this._contact.imageUrl;
    }

    set contactImageUrl(value: string) {
        this._contact.imageUrl = value;
        this._isContactImageDirty = true;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as contacts/shared/contact.service.ts
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

        if (this._isContactImageDirty && this._contact.imageUrl) {
            queue = queue
                .then(() => this._contactService.uploadImage(this._contact.imageStoragePath, this._contact.imageUrl))
                .then((uploadedFile: any) => {
                    this._contact.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._contactService.update(this._contact))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/contacts"], {
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
            .then(() => this._routerExtensions.navigate(["/contacts"], {
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
        for (const classItem of contactClassList) {
            this._contactClassOptions.push(classItem);
        }

        for (const doorItem of contactDoorList) {
            this._contactDoorOptions.push(doorItem);
        }

        for (const seatItem of contactSeatList) {
            this._contactSeatOptions.push(seatItem);
        }

        for (const transmissionItem of contactTransmissionList) {
            this._contactTransmissionOptions.push(transmissionItem);
        }
    }
}
