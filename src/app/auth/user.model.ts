export class User {
    email: string;
    pin: string;
    confirmPin?: string;

    constructor(email: string, pin: string, confirmPin?: string){
        this.email = email;
        this.pin = pin;
        this.confirmPin = confirmPin;
    }
}