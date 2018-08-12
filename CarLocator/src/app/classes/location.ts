import { ILocation } from '../interfaces/ilocation';

export class Location implements ILocation{
    public timeStamp: Date;
    public lat: number;
    public lng: number;

    constructor(lat: number, lng: number, timeStamp: string = null) {
        this.lat = lat;
        this.lng = lng;
        this.timeStamp =  new Date(timeStamp);
    }
}
