import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Contact } from "./shared/contact.model";
import { ContactService } from "./shared/contact.service";
import { alert } from "tns-core-modules/ui/dialogs";
import { AccountState } from "../shared/accountState";


/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "ContactsList",
    moduleId: module.id,
    templateUrl: "./contact-list.component.html",
    styleUrls: ["./contact-list.component.scss"]
})
export class ContactListComponent implements OnInit {
    account = {};

    private _isLoading: boolean = false;
    private _contacts: ObservableArray<Contact> = new ObservableArray<Contact>([]);
    constructor(
        private _contactService: ContactService,
        private _routerExtensions: RouterExtensions,

    ) {
        this.account = AccountState.config.account;
    }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in contacts/shared/contact.service.ts
        *************************************************************/
        this._contactService.load()
            .then((contacts: Array<Contact>) => {
                this._contacts = new ObservableArray(contacts);
                this._isLoading = false;
            })
            .catch(() => {
                this._isLoading = false;
            });
    }

    get contacts(): ObservableArray<Contact> {
        return this._contacts;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * Use the "itemTap" contact handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onContactItemTap(args: ListViewEventData): void {
        const tappedContactItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/contacts/contact-detail", tappedContactItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onNavItemTap(navItemRoute: string): void {
        this._routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "slideTop"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    displayAlert() {
        // >> alert-dialog-code
        let options = {
            title: "New Contact",
            message: "Broken. Will be back soon.",
            okButtonText: "OK"
        };

        alert(options).then(() => {
            console.log("Race chosen!");
        });
        // << alert-dialog-code
    }
}
