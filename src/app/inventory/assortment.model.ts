import { Item } from './item.model';

export class Assortment {
    assortmentNumber: number;
    description: string;

    constructor(
         assortmentNumber: number,
         description: string
    ) {
        this.assortmentNumber = assortmentNumber;
        this.description = description;
    }
}