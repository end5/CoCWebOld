import Character from './Character/Character';
import Settings from './Settings';
import Dictionary from '../Engine/Utilities/Dictionary';

class User {
    public char: Character;
    public settings = new Settings();
    public flags = new Dictionary<object>();
    public npcs = new Dictionary<Character>();

    public save(): string {
        return "";
    }
}

const user = new User();
export default user as User;
