export interface Shipment {
    from: string;
    addressedTo: string;
    numberOfBoxes: number;
    date?: Date;
    masterTracking: string;
}