import Tail, { TailType } from './Tail';
import SerializableList from '../Utilities/SerializableList';

export default class TailList extends SerializableList<Tail> {
    public constructor() {
        super(Tail);
    }

    public filterType(type: TailType): Tail[] {
        return this.filter((tail: Tail) => {
            return tail.type === type;
        });
    }

    public hasType(type: TailType): boolean {
        for (const tail of this.list) {
            if (tail.type === type)
                return true;
        }
        return false;
    }
}
