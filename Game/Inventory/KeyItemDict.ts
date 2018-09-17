import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { KeyItem } from '../Items/KeyItem';

export class KeyItemDict extends Dictionary<KeyItem> {
    public add(name: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super.set(name, new KeyItem(name, value1, value2, value3, value4));
    }
}
