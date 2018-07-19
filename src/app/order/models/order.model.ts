import { Employee } from "../../box/employee.model";
import { Item } from "../../inventory/models/item.model";

export interface Order {
    _id?: string,
    orderNumber: number
    requestedBy: Employee
    retailer: string
    boxWidth: number
    boxLength: number
    boxHeight: number
    items?: Item[]
}