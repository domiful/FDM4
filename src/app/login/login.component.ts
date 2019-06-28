import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { User } from "~/app/shared/user.model";
import { UserService } from "~/app/shared/user.service";
import { Kinvey } from "kinvey-nativescript-sdk";



@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    isLoggingIn = true;
    user: User;
    processing = false;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.email = "dom.raymond@progress.com";
        this.user.password = "pass";
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        if (Kinvey.User.getActiveUser()) {
            this.userService.logout().then(() => {
                this.userService.login(this.user)
                    .then(() => {
                        this.processing = false;
                        this.routerExtensions.navigate(["/menu"], {
                            clearHistory: true,
                            transition: {
                                name: "slideLeft"
                            },
                        });
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert("Unfortunately we could not find your account.");
                    });
            });
        } else {
            this.userService.login(this.user)
                .then(() => {
                    this.processing = false;
                    this.routerExtensions.navigate(["/menu"], {
                        clearHistory: true,
                        transition: {
                            name: "slideLeft"
                        },
                    });
                })
                .catch(() => {
                    this.processing = false;
                    this.alert("Unfortunately we could not find your account.");
                });
        }

    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("Your passwords do not match.");
            return;
        }
        this.userService.register(this.user)
            .then(() => {
                this.processing = false;
                this.alert("Your account was successfully created.");
                this.isLoggingIn = true;
            })
            .catch(() => {
                this.processing = false;
                this.alert("Unfortunately we were unable to create your account.");
            });
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                        this.alert("Unfortunately, an error occurred resetting your password.");
                    });
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "Coriander Lane",
            okButtonText: "OK",
            message: message
        });
    }
}

