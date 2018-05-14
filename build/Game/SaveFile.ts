import { Gender } from './Body/GenderIdentity';
import { Character } from './Character/Character';
import { CharConstructorLib } from './Character/CharConstructorLib';
import { IUser, User } from './User';
import { Time } from './Utilities/Time';
import { DictionarySerializer } from '../Engine/Utilities/DictionarySerializer';

export interface SaveFile {
    name: string;
    days: number;
    hour: number;
    gender: Gender;
    notes: string;
    user: string;
}

let lastSave: SaveFile;

function serializeUser(): string {
    return JSON.stringify({
        char: User.char.serialize(),
        settings: User.settings.serialize(),
        flags: DictionarySerializer.serialize(User.flags),
        npcs: DictionarySerializer.serialize(User.npcs),
        locations: DictionarySerializer.serialize(User.locations),
    });
}

function deserializeUser(saveObject: IUser) {
    User.char.deserialize(saveObject.char);
    User.settings.deserialize(saveObject.settings);
    DictionarySerializer.deserialize(saveObject.flags, User.flags);
    for (const charKey of Object.keys(saveObject.npcs)) {
        if (CharConstructorLib.has(charKey)) {
            const char: Character = new (CharConstructorLib.get(charKey))();
            if (char.deserialize !== undefined)
                char.deserialize(saveObject.npcs[charKey]);
            User.npcs.set(charKey, char);
        }
    }
    DictionarySerializer.deserialize(saveObject.locations, User.locations, Location);
}

export function generateSave(notes?: string): SaveFile {
    lastSave = {
        name: User.char.desc.name,
        days: Time.day,
        hour: Time.hour,
        gender: User.char.gender,
        notes: notes ? notes : (lastSave && lastSave.notes ? lastSave.notes : ""),
        user: serializeUser()
    };
    return lastSave;
}

export function loadFromSave(save: SaveFile) {
    try {
        deserializeUser(JSON.parse(save.user));
    }
    catch (e) {
        alert(e);
    }
    Time.day = save.days;
    Time.hour = save.hour;
    lastSave = save;
}
