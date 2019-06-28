import { Injectable } from "@angular/core";

import { Sum } from "./sum.model";
import { SumService } from "./sum.service";

@Injectable({
    providedIn: "root"
})
export class SumEditService {
    private _editModel: Sum;

    constructor(private _sumService: SumService) { }

    startEdit(id: string): Sum {
        this._editModel = null;

        return this.getEditableSumById(id);
    }

    getEditableSumById(id: string): Sum {
        if (!this._editModel || this._editModel.id !== id) {
            const sum = this._sumService.getSumById(id);

            // get fresh editable copy of sum model
            this._editModel = new Sum(sum);
        }

        return this._editModel;
    }
}
