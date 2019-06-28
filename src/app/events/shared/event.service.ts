import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";
import { Config } from "../../shared/config";
import { Event } from "./event.model";

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
export class EventService {
    private static cloneUpdateModel(event: Event): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = event[e], a), { _id: event.id });
    }

    private allEvents: Array<Event> = [];
    private eventsStore = Kinvey.DataStore.collection<any>("activities");

    getEventById(id: string): Event {
        if (!id) {
            return;
        }

        return this.allEvents.filter((event) => {
            return event.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.eventsStore.sync().then(() => {
            //return this.eventsStore.sync();
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.eventsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this.allEvents = [];
            data.forEach((eventData: any) => {
                eventData.id = eventData._id;
                const event = new Event(eventData);

                this.allEvents.push(event);
            });

            return this.allEvents;
        });
    }

    update(eventModel: Event): Promise<any> {
        const updateModel = EventService.cloneUpdateModel(eventModel);

        return this.eventsStore.save(updateModel);
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
