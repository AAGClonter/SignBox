import { Box } from './box.model';

export class Employee {
    name: string;
    box: Box;
    _id?: string;
    email?: string;
    employeeId?: string;
    

    constructor(name: string, box: Box, _id?: string, email?: string, employeeId?: string){
        this.name = name;
        this.email = email;
        this._id = _id;
        this.employeeId = employeeId;
        this.box = box;
    }
}