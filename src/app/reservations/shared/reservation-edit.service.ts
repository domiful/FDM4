import { Injectable } from "@angular/core";

import { Reservation } from "./reservation.model";
import { ReservationService } from "./reservation.service";

@Injectable({
    providedIn: "root"
})
export class ReservationEditService {
    private _editModel: Reservation;

    constructor(private _reservationService: ReservationService) { }

    startEdit(id: string): Reservation {
        this._editModel = null;

        return this.getEditableReservationById(id);
    }

    getEditableReservationById(id: string): Reservation {
        if (!this._editModel || this._editModel.id !== id) {
            const reservation = this._reservationService.getReservationById(id);

            // get fresh editable copy of reservation model
            this._editModel = new Reservation(reservation);
        }

        return this._editModel;
    }
}
