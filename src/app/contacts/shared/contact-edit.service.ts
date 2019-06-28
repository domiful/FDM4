import { Injectable } from "@angular/core";

import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";

@Injectable({
    providedIn: "root"
})
export class ContactEditService {
    private _editModel: Contact;

    constructor(private _contactService: ContactService) { }

    startEdit(id: string): Contact {
        this._editModel = null;

        return this.getEditableContactById(id);
    }

    getEditableContactById(id: string): Contact {
        if (!this._editModel || this._editModel.id !== id) {
            const contact = this._contactService.getContactById(id);

            // get fresh editable copy of contact model
            this._editModel = new Contact(contact);
        }

        return this._editModel;
    }
}
