import { Dictionary } from "../Engine/Utilities/Dictionary";
import { CharacterType } from "./Character/CharacterType";
import { Character } from "./Character/Character";

class CharacterDict extends Dictionary<CharacterType, Character> {
    public get player(): Character | undefined {
        return this.get(CharacterType.Player);
    }
}

export const CharDict = new CharacterDict();
