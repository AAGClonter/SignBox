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
        _id?: string,
        creationDate?: Date,
        image?: File
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