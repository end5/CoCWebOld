import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Beard implements ISerializable<Beard> {
    public style: string = "";
    public length: number = 0;

    public hasBeard(): boolean {
        return this.length > 0;
    }

   public serialize(): object | undefined {
        return {
            style: this.style,
            length: this.length
        };
    }

    public deserialize(saveObject: Beard) {
        this.style = saveObject.style;
        this.length = saveObject.length;
    }
}
