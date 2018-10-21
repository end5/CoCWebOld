import { Character } from './Character/Character';
import { CharacterType } from './Character/CharacterType';
import { CharConstructorLib } from './Character/CharConstructorLib';
import { Settings } from './Settings';
import { Flags } from './Utilities/Flags';
import { Dictionary } from '../Engine/Utilities/Dictionary';
import { DictionarySerializer } from '../Engine/Utilities/DictionarySerializer';
import { ISerializable } from '../Engine/Utilities/ISerializable';
import { Player } from './Character/Player/Player';

export interface IUser {
    char: Character;
    settings: Settings;
    flags: Flags;
    npcs: Dictionary<CharacterType, Character>;
}

class User implements IUser, ISerializable<IUser> {
    public char: Character = new Player();
    public settings = new Settings();
    public flags = new Flags();
    public npcs = new Dictionary<CharacterType, Character>();

    public serialize(): object | undefined {
        return {
            char: this.char.serialize(),
            settings: this.settings.serialize(),
            flags: DictionarySerializer.serialize(this.flags),
            npcs: DictionarySerializer.serialize(this.npcs),
        };
    }

    public deserialize(saveObject: IUser) {
        let charConstr = CharConstructorLib.get(CharacterType.Player);
        if (!this.char && charConstr) {
            this.char = new charConstr();
        }
        this.char.deserialize(saveObject.char);
        this.settings.deserialize(saveObject.settings);
        DictionarySerializer.deserialize(saveObject.flags, this.flags);

        for (const charKey of Object.keys(saveObject.npcs)) {
            charConstr = CharConstructorLib.get(charKey as CharacterType);
            if (charConstr) {
                const char: Character = new charConstr();
                if (char.deserialize)
                    char.deserialize(saveObject.npcs.get(charKey as CharacterType)!);
                this.npcs.set(charKey as CharacterType, char);
            }
        }
    }
}

const user = new User();
// tslint:disable-next-line:no-string-literal
(window as any)["user"] = user;
export { user as User };
