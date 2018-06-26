export class Item {
    assortment: number;
    itemNumber: number;
    description: string;
    quantity: number;
    creationDate?: Date;

    constructor(
        assortment: number, 
        itemNumber: number, 
        description: string, 
        quantity: number, 
        creationDate?: Date
    ) {
        this.assortment = assortment;
        this.itemNumber = itemNumber;
        this.description = description;
        this.quantity = quantity;
        this.creationDate = creationDate
    }
}