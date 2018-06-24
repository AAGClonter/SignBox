export class Assortment {
    assortmentNumber: number;
    description: string;
    date: Date

    constructor(assortmentNumber: number, description: string, date: Date) {
        this.assortmentNumber = assortmentNumber,
        this.description = description,
        this.date = date
    }
}