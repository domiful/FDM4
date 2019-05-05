import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";
import { Config } from "~/app/shared/config";
import { Post } from "./post.model";

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
export class PostService {
    private static cloneUpdateModel(post: Post): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = post[e], a), { _id: post.id });
    }

    private allPosts: Array<Post> = [];
    private postsStore = Kinvey.DataStore.collection<any>("News");

    getPostById(id: string): Post {
        if (!id) {
            return;
        }

        return this.allPosts.filter((post) => {
            return post.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.postsStore.sync().then(() => {
            // return this.postsStore.sync();
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.postsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this.allPosts = [];
            data.forEach((postData: any) => {
                postData.id = postData._id;
                const post = new Post(postData);

                this.allPosts.push(post);
            });

            return this.allPosts;
        });
    }

    update(postModel: Post): Promise<any> {
        const updateModel = PostService.cloneUpdateModel(postModel);

        return this.postsStore.save(updateModel);
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
            //return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
