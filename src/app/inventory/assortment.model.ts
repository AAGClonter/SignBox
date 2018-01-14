import { Item } from './item.model';

export class Assortment {
    assortmentNumber: number;
    description: string;
    _id: string;
    items: Item[];

    constructor(
         assortmentNumber: number,
         description: string,
         _id: string,
         items: Item[]
    ) {
        this.assortmentNumber = assortmentNumber;
        this.description = description;
        this._id = _id;
        this.items = items;
    }
}