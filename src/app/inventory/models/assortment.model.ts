import { Item } from './item.model';

export class Assortment {
    _id: string;
    assortmentNumber: number;
    description: string;
    date: number;
    items: Item[]

    constructor(assortmentNumber: number, description: string, _id?: string) {
        this.assortmentNumber = assortmentNumber,
        this.description = description,
        this.date = Date.now(),
        this._id = _id
    }
}