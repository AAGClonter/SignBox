import { Employee } from './employee.model';

export class Box {
    tracking: string;
    addressedTo: string;
    _id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressedTo: string,
                _id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressedTo = addressedTo;
        this._id = _id;
        this.userId = userId;
    }
}