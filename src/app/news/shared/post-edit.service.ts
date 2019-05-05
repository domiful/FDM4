import { Injectable } from "@angular/core";

import { Post } from "./post.model";
import { PostService } from "./post.service";

@Injectable({
    providedIn: "root"
})
export class PostEditService {
    private _editModel: Post;

    constructor(private _postService: PostService) { }

    startEdit(id: string): Post {
        this._editModel = null;

        return this.getEditablePostById(id);
    }

    getEditablePostById(id: string): Post {
        if (!this._editModel || this._editModel.id !== id) {
            const post = this._postService.getPostById(id);

            // get fresh editable copy of post model
            this._editModel = new Post(post);
        }

        return this._editModel;
    }
}
