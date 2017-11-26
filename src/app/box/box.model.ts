import { Employee } from './employee.model';

export class Box {
    tracking: string;
    addressedTo: string;
    employee: Employee;
    _id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressedTo: string,
                employee: Employee, 
                _id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressedTo = addressedTo;
        this.employee = employee;
        this._id = _id;
        this.userId = userId;
    }
}