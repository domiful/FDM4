import { Directive, ViewContainerRef } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { ActionBar, NavigationButton } from "tns-core-modules/ui/action-bar";

declare class UINavigationBar { [prop: string]: any; }
declare var NSForegroundColorAttributeName: string;

@Directive({
    selector: "ActionBar"
})
export class ActionBarDirective {
    constructor(
        private readonly viewContainerRef: ViewContainerRef,
    ) {
        const actionBar = <ActionBar>this.viewContainerRef.element.nativeElement;

        actionBar.on("loaded", (args) => {
            if (actionBar.ios) {
                const navigationBar: UINavigationBar = actionBar.ios;
                const color = new Color("white");

                navigationBar.prefersLargeTitles = true;
                navigationBar.tintColor = color.ios;
                navigationBar.barTintColor = color.ios;

                navigationBar.titleTextAttributes = <any>{
                    [NSForegroundColorAttributeName]: color.ios
                };

                navigationBar.largeTitleTextAttributes = <any>{
                    [NSForegroundColorAttributeName]: color.ios
                };

                actionBar.navigationButton = new NavigationButton();
                actionBar.navigationButton.text = "Back";
            }
        });
    }
}