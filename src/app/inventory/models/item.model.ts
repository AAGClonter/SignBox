export class Item {
    _id?: string;
    assortment: number;
    itemNumber: number;
    description: string;
    quantity: number;
    creationDate?: Date;
    image?: File;

    constructor(
        assortment: number, 
        itemNumber: number, 
        description: string, 
        quantity: number,
        image?: File,
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