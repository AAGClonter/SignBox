export class User {
    email: string;
    pin: string;
    confirmPin?: string;
    boxesSignedIn?: string[];

    constructor(email: string, pin: string, confirmPin?: string, boxesSignedIn?: string[]){
        this.email = email;
        this.pin = pin;
        this.confirmPin = confirmPin;
        this.boxesSignedIn = boxesSignedIn;
    }
}