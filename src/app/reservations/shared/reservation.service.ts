import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";
import { Config } from "../../shared/config";
import { Reservation } from "./reservation.model";

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
export class ReservationService {
    private static cloneUpdateModel(reservation: Reservation): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = reservation[e], a), { _id: reservation.id });
    }

    private allReservations: Array<Reservation> = [];
    private reservationsStore = Kinvey.DataStore.collection<any>("Reservations");

    getReservationById(id: string): Reservation {
        if (!id) {
            return;
        }

        return this.allReservations.filter((reservation) => {
            return reservation.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.reservationsStore.sync().then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.reservationsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this.allReservations = [];
            data.forEach((reservationData: any) => {
                reservationData.id = reservationData._id;
                const reservation = new Reservation(reservationData);

                this.allReservations.push(reservation);
            });

            return this.allReservations;
        });
    }

    update(reservationModel: Reservation): Promise<any> {
        const updateModel = ReservationService.cloneUpdateModel(reservationModel);

        return this.reservationsStore.save(updateModel);
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
            // return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
