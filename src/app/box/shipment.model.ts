export interface Shipment {
    from: string;
    addressedTo: string;
    numberOfBoxes: number;
    masterTracking: string;
    date?: Date;
    _id?: string;
}