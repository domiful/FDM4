import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";
import { Config } from "../../shared/config";
import { Contact } from "./contact.model";

const editableProperties = [
    "class",
    "doors",
    "hasAC",
    "transmission",
    "luggage",
    "name",
    "price",
    "seats",
    "imageUrl"
];

@Injectable({
    providedIn: "root"
})
export class ContactService {
    private static cloneUpdateModel(contact: Contact): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = contact[e], a), { _id: contact.id });
    }

    private allContacts: Array<Contact> = [];
    private contactsStore = Kinvey.DataStore.collection<any>("contacts");

    getContactById(id: string): Contact {
        if (!id) {
            return;
        }

        return this.allContacts.filter((contact) => {
            return contact.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.contactsStore.sync().then(() => {
            //return this.contactsStore.sync();
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.contactsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this.allContacts = [];
            data.forEach((contactData: any) => {
                contactData.id = contactData._id;
                const contact = new Contact(contactData);

                this.allContacts.push(contact);
            });

            return this.allContacts;
        });
    }

    update(contactModel: Contact): Promise<any> {
        const updateModel = ContactService.cloneUpdateModel(contactModel);

        return this.contactsStore.save(updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();

        const metadata = {
            filename: imageFile.name,
            mimeType: this.getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };

        return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile: any) => {
                const query = new Kinvey.Query();
                query.equalTo("_id", uploadedFile._id);

                return Kinvey.Files.find(query);
            })
            .then((files: Array<any>) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;

                    return file;
                } else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
            });
    }

    private login(): Promise<any> {
        if (!!Kinvey.User.getActiveUser()) {
            return Promise.resolve();
        } else {
            //    return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
