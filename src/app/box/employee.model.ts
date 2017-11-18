import { Box } from './box.model';

export class Employee {
    name: string;
    email: string;
    employeeId?: string;
    box: Box;

    constructor(name: string, email: string, box: Box, employeeId?: string){
        this.name = name;
        this.email = email;
        this.employeeId = employeeId;
        this.box = box;
    }
}