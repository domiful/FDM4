import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Sum } from "./shared/sum.model";
import { SumService } from "./shared/sum.service";
import { Kinvey } from "kinvey-nativescript-sdk";
import { LocateAddress } from "nativescript-locate-address";
import { AccountState } from "../shared/accountState";


// instantiate the plugin
let locator = new LocateAddress();

locator.available().then((avail) => {
    console.log(avail ? "Yes" : "No");
});

const dataStore = Kinvey.DataStore.collection("summaries");

/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "SumsList",
    moduleId: module.id,
    templateUrl: "./sum-list.component.html",
    styleUrls: ["./sum-list.component.scss"]
})
export class SumListComponent implements OnInit {
    dash = [
        { "year": 1999, "totalUnits": 62179, "totalSales": 1703470.35, "ecomSales": 191723.93, "ecomUnits": 26781 },
        { "year": 2001, "totalUnits": 65751, "totalSales": 1291607.99, "ecomSales": 98702.51, "ecomUnits": 25123 },
        { "year": 2002, "totalUnits": 63312, "totalSales": 1591503.47, "ecomSales": 53981.87, "ecomUnits": 24614 },
        { "year": 2003, "totalUnits": 99102, "totalSales": 1670646.32, "ecomSales": 98644.95, "ecomUnits": 30977 },
        { "year": 2004, "totalUnits": 70946, "totalSales": 3985305.96, "ecomSales": 192373.74, "ecomUnits": 27212 },
        { "year": 2005, "totalUnits": 28163, "totalSales": 4758889.0, "ecomSales": 134439.29, "ecomUnits": 30368 },
        { "year": 2006, "totalUnits": 48841, "totalSales": 3635973.51, "ecomSales": 129840.25, "ecomUnits": 26600 },
        { "year": 2007, "totalUnits": 74271, "totalSales": 4977833.0, "ecomSales": 65907.08, "ecomUnits": 31866 },
        { "year": 2008, "totalUnits": 24320, "totalSales": 4860432.47, "ecomSales": 105668.29, "ecomUnits": 30871 },
        { "year": 2009, "totalUnits": 60125, "totalSales": 4461656.0, "ecomSales": 42613.72, "ecomUnits": 25911 },
        { "year": 2010, "totalUnits": 63206, "totalSales": 572762.81, "ecomSales": 135241.42, "ecomUnits": 21497 },
        { "year": 2011, "totalUnits": 88910, "totalSales": 2998424.0, "ecomSales": 139875.67, "ecomUnits": 21274 },
        { "year": 2012, "totalUnits": 14033, "totalSales": 1109071.95, "ecomSales": 156076.73, "ecomUnits": 31067 },
        { "year": 2013, "totalUnits": 76909, "totalSales": 2811022.55, "ecomSales": 65976.13, "ecomUnits": 28252 },
        { "year": 2014, "totalUnits": 91365, "totalSales": 4968527.82, "ecomSales": 41995.5, "ecomUnits": 29915 },
        { "year": 2015, "totalUnits": 38857, "totalSales": 3211173.62, "ecomSales": 91262.01, "ecomUnits": 27982 },
        { "year": 2016, "totalUnits": 56947, "totalSales": 4501524.0, "ecomSales": 146722.53, "ecomUnits": 29054 },
        { "year": 2017, "totalUnits": 14220, "totalSales": 713618.17, "ecomSales": 55206.62, "ecomUnits": 30274 },
        { "year": 2018, "totalUnits": 28753, "totalSales": 4689337.0, "ecomSales": 65805.57, "ecomUnits": 22873 }
    ];
    account = {};
    private _isLoading: boolean = false;
    private _sums: ObservableArray<Sum> = new ObservableArray<Sum>([]);


    constructor(
        private _sumService: SumService,
        private _routerExtensions: RouterExtensions
    ) {
        this.account = AccountState.config.account;
    }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;
        console.log("Satet", AccountState.config.account);

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in sums/shared/sum.service.ts
        *************************************************************/
        this._sumService.load()
            .then((sums: Array<Sum>) => {
                this._sums = new ObservableArray(sums);
                this._isLoading = false;
            })
            .catch(() => {
                this._isLoading = false;
            });
    }

    get sums(): ObservableArray<Sum> {
        return this._sums;
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
