import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Reservation } from "./shared/reservation.model";
import { ReservationService } from "./shared/reservation.service";
import { Kinvey } from "kinvey-nativescript-sdk";
import { LocateAddress } from "nativescript-locate-address";

// instantiate the plugin
let locator = new LocateAddress();

locator.available().then((avail) => {
    console.log(avail ? "Yes" : "No");
});

const dataStore = Kinvey.DataStore.collection("Reservations");

/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "ReservationsList",
    moduleId: module.id,
    templateUrl: "./reservation-list.component.html",
    styleUrls: ["./reservation-list.component.scss"]
})
export class ReservationListComponent implements OnInit {
    private _isLoading: boolean = false;
    private _reservations: ObservableArray<Reservation> = new ObservableArray<Reservation>([]);

    constructor(
        private _reservationService: ReservationService,
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
        * Check out the service in reservations/shared/reservation.service.ts
        *************************************************************/
        this._reservationService.load()
            .then((reservations: Array<Reservation>) => {
                this._reservations = new ObservableArray(reservations);
                this._isLoading = false;
            })
            .catch(() => {
                this._isLoading = false;
            });
    }

    get reservations(): ObservableArray<Reservation> {
        return this._reservations;
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
    checkIt(res: Reservation): void {
        console.log(res);

        dialogs.confirm({
            title: res.name,
            message: "Are you sure you would like to check in?",
            okButtonText: "Check In",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this._reservations["_array"][1]["checkedIn"] = true;
                setTimeout(function () {
                    const options = {
                        title: "Table Ready!",
                        message: "The table for your Party of 4, Meetup is ready!",
                        okButtonText: "OK"
                    };

                    alert(options);
                }, 8000);
                /*const subscription = dataStore.findById(res.id)
                    .subscribe((nr: {}) => {
                        console.log(nr);
                        nr["checkedIn"] = true;
                        const promise = dataStore.save(
                            nr
                        )
                            .then(function (entity: {}) {
                                console.log("y");
                                this._reservationService.load();

                            })
                            .catch(function (error: Kinvey.BaseError) {
                                console.log("n");

                            });
                        // ...
                    }, (error: Kinvey.BaseError) => {
                        // ...
                    }, () => {
                        // ...
                    });*/

            }
            console.log("Dialog result: " + result);
        });
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
        setTimeout(function () {

            const listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
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

    openMaps(): void {
        locator.locate({
            address: "1100 Congress Ave Austin TX 78701"
        }).then(() => {
            console.log("Maps app launched.");
        }, (error) => {
            console.log(error);
        });
    }
}
