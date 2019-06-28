import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { Account } from './account.model';
import { prompt } from "tns-core-modules/ui/dialogs";
import { AccountState } from "~/app/shared/accountState";


const dataStore = Kinvey.DataStore.collection('comments', Kinvey.DataStoreType.Sync) as Kinvey.SyncStore;


@Component({
    selector: "Comments",
    moduleId: module.id,
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
    account = {};
    locations: { mainContact: string, company: string, imageSrc: string }[]; /*{ mainContact: string, company: string, imageSrc: string }[] = [
        { mainContact: "Yarl Ford", company: "Aldorria", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Paent Marwy", company: "Bahari", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Landow Williams", company: "Erewhon", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Jack Penith", company: "Gilead", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Adam Aberyst", company: "Mandorra", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Bobby Macclesfield", company: "Nambutu", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Dave Larnwick", company: "Deltora", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Dan Snowbush", company: "Islandia", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Donna Kelna", company: "Norteguay", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Sarah Canvy", company: "Graznavia", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Ronald Hartlepool", company: "Drasselstein", imageSrc: "https://source.unsplash.com/collection/1232792/" },
        { mainContact: "Will Timeston", company: "Brungaria", imageSrc: "https://source.unsplash.com/collection/1232792/" }
    ];*/
    accounts: Array<Account>;
    tabs: Array<SegmentedBarItem>;
    visibleTab: number;

    constructor(private routerExtensions: RouterExtensions) {
        this.account = AccountState.config.account;
        this.visibleTab = 0;
        this.tabs = [];
        const item = new SegmentedBarItem();
        item.title = "Dashboard";
        this.tabs.push(item);
        const item2 = new SegmentedBarItem();
        item2.title = "Accounts";
        this.tabs.push(item2);
    }

    ngOnInit(): void {
        this.loadAccounts(false);
    }

    onNavItemTap(navItemRoute: string): void {

        console.log(navItemRoute);
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }

    public onSelectedIndexChange(args) {
        let segmentedBar = <SegmentedBar>args.object;
        this.visibleTab = segmentedBar.selectedIndex;
    }

    public loadAccounts(isOffline: boolean) {
        if (isOffline) {
            const subscription = dataStore.find()
                .subscribe((data: Array<{}>) => {
                    // Called once, with local data
                }, (error: Kinvey.BaseError) => {
                    // ...
                }, () => {
                    // Called after the local data has been retrieved
                });


        } else {
            const promise = dataStore.pull()
                .then(() => {
                    const subscription = dataStore.find()
                        .subscribe((data: Array<{}>) => {
                            console.log(data);
                            const nas = [];
                            data.forEach((a) => {
                                nas.push(a);
                            });
                            this.accounts = nas;
                        }, (error: Kinvey.BaseError) => {
                            // ...
                        }, () => {
                            // Called after the local data has been retrieved
                        });
                })
                .catch((error: Kinvey.BaseError) => {
                    // ...
                });
        }
    }

    onBackButtonTap(): void {
        this.routerExtensions.backToPreviousPage();
    }

    newComment(): void {
        const promptOptions = {
            title: "New Comment",
            message: "",
            okButtonText: "Submit",
            cancelButtonText: "Cancel",
            inputType: "text", // email, number, text, password, or email
            capitalizationType: "sentences" // all, none, sentences or words
        };
        prompt(promptOptions).then((r) => {
            console.log("Dialog result: ", r.result);
            console.log("Text: ", r.text);
        });
    }
}
