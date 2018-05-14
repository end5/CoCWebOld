import { Character } from './Character/Character';
import { LocationDict } from './Locations/LocationDict';
import { Settings } from './Settings';
import { Flags } from './Utilities/Flags';
import { Dictionary } from '../Engine/Utilities/Dictionary';

export interface IUser {
    char: Character;
    settings: Settings;
    flags: Flags;
    npcs: Dictionary<Character>;
    locations: LocationDict;
}

class User implements IUser {
    public char: Character;
    public settings = new Settings();
    public flags = new Flags();
    public npcs = new Dictionary<Character>();
    public locations = new LocationDict();
}

const user = new User();
export { user as User };
