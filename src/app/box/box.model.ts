export class Box {
    tracking: string;
    addressed: string;
    masterTracking: string;
    _id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressed: string,
                masterTracking: string,
                _id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressed = addressed;
        this.masterTracking = masterTracking;
        this._id = _id;
        this.userId = userId;
    }
}