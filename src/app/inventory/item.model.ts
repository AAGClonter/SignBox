export class Item {
    constructor(public assortment: number,
                public itemNumber: number,
                public description: string,
                public quantity: number,
                public date?: string,
                public _id?: string,
                public isShown: boolean = false,
                public onNewItem: boolean = false) {}
}