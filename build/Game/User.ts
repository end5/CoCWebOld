import { Character } from './Character/Character';
import { CharacterType } from './Character/CharacterType';
import { CharConstructorLib } from './Character/CharConstructorLib';
import { Place } from './Places/Place';
import { PlaceDict } from './Places/PlaceDict';
import { Settings } from './Settings';
import { Flags } from './Utilities/Flags';
import { Dictionary } from '../Engine/Utilities/Dictionary';
import { DictionarySerializer } from '../Engine/Utilities/DictionarySerializer';
import { ISerializable } from '../Engine/Utilities/ISerializable';

export interface IUser {
    char: Character;
    settings: Settings;
    flags: Flags;
    npcs: Dictionary<Character>;
    places: PlaceDict;
}

class User implements IUser, ISerializable<IUser> {
    public char: Character;
    public settings = new Settings();
    public flags = new Flags();
    public npcs = new Dictionary<Character>();
    public places = new PlaceDict();

    public serialize(): object | undefined {
        return {
            char: this.char.serialize(),
            settings: this.settings.serialize(),
            flags: DictionarySerializer.serialize(this.flags),
            npcs: DictionarySerializer.serialize(this.npcs),
            places: DictionarySerializer.serialize(this.places),
        };
    }

    public deserialize(saveObject: IUser) {
        if (!this.char) {
            this.char = new (CharConstructorLib.get(CharacterType.Player))();
        }
        this.char.deserialize(saveObject.char);
        this.settings.deserialize(saveObject.settings);
        DictionarySerializer.deserialize(saveObject.flags, this.flags);
        for (const charKey of Object.keys(saveObject.npcs)) {
            if (CharConstructorLib.has(charKey)) {
                const char: Character = new (CharConstructorLib.get(charKey))();
                if (char.deserialize)
                    char.deserialize(saveObject.npcs[charKey]);
                this.npcs.set(charKey, char);
            }
        }
        DictionarySerializer.deserialize(saveObject.places, this.places, Place);
    }
}

const user = new User();
// tslint:disable-next-line:no-string-literal
window["user"] = user;
export { user as User };
