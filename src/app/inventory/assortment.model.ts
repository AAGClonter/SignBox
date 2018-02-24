import { Item } from './item.model';

export interface Assortment {
    assortmentNumber: number;
    description: string;
    isSelected: boolean;
    _id?: string;
    items?: Item[];
    isShown?: boolean;
    onAddingItem?: boolean;
}
