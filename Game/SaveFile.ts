import { Gender } from './Body/GenderIdentity';
import { IUser, User } from './User';
import { Time } from './Utilities/Time';

export interface SaveFile {
    name: string;
    days: number;
    hour: number;
    gender: Gender;
    notes: string;
    user: IUser;
}

let lastSave: SaveFile;

export function generateSave(notes?: string): SaveFile {
    lastSave = {
        name: User.char.desc.name,
        days: Time.day,
        hour: Time.hour,
        gender: User.char.gender,
        notes: notes ? notes : (lastSave && lastSave.notes ? lastSave.notes : ""),
        user: User.serialize() as IUser
    };
    return lastSave;
}

export function loadFromSave(save: SaveFile) {
    User.deserialize(save.user);
    Time.day = save.days;
    Time.hour = save.hour;
    lastSave = save;
}
