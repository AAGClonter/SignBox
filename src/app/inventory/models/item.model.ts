export class Item {
    assortmentNumber: number;
    itemNumber: number;
    description: string;
    quantity: number;
    creationDate?: Date;

    constructor(
        assortmentNumber: number, 
        itemNumber: number, 
        description: string, 
        quantity: number, 
        creationDate?: Date
    ) {
        this.assortmentNumber = assortmentNumber;
        this.itemNumber = itemNumber;
        this.description = description;
        this.quantity = quantity;
        this.creationDate = creationDate
    }
}