import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";
import { Config } from "../../shared/config";
import { Sum } from "./sum.model";

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
export class SumService {
    private static cloneUpdateModel(sum: Sum): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = sum[e], a), { _id: sum.id });
    }

    private allSums: Array<Sum> = [];
    private sumsStore = Kinvey.DataStore.collection<any>("summaries");

    getSumById(id: string): Sum {
        if (!id) {
            return;
        }

        return this.allSums.filter((sum) => {
            return sum.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.sumsStore.sync().then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.sumsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this.allSums = [];
            data.forEach((sumData: any) => {
                sumData.id = sumData._id;
                const sum = new Sum(sumData);

                this.allSums.push(sum);
            });

            return this.allSums;
        });
    }

    update(sumModel: Sum): Promise<any> {
        const updateModel = SumService.cloneUpdateModel(sumModel);

        return this.sumsStore.save(updateModel);
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
