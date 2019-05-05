import { Injectable } from "@angular/core";

import { Event } from "./event.model";
import { EventService } from "./event.service";

@Injectable({
    providedIn: "root"
})
export class EventEditService {
    private _editModel: Event;

    constructor(private _eventService: EventService) { }

    startEdit(id: string): Event {
        this._editModel = null;

        return this.getEditableEventById(id);
    }

    getEditableEventById(id: string): Event {
        if (!this._editModel || this._editModel.id !== id) {
            const event = this._eventService.getEventById(id);

            // get fresh editable copy of event model
            this._editModel = new Event(event);
        }

        return this._editModel;
    }
}
