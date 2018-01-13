import { Item } from './item.model';

export class Assortment {
    assortmentNumber: number;
    description: string;
    _id: string

    constructor(
         assortmentNumber: number,
         description: string,
         _id: string
    ) {
        this.assortmentNumber = assortmentNumber;
        this.description = description;
        this._id = _id
    }
}