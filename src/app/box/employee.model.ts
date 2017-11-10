export class Employee {
    name: string;
    email: string;
    employeeId?: string;

    constructor(name: string, email: string, employeeId?: string){
        this.name = name;
        this.email = email;
        this.employeeId = employeeId;
    }
}