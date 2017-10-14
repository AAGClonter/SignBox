export class Box {
    tracking: string;
    addressedTo: string;
    signedBy?: string;
    _id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressedTo: string, 
                signedBy?: string, 
                _id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressedTo = addressedTo;
        this.signedBy = signedBy;
        this._id = _id;
        this.userId = userId;
    }
}