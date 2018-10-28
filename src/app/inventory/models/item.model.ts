export class Item {
    assortment: number;
    itemNumber: number;
    description: string;
    quantity: number;
    image?: string;
    _id?: string;
    creationDate?: Date;

    constructor(
        assortment: number, 
        itemNumber: number, 
        description: string, 
        quantity: number,
        image?: string,
        _id?: string,
        creationDate?: Date
    ) {
        this._id = _id;
        this.assortment = assortment;
        this.itemNumber = itemNumber;
        this.description = description;
        this.quantity = quantity;
        this.creationDate = creationDate;
        this.image = image;
    }
}