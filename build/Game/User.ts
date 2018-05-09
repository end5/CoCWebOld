import { Character } from './Character/Character';
import { LocationDict } from './Locations/LocationDict';
import { Settings } from './Settings';
import { Flags } from './Utilities/Flags';
import { Dictionary } from '../Engine/Utilities/Dictionary';

class User {
    public char: Character;
    public settings = new Settings();
    public flags = new Flags();
    public npcs = new Dictionary<Character>();
    public locations = new LocationDict();

    public save(): string {
        return "";
    }
}

const user = new User();
export { user as User };
