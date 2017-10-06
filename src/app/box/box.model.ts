export class Box {
    tracking: string;
    addressedTo: string;
    signedBy?: string;
    id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressedTo: string, 
                signedBy?: string, 
                id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressedTo = addressedTo;
        this.signedBy = signedBy;
        this.id = id;
        this.userId = userId;
    }
}