import { Box } from './box.model';

export class ErasedBox {
    box: Box;
    signedBy: string;
    id?: string;
    constructor(box: Box, signedBy: string, id?: string){
        this.box = box;
        this.signedBy = signedBy;
        this.id = id;
    }
}