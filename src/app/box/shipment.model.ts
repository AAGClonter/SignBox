import { Box } from "./box.model";

export interface Shipment {
    from: string;
    addressedTo: string;
    numberOfBoxes: number;
    date: Date;
    masterTracking: string;
    boxes: Box[];
}