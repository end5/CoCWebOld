import SerializeInterface from '../SerializeInterface';

export default class Beard implements SerializeInterface {
    public style: string = "";
    public length: number = 0;

    public serialize(): string {
        return JSON.stringify({
            style: this.style,
            length: this.length
        });
    }

    public deserialize(saveObject: Beard) {
        this.style = saveObject.style;
        this.length = saveObject.length;
    }
}
