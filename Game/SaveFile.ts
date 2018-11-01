import { Gender } from './Body/GenderIdentity';
import { Time } from './Utilities/Time';
import { ISettings, Settings } from './Settings';
import { Character } from './Character/Character';
import { CharConstructorLib } from './Character/CharConstructorLib';
import { CharacterType } from './Character/CharacterType';
import { CharDict } from './CharList';
import { Flags } from './Flags';
import { attachCharToUI } from './ScreenDisplay';
import { MainScreen } from '../Page/MainScreen';

export interface SaveFile {
    name: string;
    days: number;
    hour: number;
    gender: Gender;
    notes: string;
    user: {
        chars: { [x: string]: any },
        settings: ISettings,
        flags: { [x: string]: any }
    };
}

let lastSave: SaveFile;

export function generateSave(notes?: string): SaveFile {
    if (!CharDict.player) throw new Error('Tried to save without a character');
    const player = CharDict.player;
    lastSave = {
        name: player.desc.name,
        days: Time.day,
        hour: Time.hour,
        gender: player.gender,
        notes: notes ? notes : (lastSave && lastSave.notes ? lastSave.notes : ""),
        user: {
            chars: CharDict.serialize(),
            settings: Settings.serialize(),
            flags: Flags.serialize(),
        }
    };
    return lastSave;
}

export function loadFromSave(save: SaveFile) {
    for (const charKey of Object.keys(save.user.chars)) {
        const charConstr = CharConstructorLib.get(charKey as CharacterType);
        if (charConstr) {
            const char: Character = new charConstr();
            if (char.deserialize)
                char.deserialize(save.user.chars[charKey]);
            CharDict.set(charKey as CharacterType, char);
        }
    }
    if (!CharDict.player)
        throw new Error('Player does not exist');

    attachCharToUI(CharDict.player);
    MainScreen.statsPanel.show();

    Settings.deserialize(save.user.settings);
    Flags.deserialize(save.user.flags);
    Time.day = save.days;
    Time.hour = save.hour;
    lastSave = save;
}
