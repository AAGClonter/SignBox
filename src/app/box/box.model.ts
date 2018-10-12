export class Box {
    tracking: string;
    addressed: string;
    masterTrackingId: string;
    _id?: string;
    userId?: string;

    constructor(tracking: string, 
                addressed: string,
                masterTrackingId: string,
                _id?: string,
                userId?: string){
        this.tracking = tracking;
        this.addressed = addressed;
        this.masterTrackingId = masterTrackingId;
        this._id = _id;
        this.userId = userId;
    }
}