import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Event } from "../shared/event.model";
import { EventService } from "../shared/event.service";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "EventDetail",
    moduleId: module.id,
    templateUrl: "./event-detail.component.html"
})
export class EventDetailComponent implements OnInit {
    private _event: Event;

    constructor(
        private _eventService: EventService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const eventId = params.id;

                this._event = this._eventService.getEventById(eventId);
            });
    }

    get event(): Event {
        return this._event;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /events/event-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/events/event-detail-edit", this._event.id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
