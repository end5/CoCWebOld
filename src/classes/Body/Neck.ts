import Head from './Head';
import SerializeInterface from '../SerializeInterface';

export default class Neck implements SerializeInterface {
    public gills: boolean = false;
    public readonly head: Head = new Head();

    public serialize(): string {
        return JSON.stringify({
            gilles: this.gills,
            head: this.head
        });
    }

    public deserialize(saveObject: Neck) {
        this.gills = saveObject.gills;
        this.head.deserialize(saveObject.head);
    }
}