import { Item } from './item.model';

export class Assortment {
    assortmentNumber: number;
    description: string;
    _id?: string;
    items?: Item[];
    isShown?: boolean = false;
    onAddingItem?: boolean = false;

    constructor(
         assortmentNumber: number,
         description: string,
         isShown?: boolean,
         onAddingItem?: boolean,
         _id?: string,
         items?: Item[],
    ) {
        this.assortmentNumber = assortmentNumber;
        this.description = description;
        this._id = _id;
        this.items = items;
        this.isShown = isShown;
        this.onAddingItem = onAddingItem;
    }
}